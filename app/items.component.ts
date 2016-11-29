import { Component } from '@angular/core';

@Component({
	selector: 'items',
	template:`
	         <div class="well well-sm">
                <input type="text" class="form-control" placeholder="Create a new item In {{name}}" name="">
                <input type="submit" class="btn btn-link" name="" value="Create Item">
              </div>
               <div class="scrollable">
                  <div class="well well-sm">
                    <p><span [class]="getDoneStatus(done)"></span>{{name}}</p>
                    <p>Date Modified: {{date_modified}}</p>                   
                    <a style="color: green;"href="#"><span class="glyphicon glyphicon-edit">Edit</span></a>
                    <a style="color: red;" href="#"><span class="glyphicon glyphicon-trash">Delete</span></a>                   
                  </div>                 
                </div>
	         `

})
export class ItemsComponent{
	private date_modified: string = "Tue 5/Nov/2016 13:23:45"
    private done: boolean = false  
    private name: string = "Demo Item 1"

    private list_of_items: any[] = [
					   
					   
					]
 

    getDoneStatus(status: boolean) {
    if(status) { 
    	return "navbar-left glyphicon glyphicon-remove-circle"
    }else{
    	return "navbar-left glyphicon glyphicon-check"
    }
  }
}