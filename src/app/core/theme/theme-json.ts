import {
  GlobalThemeConfig,
  ComponentOverrides,
  DEFAULT_GLOBAL_THEME,
  ShapePreset,
  ElevationPreset,
} from './theme-config.model';

/** Versioned JSON envelope so exports can round-trip and evolve. */
export interface ThemeJsonFile {
  $schema: string;
  version: number;
  config: GlobalThemeConfig;
  overrides: ComponentOverrides;
}

export const THEME_JSON_SCHEMA_ID = 'material-theme-customizer/theme';
export const THEME_JSON_VERSION = 1;

export interface ThemeParseSuccess {
  ok: true;
  config: GlobalThemeConfig;
  overrides: ComponentOverrides;
  warnings: string[];
}

export interface ThemeParseFailure {
  ok: false;
  errors: string[];
}

export type ThemeParseResult = ThemeParseSuccess | ThemeParseFailure;

export function serializeTheme(
  config: GlobalThemeConfig,
  overrides: ComponentOverrides
): string {
  const file: ThemeJsonFile = {
    $schema: THEME_JSON_SCHEMA_ID,
    version: THEME_JSON_VERSION,
    config,
    overrides,
  };
  return JSON.stringify(file, null, 2);
}

const HEX_COLOR = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const SHAPE_PRESETS: ShapePreset[] = ['square', 'rounded', 'pill'];
const ELEVATION_PRESETS: ElevationPreset[] = ['none', 'low', 'medium', 'high'];

/**
 * Parses and validates theme JSON. Accepts either the full export envelope
 * ({ config, overrides }) or a bare GlobalThemeConfig object. Missing sections
 * fall back to defaults (partial import), collecting warnings; hard structural
 * problems produce errors instead.
 */
