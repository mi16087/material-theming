import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ThemeConfigService } from '../../core/theme/theme-config.service';
import type { ShapePreset } from '../../core/theme/theme-config.model';

const SHAPE_PRESETS: { value: ShapePreset; label: string; corners: [number, number, number, number, number] }[] = [
  { value: 'square', label: 'Square', corners: [0, 0, 0, 0, 0] },
  { value: 'rounded', label: 'Rounded', corners: [4, 8, 12, 16, 28] },
  { value: 'pill', label: 'Pill', corners: [16, 24, 28, 32, 9999] },
];

@Component({
  selector: 'app-shape-control',
  standalone: true,
  imports: [MatButtonToggleModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <div class="shape-controls">
      <div class="preset-row">
        <label>Preset</label>
        <mat-button-toggle-group [ngModel]="theme.config().shape.preset" (ngModelChange)="onPreset($event)" class="preset-group">
          @for (p of presets; track p.value) {
            <mat-button-toggle [value]="p.value">{{ p.label }}</mat-button-toggle>
          }
        </mat-button-toggle-group>
      </div>
      <div class="corners">
        <div class="corner-row">
          <label>Extra small (px)</label>
          <input type="number" min="0" max="100" [ngModel]="theme.config().shape.cornerExtraSmall" (ngModelChange)="theme.updateShape({ cornerExtraSmall: +$event })" />
        </div>
        <div class="corner-row">
          <label>Small (px)</label>
          <input type="number" min="0" max="100" [ngModel]="theme.config().shape.cornerSmall" (ngModelChange)="theme.updateShape({ cornerSmall: +$event })" />
        </div>
        <div class="corner-row">
          <label>Medium (px)</label>
          <input type="number" min="0" max="100" [ngModel]="theme.config().shape.cornerMedium" (ngModelChange)="theme.updateShape({ cornerMedium: +$event })" />
        </div>
        <div class="corner-row">
          <label>Large (px)</label>
          <input type="number" min="0" max="100" [ngModel]="theme.config().shape.cornerLarge" (ngModelChange)="theme.updateShape({ cornerLarge: +$event })" />
        </div>
        <div class="corner-row">
          <label>Extra large (px)</label>
          <input type="number" min="0" max="9999" [ngModel]="theme.config().shape.cornerExtraLarge" (ngModelChange)="theme.updateShape({ cornerExtraLarge: +$event })" />
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .shape-controls { display: flex; flex-direction: column; gap: 16px; }
      .preset-row { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
      .preset-row label { font-size: 13px; min-width: 50px; }
      .preset-group { flex: 1; }
      .corners { display: flex; flex-direction: column; gap: 8px; }
      .corner-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
      .corner-row label { font-size: 13px; flex: 1; }
      .corner-row input { width: 80px; padding: 6px 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; }
    `,
  ],
})
export class ShapeControlComponent {
  readonly theme = inject(ThemeConfigService);
  readonly presets = SHAPE_PRESETS;

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
}
