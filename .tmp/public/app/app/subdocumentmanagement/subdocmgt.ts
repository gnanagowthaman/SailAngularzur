export interface SubDocMgtI {
    id?: number;
    name?: string;
    description?: string;   
    parent_id?: number;        
    doc_id?:number;                   
}
export interface SubDocMgtIU {
    id?: number;
    name?: string;
    description?: string;
    doc_id?: number;           
}
export interface SubDocMgtCard {
    [index: number]: SubDocMgtI;              
}   
export interface SubDocMgtCardIU {                
    [index: number]: SubDocMgtIU;              
}    