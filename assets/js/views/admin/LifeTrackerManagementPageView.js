var admin = admin || {};

admin.LifeTrackerManagementPageView =Backbone.View.extend({
	template: $('#lifeTrackerManagementPageTpl').html(),

	initialize: function(options) {
    console.log('APP_ROUTER-FILE_CONFIG2: ', JSON.stringify(appRouter.fileUploadConfig));
    appRouter.spParentPage = 'LifeTrackerManagementPageView';
    this.fileUploadConfig = {};
    this.sPDocCollection = new admin.SPDocCollection();
    var _self = this;
    var regId = appRouter.fileUploadConfig.regId,
        regulatorId =  appRouter.fileUploadConfig.regulatorId,
        domainId = appRouter.fileUploadConfig.domainId,
        geoId = appRouter.fileUploadConfig.geoId,
        countryId = appRouter.fileUploadConfig.countryId,
        stateId = appRouter.fileUploadConfig.stateId,
        regDocId = appRouter.fileUploadConfig.regDocId,
        subDocId = 10;
    $.when(
        this.sPDocCollection.fetch({reset: true, 
                                    data: { 
                                            geoId: geoId,
                                            countryId: countryId,
                                            stateId: stateId,
                                            domainId: domainId,
                                            regulatorId: regulatorId,
                                            regId: regId,
                                            regDocId: regDocId,
                                            subDocId: subDocId
                                          }, 
                                    processData: true}),
        $.ajax({
           type: "GET",
           url: "/documentType",
           success: function(data) {
             console.log(data);
             _self.documentType = data;
           },
           error: function(data) {
              try{
                    var errData = JSON.parse(data.responseText);
                    if ( errData.errCode == 550) {
                        window.location.href = '/sessionExpired';
                    } else {
                        if (errData.errMsg.length > 0) {
                          var failureMsg = errData.errMsg;  
                        } else {
                           var failureMsg = "Error while fetching data. Please Contact Administrator.";  
                        }
                        $( "div.failure").html(failureMsg);
                        $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
                  }
              }catch(e) {
                   window.location.href = '/sessionExpired';
                }
             }
        })
      ).done(function () {
         _self.render();         
         _self.docTypeCollectionView = new admin.DocumentTypeCollectionView({
             el: $( '#document_type' ),
             docTypeCollection: _self.documentType
         });
         console.log('SPECIAL DOC TYPE: ', _self.documentType);
         console.log('SPECIAL DOC: ', JSON.stringify(_self.sPDocCollection));
         _self.spDocumentTableView = new admin.SPDocumentTableView({
            el: $( '#doc-list-table' ), 
            collection: _self.sPDocCollection
           });                    
      });
        
	},

	render: function() {
    console.log(this.template);
		this.$el.html(this.template);
		console.log('Rendering lifeTrackerManagementPageView');
//		this.alertList = new app.AlertListView({el: $('#alertsList')});
    $('.dateDoc').datetimepicker();
    $('#uploadFileDoc').unbind('change');
		return this;
	},

  events : {
    'click #addLifeTracker' : 'addLifeTracker',
    'change #uploadFileDoc' : 'uploadFileDoc',
    'click #modalDocClose' : 'dataDismissModal',
   // 'change input[name=docTypedescription]' : 'docTypedescription',
   // 'change input[name=dateDoc]'  : 'dateDoc',
   //'click .dateDoc' : 'dateDoc',
  }, 

  addLifeTracker: function(){
    var _self = this;
    console.log("event triggers");
   
    //$('#trackerList').append(this.template);
    // var list = $('#trackerList').clone();

    // $('#addTracker').append(list);
    // $(list).find($('#docTypedescription').val(''));
     $.when(
       $.ajax({
           type: "GET",
           url: "/documentType",
           success: function(data) {
             console.log('DOC TYPE LIST: ' ,data);
             _self.documentType = data;
           },
           error: function(data) {
              try{
                    var errData = JSON.parse(data.responseText);
                    if ( errData.errCode == 550) {
                        window.location.href = '/sessionExpired';
                    } else {
                        if (errData.errMsg.length > 0) {
                          var failureMsg = errData.errMsg;  
                        } else {
                           var failureMsg = "Error while fetching data. Please Contact Administrator.";  
                        }
                        $( "div.failure").html(failureMsg);
                        $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
                  }
              }catch(e) {
                   window.location.href = '/sessionExpired';
                }
             }
          })
          ).done(function () {
            $('#trackerList').append($('#createLifeTrackerTpl').html());
            $('.dateDoc').datetimepicker();
           _self.docTypeCollectionView = new admin.DocumentTypeCollectionView({
               el: $( '.select_document_type' ),
               docTypeCollection: _self.documentType
           });
                    
      });
     
    
  },

  dataDismissModal : function(e){
    console.log("event triggers");
    $('#chooseFileidDoc').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  },
  dataModalOpen : function(e){
      $('#chooseFileidDoc').modal('show');
  },

  docTypedescription: function(e){
    
    console.log("event triggers");
    console.log($(e.target).val());
     this.description = $(e.target).val();
    console.log(this.description);
  },

  dateDoc: function(e){
    
    console.log("event triggers");
    console.log($(e.target).val());
    this.date = $(e.target).val();
    console.log(this.date);
  },

  uploadFileDoc: function(e) {
    e.preventDefault();
    console.log("event triggers");
    console.log('fileUploadConfig: ', appRouter.fileUploadConfig);
    //  $('#page-section').off('change', '#uploadFileDoc');
     
    // $('#uploadFileDoc').unbind('change');   
      // var regId = appRouter.currentView.fileUploadConfig.regId;
      // var regulatorId = appRouter.currentView.fileUploadConfig.regulatorId;
      // var domainId = appRouter.currentView.fileUploadConfig.domainId;
      // var geoId    = appRouter.currentView.fileUploadConfig.geoId;
      // var countryId    = appRouter.currentView.fileUploadConfig.countryId;
      // var stateId    = appRouter.currentView.fileUploadConfig.stateID;
      // var regDocId = appRouter.fileUploadConfig.regDocId;
      // var spclDocId =   appRouter.currentView.fileUploadConfig.spclDocId;
      // var sub_DocId = appRouter.fileUploadConfig.sub_DocId;
      // var geoName = appRouter.currentView.fileUploadConfig.geoName;
      // var countryName = appRouter.currentView.fileUploadConfig.countryName;
      // var stateName = appRouter.currentView.fileUploadConfig.stateName;
      // domainName = appRouter.currentView.fileUploadConfig.domainName;
      // regulatorName = appRouter.currentView.fileUploadConfig.regulatorName;
      // regName = appRouter.currentView.fileUploadConfig.regName;
      // var docName = appRouter.fileUploadConfig.docName;  
      // var  subDocName = appRouter.fileUploadConfig.subDocName; 
      var regId = appRouter.fileUploadConfig.regId;
      var regulatorId = appRouter.fileUploadConfig.regulatorId;
      var domainId = appRouter.fileUploadConfig.domainId;
      var geoId    = appRouter.fileUploadConfig.geoId;
      var countryId    = appRouter.fileUploadConfig.countryId;
      var stateId    = appRouter.fileUploadConfig.stateId;
      var regDocId = appRouter.fileUploadConfig.regDocId;
      // var spclDocId =   appRouter.fileUploadConfig.spclDocId;
      var sub_DocId = appRouter.fileUploadConfig.sub_DocId;
      var geoName = appRouter.fileUploadConfig.geoName;
      var countryName = appRouter.fileUploadConfig.countryName;
      var stateName = appRouter.fileUploadConfig.stateName;
      var domainName = appRouter.fileUploadConfig.domainName;
      var regulatorName = appRouter.fileUploadConfig.regulatorName;
      var regName = appRouter.fileUploadConfig.regName;
      var docName = appRouter.fileUploadConfig.docName;  
      var subDocName = appRouter.fileUploadConfig.subDocName;
      var spclDocId   = $('#document_type').val();
      var description = $('#docTypedescription').val();
      var date        = $('#dateDoc').val();
      console.log(regId,regulatorId,domainId,geoId,countryId,stateId,regDocId,spclDocId,sub_DocId);
      console.log(countryName,stateName,domainName,regulatorName,regName,docName,subDocName); 
      console.log(description);
      console.log(date);      
      var fileName = e.target.files[0].name;        
      $('.lifeTrackerfileName').val(fileName);
      console.log("fileName", fileName);
      var fileNameArray = fileName.split('.');
      var type = fileNameArray[fileNameArray.length-1];        
      console.log('file-type', type);      
	  
	  if((type == "pdf" || type == "xlsx" || type == "xls" )){
      if ((countryName == "" || countryName == undefined || countryName == "-") &&(subDocName == "" || subDocName == undefined || subDocName == "-")) {
      
          var path = '/' + geoName +               
                 '/' + stateName +
                 '/' + domainName +
                 '/' + regulatorName +
                 '/' + regName +
                 '/' + docName;                                

          console.log("path",path);     
          var formData = new FormData();
          console.log("type",type); 
           console.log("geoName",geoName);      
          formData.append('fileType', type);
          formData.append('fileName', e.target.files[0].name);
          formData.append('path', path);
          formData.append('geoName', geoName);
          formData.append('countryName',"null");
          formData.append('stateName',stateName);
          formData.append('domainName',domainName);
          formData.append('regName',regName);
          formData.append('regulatorName',regulatorName);
          formData.append('docName',docName);   
          formData.append('subDocName', "null");       
          formData.append('regDocId', regDocId);
          formData.append('geoId', geoId);  
          formData.append('subdocId', 10);       
          formData.append('countryId', 23);
          formData.append('stateId', stateId);
          formData.append('domainId', domainId);
          formData.append('reglatorId', regulatorId);
          formData.append('regulationId', regId);
          formData.append('spclDocId', spclDocId);
          formData.append('description',description);
          formData.append('date',date);
          formData.append('level',1);
          formData.append('uploadFile', e.target.files[0], e.target.files[0].name);
          console.log("check inside the formdata", formData);
 
      } 
      else if ((countryName == "" || countryName == undefined || countryName == "-")) {
      
          var path = '/' + geoName +               
                 '/' + stateName +
                 '/' + domainName +
                 '/' + regulatorName +
                 '/' + regName +
                 '/' + docName +  
                 '/' + subDocName;                                 

          console.log("path",path);     
          var formData = new FormData();
          console.log("type",type); 
           console.log("geoName",geoName);      
          formData.append('fileType', type);
          formData.append('fileName', e.target.files[0].name);
          formData.append('path', path);
          formData.append('geoName', geoName);
          formData.append('countryName',"null");
          formData.append('stateName',stateName);
          formData.append('domainName',domainName);
          formData.append('regName',regName);
          formData.append('regulatorName',regulatorName);
          formData.append('docName',docName);   
          formData.append('subDocName', subDocName);       
          formData.append('regDocId', regDocId);
          formData.append('geoId', geoId);  
          formData.append('subdocId', sub_DocId);       
          formData.append('countryId', 23);
          formData.append('stateId', stateId);
          formData.append('domainId', domainId);
          formData.append('reglatorId', regulatorId);
          formData.append('regulationId', regId);
          formData.append('spclDocId', spclDocId);
          formData.append('description',description);
          formData.append('date',date);
          formData.append('level',1);
          formData.append('uploadFile', e.target.files[0], e.target.files[0].name);
          console.log("check inside the formdata", formData);
 
      } 

      else if ((stateName == "" || stateName == undefined || stateName == "-")  &&(subDocName == "" || subDocName == undefined || subDocName == "-")){
          var path = '/' + geoName +               
                 '/' + countryName +
                 '/' + domainName +
                 '/' + regulatorName +
                 '/' + regName +
                 '/' + docName;                                     

          console.log("path",path);     
          var formData = new FormData();
          console.log("type",type); 
           console.log("geoName",geoName);      
          formData.append('fileType', type);
          formData.append('fileName', e.target.files[0].name);
          formData.append('path', path);
          formData.append('geoName', geoName);
          formData.append('countryName',countryName);
          formData.append('stateName',"null");
          formData.append('domainName',domainName);
          formData.append('regName',regName);
          formData.append('regulatorName',regulatorName);
          formData.append('docName',docName);   
          formData.append('subDocName', "null");       
          formData.append('regDocId', regDocId);
          formData.append('geoId', geoId);  
          formData.append('subdocId', 10);       
          formData.append('countryId', countryId);
          formData.append('stateId', 18);
          formData.append('domainId', domainId);
          formData.append('reglatorId', regulatorId);
          formData.append('regulationId', regId);
          formData.append('spclDocId', spclDocId);
          formData.append('description',description);
          formData.append('date',date);
          formData.append('level',1);
          formData.append('uploadFile', e.target.files[0], e.target.files[0].name);
          console.log("check inside the formdata", formData);
      }
      else if ((stateName == "" || stateName == undefined || stateName == "-")){
          var path = '/' + geoName +               
                 '/' + countryName +
                 '/' + domainName +
                 '/' + regulatorName +
                 '/' + regName +
                 '/' + docName + 
                  '/' + subDocName;                                   

          console.log("path",path);     
          var formData = new FormData();
          console.log("type",type); 
           console.log("geoName",geoName);      
          formData.append('fileType', type);
          formData.append('fileName', e.target.files[0].name);
          formData.append('path', path);
          formData.append('geoName', geoName);
          formData.append('countryName',countryName);
          formData.append('stateName',"null");
          formData.append('domainName',domainName);
          formData.append('regName',regName);
          formData.append('regulatorName',regulatorName);
          formData.append('docName',docName);   
          formData.append('subDocName', subDocName);       
          formData.append('regDocId', regDocId);
          formData.append('geoId', geoId);  
          formData.append('subdocId', sub_DocId);       
          formData.append('countryId', countryId);
          formData.append('stateId', 18);
          formData.append('domainId', domainId);
          formData.append('reglatorId', regulatorId);
          formData.append('regulationId', regId);
          formData.append('spclDocId', spclDocId);
          formData.append('description',description);
          formData.append('date',date);
          formData.append('level',1);
          formData.append('uploadFile', e.target.files[0], e.target.files[0].name);
          console.log("check inside the formdata", formData);
      } 
      else if( (subDocName == "" || subDocName == undefined || subDocName == "-")){
          var path = '/' + geoName +               
                 '/' + countryName +
                 '/' + stateName +
                 '/' + domainName +
                 '/' + regulatorName +
                 '/' + regName +
                 '/' + docName;                                  
          console.log(countryName,stateName,domainName,regulatorName,regName,docName,subDocName);     

          console.log("path",path);     
          var formData = new FormData();
          console.log("type",type); 
           console.log("geoName",geoName);      
          formData.append('fileType', type);
          formData.append('fileName', e.target.files[0].name);
          formData.append('path', path);
          formData.append('geoName', geoName);
          formData.append('countryName',countryName);
          formData.append('stateName',stateName);
          formData.append('domainName',domainName);
          formData.append('regName',regName);
          formData.append('regulatorName',regulatorName);
          formData.append('docName',docName);   
          formData.append('subDocName', "null");       
          formData.append('regDocId', regDocId);
          formData.append('geoId', geoId);  
          formData.append('subdocId', 10);       
          formData.append('countryId', countryId);
          formData.append('stateId', stateId);
          formData.append('domainId', domainId);
          formData.append('reglatorId', regulatorId);
          formData.append('regulationId', regId);
          formData.append('spclDocId', spclDocId);
          formData.append('description',description);
          formData.append('date',date);
          formData.append('level',1);
          formData.append('uploadFile', e.target.files[0], e.target.files[0].name);
          console.log("check inside the formdata", formData);
      } 

      else if ((countryName != "" || countryName != undefined || countryName != "-") && (stateName != "" || stateName != undefined || stateName != "-")  &&(subDocName != "" || subDocName != undefined || subDocName != "-")) {
            var path = '/' + geoName +               
                 '/' + countryName +
                 '/' + stateName +
                 '/' + domainName +
                 '/' + regulatorName +
                 '/' + regName +
                 '/' + docName +   
                  '/' + subDocName;                                   

          console.log("path",path);     
          var formData = new FormData();
          console.log("type",type); 
           console.log("geoName",geoName);      
          formData.append('fileType', type);
          formData.append('fileName', e.target.files[0].name);
          formData.append('path', path);       
          formData.append('geoName', geoName);
          formData.append('countryName',countryName);
          formData.append('stateName',stateName);
          formData.append('domainName',domainName);
          formData.append('regName',regName);
          formData.append('regulatorName',regulatorName);
          formData.append('docName',docName);   
          formData.append('subDocName', subDocName);       
          formData.append('regDocId', regDocId);
          formData.append('geoId', geoId);  
          formData.append('subdocId', sub_DocId);       
          formData.append('countryId', countryId);
          formData.append('stateId', stateId);
          formData.append('domainId', domainId);
          formData.append('reglatorId', regulatorId);
          formData.append('regulationId', regId);
          formData.append('spclDocId', spclDocId);
          formData.append('description',description);
          formData.append('date',date);
          formData.append('level',1);
          formData.append('uploadFile', e.target.files[0], e.target.files[0].name);
          console.log("check inside the formdata", formData);
      }
		   console.log("formData",formData);
          $( "div.success").html("<center>File Upload is in progress...</center>");
          $( "div.success" ).fadeIn(300).delay(3500).fadeOut(400);

          var _self = this;

          $.ajax({
              type: "POST",
              url: "/uploadSpecialFile",   
              data: formData,
              cache: false,
              contentType: false,
              processData: false,      
              success: function(data1) {
                console.log('SP DOC: ', data1);
                $('#file_error_doc').empty();
                  _self.documentType.forEach(function(item) {
                    if (item.id == data1.document_type) {
                      data1.document_type = item.document_type; 
                      data1.document_type_id = item.id;
                    }
                  });
                  console.log('SP DOC FINAL: ', data1);
                  _self.sPDocCollection.add(data1); 
                  $( "div.success" ).html("File Uploaded Successfully.");
                  $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );             
                },
              error: function(data) {
                  try{
                      var errData = JSON.parse(data.responseText);
                      if ( errData.errCode == 550) {
                          window.location.href = '/sessionExpired';
                      } else {
                          if (errData.errMsg.length > 0) {
                            var failureMsg = errData.errMsg;  
                          } else {
                            var failureMsg = "Error while uploading File. Please Contact Administrator.";  
                          }
                          $( "div.failure").html(failureMsg);
                          $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
                        }
                  } catch(e) {
                      window.location.href = '/sessionExpired';
                   }
              }                 
          });   
		  
	  }
	  else {
		   $( "div.failure" ).html("Please upload correct file type. expected xlsx xls pdf");
           $( "div.failure" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
          //this.dataModalOpen();            
      }

         



  }


});
