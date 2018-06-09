export interface GeoCreate{
    id?:number;  
    name ?:string;
    description ?:string;       
}
export interface GeoCard{
    [index: number]: GeoCreate;                                    
}