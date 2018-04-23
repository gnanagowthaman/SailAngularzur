var admin = admin || {};

admin.StateFormPageView = Backbone.View.extend({
    
	initialize: function(options) {
    this.fileUploadConfig = {};
		this.mode = options.mode;
		this.stateId = options.id;
		this.template = options.template;
     this.regulations={};
   
		var _self = this;
		console.log ('mode: ' + this.mode + ' stateId: ' + this.stateId);	
		if (new String(this.mode).valueOf() == new String('create').valueOf()) { //Create User Form
      $.when(
           $.ajax({
              type: "GET",
              url: '/states', //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
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
                              var failureMsg = "Error while fetching the Country. Please Contact Administrator.";  
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
              url: '/countries', //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
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
                              var failureMsg = "Error while fetching the Country. Please Contact Administrator.";  
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
            url: "/geographys",
            success: function(data) {
              console.log(data);
              _self.geoData = data;
       
            },
            error: function(data) {
                        var errData = JSON.parse(data.responseText);
                        if ( errData.errCode == 550) {
                            window.location.href = '/sessionExpired';
                        } else {
                            if (errData.errMsg.length > 0) {
                              var failureMsg = errData.errMsg;  
                            } else {
                              var failureMsg = "Error while fetching data From Geography. Please Contact Administrator.";  
                            }
                              $( "div.failure").html(failureMsg);
                              $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 ); 
                          }             
                    }
          })     

        ).done(function () {
             _self.render();

             _self.regulations = {
              usergeoCollection:_self.geoData ,
              countryCollection:_self.regData
             };

              console.log(' sTATE cOLLECTION LIST :: ' + JSON.stringify(_self.regulations));


              _self.geoCollectionView = new admin.UserGeoCollectionView({
                el: $( '#selectGeography' ),
                  usergeoCollection:  _self.regulations ,
                  endChain: 'country'
              });
              $('#selectGeography').attr('disabled',false);

        });
		} else { //Edit User Form

    	var findreg = "/findregBystateId/" + this.stateId;
			var findstate = "/findstate/" + this.stateId;
			$.when(
				$.ajax({
					type: "GET",
					url: findstate,
					success: function(data) {
						_self.stateData = data[0];
            console.log('State  data -> ' + JSON.stringify(data));
            
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
              url: '/countries', //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
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
                              var failureMsg = "Error while fetching the Country. Please Contact Administrator.";  
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
            url: "/geographys",
            success: function(data) {
               console.log('geographys data :: ' + JSON.stringify(data));
              _self.geoData = data;

            },
            error: function(data) {
                        var errData = JSON.parse(data.responseText);
                        if ( errData.errCode == 550) {
                            window.location.href = '/sessionExpired';
                        } else {
                            if (errData.errMsg.length > 0) {
                              var failureMsg = errData.errMsg;  
                            } else {
                              var failureMsg = "Error while fetching data From Geography. Please Contact Administrator.";  
                            }
                              $( "div.failure").html(failureMsg);
                              $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 ); 
                          }             
                    }
          })     

		     
		    ).done(function () {
          console.log("Start to render");
             _self.render();
           
           _self.regulations = {
              usergeoCollection:_self.geoData ,
              countryCollection:_self.regData
             };

              _self.geoCollectionView = new admin.UserGeoCollectionView({
                el: $( '#selectGeography' ),
                  usergeoCollection:  _self.regulations ,
                  endChain: 'country'
              });
             
              console.log('State  data -> ' + _self.stateData.gid+"  "+_self.stateData.country_id);
              
                $('#selectGeography').val(_self.stateData.gid);
              _self.geoCollectionView.selectedData();
             $('#selectCountry').val(_self.stateData.country_id);

		    });
	   }
	},
			
		
	events: {

		'click  #save'		: 'saveState',
		'click  #cancel'	: 'cancelState',
    'click  #state_name': 'nameFocus',
    'click  #state_description': 'descriptionFocus',
    'click #selectGeography' : 'geoFocus',
    'click #selectCountry' : 'countryFocus',
    'click  #state_code': 'codeFocus',


	},
	render: function() {
		if (new String(this.mode).valueOf() == new String('create').valueOf()) {
			console.log('this.template'); console.log(this.template);
			this.$el.html(this.template);
		} else { //edit
			this.$el.html(this.template( this.stateData ));
		}
    	console.log('Rendering Edid state FormPageView');
      $('#selectGeography').attr('disabled',false);
       $('#selectCountry').attr('disabled',false);
		  return this;		
	},

	saveState: function (e) {	
		e.preventDefault();
    document.getElementById('state_name_error').innerHTML= "";
    document.getElementById('state_description_error').innerHTML= "";
    document.getElementById('state_code_error').innerHTML= "";
    var  regex=/^[a-zA-Z\s]+$/;
    var regex1=/^[a-zA-Z-\s0-9]+$/;
    var regex2=  /^[a-zA-Z]+$/;
    if ($('#state_name').val().trim() == '' ) {
        $('#state_name').focus();
        $('#state_name').attr('style', 'border-bottom:2px solid #FF0000;');
        document.getElementById('state_name_error').innerHTML= "Please enter the State Name";             
        return false;
    } 
     if (!regex.test($('#state_name').val().trim())) {
          $('#state_name').focus();
          document.getElementById('state_name_error').innerHTML= "Please provide valid name ";
          return false;
         }  
    if ($('#state_description').val().trim() == '') {
        $('#state_description').focus();
        $('#state_description').attr('style', '');
        $('#state_description').attr('style', 'border-bottom:2px solid #FF0000;');
        document.getElementById('state_description_error').innerHTML= "Please enter the State Description";            
        return false;
    }
     if (!regex1.test($('#state_description').val().trim())) {
          $('#state_description').focus();
          document.getElementById('state_description_error').innerHTML= "Please provide valid description ";
          return false;
         }

     if ($('#state_code').val().trim() == '' ) {
        $('#state_code').focus();
        $('#state_code').attr('style', 'border-bottom:2px solid #FF0000;');
        document.getElementById('state_code_error').innerHTML= "Please enter the State Code";             
        return false;
    } 
      if (!regex2.test($('#state_code').val())) {
          $('#state_code').focus();
          document.getElementById('state_code_error').innerHTML= "Please provide valid state code";
          return false;
         } 


    if ($('#selectGeography').val().trim() == '') {
          $('#selectGeography').focus();
          $('#selectGeography').attr('style', '');
          $('#selectGeography').attr('style', 'border-bottom:2px solid #FF0000;');
          document.getElementById('geo_error').innerHTML= "Please select the Geography ";
          return false;
      }


      //    if ($('#selectCountry').val().trim() == '') {
      //     $('#selectCountry').focus();
      //     $('#selectCountry').attr('style', '');
      //     $('#selectCountry').attr('style', 'border-bottom:2px solid #FF0000;');
      //     document.getElementById('country_error').innerHTML= "Please select the Country ";
      //     return false;
      // }
        var countryName = $("#selectCountry").val();
        console.log("countryName", countryName);

        if(countryName == undefined || countryName == ""){
      var stateFormData = {
        name	       : $('#state_name').val().trim().toUpperCase(),
        description	 : $('#state_description').val().trim(),
        state_code   : $('#state_code').val().trim().toUpperCase(),
        states       : $('#selectstate').val(),
        geography_id  : $('#selectGeography').val(),
        country_id   : 23
    	};
    }
    else{
       var stateFormData = {
        name         : $('#state_name').val().trim().toUpperCase(),
        description  : $('#state_description').val().trim(),
        state_code   : $('#state_code').val().trim().toUpperCase(),
        states       : $('#selectstate').val(),
        geography_id  : $('#selectGeography').val(),
        country_id   : $('#selectCountry').val()
      };
    }
    console.log("state form data",JSON.stringify(stateFormData));

		if (new String(this.mode).valueOf() == new String('edit').valueOf()) { 		
			stateFormData.id = parseInt($('#state_id').val(), 10);
		 	savestateUrl = "/updatestate";
			var successMsg = "State Updated Successfully.";
		 //	var failureMsg = "Error while updating the State. Contact Administrator.";		
	  } else {
  			savestateUrl = "/createstate";
  			var successMsg = "State Created Successfully.";
  	 	  var failureMsg = "Error while creating the State. Contact Administrator.";		
		}		

    $.ajax({
      type 		: "POST",
      url 		: savestateUrl, //if create mode then createUser else if edit mode then updateUser
      data 		: stateFormData,      
      success	: function(data) {          
        $( "div.success" ).html(successMsg);
        $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );   
        appRouter.navigate("managestate", {trigger: true});           
      },
      error: function(data) {
          var errData = JSON.parse(data.responseText);
          if (errData.errCode == 550) {
              window.location.href = '/sessionExpired';
          } else {
              if (errData.errMsg.length > 0) {
                var failureMsg = errData.errMsg;  
              } else {
                      var failureMsg = "Error occurred while saving the State. Please Contact Administrator."; 
                }
                  if (errData.errCode == 'errstate') {
                    document.getElementById('state_name_error').innerHTML = failureMsg;
                    $('#state_name').focus();
                  }
                  else if(errData.errCode == 'errCode') 
                  {
                       $('#state_code').focus();
                      document.getElementById('state_code_error').innerHTML= failureMsg;
                  }
                   else if(errData.errCode == 'errBoth') 
                  {
                      document.getElementById('state_name_error').innerHTML = "Already state exists";
                       $('#state_code').focus();
                      document.getElementById('state_code_error').innerHTML= "Already state code exist";
                  }
                  else {
                      $( "div.failure").html(failureMsg);
                      $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );
                   }                           
            }
        }                      
      });   
    },

    cancelState: function(e) {
    	e.preventDefault();
      appRouter.navigate("managestate", {trigger: true});    	
    },

    nameFocus: function()
  {
        $('#state_name_error').html("");
    
  },
  descriptionFocus: function()
  {
        $('#state_description_error').html("");
    
  },

geoFocus : function()
  {
        $('#geo_error').html("");
    
  },
    countryFocus: function()
  {
        $('#country_error').html("");
    
  },
    codeFocus: function()
  {
        $('#state_code_error').html("");
    
  }
});


