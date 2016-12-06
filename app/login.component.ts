import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpDataService } from './data.service';

import { Router, CanActivate } from '@angular/router';
import 'rxjs/Rx';


@Component({
    providers: [ HttpDataService, ],
    template: `
               <nav class="navbar navbar-inverse new-navbar navbar-fixed">
                  <div class="container-fluid">
                  <a class="navbar-brand" href="#">Logo</a>
                 </div>
                </nav>
                <!-- Login Display -->
                <div class="top-content row content">            
                    <div class="inner-bg">
                        <div class="container">                    
                            <div class="row">
                                <div class="col-sm-6 col-sm-offset-3 form-box vacation-image">  
                                     <img src="https://www.jetblue.com/img/vacations/travelstyles/AllInclusive/All_Inc_960x420.jpg" 
                                    class="img-rounded" alt="Vacations" width="97%" height="95%" style="margin:2%;">                          
                                    <div >
                                        <form class="login-form" (ngSubmit)="userLogin(username1.value, password1.value); 
                                                   username1.reset(); password1.reset();">
                                            <div class="form-group">                                    
                                                <input type="text" name="username1" placeholder="Username..." 
                                                        class="form-control" [ngModel]="" #username1="ngModel"
                                                        required pattern="[A-Za-z0-9@#$%^&*()]+" maxlength="50">
                                                <div [hidden]="username1.valid || username1.pristine" class="red">* Username not Valid.</div>
                                            </div>
                                            <div class="form-group">                                   
                                                <input type="password" name="password1" placeholder="Password..." 
                                                        class="form-control" [ngModel]="" #password1="ngModel" 
                                                        required pattern="[A-Za-z0-9@#$%^&*()]+" maxlength="50">
                                                <div [hidden]="password1.valid || password1.pristine" class="red">* Password not Valid.</div>
                                            </div>
                                            <button class="btn btn-success" type="submit"
                                                        [disabled]="!password1.valid||!username1.valid">Log In
                                            </button>
                                           <a data-toggle="modal" data-target="#RegisterModal"  href="#">
                                              Register to get an account...
                                            </a>

                                            <!--Status Display-->
                                           
                                            <span class="red col-md-8 col-md-offset-2" *ngIf="this.errorMessage">
                                                <p>ERROR:  : {{this.errorMessage}}</p>
                                            </span>

                                            <span class="green col-md-8 col-md-offset-2" *ngIf="this.successMessage">
                                                <p>{{this.successMessage}}</p>
                                            </span>
                                            
                                     </form>
                                     
                                    </div>
                                </div>
                            </div>
                            <div class="row">                        
                            </div>
                        </div>
                    </div>        
                </div>


                <!-- Delete Modal -->
                <div class="modal fade" id="RegisterModal" role="dialog">
                <div class="modal-dialog">

                  <!-- Modal content-->
                  <div class="modal-content modal-margin">
                    <div class="modal-header">
                      <form class="login-form">
                        <div class="form-group">                                    
                            <input type="text" name="username2" placeholder="Username..." 
                                    class="form-control" [ngModel]="" #username2="ngModel"
                                    required pattern="[A-Za-z0-9@#$%^&*()]+" maxlength="50">
                            <div [hidden]="username2.valid || username2.pristine" class="red">* Username not Valid.</div>
                        </div>
                        <div class="form-group">                                   
                            <input type="password" name="password2" placeholder="Password..." 
                                    class="form-control" [ngModel]="" #password2="ngModel" 
                                    required pattern="[A-Za-z0-9@#$%^&*()]+" maxlength="50">
                            <div [hidden]="password2.valid || password2.pristine" class="red">* Password not Valid.</div>
                        </div>
                        <div class="form-group">                                   
                            <input type="password" name="confirm1" placeholder="Confirm Password..." 
                                    class="form-control" [ngModel]="" #confirm1="ngModel" 
                                    required pattern="[A-Za-z0-9@#$%^&*()]+" maxlength="50"
                                   >
                            <div [hidden]="password2.value === confirm1.value" class="red">* Password not equal.</div>
                        </div>
                        <button class="navbar-left btn btn-info" type="button"  data-dismiss="modal"
                             (click)="userRegister(username2.value, password2.value)"
                            [disabled]="!password2.valid||!username2.valid||!confirm1.valid">
                            Register</button>
                        <input type="button" class="btn" data-dismiss="modal" value="Cancel">
                    </form>
                     
                    </div>       
                   </div>                                      
                  </div>
                 </div>
    `
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
