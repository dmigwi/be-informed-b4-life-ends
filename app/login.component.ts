import { Component } from '@angular/core';

@Component({
    selector: "login",
    template: `
                <!-- Login Display -->
                <div class="top-content row content">            
                    <div class="inner-bg">
                        <div class="container">                    
                            <div class="row">
                                <div class="col-sm-6 col-sm-offset-3 form-box vacation-image">  
                                     <img src="https://www.jetblue.com/img/vacations/travelstyles/AllInclusive/All_Inc_960x420.jpg" 
                                    class="img-rounded" alt="Vacations" width="97%" height="95%" style="margin:2%;">                          
                                    <div >
                                        <form class="login-form">
                                            <div class="form-group">                                    
                                                <input type="text" name="username1" placeholder="Username..." 
                                                        class="form-control" [ngModel]="'rrrrrrrrr'" #username1="ngModel"
                                                        required pattern="[A-Za-z0-9@#$%^&*()]+" maxlength="50">
                                                <div [hidden]="username1.valid" class="red">* Username not Valid.</div>
                                            </div>
                                            <div class="form-group">                                   
                                                <input type="password" name="password1" placeholder="Password..." 
                                                        class="form-control" [ngModel]="'rrrrrrrrr'" #password1="ngModel" 
                                                        required pattern="[A-Za-z0-9@#$%^&*()]+" maxlength="50">
                                                <div [hidden]="password1.valid" class="red">* Password not Valid.</div>
                                            </div>
                                            <button class="navbar-left btn btn-success" type="submit"
                                                        [disabled]="!password1.valid||!username1.valid">Log In
                                            </button>
                                            <button class="navbar-right btn btn-info" type="button"
                                                [disabled]="!password1.valid||!username1.valid">
                                                Register</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="row">                        
                            </div>
                        </div>
                    </div>        
                </div>
    `
})
export class LoginComponent{

}