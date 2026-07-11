import { Component, computed, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ThemeConfigService } from '../../core/theme/theme-config.service';

const FONT_OPTIONS = [
  'Roboto, sans-serif',
  'Open Sans, sans-serif',
  'Lato, sans-serif',
  'Inter, sans-serif',
  'Poppins, sans-serif',
  'system-ui, sans-serif',
];

@Component({
  selector: 'app-typography-control',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  template: `
    <div class="typography-controls">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Font family</mat-label>
        <mat-select [ngModel]="theme.config().typography.fontFamily" (ngModelChange)="theme.updateTypography({ fontFamily: $event })">
          @for (f of fontOptions; track f) {
            <mat-option [value]="f" [style.font-family]="f">{{ f.split(',')[0] }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Base size (px)</mat-label>
        <input matInput type="number" min="12" max="24" [ngModel]="theme.config().typography.baseSize" (ngModelChange)="theme.updateTypography({ baseSize: +$event })" />
        <mat-hint>The whole type scale derives from this</mat-hint>
      </mat-form-field>
      <div class="weight-row">
        <mat-form-field appearance="outline">
          <mat-label>Regular</mat-label>
          <input matInput type="number" min="100" max="900" step="100" [ngModel]="theme.config().typography.regularWeight" (ngModelChange)="theme.updateTypography({ regularWeight: +$event })" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Medium</mat-label>
          <input matInput type="number" min="100" max="900" step="100" [ngModel]="theme.config().typography.mediumWeight" (ngModelChange)="theme.updateTypography({ mediumWeight: +$event })" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Bold</mat-label>
          <input matInput type="number" min="100" max="900" step="100" [ngModel]="theme.config().typography.boldWeight" (ngModelChange)="theme.updateTypography({ boldWeight: +$event })" />
        </mat-form-field>
      </div>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Line height</mat-label>
        <input matInput type="number" step="0.1" min="1" max="2" [ngModel]="theme.config().typography.lineHeight" (ngModelChange)="theme.updateTypography({ lineHeight: +$event })" />
      </mat-form-field>

      <div class="type-specimen" aria-hidden="true" [style.font-family]="typo().fontFamily" [style.line-height]="typo().lineHeight">
        <span class="preview-caption">Type specimen</span>
        <p class="spec-headline" [style.font-size.px]="typo().baseSize * 1.5" [style.font-weight]="typo().regularWeight">Headline</p>
        <p class="spec-title" [style.font-size.px]="typo().baseSize * 1.125" [style.font-weight]="typo().mediumWeight">Title medium</p>
        <p class="spec-body" [style.font-size.px]="typo().baseSize" [style.font-weight]="typo().regularWeight">Body — the quick brown fox jumps over the lazy dog.</p>
        <p class="spec-label" [style.font-size.px]="typo().baseSize * 0.75" [style.font-weight]="typo().mediumWeight">LABEL SMALL</p>
        <div class="weight-specimen" [style.font-size.px]="typo().baseSize">
          <span [style.font-weight]="typo().regularWeight">Regular {{ typo().regularWeight }}</span>
          <span [style.font-weight]="typo().mediumWeight">Medium {{ typo().mediumWeight }}</span>
          <span [style.font-weight]="typo().boldWeight">Bold {{ typo().boldWeight }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .typography-controls {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .full-width {
        width: 100%;
      }
      .weight-row {
        display: flex;
        gap: 8px;
      }
      .weight-row mat-form-field {
        flex: 1;
        min-width: 0;
      }
      .type-specimen {
        padding: 12px;
        border-radius: 8px;
        background: var(--mat-sys-surface-container-low, #f7f2fa);
      }
      .preview-caption {
        display: block;
        font-size: 11px;
        font-family: Roboto, sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        color: var(--mat-sys-on-surface-variant, #666);
        margin-bottom: 8px;
      }
      .type-specimen p {
        margin: 0 0 4px;
        color: var(--mat-sys-on-surface, #1c1b1f);
      }
      .spec-label {
        letter-spacing: 0.8px;
        color: var(--mat-sys-on-surface-variant, #666) !important;
      }
      .weight-specimen {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px solid var(--mat-sys-outline-variant, #ddd);
      }
    `,
  ],
})
export class TypographyControlComponent {
  readonly theme = inject(ThemeConfigService);
  readonly fontOptions = FONT_OPTIONS;

  readonly typo = computed(() => this.theme.config().typography);
}
