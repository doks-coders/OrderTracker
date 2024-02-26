import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './_components/authentication/register/register.component';
import { LoginComponent } from './_components/authentication/login/login.component';
import { EditUserComponent } from './_components/user-profiles/edit-user/edit-user.component';
import { HomeComponent } from './_components/home/home.component';
import { OrderDetailsComponent } from './_components/order/order-details/order-details.component';
import { OrderFinaliseComponent } from './_components/order/order-finalise/order-finalise.component';
import { ViewOrdersComponent } from './_components/order/view-orders/view-orders.component';
import { ManageOrdersComponent } from './_components/admin/manage-orders/manage-orders.component';
import { ManageRolesComponent } from './_components/admin/manage-roles/manage-roles.component';
import { RiderDeliveriesComponent } from './_components/rider/rider-deliveries/rider-deliveries.component';
import { authGuard } from './_guards/auth.guard';
import { adminGuard } from './_guards/admin.guard';
import { driverGuard } from './_guards/driver.guard';
import { memberGuard } from './_guards/member.guard';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"edit-user",component:EditUserComponent},
  {path:"",runGuardsAndResolvers:"always", canActivate:[authGuard],children:[
    {path:"order-details",component:OrderDetailsComponent,canActivate:[memberGuard]},
    {path:"order-finalise",component:OrderFinaliseComponent,canActivate:[memberGuard]},
    {path:"view-orders",component:ViewOrdersComponent,canActivate:[memberGuard]},
    {path:"manage-orders",component:ManageOrdersComponent,canActivate:[adminGuard]},
    {path:"manage-roles",component:ManageRolesComponent,canActivate:[adminGuard]},
    {path:"rider-delivery",component:RiderDeliveriesComponent,canActivate:[driverGuard]},
  ]},
  {path:"**",component:HomeComponent, pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
