var admin = admin || {};

admin.CountryFormPageView = Backbone.View.extend({
    
	initialize: function(options) {
		this.mode = options.mode;
		this.countryId = options.id;
		this.template = options.template;
		var _self = this;
		console.log ('mode: ' + this.mode + ' countryId: ' + this.countryId);	
		if (new String(this.mode).valueOf() == new String('create').valueOf()) { //Create User Form
      $.when(
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

             console.log("geo checking" + _self.geoData);
            
            _self.regCollectionView = new admin.MgmtGeographyCollectionView({
              el: $( '#selectGeography' ),
                geoCollection: _self.geoData
              });

        });
		} else { //Edit User Form

    	var findreg = "/findregBycountryId/" + this.countryId;
			var findcountry = "/findcountry/" + this.countryId;
			$.when(
				$.ajax({
					type: "GET",
					url: findcountry,
					success: function(data) {
						_self.countryData = data[0];
             console.log('country data :: ' + JSON.stringify(data));
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

            _self.regCollectionView = new admin.MgmtGeographyCollectionView({
              el: $( '#selectGeography' ),
                geoCollection: _self.geoData
              });
              console.log(_self.countryData.geo_id);

              $('#selectGeography').val(_self.countryData.geo_id);
             
		    });
	   }
	},
			
		
	events: {

		'click  #save'		: 'saveCountry',
		'click  #cancel'	: 'cancelCountry',
    'click  #country_name': 'nameFocus',
    'click  #country_description': 'descriptionFocus',
    'click  #country_code' : 'countryCodeFocus'

	},
	render: function() {
		if (new String(this.mode).valueOf() == new String('create').valueOf()) {
			console.log('this.template'); console.log(this.template);
			this.$el.html(this.template);
		} else { //edit
			this.$el.html(this.template( this.countryData ));
		}
    	console.log('Rendering Edid country FormPageView');
		  return this;		
	},

	saveCountry: function (e) {	
		e.preventDefault();
    document.getElementById('country_name_error').innerHTML= "";
    document.getElementById('country_description_error').innerHTML= "";
    var  regex=/^[a-zA-Z\s]+$/;
   // var  regex1=/^[a-zA-Z\s]+$/;
    var regex1=/^[a-zA-Z-\s0-9]+$/;
    
    var regex2=  /^[a-zA-Z0-9]+$/;
  
    if ($('#country_name').val().trim() == '' ) {
        $('#country_name').focus();
        $('#country_name').attr('style', 'border-bottom:2px solid #FF0000;');
        document.getElementById('country_name_error').innerHTML= "Please enter the Country Name";             
        return false;
    }  
    
     if (!regex.test($('#country_name').val().trim())) {
          $('#country_name').focus();
          document.getElementById('country_name_error').innerHTML= "Please provide valid name ";
          return false;
         }
    if ($('#country_description').val().trim() == '') {
        $('#country_description').focus();
        $('#country_description').attr('style', '');
        $('#country_description').attr('style', 'border-bottom:2px solid #FF0000;');
        document.getElementById('country_description_error').innerHTML= "Please enter the Country Description";            
        return false;
    }

     if (!regex1.test($('#country_description').val().trim())) {
          $('#country_description').focus();
          document.getElementById('country_description_error').innerHTML= "Please provide valid description ";
          return false;
         }

    if (!regex2.test($('#country_code').val())) {
          $('#country_code').focus();
          document.getElementById('country_code_error').innerHTML= "Please provide valid country code";
          return false;
         } 

      var countryFormData = {
        name	       : $('#country_name').val().trim().toUpperCase(),
        description	 : $('#country_description').val().trim(),
        states         : $('#selectstate').val(),
        geography_id   : $('#selectGeography').val(),
        country_code   :$('#country_code').val().trim().toUpperCase()
    	};
		if (new String(this.mode).valueOf() == new String('edit').valueOf()) { 		
			countryFormData.id = parseInt($('#country_id').val(), 10);
		 	savecountryUrl = "/updatecountry";
			var successMsg = "Country Updated Successfully.";
		 	var failureMsg = "Error while updating the Country. Contact Administrator.";		
	  } else {
  			savecountryUrl = "/createcountry";
  			var successMsg = "Country Created Successfully.";
  	 	  var failureMsg = "Error while creating the Country. Contact Administrator.";		
		}		
	
    $.ajax({
      type 		: "POST",
      url 		: savecountryUrl, //if create mode then createUser else if edit mode then updateUser
      data 		: countryFormData,      
      success	: function(data) {          
        $( "div.success" ).html(successMsg);
        $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );   
        appRouter.navigate("managecountry", {trigger: true});           
      },
      error: function(data) {

          var errData = JSON.parse(data.responseText);
          if (errData.errCode == 550) {
              window.location.href = '/sessionExpired';
          } else 
          {
              if (errData.errMsg.length > 0) 
              {
                var failureMsg = errData.errMsg;  
              } 
              else 
              {
                      var failureMsg = "Error occurred while saving the Country. Please Contact Administrator."; 
                }
              if (errData.errCode == 'errcountry') 
              {
                document.getElementById('country_name_error').innerHTML = failureMsg;
                $('#country_name').focus();
              } 
              else if(errData.errCode == 'errCode') 
                  {
                       $('#country_code').focus();
                      document.getElementById('country_code_error').innerHTML= failureMsg;
                  }
                   else if(errData.errCode == 'errBoth') 
                  {
                      document.getElementById('country_name_error').innerHTML = "Already Country exists";
                       $('#country_code').focus();
                      document.getElementById('country_code_error').innerHTML= "Already Country code exist";
                  }
              else 
              {
                  $( "div.failure").html(failureMsg);
                  $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );
               }                           
            }
        }                      
      });   
    },

    cancelCountry: function(e) {
    	e.preventDefault();
      appRouter.navigate("managecountry", {trigger: true});    	
    },

    nameFocus: function()
  {
        $('#country_name_error').html("");
    
  },
  descriptionFocus: function()
  {
        $('#country_description_error').html("");
    
  },

  countryCodeFocus: function()
  {
        $('#country_code_error').html("");
    
  }

});


