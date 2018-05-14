var app = app || {};

app.UserProfilePageView = Backbone.View.extend({
    template: $( '#profileManagementPageViewTpl' ).html(),
	initialize: function() {
		$('.hamburger-menu').hide();
    
		this.render();    
	},

	events:{
		//'click #saveChangePwd' : 'passwordChange',
		'click #saveUserImage' : 'saveProfileImage',
		//'change .getImageName' :'imageNameShow',
		'click #passwrdModalClose' : 'dataDismissModal',
		'click #saveConfirm' : 'passwordChange',
		'click #loadMoreSubscription':'loadMoreSubscription',
		'click #alerttype':'savealert',
    'click [data-field="Domain"]'    : 'sortByDomain',
    'click [data-field="Regulator"]'    : 'sortByRegulator',
	   'click [data-field="Regulation"]'    : 'sortByRegulation',
     'click [data-field="Document"]'    : 'sortByDocument',
  },

	render: function() {					
	    this.$el.html(this.template);
	    this.subscriptionList = new app.UserSubscriptionListView({el: $( '#subscriptionList' )});
      //this.subscriptionList.renderSubscriptionCollection();
      // table_(jQuery);
      //$('[data-toggle="table"]').table_jQuery();
     
	    $('#loadMoreSubscription').hide();
       $('#txtPassword').val('');

		console.log('Rendering ProfileManagementPageView');  	
		return this;
	},
   dataDismissModal : function(e){
	    console.log("event triggers");
	    $('#saveConfirmDialog').modal('hide');
	    $('body').removeClass('modal-open');
	    $('.modal-backdrop').remove();
	    $( "#passwordConfirm").submit();
	    return true;
	},
    dataModalOpen : function(e){
	    $('#saveConfirmDialog').modal('show');
	},

	passwordChange:function(){
	    var password = document.getElementById("txtPassword").value;
	    var confirmPassword = document.getElementById("txtConfirmPassword").value;
	    if (password !== confirmPassword){
	        $('#psw1_error').html("Passwords do not match.");
            $('#txtPassword').on('click',function(e){
                e.preventDefault();
             	$('#psw1_error').html("");
              	$('#txtPassword').val("");
             	$('#txtConfirmPassword').val("");
            }); 
	        return false;
		}  
		if((password.length <= 10 && password.length >= 6) && (confirmPassword.length <= 10 && confirmPassword.length >= 6)) {
			console.log('validate password length.');
			// this.dataModalOpen();
      $( "#passwordConfirm").submit();
            return false;
	    } else {
	        $('#psw1_error').html("make sure the password is between 6-10 characters long.");
	        $('#txtPassword').click(function(e){
                e.preventDefault();
             	$('#psw1_error').html("");
            	$('#txtPassword').empty();
           	    $('#txtConfirmPassword').empty();
           });
	        return false;
	    }
	},

	imageNameShow:function(){
	    var showImageName = document.getElementById('uploadFile').files[0];       
	    var namechange = showImageName.name;
	    $('#imagename_show').empty();
	    console.log(namechange);
	    document.getElementById('imagename_show').value = namechange;
	    $('#imagename_show').prop('readonly',true);
	},

	saveProfileImage:function(){
	   var file = document.getElementById('uploadFile').files[0];
	   var formData = new FormData();
	   console.log(file);  
	   formData.append('fileName', file.name);
	   formData.append('type', 'profile');
	   formData.append('uploadFile', file, file.name);
	     if(file) {
		     $.ajax({
	            type: "POST",
	            url: "/uploadProfileImage",
	            data: formData,
	            cache: false,	          
	            contentType: false,
	            processData: false,	            
		        success: function(data) {
		            console.log("From the frondend", data.imagePath);
		            $('body').find('#profile_link img').attr('src' , data.imagePath);
                $('body').find('#profile_image img').attr('src', data.imagePath);
		            $( "div.success" ).html("Profile Picture Updated Successfully.");
							  $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
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
		                    var failureMsg = "Error while uploading profile image, Please Contact Administrator.";  
		                  }
		                  $( "div.failure").html(failureMsg);
		                  $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
		                }
			        }catch(e){
			              window.location.href = '/sessionExpired';
			         }
		      	}
	        });
	    }
	},

	loadMoreSubscription:function(e){
		e.preventDefault();
		 self=this;
        console.log('Rendering loadMoresubascriptions');
        // this.userList.sorting = 0;
        subsoffset += subslimit;
        console.log(this.subscriptionList);
        console.log("newslimit : newsoffset " + subslimit + ' : ' + subsoffset);


        this.subscriptionList.collection.fetch({remove: false, data: { limit: subslimit, offset:subsoffset }, 
        	processData: true,
            success: function (coll) {                
                console.log((self.subscriptionList.collection.toJSON()));               
                if ((self.subscriptionList.collection.length - subsoffset) != subslimit) {
                    $('#findStatus').html("End Of Records");
                    $('#loadMoreSubscription').hide();
                }
            },
            error: function(data) {
                try{
                    console.log(data);
                    console.log(JSON.parse(data));
                    var errData = JSON.parse(data.responseText);
                    if ( errCode == 550) {
                        window.location.href = '/sessionExpired';
                    } else {
                        if (errData.errMsg.length > 0) {
                          var failureMsg = errData.errMsg;  
                        } else {
                          var failureMsg = "Error while Loading user. Please Contact Administrator.";  
                        }
                            $( "div.failure").html(failureMsg);
                            $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
                      }
                }catch(e) {
                    window.location.href = '/sessionExpired';
                }
            }
        });

	},savealert:function (){

		
		var smsEnabled = "none";
        if($('#sms').prop('checked') )  
        {
              smsEnabled = $( "input[type=checkbox][name=sms]:checked" ).val();
              smsEnabled = 1;
        } else {
        		smsEnabled = 0;

        }

        console.log("SMs"+$( "input[type=checkbox][name=sms]:checked" ).val());
		var webEnabled = "none";
        if($('#web').prop('checked') )  
        {
              webEnabled = $( "input[type=checkbox][name=web]:checked" ).val();
              webEnabled = 1;
        }  else {
        	webEnabled = 0;

        }

        console.log("web"+$( "input[type=checkbox][name=web]:checked" ).val());
 		var emailEnabled = "none";
        if($('#email').prop('checked') )  
        {
             emailEnabled = $( "input[type=checkbox][name=email]:checked" ).val();
             emailEnabled = 1;
        } else {
        	emailEnabled = 0;

        }

        console.log("email"+$( "input[type=checkbox][name=email]:checked" ).val());
         var saveuseralertUrl = '';
        var useralertFormData = {
            smsaccess      : smsEnabled,
            webaccess      : webEnabled,
            emailaccess    :emailEnabled

        };
        console.log("useralertFormData",useralertFormData);
        saveuseralertUrl = "/Useralert";
            var successMsg = "User Created Successfully.";
            var failureMsg = "Error while creating the User. Contact Administrator.";   
            $.ajax({
          type      : "POST",
          url       : saveuseralertUrl, //if create mode then createUser else if edit mode then updateUser
          data      : useralertFormData,      
          success   : function(data) {
            console.log(data);
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
                        var failureMsg = "Error occurred while saving the alert type. Please Contact Administrator."; 
                    }
                    if (errData.errCode == 'errEmail') {
                        document.getElementById('mail_error').innerHTML = failureMsg;
                        $('#email_id').focus();
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
	},

  sortByDomain: function(){
    console.log("domain event triggers");
    this.drawImage();
  },

  sortByRegulator: function() {
    this.drawImage();
  },

  sortByRegulation: function() {
    this.drawImage();
  },

  sortByDocument: function() {
    this.drawImage();
  },

  drawImage : function(){
    var drawImage ='<div class="icon_cont_tr">'+
                          '<div class="supervisory_icon"></div>'+
                        '</div>';
        var drawBanking = '<div class="icon_cont_tr">' +
                          '<div class="banking_icon"></div>' +
                        '</div>';
        var drawCons = '<div class="icon_cont_tr">' +
                          '<div class="consumer_icon"></div>' +
                        '</div>';
        var drawPayment = '<div class="icon_cont_tr">' +
                          '<div class="services_icon"></div>' +
                        '</div>';
        var drawPensions = '<div class="icon_cont_tr">' +
                           '<div class="pensions_icon"></div>' +
                        '</div>';
        var drawIns = '<div class="icon_cont_tr">' +
                           '<div class="insurance_icon"></div>' +
                        '</div>';
        var drawFinCrime = '<div class="icon_cont_tr">' +
                           '<div class="financial_crime_icon"></div>' +
                        '</div>';
        var drawFinmarket = '<div class="icon_cont_tr">' +
                           '<div class="financial_icon"></div>' +
                        '</div>';
        var drawPdf = '<div class="pdf-icon">' +
                        '</div>';
        var drawInteractive = '<div class="interactive">' +
                        '</div>';

       $('#drawProfileImage').find('tr ').each(function(tr){
          console.log("testing function :::::::");
          console.log("tr ::", $(this).find("td:first-child").text());
          var image = $(this).find("td:first-child").text();
          console.log(image);
          if(image == 'Supervisory'){
            $(this).find("td:first-child").prepend(drawImage);
          }
           else if(image == 'Banking & Credit Union'){
            $(this).find("td:first-child").prepend(drawBanking);
            
          }
          else if(image == 'Consumer Finance'){
            $(this).find("td:first-child").prepend(drawCons);
            
          }
          else if(image == 'Payment Services'){
            $(this).find("td:first-child").prepend(drawPayment);
            
          }
          else if(image == 'Payment Services'){
            $(this).find("td:first-child").prepend(drawPayment);
           
          }
          else if(image == 'Pensions'){
            $(this).find("td:first-child").prepend(drawPensions);
            
          }
          else if(image == 'Insurance'){
            $(this).find("td:first-child").prepend(drawIns);

          }
          else if(image == 'Financial Markets'){
            $(this).find("td:first-child").prepend(drawFinmarket);
          }
          else if(image == 'Financial crime'){
            $(this).find("td:first-child").prepend(drawFinCrime);
          }
              
       //    var access = $("th:last-child").text();
       // if(access == 'Access'){
          // $("td:last-child").append('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger">Access Now</a>');
       // }

       });

       //  $('#drawProfileImage').find('tr ').each(function(tr){
       //    console.log("testing function :::::::");
       //    console.log("tr ::", $(this).find("td:last-child").text());
       //    var image = $(this).find("td:last-child").text();
       //    console.log(image);

       //    if(image == 'Summary'){
       //      console.log("inside the summary");
       //      console.log("td last child",$(this).find("td:last-child").text());
       //      $(this).find("td:last-child").html('<td class="doc-type"><div class="pdf-icon">Summary</div></td>');
            
       //    }
       //    else if(image == 'Document'){
       //      $(this).find("td:last-child").html('<td class="doc-type"><div class="pdf-icon">Document</div></td>');
            
       //    }
       //    else if(image == 'LyfeCycle'){
       //      $(this).find("td:last-child").html('<td class="doc-type"><div class="interactive">LyfeCycle</div></td>');
            
       //    }
       //    else if(image == 'Regulatory Tracker Level 1'){
       //      $(this).find("td:last-child").html('<td class="doc-type"><div class="interactive">Regulatory Tracker Level 1</div></td>');
            
       //    }
       //    else if(image == 'Regulatory Tracker Level 2'){
       //      $(this).find("td:last-child").html('<td class="doc-type"><div class="interactive">Regulatory Tracker Level 2</div></td>');

       //    }
       //    else if(image == 'LifeCycle Tacker'){
       //      $(this).find("td:last-child").html('<div class="interactive">LifeCycle Tacker</div></td>');
       //    }
       //    else if(image == 'Key Timeliness'){
       //      $(this).find("td:last-child").html('<td class="doc-type"><div class="pdf-icon">Key Timelines</div></td>');
       //    }
              

       // });
  }

});
