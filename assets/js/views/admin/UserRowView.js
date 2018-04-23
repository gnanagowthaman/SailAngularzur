var admin = admin || {};

admin.UserRowView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template( $( '#userListRowTpl' ).html() ),

	events: {
		'click #editUser': 'renderEditForm',
        'click #delUser': 'deleteUser',       
	},

	initialize: function() {
    	_.bindAll(this, "render");
    	this.model.bind('change', this.render);
	},

    render: function() {
        console.log("from the tablelist model", this.model)
        this.$el.html( this.template( this.model.attributes ) );
        this.timeformat();
        return this;
    },

    timeformat: function(){
        data1=this.model.get('user_name');
        data2=this.model.get('type');
        timestamp=this.model.get('renewal_date');
        var todate=new Date(timestamp).getDate();
        var tomonth=new Date(timestamp).getMonth()+1;
        var toyear=new Date(timestamp).getFullYear();
        var original_date=tomonth+'/'+todate+'/'+toyear;
        conndata=data1+data2;
        console.log(conndata, original_date);
        $( document ).ready(function() {
       		$('#'+conndata).text(original_date);
       	});
    },
	renderEditForm: function (e) {
		e.preventDefault();
		console.log("renderEditAdminUserForm");
		if (new String(this.model.get('type')).valueOf() == new String('admin').valueOf()) {
			appRouter.navigate("renderEditAdminUserForm/" + this.model.get('id'), {trigger: true});
		} else {
			appRouter.navigate("renderEditUserForm/" + this.model.get('id'), {trigger: true});
		}		        
	},
    dataDismissModal : function(e){
        console.log(this.model);
        var modalId = this.model.get('id');
        console.log('modalId: ', modalId);
        $('#' + modalId).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    },
    deleteUser: function(e) {       
        var _self = this;
        this.model.destroy({
            wait: true,
            success: function() {
                _self.dataDismissModal();
                _self.unbind();
                _self.remove();                
                offset-=1;  
                $( "div.success" ).html("User Deleted Successfully.");
                $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
                console.log('Deleted');
            },
            error: function() {
                try{
                    if ( errData.errCode == 550) {
                            window.location.href = '/sessionExpired';
                    } else {
                        $( "div.failure" ).html("Error while deleting the User. Contact Administrator.");
                        $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );
                    }
                }catch(e) {
                        window.location.href = '/sessionExpired';
                    }
                }
        });         
    }
    
});	