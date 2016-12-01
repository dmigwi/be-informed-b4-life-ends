import { Component, Input } from '@angular/core';

@Component({
	selector: 'items',
	templateUrl: 'app/items.component.html'

})
export class ItemsComponent{
    private checkbox_toggle: any = undefined;
	private list_of_buckets: any[] = [
                       {
                        "created_by": "Migwi",
                        "date_created": "2016-11-29 14:35:25",
                        "date_modified": "2016-11-29 14:35:25",
                        "id": 1,
                        "item": [
                              {
                                "id": 1,
                                "date_created": "2016-11-29 14:35:25",
                                "date_modified": "2016-11-29 14:35:25",
                                "bucketlist": 1,
                                "done": false,
                                "name": "Item 1"
                              },
                              {
                                "id": 2,
                                "date_created": "2016-11-29 14:35:33",
                                "date_modified": "2016-11-29 14:35:33",
                                "bucketlist": 1,
                                "done": true,
                                "name": "Item 2"
                              },
                          ],

                        "name": "BucketList 1"
                      },
                      {
                        "created_by": "Migwi",
                        "date_created": "2016-11-29 14:35:33",
                        "date_modified": "2016-11-29 14:35:33",
                        "id": 2,
                        "item": [
                               {
                                "id": 3,
                                "date_created": "2016-11-29 14:35:39",
                                "date_modified": "2016-11-29 14:35:39",
                                "bucketlist": 2,
                                "done": false,
                                "name": "Item 3"
                              },
                              {
                                "id": 4,
                                "date_created": "2016-11-29 14:35:45",
                                "date_modified": "2016-11-29 14:35:45",
                                "bucketlist": 2,
                                "done": false,
                                "name": "Item 4"
                              },
                              {
                                "id": 5,
                                "date_created": "2016-11-29 14:35:53",
                                "date_modified": "2016-11-29 14:35:53",
                                "bucketlist": 2,
                                "done": true,
                                "name": "Item 5"
                              }
                            ],
                            
                        "name": "BucketList 2"
                      },
                       {
                        "created_by": "Migwi",
                        "date_created": "2016-11-29 14:35:39",
                        "date_modified": "2016-11-29 14:35:39",
                        "id": 3,
                        "item": [],
                        "name": "BucketList 3"
                      },
                      {
                        "created_by": "Migwi",
                        "date_created": "2016-11-29 14:35:45",
                        "date_modified": "2016-11-29 14:35:45",
                        "id": 4,
                        "item": [],
                        "name": "BucketList 4"
                      },
                      {
                        "created_by": "Migwi",
                        "date_created": "2016-11-29 14:35:33",
                        "date_modified": "2016-11-29 14:35:33",
                        "id": 6,
                        "item": [
                               {
                                "id": 6,
                                "date_created": "2016-11-29 14:35:39",
                                "date_modified": "2016-11-29 14:35:39",
                                "bucketlist": 6,
                                "done": false,
                                "name": "Item 6"
                              },
                              {
                                "id": 7,
                                "date_created": "2016-11-29 14:35:45",
                                "date_modified": "2016-11-29 14:35:45",
                                "bucketlist": 2,
                                "done": false,
                                "name": "Item 7"
                              },
                              {
                                "id": 8,
                                "date_created": "2016-11-29 14:35:53",
                                "date_modified": "2016-11-29 14:35:53",
                                "bucketlist": 6,
                                "done": true,
                                "name": "Item 8"
                              },
                              {
                                "id": 9,
                                "date_created": "2016-11-29 14:35:45",
                                "date_modified": "2016-11-29 14:35:45",
                                "bucketlist": 2,
                                "done": false,
                                "name": "Item 9"
                              },
                              {
                                "id": 10,
                                "date_created": "2016-11-29 14:35:53",
                                "date_modified": "2016-11-29 14:35:53",
                                "bucketlist": 2,
                                "done": true,
                                "name": "Item 10"
                              }
                            ],
                            
                        "name": "BucketList 6"
                      },
                      {
                        "created_by": "Migwi",
                        "date_created": "2016-11-29 14:35:53",
                        "date_modified": "2016-11-29 14:35:53",
                        "id": 5,
                        "item": [],
                        "name": "BucketList 5"
                      }
                    ];

    // Recieves Id input from bucketlist component
    @Input() public bucketlistId: number;

    // Recieves name input from bucketlist component
    @Input() public bucketName: string;
     
    // Retrieves the items based on the BucketList id available
    getItemsId(bucketId : number = this.bucketlistId) {
    	for (var bucketlist of this.list_of_buckets) {
			if (bucketlist.id == bucketId){
				return bucketlist.item;
			} 
    	}
     } 

     // checkbox toggle
     onChange(event: string){         
         this.checkbox_toggle = event.target.checked;
     }
     
     // UpdateItemForm(updatename.value, updatedone.value)
     UpdateItemForm(name: string){
        console.log(name)
        console.log(this.checkbox_toggle)
     } 

     CreateItemForm(createitem: string, bucketId: number){
        console.log(createitem)
        console.log(bucketId)
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