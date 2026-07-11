import { Component, inject, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ThemeConfigService } from '../../core/theme/theme-config.service';
import { ColorsControlComponent } from '../colors-control/colors-control.component';
import { TypographyControlComponent } from '../typography-control/typography-control.component';
import { SpacingControlComponent } from '../spacing-control/spacing-control.component';
import { ShapeControlComponent } from '../shape-control/shape-control.component';
import { ElevationControlComponent } from '../elevation-control/elevation-control.component';
import { DensityControlComponent } from '../density-control/density-control.component';

@Component({
  selector: 'app-global-controls',
  standalone: true,
  imports: [
    MatExpansionModule,
    ColorsControlComponent,
    TypographyControlComponent,
    SpacingControlComponent,
    ShapeControlComponent,
    ElevationControlComponent,
    DensityControlComponent,
  ],
  template: `
    <div class="global-controls-wrapper">
      <h2 class="panel-title">Theme Settings</h2>
      <mat-accordion class="global-accordion" [multi]="false">
        <mat-expansion-panel [expanded]="expandedPanel() === 'colors'" (opened)="expandedPanel.set('colors')">
          <mat-expansion-panel-header>
            <mat-panel-title>Colors</mat-panel-title>
          </mat-expansion-panel-header>
          <app-colors-control />
        </mat-expansion-panel>

        <mat-expansion-panel [expanded]="expandedPanel() === 'typography'" (opened)="expandedPanel.set('typography')">
          <mat-expansion-panel-header>
            <mat-panel-title>Typography</mat-panel-title>
          </mat-expansion-panel-header>
          <app-typography-control />
        </mat-expansion-panel>

        <mat-expansion-panel [expanded]="expandedPanel() === 'spacing'" (opened)="expandedPanel.set('spacing')">
          <mat-expansion-panel-header>
            <mat-panel-title>Spacing</mat-panel-title>
          </mat-expansion-panel-header>
          <app-spacing-control />
        </mat-expansion-panel>

        <mat-expansion-panel [expanded]="expandedPanel() === 'shape'" (opened)="expandedPanel.set('shape')">
          <mat-expansion-panel-header>
            <mat-panel-title>Shape</mat-panel-title>
          </mat-expansion-panel-header>
          <app-shape-control />
        </mat-expansion-panel>

        <mat-expansion-panel [expanded]="expandedPanel() === 'elevation'" (opened)="expandedPanel.set('elevation')">
          <mat-expansion-panel-header>
            <mat-panel-title>Elevation</mat-panel-title>
          </mat-expansion-panel-header>
          <app-elevation-control />
        </mat-expansion-panel>

        <mat-expansion-panel [expanded]="expandedPanel() === 'density'" (opened)="expandedPanel.set('density')">
          <mat-expansion-panel-header>
            <mat-panel-title>Density</mat-panel-title>
          </mat-expansion-panel-header>
          <app-density-control />
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
  styles: [
    `
      .global-controls-wrapper {
        padding: 16px;
        height: 100%;
        overflow-y: auto;
      }
      .panel-title {
        margin: 0 0 16px 0;
        font-size: 1.25rem;
        font-weight: 500;
      }
      .global-accordion {
        display: flex;
        flex-direction: column;
      }
      .global-accordion ::ng-deep .mat-expansion-panel-body {
        padding: 16px 0;
      }
      .global-accordion ::ng-deep .mat-expansion-panel {
        margin-bottom: 8px;
      }
    `,
  ],
})
export class GlobalControlsComponent {
  private readonly theme = inject(ThemeConfigService);
  readonly expandedPanel = signal<string>('colors');
}
