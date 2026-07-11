import { Component, inject, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeConfigService } from './core/theme/theme-config.service';
import { GlobalControlsComponent } from './controls/global-controls/global-controls.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { ComponentFineTuneComponent } from './controls/component-fine-tune/component-fine-tune.component';

const THEME_STYLE_ID = 'material-theme-customizer-styles';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonModule,
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
      // Apply only to .theme-showcase so prebuilt theme stays for header/sidebar
      el.textContent = css;
    });
  }
}
