import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { ThemeConfigService } from '../../core/theme/theme-config.service';

@Component({
  selector: 'app-density-control',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSliderModule, FormsModule],
  template: `
    <div class="density-controls">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Density (0 = default, -5 = most compact)</mat-label>
        <input matInput type="number" min="-5" max="0" [ngModel]="theme.config().density.value" (ngModelChange)="theme.updateDensity({ value: +$event })" />
      </mat-form-field>
      <p class="hint">Affects padding and height inside components. Material derives this from the theme.</p>
    </div>
  `,
  styles: [`.density-controls { display: flex; flex-direction: column; gap: 8px; } .full-width { width: 100%; } .hint { font-size: 12px; color: #666; margin: 0; }`],
})
export class DensityControlComponent {
  readonly theme = inject(ThemeConfigService);
}
