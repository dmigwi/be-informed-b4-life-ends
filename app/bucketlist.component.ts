import { Component } from '@angular/core';

@Component({
    selector: 'bucketlist',
    template: `<div class="well well-sm">
                 <input type="text" class="form-control" placeholder="Create a new BucketList" name="">
                  <input type="submit" class="btn btn-link" name="" value="Create BucketList">                  
              </div>
              <div class=" scrollable" >
                  <div class="panel panel-default" *ngFor="let bucket of list_of_buckets; let i = index">
                      <div class="panel-body">{{i+1}}. {{bucket.name}}</div>
                      <div class="panel-footer">Date Modified: {{bucket.date_modified}}
                      <a style="color: green;"href="{{bucket.id}}"><span class="glyphicon glyphicon-edit">Edit</span></a>
                      <a style="color: red;" href="{{bucket.id}}"><span class="glyphicon glyphicon-trash">Delete</span></a>
                      </div>                       
                  </div>                 
                 </div>
                 <ul class="pager">
                  <li class="previous disabled"><a href="#">Previous</a></li>
                  <li class="next"><a href="#">Next</a></li>
                </ul>
              `
})

export class BucketlistComponent{
    private name: string = '1. BucketList Name 1'
    private date_modified: string = 'Tue 5/Nov/2016 13:23:45'

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
                        "date_created": "2016-11-29 14:35:53",
                        "date_modified": "2016-11-29 14:35:53",
                        "id": 5,
                        "item": [],
                        "name": "BucketList 5"
                      }
                    ]

}

