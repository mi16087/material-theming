import { Component, inject, input, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeConfigService } from '../../core/theme/theme-config.service';
import { COMPONENT_TOKEN_META, type TokenMeta } from '../../core/theme/component-tokens';

@Component({
  selector: 'app-component-fine-tune',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="fine-tune-panel-inner">
      <div class="panel-header">
        <h3>Fine-tune: {{ componentId() }}</h3>
        <button mat-icon-button (click)="close()" aria-label="Close">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      @if (tokens().length === 0) {
        <p class="no-tokens">No override tokens defined for this component.</p>
      } @else {
        <div class="token-list">
          @for (t of tokens(); track t.key) {
            <div class="token-row">
              <label [title]="t.key">{{ t.label }}</label>
              <div class="token-inputs">
                @if (t.type === 'color') {
                  <input type="color" [value]="getTokenValue(t.key) || '#000000'" (input)="setToken(t.key, $any($event.target).value)" class="color-in" />
                  <input type="text" [value]="getTokenValue(t.key)" (input)="setToken(t.key, $any($event.target).value)" class="hex-in" placeholder="#000000" />
                } @else if (t.type === 'number') {
                  <input type="number" [value]="getTokenValue(t.key)" (input)="setToken(t.key, $any($event.target).value)" class="num-in" placeholder="0" />
                } @else {
                  <input type="text" [value]="getTokenValue(t.key)" (input)="setToken(t.key, $any($event.target).value)" class="text-in" placeholder="value" />
                }
              </div>
            </div>
          }
        </div>
        <button mat-button color="warn" class="reset-btn" (click)="resetOverrides()">Reset All</button>
      }
    </div>
  `,
  styles: [
    `
      .fine-tune-panel-inner {
        padding: 16px;
        height: 100%;
        overflow-y: auto;
      }
      .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid #e0e0e0;
      }
      .panel-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
      }
      .no-tokens {
        font-size: 13px;
        color: #666;
      }
      .token-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .token-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .token-row label {
        font-size: 12px;
        color: #333;
      }
      .token-inputs {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .color-in {
        width: 36px;
        height: 36px;
        padding: 2px;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        background: transparent;
      }
      .hex-in {
        width: 90px;
        font-family: monospace;
        font-size: 12px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .num-in {
        width: 80px;
        padding: 8px;
        font-size: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .text-in {
        flex: 1;
        min-width: 100px;
        padding: 8px;
        font-size: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .reset-btn {
        margin-top: 16px;
        width: 100%;
      }
    `,
  ],
})
export class ComponentFineTuneComponent {
  componentId = input.required<string>();
  private readonly theme = inject(ThemeConfigService);

  readonly tokens = computed(() => {
    const id = this.componentId();
    return COMPONENT_TOKEN_META[id] ?? [];
  });

  getTokenValue(key: string): string | number {
    const id = this.componentId();
    const val = this.theme.getComponentOverrides(id)[key];
    return val ?? '';
  }

  setToken(key: string, value: string | number): void {
    const id = this.componentId();
    const meta = COMPONENT_TOKEN_META[id];
    const t = meta?.find(m => m.key === key);
    let final: string | number = value;
    if (t?.type === 'number') {
      final = typeof value === 'string' ? parseFloat(value) || 0 : value;
    } else {
      final = String(value);
    }
    this.theme.updateComponentOverride(id, key, final);
  }

  resetOverrides(): void {
    const id = this.componentId();
    this.theme.setComponentOverrides(id, {});
  }

  close(): void {
    this.theme.selectComponent(null);
  }
}
