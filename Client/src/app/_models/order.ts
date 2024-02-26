export interface Order{
    id:number,
    s_n:number,
    name: string;
    country: string;
    address: string;
    phone_number: string;
    product_name: string;
    transport?: string;
    driverUserId?:number;
    description: string;
    size: string;
    orderStatus?: string;
    paymentStatus?: string;
    reciever_email: string;
    reciever_name: string;
    reciever_phone_number: string;
    reciever_location: string;
    dateCreated: Date;
    appUser?: any;
    driver?: any;
}