var admin = admin || {};

admin.GeoFormPageView = Backbone.View.extend({
    
	initialize: function(options) {
		this.mode = options.mode;
		this.geoId = options.id;
		this.template = options.template;
		var _self = this;
		console.log ('mode: ' + this.mode + ' geoId: ' + this.geoId);	
		if (new String(this.mode).valueOf() == new String('create').valueOf()) { //Create User Form
      $.when(
            $.ajax({
              type: "GET",
              url: '/regulations', //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
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
                              var failureMsg = "Error while fetching regulations. Please Contact Administrator.";  
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
			var findreg = "/findregBygeoId/" + this.geoId;
			var findgeo = "/findgeo/" + this.geoId;
			$.when(
				$.ajax({
					type: "GET",
					url: findgeo,
					success: function(data) {
						_self.geoData = data[0];
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
                          var failureMsg = "Error while fetching geography. Please Contact Administrator.";  
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
		          url: '/regulations', //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id
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
                            var failureMsg = "Error while fetching regulations. Please Contact Administrator.";  
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
                            var failureMsg = "Error while fetching regulations. Please Contact Administrator.";  
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

             /*
             _self.regCollectionView = new admin.MgmtRegulationCollectionView({
              el: $( '#selectRegulation' ),
                regCollection: _self.regData
              });
              for(var i=0; i<_self.selectedregData.length; i++){
                $('#selectRegulation option[value=' + _self.selectedregData[i].id + ']').prop('selected', true);
              }
              */
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
		          type: "GET",
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
		'click  #save'		: 'saveGeo',
		'click  #cancel'	: 'cancelGeo',
    'click  #geo_name': 'nameFocus',
    'click  #geo_description': 'descriptionFocus'
	},
	render: function() {
		if (new String(this.mode).valueOf() == new String('create').valueOf()) {
			console.log('this.template'); console.log(this.template);
			this.$el.html(this.template);
		} else { //edit
			this.$el.html(this.template( this.geoData ));
		}
    	console.log('Rendering Edid geo FormPageView');
		  return this;		
	},

	saveGeo: function (e) {	
		e.preventDefault();
    var geoFormData = {
        name         : $('#geo_name').val().trim(),
        description  : $('#geo_description').val().trim(),
        //regs         : $('#selectRegulation').val()
      };
    document.getElementById('geo_name_error').innerHTML= "";
    document.getElementById('geo_description_error').innerHTML= "";
    // var  regex=/^[a-zA-Z\s]+$/;
     var regex1=/^[a-zA-Z-\s0-9]+$/;

    if ($('#geo_name').val().trim() == '' ) {
        $('#geo_name').focus();
        $('#geo_name').attr('style', 'border-bottom:2px solid #FF0000;');
        document.getElementById('geo_name_error').innerHTML= "Please enter the Geography Name";             
        return false;
    }  
    // if (!regex.test($('#geo_name').val().trim())) {
    //       $('#geo_name').focus();
    //       document.getElementById('geo_name_error').innerHTML= "Please provide valid Geography name ";
    //       return false;
    // }  
    if ($('#geo_description').val().trim() == '') {
        $('#geo_description').focus();
        $('#geo_description').attr('style', '');
        $('#geo_description').attr('style', 'border-bottom:2px solid #FF0000;');
        document.getElementById('geo_description_error').innerHTML= "Please enter the Geography Description";            
        return false;
    }
     if (!regex1.test($('#geo_description').val().trim())) {
          $('#geo_description').focus();
          document.getElementById('geo_description_error').innerHTML= "Please provide valid description ";
          return false;
         }
      
		if (new String(this.mode).valueOf() == new String('edit').valueOf()) { 		
			geoFormData.id = parseInt($('#geo_id').val(), 10);
		 	saveGeoUrl = "/updateGeo";
			var successMsg = "Geography Updated Successfully.";
		 //	var failureMsg = "Error while updating the Geography. Contact Administrator.";	
     //==================================================================================
     // var failureMsg = "Geography Already Exist"; 
     //  document.getElementById('geo_name_error').innerHTML = failureMsg;//<------>//
  //========================================================================================	
	  } else {
  			saveGeoUrl = "/createGeo";
  			var successMsg = "Geography Created Successfully.";
  	 	  var failureMsg = "Error while creating the Geography. Contact Administrator.";		
		}		
	
    $.ajax({
      type 		: "POST",
      url 		: saveGeoUrl, //if create mode then createUser else if edit mode then updateUser
      data 		: geoFormData,      
      success	: function(data) {          
        $( "div.success" ).html(successMsg);
        $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );   
        appRouter.navigate("manageGeo", {trigger: true});           
      },
      error: function(data) {
          var errData = JSON.parse(data.responseText);
          if (errData.errCode == 550) {
              window.location.href = '/sessionExpired';
          } else {
              if (errData.errMsg.length > 0) {
                var failureMsg = errData.errMsg;  
              } else {
                      var failureMsg = "Error occurred while saving the Geography. Please Contact Administrator."; 
                }
                  if (errData.errCode == 'errgeo') {
                    document.getElementById('geo_name_error').innerHTML = failureMsg;
                    $('#geo_name').focus();
                  } else {
                      $( "div.failure").html(failureMsg);
                      $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );
                   }                           
            }
        }                      
      });   
    },
    cancelGeo: function(e) {
    	e.preventDefault();
      appRouter.navigate("manageGeo", {trigger: true});    	
    },

    nameFocus: function()
  {
        $('#geo_name_error').html("");
    
  },
  descriptionFocus: function()
  {
        $('#geo_description_error').html("");
    
  }


});


