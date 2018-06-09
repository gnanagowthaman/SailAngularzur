var admin = admin || {};

admin.EditSpclDocFormPageView = Backbone.View.extend({
    template: $('#editSpclDocFormTpl').html(),

  initialize: function(options) {
    console.log('appRouter.spDoc', appRouter.spDoc);
    var _self =this;
     this.fileUploadConfig = {};
    this.spid = options.id;
    this.file_id = options.file_id;
     this.template = options.template;
    console.log("spid",this.spid,this.file_id);
    // var getSpclDocData = "/getSpclDocData/" + this.spid;
      $.when(
    //    $.ajax({
    //        type: "GET",
    //        url: getSpclDocData,
    //        success: function(data) {
    //          console.log(data);
    //          _self.spclDocData = data[0];
    //        },
    //        error: function(data) {
    //           try{
    //                 var errData = JSON.parse(data.responseText);
    //                 if ( errData.errCode == 550) {
    //                     window.location.href = '/sessionExpired';
    //                 } else {
    //                     if (errData.errMsg.length > 0) {
    //                       var failureMsg = errData.errMsg;  
    //                     } else {
    //                        var failureMsg = "Error while fetching data. Please Contact Administrator.";  
    //                     }
    //                     $( "div.failure").html(failureMsg);
    //                     $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
    //               }
    //           }catch(e) {
    //                window.location.href = '/sessionExpired';
    //             }
    //          }
    //     }),

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
            el: $( '#edit_document_type' ),
             docTypeCollection: _self.documentType
         });
         console.log('SP_DOC_TYPE_ID: ', appRouter.spDoc.document_type_id);
         $('#edit_document_type').val(appRouter.spDoc.document_type_id);
         
      });


  },
      
    
  events: {

     'change #uploadFileDocEdit' : 'uploadFileDocEdit',
      'click #editmodalDocClose' : 'dataDismissModal',
      'click #saveSpclDoc' : 'saveSpclDoc',

  },
  render: function() {
      console.log(this.template);
      this.$el.html(this.template(appRouter.spDoc));
       $('.dateDoc').datetimepicker();
      return this;    
  },

  dataDismissModal : function(e){
    console.log("event triggers");
    $('#chooseFileidDocEdit').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  },

  dataModalOpen : function(e){
      $('#chooseFileidDocEdit').modal('show');
  },

  uploadFileDocEdit: function (e) { 
        this.file = e.target.files[0];
         this.fileName = e.target.files[0].name;        
        $('.lifeTrackerfileName').val(this.fileName);

        console.log("fileName");console.log(this.fileName);
         this.fileNameArray = this.fileName.split('.');
         this.type = this.fileNameArray[this.fileNameArray.length-1];        
        console.log(this.fileName); console.log(this.type);
     
  },

  saveSpclDoc: function(e){
    e.preventDefault();
    console.log("event triggers"); 
    var spclDocId =   $('#edit_document_type').val();    
    var description = $('#editdocTypedescription').val();
    var date        = $('#editdate').val();
    console.log(spclDocId);
    console.log(description);
    console.log(date);
    console.log(this.fileName); 
    console.log(this.type);

    if (this.fileName == undefined) {
      var formData = new FormData();
      formData.append('spclDocId', spclDocId);
      formData.append('description',description);
      formData.append('date',date);
      formData.append('spid', appRouter.spDoc.spid);
      formData.append('rdlid', appRouter.spDoc.regulation_document_id);
      console.log("check inside the formdata1", formData);
    } else if (this.type == "pdf" || this.type == "xlsx") {
      var formData = new FormData();
      formData.append('spclDocId', spclDocId);
      formData.append('description',description);
      formData.append('date',date);
      formData.append('spid', appRouter.spDoc.spid);
      formData.append('rdlid', appRouter.spDoc.regulation_document_id);
      formData.append('fileName', this.fileName);
      formData.append('oldFileName', appRouter.spDoc.file_name);
      formData.append('fileType', this.type);          
      formData.append('file_id', this.file_id);
      var lastIndexOfSlash = appRouter.spDoc.document_link.lastIndexOf('/');
      var path = appRouter.spDoc.document_link.substring(0, lastIndexOfSlash+1);
      console.log('OLD_FILE: ', appRouter.spDoc.file_name);
      console.log('PATH:', path);
      formData.append('path', path);
      console.log("check inside the formdata2", formData);
      formData.append('uploadFile', this.file, this.fileName);
    } else {
      this.dataModalOpen();            
    }
    $( "div.success").html("<center>File Upload is in progress...</center>");
    $( "div.success" ).fadeIn(300).delay(3500).fadeOut(400);
    var _self = this;

    $.ajax({
        type: "POST",
        url: "/uploadSpecialFileEdit",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,      
        success: function(data1) {
          console.log('SP DOC: ', data1);
          $('#file_error_doc').empty();
          console.log('PARENT-PAGE', appRouter.spParentPage);
          if (appRouter.spParentPage == 'DocumentTablePageView') {                  
            appRouter.navigate("manageDocuments", {trigger: true});
          } else {
            appRouter.navigate("renderLifeTrackerManagementPage", {trigger: true});
           // this.lifeCyclePageView = new admin.LifeTrackerManagementPageView({
           //    el: $('#page-section')
           //    // collection: data1
           //  });
          }
            // _self.documentType.forEach(function(item) {
            //   if (item.id == data1.document_type) {
            //     data1.document_type = item.document_type; 
            //   }
            // });
            // _self.sPDocCollection.add(data1); 
            $( "div.success" ).html("Special Document Updated Successfully.");
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

});


