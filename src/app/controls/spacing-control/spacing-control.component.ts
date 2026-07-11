import { Component, computed, inject } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { ThemeConfigService } from '../../core/theme/theme-config.service';

@Component({
  selector: 'app-spacing-control',
  standalone: true,
  imports: [MatSliderModule, FormsModule],
  template: `
    <div class="spacing-controls">
      <div class="slider-row">
        <label id="spacing-label">Base unit</label>
        <mat-slider min="4" max="16" step="1" discrete class="spacing-slider">
          <input
            matSliderThumb
            aria-labelledby="spacing-label"
            [ngModel]="theme.config().spacing.baseUnit"
            (ngModelChange)="theme.updateSpacing({ baseUnit: +$event })"
          />
        </mat-slider>
        <span class="value-chip">{{ theme.config().spacing.baseUnit }}px</span>
      </div>
      <p class="hint">All spacing tokens derive from this base (1×, 2×, 3×, 4×).</p>

      <div class="spacing-preview" aria-hidden="true">
        <span class="preview-caption">Spacing scale</span>
        @for (step of steps(); track step.mult) {
          <div class="scale-row">
            <span class="scale-label">{{ step.mult }}×</span>
            <span class="scale-bar" [style.width.px]="step.px"></span>
            <span class="scale-px">{{ step.px }}px</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .spacing-controls {
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
      .spacing-slider {
        flex: 1;
      }
      .value-chip {
        font-size: 13px;
        font-weight: 600;
        min-width: 40px;
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
      .spacing-preview {
        margin-top: 8px;
        padding: 12px;
        border-radius: 8px;
        background: var(--mat-sys-surface-container-low, #f7f2fa);
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .preview-caption {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        color: var(--mat-sys-on-surface-variant, #666);
        margin-bottom: 2px;
      }
      .scale-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .scale-label {
        font-size: 12px;
        font-weight: 600;
        width: 22px;
        color: var(--mat-sys-on-surface-variant, #666);
      }
      .scale-bar {
        height: 14px;
        border-radius: 4px;
        background: var(--mat-sys-primary, #6750a4);
        transition: width 150ms ease;
      }
      .scale-px {
        font-size: 11px;
        color: var(--mat-sys-on-surface-variant, #666);
      }
    `,
  ],
})
export class SpacingControlComponent {
  readonly theme = inject(ThemeConfigService);

  readonly steps = computed(() => {
    const base = this.theme.config().spacing.baseUnit;
    return [1, 2, 3, 4].map((mult) => ({ mult, px: base * mult }));
  });
}
