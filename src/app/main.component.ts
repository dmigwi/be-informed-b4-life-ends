import { Component } from '@angular/core';

@Component({
    selector: "bi-informed",
    template: `
                <router-outlet></router-outlet>

                <footer class="container-fluid text-center navbar-inverse new-navbar">
                  <p>@2016 Migwi Ndung'u</p>
                </footer>
              `
    
})
export class MainComponent{
 }