export interface DocumentI {
    id?:number;  
    name ?:string;
    description ?:string;  
}
export interface DocCard{                     
    [index: number]: DocumentI;                                    
}
