var admin = admin || {};

admin.AlertFormPageView = Backbone.View.extend({
    
	initialize: function(options) {
    this.alertConfig = {};
		this.mode = options.mode;
		this.alertId = options.id;
		this.template = options.template;
		var _self = this;
		console.log ('mode: ' + this.mode + ' alertId: ' + this.alertId);	
      $.when(
         $.ajax({
                type: "GET",
                url: "/findalertbygeo", //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id    
                success: function(data) {
                  console.log(data);
                  _self.regulations = data;
                  console.log( " _self.regulations ::" + JSON.stringify(_self.regulations.geoCollection));
                  //geoArray = JSON.stringify(_self.regulations.geoCollection);
                  /*if (data.length > 0) {
                    data.forEach(function(item) {                     
                      _self.regMap[item.geography_name] = item;
                    });
                  }*/
                }
            })              

        ).done(function () {
             _self.render();
            
             _self.geoCollectionView = new admin.AlertGeoCollectionView({
                  el: $( '#selectGeography' ),
                 usergeoCollection: _self.regulations
              });

              _self.geoCollectionView.disabledElement();


        });

        //console.log(geoArray);

	},
			
		
	events: {

		 'click  #saveAlert'		: 'saveAlert',
		 'click  #cancelAlert'	: 'cancelAlert',
     'change .getImageName'      :'imageNameShow',
     'change .getImageNameSms'      :'imageNameShowSms',
     'change .getImageNameWeb'      :'imageNameShowWeb',
     'click  #selectGeography'  : 'geoFocus',
     'click  #selectCountry'   : 'countryFocus',
     'click  #selectState'    : 'stateFocus',
     'click  #selectDomain'   : 'domainFocus',
     'click  #alertText'      : 'alertFocus'
	},
	render: function() {
			console.log('this.template'); console.log(this.template);
			this.$el.html(this.template);
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

    console.log("test ::::::::");
    var alertId = "";

     if( appRouter.currentView.alertConfig.regulationIds != undefined )
        alertId = JSON.stringify(appRouter.currentView.alertConfig.regulationIds);
     else
       alertId = JSON.stringify(appRouter.currentView.alertConfig.domainIds);
        

    console.log(alertId);
    document.getElementById('alert_name_error').innerHTML= "";
    
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
       if(country_id == null || country_id == undefined){
            var country=23;
       }else{
            var country=parseInt(country_id, 10);
        }

    var state_id =  $("#selectState").val();
       if(state_id == null|| state_id == undefined){
             var state = 18;
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

      
      console.log("alert "+ JSON.stringify(formData));
        saveAlertUrl = "/createalert";
        var successMsg = "Alert Created Successfully.";
        var failureMsg = "Error while creating the Alert. Contact Administrator."; 
    
           
          $('#saveAlert').attr('disabled',true);
          //$('#saveAlert').render();
        //console.log(file.name);
        //console.log(sms.name);
        console.log(formData);
        $.ajax({
          type    : "POST",
          url     : saveAlertUrl, //if create mode then createUser else if edit mode then updateUser
          data    : formData,
          cache: false,           
          contentType: false,
          processData: false,        

          success : function(data) { 
            console.log("file uploaded");    
            console.log("********************************* "+JSON.stringify(data));     
             window.alertText = $("#alertText").val();
             console.log(window.alertText);
            // $( "div.success" ).html(successMsg);
            // $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
            console.log(data.alertId);
            _self.sentAlertNotification(data.alertId);  
            appRouter.navigate("managealert", {trigger: true});           

          },

          error: function(data) {
             console.log("********************************* error "+data);     
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

  sentAlertNotification: function(alertMapId ) 
  {      
    console.log(window.alertText);
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

     var state_id =  $("#selectState").val();
     var country_id =  $("#selectCountry").val();
       if(state_id == null|| state_id == undefined){        
      var alertFormData = {
        alertText      : $('#alertText').val().trim(),
        geography_id   : $('#selectGeography').val(),
        country_id     : $('#selectCountry').val(),
        state_id     : 18,
        domain_id      : $('#selectDomain').val(),
        regulator_id   : $('#selectRegulator').val(),
        regulation_id  : $('#selectRegulation').val(),
        emailpath      : path,
        email          : $('#uploadFile').val(),
        web            : $('#uploadFileWeb').val(),
        alertMapId     : alertMapId 
      };   
    }
      else if(country_id == null || country_id == undefined){
       var alertFormData = {
        alertText      : $('#alertText').val().trim(),
        geography_id   : $('#selectGeography').val(),
        country_id     : 23,
        state_id     : $('#selectState').val(),
        domain_id      : $('#selectDomain').val(),
        regulator_id   : $('#selectRegulator').val(),
        regulation_id  : $('#selectRegulation').val(),
        emailpath      : path,
        email          : $('#uploadFile').val(),
        web            : $('#uploadFileWeb').val(),
        alertMapId     : alertMapId 
      };         
    } else {
       var alertFormData = {
        alertText      : $('#alertText').val().trim(),
        geography_id   : $('#selectGeography').val(),
        country_id     : $('#selectCountry').val(),
        state_id     : $('#selectState').val(),
        domain_id      : $('#selectDomain').val(),
        regulator_id   : $('#selectRegulator').val(),
        regulation_id  : $('#selectRegulation').val(),
        emailpath      : path,
        email          : $('#uploadFile').val(),
        web            : $('#uploadFileWeb').val(),
        alertMapId     : alertMapId 
      };         
    }
        var successMsg = "Alert Created Successfully.";
        var failureMsg = "Error while creating the Alert. Contact Administrator."; 

      console.log(alertFormData);  
      $.ajax({
        type    : "POST",
        url     : "/alertnotification",
        data    : alertFormData,      
        success : function(data) { 
         // appRouter.navigate("managealert", {trigger: true});  
          $( "div.success" ).html(successMsg);
          $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );   
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


