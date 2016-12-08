import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { HttpDataService } from './data.service'; 
import { Item } from './bucketlist.items';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	selector: 'items',
    providers: [ HttpDataService ],
	templateUrl: './items.component.html'

})
export class ItemsComponent{
    private checkbox_toggle: any = undefined;
	private list_of_items: Item[] = [];
    private items: HttpDataService;
    private updateObject: any;

    private error_create_item: string;

    constructor(items: HttpDataService, private toastr: ToastsManager, vRef: ViewContainerRef){
         toastr.setRootViewContainerRef(vRef);
         this.items = items;
    }

    // Recieves Id input from bucketlist component
    @Input() public bucketlistId: number;

    // Recieves name input from bucketlist component
    @Input() public bucketName: string;

    ngOnChanges(...args: any[]) {
        if (this.bucketlistId > 0)
                this.RetrieveItems(this.bucketlistId);       
    }
     
    // Retrieves the items based on the BucketList id available
    RetrieveItems(bucketId : number = this.bucketlistId){
        this.items.RetrieveSingleBucketList(bucketId)
                   .subscribe((data: any) => this.ExtractItemData(data),
                        (err: any) => this.OnError(err._body, 'Retrieve Item Failed!')); 
    }

    getItemsId() {
    	if (this.list_of_items){
            return this.list_of_items;
        }
     } 

    CreateItemForm(createitem: string, bucketId: number){
        this.items.CreateBucketListItem({"name": createitem}, bucketId)
                    .subscribe((data: any) => data,
                        (err: any) => this.OnError(err._body, 'Create Item Failed!'),
                        () => this.RetrieveItems(bucketId));
     } 
     
    UpdateItemForm(name: string, BucketListId: number, ItemId: number){
        if (this.checkbox_toggle === true){
            this.updateObject = {"name":name, "done":true}
        }
        else if (this.checkbox_toggle === false){
            this.updateObject = {"name":name, "done":false}
        }
        else{
            this.updateObject = {"name":name}
        }
        
        this.items.EditBucketListItem(this.updateObject, BucketListId, ItemId)                                    
                    .subscribe((data: any) => data,
                        (err: any) => this.OnError(err._body, 'Update Item Failed!'),
                        () => this.RetrieveItems(BucketListId));
     } 

     DeleteItemForm(BucketListId: number, ItemId: number){
         this.items.DestroyBucketListItem(BucketListId, ItemId)
                    .subscribe((data: any) => data,
                        (err: any) => this.OnError(err._body, 'Delete Item Failed!'),
                        () => this.RetrieveItems(BucketListId));         
     } 
     
     ExtractItemData(data: any[]){
        this.error_create_item = null;  

        this.list_of_items = data['items'];
     }

     OnError(error: any, message: string){
         this.toastr.error(error, message);                  
     }

     // checkbox toggle
     onChange(event: any){         
        this.checkbox_toggle = event.target.checked;
     }         

    // Function checks the done status an returns the glyphicon class
    getDoneStatus(status: boolean) {
	    if(status) { 
	    	return "navbar-left glyphicon glyphicon-check green";
	    }else{
	    	return "navbar-left glyphicon glyphicon-remove-circle yellow";
	    }
  }
}