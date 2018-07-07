export interface RegulatorI {
    id?:number;  
    name ?:string;
    description ?:string;   
}
export interface RegulatorCard{
    [index: number]: RegulatorI;                                    
}