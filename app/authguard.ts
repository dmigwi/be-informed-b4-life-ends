import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  // Class redirects everyone who is not logged
  private router: Router;

  constructor(router: Router){ 
    this.router = router; 	
  }

  canActivate() {
   // Return a boolean if the token exist
   if(localStorage.getItem("token") !== null){
    	return true;
		}
	//Redirect the user before denying them access to this route
    this.router.navigate(['/login']);
    return false;
  }
}
