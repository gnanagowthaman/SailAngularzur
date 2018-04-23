var admin = admin || {};

admin.DocTypeFormPageView = Backbone.View.extend({
    
	initialize: function(options) {
		this.mode = options.mode;
		this.doctyeId = options.id;
		this.template = options.template;
		var _self = this;
		console.log ('mode: ' + this.mode + ' doctyeId: ' + this.doctyeId);	
		if (new String(this.mode).valueOf() == new String('create').valueOf()) { 
			_self.render();		
		} else { 
			console.log('inside edit');
			var findDocT = "/findDocType/" + this.doctyeId;
			$.when(	
		        $.ajax({
		           type: "GET",
		           url: findDocT,     
		           success: function(data) {
			            console.log(data);
			            _self.DocTypeData = data[0];
			            console.log('find doctype id ' + JSON.stringify(data));
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
						  		  	var failureMsg = "Error occurred while fetching the Regulations. Please Contact Administrator.";	
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
		    });
		}    	 
	},

	events: {
		'click  #save'		: 'saveDoctype',
		'click  #cancel'	: 'cancelDoctype',
		'click  #doctype_name': 'nameFocus',
        'click  #doctype_description': 'descriptionFocus'
	},
	render: function() {
		if (new String(this.mode).valueOf() == new String('create').valueOf()) {
			this.$el.html(this.template);
		} else { 
			this.$el.html(this.template( this.DocTypeData));
		}
    	console.log('Rendering Edid Doctype FormPageView');
		return this;		
	},

	saveDoctype: function (e) {	
		e.preventDefault();
	
	    document.getElementById('doctype_name_error').innerHTML= "";
        document.getElementById('doctype_description_error').innerHTML= "";

         //	var  regex=/^[a-zA-Z\s]+$/;
            var  regex=/^[a-zA-Z\s0-9]+$/;
         	var regex1=/^[a-zA-Z-\s0-9]+$/;
         	
        if ($('#doctype_name').val().trim() == '' ) {
            $('#doctype_name').focus();
            $('#doctype_name').attr('style', 'border-bottom:2px solid #FF0000;');
            document.getElementById('doctype_name_error').innerHTML= "Please enter the Doctype Name";             
            return false;
        }  

        if (!regex.test($('#doctype_name').val().trim())) {
          $('#doctype_name').focus();
          document.getElementById('doctype_name_error').innerHTML= "Please provide valid Doctype name ";
          return false;
   	    }

        if ($('#doctype_description').val().trim() == '') {
            $('#doctype_description').focus();
            $('#doctype_description').attr('style', '');
            $('#doctype_description').attr('style', 'border-bottom:2px solid #FF0000;');
            document.getElementById('doctype_description_error').innerHTML= "Please enter the Doctype Description";            
            return false;
        }
         if (!regex1.test($('#doctype_description').val().trim())) {
          $('#doctype_description').focus();
          document.getElementById('doctype_description_error').innerHTML= "Please provide valid description ";
          return false;
         }
    
        var doctypeFormData = {
			name	 : $('#doctype_name').val().trim(),
            description	 : $('#doctype_description').val().trim()
    	};
    	
		if (new String(this.mode).valueOf() == new String('edit').valueOf()) { 
			doctypeFormData.id = parseInt($('#doctype_id').val(), 10);
		 	saveDoctypeUrl = "/updateDocType";
			var successMsg = "Document Type Updated Successfully.";
		 	var failureMsg = "Error while updating the Geography. Contact Administrator.";		
	    } else {
			saveDoctypeUrl = "/createDocType";
			var successMsg = "Document Type Created Successfully.";
	 	   	var failureMsg = "Error while creating the Geography. Contact Administrator.";
		
	    }	

        $.ajax({
          type 		: "POST",
          url 		: saveDoctypeUrl, //if create mode then createUser else if edit mode then updateUser
          data 		: doctypeFormData,      
          success	: function(data) {          
            $( "div.success" ).html(successMsg);
            $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );   
            appRouter.navigate("manageDocType", {trigger: true});           
          },

            error: function(data) {
           	    try{
  					var errData = JSON.parse(data.responseText);
				  	if (errData.errCode == 550) {
		                window.location.href = '/sessionExpired';
		            } else {
		            	if (errData.errMsg.length > 0) {
				  		  	var failureMsg = errData.errMsg;	
				  		} else {
				  		  	var failureMsg = "Error occurred while saving the User. Please Contact Administrator.";	
				  		}
				  		if (errData.errCode == 'errDocType') {
				  			document.getElementById('doctype_name_error').innerHTML = failureMsg;
				  			$('#doctype_name').focus();
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
    cancelDoctype: function(e) {
    	e.preventDefault();
        appRouter.navigate("manageDocType", {trigger: true});    	
    },

    nameFocus: function()
  {
        $('#doctype_name_error').html("");
    
  },
  descriptionFocus: function()
  {
        $('#doctype_description_error').html("");
    
  }
});


