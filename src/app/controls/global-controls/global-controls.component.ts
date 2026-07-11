import { Component, inject, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ThemeConfigService } from '../../core/theme/theme-config.service';
import { ColorsControlComponent } from '../colors-control/colors-control.component';
import { TypographyControlComponent } from '../typography-control/typography-control.component';
import { SpacingControlComponent } from '../spacing-control/spacing-control.component';
import { ShapeControlComponent } from '../shape-control/shape-control.component';
import { ElevationControlComponent } from '../elevation-control/elevation-control.component';
import { DensityControlComponent } from '../density-control/density-control.component';

interface PanelDef {
  id: string;
  title: string;
  icon: string;
  description: string;
}

const PANELS: PanelDef[] = [
  { id: 'colors', title: 'Colors', icon: 'palette', description: 'System color roles' },
  { id: 'typography', title: 'Typography', icon: 'text_fields', description: 'Font, sizes, weights' },
  { id: 'spacing', title: 'Spacing', icon: 'space_bar', description: 'Base spacing unit' },
  { id: 'shape', title: 'Shape', icon: 'rounded_corner', description: 'Corner radius tokens' },
  { id: 'elevation', title: 'Elevation', icon: 'layers', description: 'Shadow depth' },
  { id: 'density', title: 'Density', icon: 'density_medium', description: 'Component compactness' },
];

@Component({
  selector: 'app-global-controls',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
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
      <p class="panel-subtitle">Changes apply live to the showcase on the right.</p>
      <mat-accordion class="global-accordion" [multi]="false">
        @for (panel of panels; track panel.id) {
          <mat-expansion-panel
            [expanded]="expandedPanel() === panel.id"
            (opened)="expandedPanel.set(panel.id)"
          >
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon class="panel-icon" aria-hidden="true">{{ panel.icon }}</mat-icon>
                {{ panel.title }}
              </mat-panel-title>
              <mat-panel-description>{{ panel.description }}</mat-panel-description>
            </mat-expansion-panel-header>
            @switch (panel.id) {
              @case ('colors') { <app-colors-control /> }
              @case ('typography') { <app-typography-control /> }
              @case ('spacing') { <app-spacing-control /> }
              @case ('shape') { <app-shape-control /> }
              @case ('elevation') { <app-elevation-control /> }
              @case ('density') { <app-density-control /> }
            }
          </mat-expansion-panel>
        }
      </mat-accordion>
    </div>
  `,
  styles: [
    `
      .global-controls-wrapper {
        padding: 20px 16px;
        height: 100%;
        overflow-y: auto;
      }
      .panel-title {
        margin: 0 0 4px 4px;
        font-size: 1.25rem;
        font-weight: 500;
      }
      .panel-subtitle {
        margin: 0 0 16px 4px;
        font-size: 0.8125rem;
        color: var(--mat-sys-on-surface-variant, #666);
      }
      .global-accordion {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .global-accordion .mat-expansion-panel {
        border-radius: 12px !important;
        border: 1px solid var(--mat-sys-outline-variant, #e0e0e0);
        box-shadow: none;
      }
      .global-accordion .mat-expansion-panel.mat-expanded {
        border-color: var(--mat-sys-primary, #6750a4);
      }
      .panel-icon {
        margin-right: 10px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        color: var(--mat-sys-primary, #6750a4);
      }
      mat-panel-title {
        display: flex;
        align-items: center;
        font-weight: 500;
      }
      mat-panel-description {
        justify-content: flex-end;
        font-size: 12px;
        margin-right: 4px;
      }
      @media (max-width: 768px) {
        mat-panel-description {
          display: none;
        }
      }
      .global-accordion ::ng-deep .mat-expansion-panel-body {
        padding: 4px 20px 20px;
        border-top: 1px solid var(--mat-sys-outline-variant, #eee);
        margin-top: 2px;
        padding-top: 16px;
        background: var(--mat-sys-surface-container-lowest, #fff);
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }
    `,
  ],
})
export class GlobalControlsComponent {
  private readonly theme = inject(ThemeConfigService);
  readonly panels = PANELS;
  readonly expandedPanel = signal<string>('colors');
}
