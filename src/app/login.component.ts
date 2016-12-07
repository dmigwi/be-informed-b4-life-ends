import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpDataService } from './data.service';

import { Router, CanActivate } from '@angular/router';
import 'rxjs/Rx';


@Component({
    providers: [ HttpDataService, ],
    templateUrl: './login.component.html'
    
})
export class LoginComponent {
    private _login: any;
    private errorMessage: string;
    private successMessage: string;
    public currentUser: string;

   
    constructor(private login: HttpDataService, private router : Router ){
       this._login = login;
    }
    
    userLogin(username: string, password: string){
        this.currentUser = username;
        this._login.userAuthentication({"username":username, "password":password}, 'login')
                    .subscribe(
                        (data: any) => this.ExtractData(data),
                        (err: any) => this.OnError(err._body),
                        () => this.OnSuccessfulLogin());
        
        }
    
    userRegister(username: string, password: string){
         this._login.userAuthentication({"username":username, "password":password}, 'register')
                    .subscribe(
                        (data: any) => this.OnSuccess(data),
                        (err: any) => this.OnError(err._body));
        
        }
    
    // If the login is successful redirect to the bucketlistpage
    OnSuccessfulLogin(){
        this.router.navigate(['app'])
       }

     
    // Extract the data and assign it to local Storage
    ExtractData(data: any){ 
        localStorage.setItem('token', data.token);        
      }
     
     // Assign the error message
     OnError(error: any){
        this.errorMessage = error;                
     } 
    
    // Display successful registration to the user
    OnSuccess(data: any){              
        this.successMessage = data.Message;
     } 
}
