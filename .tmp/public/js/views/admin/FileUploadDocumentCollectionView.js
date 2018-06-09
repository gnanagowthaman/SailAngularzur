var admin = admin || {};

admin.FileUploadDocumentCollectionView = Backbone.View.extend({

	initialize: function() {
        appRouter.fileUploadConfig = {};
        appRouter.fileUploadConfig.documentCollection = this.collection;
	    console.log('Initialize DocumentCollectionView');
	    console.log('DocumentCollection'); console.log(appRouter.fileUploadConfig.documentCollection);
		_.bindAll(this, "renderDocument");
		_.bindAll(this, "render");
		this.render();
	},

	events: {
      //'change #selectRootDoc' : 'isSelected'
      // 'change #selectRootDoc' : 'isSelected' 
	},

	render: function() {
    	console.log('Rendering DocumentCollectionView');
    	this.$el.html( '<option value="">Select</option>' );
        if( appRouter.fileUploadConfig.documentCollection )
        {
    		appRouter.fileUploadConfig.documentCollection.each(function(item) {
          		// console.log(item.get('docid'));console.log(item.get('docname'));
                // console.log(item.get('is_special_doc'));
                // is_special_doc = item.get('is_special_doc');
    			this.renderDocument(item);
    		}, this );
        }
         console.log("collection ::", appRouter.fileUploadConfig.documentCollection);
    	return this;
	},	

	renderDocument: function( item ) {
		var documentItemView = new admin.FileUploadDocumentItemView({
			model: item
		});
    	this.$el.append( documentItemView.render().el );
	},

    isSelected: function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Document Triggered');
        var regDocId = parseInt($(this.el).val(), 10);
        var regId = appRouter.currentView.fileUploadConfig.regId;
        var regulatorId = appRouter.currentView.fileUploadConfig.regulatorId;
        var domainId = appRouter.currentView.fileUploadConfig.domainId;
        var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var countryId    = appRouter.currentView.fileUploadConfig.countryId;
        var stateId    = appRouter.currentView.fileUploadConfig.stateID;
        console.log('RegName: ' + $("#selectRootDoc option:selected").text());

        appRouter.fileUploadConfig.geoId = geoId;
        appRouter.fileUploadConfig.countryId = countryId;
        appRouter.fileUploadConfig.stateId = stateId;
        appRouter.fileUploadConfig.domainId = domainId;        
        appRouter.fileUploadConfig.regulatorId = regulatorId;
        appRouter.fileUploadConfig.regId = regId;      
        appRouter.fileUploadConfig.regDocId = regDocId;
        appRouter.fileUploadConfig.geoName = appRouter.currentView.fileUploadConfig.geoName;
        appRouter.fileUploadConfig.countryName = appRouter.currentView.fileUploadConfig.countryName;
        appRouter.fileUploadConfig.stateName = appRouter.currentView.fileUploadConfig.stateName;
        appRouter.fileUploadConfig.domainName = appRouter.currentView.fileUploadConfig.domainName;
        appRouter.fileUploadConfig.regulatorName = appRouter.currentView.fileUploadConfig.regulatorName;
        appRouter.fileUploadConfig.regName = appRouter.currentView.fileUploadConfig.regName;
        appRouter.fileUploadConfig.docName = $("#selectRootDoc option:selected").text();
        console.log( JSON.stringify(appRouter.fileUploadConfig));

        appRouter.regId = regId;
        appRouter.regulatorId = regulatorId;
        appRouter.domainId = domainId;
        appRouter.geoId = geoId;
        appRouter.countryId = countryId;
        appRouter.stateId = stateId;
        appRouter.regDocId = regDocId;

        var docname =  $("#selectRootDoc option:selected").text();
        console.log('docname: ', docname);
        console.log(this.collection);
        var is_special_doc = this.collection.findWhere({"docname" : docname}).get('is_special_doc');
        console.log("is_special_doc" ,is_special_doc);
        if(is_special_doc == 1) {      
          regName = appRouter.fileUploadConfig.regName;
          appRouter.fileUploadConfig.docName = docname;
          console.log( appRouter.fileUploadConfig.docName);
          appRouter.fileUploadConfig.regDocId = regDocId;  
           console.log(">>>>>>>>>>>>>>>>>>>13");
          //$('#filePage').empty();
          $('#page-section').empty();
          $('#page-section').unbind(); 
          console.log('APP_ROUTER-FILE_CONFIG1: ', JSON.stringify(appRouter.fileUploadConfig));          
          // this.lifeCyclePageView = new admin.LifeTrackerManagementPageView({el: $('#page-section')});
          // appRouter.navigate("renderLifeTrackerManagementPage", {trigger: true});
        } else {

            var subdocArray = appRouter.currentView.regulationData.subDocumentCollection;

            console.log(subdocArray);
            subdocname = subdocArray[0].subdocname;
            console.log(subdocname);
            if (subdocArray.length == 0) {
                $('#selectDocName').hide();
                $('#selectSubDoc').hide();
                $('#uploadFile').attr('disabled', false).css('cursor','pointer');        
                $('#uploadFileLabel').attr('disabled', false).css('cursor','pointer');
                $('#fileName').css('cursor','default');
                var documentName = $("#selectRootDoc option:selected").text();
                appRouter.currentView.fileUploadConfig.docName = documentName;
                appRouter.currentView.fileUploadConfig.regDocId = regDocId;  
                //set doc level
                var docNameLcase = documentName.toLowerCase().trim();
                if (docNameLcase.indexOf('level') !== -1) {
                    var levelStr = docNameLcase.charAt(docNameLcase.length-1);
                    var level = parseInt(levelStr, 10);

                    console.log("to check the level inside of the action", level);
                } else {
                    var level = 1; 
                }
                console.log("to check the level outside of the action", level);
                appRouter.currentView.fileUploadConfig.level = level;

                console.log(appRouter.currentView.fileUploadConfig.level);
            }else {
                 var subDocCollection = new admin.SubDocCollection(subdocArray);
                console.log('subDocCollection');
                console.log(JSON.stringify(subDocCollection));

                var filter = {gid: geoId, cntid : countryId, sid : stateId, did: domainId, rid: regulatorId, rlid : regId, docid : regDocId };  
                console.log(JSON.stringify(filter))
               var docCollectionByReg = new admin.DocumentCollection(subDocCollection.where(filter));         
               console.log('docCollectionByReg');
               console.log(JSON.stringify(docCollectionByReg));

            if(docCollectionByReg.length == 0){
                $('#selectDocName').hide();
                $('#selectSubDoc').hide();
                $('#uploadFile').attr('disabled', false).css('cursor','pointer');        
                $('#uploadFileLabel').attr('disabled', false).css('cursor','pointer');
                $('#fileName').css('cursor','default');
                var documentName = $("#selectRootDoc option:selected").text();
                appRouter.currentView.fileUploadConfig.docName = documentName;
                appRouter.currentView.fileUploadConfig.regDocId = regDocId;  
                //set doc level
                var docNameLcase = documentName.toLowerCase().trim();
                if (docNameLcase.indexOf('level') !== -1) {
                    var levelStr = docNameLcase.charAt(docNameLcase.length-1);
                    var level = parseInt(levelStr, 10);
                    console.log("to check the level inside of the action", level);

                } else {
                    var level = 1; 
                }
                console.log("to check the level outside of the action", level);

                appRouter.currentView.fileUploadConfig.level = level;
                console.log(appRouter.currentView.fileUploadConfig.level);
                
            }
            else{
                var documentName = $("#selectRootDoc option:selected").text();
                appRouter.currentView.fileUploadConfig.docName = documentName;
                appRouter.currentView.fileUploadConfig.regDocId = regDocId;  
                //set doc level
                var docNameLcase = documentName.toLowerCase().trim();
                if (docNameLcase.indexOf('level') !== -1) {
                    var levelStr = docNameLcase.charAt(docNameLcase.length-1);
                    var level = parseInt(levelStr, 10);
                    console.log("to check the level inside of the action", level);

                } else {
                    var level = 1; 
                }
                console.log("to check the level outside of the action", level);

                appRouter.currentView.fileUploadConfig.level = level;
                console.log(appRouter.currentView.fileUploadConfig.level);
                
                if (this.subDocumentCollectionView) 
                {
                    this.subDocumentCollectionView.$el.empty();
                    //this.subDocumentCollectionView.$el.unbind();
                     this.subDocumentCollectionView.collection = docCollectionByReg;
                     this.subDocumentCollectionView.render();

                } 
                else
                {   
                    //$("#selectSubDoc option:contains('-')").remove();                   
                    this.subDocumentCollectionView = new admin.FileUploadSubDocumentCollection(
                        { el: $( '#selectSubDoc' ),
                          collection: docCollectionByReg
                        });
                }
            }

                $(this.subDocumentCollectionView.el).attr('disabled', false);
               
                //set selected reg name
                console.log('RegName: ' + $("#selectRootDoc option:selected").text());
                appRouter.currentView.fileUploadConfig.docName = $("#selectRootDoc option:selected").text();
                appRouter.currentView.fileUploadConfig.regDocId = regDocId;  
                $('#uploadFile').attr('disabled', false).css('cursor','pointer');        
                $('#uploadFileLabel').attr('disabled', false).css('cursor','pointer');
                $('#fileName').css('cursor','default');

            }                
       }
        // console.log(">>>>>>>>>>>>>>>>>>>14");
    },

  disabledElement : function()
    {
        console.log("Disable element called .............>>>>>>>>>>>>>document");


          if (this.subDocumentCollectionView) 
          {
              $(this.subDocumentCollectionView.el).attr('disabled', true);

              this.subDocumentCollectionView.collection.reset();
              this.subDocumentCollectionView.$el.empty();
                 // this.regCollectionView.$el.unbind();
                  this.subDocumentCollectionView.render();
             this.subDocumentCollectionView.disabledElement();
          }

        
    }       
	
});