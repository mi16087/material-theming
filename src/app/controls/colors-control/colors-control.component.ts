import { Component, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeConfigService } from '../../core/theme/theme-config.service';
import type { ThemeColors } from '../../core/theme/theme-config.model';

interface ColorField {
  key: keyof ThemeColors;
  label: string;
}

interface ColorGroup {
  title: string;
  fields: ColorField[];
}

const COLOR_GROUPS: ColorGroup[] = [
  {
    title: 'Primary',
    fields: [
      { key: 'primary', label: 'Primary' },
      { key: 'onPrimary', label: 'On Primary' },
      { key: 'primaryContainer', label: 'Primary Container' },
      { key: 'onPrimaryContainer', label: 'On Primary Container' },
    ],
  },
  {
    title: 'Secondary',
    fields: [
      { key: 'secondary', label: 'Secondary' },
      { key: 'onSecondary', label: 'On Secondary' },
      { key: 'secondaryContainer', label: 'Secondary Container' },
      { key: 'onSecondaryContainer', label: 'On Secondary Container' },
    ],
  },
  {
    title: 'Tertiary',
    fields: [
      { key: 'tertiary', label: 'Tertiary' },
      { key: 'onTertiary', label: 'On Tertiary' },
      { key: 'tertiaryContainer', label: 'Tertiary Container' },
      { key: 'onTertiaryContainer', label: 'On Tertiary Container' },
    ],
  },
  {
    title: 'Error',
    fields: [
      { key: 'error', label: 'Error' },
      { key: 'onError', label: 'On Error' },
      { key: 'errorContainer', label: 'Error Container' },
      { key: 'onErrorContainer', label: 'On Error Container' },
    ],
  },
  {
    title: 'Surfaces',
    fields: [
      { key: 'surface', label: 'Surface' },
      { key: 'onSurface', label: 'On Surface' },
      { key: 'surfaceVariant', label: 'Surface Variant' },
      { key: 'onSurfaceVariant', label: 'On Surface Variant' },
      { key: 'surfaceContainerLowest', label: 'Container Lowest' },
      { key: 'surfaceContainerLow', label: 'Container Low' },
      { key: 'surfaceContainer', label: 'Container' },
      { key: 'surfaceContainerHigh', label: 'Container High' },
      { key: 'surfaceContainerHighest', label: 'Container Highest' },
      { key: 'inverseSurface', label: 'Inverse Surface' },
      { key: 'inverseOnSurface', label: 'Inverse On Surface' },
    ],
  },
  {
    title: 'Background & Outline',
    fields: [
      { key: 'background', label: 'Background' },
      { key: 'onBackground', label: 'On Background' },
      { key: 'outline', label: 'Outline' },
      { key: 'outlineVariant', label: 'Outline Variant' },
    ],
  },
];

/** Short hints for what each Material 3 color role controls in the UI. */
const COLOR_HINTS: Partial<Record<keyof ThemeColors, string>> = {
  primary: 'Main brand color — buttons, FABs, active states',
  onPrimary: 'Text and icons on primary-colored surfaces',
  primaryContainer: 'Muted primary backgrounds, selected chips',
  onPrimaryContainer: 'Text on primary container surfaces',
  secondary: 'Secondary accents — less prominent actions',
  onSecondary: 'Text and icons on secondary surfaces',
  tertiary: 'Contrasting accents — badges, highlights',
  onTertiary: 'Text on tertiary surfaces',
  error: 'Error states — form validation, alerts',
  onError: 'Text on error-colored surfaces',
  surface: 'Default page and card backgrounds',
  onSurface: 'Primary text on surfaces',
  onSurfaceVariant: 'Secondary text, captions, hints',
  outline: 'Borders, dividers, focus rings',
  outlineVariant: 'Subtle borders and separators',
  background: 'App background behind content',
  onBackground: 'Text on the app background',
};

