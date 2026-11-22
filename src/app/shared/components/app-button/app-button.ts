import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      class="cursor-pointer rounded-full bg-[#FFF1A8] px-7 py-3 text-[15px] font-medium text-[#2a1a05] shadow-md disabled:cursor-not-allowed disabled:opacity-50"
    >
      <ng-content />
    </button>
  `,
})
export class AppButton {
  type = input<'button' | 'submit'>('button');
  disabled = input(false);
}