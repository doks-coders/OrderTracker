import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { map, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const memberGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const toastr = inject(ToastrService);
  return authenticationService.currentUser$.pipe(map(user=>{
    if(user){
      if(user.roles.includes("Member")){
       console.log("You are a member")
       return true;
      }
      console.log({user})
      toastr.error("You are not a member, so you can't pass")
      return false;
   }
   return false;
  }))
 
};
