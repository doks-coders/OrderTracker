import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './_components/authentication/register/register.component';
import { LoginComponent } from './_components/authentication/login/login.component';
import { InputComponent } from './_components/misc/input/input.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './_components/user-profiles/edit-user/edit-user.component';
import { SharedModule } from './_modules/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { OrderDetailsComponent } from './_components/order/order-details/order-details.component';
import { OrderFinaliseComponent } from './_components/order/order-finalise/order-finalise.component';
import { ViewOrdersComponent } from './_components/order/view-orders/view-orders.component';
import { ManageOrdersComponent } from './_components/admin/manage-orders/manage-orders.component';
import { ManageRolesComponent } from './_components/admin/manage-roles/manage-roles.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrdersModalComponent } from './_components/misc/orders-modal/orders-modal.component';
import { RiderDeliveriesComponent } from './_components/rider/rider-deliveries/rider-deliveries.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtAuthInterceptor } from './_interceptors/jwt-auth.interceptor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { OrderTableComponent } from './_components/order/order-table/order-table.component';
import { DriversModalComponent } from './_components/misc/drivers-modal/drivers-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    InputComponent,
    EditUserComponent,
    OrderDetailsComponent,
    OrderFinaliseComponent,
    ViewOrdersComponent,
    ManageOrdersComponent,
    ManageRolesComponent,
    OrdersModalComponent,
    RiderDeliveriesComponent,
    OrderTableComponent,
    DriversModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
