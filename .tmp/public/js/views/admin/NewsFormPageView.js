var admin = admin || {};

admin.NewsFormPageView = Backbone.View.extend({

	initialize: function(options) {

    this.mode = options.mode;
    this.newsId = options.id;
    this.template = options.template;
    var _self = this;
    console.log ('mode: ' + this.mode + ' newsId: ' + this.newsId);

    if (new String(this.mode).valueOf() == new String('create').valueOf()) { //Create User Form
      $.when(
            $.ajax({
              type: "GET",
              url: '/geography',
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
                              var failureMsg = "Error while News form page. Please Contact Administrator.";  
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
    } else { //Edit news Form
      var findGeo = "/findGeoByNewsId/" + this.newsId;
      var findNews = "/findByNews/" + this.newsId;
      $.when(
        $.ajax({
          type: "GET",
          url: findNews,
          success: function(data) {
            _self.newsData = data[0];
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
                          var failureMsg = "Error while Edit news form. Please Contact Administrator.";  
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
              url: '/geography',
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
                                var failureMsg = "Error while edit news form page. Please Contact Administrator.";  
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
              url: findGeo,
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
                            var failureMsg = "Error while edit news form page. Please Contact Administrator.";  
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
                for(var i=0; i<_self.selectedGeoData.length; i++){
                    $('#selectGeography option[value=' + _self.selectedGeoData[i].id + ']').prop('selected', true);
                }
        });
    }
		
	},

	events: {
          'click  #cancelForm'  : 'cancelNews',
          'click #saveNews'      :'saveNewsContent',
           'click  #news_description': 'descriptionFocus'

	},

	render: function() {
		if (new String(this.mode).valueOf() == new String('create').valueOf()) {
			 console.log('this.template'); console.log(this.template);
			 this.$el.html(this.template);
		   } 
    else { //edit
			 this.$el.html(this.template( this.newsData ));
		  }
    	  console.log('Rendering Edit News FormPageView');
        $('#newsDate').datetimepicker();
		    return this;
	},

  saveNewsContent:function(e){
      e.preventDefault();

      var geog_name =  $("#selectGeography").val();
      if(geog_name == null){
            document.getElementById('geo_error').innerHTML= "Please select Geography(s)";
            return false;
      }
      else{
            var geo_name=parseInt(geog_name);
      }

     document.getElementById('news_date_error').innerHTML= "";
      document.getElementById('news_content_error').innerHTML= "";
     //  var regex1=/^[a-zA-Z\s]+$/;;

            //For validation username only, when editing the user
    if ($('#news_description').val().trim() == '' ) {
        $('#news_description').focus();
        $('#news_description').attr('style', 'border-bottom:2px solid #FF0000;');
        document.getElementById('news_content_error').innerHTML= "Please enter the News";
        
        return false;
    }

    // if (!regex1.test($('#news_description').val().trim())) {
    //       $('#news_description').focus();
    //       document.getElementById('news_content_error').innerHTML= "Please provide valid description ";
    //       return false;
    //      }

    if ($('#newsDate').val().trim() == '') {
        $('#newsDate').focus();
        $('#newsDate').attr('style', '');
        $('#newsDate').attr('style', 'border-bottom:2px solid #FF0000;');
        // var message = "Email ID is Required";
        document.getElementById('news_date_error').innerHTML= "Please Select the News Date";
        return false;
    }




      var newsFormData = {
          geo_id   : $('#selectGeography').val(),
          news_content  : $('#news_description').val(),
          news_date: $('#newsDate').val()
      };
      console.log(newsFormData);

      if (new String(this.mode).valueOf() == new String('edit').valueOf()) {
            newsFormData.id = parseInt($('#news_id').val(), 10);
            saveNewsUrl = "/updateNews";
            var successMsg = "News Updated Successfully.";
            var failureMsg = "Error while updating the News. Contact Administrator.";
    } 
      else {
            saveNewsUrl = "/saveNewsUrl";
            var successMsg = "News Created Successfully.";
            var failureMsg = "Error while creating the News. Contact Administrator.";
      }

          $.ajax({
          type    : "POST",
          url     : saveNewsUrl, //if create mode then createnews else if edit mode then updateNews
          data    : newsFormData,
          success : function(data) {
            console.log(data);
            console.log('Create News Successfully');
            appRouter.navigate("newsManagement", {trigger: true});
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
                                var failureMsg = "Error occurred while saving the News. Please Contact Administrator."; 
                             }
                            if (errData.errCode == 'errDomain') {
                              document.getElementById('domain_name_error').innerHTML = failureMsg;
                              $('#domain_name').focus();
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

  cancelNews: function(e) {
      e.preventDefault();
      console.log('News Canceled');
      appRouter.navigate("newsManagement", {trigger: true});
  },
   descriptionFocus: function()
  {
        $('#news_content_error').html("");
    
  }

 });
