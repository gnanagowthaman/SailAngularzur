var app = app || {};

app.SearchView = Backbone.View.extend({
  	el : $("#mainCanvas"),

	initialize: function(options) {
		$('.hamburger-menu').hide();
		this.searchKey = options.searchKey;
		console.log(this.searchKey);	    
		 app.ClientAppRouter.trail_user=false;
		this.searchCollection = new app.SearchList();
		this.trail = new app.TrailModel();
		this.parentDiv = '<div id="centerContainer" class="udb"></div>';
		this.rowtpl1 = '<div class="searchcontent1"><a class="searchRow"><h3 id="docpath" style="position: relative;top: 15px;">';
		this.rowtpl2 = '</h3></a><p>';
		this.rowtpl3 = '</p></div>';
		this.rowtpl4 = '';
		//To show no data found html table structure is used
	    this.templ 	= "<td class='text-center header' id='elem'></td>";
	    this.tbl 	= "<table border='0' style='background-color: #FFECEC; opacity: 1;' class='table table-hover dt-responsive '> <thead  id ='xlshead' ><tr id='xlsheadrow'></tr> </thead> <tbody id='xlsbody'><tr id='xlsbodyrow'></tr></tbody> </table>";		
	  	_.bindAll(this, "render");
	  	_.bindAll(this, "renderSearchResult");
	  	_.bindAll(this, "showNoData");
                app.ClientAppRouter.origin = 0;
	  	this.render();				
	},

	events: {
		'click .showDocument': 'showDocumentInTreeView',
		 'click .trail_download':'trailuser_check',
	},

	render: function () {
		console.log(this.searchKey);
		this.$el.empty();
		var _self = this;
		this.$el.html($('#searchPageTpl').html());
		$('#searchTerm').text(this.searchKey);
		app.ClientAppRouter.SearchKey = this.searchKey;
		console.log(app.ClientAppRouter); 
		// console.log("checking trail model");
		// trail=new app.TrailModel();
	 //    trail.fetch({
	 //      success:function(data){
	 //        console.log("for checking the data", data);
	 //        if(data.permission_id === 6){

	 //          app.ClientAppRouter.trail_user=true;
	 //        }
	 //      },

	 //      error:function(data){
	 //        console.log("check the error section", data);
	 //      }
	 //    });
		$.when(this.searchCollection.fetch({reset: true, data: {searchKey: this.searchKey}, processData: true}),
			this.trail.fetch()).done(function() {
	      console.log(_self.searchCollection.length);
	       console.log('TRAIL: ', _self.trail.get('permission_id'));
		      if (_self.trail.get('permission_id') == 6) {
		        app.ClientAppRouter.trail_user=true;  
		       // $('#rendersec').addClass('trail_download');
		        if (_self.searchCollection.length > 0) {
	      	    _self.renderSearchResult(_self.searchCollection);
	      		console.log('Search RESULTS: ', _self.searchCollection);
		     }
		     	      		
	       else {
	      	//show no data found	        
	        _self.showNoData();
	        console.log("NO DATA FOUND...");        
	      }  
}
               else{
 if (_self.searchCollection.length > 0) {
        _self.renderSearchResult(_self.searchCollection);
       console.log('Search RESULTS: ', _self.searchCollection);
         }
     else {                 //show no data found            
       _self.showNoData();
       console.log("NO DATA FOUND...");
     }  
}
		}).fail(function(data) {
        try{			
	        var errData = JSON.parse(data.responseText);
	        if ( errData.errCode == 550) {
	            window.location.href = '/sessionExpired';
	        } else {
	          if (errData.errMsg.length > 0) {
	              var failureMsg = errData.errMsg;  
	          } else {
	              var failureMsg = "Error occurred while searching the Information. Please Contact Administrator.";  
	          }
	          $( "div.failure").html(failureMsg);
	          $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );        
	        }
	    }catch(e){
	          window.location.href = '/sessionExpired';
	     }	              
	    });
	},

	renderSearchResult: function(data,trailcheck) {
		// this.$el.empty();
		// var row = '';
		var _self = this;
		var filePath = 'documents/publish';
		// this.$el.append($(this.parentDiv))

  /*Commented For phase2 Developement*/   
	/*	$.each(data, function(item) {
			row = this.rowtpl1 + item.get('dname') + '->' + item.get('gname') + '->' + item.get('rname') + '->' + item.get('docname') +
						this.rowtpl2 + item.get('content') +
						this.rowtpl3;
			var rowEl = $(row);
			rowEl.find('#docpath').attr('gid', item.get('gid'));
			rowEl.find('#docpath').attr('did', item.get('did'));
			rowEl.find('#docpath').attr('rid', item.get('rid'));
			rowEl.find('#docpath').attr('docid', item.get('docid'));
			rowEl.find('#docpath').attr('docname', item.get('docname'));
			this.$el.find('#centerContainer').append(rowEl);
		}, this);
          */

   //    console.log("For data string", data.models.length);

   //  for(i=0;i<data.models.length;i++){
   //    item=data.models[i].attributes
			// row = this.rowtpl1 + item.dname + '->' + item.gname + '->' + item.rname + '->' + item.docname +
			// 			this.rowtpl2 + item.content +
			// 			this.rowtpl3;
			// var rowEl = $(row);
			// rowEl.find('#docpath').attr('gid', item.gid);
   //                      rowEl.find('#docpath').attr('cnid', item.cnid);
   //                      rowEl.find('#docpath').attr('stid', item.stid);
			// rowEl.find('#docpath').attr('did', item.did);
			// rowEl.find('#docpath').attr('rtorid', item.rtorid);
			// rowEl.find('#docpath').attr('rid', item.rid);
			// rowEl.find('#docpath').attr('docid', item.docid);
			// rowEl.find('#docpath').attr('sdid', item.sdid);
			// rowEl.find('#docpath').attr('docname', item.docname);
			// _self.$el.find('#centerContainer').append(rowEl);
   //  }

    //New Rendering of Search Results

    if(app.ClientAppRouter.trail_user == true){
    	  for(i=0;i<data.models.length;i++){


    	var item = data.models[i].attributes;
    	if(item.subdocument == undefined){
    	item['subdocument']="";
    	item['filePath'] = filePath + item.fileName;
    	var tpl = _.template($('#searchTrailRowTpl').html());
    	_self.$el.find('#searchResultContainer').append(tpl(item));
    	// $(".trail_download").bind('click', this.trailuser_check );
        }else{
        item['filePath'] = filePath + item.fileName;
    	var tpl = _.template($('#searchTrailRowTpl').html());
    	_self.$el.find('#searchResultContainer').append(tpl(item));
    	// $(".trail_download").bind('click', this.trailuser_check );
        }
    }

    }else{
    	  for(i=0;i<data.models.length;i++){


    	var item = data.models[i].attributes;
    	if(item.subdocument == undefined){
    	item['subdocument']="";
    	item['filePath'] = filePath + item.fileName;
    	var tpl = _.template($('#searchRowTpl').html());
    	_self.$el.find('#searchResultContainer').append(tpl(item));
    	// $(".trail_download").bind('click', this.trailuser_check );
        }else{
        item['filePath'] = filePath + item.fileName;
    	var tpl = _.template($('#searchRowTpl').html());
    	_self.$el.find('#searchResultContainer').append(tpl(item));
    	// $(".trail_download").bind('click', this.trailuser_check );
        }
    }
    }
  
	},

	showNoData: function() {
	    // this.$el.empty();
	    this.$el.append($(this.parentDiv))
	    var newrow = $(this.tbl);
	    var elem = $(this.templ);
	    var newelem =  elem.filter('#elem');
	    var found = newelem.clone();
	    found.append($('<span></span>').text('No Search Results available.'));
	    var rel = newrow.find('#xlsheadrow');
	    rel.append(found);
	    this.$el.find('#searchResultContainer').append(newrow);    
	},

	showDocumentInTreeView: function(e) {
            console.log('showDocumentInTreeView');
            var gid = $(e.target).attr('gid');
            var cnid = $(e.target).attr('cnid');
            var stid = $(e.target).attr('stid');
            var did = $(e.target).attr('did');
            var rtorid = $(e.target).attr('rtorid');
            var rid = $(e.target).attr('rid');
            var docid = $(e.target).attr('docid');
            //var docname  = $(e.target).attr('docname');
            var sdid  = $(e.target).attr('sdid');
            var subdocname  = $(e.target).attr('subdocname');
            var spl  = $(e.target).attr('spl');
            var fid  = $(e.target).attr('fid');
            var gname = $(e.target).attr('gname');
            var dname = $(e.target).attr('dname');
            console.log("checking the id" , gid, cnid, stid, did,rtorid, rid,  docid, sdid, subdocname);
            app.ClientAppRouter.currentgid =  (gid) ? gid : 0;; 
            app.ClientAppRouter.currentcntid =  (cnid) ? cnid : 0;; 
            app.ClientAppRouter.currentstid =  (stid) ? stid : 0;; 
            app.ClientAppRouter.domainid =  (did) ? did : 0;
            app.ClientAppRouter.currentrid = (rtorid) ? rtorid : 0;
            app.ClientAppRouter.currentrlid = (rid) ? rid : 0;
            app.ClientAppRouter.currentdocid = (docid) ? docid : 0;
            app.ClientAppRouter.doctypeid = (sdid) ? sdid : 0;
            app.ClientAppRouter.gname = (gname) ? gname : '';
            app.ClientAppRouter.dname = (dname) ? dname : '';
            app.ClientAppRouter.searchname = "search";
           //app.ClientAppRouter.docname = (docname) ? docname : ''; 
           	app.ClientAppRouter.subdocname = (subdocname) ? subdocname : ''; 
           	app.ClientAppRouter.spl = (spl) ? spl : 0;
           	app.ClientAppRouter.fid = (fid) ? fid : 0;
            app.ClientAppRouter.mode = '1';
            $('#zklibrary').addClass('zmactive').siblings().removeClass('zmactive');
            appRouter.navigate("showReg", {trigger: true, replace: true});

	},

	trailuser_check: function(e){
          console.log("print the trailuser_check in pdfview");
          e.preventDefault();
      if(app.ClientAppRouter.trail_user == true){
        console.log("print the trailuser_check in pdfview");
        alert("Download option is currently not available under free trial. Please contact info@zurikglobal.com"); 
        
      }else{
        console.log("print the trailuser_check in pdfview");
        return true;
      }

  }


});
