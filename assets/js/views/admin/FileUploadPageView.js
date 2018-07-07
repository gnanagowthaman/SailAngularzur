var admin = admin || {};

admin.FileUploadPageView = Backbone.View.extend({
    template: $( '#regManagePageTpl' ).html(),

  initialize: function() {
    this.fileUploadConfig = {};
    var _self = this;
      $.ajax({
          type: "GET",
          url: "/findRegulationData",      
          success: function(data) {
            console.log(data);
            _self.regulationData = data;
            _self.render();
            _self.geoCollectionView = new admin.GeoCollectionView({ 
                el: $( '#selectGeo' ),
                geoCollection: _self.regulationData.geoCollection
            });   
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
                      var failureMsg = "Error while deleting the Document. Please Contact Administrator.";  
                    }
                    $( "div.failure").html(failureMsg);
                    $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
               }
           } catch(e) {
              window.location.href = '/sessionExpired';
             }
          }
      });  

  },

  events: {
    'change #uploadFile' : 'uploadFile',
    'click #modalClose' : 'dataDismissModal',
    'change #selectGeo' : 'isSelectedGeo',
    'change #selectCountry' : 'isSelectedCountry',
     'change #selectState' : 'isSelectedState',
     'change #selectDomain' : 'isSelectedDomain',
     'change #selectRegulator' : 'isSelectedRegulator',
     'change #selectReg' : 'isSelectedRegulation',
      'change #selectRootDoc' : 'isSelectedDoc'    
  },

  render: function() {      
    this.$el.html(this.template);
    console.log('Rendering FileUploadPageView');
    return this;
  },
  dataDismissModal : function(e){
    console.log("event triggers");
    $('#chooseFileid').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  },
  dataModalOpen : function(e){
      $('#chooseFileid').modal('show');
  },

  findLastSelectedSubDoc: function(currentEl) {
      var subDocId   = currentEl.prev().find("option:selected").val();
      var subDocName = currentEl.prev().find("option:selected").text();
      if (subDocId == "" || subDocName == undefined) {
        this.findLastSelectedSubDoc(currentEl.prev());
      } else {
        // if (currentEl.prev().find('#selectSubDoc')) {
        //   this.fileUploadConfig.subDocName = "";
        // } else {
          this.fileUploadConfig.subDocId = parseInt(subDocId, 10);;
          this.fileUploadConfig.subDocName = subDocName;  
        // }
      }
  },

  uploadFile: function (e) {
      e.preventDefault();
      var fileName = e.target.files[0].name; 
      this.findLastSelectedSubDoc($('#upload-span'));
      console.log('FILECONFIG: ', this.fileUploadConfig);  
      // this.fileUploadConfig.subDocId = $('#upload-span').prev().find("option:selected").val();
      // this.fileUploadConfig.subDocName = $('#upload-span').prev().find("option:selected").text();     
      $('#fileName').val(fileName);


      console.log("fileName");console.log(fileName);

      //................message.............//        
      var  message = $('#message_name').val().trim();       
      if (message== '') {
        var message=  this.fileUploadConfig.geoName + " >> " + this.fileUploadConfig.countryName + " >> "+this.fileUploadConfig.stateName + " >> " + this.fileUploadConfig.domainName + " >> " +this.fileUploadConfig.regulatorName + " >> "+ this.fileUploadConfig.regName + " >> " + this.fileUploadConfig.docName + " >> " + this.fileUploadConfig.subDocName;
      }     
      var fileNameArray = fileName.split('.');
      var type = fileNameArray[fileNameArray.length-1];        
      console.log(fileName); console.log(type);
      var subDocName = $("#selectSubDoc option:selected").val();
      console.log("subDocName :::: ",subDocName);
      var stateName = $("#selectState option:selected").val();
      console.log("stateName :::", stateName);
      var countryName = $('#selectCountry option:selected').val();
      console.log("countryName ::" , countryName);
      
      if((type == "pdf" || type == "xlsx" || type == "xls" )){
     if ((stateName == "" || stateName == undefined )  &&(subDocName == "" || subDocName == undefined )){
      
          var path = '/' + this.fileUploadConfig.geoName +               
                 '/' + this.fileUploadConfig.countryName +
                 '/' + this.fileUploadConfig.domainName +
                 '/' + this.fileUploadConfig.regulatorName +
                 '/' + this.fileUploadConfig.regName +
                 '/' + this.fileUploadConfig.docName;
          console.log("path",path);     
          var formData = new FormData();
          formData.append('fileType', type);
          formData.append('fileName', e.target.files[0].name);
          formData.append('path', path);
          formData.append('message',message);
          formData.append('geoName',this.fileUploadConfig.geoName);
          formData.append('countryName',this.fileUploadConfig.countryName);
          formData.append('stateName',"null");
          formData.append('domainName',this.fileUploadConfig.domainName);
          formData.append('regName',this.fileUploadConfig.regName);
          formData.append('regulatorName',this.fileUploadConfig.regulatorName);
          formData.append('docName',this.fileUploadConfig.docName);   
          formData.append('subDocName', null);       
          formData.append('regDocId', this.fileUploadConfig.regDocId);
          formData.append('geoId', this.fileUploadConfig.geoId);  
          formData.append('subdocId', 10);       
          formData.append('countryId', this.fileUploadConfig.countryId);
          formData.append('stateId', 18);
          formData.append('domainId', this.fileUploadConfig.domainId);
          formData.append('reglatorId', this.fileUploadConfig.regulatorId);
          formData.append('regulationId', this.fileUploadConfig.regId);
          formData.append('level', this.fileUploadConfig.level);
          formData.append('uploadFile', e.target.files[0], e.target.files[0].name);

 
      }
       else if ((countryName == "" || countryName == undefined ) &&(subDocName == "" || subDocName == undefined )) {
           var path = '/' + this.fileUploadConfig.geoName +               
                 '/' + this.fileUploadConfig.stateName +
                 '/' + this.fileUploadConfig.domainName +
                 '/' + this.fileUploadConfig.regulatorName +
                 '/' + this.fileUploadConfig.regName +
                 '/' + this.fileUploadConfig.docName;              
          console.log("path",path);     
          var formData = new FormData();
          formData.append('fileType', type);
          formData.append('fileName', e.target.files[0].name);
          formData.append('path', path);
          formData.append('message',message);
          formData.append('geoName',this.fileUploadConfig.geoName);
          formData.append('countryName',"null");
          formData.append('stateName',this.fileUploadConfig.stateName);
          formData.append('domainName',this.fileUploadConfig.domainName);
          formData.append('regName',this.fileUploadConfig.regName);
          formData.append('regulatorName',this.fileUploadConfig.regulatorName);
          formData.append('docName',this.fileUploadConfig.docName);  
          formData.append('subDocName',"null");       
          formData.append('regDocId', this.fileUploadConfig.regDocId);
          formData.append('geoId', this.fileUploadConfig.geoId);
          formData.append('subdocId', 10);
          formData.append('countryId', 23);
          formData.append('stateId', this.fileUploadConfig.stateID);
          formData.append('domainId', this.fileUploadConfig.domainId);
          formData.append('reglatorId', this.fileUploadConfig.regulatorId);
          formData.append('regulationId', this.fileUploadConfig.regId);
          formData.append('level', this.fileUploadConfig.level);
          formData.append('uploadFile', e.target.files[0], e.target.files[0].name);
          
      }
      else if ((countryName == "" || countryName == undefined )) {
           var path = '/' + this.fileUploadConfig.geoName +               
                 '/' + this.fileUploadConfig.stateName +
                 '/' + this.fileUploadConfig.domainName +
                 '/' + this.fileUploadConfig.regulatorName +
                 '/' + this.fileUploadConfig.regName +
                 '/' + this.fileUploadConfig.docName +  
                 '/' + this.fileUploadConfig.subDocName;
          console.log("path",path);     
          var formData = new FormData();
          formData.append('fileType', type);
          formData.append('fileName', e.target.files[0].name);
          formData.append('path', path);
          formData.append('message',message);
          formData.append('geoName',this.fileUploadConfig.geoName);
          formData.append('countryName',"null");
          formData.append('stateName',this.fileUploadConfig.stateName);
          formData.append('domainName',this.fileUploadConfig.domainName);
          formData.append('regName',this.fileUploadConfig.regName);
          formData.append('regulatorName',this.fileUploadConfig.regulatorName);
          formData.append('docName',this.fileUploadConfig.docName);  
          formData.append('subDocName',this.fileUploadConfig.subDocName);       
          formData.append('regDocId', this.fileUploadConfig.regDocId);
          formData.append('geoId', this.fileUploadConfig.geoId);
          formData.append('subdocId', this.fileUploadConfig.subDocId);
          formData.append('countryId', 23);
          formData.append('stateId', this.fileUploadConfig.stateID);
          formData.append('domainId', this.fileUploadConfig.domainId);
          formData.append('reglatorId', this.fileUploadConfig.regulatorId);
          formData.append('regulationId', this.fileUploadConfig.regId);
          formData.append('level', this.fileUploadConfig.level);
          formData.append('uploadFile', e.target.files[0], e.target.files[0].name);
          
      }
      else if ((stateName == "" || stateName == undefined )){
           var path = '/' + this.fileUploadConfig.geoName +               
                 '/' + this.fileUploadConfig.countryName +
                 '/' + this.fileUploadConfig.domainName +
                 '/' + this.fileUploadConfig.regulatorName +
                 '/' + this.fileUploadConfig.regName +
                 '/' + this.fileUploadConfig.docName +  
                 '/' + this.fileUploadConfig.subDocName;                 
          console.log("path",path);     
          var formData = new FormData();
          formData.append('fileType', type);
          formData.append('fileName', e.target.files[0].name);
          formData.append('path', path);
          formData.append('message',message);
          formData.append('geoName',this.fileUploadConfig.geoName);
          formData.append('countryName',this.fileUploadConfig.countryName);
          formData.append('stateName',"null");
          formData.append('domainName',this.fileUploadConfig.domainName);
          formData.append('regName',this.fileUploadConfig.regName);
          formData.append('regulatorName',this.fileUploadConfig.regulatorName);
          formData.append('docName',this.fileUploadConfig.docName);  
          formData.append('subDocName',this.fileUploadConfig.subDocName);       
          formData.append('regDocId', this.fileUploadConfig.regDocId);
          formData.append('geoId', this.fileUploadConfig.geoId);
          formData.append('subdocId', this.fileUploadConfig.subDocId);
          formData.append('countryId', this.fileUploadConfig.countryId);
          formData.append('stateId', 18);
          formData.append('domainId', this.fileUploadConfig.domainId);
          formData.append('reglatorId', this.fileUploadConfig.regulatorId);
          formData.append('regulationId', this.fileUploadConfig.regId);
          formData.append('level', this.fileUploadConfig.level);
          formData.append('uploadFile', e.target.files[0], e.target.files[0].name);
          
      }
      else if( (subDocName == "" || subDocName == undefined)){
           var path = '/' + this.fileUploadConfig.geoName +               
                 '/' + this.fileUploadConfig.countryName +
                 '/' + this.fileUploadConfig.stateName +
                 '/' + this.fileUploadConfig.domainName +
                 '/' + this.fileUploadConfig.regulatorName +
                 '/' + this.fileUploadConfig.regName +
                 '/' + this.fileUploadConfig.docName;                
          console.log("path",path);     
          var formData = new FormData();
          formData.append('fileType', type);
          formData.append('fileName', e.target.files[0].name);
          formData.append('path', path);
          formData.append('message',message);
          formData.append('geoName',this.fileUploadConfig.geoName);
          formData.append('countryName',this.fileUploadConfig.countryName);
          formData.append('stateName',this.fileUploadConfig.stateName);
          formData.append('domainName',this.fileUploadConfig.domainName);
          formData.append('regName',this.fileUploadConfig.regName);
          formData.append('regulatorName',this.fileUploadConfig.regulatorName);
          formData.append('docName',this.fileUploadConfig.docName);  
          formData.append('subDocName',"null");       
          formData.append('regDocId', this.fileUploadConfig.regDocId);
          formData.append('geoId', this.fileUploadConfig.geoId);
          formData.append('subdocId', 10);
          formData.append('countryId', this.fileUploadConfig.countryId);
          formData.append('stateId', this.fileUploadConfig.stateID);
          formData.append('domainId', this.fileUploadConfig.domainId);
          formData.append('reglatorId', this.fileUploadConfig.regulatorId);
          formData.append('regulationId', this.fileUploadConfig.regId);
          formData.append('level', this.fileUploadConfig.level);
          formData.append('uploadFile', e.target.files[0], e.target.files[0].name);
          
      }
      else if ((countryName != "" || countryName != undefined ) && (stateName != "" || stateName != undefined )  &&(subDocName != "" || subDocName != undefined )) {
        var path = '/' + this.fileUploadConfig.geoName +               
                 '/' + this.fileUploadConfig.countryName +
                 '/' + this.fileUploadConfig.stateName +
                 '/' + this.fileUploadConfig.domainName +
                 '/' + this.fileUploadConfig.regulatorName +
                 '/' + this.fileUploadConfig.regName +
                 '/' + this.fileUploadConfig.docName +  
                 '/' + this.fileUploadConfig.subDocName;                
          console.log("path",path);     
          var formData = new FormData();
          formData.append('fileType', type);
          formData.append('fileName', e.target.files[0].name);
          formData.append('path', path);
          formData.append('message',message);
          formData.append('geoName',this.fileUploadConfig.geoName);
          formData.append('countryName',this.fileUploadConfig.countryName);
          formData.append('stateName',this.fileUploadConfig.stateName);
          formData.append('domainName',this.fileUploadConfig.domainName);
          formData.append('regName',this.fileUploadConfig.regName);
          formData.append('regulatorName',this.fileUploadConfig.regulatorName);
          formData.append('docName',this.fileUploadConfig.docName);  
          formData.append('subDocName',this.fileUploadConfig.subDocName);       
          formData.append('regDocId', this.fileUploadConfig.regDocId);
          formData.append('geoId', this.fileUploadConfig.geoId);
          formData.append('subdocId', this.fileUploadConfig.subDocId);
          formData.append('countryId', this.fileUploadConfig.countryId);
          formData.append('stateId', this.fileUploadConfig.stateID);
          formData.append('domainId', this.fileUploadConfig.domainId);
          formData.append('reglatorId', this.fileUploadConfig.regulatorId);
          formData.append('regulationId', this.fileUploadConfig.regId);
          formData.append('level', this.fileUploadConfig.level);
          
          formData.append('uploadFile', e.target.files[0], e.target.files[0].name);
          
      }
          console.log("formData",formData);
          $( "div.success").html("<center>File Upload is in progress...</center>");
          $( "div.success" ).fadeIn(300).delay(3500).fadeOut(400);


          $.ajax({
              type: "POST",
              url: "/uploadFile",
              data: formData,
              cache: false,
              contentType: false,
              processData: false,      
              success: function(data1) {
                console.log(data1);
                $('#file_error').empty();
                appRouter.navigate("manageDocuments", {trigger: true}); 
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
      else{
           $( "div.failure" ).html("Please upload correct file type. expected xlsx xls pdf");
           $( "div.failure" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
         // this.dataModalOpen();       
      }
          
  },

  isSelectedGeo: function(e) {
        e.preventDefault();
        console.log('country Triggered');
        var geoId =  parseInt($('#selectGeo').val(), 10);
        //var domainId = parseInt($(this.el).val(), 10);
        //var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var countryArray = appRouter.currentView.regulationData.countryCollection;
        console.log(countryArray);

        if (countryArray.length > 0) {
            var countryCollection = new admin.CountryCollection(countryArray);
            //console.log('countryCollection');console.log(countryCollection);
            var filter = {geography_id: geoId}; console.log(filter);
            var countryCollectionBygeo = new admin.CountryCollection(countryCollection.where(filter)); 
            console.log('GEOCollectionBycountry');console.log(countryCollectionBygeo);
                        
            //Louis - Modified below to avoid memory leak
            if (this.countryCollectionView) 
            {
                this.countryCollectionView.$el.empty();
                //this.countryCollectionView.$el.unbind();
                 this.countryCollectionView.collection =countryCollectionBygeo;
                 this.countryCollectionView.render();
            }      
            else
            {                 
                this.countryCollectionView = new admin.FileUploadCountryCollectionView({
                      el: $( '#selectCountry' ),
                      collection: countryCollectionBygeo
                });
            }

             $(this.countryCollectionView.el).attr('disabled', false);
             this.countryCollectionView.disabledElement();

            //set selected domain name
            console.log('GeographyName: ' + $("#selectGeo option:selected").text());
            appRouter.currentView.fileUploadConfig.geoName = $("#selectGeo option:selected").text();
            appRouter.currentView.fileUploadConfig.geoId = geoId;

            appRouter.geoName = $("#selectGeo option:selected").text();
            console.log(appRouter.geoName);
        } 
         console.log('Country Triggered'); 
        var countryId = parseInt($(this.el).val(), 10);

        var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var stateArray = appRouter.currentView.regulationData.stateCollection;
        console.log("stateArray",stateArray);

        if (stateArray.length > 0) {
           $('#selectState').show();
            var stateCollection = new admin.StateCollection(stateArray);
            console.log('stateCollection');console.log(JSON.stringify(stateCollection));
           var filter = {country_id: 23,geography_id: geoId}; console.log(filter);
           var stateCollectionBycountry = new admin.StateCollection(stateCollection.where(filter));
            appRouter.currentView.fileUploadConfig.countryId = 23;
           if( stateCollectionBycountry.length <= 0 )      
                  stateCollectionBycountry = new admin.StateCollection(stateCollection.where({state_id:1}));    
                
           console.log('stateCollectionBycountry');console.log(stateCollectionBycountry);
                        
            if (this.stateCollectionView) 
            {
                this.stateCollectionView.$el.empty();
               // this.stateCollectionView.$el.unbind();
               this.stateCollectionView.collection = stateCollectionBycountry;
               this.stateCollectionView.render();
            } 
            else
            {                      
              this.stateCollectionView = new admin.FileUploadStateCollectionView({
                    el: $( '#selectState' ),
                    collection: stateCollectionBycountry
              });
            }
            $(this.stateCollectionView.el).attr('disabled', false);
            this.stateCollectionView.disabledElement();
            //set selected domain name
            console.log('CountryName: ' + $("#selectCountry option:selected").text());
            appRouter.currentView.fileUploadConfig.countryName = "-";

            appRouter.countryName = "-";
           
        }        
    } ,

    isSelectedCountry: function(e) {
        e.preventDefault();
        console.log('Country Triggered'); 
        var countryId = parseInt($('#selectCountry').val(), 10);

        var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var stateArray = appRouter.currentView.regulationData.stateCollection;
        console.log("stateArray",stateArray);
        console.log(appRouter.geoName);

        if (stateArray.length > 0) {
            var stateCollection = new admin.StateCollection(stateArray);
            console.log('stateCollection');console.log(JSON.stringify(stateCollection));
           var filter = {country_id: countryId}; console.log(filter);
           var stateCollectionBycountry = new admin.StateCollection(stateCollection.where(filter)); 

            if(stateCollectionBycountry.length==0){      
                console.log("geography and country",geoId,countryId);
                var countryname = $("#selectCountry option:selected").text();
                console.log("countryname",countryname);
                var domainArray = appRouter.currentView.regulationData.domainCollection;
                console.log("domainArray",JSON.stringify(domainArray));
                if (domainArray.length > 0) {
                    var domainCollection = new admin.DomainCollection(domainArray);
                   var filter = {gid : geoId, cntid : countryId, sid : 18 }; 
                   console.log(JSON.stringify(filter));
                   var domainCollectionByDomain = new admin.DomainCollection(domainCollection.where(filter));         
                   console.log('domainCollectionByDomain');
                   console.log(JSON.stringify(domainCollectionByDomain)); 
                   
                     if (this.domainCollectionView) 
                    {
                        this.domainCollectionView.$el.empty();
                        //this.domainCollectionView.$el.unbind();
                        this.domainCollectionView.collection = domainCollectionByDomain;
                        this.domainCollectionView.render();
                    }  
                    else
                    {                 
                    this.domainCollectionView = new admin.DomainCollectionView({
                            el: $( '#selectDomain' ),
                          collection: domainCollectionByDomain
                      });
                    }
                   console.log("Setting value for collection");
                   //  this.domainCollectionView.setCallFrom(true);
                    this.domainCollectionView.collection= domainCollectionByDomain;
                    $(this.domainCollectionView.el).attr('disabled', false);
                    this.domainCollectionView.render();
                    this.domainCollectionView.disabledElement();
                }
                  $(this.domainCollectionView.el).attr('disabled', false);
                  $( '#selectDomain' ).attr('disabled', false);
                 appRouter.currentView.fileUploadConfig.stateID = 18;
                  // appRouter.currentView.fileUploadConfig.stateName = $("#selectState option:selected").text();
                  appRouter.currentView.fileUploadConfig.countryName = countryname;
                 appRouter.currentView.fileUploadConfig.countryId = countryId;
               appRouter.countryName = countryname;

            }
           if( stateCollectionBycountry.length <= 0 )      
                  stateCollectionBycountry = new admin.StateCollection(stateCollection.where({state_id:1}));    
                
           console.log('stateCollectionBycountry');console.log(stateCollectionBycountry);
                        
            if (this.stateCollectionView) 
            {
                this.stateCollectionView.$el.empty();
               // this.stateCollectionView.$el.unbind();
               this.stateCollectionView.collection = stateCollectionBycountry;
               this.stateCollectionView.render();
            } 
            else
            {                      
              this.stateCollectionView = new admin.FileUploadStateCollectionView({
                    el: $( '#selectState' ),
                    collection: stateCollectionBycountry
              });
            }
            $(this.stateCollectionView.el).attr('disabled', false);
            this.stateCollectionView.disabledElement();
            //set selected domain name
            console.log('CountryName: ' + $("#selectCountry option:selected").text());
            appRouter.currentView.fileUploadConfig.countryName = $("#selectCountry option:selected").text();
            appRouter.currentView.fileUploadConfig.countryId = countryId;

            appRouter.countryName = $("#selectCountry option:selected").text();
            console.log(appRouter.countryName);
        }        
    },

    isSelectedState: function(e) {
        e.preventDefault();
        console.log('Geo Triggered'); 
        var stateID = parseInt($('#selectState').val(), 10);
        var geoId = appRouter.currentView.fileUploadConfig.geoId;
        var countryId = appRouter.currentView.fileUploadConfig.countryId;
        var domainArray = appRouter.currentView.regulationData.domainCollection;
        if (domainArray.length > 0) {
          var domainCollection = new admin.DomainCollection(domainArray);
          
        var countryName = $("#selectCountry").val();
        console.log("countryName", countryName);

        if(countryName == undefined || countryName == ""){
       var filter = {sid: stateID, gid : geoId, cntid : 23, sid : stateID }; 
       console.log(JSON.stringify(filter));
       var domainCollectionByGeo = new admin.DomainCollection(domainCollection.where(filter));         
       console.log('domainCollectionByGeo');
       console.log(JSON.stringify(domainCollectionByGeo));         
      }else{
        var filter = {sid: stateID, gid : geoId, cntid : countryId, sid : stateID }; 
       console.log(JSON.stringify(filter));
       var domainCollectionByGeo = new admin.DomainCollection(domainCollection.where(filter));         
       console.log('domainCollectionByGeo');
       console.log(JSON.stringify(domainCollectionByGeo));  
      }

        
          if (this.domainCollectionView) 
          {
              this.domainCollectionView.$el.empty();
              //this.domainCollectionView.$el.unbind();
              this.domainCollectionView.collection = domainCollectionByGeo;
              this.domainCollectionView.render();
          }  
          else
          {                 
          this.domainCollectionView = new admin.DomainCollectionView({
                  el: $( '#selectDomain' ),
                collection: domainCollectionByGeo
            });
          }

              $(this.domainCollectionView.el).attr('disabled', false);
              this.domainCollectionView.disabledElement();
        
            //set selected geo name
            console.log('stateName: ' + $("#selectState option:selected").text());
            appRouter.currentView.fileUploadConfig.stateName = $("#selectState option:selected").text();
            appRouter.currentView.fileUploadConfig.stateID = stateID;

            appRouter.stateName = $("#selectState option:selected").text();
        }
    },


    isSelectedDomain:function(e){
     e.preventDefault();
        console.log('State Triggered'); 
        var domainId = parseInt($('#selectDomain').val(), 10);

        var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var countryId = appRouter.currentView.fileUploadConfig.countryId;
        var stateId =   appRouter.currentView.fileUploadConfig.stateID;

        var regulatorArray = appRouter.currentView.regulationData.regulatorCollection;
        console.log(regulatorArray);


        if (regulatorArray.length > 0) {
            var regulatorCollection = new admin.RegulatorCollection(regulatorArray);
            console.log('regulatorCollection');console.log(regulatorCollection);

            //Louis, since this is used in file upload management.
            // This is used to load the regulator 

           var filter = {gid: geoId, cntid:countryId, sid:stateId , did:domainId }; 
           console.log(JSON.stringify(filter));

           var regulatorCollectionByDomain = new admin.RegulatorCollection(regulatorCollection.where(filter)); 
           console.log('regulatorCollectionByDomain');
           console.log(JSON.stringify(regulatorCollectionByDomain));
                        
            if (this.regulatorCollectionView) 
            {
                this.regulatorCollectionView.$el.empty();
               // this.regulatorCollectionView.$el.unbind();
               this.regulatorCollectionView.collection = regulatorCollectionByDomain;
               this.regulatorCollectionView.render();
            }  
            else
            {                     
              this.regulatorCollectionView = new admin.FileUploadRegulatorCollectionView({
                    el: $( '#selectRegulator' ),
                    collection: regulatorCollectionByDomain
              });
            }
            $(this.regulatorCollectionView.el).attr('disabled', false);
            this.regulatorCollectionView.disabledElement();
            //set selected domain name
            console.log('domainName: ' + $("#selectDomain option:selected").text());
            appRouter.currentView.fileUploadConfig.domainName = $("#selectDomain option:selected").text();
            appRouter.currentView.fileUploadConfig.domainId = domainId;

            appRouter.domainName = $("#selectDomain option:selected").text();
        }        
  },

  isSelectedRegulator: function(e) {
        e.preventDefault();
        console.log('Regulator Triggered');
        var regulatorId = parseInt($('#selectRegulator').val(), 10);
        var domainId = appRouter.currentView.fileUploadConfig.domainId;
        var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var countryId    = appRouter.currentView.fileUploadConfig.countryId;
        var stateId    = appRouter.currentView.fileUploadConfig.stateID;

           var regArray = appRouter.currentView.regulationData.regCollection;

        if (regArray.length > 0) {
         var regCollection = new admin.RegulationCollection(regArray);

         console.log('regulation collection');
         console.log(JSON.stringify(regCollection));

         var filter = {gid: geoId, cntid : countryId, sid : stateId, did: domainId, rid: regulatorId}; 

         console.log( JSON.stringify(filter));
         var regCollectionByDomain = new admin.RegulationCollection(regCollection.where(filter)); 
         console.log('regCollectionByDomain');console.log(JSON.stringify(regCollectionByDomain));
                        
         if (this.regulationCollectionView) {
                this.regulationCollectionView.$el.empty();
                //this.regulationCollectionView.$el.unbind();
                this.regulationCollectionView.collection = regCollectionByDomain;
                this.regulationCollectionView.render();
         }   
         else
         {                    
             this.regulationCollectionView = new admin.FileUploadRegulationCollectionView({
                   el: $( '#selectReg' ),
                   collection: regCollectionByDomain
                   //collection: regCollection
                });
         }
            $(this.regulationCollectionView.el).attr('disabled', false);
            this.regulationCollectionView.disabledElement();
            //set selected domain name
            console.log('RegName: ' + $("#selectRegulator option:selected").text());
            appRouter.currentView.fileUploadConfig.regulatorName = $("#selectRegulator option:selected").text();
            appRouter.currentView.fileUploadConfig.regulatorId = regulatorId;

             appRouter.regulatorName = $("#selectRegulator option:selected").text();
        }        
    },

     isSelectedRegulation: function(e) {
        e.preventDefault();
        console.log('Regulation Triggered');
        var regId = parseInt($('#selectReg').val(), 10);
        var regulatorId = appRouter.currentView.fileUploadConfig.regulatorId;
        var domainId = appRouter.currentView.fileUploadConfig.domainId;
        var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var countryId    = appRouter.currentView.fileUploadConfig.countryId;
        var stateId    = appRouter.currentView.fileUploadConfig.stateID;


        var docArray = appRouter.currentView.regulationData.documentCollection;

        if (docArray.length > 0) 
        {
          var docCollection = new admin.DocumentCollection(docArray);
          var filter = {geography_id: geoId, domain_id: domainId,regulation_id: regId}; console.log(filter);
          var docCollectionByReg = new admin.DocumentCollection(docCollection.where(filter)); 
          var filter = {gid: geoId, cntid : countryId, sid : stateId, did: domainId, rid: regulatorId, rlid : regId};  
          var docCollectionByReg = new admin.DocumentCollection(docCollection.where(filter));   
          if (this.documentCollectionView)
             { 
              this.documentCollectionView.$el.empty();
             // this.documentCollectionView.$el.unbind();
                this.documentCollectionView.collection = docCollectionByReg;
                this.documentCollectionView.render();
          }   
            else
            {                 
              this.documentCollectionView = new admin.FileUploadDocumentCollectionView(
                  { el: $( '#selectRootDoc' ),
                    collection: docCollectionByReg
                  });
            }

            $(this.documentCollectionView.el).attr('disabled', false);
            this.documentCollectionView.disabledElement();
            //set selected reg name
            console.log('RegName: ' + $("#selectReg option:selected").text());
            appRouter.currentView.fileUploadConfig.regName = $("#selectReg option:selected").text();
            appRouter.currentView.fileUploadConfig.regId = regId;  

            appRouter.fileUploadConfig.regName = $("#selectReg option:selected").text();

        }                
    },

    isSelectedDoc: function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Document Triggered');
        var regDocId = parseInt($('#selectRootDoc').val(), 10);
        var regId = appRouter.currentView.fileUploadConfig.regId;
        var regulatorId = appRouter.currentView.fileUploadConfig.regulatorId;
        var domainId = appRouter.currentView.fileUploadConfig.domainId;
        var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var countryId    = appRouter.currentView.fileUploadConfig.countryId;
        var stateId    = appRouter.currentView.fileUploadConfig.stateID;
        console.log('RegName: ' + $("#selectRootDoc option:selected").text());

        appRouter.fileUploadConfig.geoId = geoId;
        appRouter.fileUploadConfig.countryId = countryId;
        appRouter.fileUploadConfig.stateId = stateId;
        appRouter.fileUploadConfig.domainId = domainId;        
        appRouter.fileUploadConfig.regulatorId = regulatorId;
        appRouter.fileUploadConfig.regId = regId;      
        appRouter.fileUploadConfig.regDocId = regDocId;
        appRouter.fileUploadConfig.geoName = appRouter.currentView.fileUploadConfig.geoName;
        appRouter.fileUploadConfig.countryName = appRouter.currentView.fileUploadConfig.countryName;
        appRouter.fileUploadConfig.stateName = appRouter.currentView.fileUploadConfig.stateName;
        appRouter.fileUploadConfig.domainName = appRouter.currentView.fileUploadConfig.domainName;
        appRouter.fileUploadConfig.regulatorName = appRouter.currentView.fileUploadConfig.regulatorName;
        appRouter.fileUploadConfig.regName = appRouter.currentView.fileUploadConfig.regName;
        appRouter.fileUploadConfig.docName = $("#selectRootDoc option:selected").text();
        console.log( JSON.stringify(appRouter.fileUploadConfig));

        appRouter.regId = regId;
        appRouter.regulatorId = regulatorId;
        appRouter.domainId = domainId;
        appRouter.geoId = geoId;
        appRouter.countryId = countryId;
        appRouter.stateId = stateId;
        appRouter.regDocId = regDocId;

        var docname =  $("#selectRootDoc option:selected").text();
        console.log('docname: ', docname);
        console.log(appRouter.fileUploadConfig.documentCollection);
        var is_special_doc = appRouter.fileUploadConfig.documentCollection.findWhere({"docname" : docname}).get('is_special_doc');
        console.log("is_special_doc" ,is_special_doc);
        if(is_special_doc == 1) {      
          regName = appRouter.fileUploadConfig.regName;
          appRouter.fileUploadConfig.docName = docname;
          console.log( appRouter.fileUploadConfig.docName);
          appRouter.fileUploadConfig.regDocId = regDocId;  
           console.log(">>>>>>>>>>>>>>>>>>>13");
          //$('#filePage').empty();
          $('#page-section').empty();
          $('#page-section').unbind(); 
          console.log('APP_ROUTER-FILE_CONFIG1: ', JSON.stringify(appRouter.fileUploadConfig));          
          // this.lifeCyclePageView = new admin.LifeTrackerManagementPageView({el: $('#page-section')});
           appRouter.navigate("renderLifeTrackerManagementPage", {trigger: true});
        } else {

            var subdocArray = appRouter.currentView.regulationData.subDocumentCollection;

            console.log(subdocArray);
            subdocname = subdocArray[0].subdocname;
            console.log(subdocname);
            if (subdocArray.length == 0) {
                $('#selectDocName').hide();
                $('#selectSubDoc').hide();
                $('#uploadFile').attr('disabled', false).css('cursor','pointer');        
                $('#uploadFileLabel').attr('disabled', false).css('cursor','pointer');
                $('#fileName').css('cursor','default');
                var documentName = $("#selectRootDoc option:selected").text();
                appRouter.currentView.fileUploadConfig.docName = documentName;
                appRouter.currentView.fileUploadConfig.regDocId = regDocId;  
                //set doc level
                var docNameLcase = documentName.toLowerCase().trim();
                if (docNameLcase.indexOf('level') !== -1) {
                    var levelStr = docNameLcase.charAt(docNameLcase.length-1);
                    var level = parseInt(levelStr, 10);

                    console.log("to check the level inside of the action", level);
                } else {
                    var level = 1; 
                }
                console.log("to check the level outside of the action", level);
                appRouter.currentView.fileUploadConfig.level = level;

                console.log(appRouter.currentView.fileUploadConfig.level);
            }else {
                 var subDocCollection = new admin.SubDocCollection(subdocArray);
                console.log('subDocCollection');
                console.log(JSON.stringify(subDocCollection));

                var filter = {gid: geoId, cntid : countryId, sid : stateId, did: domainId, rid: regulatorId, rlid : regId, docid : regDocId };  
                console.log(JSON.stringify(filter))
               var docCollectionByReg = new admin.DocumentCollection(subDocCollection.where(filter));         
               console.log('docCollectionByReg');
               console.log(JSON.stringify(docCollectionByReg));

            if(docCollectionByReg.length == 0){
                $('#selectDocName').hide();
                $('#selectSubDoc').hide();
                $('#uploadFile').attr('disabled', false).css('cursor','pointer');        
                $('#uploadFileLabel').attr('disabled', false).css('cursor','pointer');
                $('#fileName').css('cursor','default');
                var documentName = $("#selectRootDoc option:selected").text();
                appRouter.currentView.fileUploadConfig.docName = documentName;
                appRouter.currentView.fileUploadConfig.regDocId = regDocId;  
                //set doc level
                var docNameLcase = documentName.toLowerCase().trim();
                if (docNameLcase.indexOf('level') !== -1) {
                    var levelStr = docNameLcase.charAt(docNameLcase.length-1);
                    var level = parseInt(levelStr, 10);
                    console.log("to check the level inside of the action", level);

                } else {
                    var level = 1; 
                }
                console.log("to check the level outside of the action", level);

                appRouter.currentView.fileUploadConfig.level = level;
                console.log(appRouter.currentView.fileUploadConfig.level);
                
            }
            else{
                var documentName = $("#selectRootDoc option:selected").text();
                appRouter.currentView.fileUploadConfig.docName = documentName;
                appRouter.currentView.fileUploadConfig.regDocId = regDocId;  
                //set doc level
                var docNameLcase = documentName.toLowerCase().trim();
                if (docNameLcase.indexOf('level') !== -1) {
                    var levelStr = docNameLcase.charAt(docNameLcase.length-1);
                    var level = parseInt(levelStr, 10);
                    console.log("to check the level inside of the action", level);

                } else {
                    var level = 1; 
                }
                console.log("to check the level outside of the action", level);

                appRouter.currentView.fileUploadConfig.level = level;
                console.log(appRouter.currentView.fileUploadConfig.level);
                
                if (this.subDocumentCollectionView) 
                {
                    this.subDocumentCollectionView.$el.empty();
                    //this.subDocumentCollectionView.$el.unbind();
                     this.subDocumentCollectionView.collection = docCollectionByReg;
                     this.subDocumentCollectionView.render();

                } 
                else
                {   
                    //$("#selectSubDoc option:contains('-')").remove();                   
                    this.subDocumentCollectionView = new admin.FileUploadSubDocumentCollection(
                        { el: $( '#selectSubDoc' ),
                          collection: docCollectionByReg
                        });
                }
            }

                $(this.subDocumentCollectionView.el).attr('disabled', false);
               
                //set selected reg name
                console.log('RegName: ' + $("#selectRootDoc option:selected").text());
                appRouter.currentView.fileUploadConfig.docName = $("#selectRootDoc option:selected").text();
                appRouter.currentView.fileUploadConfig.regDocId = regDocId;  
                $('#uploadFile').attr('disabled', false).css('cursor','pointer');        
                $('#uploadFileLabel').attr('disabled', false).css('cursor','pointer');
                $('#fileName').css('cursor','default');

            }                
       }
        // console.log(">>>>>>>>>>>>>>>>>>>14");
    },

});
