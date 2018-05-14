var admin = admin || {};

admin.FileUploadSubDocumentCollection = Backbone.View.extend({

	initialize: function() {
	    console.log('Initialize Sub DocumentCollection');
	    console.log('SubDocumentCollection'); console.log(this.collection);
		_.bindAll(this, "renderSubDocument");
		_.bindAll(this, "render");
        parent_template='<span  style="width:190px; position: relative; left: 10px; float: left; margin: 0 15px 0 0px;"><div class="form-group "><label for="Sub2Doc">Select Sub2 Document</label><select class="form-control parent_control" disabled="disabled"><option value="">Select</option></select></div></span>';
		this.render();
	},

	events: {
        'change' : 'isSelected',
      'change select[name=myselect]' : 'isSelected',
      'select ':'isSelected'
      
	},

	render: function() {
    	console.log('Rendering DocumentCollectionView');
    	this.$el.html( '<option value="">Select</option>');

        if( this.collection )
        {
    		this.collection.each(function(item) {
          		console.log(item.get('sdocid'));console.log(item.get('subdocname'));
                 console.log(item.get('is_special_doc'));
                is_special_doc = item.get('is_special_doc');
    			this.renderSubDocument(item);
    		}, this );
        }
    	return this;
	},	

	renderSubDocument: function( item ) {
		var documentItemView =   new admin.FileUploadSubDocumentItem({
			model: item
		});
    	this.$el.append( documentItemView.render().el );
        //$("#selectSubDoc option:contains('-')").remove();  
	},

    isSelected: function(e) {
      //  e.preventDefault();
       // e.stopPropagation();
        $('#upload-span').prev().find("option:selected").val()?console.log("true"):$($('#upload-span').prev().remove())
        console.log("inside the change event", $(e.target).val());
        // subDocId=$(e.target).val();
        sub_DocId=$(e.target).val();
        console.log("check the subDocId value", sub_DocId, $(e.target).val());

        subDocName=$(e.target).find("option:selected").text();

        var regId = appRouter.currentView.fileUploadConfig.regId;
        var regulatorId = appRouter.currentView.fileUploadConfig.regulatorId;
        var domainId = appRouter.currentView.fileUploadConfig.domainId;
        var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var countryId    = appRouter.currentView.fileUploadConfig.countryId;
        var stateId    = appRouter.currentView.fileUploadConfig.stateID;
        var regDocId  = appRouter.currentView.fileUploadConfig.regDocId;
         appRouter.fileUploadConfig.sub_DocId = sub_DocId;
         appRouter.fileUploadConfig.subDocName = subDocName;
         console.log(regId,regulatorId,domainId,geoId,countryId,stateId,regDocId);
         console.log(appRouter.currentView.fileUploadConfig.sub_DocId);
         console.log(appRouter.currentView.fileUploadConfig.subDocName);
        if(is_special_doc == 1) {
            console.log(">>>>>>>>>>>>>>>>>>>13");
            $('#page-section').empty();
            $('#page-section').unbind();
           
            this.lifeCyclePageView = new admin.LifeTrackerManagementPageView({el: $('#page-section')});
        } 
        subCollection=new admin.SubDocCollection();
        _Self=this;
        subCollection.fetch({

                        success:function(){
                            console.log('Document Triggered',sub_DocId, e.target); 
                            var subDocId = parseInt(sub_DocId, 10);
                            console.log("check the subdocumentid", subDocId);
                            console.log("print the subcollection", subCollection);
                            sub_search = subCollection.where({'parent_id':subDocId});
                            console.log("print the search result", sub_search);
                            var docNameLcase = subDocName.toLowerCase().trim();
                            if (docNameLcase.indexOf('level') !== -1) {
                                var levelStr = docNameLcase.charAt(docNameLcase.length-1);
                                var level = parseInt(levelStr, 10);
                            } else {
                                var level = 1;
                            }
                            console.log("check the fileupload level", level);
                            appRouter.currentView.fileUploadConfig.level = level;
                            console.log("check the fileupload level", appRouter.currentView.fileUploadConfig.level);
                            if (sub_search.length == 0){

                                    // appRouter.currentView.fileUploadConfig.subDocId = subDocId;
                                    // $('#selectLevel').attr('disabled', false);
                                    //set selected doc name
                                    //var subDocName = $("#selectSubDoc option:selected").text();
                                    // appRouter.currentView.fileUploadConfig.subDocName = subDocName;
                                    //set doc level
                                   
                                    // var docNameArray = docName.split('-');
                                    // var level = docNameArray[docNameArray.length-1];
                                    console.log('fileUploadConfig'); console.log(appRouter.currentView.fileUploadConfig);
                                    $('#uploadFile').attr('disabled', false).css('cursor','pointer');        
                                    $('#uploadFileLabel').attr('disabled', false).css('cursor','pointer');
                                    $('#fileName').css('cursor','default');
                                    
                                   
                            }else{

                                $('#upload-span').prev().find("option:selected").val()?console.log("true"):$('#upload-span').prev().remove();
                                console.log("print the search result", sub_search);
                                console.log("check the else connection");
                                $('#Sub2Doc').empty();
                                $('#Sub2Doc').unbind();
                                $('#sub2-doc').css('display', 'block');
                                $('#Sub2Doc').attr('disabled', false);
                               
                                append_tag=$('#upload-span').prev().find('select');
                                $(parent_template).insertBefore( "#upload-span");
                                sub_search.forEach(function(option,index){
                                    opti=option.attributes;
                                    console.log("check the opti", opti);
                                    var opt=$("<option/>").attr({ value:opti.id, id:opti.name}).text(opti.name);
                                    $('#upload-span').prev().find('select').append(opt);
                                });

                                //$('.parent_control').unbind('change');
                                $('.parent_control').bind('change',  _Self.isSelected);
                                $(document).on('change', '.parent_control', _Self.isSelected);
                                $('#upload-span').prev().find('select').attr('disabled', false).css('cursor','pointer');     
                                $('#uploadFile').attr('disabled', false).css('cursor','pointer');        
                                $('#uploadFileLabel').attr('disabled', false).css('cursor','pointer');
                                $('#fileName').css('cursor','default');
                                        
                            }
                        }
        });

       
    },

    enableFileChooser: function()
    {
        $('#uploadFile').attr('disabled', false).css('cursor','pointer');        
        $('#uploadFileLabel').attr('disabled', false).css('cursor','pointer');
        $('#fileName').css('cursor','default');
    },

     disabledElement : function()
    {
          console.log("Disable element called .............>>>>>>>>>>>>>sub document");
        $(this.el).attr('disabled', true);
         $('#uploadFile').attr('disabled', true).css('cursor','not-allowed');        
        $('#uploadFileLabel').attr('disabled', true).css('cursor','not-allowed');
        $('#fileName').css('cursor','not-allowed');
    },	

 
	
});