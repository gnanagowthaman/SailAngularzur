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
    'click #modalClose' : 'dataDismissModal'
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

  uploadFile: function (e) {
      e.preventDefault();
      var fileName = e.target.files[0].name;        
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

      if (type == "pdf" || type == "xlsx") {
      
          var path = '/' + this.fileUploadConfig.geoName +               
                 '/' + this.fileUploadConfig.countryName +
                 '/' + this.fileUploadConfig.stateName +
                 '/' + this.fileUploadConfig.domainName +
                 '/' + this.fileUploadConfig.regulatorName +
                 '/' + this.fileUploadConfig.regName +
                 '/' + this.fileUploadConfig.docName +                 
                 '/' + this.fileUploadConfig.subDocName +
                 '/' + 'l' + this.fileUploadConfig.level;  
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
      }else{
          this.dataModalOpen();       
      }
  }

});
