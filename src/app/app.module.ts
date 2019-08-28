import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {createCustomElement} from '@angular/elements';
import {Router, RouterModule} from '@angular/router';
import {Page1Component} from './page1/page1.component';

@NgModule({
  declarations: [
    AppComponent,
    Page1Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      // {path: 'hello/page2', component: Page1Component},
      {
        path: 'hello',
        children: [
          {
            path: 'page2',
            component: Page1Component
          }
          ]
      }
    ])
  ],
  providers: [],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector, private router: Router) {
    const el = createCustomElement(AppComponent, {injector});
    router.initialNavigation();
    customElements.define('aks-my-medium', el);
  }

  ngDoBootstrap() {
  }
}
