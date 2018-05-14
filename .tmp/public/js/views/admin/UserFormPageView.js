var admin = admin || {};

admin.UserFormPageView = Backbone.View.extend({
    
    initialize: function(options) {     
        this.fileUploadConfig = {};
        this.userId = options.id;
        this.template = options.template;
        var geomap=[];
        var _self = this;
        this.regMap = {};
        this.regCollectionView=null;

        console.log ('mode: ' + this.mode + ' userId: ' + this.userId+ 'username');
            $.when(
                $.ajax({
                    type: "GET",
                    url: "/getRegbygeostate", //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id    
                    success: function(data) {
                        console.log(data);
                        _self.regulations = data;
                       // _self.geoData = data;
                        console.log( " _self.regulations ::" + JSON.stringify(_self.regulations));
                       // console.log('geo data :: ' + JSON.stringify(data));
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

                
                _self.geoCollectionView = new admin.UserGeoCollectionView({
                    el: $( '#selectGeography' ),
                    usergeoCollection: _self.regulations,
                    endChain : 'state'
                });
                _self.regCollectionView = new admin.CreateUserTableView({
                    el: $( '#user-list-table' )
                });              
                
            }).fail(function(data){
                try{
                    var errData = JSON.parse(data.responseText);
                    if ( errData.errCode == 550) {
                        window.location.href = '/sessionExpired';
                    } else {
                        if (errData.errMsg.length > 0) {
                          var failureMsg = errData.errMsg;  
                        } else {
                            var failureMsg = "Error occurred while fetching the data. Please Contact Administrator.";   
                        }
                            $( "div.failure").html(failureMsg);
                            $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
                     }   
                }catch(e){
                    window.location.href = '/sessionExpired';
                }     
            });         
        
    },

    events: {
        'click  #save'          : 'saveUser',
        'click  #cancel'        : 'cancelUser',
        'change #full'          :'fullAccess',
        'change #restricted'    :'restrictedAcess',
        'change .regClicked'    : 'regClicked',
        'click #email_id'       : 'mailidFocus',
        'click #user_name'      :'nameFocus', 
        'click #paid'           :'subspaid',
        'click #free'           :'subsfree',
        'click #add'            : 'addUserRegulation',
        'click  #selectGeography'  : 'geoFocus',
        'click  #selectCountry'   : 'countryFocus',
        'click  #selectState'    : 'stateFocus',
        'click  #selectRegulation' : 'regFocus',
        'click #mobile_no'   : 'mobileFocus'
    },
    
    render: function() {            
        if (new String(this.mode).valueOf() == new String('create').valueOf()) {
            console.log('this.template'); console.log(this.template);
            this.$el.html(this.template);
        } else { 
            this.$el.html(this.template( this.userData ));
        }
        console.log('Rendering UserFormPageView');
        return this;
    },

    saveUser: function (e) {    
        e.preventDefault();     
        console.log('save new user');
        //-----------------------------------Client Validation Starts---------------------------------------
        document.getElementById('user_error').innerHTML= "";
        document.getElementById('mail_error').innerHTML= "";
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var regex1 =  /^[a-zA-Z ]*$/; 
        var regex2 = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/; 

        //For validating the emailid form
        // if ($('#user_name').val().trim() == '' && $('#email_id').val().trim() == '') {
        //     $('#user_name').focus();
        //     $('#user_name').attr('style', 'border-bottom:2px solid #FF0000;');
        //     $('#email_id').attr('style', 'border-bottom:2px solid #FF0000;');
        //         // var message = "Please Enter The User Name";
        //     document.getElementById('user_error').innerHTML= "Please enter the User Name and Email ID";             
        //     return false;
        // }          
        //For validation username only, when editing the user
        if ($('#user_name').val().trim() == '' ) {
            $('#user_name').focus();
            $('#user_name').attr('style', 'border-bottom:2px solid #FF0000;');
            document.getElementById('user_error').innerHTML= "Please enter the User Name";             
            return false;
        }  
         if (!regex1.test($('#user_name').val().trim())) {
            $('#user_name').focus();
            document.getElementById('user_error').innerHTML= "Please provide valid User Name";
             return false;
         }
        if ($('#email_id').val().trim() == '') {
            $('#email_id').focus();
            $('#user_name').attr('style', '');
            $('#email_id').attr('style', 'border-bottom:2px solid #FF0000;');
            document.getElementById('mail_error').innerHTML= "Email ID is Required";            
            return false;
        }
        if (!regex.test($('#email_id').val().trim())) {
            $('#email_id').focus();
            document.getElementById('mail_error').innerHTML= "Please provide the valid Mail ID";
            return false;
        }

         if ($('#mobile_no').val().trim() == '') {
            $('#mobile_no').focus();
            $('#mobile_no').attr('style', '');
            $('#mobile_no').attr('style', 'border-bottom:2px solid #FF0000;');
            document.getElementById('mobile_no_error').innerHTML= "Mobile No is Required";            
            return false;
        }

        if (!regex2.test($('#mobile_no').val().trim())) {
            $('#mobile_no').focus();
            document.getElementById('mobile_no_error').innerHTML= "Please provide the valid Mobile No";
            return false;
        }
        //For Validating the subscription
        if (($('#free').prop('checked') || $('#paid').prop('checked')) == false ) {
            //alert("Please check the subscription");
            document.getElementById('subc_error_show').innerHTML ="Please check the subscription";
            return false;
        }

        //For Validating the Access
        if (($('#full').prop('checked') || $('#restricted').prop('checked')) == false ) {
            document.getElementById('access_error_show').innerHTML ="Please choose access limit";
            return false;
        }

         //For Validating the Access1
       // if (($('#sms').prop('checked') || $('#email').prop('checked')||$('#web').prop('checked'))== false ) {
           // document.getElementById('access1_error_show').innerHTML ="Please choose access1 limit";
           // return false;
      //  }

      
        var smsEnabled = "none";
        if($('#sms').prop('checked') )  
        {
              smsEnabled = $( "input[type=checkbox][name=sms]:checked" ).val();
        }

        console.log("SMD >>>>>>>>>>>>>>>>>>>>>>>"+$( "input[type=checkbox][name=sms]:checked" ).val());
        var webEnabled = "none";
        if($('#web').prop('checked') )  
        {
              webEnabled = $( "input[type=checkbox][name=web]:checked" ).val();
        }

        console.log("SMD >>>>>>>>>>>>>>>>>>>>>>>"+$( "input[type=checkbox][name=web]:checked" ).val());
        var emailEnabled = "none";
        if($('#email').prop('checked') )  
        {
             emailEnabled = $( "input[type=checkbox][name=email]:checked" ).val();
        }

        console.log("SMD >>>>>>>>>>>>>>>>>>>>>>>"+$( "input[type=checkbox][name=email]:checked" ).val());


        //Select geopgrpahy ,country , state and regulation

          var selectedCountry =  $("#selectCountry").val();
          if(selectedCountry == "" || selectedCountry == undefined){
            selectedCountry = 23;
          }

          var selectedGeography =  $("#selectGeography").val();
          var selectedState =  $("#selectState").val();
          if(selectState== "" || selectedState== undefined){
            selectedState =18;
          }
          var selectedReg =  $("#selectRegulation").val();

        
        //-----------------------------------Client Validation Ends---------------------------------------
        
        var saveUserUrl = '';
        //Set Basic form fields
        var userFormData = {
            user_name    : $('#user_name').val().trim(),
            email_id     : $('#email_id').val().trim(),
            mobile_no    : $('#mobile_no').val().trim(),
            company_name : 'others',
            role_id      : 3,  //this is PK of Role table for admin/client
            subscription : $( "input[type=radio][name=subscription]:checked" ).val(), 
            access       : $( "input[type=radio][name=access]:checked" ).val(),
            smsaccess      : smsEnabled,
            webaccess      : webEnabled,
            emailaccess    :emailEnabled
           // geoctstreg   : this.regCollectionView

        };
        //Set user_id & saveUserUrl based on mode 
    
            saveUserUrl = "/createUser";
            var successMsg = "User Created Successfully.";
            var failureMsg = "Error while creating the User. Contact Administrator.";   
       /*       var Subscription=[];
            if ($('#sms').prop('checked')) {
                subscription.push('sms');
          } 
           if ($('#web').prop('checked')) {
             subscription.push('web');
            }
           if ($('#email').prop('checked')) {
                subscription.push('email');
        } */
         //console.log("subscription123",subscription);
        //if (new String(userFormData.company_name).valueOf() == new String('zurik').valueOf()) {
    
      // userFormData.subscription = subscription;
       userFormData.country = selectedCountry ;
       userFormData.geopgrpahy  = selectedGeography ;
       userFormData.state  =  selectedState;
       userFormData.regulations  =  selectedReg;

        if (userFormData.access == 'full') {
            userFormData.regulations = [];
        } else if (userFormData.access == 'restricted') {
            console.log(userFormData.access);
            userFormData.regulations = [];
            var _self = this;
        
                    console.log("Getting regulation data");
                        
                            console.log("Getting regulation data ..1 "+_self.regCollectionView.collection.length);

                          _self.regCollectionView.collection.each(function(item) {
                                console.log(item.get('geography_id'));
                                console.log(item.get('country_id')); 
                                console.log(item.get('state_id'));
                                console.log(item.get('regulation_id'));

                                var regulationItem = {
                                    regulation_id   : item.get('regulation_id'),
                                    regulation_name : item.get('regulation_name'),
                                    geography_id    : item.get('geography_id'),
                                    country_id      : item.get('country_id'),
                                    state_id        : item.get('state_id'),
                                    sms             :(item.get('sms')=='Yes')?1:0,
                                   web            :(item.get('web')=='Yes')?1:0,
                                  email           :(item.get('email')=='Yes')?1:0

                                };
                                userFormData.regulations.push(regulationItem);
                            
                        });
            
        }

        console.log("boss");    
        //            //

       
         if (userFormData.access1 == 'restricted') {
            console.log(userFormData.access1);
            userFormData.regulations = [];
            var _self = this;
        
                    console.log("Getting regulation data");
                        
                            console.log("Getting regulation data ..1 "+_self.regCollectionView.collection.length);

                          _self.regCollectionView.collection.each(function(item) {
                                console.log(item.get('geography_id'));
                                console.log(item.get('country_id')); 
                                console.log(item.get('state_id'));
                                console.log(item.get('regulation_id'));

                                var regulationItem = {
                                    regulation_id   : item.get('regulation_id'),
                                    regulation_name : item.get('regulation_name'),
                                    geography_id    : item.get('geography_id'),
                                    country_id      : item.get('country_id'),
                                    state_id        : item.get('state_id'),
                                     sms             :(item.get('sms')=='Yes')?1:0,
                                     web            :(item.get('web')=='Yes')?1:0,
                                    email           :(item.get('email')=='Yes')?1:0
                                };
                                userFormData.regulations.push(regulationItem);
                            
                        });
            
        }
        //POST the data to server
        $.ajax({
          type      : "POST",
          url       : saveUserUrl, //if create mode then createUser else if edit mode then updateUser
          data      : userFormData,      
          success   : function(data) {
            console.log(data);
            console.log('User and Subscription Created/Updated.');
            appRouter.navigate("manageUsers", {trigger: true}); 
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

    cancelUser: function(e) {
        e.preventDefault();
        appRouter.navigate("manageUsers", {trigger: true});     
    },

    regClicked: function(e) {
        e.preventDefault();
        var pos = e.target.id.indexOf('-');
        var geoName = e.target.id.substring(0, pos);
        var regListId = geoName.toUpperCase() + '-reg-list';
        if ($(e.target).prop('checked')) {
            $('#' + regListId).find(':input:enabled').prop('checked', true);
            var regView = this['regulationList' + geoName.toUpperCase() + 'View'];
            regView.collection.each(function(item) {
                item.set('is_selected', true);
            }, this );
            console.log(regView.collection);
        } else {
            $('#' + regListId).find(':input').prop('checked', false);
            var regView = this['regulationList' + geoName.toUpperCase() + 'View'];
            regView.collection.each(function(item) {
                item.set('is_selected', false);
            }, this );
            console.log(regView.collection);            
        }
    },

    fullAccess: function() {
        console.log("Disable the controls");
            $('#selectGeography').attr('disabled',true);
            $('#selectCountry').attr('disabled',true);
            $('#selectState').attr('disabled',true);
            $('#selectRegulation').attr('disabled',true);
            $('#sms').attr('disabled',true);
             $('#web').attr('disabled',true);
              $('#email').attr('disabled',true);
            $('#access1_error_show').html("");
            $('#access_error_show').html("");
            $('#add').hide();
      //       $('#selectGeography').render();
             this.selectChange();
            var _self = this;

             _self.regCollectionView.$el.empty();
             _self.regCollectionView.collection.reset();
             _self.regCollectionView.render();

          //  _self.geoCollectionView.disabledElement();
    },
    
    restrictedAcess: function() 
    {
        console.log("Enabling the controls");
        $('#access_error_show').html("");
        $('#access1_error_show').html("");
        $('#selectGeography').attr('disabled',false);
        $('#sms').attr('disabled',false); 
            $('#web').attr('disabled',false);  
             $('#email').attr('disabled',false);   
        $('#add').show();    
         this.selectChange();

 var _self = this;
         _self.geoCollectionView.collection.add(_self.regulations.usergeoCollection);
            _self.geoCollectionView.render();
    
    
    },
   /* smsAccess1:function()
    {
        console.log("enabling the controls");
        $('#access1_error_show').html("");
        $('#selectGeography').attr('disabled',false);
        $('#add').show();    
    },
     webAccess1:function()
    {
        console.log("enabling the controls");
        $('#access1_error_show').html("");
        $('#selectGeography').attr('disabled',false);
        $('#add').show();    
    },
     gmailAccess1:function()
    {
        console.log("enabling the controls");
        $('#access1_error_show').html("");
         $('#selectGeography').attr('disabled',false);
        $('#add').show();
    },*/

    mailidFocus: function()
    {
        $('#mail_error').html("");
        
    },
    nameFocus:function()
    {
        $('#user_error').html("");
    },

    subspaid:function(){
        $('#subc_error_show').html("");
    },

    subsfree:function(){
        $('#subc_error_show').html("");
    },

    geoClick:function(){
        $('#geography_error_show').html("");
    },
    regClick:function(){
        $('#regulation_error_show').html("");
    },
    geoFocus: function(){
      $('#geo_error').html("");
       this.selectChange();
    },

    countryFocus: function() {
      $('#country_error').html("");
       this.selectChange();
    },

    stateFocus : function () {
      $('#state_error').html("");
       this.selectChange();
    },
    regFocus: function() {
        $('#reg_error').html("");
        this.selectChange();
    },
    mobileFocus : function() {
        $('#mobile_no_error').html("");
    },

     selectChange : function()
    {
        $('#user_reg_error').html('');
        
    },

    addUserRegulation: function(e)
    {
      var selectedCountry =  $("#selectCountry").val();
      if(selectedCountry == "" || selectedCountry == undefined){
            selectedCountry = 23;
          }
      var selectedGeography =  $("#selectGeography").val();
      var selectedState =  $("#selectState").val();
      if(selectedState == "" || selectedState == undefined){
            selectedState = 18;
          }
      var selectedReg =  $("#selectRegulation").val();
     

      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var regex1 =  /^[a-zA-Z ]*$/; 
      var regex2 = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/; 

       if ($('#user_name').val().trim() == '' ) {
            $('#user_name').focus();
            $('#user_name').attr('style', 'border-bottom:2px solid #FF0000;');
            document.getElementById('user_error').innerHTML= "Please enter the User Name";             
            return false;
        }  
         if (!regex1.test($('#user_name').val().trim())) {
            $('#user_name').focus();
            document.getElementById('user_error').innerHTML= "Please provide valid User Name";
             return false;
         }
        if ($('#email_id').val().trim() == '') {
            $('#email_id').focus();
            $('#user_name').attr('style', '');
            $('#email_id').attr('style', 'border-bottom:2px solid #FF0000;');
            document.getElementById('mail_error').innerHTML= "Email ID is Required";            
            return false;
        }
        if (!regex.test($('#email_id').val().trim())) {
            $('#email_id').focus();
            document.getElementById('mail_error').innerHTML= "Please provide the valid Mail ID";
            return false;
        }

         if ($('#mobile_no').val().trim() == '') {
            $('#mobile_no').focus();
            $('#mobile_no').attr('style', '');
            $('#mobile_no').attr('style', 'border-bottom:2px solid #FF0000;');
            document.getElementById('mobile_no_error').innerHTML= "Mobile No is Required";            
            return false;
        }

        if (!regex2.test($('#mobile_no').val().trim())) {
            $('#mobile_no').focus();
            document.getElementById('mobile_no_error').innerHTML= "Please provide the valid Mobile No";
            return false;
        }
        //For Validating the subscription
        if (($('#free').prop('checked') || $('#paid').prop('checked')) == false ) {
            //alert("Please check the subscription");
            document.getElementById('subc_error_show').innerHTML ="Please check the subscription";
            return false;
        }

        //For Validating the Access
        if (($('#full').prop('checked') || $('#restricted').prop('checked')) == false ) {
            document.getElementById('access_error_show').innerHTML ="Please choose access limit";
            return false;
        }

       // if (($('#sms').prop('checked') || $('#gmail').prop('checked')||$('#web').prop('checked'))== false ) {
          //  document.getElementById('access1_error_show').innerHTML ="Please choose access1 limit";
           // return false;
       // }

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
      //     document.getElementById('country_error').innerHTML= "Please select the country ";
      //     return false;
      // }

      //   if ($('#selectState').val().trim() == '') {
      //     $('#selectState').focus();
      //     $('#selectState').attr('style', '');
      //     $('#selectState').attr('style', 'border-bottom:2px solid #FF0000;');
      //     document.getElementById('state_error').innerHTML= "Please select the State ";
      //     return false;
      //    }

         
         if (($('#selectRegulation').val() == null)|| ($('#selectRegulation').val().trim() == '') ){
          $('#selectRegulation').focus();
          $('#selectRegulation').attr('style', '');
          $('#selectRegulation').attr('style', 'border-bottom:2px solid #FF0000;');
          document.getElementById('reg_error').innerHTML= "Please select the Regulation ";
          return false;
      }

     var _self = this;
       console.log($('#selectGeography').find(':selected').text());

        var checkId= selectedCountry+"_"+selectedGeography+"_"+selectedState+"_"+selectedReg;

        var dataExist = this.regCollectionView.collection.where({id:checkId});

        if( dataExist.length > 0 )
        {
             var  country_name = $("#selectCountry").find(':selected').text();
             var  state_name = $("#selectState").find(':selected').text();
              if(country_name == "Select"){
              geography_name = $("#selectGeography").find(':selected').text();
              country_name= "-";
              state_name=$("#selectState").find(':selected').text();
              regulation_name=$("#selectRegulation").find(':selected').text();
              } else if(state_name == "Select"){
              geography_name = $("#selectGeography").find(':selected').text();
              country_name= $("#selectCountry").find(':selected').text();
              state_name="-";
              regulation_name=$("#selectRegulation").find(':selected').text();
              }else{
              geography_name = $("#selectGeography").find(':selected').text();
              country_name= $("#selectCountry").find(':selected').text();
              state_name=$("#selectState").find(':selected').text();
              regulation_name=$("#selectRegulation").find(':selected').text();
              }
            document.getElementById('user_reg_error').innerHTML= "Alread exixts - "+geography_name+","+country_name+","+state_name+","+regulation_name;
      
          return false;
        }
    var  country_name=$("#selectCountry").find(':selected').text();
     var  state_name=$("#selectState").find(':selected').text();
    if(country_name == "Select"){
       var userRegData ={
          id: selectedCountry+"_"+selectedGeography+"_"+selectedState+"_"+selectedReg,
          geography_id : selectedGeography,
          country_id :selectedCountry,
          state_id : selectedState,
          regulation_id : selectedReg,
          geography_name:$("#selectGeography").find(':selected').text(),
          country_name:"-",
          state_name:$("#selectState").find(':selected').text(),
          regulation_name:$("#selectRegulation").find(':selected').text(),
          sms:$('#sms').prop('checked')? "Yes":"No",
          web:$('#web').prop('checked')? "Yes":"No",
          email:$('#email').prop('checked')? "Yes":"No",
          newOne:"yes"
       };
   }
   else if(state_name == "Select"){
       var userRegData ={
          id: selectedCountry+"_"+selectedGeography+"_"+selectedState+"_"+selectedReg,
          geography_id : selectedGeography,
          country_id :selectedCountry,
          state_id : selectedState,
          regulation_id : selectedReg,
          geography_name:$("#selectGeography").find(':selected').text(),
          country_name:$("#selectCountry").find(':selected').text(),
          state_name:"-",
          regulation_name:$("#selectRegulation").find(':selected').text(),
          sms:$('#sms').prop('checked')? "Yes":"No",
          web:$('#web').prop('checked')? "Yes":"No",
          email:$('#email').prop('checked')? "Yes":"No",
          newOne:"yes"
       };
   }
       else{
        var userRegData ={
          id: selectedCountry+"_"+selectedGeography+"_"+selectedState+"_"+selectedReg,
          geography_id : selectedGeography,
          country_id :selectedCountry,
          state_id : selectedState,
          regulation_id : selectedReg,
          geography_name:$("#selectGeography").find(':selected').text(),
          country_name:$("#selectCountry").find(':selected').text(),
          state_name:$("#selectState").find(':selected').text(),
          regulation_name:$("#selectRegulation").find(':selected').text(),
          sms:$('#sms').prop('checked')? "Yes":"No",
          web:$('#web').prop('checked')? "Yes":"No",
          email:$('#email').prop('checked')? "Yes":"No",
          newOne:"yes"
       };
       }
       console.log(" selected value "+JSON.stringify(userRegData));
       //this.regCollectionView.collection.add(userRegData);


     /*  this.regCollectionView = new admin.CreateUserTableView({
                    el: $( '#user-list-table' ),
                    egcollection: userRegData
                });*/
           
        this.regCollectionView.collection.add(userRegData);

        return false;
    }

 
});


