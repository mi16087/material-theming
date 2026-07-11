import { Component, computed, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { ThemeConfigService } from '../../core/theme/theme-config.service';
import type { ElevationPreset } from '../../core/theme/theme-config.model';

const ELEVATION_PRESETS: ElevationPreset[] = ['none', 'low', 'medium', 'high'];

const SHADOWS: Record<ElevationPreset, string[]> = {
  none: ['none', 'none', 'none', 'none', 'none', 'none'],
  low: ['none', '0 1px 2px rgba(0,0,0,0.1)', '0 2px 4px rgba(0,0,0,0.1)', '0 4px 8px rgba(0,0,0,0.1)', '0 6px 12px rgba(0,0,0,0.1)', '0 8px 16px rgba(0,0,0,0.1)'],
  medium: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)',
  ],
  high: [
    'none',
    '0 4px 6px rgba(0,0,0,0.2)',
    '0 6px 12px rgba(0,0,0,0.2)',
    '0 10px 20px rgba(0,0,0,0.2)',
    '0 14px 28px rgba(0,0,0,0.2)',
    '0 20px 40px rgba(0,0,0,0.25)',
  ],
};

@Component({
  selector: 'app-elevation-control',
  standalone: true,
  imports: [MatButtonToggleModule, FormsModule],
  template: `
    <div class="elevation-controls">
      <mat-button-toggle-group
        [ngModel]="theme.config().elevation.preset"
        (ngModelChange)="onPreset($event)"
        aria-label="Elevation preset"
        hideSingleSelectionIndicator
        class="preset-group"
      >
        @for (p of presets; track p) {
          <mat-button-toggle [value]="p">{{ p }}</mat-button-toggle>
        }
      </mat-button-toggle-group>
      <p class="hint">Elevation affects shadows on cards, dialogs, menus, etc.</p>

      <div class="elevation-preview" aria-hidden="true">
        <span class="preview-caption">Levels 0–5</span>
        <div class="level-grid">
          @for (lvl of levels(); track lvl.index) {
            <div class="level-card" [style.box-shadow]="lvl.shadow">
              <span>{{ lvl.index }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .elevation-controls {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .preset-group ::ng-deep .mat-button-toggle-button {
        text-transform: capitalize;
      }
      .hint {
        font-size: 12px;
        color: var(--mat-sys-on-surface-variant, #666);
        margin: 0;
      }
      .elevation-preview {
        margin-top: 8px;
        padding: 14px 12px;
        border-radius: 8px;
        background: var(--mat-sys-surface-container-low, #f7f2fa);
      }
      .preview-caption {
        display: block;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        color: var(--mat-sys-on-surface-variant, #666);
        margin-bottom: 12px;
      }
      .level-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 14px;
      }
      .level-card {
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background: var(--mat-sys-surface-container-lowest, #fff);
        border: 1px solid var(--mat-sys-outline-variant, #eee);
        font-size: 12px;
        font-weight: 600;
        color: var(--mat-sys-on-surface-variant, #666);
        transition: box-shadow 150ms ease;
      }
    `,
  ],
})
export class ElevationControlComponent {
  readonly theme = inject(ThemeConfigService);
  readonly presets = ELEVATION_PRESETS;

  readonly levels = computed(() => {
    const e = this.theme.config().elevation;
    return [e.level0, e.level1, e.level2, e.level3, e.level4, e.level5].map((shadow, index) => ({
      index,
      shadow,
    }));
  });

  onPreset(preset: ElevationPreset): void {
    const s = SHADOWS[preset] ?? SHADOWS.medium;
    this.theme.updateElevation({
      preset,
      level0: s[0],
      level1: s[1],
      level2: s[2],
      level3: s[3],
      level4: s[4],
      level5: s[5],
    });
  }
}
