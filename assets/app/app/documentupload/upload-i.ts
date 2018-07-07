export interface UploadI {
    fileType?: string;
    fileName?: string;
    path?: string;
    message?: string;
    geoName?: string;
    countryName?: string;
    stateName?: string;
    domainName?: string;
    regName?: string;
    regulatorName?: string;
    docName?: string;
    subDocName?: string;
    regDocId?: number;
    geoId?: number;
    subdocId?: number;
    countryId?: number;
    stateId?: number;
    domainId?: number;
    reglatorId?: number;
    regulationId?: number;
    level?: number;
    fid?: string;
    is_uploaded?: boolean;
    is_published?: boolean;
    tobepublished?: boolean;
    uploadFile?: string;
}
export interface SpecialUploadI {
    id?: number;
    geography_id?: number;
    domain_id?: number;
    regulation_id?: number;
    document_id?: number;
    country_id?: number;
    state_id?: number;
    regulator_id?: number;
    sub_document_id?: string;
    regulationStatus?: number;     
    gname?: string;
    dname?: string;
    spid?: number;
    date?: string;
    description?: string;
    document_type?: string;
    document_type_id?: number;
    document_link?: string;   
    type?: string;
    regulation_document_id?: string;
    file_id?: string;
    file_name?: string;
    is_uploaded?: boolean;
    is_published?: boolean;
    docname?: string;
}
export interface SpecialUploadCard {
    [index: number]: SpecialUploadI;
}
export interface UploadCard {
    [index: number]: UploadI;
}