@Component({
  selector: 'app-colors-control',
  standalone: true,
  imports: [MatTooltipModule],
  template: `
    <div class="colors-groups">
      @for (group of colorGroups; track group.title) {
        <section class="color-group">
          <h4 class="group-title">{{ group.title }}</h4>
          <div class="colors-grid">
            @for (item of group.fields; track item.key) {
              <div class="color-row">
                <label
                  [for]="'color-' + item.key"
                  [matTooltip]="getHint(item.key)"
                  matTooltipPosition="left"
                >{{ item.label }}</label>
                <div class="color-inputs">
                  <input
                    type="color"
                    [id]="'color-' + item.key"
                    [value]="getColor(item.key)"
                    (input)="setColorImmediate(item.key, $event)"
                    [attr.aria-label]="item.label + ' color picker'"
                  />
                  <input
                    type="text"
                    class="hex-input"
                    [value]="getColor(item.key)"
                    (input)="setColorDebounced(item.key, $any($event.target).value)"
                    [attr.aria-label]="item.label + ' hex value'"
                    maxlength="7"
                    spellcheck="false"
                  />
                </div>
              </div>
            }
          </div>
        </section>
      }
    </div>
  `,
  styles: [
    `
      .colors-groups {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .color-group {
        border-radius: 8px;
        background: var(--mat-sys-surface-container-low, #f7f2fa);
        padding: 10px 12px 12px;
      }
      .group-title {
        margin: 0 0 6px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--mat-sys-on-surface-variant, #666);
      }
      .colors-grid {
        display: flex;
        flex-direction: column;
      }
      .color-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 6px 8px;
        margin: 0 -8px;
        border-radius: 6px;
        transition: background-color 120ms ease;
      }
      .color-row:hover {
        background: var(--mat-sys-surface-container-high, #ece6f0);
      }
      .color-row label {
        font-size: 13px;
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
      .color-inputs {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }
      .color-inputs input[type='color'] {
        width: 34px;
        height: 34px;
        padding: 2px;
        cursor: pointer;
        border: 1px solid var(--mat-sys-outline-variant, #ccc);
        border-radius: 8px;
        background: transparent;
        transition: border-color 120ms ease, box-shadow 120ms ease;
      }
      .color-inputs input[type='color']:hover {
        border-color: var(--mat-sys-outline, #79747e);
      }
      .color-inputs input[type='color']:focus-visible,
      .hex-input:focus-visible {
        outline: 2px solid var(--mat-sys-primary, #6750a4);
        outline-offset: 1px;
      }
      .hex-input {
        width: 82px;
        padding: 7px 8px;
        font-family: monospace;
        font-size: 12px;
        border: 1px solid var(--mat-sys-outline-variant, #ccc);
        border-radius: 6px;
        background: var(--mat-sys-surface-container-lowest, #fff);
        color: var(--mat-sys-on-surface, #1c1b1f);
        transition: border-color 120ms ease;
      }
      .hex-input:hover {
        border-color: var(--mat-sys-outline, #79747e);
      }
    `,
  ],
})
export class ColorsControlComponent {
  readonly theme = inject(ThemeConfigService);
  readonly colorGroups = COLOR_GROUPS;
  private readonly debounceTimers = new Map<string, ReturnType<typeof setTimeout>>();

  getHint(key: keyof ThemeColors): string {
    return COLOR_HINTS[key] ?? 'Material 3 system color token';
  }

  getColor(key: keyof ThemeColors): string {
    return this.theme.config().colors[key] ?? '#000000';
  }

  setColorImmediate(key: keyof ThemeColors, event: Event): void {
    this.applyColor(key, (event.target as HTMLInputElement).value);
  }

  setColorDebounced(key: keyof ThemeColors, value: string): void {
    const existing = this.debounceTimers.get(key);
    if (existing) clearTimeout(existing);
    this.debounceTimers.set(
      key,
      setTimeout(() => {
        this.debounceTimers.delete(key);
        this.applyColor(key, value);
      }, 120)
    );
  }

  private applyColor(key: keyof ThemeColors, hex: string): void {
    if (hex && (/^#[0-9A-Fa-f]{6}$/.test(hex) || /^[0-9A-Fa-f]{6}$/.test(hex))) {
      const normalized = hex.startsWith('#') ? hex : '#' + hex;
      this.theme.updateColors({ [key]: normalized });
    }
  }
}
