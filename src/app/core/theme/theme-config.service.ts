import { Injectable, signal, computed, effect } from '@angular/core';
import {
  GlobalThemeConfig,
  ComponentOverrides,
  DEFAULT_GLOBAL_THEME,
} from './theme-config.model';
import { configToCssVariables } from './angular-material-tokens';
import { generateThemeCss } from './to-css';
import { generateThemeScss } from './to-scss';
import { serializeTheme, parseThemeJson } from './theme-json';

const STORAGE_KEY = 'material-theme-customizer.theme';

@Injectable({ providedIn: 'root' })
export class ThemeConfigService {
  private readonly configSignal = signal<GlobalThemeConfig>({ ...this.deepClone(DEFAULT_GLOBAL_THEME) });
  private readonly overridesSignal = signal<ComponentOverrides>({});

  constructor() {
    this.restoreFromStorage();
    // Persist across sessions; runs whenever config or overrides change.
    effect(() => {
      const json = serializeTheme(this.configSignal(), this.overridesSignal());
      try {
        localStorage.setItem(STORAGE_KEY, json);
      } catch {
        // Storage unavailable (private mode / quota) — persistence is best-effort.
      }
    });
  }

  private restoreFromStorage(): void {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }
    if (!stored) return;
    const parsed = parseThemeJson(stored);
    if (parsed.ok) {
      this.configSignal.set(parsed.config);
      this.overridesSignal.set(parsed.overrides);
    }
  }

  readonly config = this.configSignal.asReadonly();
  readonly overrides = this.overridesSignal.asReadonly();

  /** Currently selected component id for fine-tuning (null = none). */
  readonly selectedComponentId = signal<string | null>(null);

  /** CSS string to inject into showcase container. Only .theme-showcase so we don't override prebuilt theme on :root. */
  readonly showcaseCss = computed(() => {
    const cfg = this.configSignal();
    const ov = this.overridesSignal();
    const vars = configToCssVariables(cfg);
    const scopeLines: string[] = [];
    for (const [compId, tokens] of Object.entries(ov)) {
      if (Object.keys(tokens).length === 0) continue;
      const selector = `.mat-theme-override-${compId}`;
      const props = Object.entries(tokens)
        .filter(([_, value]) => value !== '' && value !== undefined && value !== null)
        .map(([key, value]) => {
          // Key is already the full CSS variable name (e.g., --mdc-filled-button-container-color)
          const cssVar = key.startsWith('--') ? key : `--${key}`;
          return `  ${cssVar}: ${typeof value === 'number' ? value + 'px' : value};`;
        })
        .join('\n');
      if (props) {
        scopeLines.push(`${selector} {\n${props}\n}`);
      }
    }
    const scoped = scopeLines.length ? '\n\n' + scopeLines.join('\n\n') : '';
    const varsBlock = vars.replace(/\n/g, '\n  ');
    return `:root, .theme-showcase {\n  ${varsBlock}\n}${scoped}`;
  });

  updateConfig(partial: Partial<GlobalThemeConfig>): void {
    this.configSignal.update((prev) => this.deepMerge(prev, partial));
  }

  updateColors(partial: Partial<GlobalThemeConfig['colors']>): void {
    this.configSignal.update((prev) => ({
      ...prev,
      colors: { ...prev.colors, ...partial },
    }));
  }

  updateTypography(partial: Partial<GlobalThemeConfig['typography']>): void {
    this.configSignal.update((prev) => ({
      ...prev,
      typography: { ...prev.typography, ...partial },
    }));
  }

  updateShape(partial: Partial<GlobalThemeConfig['shape']>): void {
    this.configSignal.update((prev) => ({
      ...prev,
      shape: { ...prev.shape, ...partial },
    }));
  }

  updateElevation(partial: Partial<GlobalThemeConfig['elevation']>): void {
    this.configSignal.update((prev) => ({
      ...prev,
      elevation: { ...prev.elevation, ...partial },
    }));
  }

  updateSpacing(partial: Partial<GlobalThemeConfig['spacing']>): void {
    this.configSignal.update((prev) => ({
      ...prev,
      spacing: { ...prev.spacing, ...partial },
    }));
  }

  updateDensity(partial: Partial<GlobalThemeConfig['density']>): void {
    this.configSignal.update((prev) => ({
      ...prev,
      density: { ...prev.density, ...partial },
    }));
  }

  setComponentOverrides(componentId: string, tokens: Record<string, string | number>): void {
    this.overridesSignal.update((prev) => ({
      ...prev,
      [componentId]: { ...tokens },
    }));
  }

  updateComponentOverride(componentId: string, key: string, value: string | number): void {
    this.overridesSignal.update((prev) => ({
      ...prev,
      [componentId]: { ...(prev[componentId] ?? {}), [key]: value },
    }));
  }

  selectComponent(componentId: string | null): void {
    this.selectedComponentId.set(componentId);
  }

  getComponentOverrides(componentId: string): Record<string, string | number> {
    return this.overridesSignal()[componentId] ?? {};
  }

  /** Reset the whole theme (global config + component overrides) to defaults. */
  resetToDefaults(): void {
    this.configSignal.set(this.deepClone(DEFAULT_GLOBAL_THEME));
    this.overridesSignal.set({});
  }

  /** Current theme as a versioned, re-importable JSON string. */
  toJson(): string {
    return serializeTheme(this.configSignal(), this.overridesSignal());
  }

  /**
   * Apply an imported theme. 'replace' swaps everything; 'merge' keeps current
   * values and only applies the imported config on top (overrides are merged per component).
   */
  applyImported(config: GlobalThemeConfig, overrides: ComponentOverrides, mode: 'replace' | 'merge'): void {
    if (mode === 'replace') {
      this.configSignal.set(this.deepClone(config));
      this.overridesSignal.set(this.deepClone(overrides));
    } else {
      this.configSignal.update((prev) => this.deepMerge(prev, config));
      this.overridesSignal.update((prev) => {
        const merged: ComponentOverrides = { ...prev };
        for (const [compId, tokens] of Object.entries(overrides)) {
          merged[compId] = { ...(merged[compId] ?? {}), ...tokens };
        }
        return merged;
      });
    }
  }

  /** Generate and download JSON file (re-importable). */
  downloadJson(): void {
    this.downloadFile('material-theme.json', this.toJson(), 'application/json');
  }

  /** Generate and download CSS file. */
  downloadCss(): void {
    const css = generateThemeCss(this.configSignal(), this.overridesSignal());
    this.downloadFile('material-theme.css', css, 'text/css');
  }

  /** Generate and download SCSS file. */
  downloadScss(): void {
    const scss = generateThemeScss(this.configSignal(), this.overridesSignal());
    this.downloadFile('material-theme.scss', scss, 'text/x-scss');
  }

  private downloadFile(filename: string, content: string, mime: string): void {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  private deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  private deepMerge<T extends object>(target: T, source: Partial<T>): T {
    const out = { ...target };
    for (const key of Object.keys(source) as (keyof T)[]) {
      const s = (source as T)[key];
      if (s != null && typeof s === 'object' && !Array.isArray(s) && typeof (target as T)[key] === 'object') {
        (out as Record<string, unknown>)[key as string] = this.deepMerge(
          (target as T)[key] as object,
          s as object
        );
      } else if (s !== undefined) {
        (out as Record<string, unknown>)[key as string] = s;
      }
    }
    return out;
  }
}
