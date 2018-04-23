    var admin = admin || {};
     
    admin.AdminUserFormPageView = Backbone.View.extend({
        initialize: function(options) {
            this.fileUploadConfig = {};
            this.userId = options.id;
            this.template = options.template;
            var geomap=[];
            var _self = this;
            this.regMap = {};
            console.log (' userId: ' + this.userId);
                 //Create User Form
                var findRegs = "/findRegByGeo4Create";
                $.when(
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
                    }),
                    $.ajax({
                          type: "GET",
                          url: "/findRegbygeostate", //if create mode then findRegByGeo4Create else if edit mode then findByGeo4Edit/id    
                          success: function(data) {
                            console.log(data);
                            _self.regulations = data;
                            console.log( " _self.regulations ::" + JSON.stringify(_self.regulations));
                          }
                    })                                     
                    
                ).done(function () {
                    _self.render(); 
                     _self.geoCollectionView = new admin.UserGeoCollectionView({
                        el: $( '#selectGeography' ),
                        usergeoCollection: _self.regulations
                    });
                    _self.regCollectionView = new admin.CreateUserTableView({
                        el: $( '#admin-list-table' )
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
                                    var failureMsg = "Error occurred while fetching the Regulations. Please Contact Administrator.";    
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
            'click #save'            : 'saveUser',
            'click #cancel'            : 'cancelUser',
            'change #zurik'         : 'enableFileOperation',
            'change #others'         : 'disableFileOperation',
            'change #full'             : 'fullAccess',
            'change #restricted'    : 'restrictedAcess',
            'change .regClicked'     : 'regClicked',
            'click #email_id'       : 'mailidFocus',
            'click #user_name'      :'nameFocus',
            'click #createAdmin'    :'createAdminClick',
            'click #createUser'     :'createUserClick',
            'click #edituser'       :'editUserClick',
            'click #deleteuser'     :'deleteUserClick',
            'click #upload'         :'uploadClick',
            'click #publish'        :'publishClick',
            'click #delete'         :'deleteClick',
            'click #paid'           :'paidClick',
            'click #free'           :'freeClick',
            'click #add'            :'addadminRegulation'
        },
     
        render: function() {
            if (new String(this.mode).valueOf() == new String('create').valueOf()) {
                console.log('this.template'); console.log(this.template);
                this.$el.html(this.template);
            } else { //edit
                this.$el.html(this.template( this.userData ));
            }                        
            console.log('Rendering AdminUserFormPageView');
            return this;
        },
     
        saveUser: function (e) {
            e.preventDefault();
            console.log('save new admin user');        
            //-----------------------------------Client Validation Starts---------------------------------------    
            document.getElementById('user_error').innerHTML= "";
            document.getElementById('mail_error').innerHTML= "";
            var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var regex1 =  /^[a-zA-Z ]*$/; 
     
            //For validating the emailid form
            // if ($('#user_name').val().trim() == '' && $('#email_id').val().trim() == '') {
            //     $('#user_name').focus();
            //     $('#user_name').attr('style', 'border-bottom:2px solid #FF0000;');
            //     $('#email_id').attr('style', 'border-bottom:2px solid #FF0000;');
            //     // var message = "Please Enter The User Name";
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
            //For Validating the organisation
            if (($('#zurik').prop('checked') || $('#others').prop('checked')) == false ) {
                //alert("Please select the organisation");
                document.getElementById('org_error_show').innerHTML= "Please select the organisation";
                return false;
            }
            //For Validating the Credential
            if (($('#createAdmin').prop('checked') || $('#createUser').prop('checked')) == false ) {
                //alert("Please select the Credential type");
                document.getElementById('credential_error_show').innerHTML= "Please select the Credential type";
                return false;
            }        
            //For Validating the Operations Allowed(User)
            if (($('#edituser').prop('checked') || $('#deleteuser').prop('checked')) == false ) {
                //alert("Please select the Operations Allowed(User) type");
                document.getElementById('opeation_allowed_error_show').innerHTML= "Please select the Operations Allowed(User) type";
                return false;
            }
            //For Validating the Operations Allowed(File)
            if($('#zurik').prop('checked')){
                 if (($('#upload').prop('checked') || $('#publish').prop('checked')  || $('#delete').prop('checked')) == false ) {
                    //alert("Please select the Operations Allowed(File) type");
                    document.getElementById('opeation_allowed_file_error_show').innerHTML= "Please select the Operations Allowed(File) type";
                    return false;
                 }
            }
            //For Validating the subscription
            if (($('#free').prop('checked') || $('#paid').prop('checked')) == false ) {
                //alert("Please check the subscription");
                document.getElementById('subscription_error_show').innerHTML= "Please check the subscription";
                return false;
            }
            //For Validating the Access
            if (($('#full').prop('checked') || $('#restricted').prop('checked')) == false ) {
                //alert("Please choose access limit");
                document.getElementById('access_error_show').innerHTML= "Please choose access limit";
                return false;
            }
     
            //Select geopgrpahy ,country , state and regulation
              var selectedCountry =  $("#selectCountry").val();
              var selectedGeography =  $("#selectGeography").val();
              var selectedState =  $("#selectState").val();
              var selectedReg =  $("#selectRegulation").val();
     
           
            //-----------------------------------Client Validation Ends---------------------------------------    
            var saveUserUrl = ''; 
            //Set Basic form fields
            var userFormData = {
                user_name     : $('#user_name').val().trim(),
                email_id     : $('#email_id').val().trim(),
                company_name : $( "input[type=radio][name=organization]:checked" ).val(),
                role_id         : 2,  //this is PK of Role table for admin/client
                subscription : $( "input[type=radio][name=subscription]:checked" ).val(), 
                access          : $( "input[type=radio][name=access]:checked" ).val(),            
                credential   : $( "input[type=radio][name=credential]:checked" ).val()
            };
            console.log("userFormData",userFormData);
            //Set user_id & saveUserUrl based on mode 
        
                saveUserUrl = "/createUser";
                var successMsg = "User Created Successfully.";
                var failureMsg = "Error while creating the User. Contact Administrator.";            
            
            //Set company_name
            var company_name = $( "input[type=radio][name=organization]:checked" ).val();
            if (company_name) {
                userFormData.company_name = company_name;
            } else {
                userFormData.company_name = 'others';
            }
            //Set Operation Array
            var operations = [];
            // if (new String(userFormData.company_name).valueOf() == new String('zurik').valueOf()) {
                if ($('#upload').prop('checked')) {
                    operations.push('upload');
                } 
                if ($('#publish').prop('checked')) {
                    operations.push('publish');
                } 
                if ($('#delete').prop('checked')) {
                    operations.push('delete');
                }
                if ($('#edituser').prop('checked')) {
                    operations.push('edituser');
                } 
                // if ($('#lockuser').prop('checked')) {
                //     operations.push('lockuser');
                // }
                if ($('#deleteuser').prop('checked')) {
                    operations.push('deleteuser');
                }
            // }
            userFormData.operations = operations;    
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
                                          regulation_id     : item.get('regulation_id'),
                                          regulation_name : item.get('regulation_name'),
                                          geography_id     : item.get('geography_id'),
                                          country_id         : item.get('country_id'),
                                          state_id         : item.get('state_id')
                                      };
                                      userFormData.regulations.push(regulationItem);
                                  
                            });
                    
            }        
            console.log(userFormData);
            // POST the data to server
            $.ajax({
              type         : "POST",
              url         : saveUserUrl, //if create mode then createUser else if edit mode then updateUser
              data         : userFormData,      
              success    : function(data) {
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
              
                   }catch(e) {
                    window.location.href = '/sessionExpired';
                }
              }
     
            });        
        },
     
        cancelUser: function(e) {
            e.preventDefault();
            appRouter.navigate("manageUsers", {trigger: true});        
        },
     
        enableFileOperation: function(e) {
            e.preventDefault();
            $('#org_error_show').html("");
            var isZurikAdmin = $(e.target).prop('checked');
            console.log('isZurikAdmin'); console.log(isZurikAdmin);
            if (isZurikAdmin) {
                $('#upload').prop('disabled', false);
                $('#publish').prop('disabled', false);
                $('#delete').prop('disabled', false);
            }
        },
     
        disableFileOperation: function(e) {
            e.preventDefault();
            $('#org_error_show').html("");
            var isZurikAdmin = $(e.target).prop('checked');
            console.log('isOthersAdmin'); console.log(isZurikAdmin);
            if (isZurikAdmin) {
                $('#upload').prop('disabled', true); $('#upload').prop('checked', false);
                $('#publish').prop('disabled', true); $('#publish').prop('checked', false);
                $('#delete').prop('disabled', true); $('#delete').prop('checked', false);
            }
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
                 $('#access_error_show').html("");
        },
        
        restrictedAcess: function() 
        {
             console.log("Enabling the controls");
                 $('#access_error_show').html("");
                 $('#selectGeography').attr('disabled',false);     
        },
     
        mailidFocus: function()
        {
            $('#mail_error').html("");
            
        },
        nameFocus:function()
        {
            $('#user_error').html("");
        },
        createAdminClick:function(){
            $('#credential_error_show').html("");
        },
        createUserClick:function(){
            $('#credential_error_show').html("");
        },
        editUserClick:function(){
           $('#opeation_allowed_error_show').html("");
        },
        deleteUserClick:function(){
            $('#opeation_allowed_error_show').html("");
        },
        uploadClick:function(){
             $('#opeation_allowed_file_error_show').html("");
        },
        publishClick:function(){
              $('#opeation_allowed_file_error_show').html("");
        },
        deleteClick:function(){
              $('#opeation_allowed_file_error_show').html("");
        },
        paidClick:function(){
              $('#subscription_error_show').html("");
        },
        freeClick:function(){
             $('#subscription_error_show').html("");
        },
        userGeoClick:function(){
            $('#geo_error_show').html("");
        },
        userRegClick:function(){
            $('#reg_error_show').html("");
        },
        addadminRegulation: function(e)
        {
          var selectedCountry =  $("#selectCountry").val();
          var selectedGeography =  $("#selectGeography").val();
          var selectedState =  $("#selectState").val();
          var selectedReg =  $("#selectRegulation").val();
     
          var _self = this;
           console.log($('#selectGeography').find(':selected').text());
       
           var userRegData ={
                 id: selectedCountry+"_"+selectedGeography+"_"+selectedState+"_"+selectedReg,
                 geography_id : selectedGeography,
                 country_id :selectedCountry,
                 state_id : selectedState,
                 regulation_id : selectedReg,
                 geography_name:$("#selectGeography").find(':selected').text(),
                 country_name:$("#selectCountry").find(':selected').text(),
                 state_name:$("#selectState").find(':selected').text(),
                 regulation_name:$("#selectRegulation").find(':selected').text()
           }
     
           console.log(" selected value "+JSON.stringify(userRegData));
           //this.regCollectionView.collection.add(userRegData);
            this.regCollectionView = new admin.CreateAdminTableView({
                        el: $( '#admin-list-table' ),
                        egcollection: userRegData
                    });           
            this.regCollectionView.collection.add(userRegData);
           return false;
        }
     
    });
