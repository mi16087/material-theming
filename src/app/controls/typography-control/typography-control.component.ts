import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ThemeConfigService } from '../../core/theme/theme-config.service';

const FONT_OPTIONS = [
  'Roboto, sans-serif',
  'Open Sans, sans-serif',
  'Lato, sans-serif',
  'Inter, sans-serif',
  'Poppins, sans-serif',
  'system-ui, sans-serif',
];

@Component({
  selector: 'app-typography-control',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  template: `
    <div class="typography-controls">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Font family</mat-label>
        <mat-select [ngModel]="theme.config().typography.fontFamily" (ngModelChange)="theme.updateTypography({ fontFamily: $event })">
          @for (f of fontOptions; track f) {
            <mat-option [value]="f">{{ f }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Base size (px)</mat-label>
        <input matInput type="number" min="12" max="24" [ngModel]="theme.config().typography.baseSize" (ngModelChange)="theme.updateTypography({ baseSize: +$event })" />
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Regular weight</mat-label>
        <input matInput type="number" min="100" max="900" [ngModel]="theme.config().typography.regularWeight" (ngModelChange)="theme.updateTypography({ regularWeight: +$event })" />
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Medium weight</mat-label>
        <input matInput type="number" min="100" max="900" [ngModel]="theme.config().typography.mediumWeight" (ngModelChange)="theme.updateTypography({ mediumWeight: +$event })" />
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Bold weight</mat-label>
        <input matInput type="number" min="100" max="900" [ngModel]="theme.config().typography.boldWeight" (ngModelChange)="theme.updateTypography({ boldWeight: +$event })" />
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Line height</mat-label>
        <input matInput type="number" step="0.1" min="1" max="2" [ngModel]="theme.config().typography.lineHeight" (ngModelChange)="theme.updateTypography({ lineHeight: +$event })" />
      </mat-form-field>
    </div>
  `,
  styles: [`.typography-controls { display: flex; flex-direction: column; gap: 8px; } .full-width { width: 100%; }`],
})
export class TypographyControlComponent {
  readonly theme = inject(ThemeConfigService);
  readonly fontOptions = FONT_OPTIONS;
}
