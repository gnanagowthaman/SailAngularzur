var admin = admin || {};

admin.SubDocFormPageView = Backbone.View.extend({

	initialize: function(options) {

    this.mode = options.mode;
    this.subDocId = options.id;
    this.template = options.template;
    var _self = this;
    console.log ('mode: ' + this.mode + ' subDocId: ' + this.subDocId);


    if (new String(this.mode).valueOf() == new String('create').valueOf()) { //Create User Form
      //_self.render();
           $.when(
            $.ajax({
              type: "GET",
              url: '/allDoctype',
              success: function(data) {
                console.log(data);
                _self.docData = data;
                console.log('doc data :: ' + JSON.stringify(data));
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
                              var failureMsg = "Error while fetching document list. Please Contact Administrator.";  
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
             _self.docCollectionView = new admin.MgmtDocumentCollectionView({
            el: $( '#selectDocument' ),
            mode: 'CREATE',            
            docCollection: _self.docData
        });
        });

    } else { //Edit news Form
      
      var findSubDoc = "/findBySubDoc/" + this.subDocId;
      $.when(
        $.ajax({
          type: "GET",
          url: findSubDoc,
          success: function(data) {
            _self.subDocData = data[0];
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
                          var failureMsg = "Error while Edit sub document form. Please Contact Administrator.";  
                        }
                        $( "div.failure").html(failureMsg);
                        $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );  
                    } 
              }catch(e) {
                  window.location.href = '/sessionExpired';
               }           
          }
        }),

        $.ajax({
              type: "GET",
              url: '/allDoctype', 
              success: function(data) {
                console.log(data);
                _self.docData = data;
                console.log('doc data :: ' + JSON.stringify(data));  
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
                              var failureMsg = "Error while fetching document list. Please Contact Administrator.";  
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
          _self.docCollectionView = new admin.MgmtDocumentCollectionView({
            el: $( '#selectDocument' ),
            mode: 'UPDATE',            
            docCollection: _self.docData,
            subDocModel: _self.subDocData,
          });
          // $('#selectDocument').val(_self.subDocData.doc_id);
    })
    }	
	},

	events: {
          
          'click #saveSubDoc'      :'saveSubDocument',
          'click  #cancelForm'  : 'cancelSubDoc',
          'click  #subDoc_name': 'nameFocus',
          'click  #subDoc_description': 'descriptionFocus'

	},

	render: function() {
		if (new String(this.mode).valueOf() == new String('create').valueOf()) {
			  console.log('this.template'); console.log(this.template);
			  this.$el.html(this.template);
		} 
    else { //edit
			  this.$el.html(this.template( this.subDocData ));
		}
    	  console.log('Rendering Edit Sub Document FormPageView');      
		    return this;
	},

  saveSubDocument:function(e){
      e.preventDefault();
      var  regex=/^[a-zA-Z\s0-9]+$/;
      var regex1=/^[a-zA-Z-\s0-9]+$/;

      document.getElementById('subDocName_error').innerHTML= "";
      document.getElementById('subDoc_content_error').innerHTML= "";    
      if ($('#subDoc_name').val().trim() == '' ) {
        $('#subDoc_name').focus();
        $('#subDoc_name').attr('style', 'border-bottom:2px solid #FF0000;');
        document.getElementById('subDocName_error').innerHTML= "Please enter the Name";
        
        return false;
      }

       if (!regex.test($('#subDoc_name').val().trim())) {
          $('#subDoc_name').focus();
          document.getElementById('subDocName_error').innerHTML= "Please provide valid SubDoctype name ";
          return false;
        }

      if ($('#subDoc_description').val().trim() == '') {
        $('#subDoc_description').focus();
        $('#newsDate').attr('style', '');
        $('#subDoc_description').attr('style', 'border-bottom:2px solid #FF0000;');
        document.getElementById('subDoc_content_error').innerHTML= "Please Enter Description";
        return false;
      }
     if (!regex1.test($('#subDoc_description').val().trim())) {
          $('#subDoc_description').focus();
          document.getElementById('subDoc_content_error').innerHTML= "Please provide valid description ";
          return false;
         }

      
      var subDocFormData = {
          name   : $('#subDoc_name').val(),
          description  : $('#subDoc_description').val()       
      };


      console.log(subDocFormData);
      if (new String(this.mode).valueOf() == new String('edit').valueOf()) {
            subDocFormData.id = parseInt($('#subDoc_id').val(), 10);
             var selectedDocument =  $("#selectDocument").val();
            subDocFormData.doc_id = parseInt(selectedDocument, 10);
            saveSubDoc = "/updateSubDoc";
            var successMsg = "Sub Document Updated Successfully.";
            var failureMsg = "Error while updating the Sub Document. Contact Administrator.";
      } 
      else {
         var selectedDocument =  $("#selectDocument").val();
           subDocFormData.doc_id = parseInt(selectedDocument, 10);

            saveSubDoc = "/saveSubDocUrl";
            var successMsg = "Sub Document Created Successfully.";
            var failureMsg = "Error while creating the Sub Document. Contact Administrator.";
      }

          $.ajax({
          type    : "POST",
          url     : saveSubDoc, //if create mode then createnews else if edit mode then updateNews
          data    : subDocFormData,
          success : function(data) {
            console.log(data);
            console.log('Create sub document Successfully');
            appRouter.navigate("subDocManagement", {trigger: true});
            $( "div.success" ).html(successMsg);
            $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
          },
          error: function(data) {
                    try{
                        var errData = JSON.parse(data.responseText);
                        console.log(errData);
                        if (errData.errCode == 550) {
                            window.location.href = '/sessionExpired';
                        } else {
                            if (errData.errMsg.length > 0) {
                              var failureMsg = errData.errMsg;  
                            } else {
                                var failureMsg = "Error occurred while saving the Sub Document. Please Contact Administrator."; 
                             }
                            if (errData.errCode == 'errSubDocument') {
                              document.getElementById('subDocName_error').innerHTML = failureMsg;
                              $('#subDoc_name').focus();
                            } else {
                              $( "div.failure").html(failureMsg);
                              $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );
                            }                           
                          }
                    }catch(e) {
                        window.location.href = '/sessionExpired';
                     }
                } 
        }); 
  },

  cancelSubDoc: function(e){
      e.preventDefault();
      console.log('subDocManagement Canceled');
      appRouter.navigate("subDocManagement", {trigger: true});
  },
     nameFocus: function()
  {
        $('#subDocName_error').html("");
    
  },
  descriptionFocus: function()
  {
        $('#subDoc_content_error').html("");
    
  }

 });
