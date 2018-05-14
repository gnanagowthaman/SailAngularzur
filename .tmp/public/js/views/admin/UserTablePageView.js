var admin = admin || {};

admin.UserTablePageView = Backbone.View.extend({
    template: $( '#userListTableTpl' ).html(),

	initialize: function() {
    	this.render();
	},

	events: {
		'click #renderCreateUserFormPage'	  : 'renderCreateUserFormPage',
		'click #renderCreateAdminUserFormPage': 'renderCreateAdminUserFormPage',
		'click #loadMoreUser'                     : 'loadMore',
		'click #searchUser'                   : 'searchUser', 
        'input #searchUserTxt'                : 'searchUserList'
	},

	render: function() {			
		this.$el.html(this.template);
    	console.log('Rendering UserTablePageView');
    	this.userTableView = new admin.UserTableView({el: $( '#user-list-table' )});
        $('#no-record-found').hide();
        // appRouter.navigate("renderUserListTable", {trigger: true});
		return this;
	},

	renderCreateUserFormPage: function (e) {
		e.preventDefault();
        console.log('create user form');
        appRouter.navigate("renderUserForm", {trigger: true});
    },

	renderCreateAdminUserFormPage: function (e) {
		e.preventDefault();
        console.log('create admin form');
        appRouter.navigate("renderAdminUserForm", {trigger: true});
    }, 

    loadMore: function(e)  {        
        e.preventDefault();
        self=this;
        console.log('Rendering loadMore');
        // this.userList.sorting = 0;
        offset += limit;
        console.log("limit : offset " + limit + ' : ' + offset);
        this.userTableView.collection.fetch({
        	remove: false, 
        	data: { limit: limit, offset:offset }, 
        	processData: true,
            success: function (coll) {                
                console.log((self.userTableView.collection.toJSON()));               
                if ((self.userTableView.collection.length - offset) != limit) {
                    $('#findStatus').html("End Of Records");
                    $('#loadMoreUser').hide();
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
    },

    searchUser:function () {
        $('#findStatus').html("");
        var searchUserTxt = $('#searchUserTxt').val();
        console.log('searchUserTxt');console.log(searchUserTxt);
        var data = {};
        self=this;
        if(searchUserTxt.length > 0) {
            console.log("more");
            data.user_name = searchUserTxt;
            this.userTableView.collection.fetch({reset: true, data:data, processData: true,
                success: function (coll) {
                    $( '#user-list-table' ).empty();
                    $( '#user-list-table' ).unbind();                       
                    self.userTableView.render();
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
                              var failureMsg = "Error while Searching user, Please Contact Administrator.";  
                            }
                            $( "div.failure").html(failureMsg);
                            $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
                        }
                    }catch(e){
                        window.location.href = '/sessionExpired';
                    }
                }
            });
                $("#loadMore").hide();     
        }
        if(searchUserTxt.length == 0) {            
            console.log("empty");
            offset = 0;
            data.limit = limit;
            data.offset = offset;
            this.userTableView.collection.fetch({reset: true, data:data, processData: true,
                success: function (coll) {
                    $( '#user-list-table' ).empty();
                    $( '#user-list-table' ).unbind();                       
                    self.userTableView.render();   
                },
                error: function(err) {
                    try{
                        var errData = JSON.parse(data.responseText);
                        if ( errData.errCode == 550) {
                            window.location.href = '/sessionExpired';
                        } else {
                            if (errData.errMsg.length > 0) {
                              var failureMsg = errData.errMsg;  
                            } else {
                              var failureMsg = "Error while Searching user, Please Contact Administrator.";  
                            }
                                $( "div.failure").html(failureMsg);
                                $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
                        }
                    }catch(e){
                        window.location.href = '/sessionExpired';
                    }
                    // $( "div.failure").html(" Error while searching the User . Contact Administrator.");
                    // $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );                      
                }
            }); 
                $("#loadMore").show();         
        }
    },   

    searchUserList:function () {
        $('#findStatus').html("");
        var searchUserTxt = $('#searchUserTxt').val();
        console.log('searchUserTxt');console.log(searchUserTxt);
        var data = {};
        self=this;
        if(searchUserTxt.length > 0) {
            console.log("more");
            data.user_name = searchUserTxt;
            this.userTableView.collection.fetch({reset: true, data:data, processData: true,
                success: function (coll) {
                    $( '#user-list-table' ).empty();
                    $( '#user-list-table' ).unbind(); 
                    if(self.userTableView.collection.length == 0){
                        $('#no-record-found').show();
                        $('#SearchResult').html("Search Result not found");
                        offset = 0;
                        data.limit = limit;
                        data.offset = offset;
                        self.userTableView.collection.fetch({reset: true, data:data, processData: true});
                        self.userTableView.render();

                    }   
                   //$('#SearchResult').html("");
                    else{
                        $('#SearchResult').html("");                    
                        $('#no-record-found').hide();
                        self.userTableView.render();
                    }                                                                    
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
                              var failureMsg = "Error while Searching user, Please Contact Administrator.";  
                            }
                                $( "div.failure").html(failureMsg);
                                $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
                        }
                    }catch(e){
                        window.location.href = '/sessionExpired';
                    }
                }
            });
            $("#loadMore").hide();     
        }
        if(searchUserTxt.length == 0) {            
            console.log("empty");
            offset = 0;
            data.limit = limit;
            data.offset = offset;
            this.userTableView.collection.fetch({reset: true, data:data, processData: true,
                success: function (coll) {
                    $( '#user-list-table' ).empty();
                    $( '#user-list-table' ).unbind();
                    $('#SearchResult').html("");
                    $('#no-record-found').hide();
                    self.userTableView.render();   
                },
                error: function(err) {
                    try{
                        var errData = JSON.parse(data.responseText);
                        if ( errData.errCode == 550) {
                            window.location.href = '/sessionExpired';
                        } else {
                            if (errData.errMsg.length > 0) {
                              var failureMsg = errData.errMsg;  
                            } else {
                              var failureMsg = "Error while Searching user, Please Contact Administrator.";  
                            }
                                $( "div.failure").html(failureMsg);
                                $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
                         }
                    }catch(e){
                        window.location.href = '/sessionExpired';
                    }                     
                }
            }); 
                $("#loadMore").show();         
        }
     }      
});


