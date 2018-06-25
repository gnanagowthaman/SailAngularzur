export interface UploadI {
    rdlid?: number;
    gid?: number;
    gname?: string;
    did?: number;
    dname?: string;
    rid?: number;
    rname?: string;
    docid?: number;
    docname?: string;
    coid?: number;
    coname?: string;
    stid?: number;
    geography_id?: number;
    stname?: string;
    regtrId?: number;
    sdocid?: number;
    regtrName?: string;
    fid?: number;
    fname?: string;
    level?: string;
    isuploaded?: number;
    is_published?: number;
    tobepublished?: number;

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
    sub_document_id?: number;
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
    regulation_document_id?: number;
    file_id?: number;
    file_name?: string;
    is_published?: number;
    docname?: string;
}
export interface SpecialUploadCard {
    [index: number]: SpecialUploadI;
}
export interface UploadCard {
    [index: number]: UploadI;
} 