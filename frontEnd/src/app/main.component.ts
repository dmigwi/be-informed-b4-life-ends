import { Component } from '@angular/core';

@Component({
    selector: "bi-informed",
    template: `
                <router-outlet></router-outlet>

                <footer class="container-fluid text-center navbar-inverse new-navbar">
                  <p>Footer Text</p>
                </footer>
              `
    
})
export class MainComponent{
 }