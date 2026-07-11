import type { GlobalThemeConfig } from './theme-config.model';

/**
 * Maps our theme config to Angular Material 3 system token names (--mat-sys-*).
 * Used for injecting CSS variables into the showcase container and for export.
 */
export function configToCssVariables(config: GlobalThemeConfig): string {
  const c = config.colors;
  const t = config.typography;
  const s = config.shape;
  const e = config.elevation;

  const baseSize = t.baseSize;
  const scale = (mult: number) => `${Math.round(baseSize * mult)}px`;

  // Density: each step compacts component heights by 4px (Material density scale).
  const densityPx = config.density.value * 4;
  const dh = (base: number) => `${base + densityPx}px`;
  const spacingUnit = config.spacing.baseUnit;

  const lines: string[] = [
    '/* Colors - Primary */',
    `--mat-sys-primary: ${c.primary};`,
    `--mat-sys-on-primary: ${c.onPrimary};`,
    `--mat-sys-primary-container: ${c.primaryContainer};`,
    `--mat-sys-on-primary-container: ${c.onPrimaryContainer};`,
    '/* Secondary */',
    `--mat-sys-secondary: ${c.secondary};`,
    `--mat-sys-on-secondary: ${c.onSecondary};`,
    `--mat-sys-secondary-container: ${c.secondaryContainer};`,
    `--mat-sys-on-secondary-container: ${c.onSecondaryContainer};`,
    '/* Tertiary */',
    `--mat-sys-tertiary: ${c.tertiary};`,
    `--mat-sys-on-tertiary: ${c.onTertiary};`,
    `--mat-sys-tertiary-container: ${c.tertiaryContainer};`,
    `--mat-sys-on-tertiary-container: ${c.onTertiaryContainer};`,
    '/* Error */',
    `--mat-sys-error: ${c.error};`,
    `--mat-sys-on-error: ${c.onError};`,
    `--mat-sys-error-container: ${c.errorContainer};`,
    `--mat-sys-on-error-container: ${c.onErrorContainer};`,
    '/* Surface */',
    `--mat-sys-surface: ${c.surface};`,
    `--mat-sys-on-surface: ${c.onSurface};`,
    `--mat-sys-on-surface-variant: ${c.onSurfaceVariant};`,
    `--mat-sys-surface-container: ${c.surfaceContainer};`,
    `--mat-sys-surface-container-high: ${c.surfaceContainerHigh};`,
    `--mat-sys-surface-container-highest: ${c.surfaceContainerHighest};`,
    `--mat-sys-surface-container-low: ${c.surfaceContainerLow};`,
    `--mat-sys-surface-container-lowest: ${c.surfaceContainerLowest};`,
    `--mat-sys-surface-variant: ${c.surfaceVariant};`,
    `--mat-sys-inverse-surface: ${c.inverseSurface};`,
    `--mat-sys-inverse-on-surface: ${c.inverseOnSurface};`,
    '/* Background & Outline */',
    `--mat-sys-background: ${c.background};`,
    `--mat-sys-on-background: ${c.onBackground};`,
    `--mat-sys-outline: ${c.outline};`,
    `--mat-sys-outline-variant: ${c.outlineVariant};`,
    '/* Shape (corner radius) */',
    `--mat-sys-corner-none: 0;`,
    `--mat-sys-corner-extra-small: ${s.cornerExtraSmall}px;`,
    `--mat-sys-corner-small: ${s.cornerSmall}px;`,
    `--mat-sys-corner-medium: ${s.cornerMedium}px;`,
    `--mat-sys-corner-large: ${s.cornerLarge}px;`,
    `--mat-sys-corner-extra-large: ${s.cornerExtraLarge}px;`,
    `--mat-sys-corner-full: 9999px;`,
    '/* Elevation (shadows) */',
    `--mat-sys-level0: ${e.level0};`,
    `--mat-sys-level1: ${e.level1};`,
    `--mat-sys-level2: ${e.level2};`,
    `--mat-sys-level3: ${e.level3};`,
    `--mat-sys-level4: ${e.level4};`,
    `--mat-sys-level5: ${e.level5};`,
    '/* Typography - body */',
    `--mat-sys-body-small: ${t.regularWeight} ${scale(0.875)}/${t.lineHeight} ${t.fontFamily};`,
    `--mat-sys-body-small-size: ${scale(0.875)};`,
    `--mat-sys-body-small-weight: ${t.regularWeight};`,
    `--mat-sys-body-medium: ${t.regularWeight} ${scale(1)}/${t.lineHeight} ${t.fontFamily};`,
    `--mat-sys-body-medium-size: ${scale(1)};`,
    `--mat-sys-body-medium-weight: ${t.regularWeight};`,
    `--mat-sys-body-large: ${t.regularWeight} ${scale(1.125)}/${t.lineHeight} ${t.fontFamily};`,
    `--mat-sys-body-large-size: ${scale(1.125)};`,
    `--mat-sys-body-large-weight: ${t.regularWeight};`,
    '/* Typography - label */',
    `--mat-sys-label-small: ${t.mediumWeight} ${scale(0.75)}/${t.lineHeight} ${t.fontFamily};`,
    `--mat-sys-label-medium: ${t.mediumWeight} ${scale(0.875)}/${t.lineHeight} ${t.fontFamily};`,
    `--mat-sys-label-large: ${t.mediumWeight} ${scale(1)}/${t.lineHeight} ${t.fontFamily};`,
    '/* Typography - title */',
    `--mat-sys-title-small: ${t.mediumWeight} ${scale(0.875)}/${t.lineHeight} ${t.fontFamily};`,
    `--mat-sys-title-medium: ${t.mediumWeight} ${scale(1)}/${t.lineHeight} ${t.fontFamily};`,
    `--mat-sys-title-large: ${t.mediumWeight} ${scale(1.375)}/${t.lineHeight} ${t.fontFamily};`,
    '/* Typography - headline */',
    `--mat-sys-headline-small: ${t.regularWeight} ${scale(1.25)}/${t.lineHeight} ${t.fontFamily};`,
    `--mat-sys-headline-medium: ${t.regularWeight} ${scale(1.5)}/${t.lineHeight} ${t.fontFamily};`,
    `--mat-sys-headline-large: ${t.regularWeight} ${scale(2)}/${t.lineHeight} ${t.fontFamily};`,
    '/* Typography - display */',
    `--mat-sys-display-small: ${t.regularWeight} ${scale(2.25)}/${t.lineHeight} ${t.fontFamily};`,
    `--mat-sys-display-medium: ${t.regularWeight} ${scale(2.75)}/${t.lineHeight} ${t.fontFamily};`,
    `--mat-sys-display-large: ${t.regularWeight} ${scale(3.5)}/${t.lineHeight} ${t.fontFamily};`,
    '/* Density (component heights; -4px per density step) */',
    `--mdc-text-button-container-height: ${dh(40)};`,
    `--mdc-filled-button-container-height: ${dh(40)};`,
    `--mdc-outlined-button-container-height: ${dh(40)};`,
    `--mdc-protected-button-container-height: ${dh(40)};`,
    `--mat-form-field-container-height: ${dh(56)};`,
    `--mat-form-field-container-vertical-padding: ${Math.max(4, 16 + densityPx / 2)}px;`,
    `--mdc-list-list-item-one-line-container-height: ${dh(48)};`,
    `--mdc-list-list-item-two-line-container-height: ${dh(64)};`,
    `--mdc-checkbox-state-layer-size: ${dh(40)};`,
    `--mdc-radio-state-layer-size: ${dh(40)};`,
    '/* Spacing scale (custom tokens for app layouts) */',
    `--mat-sys-spacing-1: ${spacingUnit}px;`,
    `--mat-sys-spacing-2: ${spacingUnit * 2}px;`,
    `--mat-sys-spacing-3: ${spacingUnit * 3}px;`,
    `--mat-sys-spacing-4: ${spacingUnit * 4}px;`,
  ];

  return lines.join('\n');
}
