import { Component, inject } from '@angular/core';
import { ThemeConfigService } from '../../core/theme/theme-config.service';
import type { ThemeColors } from '../../core/theme/theme-config.model';

@Component({
  selector: 'app-colors-control',
  standalone: true,
  imports: [],
  template: `
    <div class="colors-grid">
      @for (item of colorFields; track item.key) {
        <div class="color-row">
          <label>{{ item.label }}</label>
          <div class="color-inputs">
            <input type="color" [value]="getColor(item.key)" (input)="setColor(item.key, $event)" />
            <input type="text" [value]="getColor(item.key)" (input)="setColor(item.key, $any($event.target).value)" class="hex-input" />
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .colors-grid {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .color-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 4px 0;
      }
      .color-row label {
        font-size: 13px;
        flex: 1;
        min-width: 0;
      }
      .color-inputs {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }
      .color-inputs input[type="color"] {
        width: 32px;
        height: 32px;
        padding: 2px;
        cursor: pointer;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: transparent;
      }
      .hex-input {
        width: 80px;
        padding: 6px 8px;
        font-family: monospace;
        font-size: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    `,
  ],
})
export class ColorsControlComponent {
  readonly theme = inject(ThemeConfigService);

  readonly colorFields: { key: keyof ThemeColors; label: string }[] = [
    { key: 'primary', label: 'Primary' },
    { key: 'onPrimary', label: 'On Primary' },
    { key: 'primaryContainer', label: 'Primary Container' },
    { key: 'onPrimaryContainer', label: 'On Primary Container' },
    { key: 'secondary', label: 'Secondary' },
    { key: 'onSecondary', label: 'On Secondary' },
    { key: 'secondaryContainer', label: 'Secondary Container' },
    { key: 'onSecondaryContainer', label: 'On Secondary Container' },
    { key: 'tertiary', label: 'Tertiary' },
    { key: 'onTertiary', label: 'On Tertiary' },
    { key: 'tertiaryContainer', label: 'Tertiary Container' },
    { key: 'onTertiaryContainer', label: 'On Tertiary Container' },
    { key: 'error', label: 'Error' },
    { key: 'onError', label: 'On Error' },
    { key: 'errorContainer', label: 'Error Container' },
    { key: 'onErrorContainer', label: 'On Error Container' },
    { key: 'surface', label: 'Surface' },
    { key: 'onSurface', label: 'On Surface' },
    { key: 'surfaceVariant', label: 'Surface Variant' },
    { key: 'onSurfaceVariant', label: 'On Surface Variant' },
    { key: 'surfaceContainer', label: 'Surface Container' },
    { key: 'surfaceContainerHigh', label: 'Surface Container High' },
    { key: 'surfaceContainerHighest', label: 'Surface Container Highest' },
    { key: 'surfaceContainerLow', label: 'Surface Container Low' },
    { key: 'surfaceContainerLowest', label: 'Surface Container Lowest' },
    { key: 'inverseSurface', label: 'Inverse Surface' },
    { key: 'inverseOnSurface', label: 'Inverse On Surface' },
    { key: 'outline', label: 'Outline' },
    { key: 'outlineVariant', label: 'Outline Variant' },
    { key: 'background', label: 'Background' },
    { key: 'onBackground', label: 'On Background' },
  ];

  getColor(key: keyof ThemeColors): string {
    return this.theme.config().colors[key] ?? '#000000';
  }

  setColor(key: keyof ThemeColors, value: string | Event): void {
    const hex = typeof value === 'string' ? value : (value.target as HTMLInputElement).value;
    if (hex && (/^#[0-9A-Fa-f]{6}$/.test(hex) || /^[0-9A-Fa-f]{6}$/.test(hex))) {
      const normalized = hex.startsWith('#') ? hex : '#' + hex;
      this.theme.updateColors({ [key]: normalized });
    }
  }
}
