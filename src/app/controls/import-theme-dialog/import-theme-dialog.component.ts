import { Component, inject, signal, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { ThemeConfigService } from '../../core/theme/theme-config.service';
import { parseThemeJson, ThemeParseResult } from '../../core/theme/theme-json';

@Component({
  selector: 'app-import-theme-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
  ],
  template: `
    <h2 mat-dialog-title>Import theme</h2>
    <mat-dialog-content>
      <p class="import-hint">
        Paste a theme JSON below or pick a file. Both the exported
        <code>material-theme.json</code> format and a bare config object are accepted.
      </p>

      <div class="source-row">
        <button mat-stroked-button (click)="fileInput.click()">
          <mat-icon>upload_file</mat-icon>
          Choose file
        </button>
        <button mat-stroked-button (click)="pasteFromClipboard()">
          <mat-icon>content_paste</mat-icon>
          Paste from clipboard
        </button>
        <input
          #fileInput
          type="file"
          accept=".json,application/json"
          hidden
          (change)="onFileSelected($event)"
        />
        @if (fileName()) {
          <span class="file-name" [title]="fileName()">{{ fileName() }}</span>
        }
      </div>

      <textarea
        class="json-input"
        rows="8"
        spellcheck="false"
        placeholder='{"config": { "colors": { "primary": "#6750a4", ... } } }'
        aria-label="Theme JSON"
        [ngModel]="jsonText()"
        (ngModelChange)="onTextChange($event)"
      ></textarea>

      @if (parseResult(); as result) {
        @if (!result.ok) {
          <div class="feedback error" role="alert">
            <mat-icon>error_outline</mat-icon>
            <div>
              <strong>Cannot import this theme:</strong>
              <ul>
                @for (err of result.errors; track err) {
                  <li>{{ err }}</li>
                }
              </ul>
            </div>
          </div>
        } @else {
          @if (result.warnings.length > 0) {
            <div class="feedback warning">
              <mat-icon>warning_amber</mat-icon>
              <div>
                <ul>
                  @for (w of result.warnings; track w) {
                    <li>{{ w }}</li>
                  }
                </ul>
              </div>
            </div>
          }
          <div class="preview">
            <h3>Preview</h3>
            <div class="swatch-grid">
              @for (s of previewSwatches(); track s.label) {
                <div class="swatch" [title]="s.label + ': ' + s.value">
                  <span class="swatch-chip" [style.background]="s.value"></span>
                  <span class="swatch-label">{{ s.label }}</span>
                </div>
              }
            </div>
            <dl class="preview-facts">
              <div><dt>Font</dt><dd>{{ result.config.typography.fontFamily.split(',')[0] }}, {{ result.config.typography.baseSize }}px base</dd></div>
              <div><dt>Shape</dt><dd>{{ result.config.shape.preset }} ({{ result.config.shape.cornerMedium }}px medium)</dd></div>
              <div><dt>Elevation</dt><dd>{{ result.config.elevation.preset }}</dd></div>
              <div><dt>Density</dt><dd>{{ result.config.density.value }}</dd></div>
              <div><dt>Spacing</dt><dd>{{ result.config.spacing.baseUnit }}px base unit</dd></div>
              <div><dt>Overrides</dt><dd>{{ overrideCount() }} component(s)</dd></div>
            </dl>
          </div>
        }
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <mat-button-toggle-group
        class="mode-toggle"
        [ngModel]="mode()"
        (ngModelChange)="mode.set($event)"
        aria-label="Import mode"
        hideSingleSelectionIndicator
      >
        <mat-button-toggle value="replace" matTooltip="Discard the current theme entirely">Replace</mat-button-toggle>
        <mat-button-toggle value="merge" matTooltip="Keep current values not present in the import">Merge</mat-button-toggle>
      </mat-button-toggle-group>
      <span class="actions-spacer"></span>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [disabled]="!canApply()" (click)="apply()">
        Apply theme
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-dialog-content {
        max-width: 560px;
      }
      .import-hint {
        margin: 0 0 12px;
        font-size: 13px;
        color: var(--mat-sys-on-surface-variant, #666);
      }
      .import-hint code {
        font-size: 12px;
        background: var(--mat-sys-surface-container-high, #ece6f0);
        padding: 1px 4px;
        border-radius: 4px;
      }
      .source-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 12px;
      }
      .file-name {
        font-size: 12px;
        color: var(--mat-sys-on-surface-variant, #666);
        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .json-input {
        width: 100%;
        resize: vertical;
        font-family: monospace;
        font-size: 12px;
        line-height: 1.5;
        padding: 10px 12px;
        border: 1px solid var(--mat-sys-outline-variant, #cac4d0);
        border-radius: 8px;
        background: var(--mat-sys-surface-container-lowest, #fff);
        color: var(--mat-sys-on-surface, #1c1b1f);
      }
      .json-input:focus-visible {
        outline: 2px solid var(--mat-sys-primary, #6750a4);
        outline-offset: -1px;
      }
      .feedback {
        display: flex;
        gap: 8px;
        align-items: flex-start;
        margin-top: 12px;
        padding: 10px 12px;
        border-radius: 8px;
        font-size: 13px;
      }
      .feedback ul {
        margin: 4px 0 0;
        padding-left: 18px;
      }
      .feedback.error {
        background: var(--mat-sys-error-container, #f9dedc);
        color: var(--mat-sys-on-error-container, #410e0b);
      }
      .feedback.warning {
        background: var(--mat-sys-surface-container-high, #ece6f0);
        color: var(--mat-sys-on-surface-variant, #49454f);
      }
      .preview {
        margin-top: 16px;
        padding: 12px;
        border: 1px solid var(--mat-sys-outline-variant, #cac4d0);
        border-radius: 8px;
        background: var(--mat-sys-surface-container-low, #f7f2fa);
      }
      .preview h3 {
        margin: 0 0 8px;
        font-size: 13px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--mat-sys-on-surface-variant, #666);
      }
      .swatch-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 12px;
      }
      .swatch {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        width: 64px;
      }
      .swatch-chip {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        border: 1px solid var(--mat-sys-outline-variant, #cac4d0);
      }
      .swatch-label {
        font-size: 11px;
        color: var(--mat-sys-on-surface-variant, #666);
        text-align: center;
      }
      .preview-facts {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 6px 16px;
        margin: 0;
      }
      .preview-facts div {
        display: flex;
        gap: 6px;
        font-size: 12px;
      }
      .preview-facts dt {
        font-weight: 500;
        color: var(--mat-sys-on-surface-variant, #666);
      }
      .preview-facts dd {
        margin: 0;
      }
      .mode-toggle {
        --mat-standard-button-toggle-height: 36px;
      }
      .actions-spacer {
        flex: 1;
      }
    `,
  ],
})
export class ImportThemeDialogComponent {
  private readonly theme = inject(ThemeConfigService);
  private readonly dialogRef = inject(MatDialogRef<ImportThemeDialogComponent>);
  private readonly snackBar = inject(MatSnackBar);

