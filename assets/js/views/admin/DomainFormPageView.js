var admin = admin || {};

admin.DomainFormPageView = Backbone.View.extend({

	initialize: function(options) {
    this.fileUploadConfig = {};
		this.mode = options.mode;
		this.domainId = options.id;
		this.template = options.template;
    this.currentDomainRowView = null;
		var _self = this;
		console.log ('mode: ' + this.mode + ' domainId: ' + this.domainId);
		if (new String(this.mode).valueOf() == new String('create').valueOf()) { //Create User Form
      $.when(
            $.ajax({
              type: "GET",
              url: '/geography', //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
              success: function(data) {
                console.log(data);
                _self.geoData = data;
                console.log('geo data :: ' + JSON.stringify(data));
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
             _self.geoCollectionView = new admin.MgmtGeographyCollectionView({
                  el: $( '#selectGeography' ),
                  geoCollection: _self.geoData
            });

        });
		} else { //Edit User Form
			var findGeo = "/findGeoByDomainId/" + this.domainId;
			var findDomain = "/findDomain/" + this.domainId;
			$.when(
				$.ajax({
					type: "GET",
					url: findDomain,
					success: function(data) {
						_self.domainData = data[0];
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
                url: "/findRegbygeostate", //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id    
                success: function(data) {
                  console.log(data);
                  _self.regulations = data;
                  console.log( " _self.regulations ::" + JSON.stringify(_self.regulations));
                  /*if (data.length > 0) {
                    data.forEach(function(item) {                     
                      _self.regMap[item.geography_name] = item;
                    });
                  }*/
                }
            }),    
		        $.ajax({
		          type: "GET",
		          url: '/geography', //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
		          success: function(data) {
		            console.log(data);
		            _self.geoData = data;
		            console.log('geo data :: ' + JSON.stringify(data));
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
		          url: findGeo, //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
		          success: function(data) {
		            console.log(data);
		            _self.selectedGeoData = data;
		            console.log('geo data :: ' + JSON.stringify(data));
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
              url: '/country', //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
              success: function(data) {
                console.log(data);
                _self.countryData = data;
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
                                var failureMsg = "Error while getting Country. Please Contact Administrator.";  
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
              url: '/states', //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
              success: function(data) {
                console.log(data);
                _self.stateData = data;
                console.log('state data :: ' + JSON.stringify(data));
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
                                var failureMsg = "Error while getting state. Please Contact Administrator.";  
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

             _self.geoCollectionView = new admin.UserGeoCollectionView({
                  el: $( '#selectGeography' ),
                 usergeoCollection: _self.regulations,
                 endChain : 'state'
              });
             // _self.geoCollectionView = new admin.MgmtGeographyCollectionView({
             //     	el: $( '#selectGeography' ),
             //      geoCollection: _self.geoData
             //     });
             //  _self.countryCollectionView = new admin.MgmtCountryCollectionView({
             //      el: $( '#selectCountry' ),
             //      countryCollection: _self.countryData
             //  });
             //  _self.stateCollectionView = new admin.MgmtStateCollectionView({
             //      el: $( '#selectState' ),
             //      stateCollection: _self.stateData
             //  });
              _self.domainCollectionView = new admin.domaineditTableView({
                  el: $( '#doc-list-table' ),
                  domainId: _self.domainId
               }); 

                // for(var i=0; i<_self.selectedGeoData.length; i++){
                //     $('#selectGeography option[value=' + _self.selectedGeoData[i].id + ']').prop('selected', true);
                // }
		    });
		}
	},

	events: {
		'click  #save'		: 'saveDomain',
		'click  #cancel'	: 'cancelDomain',
    'click  #backDomain'  : 'backDomain',
    'click  #selectGeography'  : 'geoFocus',
    'click  #selectCountry'   : 'countryFocus',
    'click  #selectState'    : 'stateFocus',
    'click  #domain_name'   : 'domainFocus',
    'click  #domain_description' : 'descriptionFocus'
	},

	render: function() {
		if (new String(this.mode).valueOf() == new String('create').valueOf()) {
			console.log('this.template'); console.log(this.template);
			this.$el.html(this.template);
		} else { //edit
			 this.$el.html(this.template( this.domainData ));
		}
    	console.log('Rendering Edid Domain FormPageView');
		  return this;


	},

	saveDomain: function (e) {
		e.preventDefault();
    var domainFormData = {
            name   : $('#domain_name').val().trim(),
            description  : $('#domain_description').val().trim(),
    };

   

    //-----------------------------------Client Validation Starts---------------------------------------
    document.getElementById('domain_name_error').innerHTML= "";
    document.getElementById('domain_description_error').innerHTML= "";
      var  regex=/^[a-zA-Z\s\&]+$/;
      var regex1=/^[a-zA-Z-\s\&0-9]+$/;

      var stateName = $("#selectState").val();
      console.log("stateName", stateName);
      var countryName = $("#selectCountry").val();
        console.log("countryName", countryName);

    if (new String(this.mode).valueOf() == new String('edit').valueOf()) {
      
      if(countryName == undefined || countryName == ""){
         var selectedCountry =  "null";
        var selectedGeography =  $("#selectGeography").val();
        var selectedState =  $("#selectState").val();
        domainFormData.country_id = 23;
        domainFormData.state_id= parseInt(selectedState, 10);
        domainFormData.geography_id=parseInt(selectedGeography, 10);     
      }
      else if(stateName == undefined || stateName == ""){
        var selectedCountry =  $("#selectCountry").val();
        var selectedGeography =  $("#selectGeography").val();
        var selectedState =  "null";

        domainFormData.country_id = parseInt(selectedCountry, 10);
        domainFormData.state_id= 18;
        domainFormData.geography_id=parseInt(selectedGeography, 10);  
      }
      else{
        var selectedCountry =  $("#selectCountry").val();
        var selectedGeography =  $("#selectGeography").val();
        var selectedState =  $("#selectState").val();

        domainFormData.country_id = parseInt(selectedCountry, 10);
        domainFormData.state_id= parseInt(selectedState, 10);
        domainFormData.geography_id=parseInt(selectedGeography, 10);           
      }
    }

		        //For validation username only, when editing the user
    if ($('#domain_name').val().trim() == '' ) {
        $('#domain_name').focus();
        $('#domain_name').attr('style', 'border-bottom:2px solid #FF0000;');
        document.getElementById('domain_name_error').innerHTML= "Please enter the Domain Name";
        return false;
    }


    if (!regex.test($('#domain_name').val().trim())) {
          $('#domain_name').focus();
          document.getElementById('domain_name_error').innerHTML= "Please provide valid Domain name ";
          return false;
    }

    if ($('#domain_description').val().trim() == '') {
        $('#domain_description').focus();
        $('#domain_description').attr('style', '');
        $('#domain_description').attr('style', 'border-bottom:2px solid #FF0000;');
        // var message = "Email ID is Required";
        document.getElementById('domain_description_error').innerHTML= "Please enter the Domain Description";
        return false;
    }

     if (!regex1.test($('#domain_description').val().trim())) {
          $('#domain_description').focus();
          document.getElementById('domain_description_error').innerHTML= "Please provide valid description ";
          return false;
         }


    if (new String(this.mode).valueOf() == new String('edit').valueOf()) {

       if ($('#selectGeography').val().trim() == '') {
          $('#selectGeography').focus();
          $('#selectGeography').attr('style', '');
          $('#selectGeography').attr('style', 'border-bottom:2px solid #FF0000;');
          document.getElementById('geo_error').innerHTML= "Please select the Geography ";
          return false;
      }

      // else if ($('#selectCountry').val().trim() == '') {
      //     $('#selectCountry').focus();
      //     $('#selectCountry').attr('style', '');
      //     $('#selectCountry').attr('style', 'border-bottom:2px solid #FF0000;');
      //     document.getElementById('country_error').innerHTML= "Please select the country ";
      //     return false;
      // }


      // else if ($('#selectState').val().trim() == '') {
      //     $('#selectState').focus();
      //     $('#selectState').attr('style', '');
      //     $('#selectState').attr('style', 'border-bottom:2px solid #FF0000;');
      //     document.getElementById('state_error').innerHTML= "Please select the State ";
      //     return false;
      // }
    }
		//-----------------------------------Client Validation Ends---------------------------------------
       // var saveDomainUrl = "/createDomain";
        //Set Basic form fields

    // --------------------------old code used for multiselect ----------------------- //
    // var geography_id =  $("#selectGeography").val();
    //   if(geography_id == null){
    //         document.getElementById('geo_error').innerHTML= "Please select Geography(s)";
    //         return false;
    //   }else{
    //         var geos=parseInt(geography_id);
    //    }

		//Set user_id & saveUserUrl based on mode
		if (new String(this.mode).valueOf() == new String('edit').valueOf()) {
			domainFormData.id = parseInt($('#domain_id').val(), 10);
		 	saveDomainUrl = "/updateDomain";
			var successMsg = "Domain Updated Successfully.";
		 	var failureMsg = "Error while updating the Domain. Contact Administrator.";
	  } else {
			saveDomainUrl = "/createDomain";
			var successMsg = "Domain Created Successfully.";
	 	  var failureMsg = "Error while creating the Domain. Contact Administrator.";
	   }
     _self = this;
     console.log(domainFormData);
        $.ajax({
          type 		: "POST",
          url 		: saveDomainUrl, //if create mode then createUser else if edit mode then updateUser
          data 		: domainFormData,
          success	: function(data) {
            console.log(data);
            console.log('User and Subscription Created/Updated.');
           // appRouter.navigate("manageDomain", {trigger: true});
           if (new String(_self.mode).valueOf() == new String('edit').valueOf()) {
              console.log("testing :::::" +JSON.stringify((data)));
              console.log("test");
              _self.domainCollectionView.collection.add(data);

                //_self.domainCollectionView.bind();
            }else{
              $('#cancel').trigger('click');
            }
            $( "div.success" ).html(successMsg);
            $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
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
                            if (errData.errCode == 'errDomain') {
                              document.getElementById('domain_name_error').innerHTML = failureMsg;
                              $('#domain_name').focus();
                            }
                            else if (errData.errCode == 'mapExist') 
                            {
                              //Louis
                               geo_name = $("#selectGeography").find(':selected').text();
                               country_name= $("#selectCountry").find(':selected').text();
                               state_name=$("#selectState").find(':selected').text();
                               failureMsg = "Already exist "+geo_name+","+country_name+","+state_name;
                           
                              document.getElementById('domain_map_error').innerHTML = failureMsg;
                              $('#selectGeography').focus();
                            } 
                            else {
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

    cancelDomain: function(e) {
    	e.preventDefault();
      console.log('Domain Canceled');
      appRouter.navigate("manageDomain", {trigger: true});
    },

    backDomain:function(e){
      e.preventDefault();
      console.log('Domain Canceled');
      appRouter.navigate("manageDomainPage", {trigger: true});

    },

    domainFocus: function() {
      $('#domain_name_error').html("");
    },

    descriptionFocus : function() {
      $('#domain_description_error').html("");
    },

    geoFocus: function(){
      $('#geo_error').html("");
      $('#domain_map_error').html("");
    },

    countryFocus: function() {
      $('#country_error').html("");
      $('#domain_map_error').html("");
    },

    stateFocus : function () {
      $('#state_error').html("");
      $('#domain_map_error').html("");
    }
});


