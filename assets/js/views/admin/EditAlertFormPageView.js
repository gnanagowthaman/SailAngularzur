var admin = admin || {};

admin.EditAlertFormPageView = Backbone.View.extend({
    
	initialize: function(options) {
    this.alertConfig = {};
		this.mode = options.mode;
		this.alertId = options.id;
		this.template = options.template;
		var _self = this;
		console.log ('mode: ' + this.mode + ' alertId: ' + this.alertId);	
	 
        var findGeo = "/findGeoByAlertId/" + this.alertId;
        var findCountry = "/findCountryByAlertId/" + this.alertId;
        var findState = "/findStateByAlertId/" + this.alertId;
        var findDomain = "/findDomainByAlertId/" + this.alertId;
        var findRegulator = "/findRegulatorByAlertId/" + this.alertId;
        var findRegulation = "/findRegulationByAlertId/" + this.alertId;
        var findAlert = "/findAlert/" + this.alertId;

			 $.when(    

        $.ajax({
          type: "GET",
          url: findAlert,
          success: function(data) {
            _self.alertData = data[0];
            console.log(JSON.stringify(data));
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
                          var failureMsg = "Error while getting the Data. Please Contact Administrator.";  
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
                url: "/findalertbygeo", //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id    
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
                            var failureMsg = "Error while fetching the Data. Please Contact Administrator.";  
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
              url: findCountry, //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
              success: function(data) {
                console.log(data);
                _self.selectedCountryData = data;
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
                            var failureMsg = "Error while fetching the Data. Please Contact Administrator.";  
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
              url: "/countries",
              success: function(data) {
                console.log(data);
                _self.countryData = data;
              },
              error: function(data) {
                          var errData = JSON.parse(data.responseText);
                          if ( errData.errCode == 550) {
                              window.location.href = '/sessionExpired';
                          } else {
                              if (errData.errMsg.length > 0) {
                                var failureMsg = errData.errMsg;  
                              } else {
                                var failureMsg = "Error while fetching data From country. Please Contact Administrator.";  
                              }
                                $( "div.failure").html(failureMsg);
                                $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 ); 
                            }             
                      }
            }),

            $.ajax({
              type: "GET",
              url: findState, //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
              success: function(data) {
                console.log(data);
                _self.selectedStateData = data;
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
                            var failureMsg = "Error while fetching the Data. Please Contact Administrator.";  
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
              url: "/stateAlert",
              success: function(data) {
                console.log(data);
                _self.stateData = data;
              },
              error: function(data) {
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
                      }
            }),

             $.ajax({
              type: "GET",
              url: findDomain, //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
              success: function(data) {
                console.log(data);
                _self.selectedDomainData = data;
                console.log('domain data :: ' + JSON.stringify(data));
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
                            var failureMsg = "Error while fetching the Data. Please Contact Administrator.";  
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
            url: "/activeDomain",
            success: function(data) {
              console.log(data);
              _self.domainData = data;
            },
            error: function(data) {
                        var errData = JSON.parse(data.responseText);
                        if ( errData.errCode == 550) {
                            window.location.href = '/sessionExpired';
                        } else {
                            if (errData.errMsg.length > 0) {
                              var failureMsg = errData.errMsg;  
                            } else {
                              var failureMsg = "Error while fetching data From domain. Please Contact Administrator.";  
                            }
                              $( "div.failure").html(failureMsg);
                              $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 ); 
                          }             
                    }
          }),

          $.ajax({
              type: "GET",
              url: findRegulator, //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
              success: function(data) {
                console.log(data);
                _self.selectedRegulatorData = data;
                console.log('Regulator data :: ' + JSON.stringify(data));
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
                            var failureMsg = "Error while fetching the Data. Please Contact Administrator.";  
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
            url: "/regulator",
            success: function(data) {
              console.log(data);
              _self.regulatorData = data;
            },
            error: function(data) {
                        var errData = JSON.parse(data.responseText);
                        if ( errData.errCode == 550) {
                            window.location.href = '/sessionExpired';
                        } else {
                            if (errData.errMsg.length > 0) {
                              var failureMsg = errData.errMsg;  
                            } else {
                              var failureMsg = "Error while fetching data From regulator. Please Contact Administrator.";  
                            }
                              $( "div.failure").html(failureMsg);
                              $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 ); 
                          }             
                    }
          }),

           $.ajax({
              type: "GET",
              url: findRegulation, //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
              success: function(data) {
                console.log(data);
                _self.selectedRegulationData = data;
                console.log('data :: ' + JSON.stringify(data));
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
                            var failureMsg = "Error while fetching the Data. Please Contact Administrator.";  
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
            url: "/regulationAlert",
            success: function(data) {
              console.log(data);
              _self.regData = data;
            },
            error: function(data) {
                        var errData = JSON.parse(data.responseText);
                        if ( errData.errCode == 550) {
                            window.location.href = '/sessionExpired';
                        } else {
                            if (errData.errMsg.length > 0) {
                              var failureMsg = errData.errMsg;  
                            } else {
                              var failureMsg = "Error while fetching data From regulation. Please Contact Administrator.";  
                            }
                              $( "div.failure").html(failureMsg);
                              $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 ); 
                          }             
                    }
          })

        ).done(function () {
             _self.render();

             _self.geoCollectionView = new admin.AlertGeoCollectionView({
                  el: $( '#selectGeography' ),
                 usergeoCollection: _self.regulations
              });

            _self.geoCollectionView.disabledElement();
            
         /*   _self.domainCollectionView = new admin.MgmtDomainCollectionView({
              el: $( '#selectDomain' ),
                domainCollection: _self.domainData
              });
             _self.regulatorCollectionView = new admin.MgmtRegulatorCollectionView({
              el: $( '#selectRegulator' ),
                regulatorCollection: _self.regulatorData
              });
             _self.regulationCollectionView = new admin.MgmtRegulationAlertCollectionView({
              el: $( '#selectRegulation' ),
                regCollection: _self.regData
              });*
         
              _self.countryCollectionView = new admin.MgmtCountryCollectionView({
                  el: $( '#selectCountry' ),
                  countryCollection: _self.countryData
              });

              _self.stateCollectionView = new admin.MgmtStateCollectionView({
                  el: $( '#selectState'),
                  stateCollection: _self.stateData
              });  */

              
            for(var i=0; i<_self.selectedGeoData.length; i++){
                  $('#selectGeography option[value=' + _self.selectedGeoData[i].id + ']').prop('selected', true);
                  $('#selectGeography option[value=' + _self.selectedGeoData[i].id + ']').trigger('change');
            }

            for(var i=0; i<_self.selectedCountryData.length; i++){
                    $('#selectCountry option[value=' + _self.selectedCountryData[i].id + ']').prop('selected', true);
                    $('#selectCountry option[value=' + _self.selectedCountryData[i].id + ']').trigger('change');
            }

            for(var i=0; i<_self.selectedStateData.length; i++){
                    $('#selectState option[value=' + _self.selectedStateData[i].id + ']').prop('selected', true);
                    $('#selectState option[value=' + _self.selectedStateData[i].id + ']').trigger('change');
            }

            for(var i=0; i<_self.selectedDomainData.length; i++){
                    $('#selectDomain option[value=' + _self.selectedDomainData[i].id + ']').prop('selected', true);
                     $('#selectDomain option[value=' + _self.selectedDomainData[i].id + ']').trigger('change');
            }

            for(var i=0; i<_self.selectedRegulatorData.length; i++){
                    $('#selectRegulator option[value=' + _self.selectedRegulatorData[i].id + ']').prop('selected', true);
                     $('#selectRegulator option[value=' + _self.selectedRegulatorData[i].id + ']').trigger('change');
            }

            for(var i=0; i<_self.selectedRegulationData.length; i++){
                    $('#selectRegulation option[value=' + _self.selectedRegulationData[i].id + ']').prop('selected', true);
                     $('#selectRegulation option[value=' + _self.selectedRegulationData[i].id + ']').trigger('change');
            }

        });

	},
			
		
	events: {

		 'click  #saveAlert'		: 'saveAlert',
		 'click  #cancelAlert'	: 'cancelAlert',
     'change .getImageName'      :'imageNameShow',
    // 'change .getImageNameSms'      :'imageNameShowSms',
     'change .getImageNameWeb'      :'imageNameShowWeb',
     'click  #selectGeography'  : 'geoFocus',
     'click  #selectCountry'   : 'countryFocus',
     'click  #selectState'    : 'stateFocus',
     'click  #selectDomain'   : 'domainFocus',
     'click  #alertText'      : 'alertFocus'
	},
	render: function() {

      console.log(this.alertData);
			this.$el.html(this.template( this.alertData ));
      $("#alertText").val(this.alertData.message);
		
    	console.log('Rendering Edit FormPageView');
		  return this;		
	},

  imageNameShow:function(){
        var showImageName = document.getElementById('uploadFile').files[0];       
        var namechange = showImageName.name;
        $('#selectFile').empty();
        console.log(namechange);
        document.getElementById('selectFile').value = namechange;
        $('#selectFile').prop('readonly',true);
  },

  
  imageNameShowWeb:function(){
        var showImageName = document.getElementById('uploadFileWeb').files[0];       
        var namechange = showImageName.name;
        $('#selectFileWeb').empty();
        console.log(namechange);
        document.getElementById('selectFileWeb').value = namechange;
        $('#selectFileWeb').prop('readonly',true);
  },

  imageNameShowSms:function(){
        var showImageName = document.getElementById('uploadFileSms').files[0];       
        var namechange = showImageName.name;
        $('#selectFileSms').empty();
        console.log(namechange);
        document.getElementById('selectFileSms').value = namechange;
        $('#selectFileSms').prop('readonly',true);
  },
  saveAlert: function(e){

    e.preventDefault();
    document.getElementById('alert_name_error').innerHTML= "";


    var alertId = "";

     if( appRouter.currentView.alertConfig.regulationIds != undefined )
        alertId = JSON.stringify(appRouter.currentView.alertConfig.regulationIds);
     else
       alertId = JSON.stringify(appRouter.currentView.alertConfig.domainIds);
     
    console.log(alertId);
    
    
       if ($('#alertText').val().trim() == '' ) {
        $('#alertText').focus();
        $('#alertText').attr('style', 'border-bottom:2px solid #FF0000;');
        document.getElementById('alert_name_error').innerHTML= "Please enter the Alert Text";
        return false;
    }
    var geography_id =  $("#selectGeography").val();
      if(geography_id == null){
            document.getElementById('geo_error').innerHTML= "Please select Geography(s)";
            return false;
      }else{
            var geos=parseInt(geography_id, 10);
            console.log(geos);
       }

    var country_id =  $("#selectCountry").val();
      if(country_id == null){
            document.getElementById('country_error').innerHTML= "Please select Country(s)";
            return false;
      }else{
            var country=parseInt(country_id, 10);
       }

    var state_id =  $("#selectState").val();
      if(state_id == null){
            document.getElementById('state_error').innerHTML= "Please select State(s)";
            return false;
      }else{
            var state=parseInt(state_id,10);
       }

     var domain_id =  $("#selectDomain").val();
      if(domain_id == null){
            document.getElementById('domain_error').innerHTML= "Please select Domain(s)";
            return false;
      }else{
            var domain=parseInt(domain_id, 10);
       }

    var regulator_id =  $("#selectRegulator").val();
     var regulator=parseInt(regulator_id, 10);

    var regulation_id =  $("#selectRegulation").val();
    var regulation=parseInt(regulation_id, 10);

    //Set Geography Array
    // var geographies = [];   
    //   $('input', '#user-geo').each(function () {
    //     if ($(this).prop('checked')) {
    //       var geoName = $(this).val().toUpperCase();
    //       geographies.push(geoName);
    //     }
    //   });  

      // var geographies = [];   
      // var geoName = $('#selectGeography').val();
      // console.log(geoName);

    var _self = this;
    var file = document.getElementById('uploadFile').files[0];
    console.log(file);

    // var sms = document.getElementById('uploadFileSms').files[0];
    // console.log(sms);

    var web = document.getElementById('uploadFileWeb').files[0];
    console.log(web);

     var path = '/' + $('#selectGeography').val() + $('#selectCountry').val() + $('#selectDomain').val();
     console.log("path",path); 

     // var smspath = '/' + $('#selectGeography').val() + $('#selectCountry').val() + $('#selectDomain').val();
     // console.log("smspath",smspath); 

     var webpath = '/' + $('#selectGeography').val() + $('#selectCountry').val() + $('#selectDomain').val();
     console.log("webpath",webpath);         

      var formData = new FormData();

      if((file == undefined) && (web == undefined)){
          formData.append('message',$('#alertText').val().trim());
   //       formData.append('geographies', geographies);   for sow
          formData.append('alertId', alertId);
          formData.append('email', 0);
          //formData.append('sms', 0); 
          formData.append('web', 0);
      } 
      else if(file == undefined){
          formData.append('message',$('#alertText').val().trim());
          formData.append('alertId', alertId);
          // formData.append('smspath', smspath);
          // formData.append('smsfilename', sms.name);
          // formData.append('uploadFileSms', sms, sms.name);
          formData.append('webpath', webpath);
          formData.append('webfilename', web.name);
          formData.append('uploadFileWeb', web, web.name);
          formData.append('email', 0);
         // formData.append('sms', 1);
          formData.append('web', 1);
      }
      else if(web == undefined){
          formData.append('message',$('#alertText').val().trim());
          formData.append('alertId', alertId);
          formData.append('path', path);
          formData.append('filename', file.name);
          formData.append('uploadFile', file, file.name);
          // formData.append('smspath', smspath);
          // formData.append('smsfilename', sms.name);
          // formData.append('uploadFileSms', sms, sms.name);
          formData.append('email', 0 );
          //formData.append('sms', 1);
          formData.append('web', 0);
      }
      else {
          formData.append('message',$('#alertText').val().trim());
          formData.append('alertId', alertId);
          formData.append('path', path);
          formData.append('filename', file.name);
          formData.append('uploadFile', file, file.name);
          // formData.append('smspath', smspath);
          // formData.append('smsfilename', sms.name);
          // formData.append('uploadFileSms', sms, sms.name);
          formData.append('webpath', webpath);
          formData.append('webfilename', web.name);
          formData.append('uploadFileWeb', web, web.name);
          formData.append('email', 1);
          //formData.append('sms', 1);
          formData.append('web', 1);

      }

      var recId = parseInt($('#alert_id').val(), 10);
      formData.append('recId >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ',recId);
  
          console.log("alert "+ JSON.stringify(formData));
          formData.id = parseInt($('#alert_id').val(), 10);
          saveAlertUrl = "/editAlert";
          var successMsg = "Alert Updated Successfully.";
          var failureMsg = "Error while updating the Alert. Contact Administrator.";
  
        //console.log(file.name);
        //console.log(sms.name);
        console.log(formData);
        console.log(formData.id);
        $.ajax({
          type    : "POST",
          url     : saveAlertUrl, //if create mode then createUser else if edit mode then updateUser
          data    : formData,
          cache: false,           
          contentType: false,
          processData: false,        

          success : function(data) { 
            console.log("file uploaded");    
            console.log(data);     
             window.alertText = $("#alertText").val();
             console.log(window.alertText);
            $( "div.success" ).html(successMsg);
            $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 ); 
            _self.sentAlertNotification(recId);  
            appRouter.navigate("managealert", {trigger: true});           

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
                                var failureMsg = "Error occurred while saving the alerts. Please Contact Administrator."; 
                             }
                            
                              $( "div.failure").html(failureMsg);
                              $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );
                                         
                          }
                    }catch(e) {
                        window.location.href = '/sessionExpired';
                     }
                }                      

        });   
  },


  cancelAlert: function(e) {
      e.preventDefault();
      appRouter.navigate("managealert", {trigger: true}); 
  }, 

  sentAlertNotification: function(recId) {      
    var file = document.getElementById('uploadFile').files[0];
    console.log(file);

    // var sms = document.getElementById('uploadFileSms').files[0];
    // console.log(sms);

    var web = document.getElementById('uploadFileWeb').files[0];
    console.log(web);

     var path = '/' + $('#selectGeography').val() + $('#selectCountry').val() + $('#selectDomain').val();
     console.log("path",path); 

     // var smspath = '/' + $('#selectGeography').val() + $('#selectCountry').val() + $('#selectDomain').val();
     // console.log("smspath",smspath); 

     var webpath = '/' + $('#selectGeography').val() + $('#selectCountry').val() + $('#selectDomain').val();
     console.log("webpath",webpath);         

      var alertFormData = {
        alertText      : $('#alertText').val().trim(),
        geography_id   : $('#selectGeography').val(),
        country_id     : $('#selectCountry').val(),
        domain_id      : $('#selectDomain').val(),
        regulator_id   : $('#selectRegulator').val(),
        regulation_id  : $('#selectRegulation').val(),
        emailpath      : path,
        email          : $('#uploadFile').val(),
        web            : $('#uploadFileWeb').val(),
        alertMapId     : recId 
      };      
      console.log("alertFormData",alertFormData);               
               
      $.ajax({
        type    : "POST",
        url     : "/alertnotification",
        data    : alertFormData,      
        success : function(data) { 
         // appRouter.navigate("managealert", {trigger: true});     
         console.log("success");      
        }                     
    });  

  },

  geoFocus: function(){
      $('#geo_error').html("");
    },

    countryFocus: function() {
      $('#country_error').html("");
    },

    stateFocus : function () {
      $('#state_error').html("");
    },

    domainFocus: function () {
      $('#domain_error').html("");
    },

    alertFocus : function() {
      $('#alert_name_error').html("");
    }
});


