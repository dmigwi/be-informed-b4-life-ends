import { Component, OnInit, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { HttpDataService } from './data.service';

import { Router, CanActivate } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/Rx';


@Component({
    providers: [ HttpDataService, ],
    templateUrl: './login.component.html'    
})

export class LoginComponent {
    private _login: any;
    public currentUser: string;
   
    constructor(private login: HttpDataService, private router : Router
     , private toastr: ToastsManager, vRef: ViewContainerRef){
         toastr.setRootViewContainerRef(vRef);
         this._login = login;      
    }
    
    userLogin(username: string, password: string){
        this.currentUser = username;
        this._login.userAuthentication({"username":username, "password":password}, 'login')
                    .subscribe(
                        (data: any) => this.ExtractData(data),
                        (err: any) => this.OnError(err._body, 'Login Failed!'),
                        () => this.OnSuccessfulLogin());        
        }
    
    userRegister(username: string, password: string){        
         this._login.userAuthentication({"username":username, "password":password}, 'register')
                    .subscribe(
                        (data: any) => this.OnSuccess(data, 'Registration Successful!'),
                        (err: any) => this.OnError(err._body, 'Registration Failed!'));        
        }
    
    // If the login is successful redirect to the bucketlistpage
    OnSuccessfulLogin(){
        this.router.navigateByUrl("/app");
       }

     
    // Extract the data and assign it to local Storage
    ExtractData(data: any){ 
        localStorage.setItem('token', data.token);        
      }
     
     // Assign the error message
     OnError(error: any, message: string){
        if(JSON.parse(error).non_field_errors){
           error = JSON.parse(error).non_field_errors;          
          }
        this.toastr.error(error, message);                        
     } 
    
    // Display successful registration to the user
    OnSuccess(data: any, message: string){              
        this.toastr.success(data.Message, message);
     } 
}
