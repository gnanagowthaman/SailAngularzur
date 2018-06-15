export interface Client {
    user_name?: string;
    email_id?: string;
    mobile_no?: number;
    company_name?: string;
    role_id?: number;
    subscription?: string;
    access?:string;    
    // cliaccess?: string;
    // resaccess?: string;
    smsaccess?: number;
    webaccess?: number;
    emailaccess?: number;
    country?: number;
    geopgrpahy?: string;      
    state?: number;
}       
export interface fullClient{
    user_name?: string;
    email_id?: string;
    mobile_no?: number;
    company_name?: string;
    role_id?: number;
    subscription?: string;
    access?:string;    
    smsaccess?: number;
    webaccess?: number;
    emailaccess?: number;
    country?: number;
    geopgrpahy?: string;      
    state?: number;
    regulation?: any[];  
}


