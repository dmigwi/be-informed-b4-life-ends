import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BucketlistComponent }  from './bucketlist.component';
import { ItemsComponent } from './items.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ ItemsComponent, BucketlistComponent ],
  bootstrap:    [ ItemsComponent, BucketlistComponent ]
})
export class AppModule { }