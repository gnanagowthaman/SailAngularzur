var admin = admin || {};

admin.FileUploadStateCollectionView = Backbone.View.extend({

	initialize: function() {
	    console.log('Initialize StateCollectionView');
	    console.log('countryCollection'); console.log(this.collection);
		//this.collection = new admin.StateCollection(this.collection);
		_.bindAll(this, "renderState");
		_.bindAll(this, "render");
		this.render();
	},

	events: {
      //'change #selectState' : 'isSelected' 
	},

	render: function() {
    	console.log('Rendering StateCollectionView');
        this.$el.html( '<option value="">Select</option>' );
       
		this.collection.each(function(item) {
      		     console.log(item.get('state_id'));console.log(item.get('sname'));
			this.renderState(item);
		}, this );
    	return this;
	},	

	renderState: function( item ) {
		var stateItemView = new admin.FileUploadStateItemView({
			model: item
		});
    	this.$el.append( stateItemView.render().el );
    },

     isSelected: function(e) {
        e.preventDefault();
        console.log('Geo Triggered'); 
        var stateID = parseInt($(this.el).val(), 10);
        var geoId = appRouter.currentView.fileUploadConfig.geoId;
        var countryId = appRouter.currentView.fileUploadConfig.countryId;
        var domainArray = appRouter.currentView.regulationData.domainCollection;
        if (domainArray.length > 0) {
          var domainCollection = new admin.DomainCollection(domainArray);
          
        var countryName = $("#selectCountry").val();
        console.log("countryName", countryName);

        if(countryName == undefined || countryName == ""){
       var filter = {sid: stateID, gid : geoId, cntid : 23, sid : stateID }; 
       console.log(JSON.stringify(filter));
       var domainCollectionByGeo = new admin.DomainCollection(domainCollection.where(filter));         
       console.log('domainCollectionByGeo');
       console.log(JSON.stringify(domainCollectionByGeo));         
      }else{
        var filter = {sid: stateID, gid : geoId, cntid : countryId, sid : stateID }; 
       console.log(JSON.stringify(filter));
       var domainCollectionByGeo = new admin.DomainCollection(domainCollection.where(filter));         
       console.log('domainCollectionByGeo');
       console.log(JSON.stringify(domainCollectionByGeo));  
      }

        
          if (this.domainCollectionView) 
          {
              this.domainCollectionView.$el.empty();
              //this.domainCollectionView.$el.unbind();
              this.domainCollectionView.collection = domainCollectionByGeo;
              this.domainCollectionView.render();
          }  
          else
          {                 
          this.domainCollectionView = new admin.DomainCollectionView({
                  el: $( '#selectDomain' ),
                collection: domainCollectionByGeo
            });
          }

              $(this.domainCollectionView.el).attr('disabled', false);
              this.domainCollectionView.disabledElement();
        
            //set selected geo name
            console.log('stateName: ' + $("#selectState option:selected").text());
            appRouter.currentView.fileUploadConfig.stateName = $("#selectState option:selected").text();
            appRouter.currentView.fileUploadConfig.stateID = stateID;

            appRouter.stateName = $("#selectState option:selected").text();
        }
    },

     disabledElement : function()
    {
        console.log("Disable element called .............>>>>>>>>>>>>>state");


          if (this.domainCollectionView) 
          {
              $(this.domainCollectionView.el).attr('disabled', true);

              this.domainCollectionView.collection.reset();
              this.domainCollectionView.$el.empty();
                 // this.regCollectionView.$el.unbind();
                  this.domainCollectionView.render();
             this.domainCollectionView.disabledElement();
          }

        
    }    
	
});