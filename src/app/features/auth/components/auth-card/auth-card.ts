import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-card',
  template: `
    <section
      class="w-full rounded-[36px] bg-gradient-to-b from-[#FFD556] via-[#E9BC45] to-[#D4A53A] px-10 pb-8 pt-10 shadow-2xl"
      [style.max-width.px]="maxWidth()"
    >
      <div class="mb-7 flex justify-center">
        <img src="/images/brand/logo-auth.png" alt="Tipografía Típica de Santander" class="h-32 w-auto" />
      </div>
      <ng-content />
    </section>
  `,
})
export class AuthCard {
  // login: 480 · register: 680
  maxWidth = input(480);
}