import { Component, inject, effect, HostListener, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeConfigService } from './core/theme/theme-config.service';
import { GlobalControlsComponent } from './controls/global-controls/global-controls.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { ComponentFineTuneComponent } from './controls/component-fine-tune/component-fine-tune.component';
import { ImportThemeDialogComponent } from './controls/import-theme-dialog/import-theme-dialog.component';
import { parseThemeJson } from './core/theme/theme-json';

const THEME_STYLE_ID = 'material-theme-customizer-styles';
const WELCOME_DISMISSED_KEY = 'material-theme-customizer.welcome-dismissed';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    GlobalControlsComponent,
    ShowcaseComponent,
    ComponentFineTuneComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly theme = inject(ThemeConfigService);
  private readonly doc = inject(DOCUMENT);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  readonly showWelcome = signal(!this.isWelcomeDismissed());

  constructor() {
    effect(() => {
      if (typeof this.doc?.head?.appendChild !== 'function') return;
      const css = this.theme.showcaseCss();
      let el = this.doc.getElementById(THEME_STYLE_ID) as HTMLStyleElement | null;
      if (!el) {
        el = this.doc.createElement('style');
        el.id = THEME_STYLE_ID;
        this.doc.head.appendChild(el);
      }
      el.textContent = css;
    });

    // Scroll the fine-tuned component into view when selected.
    effect(() => {
      const id = this.theme.selectedComponentId();
      if (!id) return;
      queueMicrotask(() => {
        this.doc.getElementById('showcase-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.theme.selectedComponentId()) {
      this.theme.selectComponent(null);
      event.preventDefault();
    }
    if (event.key === 'i' && (event.ctrlKey || event.metaKey) && !event.shiftKey) {
      event.preventDefault();
      this.openImportDialog();
    }
  }

  dismissWelcome(): void {
    this.showWelcome.set(false);
    try {
      localStorage.setItem(WELCOME_DISMISSED_KEY, '1');
    } catch {
      /* best-effort */
    }
  }

  openImportDialog(): void {
    this.dialog.open(ImportThemeDialogComponent, { width: '600px', maxWidth: '95vw' });
  }

  async copyJsonToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.theme.toJson());
      this.snackBar.open('Theme JSON copied to clipboard.', undefined, { duration: 2500 });
    } catch {
      this.snackBar.open('Could not access the clipboard.', undefined, { duration: 3000 });
    }
  }

  downloadJson(): void {
    this.theme.downloadJson();
    this.snackBar.open('Downloading material-theme.json…', undefined, { duration: 2500 });
  }

  downloadCss(): void {
    this.theme.downloadCss();
    this.snackBar.open('Downloading material-theme.css…', undefined, { duration: 2500 });
  }

  downloadScss(): void {
    this.theme.downloadScss();
    this.snackBar.open('Downloading material-theme.scss…', undefined, { duration: 2500 });
  }

  resetToDefaults(): void {
    const previous = this.theme.toJson();
    this.theme.resetToDefaults();
    const ref = this.snackBar.open('Theme reset to defaults.', 'Undo', { duration: 6000 });
    ref.onAction().subscribe(() => {
      const parsed = parseThemeJson(previous);
      if (parsed.ok) {
        this.theme.applyImported(parsed.config, parsed.overrides, 'replace');
        this.snackBar.open('Reset undone.', undefined, { duration: 2000 });
      }
    });
  }

  private isWelcomeDismissed(): boolean {
    try {
      return localStorage.getItem(WELCOME_DISMISSED_KEY) === '1';
    } catch {
      return false;
    }
  }
}
