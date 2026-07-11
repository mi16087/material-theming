/**
 * Per-component override token metadata for the fine-tuning panel.
 * Keys match Angular Material's actual CSS custom property names.
 * Reference: https://material.angular.dev/components/{component} -> Styling tab
 */
export interface TokenMeta {
  key: string;
  label: string;
  type: 'color' | 'string' | 'number';
}

export const COMPONENT_TOKEN_META: Record<string, TokenMeta[]> = {
  button: [
    { key: '--mdc-filled-button-container-color', label: 'Filled container color', type: 'color' },
    { key: '--mdc-filled-button-label-text-color', label: 'Filled label color', type: 'color' },
    { key: '--mdc-filled-button-container-shape', label: 'Filled shape (px)', type: 'number' },
    { key: '--mdc-outlined-button-outline-color', label: 'Outlined border color', type: 'color' },
    { key: '--mdc-outlined-button-label-text-color', label: 'Outlined label color', type: 'color' },
    { key: '--mdc-outlined-button-container-shape', label: 'Outlined shape (px)', type: 'number' },
    { key: '--mdc-text-button-label-text-color', label: 'Text button label color', type: 'color' },
    { key: '--mdc-protected-button-container-color', label: 'Raised container color', type: 'color' },
    { key: '--mdc-protected-button-label-text-color', label: 'Raised label color', type: 'color' },
  ],
  card: [
    { key: '--mdc-elevated-card-container-color', label: 'Elevated container color', type: 'color' },
    { key: '--mdc-elevated-card-container-shape', label: 'Elevated shape (px)', type: 'number' },
    { key: '--mdc-elevated-card-container-elevation', label: 'Elevated elevation', type: 'string' },
    { key: '--mdc-outlined-card-container-color', label: 'Outlined container color', type: 'color' },
    { key: '--mdc-outlined-card-outline-color', label: 'Outlined border color', type: 'color' },
    { key: '--mdc-outlined-card-container-shape', label: 'Outlined shape (px)', type: 'number' },
    { key: '--mat-card-title-text-size', label: 'Title text size', type: 'string' },
    { key: '--mat-card-subtitle-text-size', label: 'Subtitle text size', type: 'string' },
  ],
  'form-field': [
    { key: '--mdc-outlined-text-field-outline-color', label: 'Outline color', type: 'color' },
    { key: '--mdc-outlined-text-field-focus-outline-color', label: 'Focus outline color', type: 'color' },
    { key: '--mdc-outlined-text-field-container-shape', label: 'Shape (px)', type: 'number' },
    { key: '--mdc-outlined-text-field-label-text-color', label: 'Label color', type: 'color' },
    { key: '--mdc-outlined-text-field-input-text-color', label: 'Input text color', type: 'color' },
    { key: '--mdc-filled-text-field-container-color', label: 'Filled container color', type: 'color' },
    { key: '--mdc-filled-text-field-label-text-color', label: 'Filled label color', type: 'color' },
  ],
  input: [
    { key: '--mdc-outlined-text-field-outline-color', label: 'Outline color', type: 'color' },
    { key: '--mdc-outlined-text-field-focus-outline-color', label: 'Focus outline color', type: 'color' },
    { key: '--mdc-outlined-text-field-input-text-color', label: 'Input text color', type: 'color' },
  ],
  chip: [
    { key: '--mdc-chip-elevated-container-color', label: 'Container color', type: 'color' },
    { key: '--mdc-chip-elevated-selected-container-color', label: 'Selected container color', type: 'color' },
    { key: '--mdc-chip-label-text-color', label: 'Label color', type: 'color' },
    { key: '--mdc-chip-container-shape-radius', label: 'Shape (px)', type: 'number' },
    { key: '--mdc-chip-container-height', label: 'Height (px)', type: 'number' },
  ],
  toolbar: [
    { key: '--mat-toolbar-container-background-color', label: 'Background color', type: 'color' },
    { key: '--mat-toolbar-container-text-color', label: 'Text color', type: 'color' },
    { key: '--mat-toolbar-standard-height', label: 'Height (px)', type: 'number' },
  ],
  tabs: [
    { key: '--mdc-tab-indicator-active-indicator-color', label: 'Active indicator color', type: 'color' },
    { key: '--mat-tab-header-active-label-text-color', label: 'Active label color', type: 'color' },
    { key: '--mat-tab-header-inactive-label-text-color', label: 'Inactive label color', type: 'color' },
    { key: '--mat-tab-header-active-focus-indicator-color', label: 'Focus indicator color', type: 'color' },
  ],
  menu: [
    { key: '--mat-menu-container-color', label: 'Container color', type: 'color' },
    { key: '--mat-menu-container-shape', label: 'Shape (px)', type: 'number' },
    { key: '--mat-menu-item-label-text-color', label: 'Item text color', type: 'color' },
    { key: '--mat-menu-item-hover-state-layer-color', label: 'Hover color', type: 'color' },
  ],
  checkbox: [
    { key: '--mdc-checkbox-selected-checkmark-color', label: 'Checkmark color', type: 'color' },
    { key: '--mdc-checkbox-selected-icon-color', label: 'Selected icon color', type: 'color' },
    { key: '--mdc-checkbox-unselected-icon-color', label: 'Unselected icon color', type: 'color' },
    { key: '--mdc-checkbox-selected-hover-icon-color', label: 'Hover selected color', type: 'color' },
  ],
  radio: [
    { key: '--mdc-radio-selected-icon-color', label: 'Selected icon color', type: 'color' },
    { key: '--mdc-radio-unselected-icon-color', label: 'Unselected icon color', type: 'color' },
    { key: '--mdc-radio-selected-hover-icon-color', label: 'Hover selected color', type: 'color' },
  ],
  select: [
    { key: '--mat-select-trigger-text-color', label: 'Trigger text color', type: 'color' },
    { key: '--mat-select-panel-background-color', label: 'Panel background', type: 'color' },
    { key: '--mat-select-enabled-arrow-color', label: 'Arrow color', type: 'color' },
  ],
  slider: [
    { key: '--mdc-slider-handle-color', label: 'Handle color', type: 'color' },
    { key: '--mdc-slider-active-track-color', label: 'Active track color', type: 'color' },
    { key: '--mdc-slider-inactive-track-color', label: 'Inactive track color', type: 'color' },
    { key: '--mdc-slider-handle-shape', label: 'Handle shape (px)', type: 'number' },
  ],
  'slide-toggle': [
    { key: '--mdc-switch-selected-track-color', label: 'Selected track color', type: 'color' },
    { key: '--mdc-switch-unselected-track-color', label: 'Unselected track color', type: 'color' },
    { key: '--mdc-switch-selected-handle-color', label: 'Selected handle color', type: 'color' },
    { key: '--mdc-switch-unselected-handle-color', label: 'Unselected handle color', type: 'color' },
  ],
  'progress-bar': [
    { key: '--mdc-linear-progress-active-indicator-color', label: 'Indicator color', type: 'color' },
    { key: '--mdc-linear-progress-track-color', label: 'Track color', type: 'color' },
    { key: '--mdc-linear-progress-track-shape', label: 'Track shape (px)', type: 'number' },
  ],
  'progress-spinner': [
    { key: '--mdc-circular-progress-active-indicator-color', label: 'Indicator color', type: 'color' },
  ],
  badge: [
    { key: '--mat-badge-background-color', label: 'Background color', type: 'color' },
    { key: '--mat-badge-text-color', label: 'Text color', type: 'color' },
    { key: '--mat-badge-container-shape', label: 'Shape (px)', type: 'number' },
  ],
  'button-toggle': [
    { key: '--mat-standard-button-toggle-selected-state-background-color', label: 'Selected background', type: 'color' },
    { key: '--mat-standard-button-toggle-selected-state-text-color', label: 'Selected text color', type: 'color' },
    { key: '--mat-standard-button-toggle-shape', label: 'Shape (px)', type: 'number' },
    { key: '--mat-standard-button-toggle-divider-color', label: 'Divider color', type: 'color' },
  ],
  list: [
    { key: '--mdc-list-list-item-container-color', label: 'Item container color', type: 'color' },
    { key: '--mdc-list-list-item-label-text-color', label: 'Item text color', type: 'color' },
    { key: '--mdc-list-list-item-hover-state-layer-color', label: 'Hover color', type: 'color' },
  ],
  expansion: [
    { key: '--mat-expansion-container-background-color', label: 'Container background', type: 'color' },
    { key: '--mat-expansion-container-text-color', label: 'Container text color', type: 'color' },
    { key: '--mat-expansion-header-text-color', label: 'Header text color', type: 'color' },
    { key: '--mat-expansion-container-shape', label: 'Shape (px)', type: 'number' },
  ],
  stepper: [
    { key: '--mat-stepper-container-color', label: 'Container color', type: 'color' },
    { key: '--mat-stepper-header-selected-state-icon-background-color', label: 'Selected step bg', type: 'color' },
    { key: '--mat-stepper-header-selected-state-icon-foreground-color', label: 'Selected step text', type: 'color' },
    { key: '--mat-stepper-header-edit-state-icon-background-color', label: 'Edit step bg', type: 'color' },
  ],
  table: [
    { key: '--mat-table-background-color', label: 'Background color', type: 'color' },
    { key: '--mat-table-header-headline-color', label: 'Header text color', type: 'color' },
    { key: '--mat-table-row-item-label-text-color', label: 'Row text color', type: 'color' },
    { key: '--mat-table-row-item-outline-color', label: 'Row border color', type: 'color' },
  ],
  paginator: [
    { key: '--mat-paginator-container-background-color', label: 'Background color', type: 'color' },
    { key: '--mat-paginator-container-text-color', label: 'Text color', type: 'color' },
    { key: '--mat-paginator-enabled-icon-color', label: 'Icon color', type: 'color' },
  ],
  divider: [
    { key: '--mat-divider-color', label: 'Divider color', type: 'color' },
    { key: '--mat-divider-width', label: 'Width (px)', type: 'number' },
  ],
  tooltip: [
    { key: '--mdc-plain-tooltip-container-color', label: 'Container color', type: 'color' },
    { key: '--mdc-plain-tooltip-supporting-text-color', label: 'Text color', type: 'color' },
    { key: '--mdc-plain-tooltip-container-shape', label: 'Shape (px)', type: 'number' },
  ],
  dialog: [
    { key: '--mdc-dialog-container-color', label: 'Container color', type: 'color' },
    { key: '--mdc-dialog-container-shape', label: 'Shape (px)', type: 'number' },
    { key: '--mdc-dialog-subhead-color', label: 'Title color', type: 'color' },
    { key: '--mdc-dialog-supporting-text-color', label: 'Content color', type: 'color' },
  ],
  'snack-bar': [
    { key: '--mdc-snackbar-container-color', label: 'Container color', type: 'color' },
    { key: '--mdc-snackbar-supporting-text-color', label: 'Text color', type: 'color' },
    { key: '--mdc-snackbar-container-shape', label: 'Shape (px)', type: 'number' },
  ],
  sidenav: [
    { key: '--mat-sidenav-container-background-color', label: 'Container background', type: 'color' },
    { key: '--mat-sidenav-container-text-color', label: 'Container text color', type: 'color' },
    { key: '--mat-sidenav-content-background-color', label: 'Content background', type: 'color' },
    { key: '--mat-sidenav-content-text-color', label: 'Content text color', type: 'color' },
    { key: '--mat-sidenav-container-shape', label: 'Shape (px)', type: 'number' },
  ],
  autocomplete: [
    { key: '--mat-autocomplete-background-color', label: 'Background color', type: 'color' },
    { key: '--mat-option-label-text-color', label: 'Option text color', type: 'color' },
    { key: '--mat-option-selected-state-layer-color', label: 'Selected option bg', type: 'color' },
  ],
  datepicker: [
    { key: '--mat-datepicker-calendar-container-background-color', label: 'Calendar background', type: 'color' },
    { key: '--mat-datepicker-calendar-container-text-color', label: 'Calendar text color', type: 'color' },
    { key: '--mat-datepicker-calendar-date-selected-state-background-color', label: 'Selected date bg', type: 'color' },
    { key: '--mat-datepicker-calendar-date-selected-state-text-color', label: 'Selected date text', type: 'color' },
    { key: '--mat-datepicker-calendar-container-shape', label: 'Shape (px)', type: 'number' },
  ],
  'bottom-sheet': [
    { key: '--mat-bottom-sheet-container-background-color', label: 'Container background', type: 'color' },
    { key: '--mat-bottom-sheet-container-text-color', label: 'Text color', type: 'color' },
    { key: '--mat-bottom-sheet-container-shape', label: 'Shape (px)', type: 'number' },
  ],
  icon: [
    { key: '--mat-icon-color', label: 'Icon color', type: 'color' },
  ],
};
