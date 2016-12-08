import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BucketList } from './bucketlist.items';
import { HttpDataService } from './data.service';

import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
    providers: [ HttpDataService ],
    templateUrl: './bucketlist.component.html'
})

export class BucketlistComponent implements OnInit{
    private validId: number = 0;
    private bucketlistName: string = 'No BucketList Found!';
    private currentUser: string = " ";
    private list_of_buckets: BucketList[] = [];
    private bucketlist: HttpDataService;
    
    private page_next: string;
    private page_pervious: string;

    private pageCount: number = 0;

    constructor(bucketlist: HttpDataService, private router: Router
        , private toastr: ToastsManager, vRef: ViewContainerRef){
         toastr.setRootViewContainerRef(vRef);
        this.bucketlist = bucketlist;
    }

    Logout(){
        // Logout Method should delete the token from both the backend and local Storage
        this.bucketlist.UserLogout()
             .subscribe((data: any) => data,
                        (err: any) => this.OnError(err._body, 'Logout Failed!'),
                        () => {this.router.navigateByUrl("/"),
                                localStorage.clear()});
    }

    PreviousPage(pageUrl: string){        
        this.RetreiveBucketListForm(pageUrl);

         // Decrease the pageCount by 10 since the default page size is 10 elements
        this.pageCount = this.pageCount - 10;
    }

    NextPage(pageUrl: string){        
        this.RetreiveBucketListForm(pageUrl);

        // Increase the pageCount by 10 since the default page size is 10 elements
        this.pageCount = this.pageCount + 10;
    }
         
    // Retrieves BucketList associated with the current user
    RetreiveBucketListForm(thisUrl: string=null){
        this.bucketlist.retrieveBucketLists(thisUrl)
             .subscribe((data: any) => this.ExtractBucketListData(data),
                        (err: any) => this.OnError(err._body, 'Retrieve BucketList Failed!'));        
    }    
    
    // Creates a new bucketlist associated with current user
    CreateBucketList(name: string){        
        this.pageCount = 0;   // initialize the count again
        this.bucketlist.createBucketList({"name":name})
             .subscribe((data: any) => data,
                        (err: any) => this.OnError(err._body, 'Create BucketList Failed!'),
                        () => this.RetreiveBucketListForm());
    }
    
    // Updates a Bucketlist associated with the current user
    UpdateBucketList(name: string, BucketListId: number){        
        this.pageCount = 0;   // initialize the count again
        this.bucketlist.EditBucketList({"name": name}, BucketListId)
             .subscribe((data: any) => data,
                        (err: any) => this.OnError(err._body, 'Update BucketList Failed!'),
                        () => this.RetreiveBucketListForm());     
    }
    
    // Delete a Bucketlist associated with the current user
    DeleteBucketList(BucketListId: number){        
        this.RetreiveBucketListForm();
        this.bucketlist.DestroyBucketList(BucketListId)
             .subscribe((data: any) => data,
                        (err: any) => this.OnError(err._body, 'Delete BucketList Failed!'),
                        () => this.RetreiveBucketListForm());        
          
    }

    // Function returns Message if the current user doesn't have any bucketlist
    AddInitialValues(allBuckets: Object){
        if (typeof(allBuckets) !== 'undefined') {
              this.validId = allBuckets['id'];
              this.bucketlistName = allBuckets['name'];
              this.currentUser = allBuckets['created_by'];
         }
    }

    // Change the BucketList Id to the current clicked bucketList's
    displayCurrentItems(id: number, name: string){
        this.validId = id; 
        this.bucketlistName = name;             
    }
   
    ExtractBucketListData(rawData: any){
        this.AddInitialValues(rawData.results[0]);
        this.list_of_buckets = rawData.results;
        this.page_next = rawData.next;
        this.page_pervious = rawData.previous;
    }   

    OnError(error: any, message: string){
         this.toastr.error(error, message);                  
     }

    // Called after the component has fully loaded
    ngOnInit(){
        this.RetreiveBucketListForm();                
    }    

}

