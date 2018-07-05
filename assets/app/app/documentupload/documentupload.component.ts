import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Response, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { DocumentuploadService } from './documentupload.service';
import { UploadI, SpecialUploadI } from './upload-i';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-documentupload',
  templateUrl: './documentupload.component.html',
  styleUrls: ['./documentupload.component.css']
})
export class DocumentuploadComponent implements OnInit {
  // public correct: boolean = false;
  // public testdemo: boolean = false;
  // public foo:number;
  modalRef: BsModalRef;
  message: string;

  myDir = '';
  status = [];
  buttonDisabled: boolean;
  spDocumentResponse: any;
  documentResponse: any;
  resultResponse: any;
  geoArrayResponse: any; countryArrayResponse: any; stateArrayResponse: any; domainArrayResponse: any;
  regulatorArrayResponse: any; regulationArrayResponse: any; documentArrayResponse: any;
  subDocumentArrayResponse: any; documentTypeResponse: any; uploadSpecialResponse: any;
  geoText: any; cou_Text: any;
  optionSelected = 0;
  selectedCountry = 0;
  selectedState = 0;
  selectedDomain = 0;
  selectedRegulator = 0;
  selectedRegulation = 0;
  selectedRootDoc = 0;
  selectedSubDoc = 0;
  selectedLDocument = 0;

  lDocVal = [];
  countryVal = [];
  stateVal = [];
  domainVal = [];
  regulatorVal = [];
  regulationVal = [];
  rootDocVal = [];
  subDocVal = [];
  testArray=[];
  geoName: any; countryName: any; stateName: any; domainName: any; regulatorName: any; regName: any;
  docName: any; subDocName: any; path: any; spath: any; geoId: any; countryId: any; stateId: any;
  domainId: any; regulatorId: any; regulationId: any; regDocId: any; subdocId: any; optDocTName: any; optDocTId: any;
  fileType: any; fileName: any; messages: any; level: any = 0; uploaDFile: any; foo: any; headers: any;
  uploadResponse: any; inPath: any;
  butDisabled: boolean = true; buttonDisabledState: boolean = true; buttonDisabledDomain: boolean = true; buttonDisabledRegulator: boolean = true;
  buttonDisabledRegulation: boolean = true; buttonDisabledRootDoc: boolean = true; buttonDisabledSubDoc: true;

  constructor(private http: HttpClient, private documentService: DocumentuploadService, private renderer: Renderer2, private elem: ElementRef, private _router: Router, private modalService: BsModalService) { }
  @ViewChild("messagename") messagename: ElementRef;
  @ViewChild("selectGeo") selectGeo: ElementRef;
  @ViewChild("selectCountry") selectCountry: ElementRef;
  @ViewChild("selectState") selectState: ElementRef;
  @ViewChild("selectDomain") selectDomain: ElementRef;
  @ViewChild("selectRegulator") selectRegulator: ElementRef;
  @ViewChild("selectRegulation") selectRegulation: ElementRef;
  @ViewChild("selectRootDoc") selectRootDoc: ElementRef;
  @ViewChild("selectSubDoc") selectSubDoc: ElementRef;
  @ViewChild("uploadFile") uploadFile: ElementRef;

  @ViewChild("documenttype") documenttype: ElementRef;
  @ViewChild("docTypedescription") docTypedescription: ElementRef;

