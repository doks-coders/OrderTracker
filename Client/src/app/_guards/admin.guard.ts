import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const toastr = inject(ToastrService);
  return authenticationService.currentUser$.pipe(map(user=>{
    if(user){
      if(user.roles.includes("Admin")){
       return true;
      }
      toastr.error("You are not a admin, so you can't pass")
      return false;
   }
   return false;
  }))
};
