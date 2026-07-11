import { Component, inject } from '@angular/core';
import { ThemeConfigService } from '../core/theme/theme-config.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';
import { ShowcaseBottomSheetComponent } from './showcase-bottom-sheet.component';

const SHOWCASE_COMPONENTS: { id: string; label: string }[] = [
  { id: 'button', label: 'Button' },
  { id: 'card', label: 'Card' },
  { id: 'form-field', label: 'Form Field' },
  { id: 'input', label: 'Input' },
  { id: 'chip', label: 'Chips' },
  { id: 'toolbar', label: 'Toolbar' },
  { id: 'tabs', label: 'Tabs' },
  { id: 'menu', label: 'Menu' },
  { id: 'checkbox', label: 'Checkbox' },
  { id: 'radio', label: 'Radio' },
  { id: 'select', label: 'Select' },
  { id: 'slider', label: 'Slider' },
  { id: 'slide-toggle', label: 'Slide Toggle' },
  { id: 'progress-bar', label: 'Progress Bar' },
  { id: 'progress-spinner', label: 'Progress Spinner' },
  { id: 'badge', label: 'Badge' },
  { id: 'button-toggle', label: 'Button Toggle' },
  { id: 'list', label: 'List' },
  { id: 'expansion', label: 'Expansion' },
  { id: 'stepper', label: 'Stepper' },
  { id: 'table', label: 'Table' },
  { id: 'paginator', label: 'Paginator' },
  { id: 'divider', label: 'Divider' },
  { id: 'tooltip', label: 'Tooltip' },
  { id: 'dialog', label: 'Dialog' },
  { id: 'snack-bar', label: 'Snackbar' },
  { id: 'sidenav', label: 'Sidenav' },
  { id: 'autocomplete', label: 'Autocomplete' },
  { id: 'datepicker', label: 'Datepicker' },
  { id: 'bottom-sheet', label: 'Bottom Sheet' },
];

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatListModule,
    MatExpansionModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    NgClass,
  ],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss',
})
export class ShowcaseComponent {
  readonly theme = inject(ThemeConfigService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private readonly bottomSheet = inject(MatBottomSheet);

  readonly components = SHOWCASE_COMPONENTS;
  tableData = new MatTableDataSource([{ name: 'Item 1', value: 10 }, { name: 'Item 2', value: 20 }]);
  displayedColumns = ['name', 'value'];
  selected = 'option1';
  sliderValue = 50;
  toggleValue = false;
  stepperStep = 0;
  autocompleteOptions = ['Option A', 'Option B', 'Option C'];
  autocompleteValue = '';

  selectComponent(id: string): void {
    this.theme.selectComponent(id);
  }

  openDialog(): void {
    this.dialog.open(ShowcaseDialogComponent, { width: '400px' });
  }

  openSnackbar(): void {
    this.snackBar.open('Snackbar message', 'Close', { duration: 3000 });
  }

  openBottomSheet(): void {
    this.bottomSheet.open(ShowcaseBottomSheetComponent);
  }

  getOverrideClass(compId: string): Record<string, boolean> {
    const hasOverrides = this.theme.overrides()[compId] && Object.keys(this.theme.overrides()[compId]).length > 0;
    return { ['mat-theme-override-' + compId]: hasOverrides };
  }
}
