import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { map, take } from 'rxjs';
import { inject } from '@angular/core';

export const driverGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const toastr = inject(ToastrService);
  return authenticationService.currentUser$.pipe(map(user=>{
    if(user){
      if(user.roles.includes("Driver")){
       return true;
      }
      toastr.error("You are not a driver, so you can't pass")
      return false;
   }
   return false;
  }))
};
