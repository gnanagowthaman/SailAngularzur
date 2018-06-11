export interface CountryI {
    id?: number;
    name?: string;
    description?: string;
    geo_id?: number;
    country_code?: string;       
}
export interface CountryCard {
    [index: number]: CountryI;
}     