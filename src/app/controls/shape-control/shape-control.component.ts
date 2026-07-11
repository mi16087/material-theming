import { Component, computed, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { ThemeConfigService } from '../../core/theme/theme-config.service';
import type { ShapePreset } from '../../core/theme/theme-config.model';

const SHAPE_PRESETS: { value: ShapePreset; label: string; corners: [number, number, number, number, number] }[] = [
  { value: 'square', label: 'Square', corners: [0, 0, 0, 0, 0] },
  { value: 'rounded', label: 'Rounded', corners: [4, 8, 12, 16, 28] },
  { value: 'pill', label: 'Pill', corners: [16, 24, 28, 32, 9999] },
];

interface CornerField {
  key: 'cornerExtraSmall' | 'cornerSmall' | 'cornerMedium' | 'cornerLarge' | 'cornerExtraLarge';
  label: string;
}

const CORNER_FIELDS: CornerField[] = [
  { key: 'cornerExtraSmall', label: 'Extra small' },
  { key: 'cornerSmall', label: 'Small' },
  { key: 'cornerMedium', label: 'Medium' },
  { key: 'cornerLarge', label: 'Large' },
  { key: 'cornerExtraLarge', label: 'Extra large' },
];

@Component({
  selector: 'app-shape-control',
  standalone: true,
  imports: [MatButtonToggleModule, FormsModule],
  template: `
    <div class="shape-controls">
      <div class="preset-row">
        <label id="shape-preset-label">Preset</label>
        <mat-button-toggle-group
          [ngModel]="theme.config().shape.preset"
          (ngModelChange)="onPreset($event)"
          class="preset-group"
          aria-labelledby="shape-preset-label"
          hideSingleSelectionIndicator
        >
          @for (p of presets; track p.value) {
            <mat-button-toggle [value]="p.value">{{ p.label }}</mat-button-toggle>
          }
        </mat-button-toggle-group>
      </div>

      <div class="corners">
        @for (field of cornerFields; track field.key) {
          <div class="corner-row">
            <label [for]="'corner-' + field.key">{{ field.label }}</label>
            <div class="corner-input-wrap">
              <input
                type="number"
                [id]="'corner-' + field.key"
                min="0"
                max="9999"
                [ngModel]="theme.config().shape[field.key]"
                (ngModelChange)="onCorner(field.key, $event)"
              />
              <span class="unit">px</span>
            </div>
          </div>
        }
      </div>

      <div class="shape-preview" aria-hidden="true">
        <span class="preview-caption">Corner preview</span>
        <div class="preview-shapes">
          @for (shape of previewShapes(); track shape.label) {
            <div class="preview-shape-wrap">
              <span class="preview-shape" [style.border-radius.px]="shape.radius"></span>
              <span class="preview-shape-label">{{ shape.label }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .shape-controls {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .preset-row {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .preset-row label {
        font-size: 13px;
        min-width: 50px;
      }
      .preset-group {
        flex: 1;
      }
      .corners {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .corner-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 4px 8px;
        margin: 0 -8px;
        border-radius: 6px;
        transition: background-color 120ms ease;
      }
      .corner-row:hover {
        background: var(--mat-sys-surface-container-high, #ece6f0);
      }
      .corner-row label {
        font-size: 13px;
        flex: 1;
      }
      .corner-input-wrap {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .corner-row input {
        width: 72px;
        padding: 7px 8px;
        border: 1px solid var(--mat-sys-outline-variant, #ccc);
        border-radius: 6px;
        font-size: 13px;
        background: var(--mat-sys-surface-container-lowest, #fff);
        color: var(--mat-sys-on-surface, #1c1b1f);
      }
      .corner-row input:focus-visible {
        outline: 2px solid var(--mat-sys-primary, #6750a4);
        outline-offset: 1px;
      }
      .unit {
        font-size: 12px;
        color: var(--mat-sys-on-surface-variant, #666);
      }
      .shape-preview {
        padding: 12px;
        border-radius: 8px;
        background: var(--mat-sys-surface-container-low, #f7f2fa);
      }
      .preview-caption {
        display: block;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        color: var(--mat-sys-on-surface-variant, #666);
        margin-bottom: 10px;
      }
      .preview-shapes {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }
      .preview-shape-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .preview-shape {
        width: 44px;
        height: 44px;
        background: var(--mat-sys-primary-container, #ead8ff);
        border: 2px solid var(--mat-sys-primary, #6750a4);
        transition: border-radius 150ms ease;
      }
      .preview-shape-label {
        font-size: 10px;
        color: var(--mat-sys-on-surface-variant, #666);
      }
    `,
  ],
})
export class ShapeControlComponent {
  readonly theme = inject(ThemeConfigService);
  readonly presets = SHAPE_PRESETS;
  readonly cornerFields = CORNER_FIELDS;

  readonly previewShapes = computed(() => {
    const s = this.theme.config().shape;
    return [
      { label: 'XS', radius: Math.min(s.cornerExtraSmall, 22) },
      { label: 'S', radius: Math.min(s.cornerSmall, 22) },
      { label: 'M', radius: Math.min(s.cornerMedium, 22) },
      { label: 'L', radius: Math.min(s.cornerLarge, 22) },
      { label: 'XL', radius: Math.min(s.cornerExtraLarge, 22) },
    ];
  });

  onPreset(preset: ShapePreset): void {
    const p = SHAPE_PRESETS.find(x => x.value === preset);
    if (p) {
      this.theme.updateShape({
        preset,
        cornerExtraSmall: p.corners[0],
        cornerSmall: p.corners[1],
        cornerMedium: p.corners[2],
        cornerLarge: p.corners[3],
        cornerExtraLarge: p.corners[4],
      });
    }
  }

  onCorner(key: CornerField['key'], value: number): void {
    this.theme.updateShape({ [key]: +value });
  }
}
