/**
 * Global theme configuration – maps to Angular Material system tokens (--mat-sys-*).
 * All values are global; per-component overrides are stored separately.
 */
export interface ThemeColors {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  surface: string;
  onSurface: string;
  onSurfaceVariant: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  surfaceContainerLow: string;
  surfaceContainerLowest: string;
  surfaceVariant: string;
  outline: string;
  outlineVariant: string;
  background: string;
  onBackground: string;
  inverseSurface: string;
  inverseOnSurface: string;
}

export interface ThemeTypography {
  fontFamily: string;
  /** Base size in px; type scale derives from it */
  baseSize: number;
  /** 400 = regular, 500 = medium, 700 = bold */
  regularWeight: number;
  mediumWeight: number;
  boldWeight: number;
  lineHeight: number;
}

export type ShapePreset = 'square' | 'rounded' | 'pill';

export interface ThemeShape {
  preset: ShapePreset;
  /** Override: extra-small, small, medium, large, extra-large (px). Derived from preset if not set. */
  cornerExtraSmall: number;
  cornerSmall: number;
  cornerMedium: number;
  cornerLarge: number;
  cornerExtraLarge: number;
}

export type ElevationPreset = 'none' | 'low' | 'medium' | 'high';

export interface ThemeElevation {
  preset: ElevationPreset;
  level0: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
}

export interface ThemeSpacing {
  /** Base unit in px (e.g. 8). Spacing tokens derive from it. */
  baseUnit: number;
}

export interface ThemeDensity {
  /** 0 = default, -1 to -5 = more compact */
  value: number;
}

export interface GlobalThemeConfig {
  colors: ThemeColors;
  typography: ThemeTypography;
  shape: ThemeShape;
  elevation: ThemeElevation;
  spacing: ThemeSpacing;
  density: ThemeDensity;
}

/** Per-component overrides: component id -> token key -> value (string or number). */
export type ComponentOverrides = Record<string, Record<string, string | number>>;

export const DEFAULT_COLORS: ThemeColors = {
  primary: '#6750a4',
  onPrimary: '#ffffff',
  primaryContainer: '#ead8ff',
  onPrimaryContainer: '#21005d',
  secondary: '#625b71',
  onSecondary: '#ffffff',
  secondaryContainer: '#e8def8',
  onSecondaryContainer: '#1d192b',
  tertiary: '#7d5260',
  onTertiary: '#ffffff',
  tertiaryContainer: '#ffd8e4',
  onTertiaryContainer: '#31111d',
  error: '#b3261e',
  onError: '#ffffff',
  errorContainer: '#f9dedc',
  onErrorContainer: '#410e0b',
  surface: '#fef7ff',
  onSurface: '#1c1b1f',
  onSurfaceVariant: '#49454f',
  surfaceContainer: '#f3edf7',
  surfaceContainerHigh: '#ece6f0',
  surfaceContainerHighest: '#e6e0e9',
  surfaceContainerLow: '#f7f2fa',
  surfaceContainerLowest: '#ffffff',
  surfaceVariant: '#e7e0ec',
  outline: '#79747e',
  outlineVariant: '#cac4d0',
  background: '#fef7ff',
  onBackground: '#1c1b1f',
  inverseSurface: '#313033',
  inverseOnSurface: '#f4eff4',
};

export const DEFAULT_TYPOGRAPHY: ThemeTypography = {
  fontFamily: 'Roboto, sans-serif',
  baseSize: 16,
  regularWeight: 400,
  mediumWeight: 500,
  boldWeight: 700,
  lineHeight: 1.5,
};

export const DEFAULT_SHAPE: ThemeShape = {
  preset: 'rounded',
  cornerExtraSmall: 4,
  cornerSmall: 8,
  cornerMedium: 12,
  cornerLarge: 16,
  cornerExtraLarge: 28,
};

export const DEFAULT_ELEVATION: ThemeElevation = {
  preset: 'medium',
  level0: 'none',
  level1: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  level2: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
  level3: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
  level4: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
  level5: '0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)',
};

export const DEFAULT_SPACING: ThemeSpacing = {
  baseUnit: 8,
};

export const DEFAULT_DENSITY: ThemeDensity = {
  value: 0,
};

export const DEFAULT_GLOBAL_THEME: GlobalThemeConfig = {
  colors: DEFAULT_COLORS,
  typography: DEFAULT_TYPOGRAPHY,
  shape: DEFAULT_SHAPE,
  elevation: DEFAULT_ELEVATION,
  spacing: DEFAULT_SPACING,
  density: DEFAULT_DENSITY,
};
