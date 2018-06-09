var admin = admin || {};

admin.RegulationFormPageView = Backbone.View.extend({

	initialize: function(options) {
		this.fileUploadConfig = {};
		this.mode = options.mode;
		this.regulationId = options.id;
		this.template = options.template;
		var _self = this;
		console.log ('mode: ' + this.mode + ' regId: ' + this.regulationId);
		if (new String(this.mode).valueOf() == new String('create').valueOf()) {
			_self.render();
			// $.when(
			// 	$.ajax({
			// 	    type: "GET",
			// 	    url: "/documents",
			// 	    success: function(data) {
			// 	    	console.log(data);
			// 	    	_self.documentData = data;
			//     	},
			//     	error: function(data) {
			//     		try{
	  //                       var errData = JSON.parse(data.responseText);
	  //                       if ( errData.errCode == 550) {
	  //                           window.location.href = '/sessionExpired';
	  //                       } else {
	  //                           if (errData.errMsg.length > 0) {
	  //                             var failureMsg = errData.errMsg;  
	  //                           } else {
	  //                             	var failureMsg = "Error while fetching data. Please Contact Administrator.";  
	  //                           }
	  //                           $( "div.failure").html(failureMsg);
	  //                           $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
   //                  		 }
   //                  	}catch(e) {
   //                      	window.location.href = '/sessionExpired';
   //                  	 }
   //              	}
			//     }),

			// 	$.ajax({		
			// 	    type: "GET",
			// 	    url: "/domains",
			// 	    success: function(data) {
			// 		    console.log(data);
			// 		    _self.domainData = data;
			// 	    },
			// 	    error: function(data) {
			// 	    	try{
	  //                       var errData = JSON.parse(data.responseText);
	  //                       if ( errData.errCode == 550) {
	  //                           window.location.href = '/sessionExpired';
	  //                       } else {
	  //                           if (errData.errMsg.length > 0) {
	  //                             var failureMsg = errData.errMsg;  
	  //                           } else {
	  //                             	var failureMsg = "Error while fetching data. Please Contact Administrator.";  
	  //                            }
		 //                            $( "div.failure").html(failureMsg);
		 //                            $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
   //                 		 	 }
   //                 		}catch(e){
   //          				window.location.href = '/sessionExpired';
   //     					 } 
   //             		}
			//     }),
			// 		$.ajax({
			// 	    type: "GET",
			// 	    url: "/geographys",
			// 	    success: function(data) {
			// 		    console.log(data);
			// 		    _self.geoData = data;
			// 	    },
			// 	    error: function(data) {
   //                      var errData = JSON.parse(data.responseText);
   //                      if ( errData.errCode == 550) {
   //                          window.location.href = '/sessionExpired';
   //                      } else {
   //                          if (errData.errMsg.length > 0) {
   //                            var failureMsg = errData.errMsg;  
   //                          } else {
   //                  	        var failureMsg = "Error while fetching data From Geography. Please Contact Administrator.";  
   //                          }
   //                          	$( "div.failure").html(failureMsg);
   //                          	$( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 ); 
   //                        }             
   //                  }
			//     })
			// ).done(function () {
			// 	_self.render();
			// 	_self.docCollectionView = new admin.MgmtDocumentCollectionView({
			// 		el: $( '#selectDocument' ),
			// 		docCollection: _self.documentData
			// 	});
			// 	_self.domainCollectionView = new admin.MgmtDomainCollectionView({
			// 	    el: $( '#selectDomain' ),
			// 		domainCollection: _self.domainData
			// 	});

			// 	_self.geoCollectionView = new admin.MgmtGeographyCollectionView({
			// 	    el: $( '#selectGeography' ),
			// 		geoCollection: _self.geoData
			// 	});
										
			// });

		} else { //Edit User Form
			var findRegulation = "/findRegulation/" + this.regulationId;
			var findDomains = "/findDomains/" + this.regulationId;
			var findgeographys = "/findGeographys/" + this.regulationId;
			var findReggeodomdoc = "/findReggeodomdoc/" + this.regulationId;
			//var finDocByRegulationId = "/finDocByRegulationId/" + this.regulationId;
			//var finDomainByRegulationId = "/finDomainByRegulationId/" + this.regulationId;
			//var fingeoByRegulationId = "/fingeoByRegulationId/" + this.regulationId;
			$.when(
				$.ajax({
		          type: "GET",
		          url: findReggeodomdoc,
		          success: function(data) {
		            _self.reggeodomdocData = data;
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
                    }catch(e){
            			window.location.href = '/sessionExpired';
       				 }            
                   }
		        }),				
				$.ajax({
		          type: "GET",
		          url: "/documents",
		          success: function(data) {
		            _self.documentData = data;
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
                    }catch(e){
			            window.location.href = '/sessionExpired';
			        }            
                  }
		        }),
				$.ajax({
					type: "GET",
					url: findRegulation,
					success: function(data) {
						_self.regData = data[0];
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
                        }catch(e){
				            window.location.href = '/sessionExpired';
				        }       
                    }
				}),
				$.ajax({
		          type: "GET",
		          url: "/domains",
		          success: function(data) {
		            _self.domainData = data;		            
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
                    } catch(e){
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
		          url: "/geographys",
		          success: function(data) {
		            console.log("geographys :: "+ JSON.stringify(data));
		            _self.geoData = data;
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
                    }catch(e){
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
				    url: "/firstLevelSubDoctype",
				    success: function(data) {
					    console.log('firstLevelSubDoctype: ', data);
					    _self.subDocData = data;
				    },
				    error: function(data) {
              var errData = JSON.parse(data.responseText);
              if ( errData.errCode == 550) {
                  window.location.href = '/sessionExpired';
              } else {
                  if (errData.errMsg.length > 0) {
                    var failureMsg = errData.errMsg;  
                  } else {
          	        var failureMsg = "Error while fetching data From subDocument. Please Contact Administrator.";  
                  }
                  	$( "div.failure").html(failureMsg);
                  	$( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 ); 
              }             
            }
			  })     

			).done(function () {

				  console.log(" domain data >>>>>>>>>> "+JSON.stringify(_self.domainData));

				_self.render();
				// _self.docCollectionView = new admin.MgmtDocumentCollectionView({
					_self.docCollectionView = new admin.RegDocumentCollectionView({
					el: $( '#selectDocument' ),
					docCollection: _self.documentData,
					endChain : "subDocument"
				});

				_self.docCollectionView.subDocCollection = _self.subDocData;

			/*	_self.domainCollectionView = new admin.MgmtDomainCollectionView({
				    el: $( '#selectDomain' ),
					domainCollection: _self.domainData
				});*/

			
				 _self.regulations.domainCollection = _self.domainData;

				_self.geoCollectionView = new admin.UserGeoCollectionView({
                  el: $( '#selectGeography' ),
                 usergeoCollection: _self.regulations,
                 endChain : 'domain'
               });
				_self.geoCollectionView.disabledElement();

				// _self.geoCollectionView = new admin.MgmtGeographyCollectionView({
				// 	el: $( '#selectGeography' ),
				// 	geoCollection: _self.geoData
				// });
				_self.regulatorCollectionView = new admin.MgmtRegulatorCollectionView({
					el: $( '#selectRegulator' ),
					regulatorCollection: _self.regulatorData
				});


				/*_self.subDocCollectionView = new admin.MgmtSubDocCollectionView({
				    el: $( '#selectsubDocument' ),
					subDocCollection: _self.subDocData
				});*/


			    _self.regCollectionView = new admin.regulationeditTableView({
					el: $( '#doc-list-table' ),
					regId: _self.regulationId
				});	
			 
				
									
		    });
		}
	},

	events: {
		'click  #saveRegulation'  : 'saveRegulation',
		'click  #cancelRegulation' : 'cancelRegulation',
		'click  #backregulation' :'backregulation',
		'click   #selectGeography' : 'geoFocus',
		'click  #selectCountry'	  : 'countryFocus',
		'click  #selectState'     : 'stateFocus',
		'click  #reg_name'     : 'regNameFocus',
		'click  #selectDomain'     : 'domainFocus',
		'click  #selectRegulator'     : 'regulatorFocus',
		'click  #selectDocument'     : 'documentFocus',
		'click  #selectsubDocument'     : 'subdocumentFocus'

	},

	render: function() {
		if (new String(this.mode).valueOf() == new String('create').valueOf()) {
			console.log('this.template'); console.log(this.template);
			this.$el.html(this.template);
		} else { //edit
			this.$el.html(this.template( this.regData ));
		}
		return this;
	},

	findLastSubDocID: function() {
		var isSubDocFound = false;
		var subDocId = 10;
		var reverseArray = [].reverse.call($('#subdocgroup').find('select'));
		console.log('reverseArray', reverseArray);
		$(reverseArray).each(function() {
			if (!isSubDocFound) {
				var selectedSubDocId = $(this).children("option").filter(":selected").val();
				console.log('selectedSubDocId', selectedSubDocId);
				if (selectedSubDocId != '' && selectedSubDocId != undefined) {
					subDocId = selectedSubDocId;
					isSubDocFound = true;
				}
			}
		});
		return subDocId;
	},

	saveRegulation : function (e) {
		e.preventDefault();		
        var regFormData = {
				name	 : $('#reg_name').val().trim(),
				description	 : $('#reg_description').val().trim(),
			   // regulator :$('#regulator_name').val().trim(),
		};
		

        //-----------------------------------Client Validation Starts---------------------------------------
        document.getElementById('reg_name_error').innerHTML= "";
        document.getElementById('reg_desc_error').innerHTML= "";
        document.getElementById('reg_status_error').innerHTML= "";

        var  regex=/^[a-zA-Z\s\-]+$/;
        var regex1=/^[a-zA-Z-\s\-0-9]+$/;
        // var lastSubDocName = $('#regulationUpdate').find('select').last().find('option:selected').val(); 
        var lastSubDocId = this.findLastSubDocID();
        console.log('lastSubDocId: ', lastSubDocId);
        var subDocName = $("#selectsubDocument option:selected").val();
        var countryName = $("#selectCountry").val();
        var statename = $("#selectState option:selected").val();
        console.log("subDocName", subDocName);
		if (new String(this.mode).valueOf() == new String('edit').valueOf()) {
		if((countryName == "" || countryName == undefined) && (subDocName == "" || subDocName == undefined)) {
		  	console.log("country subDocName triggers");
	  		var selectedDocument =  $("#selectDocument").val();
			var selectedDomain =  $("#selectDomain").val();
			var selectedGeography =  $("#selectGeography").val();
			var selectedCountry =  "null";
			var selectedState =   $("#selectState").val();
			var selectedRegulator =  $("#selectRegulator").val();
			var selectedSubDocument =  "null";
			var selectedRegstatus =  $("#selectregstatus").val();
			regFormData.document_id = parseInt(selectedDocument, 10);
			regFormData.domain_id= parseInt(selectedDomain, 10);
			regFormData.geography_id=parseInt(selectedGeography, 10);	
			regFormData.country_id=23;	
			regFormData.state_id=parseInt(selectedState, 10);;
			regFormData.regulator_id=parseInt(selectedRegulator, 10);		
			regFormData.sub_document_id=10;
			regFormData.Regstatus = parseInt(selectedRegstatus,10);
		  }
		  else if(countryName == "" || countryName == undefined){
			console.log("countryName triggers");
			var selectedDocument =  $("#selectDocument").val();
			var selectedDomain =  $("#selectDomain").val();
			var selectedGeography =  $("#selectGeography").val();
			var selectedCountry =  "null";
			var selectedState =  $("#selectState").val();
			var selectedRegulator =  $("#selectRegulator").val();
			var selectedSubDocument =  $('#regulationUpdate').find('select :last').val();
			var selectedRegstatus =  $("#selectregstatus").val();
			regFormData.document_id = parseInt(selectedDocument, 10);
			regFormData.domain_id= parseInt(selectedDomain, 10);
			regFormData.geography_id=parseInt(selectedGeography, 10);	
			regFormData.country_id=23;	
			regFormData.state_id=parseInt(selectedState, 10);
			regFormData.regulator_id=parseInt(selectedRegulator, 10);		
			regFormData.sub_document_id=parseInt(lastSubDocId, 10);	
			regFormData.Regstatus = parseInt(selectedRegstatus,10);
		  }
		  else if((statename == "" || statename == undefined) && (subDocName == "" || subDocName == undefined) ){
		  	console.log("sub doc & state triggers");
		  	var selectedDocument =  $("#selectDocument").val();
			var selectedDomain =  $("#selectDomain").val();
			var selectedGeography =  $("#selectGeography").val();
			var selectedCountry =  $("#selectCountry").val();
			var selectedState =  "null";
			var selectedRegulator =  $("#selectRegulator").val();
			var selectedRegstatus =  $("#selectregstatus").val();
			var selectedSubDocument =  "null";
			regFormData.document_id = parseInt(selectedDocument, 10);
			regFormData.domain_id= parseInt(selectedDomain, 10);
			regFormData.geography_id=parseInt(selectedGeography, 10);	
			regFormData.country_id=parseInt(selectedCountry, 10);	
			regFormData.state_id=18;
			regFormData.regulator_id=parseInt(selectedRegulator, 10);
			regFormData.sub_document_id=10;	
			regFormData.Regstatus = parseInt(selectedRegstatus,10);	
			}
			else if(statename == "" || statename == undefined){
				console.log("state triggers");
				var selectedDocument =  $("#selectDocument").val();
				var selectedDomain =  $("#selectDomain").val();
				var selectedGeography =  $("#selectGeography").val();
				var selectedCountry =  $("#selectCountry").val();
				var selectedState =  "null";
				var selectedRegulator =  $("#selectRegulator").val();
				var selectedSubDocument =  $('#regulationUpdate').find('select :last').val();
				var selectedRegstatus =  $("#selectregstatus").val();
				regFormData.document_id = parseInt(selectedDocument, 10);
				regFormData.domain_id= parseInt(selectedDomain, 10);
				regFormData.geography_id=parseInt(selectedGeography, 10);	
				regFormData.country_id=parseInt(selectedCountry, 10);	
				regFormData.state_id=18;
				regFormData.regulator_id=parseInt(selectedRegulator, 10);		
				regFormData.sub_document_id=parseInt(lastSubDocId, 10);
				regFormData.Regstatus = parseInt(selectedRegstatus,10);
			}
			else if(subDocName == "" || subDocName == undefined) {
				console.log("subdoc triggers");
				var selectedDocument =  $("#selectDocument").val();
				var selectedDomain =  $("#selectDomain").val();
				var selectedGeography =  $("#selectGeography").val();
				var selectedCountry =  $("#selectCountry").val();
				var selectedState =   $("#selectState").val();
				var selectedRegulator =  $("#selectRegulator").val();
				var selectedSubDocument =  "null";
				var selectedRegstatus =  $("#selectregstatus").val();
				regFormData.document_id = parseInt(selectedDocument, 10);
				regFormData.domain_id= parseInt(selectedDomain, 10);
				regFormData.geography_id=parseInt(selectedGeography, 10);	
				regFormData.country_id=parseInt(selectedCountry, 10);	
				regFormData.state_id=parseInt(selectedState, 10);;
				regFormData.regulator_id=parseInt(selectedRegulator, 10);		
				regFormData.sub_document_id=10;
				regFormData.Regstatus = parseInt(selectedRegstatus,10);
			}

			else{
				var selectedDocument =  $("#selectDocument").val();
				var selectedDomain =  $("#selectDomain").val();
				var selectedGeography =  $("#selectGeography").val();
				var selectedCountry =  $("#selectCountry").val();
				var selectedState =  $("#selectState").val();
				var selectedRegulator =  $("#selectRegulator").val();
				var selectedSubDocument =  $('#regulationUpdate').find('select :last').val();
				var selectedRegstatus =  $("#selectregstatus").val();
				regFormData.document_id = parseInt(selectedDocument, 10);
				regFormData.domain_id= parseInt(selectedDomain, 10);
				regFormData.geography_id=parseInt(selectedGeography, 10);	
				regFormData.country_id=parseInt(selectedCountry, 10);	
				regFormData.state_id=parseInt(selectedState, 10);
				regFormData.regulator_id=parseInt(selectedRegulator, 10);		
				regFormData.sub_document_id=parseInt(lastSubDocId, 10);	
				regFormData.Regstatus = parseInt(selectedRegstatus,10);
			}
			
  	} 
  	else {//mode = create
  			if ($('#selectregstatus').val().trim() == '') {
	            $('#selectregstatus').focus();
	            $('#selectregstatus').attr('style', '');
	            $('#selectregstatus').attr('style', 'border-bottom:2px solid #FF0000;');
	            document.getElementById('reg_status_error').innerHTML= "Please select the Regulation Status";
	            return false;
	      }
				var selectedRegstatus =  $("#selectregstatus").val();
				regFormData.Regstatus = parseInt(selectedRegstatus,10);
  	}
        if ($('#reg_name').val().trim() == '' ) {
            $('#reg_name').focus();
            $('#reg_name').attr('style', 'border-bottom:2px solid #FF0000;');
            document.getElementById('reg_name_error').innerHTML= "Please enter the Regulation Name";
            return false;
        }

        // if (!regex.test($('#reg_name').val().trim())) {
        //   $('#reg_name').focus();
        //   document.getElementById('reg_name_error').innerHTML= "Please provide valid Regulation name ";
        //   return false;
        // }

		if ($('#reg_description').val().trim() == '') {
            $('#reg_description').focus();
            $('#reg_description').attr('style', '');
            $('#reg_description').attr('style', 'border-bottom:2px solid #FF0000;');
            document.getElementById('reg_desc_error').innerHTML= "Please enter the Regulation Description";
            return false;
        }
        if (!regex1.test($('#reg_description').val().trim())) {
          $('#reg_description').focus();
          document.getElementById('reg_desc_error').innerHTML= "Please provide valid description ";
          return false;
        }

        if ($('#selectregstatus').val().trim() == '') {
	            $('#selectregstatus').focus();
	            $('#selectregstatus').attr('style', '');
	            $('#selectregstatus').attr('style', 'border-bottom:2px solid #FF0000;');
	            document.getElementById('reg_status_error').innerHTML= "Please select the Regulation Status";
	            return false;
	    }


        if (new String(this.mode).valueOf() == new String('edit').valueOf()) {
	        if ($('#selectGeography').val().trim() == '') {
	            $('#selectGeography').focus();
	            $('#selectGeography').attr('style', '');
	            $('#selectGeography').attr('style', 'border-bottom:2px solid #FF0000;');
	            document.getElementById('geo_error').innerHTML= "Please select the Geography";
	            return false;
	        }

	        // else if ($('#selectCountry').val().trim() == '') {
	        //     $('#selectCountry').focus();
	        //     $('#selectCountry').attr('style', '');
	        //     $('#selectCountry').attr('style', 'border-bottom:2px solid #FF0000;');
	        //     document.getElementById('country_name_error').innerHTML= "Please select the Country";
	        //     return false;
	        // }

	        // else if ($('#selectState').val().trim() == '') {
	        //     $('#selectState').focus();
	        //     $('#selectState').attr('style', '');
	        //     $('#selectState').attr('style', 'border-bottom:2px solid #FF0000;');
	        //     document.getElementById('state_name_error').innerHTML= "Please select the State";
	        //     return false;
	        // }
	        else if ($('#selectDomain').val().trim() == '') 
	        {
	            $('#selectDomain').focus();
	            $('#selectDomain').attr('style', '');
	            $('#selectDomain').attr('style', 'border-bottom:2px solid #FF0000;');
	            document.getElementById('domain__error').innerHTML= "Please select the Domain";
	            return false;
	        }
	        else if ($('#selectRegulator').val().trim() == '') 
	        {
	            $('#selectRegulator').focus();
	            $('#selectRegulator').attr('style', '');
	            $('#selectRegulator').attr('style', 'border-bottom:2px solid #FF0000;');
	            document.getElementById('regulator_name_error').innerHTML= "Please select the Regulator";
	            return false;
	        }
	        else if ($('#selectDocument').val().trim() == '') 
	        {
	            $('#selectDocument').focus();
	            $('#selectDocument').attr('style', '');
	            $('#selectDocument').attr('style', 'border-bottom:2px solid #FF0000;');
	            document.getElementById('doc_error').innerHTML= "Please select the document";
	            return false;
	        }
	         else if ($('#selectregstatus').val().trim() == '') 
	        {
	            $('#selectregstatus').focus();
	            $('#selectregstatus').attr('style', '');
	            $('#selectregstatus').attr('style', 'border-bottom:2px solid #FF0000;');
	            document.getElementById('reg_status_error').innerHTML= "Please select the Regulation Status";
	            return false;
	        }
	        // else if ($('#selectsubDocument').val().trim() == '') 
	        // {
	        //     $('#selectsubDocument').focus();
	        //     $('#selectsubDocument').attr('style', '');
	        //     $('#selectsubDocument').attr('style', 'border-bottom:2px solid #FF0000;');
	        //     document.getElementById('sub_doc_error').innerHTML= "Please select the sub document";
	        //     return false;
	        // }

     }
        // no need for phase 2 by vinitha
        
		// if ($('#regulator_name').val().trim() == '' ) {
  //           $('#regulator_name').focus();
  //           $('#regulator_name').attr('style', 'border-bottom:2px solid #FF0000;');
  //           document.getElementById('regulator_name_error').innerHTML= "Please enter the Regulator Name";
  //           return false;
  //       }
		if (new String(this.mode).valueOf() == new String('edit').valueOf()) {
			regFormData.id = parseInt($('#reg_id').val(), 10);
		 	saveRegulationUrl = "/updateRegulation";
			var successMsg = "Regulation Updated Successfully.";
		 	var failureMsg = "Error while updating the Regulation. Contact Administrator.";
		} else { //CREATE    
			saveRegulationUrl = "/createRegulation";
			var successMsg = "Regulation Created Successfully.";
	   		var failureMsg = "Error while creating the Regulation. Contact Administrator.";
		}
		console.log(regFormData);
		console.log(regFormData.Regstatus);
	    _self = this;
        $.ajax({
  				type 		: "POST",
				url 		: saveRegulationUrl, //if create mode then createUser else if edit mode then updateUser
 				data 		: regFormData,
  				success	: function(data) {
    				console.log(data);
   			 		console.log('Regulation Created/Updated.');
    			  	if (new String(_self.mode).valueOf() == new String('edit').valueOf()) {
    				_self.regCollectionView.collection.add(data);
    					
				  	}else{
				 		$('#cancelRegulation').trigger('click');
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
					  		  	var failureMsg = "Error occurred while saving the Regulation. Please Contact Administrator.";	
					  		}
					  		if (errData.errCode == 'errRegulation') {
					  			document.getElementById('reg_name_error').innerHTML = failureMsg;
					  			$('#reg_name').focus();
					  		} else {
					  			$( "div.failure").html(failureMsg);
				            	$( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );
					  		}	            	            
		            	 }
		         	}catch(e){
            			window.location.href = '/sessionExpired';
        			} 
		        }
			});		

        //.........regulation edit table............//
    },
   
    cancelRegulation: function(e) {
    		e.preventDefault();
     		console.log('Regulation Canceled');
      		appRouter.navigate("manageReg", {trigger: true});
    },
    
   	backregulation:function(e){
   			e.preventDefault();
      		console.log('Regulation Canceled');
      		appRouter.navigate("manageReg", {trigger: true});

    },

    regNameFocus: function() {
      $('#reg_name_error').html("");
    },

    descriptionFocus : function() {
      $('#reg_desc_error').html("");
    },

    geoFocus: function(){
    	$('#geo_error').html("");
    },

    countryFocus: function() {
    	$('#country_name_error').html("");
    },

    stateFocus : function () {
    	$('#state_name_error').html("");
    },
    domainFocus : function () {
    	$('#domain_error').html("");
    },
    regulatorFocus : function () {
    	$('#regulator_name_error').html("");
    },
    documentFocus : function () {
    	$('#doc_error').html("");
    },
    subdocumentFocus : function () {
    	$('#sub_doc_error').html("");
    }

});
