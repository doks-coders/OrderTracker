import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../_services/authentication.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const toastr = inject(ToastrService);
  const router = inject(Router);
 
  return authenticationService.currentUser$.pipe(map(user=>{
    if(user){
      console.log("There is a user")
      return true;
    }else{
      toastr.error("You are not logged in");
      router.navigateByUrl("/login");
      return false;
    }
  }))
};
