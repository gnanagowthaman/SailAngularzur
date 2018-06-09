var admin = admin || {};

admin.DocumentCollectionView = Backbone.View.extend({

	initialize: function() {
	    console.log('Initialize DocumentCollectionView');
	    console.log('DocumentCollection'); console.log(this.collection);
		_.bindAll(this, "renderDocument");
		_.bindAll(this, "render");
		this.render();
	},

	events: {
      'change' : 'isSelected' 
	},

	render: function() {
    	console.log('Rendering DocumentCollectionView');
    	this.$el.html( '<option value="">Select</option>' );
		this.collection.each(function(item) {
      		console.log(item.get('id'));console.log(item.get('docname'));
			this.renderDocument(item);
		}, this );
    	return this;
	},	

	renderDocument: function( item ) {
		var documentItemView = new admin.DocumentItemView({
			model: item
		});
    	this.$el.append( documentItemView.render().el );
	},

    isSelected: function(e) {
        e.preventDefault();
        console.log('Document Triggered'); 
        var regDocId = parseInt($(this.el).val(), 10);
        appRouter.currentView.fileUploadConfig.regDocId = regDocId;
        // $('#selectLevel').attr('disabled', false);
        //set selected doc name
        var docName = $("#selectDoc option:selected").text();
        appRouter.currentView.fileUploadConfig.docName = docName;
        //set doc level
        var docNameLcase = docName.toLowerCase().trim();
        if (docNameLcase.indexOf('level') !== -1) {
            var levelStr = docNameLcase.charAt(docNameLcase.length-1);
            var level = parseInt(levelStr, 10);
        } else {
            var level = 1; 
        }
        // var docNameArray = docName.split('-');
        // var level = docNameArray[docNameArray.length-1];
        appRouter.currentView.fileUploadConfig.level = level;
        console.log('fileUploadConfig'); console.log(appRouter.currentView.fileUploadConfig);
        $('#uploadFile').attr('disabled', false).css('cursor','pointer');        
        $('#uploadFileLabel').attr('disabled', false).css('cursor','pointer');
        $('#fileName').css('cursor','default');
    }	
	
});