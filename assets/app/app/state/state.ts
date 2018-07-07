export interface StateI {
    id?: number;
    name?: string;
    description?: string;
    state_code?: string;       
    gid?:number; 
    geography_id?:number;                              
    country_id?:number;     
}      
export interface StateIU{
    id?: number;
    name?: string;
    description?: string;
    state_code?: string;       
    geography_id?:number;                              
    country_id?:number;    
}
export interface StateCard {         
    [index: number]: StateI; 
}     
export interface StateCardU{
    [index: number]: StateIU;             
}