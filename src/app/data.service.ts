import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable }     from 'rxjs/Observable';


import { BucketList, Item } from './bucketlist.items';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class HttpDataService {
    private BaseURL = "https://dj-bucketlist.herokuapp.com/"; //"http://localhost:8000/";
    private loginUrl: string = this.BaseURL + "api/v1/auth/login";
    private logoutUrl: string = this.BaseURL + "api/v1/auth/logout";
    private registerUrl: string = this.BaseURL + "api/v1/auth/register";
    private bucketlistURL: string = this.BaseURL + "api/v1/bucketlists"
    
    private http: Http;


    constructor(private _http: Http) {
        this.http = _http;
    }

    userAuthentication(user: Object, type: string){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var url = '';

        if (type == 'register'){
           url = this.registerUrl;
        }
        else {
            url = this.loginUrl;
        }       
        return this.http.post(url, JSON.stringify(user),{headers: headers} )
                    .map((res: Response) => res.json());
                 
    }

    UserLogout(){
        // Method deletes the token from the backend
        console.log(this.GenerateHeaders());
        return this.http.post(this.logoutUrl, {headers: this.GenerateHeaders()})
                            .map((res: Response) => res.json());

    }

    retrieveBucketLists(pageUrl:string){
        if (pageUrl === null){
            // if pageUrl is not the null it is mad e the current Url
            pageUrl = this.bucketlistURL;
        }        
        return this.http.get(pageUrl, {headers: this.GenerateHeaders()})
                            .map((res: Response) => res.json());
    }

    createBucketList(bucket: Object){
        return this.http.post(this.bucketlistURL, JSON.stringify(bucket), 
                                {headers: this.GenerateHeaders()})
                            .map((res: Response) => res.json());
    }

    EditBucketList(updatebucket: Object, BucketId: number){
        var url = this.bucketlistURL + '/' + BucketId;
        return this.http.put(url, JSON.stringify(updatebucket), 
                                {headers: this.GenerateHeaders()})
                            .map((res: Response) => res.json());
    }

    RetrieveSingleBucketList(BucketId: number){
        var url = this.bucketlistURL + '/' + BucketId;
        return this.http.get(url, {headers: this.GenerateHeaders()})
                            .map((res: Response) => res.json());
    }   

    DestroyBucketList(BucketId: number){ 
        let options = new RequestOptions({headers: this.GenerateHeaders(),
                                         method: RequestMethod.Delete });
        var url = this.bucketlistURL + '/' + BucketId;
        return this.http.request(url, options);   
    }

    CreateBucketListItem(newItem:Object, BucketId:number){
        var url = this.bucketlistURL + '/' + BucketId + '/items';
        return this.http.post(url, JSON.stringify(newItem), {headers: this.GenerateHeaders()})
                            .map((res: Response) => res.json());
    }

    EditBucketListItem(updateItem:Object, BucketId:number, ItemId:number){
        var url = this.bucketlistURL + '/' + BucketId + '/items/' + ItemId;
        return this.http.put(url, JSON.stringify(updateItem), {headers: this.GenerateHeaders()})
                            .map((res: Response) => res.json());
    }

    DestroyBucketListItem(BucketId:number, ItemId:number){
        let options = new RequestOptions({headers: this.GenerateHeaders(),
                                         method: RequestMethod.Delete });
        var url = this.bucketlistURL + '/' + BucketId + '/items/' + ItemId;
        return this.http.request(url, options);
    }

    GenerateHeaders(): Headers{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
        return headers;
    }

    
}
