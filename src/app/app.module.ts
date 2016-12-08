import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';

import { ItemsComponent } from './items.component';
import { BucketlistComponent }  from './bucketlist.component';
import { LoginComponent } from  './login.component';
import { MainComponent } from  './main.component';
import { AuthGuard } from './authguard';

const appRoutes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'app', component: BucketlistComponent, canActivate: [ AuthGuard ]}
];

let options: ToastOptions = new ToastOptions({
  animate: 'flyRight',
  positionClass: 'toast-bottom-center',
});

@NgModule({
  imports:      [ BrowserModule , HttpModule, FormsModule,
   				  RouterModule.forRoot(appRoutes),
   				  ToastModule.forRoot(options) ],
  providers: 	[ AuthGuard],    
  declarations: [ ItemsComponent, BucketlistComponent, 
  				  LoginComponent, MainComponent, ],
  bootstrap:    [ MainComponent, ],
 })

export class AppModule { }