  readonly jsonText = signal('');
  readonly fileName = signal('');
  readonly mode = signal<'replace' | 'merge'>('replace');

  readonly parseResult = computed<ThemeParseResult | null>(() => {
    const text = this.jsonText().trim();
    if (!text) return null;
    return parseThemeJson(text);
  });

  readonly canApply = computed(() => this.parseResult()?.ok === true);

  readonly previewSwatches = computed(() => {
    const result = this.parseResult();
    if (!result?.ok) return [];
    const c = result.config.colors;
    return [
      { label: 'Primary', value: c.primary },
      { label: 'Secondary', value: c.secondary },
      { label: 'Tertiary', value: c.tertiary },
      { label: 'Error', value: c.error },
      { label: 'Surface', value: c.surface },
      { label: 'Outline', value: c.outline },
    ];
  });

  readonly overrideCount = computed(() => {
    const result = this.parseResult();
    return result?.ok ? Object.keys(result.overrides).length : 0;
  });

  onTextChange(text: string): void {
    this.jsonText.set(text);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.fileName.set(file.name);
    file.text().then((text) => this.jsonText.set(text));
    input.value = '';
  }

  async pasteFromClipboard(): Promise<void> {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) {
        this.snackBar.open('Clipboard is empty.', undefined, { duration: 2500 });
        return;
      }
      this.jsonText.set(text);
      this.fileName.set('');
    } catch {
      this.snackBar.open('Could not read clipboard — paste into the text area instead.', undefined, { duration: 4000 });
    }
  }

  apply(): void {
    const result = this.parseResult();
    if (!result?.ok) return;
    this.theme.applyImported(result.config, result.overrides, this.mode());
    this.snackBar.open('Theme imported.', undefined, { duration: 2500 });
    this.dialogRef.close(true);
  }
}
