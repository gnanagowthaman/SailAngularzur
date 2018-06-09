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
		'change .getImageName' :'imageNameShow',
		'click #passwrdModalClose' : 'dataDismissModal',
		'click #saveConfirm' : 'passwordChange',
		'click #loadMoreSubscription':'loadMoreSubscription'
	},

	render: function() {					
	    this.$el.html(this.template);
	    this.subscriptionList = new app.UserSubscriptionListView({el: $( '#subscriptionList' )});
	    $('#loadMoreSubscription').hide();
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
			this.dataModalOpen();
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

	}

});
