export interface CountryI {
    id?: number;
    name?: string;
    description?: string;
    geography_id?: number;  
    country_code?: string;   
    geo_id?:number;    
}
  

export interface CountryCard {
    [index: number]: CountryI;
}     