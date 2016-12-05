import { Component, OnInit } from '@angular/core';
import { BucketList } from './bucketlist.items';
import { HttpDataService } from './data.service';

@Component({
    providers: [ HttpDataService ],
    templateUrl: 'app/bucketlist.component.html'
})

export class BucketlistComponent implements OnInit{
    private validId: number = 0;
    private bucketlistName: string = 'No BucketList Found!';
    private list_of_buckets: BucketList[] = [];
    private bucketlist: HttpDataService;

    constructor(bucketlist: HttpDataService){
        this.bucketlist = bucketlist;
        console.log('Tests');
        this.RetreiveBucketListForm(); 
    }

    NextOrPreviousPage(pageUrl: string){
        this.RetreiveBucketListForm(pageUrl);
    }
         
    // Retrieves BucketList associated with the current user
    RetreiveBucketListForm(thisUrl: string=null){
        this.bucketlist.retrieveBucketLists(thisUrl)
             .subscribe((data: any) => this.ExtractBucketListData(data),
                        (err: any) => this.OnError(err._body));        
    }    
    
    // Creates a new bucketlist associated with current user
    CreateBucketList(name: string){
        console.log(name);
        
        this.bucketlist.createBucketList({"name":name})
             .subscribe((data: any) => {console.log('Nikiwa mbali ',data)},
                        (err: any) => this.OnError(err._body),
                        () => this.RetreiveBucketListForm()
                        );
    }
    
    // Updates a Bucketlist associated with the current user
    UpdateBucketList(name: string, BucketListId: number){
        this.bucketlist.EditBucketList({"name": name}, BucketListId)
             .subscribe((data: any) => data,
                        (err: any) => this.OnError(err._body),
                        () => this.RetreiveBucketListForm());        
    }
    
    // Delete a Bucketlist associated with the current user
    DeleteBucketList(name: string, BucketListId: number){
        this.bucketlist.DestroyBucketList(BucketListId)
             .subscribe((data: any) => data,
                        (err: any) => this.OnError(err._body),
                        () => this.RetreiveBucketListForm());        
    }

    // Function returns Message if the current user doesn't have any bucketlist
    AddInitialValues(allBuckets: Object){
        if (typeof(allBuckets) !== 'undefined') {
              this.validId = allBuckets['id'];
              this.bucketlistName = allBuckets['name'];
         }
    }

    // Change the BucketList Id to the current clicked bucketList's
    displayCurrentItems(id: number, name: string){
        this.validId = id; 
        this.bucketlistName = name;             
    }
   
    ExtractBucketListData(rawData: any){
      console.log(rawData);
      console.log(rawData.results[0]);
      this.AddInitialValues(rawData.results[0]);
      this.list_of_buckets = rawData.results;
    }


    OnError(error: any){
      alert(error);
    }

    // Called after the component has fully loaded
    ngOnInit(){
        // console.log('Tests');
        // this.RetreiveBucketListForm();        
    }


}