export function parseThemeJson(text: string): ThemeParseResult {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch (e) {
    return { ok: false, errors: ['Not valid JSON: ' + (e instanceof Error ? e.message : String(e))] };
  }

  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, errors: ['Expected a JSON object at the top level.'] };
  }

  const rawObj = raw as Record<string, unknown>;
  // Envelope form or bare config form
  const configSource = (rawObj['config'] ?? rawObj) as Record<string, unknown>;
  if (configSource === null || typeof configSource !== 'object' || Array.isArray(configSource)) {
    return { ok: false, errors: ['"config" must be an object.'] };
  }

  const knownSections = ['colors', 'typography', 'shape', 'elevation', 'spacing', 'density'];
  if (!knownSections.some((k) => k in configSource)) {
    return {
      ok: false,
      errors: [
        'No recognizable theme sections found. Expected at least one of: ' +
          knownSections.join(', ') + '.',
      ],
    };
  }

  const errors: string[] = [];
  const warnings: string[] = [];
  const defaults = DEFAULT_GLOBAL_THEME;

  // --- Colors ---
  const colors = { ...defaults.colors };
  const rawColors = configSource['colors'];
  if (rawColors !== undefined) {
    if (typeof rawColors !== 'object' || rawColors === null || Array.isArray(rawColors)) {
      errors.push('"colors" must be an object of color name to hex value.');
    } else {
      for (const [key, value] of Object.entries(rawColors as Record<string, unknown>)) {
        if (!(key in colors)) {
          warnings.push(`Unknown color "${key}" ignored.`);
          continue;
        }
        if (typeof value !== 'string' || !HEX_COLOR.test(value)) {
          errors.push(`Color "${key}" must be a hex string like "#6750a4" (got ${JSON.stringify(value)}).`);
          continue;
        }
        (colors as Record<string, string>)[key] = value.toLowerCase();
      }
    }
  } else {
    warnings.push('No "colors" section — using default colors.');
  }

  // --- Typography ---
  const typography = { ...defaults.typography };
  const rawTypo = configSource['typography'];
  if (rawTypo !== undefined) {
    if (typeof rawTypo !== 'object' || rawTypo === null || Array.isArray(rawTypo)) {
      errors.push('"typography" must be an object.');
    } else {
      const t = rawTypo as Record<string, unknown>;
      if (t['fontFamily'] !== undefined) {
        if (typeof t['fontFamily'] === 'string' && t['fontFamily'].trim().length > 0) {
          typography.fontFamily = t['fontFamily'];
        } else {
          errors.push('"typography.fontFamily" must be a non-empty string.');
        }
      }
      checkNumber(t, 'baseSize', 8, 32, errors, (v) => (typography.baseSize = v), 'typography.baseSize');
      checkNumber(t, 'regularWeight', 100, 900, errors, (v) => (typography.regularWeight = v), 'typography.regularWeight');
      checkNumber(t, 'mediumWeight', 100, 900, errors, (v) => (typography.mediumWeight = v), 'typography.mediumWeight');
      checkNumber(t, 'boldWeight', 100, 900, errors, (v) => (typography.boldWeight = v), 'typography.boldWeight');
      checkNumber(t, 'lineHeight', 0.8, 3, errors, (v) => (typography.lineHeight = v), 'typography.lineHeight');
    }
  }

  // --- Shape ---
  const shape = { ...defaults.shape };
  const rawShape = configSource['shape'];
  if (rawShape !== undefined) {
    if (typeof rawShape !== 'object' || rawShape === null || Array.isArray(rawShape)) {
      errors.push('"shape" must be an object.');
    } else {
      const s = rawShape as Record<string, unknown>;
      if (s['preset'] !== undefined) {
        if (SHAPE_PRESETS.includes(s['preset'] as ShapePreset)) {
          shape.preset = s['preset'] as ShapePreset;
        } else {
          errors.push(`"shape.preset" must be one of: ${SHAPE_PRESETS.join(', ')}.`);
        }
      }
      checkNumber(s, 'cornerExtraSmall', 0, 9999, errors, (v) => (shape.cornerExtraSmall = v), 'shape.cornerExtraSmall');
      checkNumber(s, 'cornerSmall', 0, 9999, errors, (v) => (shape.cornerSmall = v), 'shape.cornerSmall');
      checkNumber(s, 'cornerMedium', 0, 9999, errors, (v) => (shape.cornerMedium = v), 'shape.cornerMedium');
      checkNumber(s, 'cornerLarge', 0, 9999, errors, (v) => (shape.cornerLarge = v), 'shape.cornerLarge');
      checkNumber(s, 'cornerExtraLarge', 0, 9999, errors, (v) => (shape.cornerExtraLarge = v), 'shape.cornerExtraLarge');
    }
  }

  // --- Elevation ---
  const elevation = { ...defaults.elevation };
  const rawElev = configSource['elevation'];
  if (rawElev !== undefined) {
    if (typeof rawElev !== 'object' || rawElev === null || Array.isArray(rawElev)) {
      errors.push('"elevation" must be an object.');
    } else {
      const e = rawElev as Record<string, unknown>;
      if (e['preset'] !== undefined) {
        if (ELEVATION_PRESETS.includes(e['preset'] as ElevationPreset)) {
          elevation.preset = e['preset'] as ElevationPreset;
        } else {
          errors.push(`"elevation.preset" must be one of: ${ELEVATION_PRESETS.join(', ')}.`);
        }
      }
      for (const lvl of ['level0', 'level1', 'level2', 'level3', 'level4', 'level5'] as const) {
        if (e[lvl] !== undefined) {
          if (typeof e[lvl] === 'string') {
            elevation[lvl] = e[lvl] as string;
          } else {
            errors.push(`"elevation.${lvl}" must be a CSS box-shadow string.`);
          }
        }
      }
    }
  }

  // --- Spacing ---
  const spacing = { ...defaults.spacing };
  const rawSpacing = configSource['spacing'];
  if (rawSpacing !== undefined) {
    if (typeof rawSpacing !== 'object' || rawSpacing === null || Array.isArray(rawSpacing)) {
      errors.push('"spacing" must be an object.');
    } else {
      checkNumber(rawSpacing as Record<string, unknown>, 'baseUnit', 2, 32, errors, (v) => (spacing.baseUnit = v), 'spacing.baseUnit');
    }
  }

  // --- Density ---
  const density = { ...defaults.density };
  const rawDensity = configSource['density'];
  if (rawDensity !== undefined) {
    if (typeof rawDensity !== 'object' || rawDensity === null || Array.isArray(rawDensity)) {
      errors.push('"density" must be an object.');
    } else {
      checkNumber(rawDensity as Record<string, unknown>, 'value', -5, 0, errors, (v) => (density.value = v), 'density.value');
    }
  }

  // --- Component overrides (envelope form only) ---
  const overrides: ComponentOverrides = {};
  const rawOverrides = rawObj['overrides'];
  if (rawOverrides !== undefined) {
    if (typeof rawOverrides !== 'object' || rawOverrides === null || Array.isArray(rawOverrides)) {
      errors.push('"overrides" must be an object of component id to token map.');
    } else {
      for (const [compId, tokens] of Object.entries(rawOverrides as Record<string, unknown>)) {
        if (typeof tokens !== 'object' || tokens === null || Array.isArray(tokens)) {
          errors.push(`"overrides.${compId}" must be an object of token name to value.`);
          continue;
        }
        const clean: Record<string, string | number> = {};
        for (const [key, value] of Object.entries(tokens as Record<string, unknown>)) {
          if (typeof value === 'string' || typeof value === 'number') {
            clean[key] = value;
          } else {
            warnings.push(`Override "${compId}.${key}" ignored (must be a string or number).`);
          }
        }
        if (Object.keys(clean).length > 0) overrides[compId] = clean;
      }
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }
  return {
    ok: true,
    config: { colors, typography, shape, elevation, spacing, density },
    overrides,
    warnings,
  };
}

function checkNumber(
  source: Record<string, unknown>,
  key: string,
  min: number,
  max: number,
  errors: string[],
  assign: (v: number) => void,
  path: string
): void {
  const value = source[key];
  if (value === undefined) return;
  if (typeof value !== 'number' || !isFinite(value)) {
    errors.push(`"${path}" must be a number (got ${JSON.stringify(value)}).`);
    return;
  }
  if (value < min || value > max) {
    errors.push(`"${path}" must be between ${min} and ${max} (got ${value}).`);
    return;
  }
  assign(value);
}
