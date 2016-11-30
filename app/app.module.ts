import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BucketlistComponent }  from './bucketlist.component';
import { HttpModule} from '@angular/http';
import { ItemsComponent } from './items.component';
// import { DataService } from './data.service';


@NgModule({
  imports:      [ BrowserModule , HttpModule],
  declarations: [ ItemsComponent, BucketlistComponent ],
  bootstrap:    [ BucketlistComponent ],
  // directive:    [ DataService ]
})
export class AppModule { }