import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { ThemeConfigService } from '../../core/theme/theme-config.service';

@Component({
  selector: 'app-spacing-control',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSliderModule, FormsModule],
  template: `
    <div class="spacing-controls">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Base unit (px)</mat-label>
        <input matInput type="number" min="4" max="24" [ngModel]="theme.config().spacing.baseUnit" (ngModelChange)="theme.updateSpacing({ baseUnit: +$event })" />
      </mat-form-field>
      <p class="hint">All spacing tokens derive from this base (e.g. 1×, 2×, 3×).</p>
    </div>
  `,
  styles: [`.spacing-controls { display: flex; flex-direction: column; gap: 8px; } .full-width { width: 100%; } .hint { font-size: 12px; color: #666; margin: 0; }`],
})
export class SpacingControlComponent {
  readonly theme = inject(ThemeConfigService);
}