  @ViewChild("uploadSpecialFile") uploadSpecialFile: ElementRef;
  @ViewChild("datespecialupload") datespecialupload: ElementRef;
  formdata: FormGroup;
  ngOnInit() {

    this.formdata = new FormGroup({
      uploadmessage: new FormControl(""),
      uploadgeography: new FormControl(""),
      uploadcountry: new FormControl(""),
      uploadstate: new FormControl(""),
      uploaddomain: new FormControl(""),
      uploadregulator: new FormControl(""),
      uploadregulation: new FormControl(""),
      uploadrootdoc: new FormControl(""),
      uploadsubdoc: new FormControl(""),
      uploadldocument: new FormControl(""),
      docTypeDescriptionName: new FormControl("")


      // subDocDescription: new FormControl(""),
      // subDocSelectDocument: new FormControl(""),                                           
    });
    this.specialDocumentListLoad();
    this.documentListLoad();
    this.findRegulationDataMethod();
    this.documentTypeLoad();
  }
  findRegulationDataMethod() {
    this.documentService.getFindRegulationData().subscribe(result => {
      this.resultResponse = result;
      this.geoArrayResponse = this.resultResponse.geoCollection;
      console.log("am geography arry response", this.geoArrayResponse)
      this.countryArrayResponse = this.resultResponse.countryCollection;
      this.stateArrayResponse = this.resultResponse.stateCollection;
      this.domainArrayResponse = this.resultResponse.domainCollection;
      this.regulatorArrayResponse = this.resultResponse.regulatorCollection;
      this.regulationArrayResponse = this.resultResponse.regCollection;
      this.documentArrayResponse = this.resultResponse.documentCollection;
      this.subDocumentArrayResponse = this.resultResponse.subDocumentCollection;
    });
  }
  documentTypeLoad() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.get('http://localhost:1337/documentType', { headers: headers }).subscribe(
      data => {
        this.documentTypeResponse = data
        console.log(data);
      });
  }
  specialDocumentListLoad() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.get('http://localhost:1337/document', { headers: headers }).subscribe(
      data => {
        this.documentResponse = data;
        console.log(data, "document response");
      });
  }
  documentListLoad() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.get('http://localhost:1337/spdocument', { headers: headers }).subscribe(
      data => {

        this.spDocumentResponse = data
        console.log(data);
      });
  }
  toggle() {
    //this.foo=1;             
    this._router.navigate(['/uploadCreate']);
  }
  ngAfterViewInit() {
  }
  onSelectGeography(evt) {
    var geography_id = evt.target.value;
    this.geoText = evt.target.options[evt.target.selectedIndex].text;
    this.optionSelected = geography_id;

    this.selectedCountry = 0;
    this.selectedState = 0;
    this.selectedDomain = 0;
    this.selectedRegulator = 0;
    this.selectedRegulation = 0;
    this.selectedRootDoc = 0;
    this.selectedSubDoc = 0;

    this.domainVal = [];
    this.stateVal = [];
    this.regulatorVal = [];
    this.regulationVal = [];
    this.rootDocVal = [];
    this.subDocVal = [];

    this.buttonDisabled = true;
    this.countryVal = this.countryArrayResponse.filter((item) => {
      console.log("country id", item.geography_id, "geography id", geography_id)
      console.log("item", item)
      return item.geography_id === Number(geography_id)
    });
    console.log(this.geoText)
  }
  onSelectCountry(args) {
    var country_id = args.target.value;
    this.cou_Text = args.target.options[args.target.selectedIndex].text;
    this.selectedCountry = country_id;

    this.selectedState = 0;
    this.selectedDomain = 0;
    this.selectedRegulator = 0;
    this.selectedRegulation = 0;
    this.selectedRootDoc = 0;
    this.selectedSubDoc = 0;

    this.domainVal = [];
    this.regulatorVal = [];
    this.regulationVal = [];
    this.rootDocVal = [];
    this.subDocVal = [];

    this.buttonDisabledState = true;
    this.stateVal = this.stateArrayResponse.filter((item) => {
      console.log("state id", item.country_id, "s id", country_id)
      return item.country_id === Number(country_id)
    });
  }
  onSelectState(args) {
    var state_id = args.target.value;
    this.selectedState = state_id;

    this.selectedDomain = 0;
    this.selectedRegulator = 0;
    this.selectedRegulation = 0;
    this.selectedRootDoc = 0;
    this.selectedSubDoc = 0;

    this.regulatorVal = [];
    this.regulationVal = [];
    this.rootDocVal = [];
    this.subDocVal = [];

    this.buttonDisabledDomain = true;
    this.domainVal = this.domainArrayResponse.filter((item) => {
      console.log("state id", item.sid, "state id", state_id)
      if (item.sid === Number(state_id) && item.gid === Number(this.optionSelected) && item.cntid === Number(this.selectedCountry)) {
        return item.sid;
      }
    });
  }
  onSelectDomain(args) {
    var domain_id = args.target.value;
    this.selectedDomain = domain_id;
    this.selectedRegulator = 0;
    this.selectedRootDoc = 0;
    this.selectedSubDoc = 0;

    this.regulationVal = [];
    this.rootDocVal = [];
    this.subDocVal = [];

    this.buttonDisabledRegulator = true;
    this.regulatorVal = this.regulatorArrayResponse.filter((item) => {
      console.log("domain item id", item.did, "domain id", domain_id)
      if (item.did === Number(domain_id) && item.gid === Number(this.optionSelected) && item.cntid === Number(this.selectedCountry) && item.sid === Number(this.selectedState)) {
        return item.rid;
      }
    });
  }
  onSelectRegulator(args) {
    var regulator_id = args.target.value;
    this.selectedRegulator = regulator_id;
    this.selectedRegulation = 0;
    this.selectedRootDoc = 0;
    this.selectedSubDoc = 0;

    this.rootDocVal = [];
    this.subDocVal = [];

    this.buttonDisabledRegulation = true;
    this.regulationVal = this.regulationArrayResponse.filter((item) => {
      console.log("domain item id", item.rid, "domain id", regulator_id)
      if (item.gid === Number(this.optionSelected) && item.cntid === Number(this.selectedCountry) && item.sid === Number(this.selectedState) && item.did === Number(this.selectedDomain) && item.rid === Number(this.selectedRegulator)) {
        return item.rlid;
      }
    });
  }
  onSelectRegulation(args) {
    var regulation_id = args.target.value;
    this.selectedRegulation = regulation_id;
    this.selectedRootDoc = 0;
    this.selectedSubDoc = 0;
    this.subDocVal = [];
    this.buttonDisabledRootDoc = true;
    this.rootDocVal = this.documentArrayResponse.filter((item) => {
      console.log("domain item id", item.rlid, "domain id", regulation_id)
      if (item.gid === Number(this.optionSelected) && item.cntid === Number(this.selectedCountry) && item.sid === Number(this.selectedState) && item.did === Number(this.selectedDomain) && item.rid === Number(this.selectedRegulator) && item.rlid === Number(this.selectedRegulation)) {
        return item.docid;
      }
    });
  }
                                                                  
  onSelectRootDoc(args) {
    var rooddoc_id = args.target.value;
    this.selectedRootDoc = rooddoc_id;
    console.log(rooddoc_id, "deadpool")
    let stTestDocName = this.rootDocVal[0].is_special_doc;
    console.log("doc special is", this.rootDocVal[0].is_special_doc)
    if (stTestDocName === 1) {

      this.messages = this.messagename.nativeElement.value;
      var refGeography = this.selectGeo.nativeElement;
      var optGeo = refGeography.options[refGeography.selectedIndex];
      this.geoName = optGeo.text;
      this.geoId = optGeo.value;
      var refCountry = this.selectCountry.nativeElement;
      var optCou = refCountry.options[refCountry.selectedIndex];
      this.countryName = optCou.text;
      this.countryId = optCou.value;
      var refState = this.selectState.nativeElement;
      var optSta = refState.options[refState.selectedIndex];
      this.stateName = optSta.text;
      this.stateId = optSta.value;
      var refDomain = this.selectDomain.nativeElement;
      var optDoma = refDomain.options[refDomain.selectedIndex];
      this.domainName = optDoma.text;
      this.domainId = optDoma.value;
      var refRegulator = this.selectRegulator.nativeElement;
      var optRegt = refRegulator.options[refRegulator.selectedIndex];
      this.regulatorName = optRegt.text;
      this.regulatorId = optRegt.value;
      var refRegulation = this.selectRegulation.nativeElement;
      var optRegl = refRegulation.options[refRegulation.selectedIndex];
      this.regName = optRegl.text;
      this.regulationId = optRegl.value;
      var refRootDocument = this.selectRootDoc.nativeElement;
      var optRootD = refRootDocument.options[refRootDocument.selectedIndex];
      this.docName = optRootD.text;
      this.regDocId = optRootD.value;
      var refSubDocument = this.selectSubDoc.nativeElement;
      var optSubD = refSubDocument.options[refSubDocument.selectedIndex];
      this.subDocName = optSubD.text;
      this.subdocId = optSubD.value;
      console.log(this.geoId, this.countryId, this.stateId, this.domainId, this.regulatorId, this.regulationId, this.regDocId, "all values");
      this.specificLoad();
      console.log("dkfjkdsfs")
      this.myDir = 'local';
      console.log('this is  my dir', this.myDir)
      console.log('am special one', this.path)

    }
    this.selectedSubDoc = 0;
    this.buttonDisabledSubDoc = true;
    this.subDocVal = this.subDocumentArrayResponse.filter((item) => {
      console.log("domain item id", item.docid, "domain id", rooddoc_id)
      if (item.gid === Number(this.optionSelected) && item.cntid === Number(this.selectedCountry) && item.sid === Number(this.selectedState) && item.did === Number(this.selectedDomain) && item.rid === Number(this.selectedRegulator) && item.rlid === Number(this.selectedRegulation) && item.docid === Number(this.selectedRootDoc)) {
        return item.sdocid;
      }
    });
  }
  specificLoad() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    let httpParams = new HttpParams().set('geoId', this.geoId).set('countryId', this.countryId).set('stateId', this.stateId)
      .set('domainId', this.domainId).set('regulatorId', this.regulatorId).set('regId', this.regulationId).set('regDocId', this.regDocId)
      .set('subDocId', '10');

    this.http.get('http://localhost:1337/spdocument', { headers: headers, params: httpParams }).subscribe(
      data => {
        this.inPath = data;
        console.log(data, "sp parameter");
      });
  }
  fileEvent(fileInput) {
    const formData: FormData = new FormData();
    this.messages = this.messagename.nativeElement.value;
    var refGeography = this.selectGeo.nativeElement;
    var optGeo = refGeography.options[refGeography.selectedIndex];
    this.geoName = optGeo.text;
    this.geoId = optGeo.value;
    var refCountry = this.selectCountry.nativeElement;
    var optCou = refCountry.options[refCountry.selectedIndex];
    this.countryName = optCou.text;
    this.countryId = optCou.value;
    var refState = this.selectState.nativeElement;
    var optSta = refState.options[refState.selectedIndex];
    this.stateName = optSta.text;
    this.stateId = optSta.value;
    var refDomain = this.selectDomain.nativeElement;
    var optDoma = refDomain.options[refDomain.selectedIndex];
    this.domainName = optDoma.text;
    this.domainId = optDoma.value;
    var refRegulator = this.selectRegulator.nativeElement;
    var optRegt = refRegulator.options[refRegulator.selectedIndex];
    this.regulatorName = optRegt.text;
    this.regulatorId = optRegt.value;
    var refRegulation = this.selectRegulation.nativeElement;
    var optRegl = refRegulation.options[refRegulation.selectedIndex];
    this.regName = optRegl.text;
    this.regulationId = optRegl.value;
    var refRootDocument = this.selectRootDoc.nativeElement;
    var optRootD = refRootDocument.options[refRootDocument.selectedIndex];
    this.docName = optRootD.text;
    this.regDocId = optRootD.value;
    var refSubDocument = this.selectSubDoc.nativeElement;
    var optSubD = refSubDocument.options[refSubDocument.selectedIndex];
    this.subDocName = optSubD.text;
    this.subdocId = optSubD.value;
    this.path = '/' + this.geoName + '/' + this.countryName + '/' + this.domainName + '/' + this.regulatorName + '/' + this.regName + '/' + this.docName + '/' + this.subDocName;
    let file = fileInput.target.files[0];
    this.fileName = file.name;
    this.fileType = file.type;
    let fileSize = file.size;
    formData.append('fileType', this.fileType);
    formData.append('fileName', this.fileName);
    formData.append('path', this.path);
    formData.append('message', this.message);
    formData.append('geoName', this.geoName);
    formData.append('countryName', this.countryName);
    formData.append('stateName', this.stateName);
    formData.append('domainName', this.domainName);
    formData.append('regName', this.regName);
    formData.append('regulatorName', this.regulatorName);
    formData.append('docName', this.docName);
    formData.append('subDocName', this.subDocName);
    formData.append('regDocId', this.regDocId);
    formData.append('geoId', this.geoId);
    formData.append('subdocId', this.subdocId);
    formData.append('countryId', this.countryId);
    formData.append('stateId', this.stateId);
    formData.append('domainId', this.domainId);
    formData.append('reglatorId', this.regulatorId);
    formData.append('regulationId', this.regulationId);
    formData.append('level', this.level);
    formData.append('uploadFile', file, this.fileName);
    console.log("am in file change event Name", this.fileName, "File Type", this.fileType, "File size", fileSize, "file=>", file)
    //this.foo=this.rootDocVal[0].tobepublished;
    this.http.post<UploadI>("http://localhost:1337/uploadFile", formData).subscribe(result => {
      this.uploadResponse = result;
      console.log("success file upload", this.uploadResponse)
      this._router.navigate(['/docUplMgtList']);
    });
  }
  specialFileEvent(event) {
    const sformData: FormData = new FormData();
    let dateValue = this.datespecialupload.nativeElement.value;

    var refDocType = this.documenttype.nativeElement;
    var optDocT = refDocType.options[refDocType.selectedIndex];
    this.optDocTName = optDocT.text;
    this.optDocTId = optDocT.value;


    let doctypeDesc = this.docTypedescription.nativeElement.value;

    const subDocDefault = "10";
    const levelDefault = "1";
    console.log("Data value" + dateValue)
    let file = event.target.files[0];
    this.fileName = file.name;
    this.fileType = file.type;
    let fileSize = file.size;
    //this.spath = '/' + this.geoName + '/' + this.countryName + '/' + this.domainName + '/' + this.regulatorName + '/' + this.regName + '/' + this.docName + '/' + this.fileName;
    this.spath = '/' + this.geoName + '/' + this.countryName + '/' + this.stateName + '/' + this.domainName + '/' + this.regulatorName + '/' + this.regName + '/' + this.docName;
    console.log("myspecial path value", this.spath)
    sformData.append('fileType', this.fileType);
    sformData.append('fileName', this.fileName);
    sformData.append('path', this.spath);
    sformData.append('geoName', this.geoName);
    sformData.append('countryName', this.countryName);
    sformData.append('stateName', this.stateName);
    sformData.append('domainName', this.domainName);
    sformData.append('regName', this.regName);
    sformData.append('regulatorName', this.regulatorName);
    sformData.append('docName', this.docName);
    sformData.append('subDocName', this.subDocName);
    sformData.append('regDocId', this.regDocId);
    sformData.append('geoId', this.geoId);
    sformData.append('subdocId', this.subdocId);
    sformData.append('countryId', this.countryId);
    sformData.append('stateId', this.stateId);
    sformData.append('domainId', this.domainId);
    sformData.append('reglatorId', this.regulatorId);
    sformData.append('regulationId', this.regulationId);
    sformData.append('spclDocId', this.optDocTId);
    sformData.append('description', doctypeDesc);
    sformData.append('date', dateValue);
    sformData.append('level', levelDefault);
    sformData.append('uploadFile', file, this.fileName);
    console.log("check inside the sformData", sformData);
    this.http.post<SpecialUploadI>("http://localhost:1337/uploadSpecialFile", sformData).subscribe(result => {
      console.log("all values of upload response", result.description);
      var inSpPath = {
        document_type: this.optDocTName,
        description: result.description,
        date: result.date,
        file_name: result.file_name
      };
     this.testArray.push(inSpPath);               
     this.inPath=this.testArray;
      console.log("this inpath", this.inPath);   

      this.uploadSpecialResponse = result;
      this.specialDocumentListLoad();
      this.documentListLoad();
      this.findRegulationDataMethod();
      this.documentTypeLoad();
      console.log("success file upload", this.uploadSpecialResponse)
    });
  }
  /*--Delete Modal starts--*/
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmDelete(fid: string): void {
    this.documentService.deleteDocumentById(fid)
      .subscribe(geot => {
        this.specialDocumentListLoad();
        this.documentListLoad();
        this.findRegulationDataMethod();
        this.documentTypeLoad();
      });
    this._router.navigate(['/docUplMgtList']);
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  declineDelete(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
  /*--Delete Modal ends--*/
  /*--Publish Modal starts--*/
  openModalPublish(publishtemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(publishtemplate, { class: 'modal-sm' });
  }

  confirmPublish(f_id: string): void {

    let uploadDoc: UploadI = {
      fid: f_id,
      is_published: true,
      tobepublished: true
    }
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.patch('http://localhost:1337/document' + "/" + f_id, JSON.stringify(uploadDoc), { headers: headers }).subscribe(
      data => {
        this.specialDocumentListLoad();
        this.documentListLoad();
        this.findRegulationDataMethod();
        this.documentTypeLoad();
        console.log(data, "am got doc publish response");
      });
    this._router.navigate(['/docUplMgtList']);
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  declinePublish(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
  /*--Publish Modal ends--*/
  /*--Published Modal starts--*/
  openModalPublished(publishedtemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(publishedtemplate, { class: 'modal-sm' });
  }

  confirmPublished(fid: string): void {
    this.documentService.deleteDocumentById(fid)
      .subscribe(geot => {
        this.specialDocumentListLoad();
        this.documentListLoad();
        this.findRegulationDataMethod();
        this.documentTypeLoad();
      });
    this._router.navigate(['/docUplMgtList']);
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  declinePublished(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
  /*--Published Modal ends--*/
  //-----------------------------------------------------Cycle ----------------------------------------------------//
  /*--Delete Modal starts--*/
  openCycleModalDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmCycleDelete(fid: string): void {
    this.documentService.deleteCycleById(fid)
      .subscribe(geot => {
        this.specialDocumentListLoad();
        this.documentListLoad();
        this.findRegulationDataMethod();
        this.documentTypeLoad();
      });
    this._router.navigate(['/docUplMgtList']);
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  declineCycleDelete(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
  /*--Delete Modal ends--*/
  /*--Publish Modal starts--*/
  openModalCyclePublish(publishtemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(publishtemplate, { class: 'modal-sm' });
  }

  confirmCyclePublish(fid: any): void {
    let specialUploadDoc: SpecialUploadI = {
      spid: fid,
      is_published: true
    }
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.patch('http://localhost:1337/spdocument' + "/" + fid, JSON.stringify(specialUploadDoc), { headers: headers }).subscribe(
      data => {
        this.specialDocumentListLoad();
        this.documentListLoad();
        this.findRegulationDataMethod();
        this.documentTypeLoad();
        console.log(data, "am got doc publish response");
      });
    this._router.navigate(['/docUplMgtList']);
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  declineCyclePublish(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
  /*--Publish Modal ends--*/
  /*--Published Modal starts--*/
  openModalCyclePublished(publishedtemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(publishedtemplate, { class: 'modal-sm' });
  }

  confirmCyclePublished(fid: string): void {
    this.documentService.deleteDocumentById(fid)
      .subscribe(geot => {
        this.specialDocumentListLoad();
        this.documentListLoad();
        this.findRegulationDataMethod();
        this.documentTypeLoad();
      });
    this._router.navigate(['/docUplMgtList']);
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  declineCyclePublished(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
  /*--Published Modal ends--*/
  //-----------------------------------------------------Life Tracker ----------------------------------------------------//
  /*--Delete Modal starts--*/
  openModalTrackerDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmTrackerDelete(spid: string): void {
    this.documentService.deleteTrackerById(spid)
      .subscribe(geot => {
        this.specialDocumentListLoad();
        this.documentListLoad();
        this.findRegulationDataMethod();
        this.documentTypeLoad();
        this.specificLoad();
      });
    this._router.navigate(['/docUplMgtList']);
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  declineTrackerDelete(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
  /*--Delete Modal ends--*/
  /*--Publish Modal starts--*/
  openModalTrackerPublish(publishtemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(publishtemplate, { class: 'modal-sm' });
  }

  confirmTrackerPublish(fid: any): void {
    let specialUploadDocTracker: SpecialUploadI = {
      spid: fid,
      is_published: true
    }
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.patch('http://localhost:1337/spdocument' + "/" + fid, JSON.stringify(specialUploadDocTracker), { headers: headers }).subscribe(
      data => {
        this.specialDocumentListLoad();
        this.documentListLoad();
        this.findRegulationDataMethod();
        this.documentTypeLoad();
        this.specificLoad();
        console.log(data, "am got doc publish response");
      });
    this._router.navigate(['/docUplMgtList']);
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  declineTrackerPublish(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
  /*--Publish Modal ends--*/
  /*--Published Modal starts--*/
  openModalTrackerPublished(publishedtemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(publishedtemplate, { class: 'modal-sm' });
  }

  confirmTrackerPublished(fid: string): void {
    this.documentService.deleteDocumentById(fid)
      .subscribe(geot => {
        this.specialDocumentListLoad();
        this.documentListLoad();
        this.findRegulationDataMethod();
        this.documentTypeLoad();
      });
    this._router.navigate(['/docUplMgtList']);
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  declineTrackerPublished(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
  /*--Published Modal ends--*/
}                                     
