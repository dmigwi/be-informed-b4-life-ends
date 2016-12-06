import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ItemsComponent } from './items.component';
import { BucketlistComponent }  from './bucketlist.component';
import { LoginComponent } from  './login.component';
import { MainComponent } from  './main.component';

const appRoutes: Routes = [
	{path: 'login', component: LoginComponent},
	{path: 'app', component: BucketlistComponent, canActivate: [localStorage.getItem("token") !== null]}
];

@NgModule({
  imports:      [ BrowserModule , HttpModule, FormsModule,
   				  RouterModule.forRoot(appRoutes) ],
  declarations: [ ItemsComponent, BucketlistComponent, 
  				  LoginComponent, MainComponent],
  bootstrap:    [ MainComponent ],
  // directive:    [ DataService ]
})
export class AppModule { }