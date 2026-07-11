import { Component, computed, inject } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { ThemeConfigService } from '../../core/theme/theme-config.service';

@Component({
  selector: 'app-density-control',
  standalone: true,
  imports: [MatSliderModule, FormsModule],
  template: `
    <div class="density-controls">
      <div class="slider-row">
        <label id="density-label">Density</label>
        <mat-slider min="-5" max="0" step="1" discrete showTickMarks class="density-slider">
          <input
            matSliderThumb
            aria-labelledby="density-label"
            [ngModel]="theme.config().density.value"
            (ngModelChange)="theme.updateDensity({ value: +$event })"
          />
        </mat-slider>
        <span class="value-chip">{{ theme.config().density.value }}</span>
      </div>
      <p class="hint">0 = default, -5 = most compact. Reduces component heights by 4px per step.</p>

      <div class="density-preview" aria-hidden="true">
        <span class="preview-caption">Preview — button &amp; list row height</span>
        <div class="preview-samples">
          @for (sample of samples(); track sample.label) {
            <div class="sample" [class.active]="sample.active">
              <span class="sample-button" [style.height.px]="sample.buttonHeight">Button</span>
              <span class="sample-row" [style.height.px]="sample.rowHeight">List item</span>
              <span class="sample-label">{{ sample.label }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .density-controls {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .slider-row {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .slider-row label {
        font-size: 13px;
      }
      .density-slider {
        flex: 1;
      }
      .value-chip {
        font-size: 13px;
        font-weight: 600;
        min-width: 28px;
        text-align: center;
        padding: 2px 8px;
        border-radius: 12px;
        background: var(--mat-sys-primary-container, #ead8ff);
        color: var(--mat-sys-on-primary-container, #21005d);
      }
      .hint {
        font-size: 12px;
        color: var(--mat-sys-on-surface-variant, #666);
        margin: 0;
      }
      .density-preview {
        margin-top: 8px;
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
      .preview-samples {
        display: flex;
        gap: 12px;
        align-items: flex-end;
      }
      .sample {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
        align-items: stretch;
        opacity: 0.55;
      }
      .sample.active {
        opacity: 1;
      }
      .sample-button {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        border-radius: 999px;
        background: var(--mat-sys-primary, #6750a4);
        color: var(--mat-sys-on-primary, #fff);
      }
      .sample-row {
        display: flex;
        align-items: center;
        padding: 0 8px;
        font-size: 11px;
        border-radius: 4px;
        border: 1px solid var(--mat-sys-outline-variant, #ccc);
        background: var(--mat-sys-surface-container-lowest, #fff);
        color: var(--mat-sys-on-surface, #1c1b1f);
      }
      .sample-label {
        text-align: center;
        font-size: 11px;
        font-weight: 600;
        color: var(--mat-sys-on-surface-variant, #666);
      }
    `,
  ],
})
export class DensityControlComponent {
  readonly theme = inject(ThemeConfigService);

  readonly samples = computed(() => {
    const current = this.theme.config().density.value;
    return [0, -3, -5].map((value) => ({
      label: `${value}`,
      buttonHeight: 40 + value * 4,
      rowHeight: 48 + value * 4,
      active: value === current || (current !== 0 && current !== -3 && current !== -5 && value === -3),
    }));
  });
}
