import { Component } from '@angular/core';

@Component({
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
                                                        class="form-control" [ngModel]="" #username1="ngModel"
                                                        required pattern="[A-Za-z0-9@#$%^&*()]+" maxlength="50">
                                                <div [hidden]="username1.valid" class="red">* Username not Valid.</div>
                                            </div>
                                            <div class="form-group">                                   
                                                <input type="password" name="password1" placeholder="Password..." 
                                                        class="form-control" [ngModel]="" #password1="ngModel" 
                                                        required pattern="[A-Za-z0-9@#$%^&*()]+" maxlength="50">
                                                <div [hidden]="password1.valid" class="red">* Password not Valid.</div>
                                            </div>
                                            <button class="btn btn-success" type="submit"
                                                        [disabled]="!password1.valid||!username1.valid">Log In
                                            </button>
                                           <a data-toggle="modal" data-target="#RegisterModal"  href="#">
                                              Register to get an account...
                                            </a>
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
                            <div [hidden]="username2.valid" class="red">* Username not Valid.</div>
                        </div>
                        <div class="form-group">                                   
                            <input type="password" name="password2" placeholder="Password..." 
                                    class="form-control" [ngModel]="" #password2="ngModel" 
                                    required pattern="[A-Za-z0-9@#$%^&*()]+" maxlength="50">
                            <div [hidden]="password2.valid" class="red">* Password not Valid.</div>
                        </div>
                        <div class="form-group">                                   
                            <input type="password" name="confirm1" placeholder="Confirm Password..." 
                                    class="form-control" [ngModel]="" #confirm1="ngModel" 
                                    required pattern="[A-Za-z0-9@#$%^&*()]+" maxlength="50"
                                   >
                            <div [hidden]="password2.value === confirm1.value" class="red">* Password not equal.</div>
                        </div>
                        <button class="navbar-left btn btn-info" type="button"
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
export class LoginComponent{

}