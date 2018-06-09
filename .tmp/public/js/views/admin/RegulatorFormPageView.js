var admin = admin || {};

admin.RegulatorFormPageView = Backbone.View.extend({
    
	initialize: function(options) {
		this.mode = options.mode;
		this.regulatorId = options.id;
		this.template = options.template;
		var _self = this;
		console.log ('mode: ' + this.mode + ' regulatorId: ' + this.regulatorId);	
		if (new String(this.mode).valueOf() == new String('create').valueOf()) { //Create User Form
      $.when(
            $.ajax({
              type: "GET",
              url: '/regulator', //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
              success: function(data) {
                console.log(data);
                _self.regData = data;
                console.log('reg data :: ' + JSON.stringify(data));
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
                }catch(e) {
                    window.location.href = '/sessionExpired';
                 }
              }
            })

        ).done(function () {
             _self.render();
            /*_self.regCollectionView = new admin.MgmtRegulationCollectionView({
                  el: $( '#selectRegulation' ),
                     regCollection: _self.regData*/
            //});

        });
		} else { //Edit User Form
			var findreg = "/findregByregulatorId/" + this.regulatorId;
			var findregulator = "/findRegulator/" + this.regulatorId;
			$.when(
				$.ajax({
					type: "GET",
					url: findregulator,
					success: function(data) {
						_self.regulatorData = data[0];
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
              }catch(e) {
                  window.location.href = '/sessionExpired';
               }            
          }
				}),
         $.ajax({
              type: "GET",
              url: '/regulator', //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
              success: function(data) {
                console.log(data);
                _self.regData = data;
                console.log('reg data :: ' + JSON.stringify(data));
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
                }catch(e){
                  window.location.href = '/sessionExpired';
                 }            
              }
            }),
            $.ajax({
              type: "GET",
              url: findreg, //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
              success: function(data) {
                console.log(data);
                _self.selectedregData = data;
                console.log('reg data :: ' + JSON.stringify(data));
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
                }catch(e){
                      window.location.href = '/sessionExpired';
                 }             
              }
            })
		        
		    ).done(function () {
             _self.render();
             _self.regCollectionView = new admin.MgmtRegulationCollectionView({
              el: $( '#selectRegulation' ),
                regCollection: _self.regData
              });
              
		    });
	   }
	},
			
		/*if (new String(this.mode).valueOf() == new String('create').valueOf()) { 
		//Create User Form
		//alert("2");
		console.log('create');
		this.render();
			// var findRegs = "/createGeo";
	  //       $.ajax({
	  //         type: "POST",
	  //         url: findRegs, //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id    
	  //         success: function(data) {
	  //           console.log(data);
	  //           _self.render();
	  //      }  });  	
		} else { 

			var findGeo = "/findGeography/" + this.geoId;

			$.when(	
		        $.ajax({
		          type: "GET",latorForm",
        "renderEditRegulatorForm/:id":"re
		          url: findGeo, //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id    
		          success: function(data) {
		            console.log(data);
		            _self.geoData = data[0];
		            console.log('find geo id ' + JSON.stringify(data));
		          }
		        })		
		    ).done(function () {
		         _self.render();
		    });
		}    	 
	},
*/
	events: {
		'click  #save'		: 'saveRegulator',
		'click  #cancel'	: 'cancelRegulator',
    'click  #regulator_name': 'nameFocus',
    'click  #regulator_description': 'descriptionFocus'
	},
	render: function() {
		if (new String(this.mode).valueOf() == new String('create').valueOf()) {
			console.log('this.template'); console.log(this.template);
			this.$el.html(this.template);
		} else { //edit
			this.$el.html(this.template( this.regulatorData ));
		}
    	console.log('Rendering Edid regulator FormPageView');
		  return this;		
	},

	saveRegulator: function (e) {	
		e.preventDefault();
    document.getElementById('regulator_name_error').innerHTML= "";
    document.getElementById('regulator_description_error').innerHTML= "";
     var  regex=/^[a-zA-Z\s\&\)\(\,]+$/;
      var regex1=/^[a-zA-Z-\s\&\)\(\,0-9]+$/;


    if ($('#regulator_name').val().trim() == '' ) {
        $('#regulator_name').focus();
        $('#regulator_name').attr('style', 'border-bottom:2px solid #FF0000;');
        document.getElementById('regulator_name_error').innerHTML= "Please enter the Regulator Name";             
        return false;
    }
    
    if (!regex.test($('#regulator_name').val().trim())) {
          $('#regulator_name').focus();
          document.getElementById('regulator_name_error').innerHTML= "Please provide valid name ";
          return false;
         }  
    if ($('#regulator_description').val().trim() == '') {
        $('#regulator_description').focus();
        $('#regulator_description').attr('style', '');
        $('#regulator_description').attr('style', 'border-bottom:2px solid #FF0000;');
        document.getElementById('regulator_description_error').innerHTML= "Please enter the Regulator Description";            
        return false;
    }

     if (!regex1.test($('#regulator_description').val().trim())) {
          $('#regulator_description').focus();
          document.getElementById('regulator_description_error').innerHTML= "Please provide valid description ";
          return false;
         }
      var regulatorFormData = {
        name	       : $('#regulator_name').val().trim(),
        description	 : $('#regulator_description').val().trim()
     //   regs         : $('#selectRegulation').val()
    	};
		if (new String(this.mode).valueOf() == new String('edit').valueOf()) { 		
			regulatorFormData.id = parseInt($('#regulator_id').val(), 10);
		 	saveRegulatorUrl = "/updateRegulator";
			var successMsg = "Regulator Updated Successfully.";
		 //	var failureMsg = "Error while updating the Geography. Contact Administrator.";	
     //==================================================================================
     // var failureMsg = "Geography Already Exist"; 
     //  document.getElementById('geo_name_error').innerHTML = failureMsg;//<------>//
  //========================================================================================	
	  } else {
  			saveRegulatorUrl = "/createRegulator";
  			var successMsg = "Regulator Created Successfully.";
  	 	  var failureMsg = "Error while creating the Regulator. Contact Administrator.";		
		}		
	
    $.ajax({
      type 		: "POST",
      url 		: saveRegulatorUrl, //if create mode then createUser else if edit mode then updateUser
      data 		: regulatorFormData,      
      success	: function(data) {          
        $( "div.success" ).html(successMsg);
        $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );   
        appRouter.navigate("manageRegulator", {trigger: true});           
      },
      error: function(data) {
          var errData = JSON.parse(data.responseText);
          if (errData.errCode == 550) {
              window.location.href = '/sessionExpired';
          } else {
              if (errData.errMsg.length > 0) {
                var failureMsg = errData.errMsg;  
              } else {
                      var failureMsg = "Error occurred while saving the Regulator. Please Contact Administrator."; 
                }
                  if (errData.errCode == 'errregulator') {
                    document.getElementById('regulator_name_error').innerHTML = failureMsg;
                    $('#regulator_name').focus();
                  } else {
                      $( "div.failure").html(failureMsg);
                      $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );
                   }                           
            }
        }                      
      });   
    },
    cancelRegulator: function(e) {
    	e.preventDefault();
      appRouter.navigate("manageRegulator", {trigger: true});    	
    },
       nameFocus: function()
  {
        $('#regulator_name_error').html("");
    
  },
  descriptionFocus: function()
  {
        $('#regulator_description_error').html("");
    
  }
});


