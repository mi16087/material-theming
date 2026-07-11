import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-showcase-bottom-sheet',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div style="padding: 16px;">
      <p>Bottom sheet content for showcase.</p>
      <button mat-button (click)="close()">Close</button>
    </div>
  `,
})
export class ShowcaseBottomSheetComponent {
  constructor(private ref: MatBottomSheetRef<ShowcaseBottomSheetComponent>) {}

  close(): void {
    this.ref.dismiss();
  }
}
