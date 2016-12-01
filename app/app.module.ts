import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BucketlistComponent }  from './bucketlist.component';
import { HttpModule} from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { ItemsComponent } from './items.component';
import { LoginComponent } from  './login.component';
import { MainComponent } from  './main.component';



@NgModule({
  imports:      [ BrowserModule , HttpModule, FormsModule ],
  declarations: [ ItemsComponent, BucketlistComponent, LoginComponent, MainComponent ],
  bootstrap:    [ MainComponent ],
  // directive:    [ DataService ]
})
export class AppModule { }