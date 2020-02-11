import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule, ComponentFactoryResolver} from '@angular/core';

import {AppComponent} from './app.component';
import {createCustomElement} from '@angular/elements';
import {Router, RouterModule, NavigationStart} from '@angular/router';
import {Page1Component} from './page1/page1.component';
import { Page2Component } from './page2/page2.component';

const path2: string = 'element';

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      // {path: 'hello/page2', component: Page1Component},

      {
        path: path2,
        pathMatch: 'prefix',
        children: [
          {
            path: '',
            component: Page1Component,
          },
          {
            path: 'page1',
            component: Page1Component
          },
          {
            path: 'page2',
            component: Page2Component
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
    
    if(!customElements.get('aks-my-medium')) {
      customElements.define('aks-my-medium', el);
    }

    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        const navigation = router.getCurrentNavigation();
        //console.log(event);
        //console.log(navigation);
        if(!event.url.includes(path2)) {
          this.router.navigateByUrl(path2 + event.url, navigation.extras);
      }
        // if substring event.url is prefixed
        // and gesetzt sonst durhclasse
      }
      
    }, () => console.log('Error in router subscription'));

  }

  ngDoBootstrap() {
  }
}
