var app = app || {};
this.regulatorID;
var regulatordata;
var appRouter;

app.AdvanceSearchPageView = Backbone.View.extend({
	el : $("#mainCanvas"),
    template: $( '#AdvanceSearchTpl' ).html(),
	initialize: function() {
		this.geoID;
		this.countryID;
		this.stateID;
		this.regulatorID;
    this.libraryCollection = new app.LibraryList();
		this.geoCollection     = new app.MGeographyList();
		this.countryCollection = {};
		this.stateCollection = {};
		this.domainCollection = {};
		this.regulatorCollection = {};
		this.regulationCollection={};
                this.Ad_search=this.view
		this.regCollection = {};
                console.log("check routing in advance searchview");
                console.log("check routing in advance searchview", appRouter.currentView);
    this.parentDiv = '<div id="centerContainer" class="udb"></div>';
    this.rowtpl1 = '<div class="searchcontent1"><a class="searchRow"><h3 id="docpath" style="position: relative;top: 15px;">';
    this.back2='<div style="margin-left:10px;"><table><tr><td align="right"><input id="back2search" class="btn btn-outline btn-success"  type="button" value="Back To Advance Search"></td></tr></table></div>';
    this.rowtpl2 = '</h3></a><p>';
    this.rowtpl3 = '</p></div>';
    this.rowtpl4 = '';
    this.tbl  = "<table border='0' style='background-color: #FFECEC; opacity: 1;' class='table table-hover dt-responsive '> <thead  id ='xlshead' ><tr id='xlsheadrow'></tr> </thead> <tbody id='xlsbody'><tr id='xlsbodyrow'></tr></tbody> </table>";    
	    this.cell = "<td class='text-center header' id='elem'></td>";
		/*
		this.countryCollection  = new app.MCountryList();
		this.domainCollection  = new app.MDomainList();
		this.stateCollection  = new app.MStateList();
		this.regCollection  = new app.MRegulationList();*/
		this.searchcollection=new app.MSearchList();

		this.templ  = " <select id='selectGeo' class='form-control' multiple=''></select>";
		this.templ1 = "<select id='selectCountry' class='form-control' multiple=''></select>";
		this.templ2 = "<select id='selectState' class='form-control' multiple=''></select>";
		this.templ3 = "<select id='selectDomain' class='form-control' multiple=''></select>";
		this.templ4 = "<select id='selectRegulator' class='form-control' multiple=''></select>";
		this.templ5 = "<select id='selectReg' class='form-control' multiple=''></select>";
		//this.templ2 = "<option id='' value=''></option>";		
		_.bindAll(this, "render");
                _.bindAll(this, "BacktoAdvancesearch");
		this.render();
	},

	events: {
    'click #search' : 'searchFile',
    'click #clear' 	 : 'clearfile',
    'change #selectGeo' : 'Selectedgeo',
    'change #selectCountry' : 'Selectedcountry',
    'change #selectState' : 'Selectedstate',
    'change #selectDomain' : 'Selecteddomain',
    'change #selectRegulator' : 'Selectedregulator',
    'change #selectReg' : 'Selectedregulation',
    'click .searchRow': 'showDocumentInTreeView',
    'click #back2search':'BacktoAdvancesearch'
   	},
	

	render: function() {
		 
		var _self = this;
		this.$el.html(this.template);	
	    $.when(_self.searchcollection.fetch()).done(function() {
			if (_self.searchcollection.length > 0) {
				console.log("length",_self.searchcollection.length);
				var geo =_self.searchcollection.at(0).get('geoCollection');
				_self.countryCollection =_self.searchcollection.at(0).get('countryCollection');
				_self.stateCollection =_self.searchcollection.at(0).get('stateCollection');
				_self.domainCollection =_self.searchcollection.at(0).get('domainCollection');
				_self.regulatorCollection = _self.searchcollection.at(0).get('regulatorCollection');
				_self.regulationCollection = _self.searchcollection.at(0).get('regulationCollection');
				console.log("searchcollection ::::1 ",JSON.stringify(_self.searchcollection));
				console.log("for checking searchcollection",_self.searchcollection.at(0));
			console.log("for checking searchcollection :::1 ",_self.searchcollection.at(0).get('regulationCollection'));

		         _self.drawGeo(geo);
	        }
	    });	
	    return this;
	},

	drawGeo: function(geo) {
	 	var selectel = $('#selectGeo');	 
                var exists = false;
      	for(i=0;i<geo.length;i++){
                  console.log("For checking the",  geo[i].name)

             selectel.append($('<option id="" value="'+ geo[i].id +'">'+ geo[i].name+'</option>'));
      	}
      	$("#selectGeooption").empty();
      	$("#selectGeooption").unbind();
	 	$("#selectGeooption").append(selectel);	 
        
             ADsearchview = this.$el.html();
  },

  Selectedgeo: function(e){
  	 	var _self = this;
  	 	e.preventDefault();
  		var geoID = $(e.target);
  		console.log("geoID", $("#"+e.target.id+" option:selected").val());
  		$("#selectedcountryoption").empty();
         	$("#selectedcountryoption").unbind();
        	var selectel1 = $(this.templ1);
		$("#selectedcountryoption").append($(selectel1));
                query_formation=[];
  		$("#"+e.target.id+" option:selected").each(function(){  		 
  		console.log("Check geoid inside the looping", $(this).text(), $(this).val());
                query_formation.push({"gname":$(this).text(), "gid":$(this).val()})
                console.log("For checking the gname section", query_formation);
  		 	_self.loadcountry($(this).val(),selectel1);

  		}); 
	//	  $("#selectedcountryoption").append($(selectel1));
		  var geodata=$("#selectGeo option:selected").text();
  },



  loadcountry: function(geoID,selectel1){
                console.log("check the geoId", geoID);
  		var _self = this;
                var  exists=false;
                console.log("for checking the self collection", _self.countryCollection);
        
      	for(i=0;i<_self.countryCollection.length;i++){
                //console.log("for checking geo id", geoID, _self.countryCollection[i].gid);
      		if(_self.countryCollection[i].gid == geoID) {
              var exists = false;
              $('#selectCountry  option').each(function()
              {  
                 if (this.text == _self.countryCollection[i].name)
                {  
                   exists = true;
                }
               
              });   
                
                  //if(exists == false)  selectel1.append($('<option gn="'+_self.countryCollection[i].gname+'" id="" value="'+ _self.countryCollection[i].cntid +'">'+ _self.countryCollection[i].name+'</option>'));
                  if(exists == false)  selectel1.append($('<option gn="'+geoID+'" id="" value="'+ _self.countryCollection[i].cntid +'">'+ _self.countryCollection[i].name+'</option>'));
}

}
  },

  Selectedcountry: function(e){
  	 	var _self = this;
  	 	e.preventDefault();
  		var countryID = $(e.target);
  		$("#selectedstateoption").empty();
                $("#selectedstateoption").unbind();
                var selectel1 = $(this.templ2);
	        $("#selectedstateoption").append($(selectel1));
  		$("#"+e.target.id+" option:selected").each(function(){
                                        console.log("For checking the cname section", query_formation)
                                        cname= $(this).text();
                                        gname=$(this).attr('gn')
                                        cid=$(this).attr('value')
                                        console.log("check the cname section", cname,gname);

                                        _self.query_iteration("gid",gname,"cname", cname);
                                        _self.query_iteration("gid",gname,"cnid", cid);
                                        
                        //selectel1.append($('<option id="" value="'+ _self.countryCollection[i].cid +'">'+ _self.countryCollection[i].name+'</option>'));
                        selectel1.append($('<option id="" value="'+ _self.countryCollection[i].cntid +'">'+ _self.countryCollection[i].name+'</option>'));

             				_self.loadstate($(this).val(),selectel1);

  		}); 
           
	   // $("#selectedstateoption").append($(selectel1));
		  var countrydata=$("#selectCountry option:selected").text();
		  console.log("countrydata",countrydata);
  },

  loadstate: function(countryID,selectel1){
  		var _self = this;
                var exists = false;
  		console.log("countryID",countryID);
         	console.log("countryID.length",countryID.length);
                 console.log("check the state collection", _self.stateCollection);
                 console.log("check the state collection length", _self.stateCollection.length);
          	for(i=0;i<_self.stateCollection.length;i++){
                console.log("check the loadstate", _self.stateCollection[i].scid, countryID);
      		if(_self.stateCollection[i].scid == countryID){   
                 var exists = false;
              $('#selectState  option').each(function()
              {  
             console.log("check the text in loadstate, ", this.text, _self.stateCollection[i].name);
            if (this.text == _self.stateCollection[i].name)
{  
exists = true;
}
});   
             if(exists == false) selectel1.append($('<option id="" cid="'+ _self.stateCollection[i].cntid +'" value="'+ _self.stateCollection[i].sid +'">'+ _self.stateCollection[i].name+'</option>'));
               }
               
       }
  },

  Selectedstate: function(e){
  	 	var _self = this;
  	 	e.preventDefault();
  		var stateID = $(e.target);
  		$("#selecteddomainoption").empty();
                $("#selecteddomainoption").unbind();
                var selectel1 = $(this.templ3);
                $("#selecteddomainoption").append($(selectel1));
  		$("#"+e.target.id+" option:selected").each(function(){
  		 	console.log("option",$(this).val());
                         cid=$(this).attr('cid');
                         console.log("For checking the state", $(this).val(), $(this).text());
                        _self.query_iteration('cnid',cid,'stname',$(this).text());
                        _self.query_iteration('cnid',cid,'sid',$(this).val());
                        console.log("For checking the sname section", query_formation)
  		 	_self.loaddomain($(this).val(),selectel1);
  		}); 
		// $("#selecteddomainoption").append($(selectel1));
		 var statedata=$("#selectState option:selected").text();
  	},

  loaddomain: function(stateID,selectel1){
  		var _self = this;
  		var exists = false;
      	for(i=0;i<_self.domainCollection.length;i++){
        if(_self.domainCollection[i].sid == stateID )
                         {   
             
             var exists = false;
             $('#selectDomain  option').each(function()
             {
                if (this.text == _self.domainCollection[i].dname)
               {
                  exists = true;
               }
             });
             if( exists == false)  selectel1.append($('<option id="" stid="'+stateID+'" value="'+ _self.domainCollection[i].did +'">'+ _self.domainCollection[i].dname+'</option>'));
                 } 
                        console.log("check country collection", _self.domainCollection)
             
      	}

  },

  Selecteddomain: function(e){
  	 	var _self = this;
  	 	e.preventDefault();
  		var domainID = $(e.target);
  		$("#selectedregulatoroption").empty();
  		$("#selectedregulatoroption").unbind();
                var selectel1 = $(this.templ4);
		  $("#selectedregulatoroption").append($(selectel1));
  		$("#"+e.target.id+" option:selected").each(function(){
                            var stnid=$(this).attr('stid');
                       	    var dname=$(this).text();
                            console.log("for checking the", $(this).val())
                            console.log("For check the stname and dname", stnid, dname);
                           _self.query_iteration('sid', stnid, 'dname', dname);
                           _self.query_iteration('sid', stnid, 'did', $(this).val());
                           console.log("For checking the dname section", query_formation);
  		 	   _self.loadregulator($(this).val(),selectel1);
  		}); 
		  //$("#selectedregulatoroption").append($(selectel1));
		  var domaindata=$("#selectDomain option:selected").text();
 	},

 	loadregulator: function(domainID,selectel1){
  		var _self = this;
  		var exists= false;
      	for(i=0;i<_self.regulatorCollection.length;i++){
      		//console.log("_self.regulatorCollection[i].did",_self.regulatorCollection[i].did);
         console.log("check the load regulator function", _self.regulationCollection[i]); 
      		if(_self.regulatorCollection[i].did == domainID ) {
                var exists = false;
             $('#selectRegulator option').each(function()
             {   
                console.log("for checking the name", this.text, _self.regulatorCollection[i].rname)
                if (this.text == _self.regulatorCollection[i].rname)
               {   
                  exists = true;
               }   
             }); 
    
                if(exists == false)  selectel1.append($('<option id="" did="'+domainID+'" value="'+ _self.regulatorCollection[i].rid +'">'+ _self.regulatorCollection[i].rname+'</option>'));
	//	  $("#selectedregulatoroption").append($(selectel1));
           }
          console.log("check the load regulator function", _self.regulationCollection[i]); 
      	}

  },

  Selectedregulator: function(e){
  	 	var _self = this;
  	 	e.preventDefault();
  		var regulatorID = $(e.target.id);
  		$("#selectedregulationoption").empty();
         	$("#selectedregulationoption").unbind();
         	var selectel1 = $(this.templ5);
		$("#selectedregulationoption").append($(selectel1));
  		$("#"+e.target.id+" option:selected").each(function(){
                                         var did = $(this).attr('did');
                                         var rid=$(this).val();
                                         var rname=$(this).text();
                                       console.log("For checking did, rid, rname", did, rid, rname);
                                       console.log("For checking d", did, rid, rname);
                                       _self.query_iteration('did',did,'rname',rname);
                                       _self.query_iteration('did',did,'rid',rid);
                                        console.log("For checking the rname section", query_formation);
  		                 	_self.loadregulation($(this).val(),selectel1);
  		}); 
	//	  $("#selectedregulationoption").append($(selectel1));
		  var regulatordata=$("#selectRegulator option:selected").text();
 	},

 	loadregulation: function(regulatorID,selectel1){
  		var _self = this;
  		var regulatorID = regulatorID;
  		var exists = false;
      	for(i=0;i<_self.regulationCollection.length;i++){
      		console.log("Check regulation",_self.regulationCollection[i], regulatorID);
      		if(_self.regulationCollection[i].rid == regulatorID ) {
                $('#selectReg option').each(function()
             {
                console.log("inside the regulator", this.text, _self.regulationCollection[i].regname);
                if (this.text == _self.regulationCollection[i].regname) 
               {
                  exists = true;
               }
             });

      		if(exists == false) selectel1.append($('<option id="" rid="'+regulatorID+'" value="'+ _self.regulationCollection[i].rlid +'">'+ _self.regulationCollection[i].regname+'</option>'));
      	}
}
  },
  
  Selectedregulation: function(e){
  	 	var _self = this;
  	 	e.preventDefault();
  		var regulationID = $(e.target);
  		var regulationdata=$("#selectReg option:selected").text();
		console.log("regulationdata",regulationdata);
                       $("#"+e.target.id+" option:selected").each(function(){
                                         var rid = $(this).attr('rid');
                                         var rename=$(this).text();
                                       console.log("For checking rid, rename", rid, rename);
                                       _self.query_iteration('rid',rid,'rename',rename);
                });

 	},


	searchFile:function (e) {
		e.preventDefault();
		var _self = this;
		var regulatordata="";
		var regulationdata="";
		var domaindata="";
		var statedata="";
		var countrydata= "";
		var geodata = "";
    var searchTerm = "";
    $("#selectGeo option:selected").each(function(){       
        geodata += $(this).text()+ " ";
        searchTerm += $(this).text()+ " > ";
    }); 
    $("#selectCountry option:selected").each(function(){       
        countrydata += $(this).text()+ " ";
        searchTerm += $(this).text()+ " > ";
    }); 
    $("#selectState option:selected").each(function(){       
        statedata += $(this).text()+ " ";
        searchTerm += $(this).text()+ " > ";
    });
    $("#selectDomain option:selected").each(function(){       
        domaindata += $(this).text()+ " ";
        searchTerm += $(this).text()+ " > ";
    }); 
    $("#selectReg option:selected").each(function(){        
        regulationdata += $(this).text()+ " ";
        searchTerm += $(this).text()+ " > ";
    }); 
    $("#selectRegulator option:selected").each(function(){       
        regulatordata += $(this).text()+ " ";
        searchTerm += $(this).text()+ " > ";
    }); 
    searchword = $('#searchkeymass').val();
    searchTerm += searchword;    
    console.log('searchTerm', searchTerm);
    $('#searchTerm').text(searchTerm);
    console.log(geodata);console.log(countrydata);console.log(statedata);console.log(domaindata);console.log(regulatordata);
//    word_formation=geodata+countrydata+statedata+domaindata+regulatordata+regulationdata;
//    word_formation=word_formation.replace(/\s/g,"");
 //   console.log("For checking the  value section", searchword, word_formation);
    console.log("For checking the  final value section", searchword, query_formation);

    console.log("geodata",geodata);
    console.log("check the query_formation", query_formation);
		var searchKey = {
                        'data': searchword,
                        'name':query_formation
                    };
              
    console.log("searchdata",searchKey);
    console.log('Click:searchKey:' + searchKey);

    if (searchKey != '') {
          console.log("check the final query", query_formation);
          $.ajax({
            type:"GET",
            url:"/Adsearch",
            data:searchKey,
            success: function(data1) {
              data=[]  
              //Filter option for Regulator and regulation
              console.log("check the get data", data1, query_formation, query_formation.rname, query_formation.rename);
              if((query_formation[0].rname!=undefined) && (query_formation[0].rename!=undefined)){
                console.log("check the get data", data1);
                $.each(data1, function(item){    
                  console.log("chec the rname and rename inside the result area", data1[item], data1[item].rname, data1[item].rename);
                  for (i=0;i<query_formation.length;i++) {
                    console.log("chec the rname and rena the result area", data1[item].rname, data1[item].rtorname, query_formation[i].rname, query_formation[i].rename);                       
                    if((data1[item].rtorname == query_formation[i].rname) && (data1[item].rname == query_formation[i].rename)) {
                      console.log("checking the rname and rename inside the result area", data1[item].rname, data1[item].rtorname);
                      data.push(data1[item]);                          
                    }                      
                  } 

                });                  
              } else {
                data=data1
              }           
              console.log("Search query posted", data);
              console.log("Search query posted1", data1);
		          var row = '';
              $("#mainCanvas").empty();
		          // $("#mainCanvas").append($(_self.parentDiv));
              _self.$el.html($('#searchPageTpl').html());
              if(data.length > 1){
                $('#back2search').remove();
                // _self.back2='<div style="margin-left:10px;"><table><tr><td align="right"><input id="back2search" class="btn btn-outline btn-success"  type="button" value="Back To Advance Search"></td></tr></table></div>';
                // _self.$el.find('#centerContainer').append($(_self.back2));
		            $.each(data, function(item) {
                  item=data[item];
                  console.log("For item checking", item);
                  //New Rendering of Search Results
                  var tpl = _.template($('#searchRowTpl').html());
                  _self.$el.find('#searchResultContainer').append(tpl(item));                            
            			// row = _self.rowtpl1 + item.dname + '->' + item.gname + '->' + item.rname + '->' + item.docname +
            			// 			_self.rowtpl2 + item.content +
            			// 			_self.rowtpl3;
            			// var rowEl = $(row);
            			// rowEl.find('#docpath').attr('gid', item.gid);
            			// rowEl.find('#docpath').attr('cnid', item.cnid);
            			// rowEl.find('#docpath').attr('stid', item.stid);
            			// rowEl.find('#docpath').attr('did', item.did);
            			// rowEl.find('#docpath').attr('rtorid', item.rtorid);
            			// rowEl.find('#docpath').attr('rid', item.rid);
            			// rowEl.find('#docpath').attr('docid', item.docid);
            	//	rowEl.find('#docpath').attr('docname', item.docname);
            			// rowEl.find('#docpath').attr('sdid', item.sdid);
            			// rowEl.find('#docpath').attr('subdocname', item.subdocument);
              //$('#back2search').remove();
            	//_self.$el.find('#centerContainer').append('<div><input id="back2search" class="btn btn-outline btn-success" style="margin-left: -200px;" type="button" value="Back To Advance Search"></div>');
            			// _self.$el.find('#centerContainer').append(rowEl);
		            }, _self);
              }
              else if (data.length ==1 ){
                console.log("json strings", JSON.stringify(data));
                data=data[0];
                //New Rendering of Search Results
                var tpl = _.template($('#searchRowTpl').html());
                _self.$el.find('#searchResultContainer').append(tpl(data));                
                // row = _self.rowtpl1 + data.dname + '->' + data.gname + '->' + data.rname + '->' + data.docname +
                //                                 _self.rowtpl2 + data.content +
                //                                 _self.rowtpl3;
                // var rowEl = $(row);
                // console.log("For item checking", data);          
                // rowEl.find('#docpath').attr('gid', data.gid);
                // rowEl.find('#docpath').attr('cnid', data.cnid);
                // rowEl.find('#docpath').attr('stid', data.stid);
                // rowEl.find('#docpath').attr('did', data.did);
                // rowEl.find('#docpath').attr('rtorid', data.rtorid);
                // rowEl.find('#docpath').attr('rid', data.rid);
                // rowEl.find('#docpath').attr('docid', data.docid);
            //rowEl.find('#docpath').attr('docname', data.docname);
                // rowEl.find('#docpath').attr('sdid', data.sdid);
                // rowEl.find('#docpath').attr('subdocname', data.subdocument);
            //_self.$el.find('#centerContainer').append(rowEl);
                // _self.$el.find('#centerContainer').html(rowEl);
            //$('#centerContainer').append('<input id="back2search" style="margin-left: -200px;"  class="btn btn-outline btn-success" type="button" value="Back To Advance Search">');
	              // console.log("check for the back2 ", _self.back2);
                // $('#centerContainer').append($(_self.back2));
            //  console.log("Element check", JSON.stringify(_self.$el.find('#centerContainer')));
              }
              else {
                console.log("empty search");      
                console.log("check this",_self.tbl);      
                console.log("check this",_self.templ);      
                // _self.$el.empty();
                _self.$el.append($(_self.parentDiv))
                var newrow = $(_self.tbl);
                var elem = $(_self.cell);
                var newelem =  elem.filter('#elem');
                var found = newelem.clone();
                found.append($('<span></span>').text('No Search Results available.'));
                var rel = newrow.find('#xlsheadrow');
                rel.append(found);
	              //_self.$el.find('#centerContainer').append('<input id="back2search" style="margin-left: -200px;" class="btn btn-outline btn-success"  type="button" value="Back To Advance Search">');
	              console.log("check for the back2 ", _self.back2);
	              _self.$el.find('#searchResultContainer').append(_self.back2);
                _self.$el.find('#searchResultContainer').append(newrow);      
              }  
            }
          });
    }    		
	},

	clearfile:function (e) {
		 e.preventDefault();
     console.log("clearfile");
     //$("#selectGeo").empty();
     $("#selectCountry").empty();
     $("#selectState").empty();
     $("#selectDomain").empty();
     $("#selectRegulator").empty();
     $("#selectReg").empty();
		
	},


    query_iteration:function(key, de_value,keyn,keyn1){
                for(i=0;i<query_formation.length;i++) {
                           console.log("For check the query formation from the query sector", query_formation[i]); 
                           console.log("check the basic keys arg 1 2 3 4 ", key, de_value, keyn, keyn1);
                           console.log("check the basic keys arg 1 2 3 4 ", (query_formation[i][key]), de_value);
                                
                              if(query_formation[i][key] == de_value )  {
                                console.log("inside 2nd if loop");
                                query_formation[i][keyn]=keyn1
                                console.log("final query from the sector", query_formation);
                                //return this;
                                
                              } else {
                               console.log("Not in the check list");
                               //return this;
                                  } }


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
            console.log("checking the id" , gid, cnid, stid, did,rtorid, rid,  docid, sdid, subdocname);
            app.ClientAppRouter.currentgid =  (gid) ? gid : 0;; 
            app.ClientAppRouter.currentcntid =  (cnid) ? cnid : 0;; 
            app.ClientAppRouter.currentstid =  (stid) ? stid : 0;; 
            app.ClientAppRouter.domainid =  (did) ? did : 0;
            app.ClientAppRouter.currentrid = (rtorid) ? rtorid : 0;
            app.ClientAppRouter.currentrlid = (rid) ? rid : 0;
            app.ClientAppRouter.currentdocid = (docid) ? docid : 0;
            app.ClientAppRouter.doctypeid = (sdid) ? sdid : 0;
           //app.ClientAppRouter.docname = (docname) ? docname : ''; 
           app.ClientAppRouter.subdocname = (subdocname) ? subdocname : ''; 
            app.ClientAppRouter.mode = '1';
            $('#zklibrary').addClass('zmactive').siblings().removeClass('zmactive');
            appRouter.navigate("showReg", {trigger: true, replace: true});
        },



      BacktoAdvancesearch: function(){
        console.log('route to advance search view when click back button');

         console.log(appRouter)
 //       $('#menu_header li').removeClass('zmactive');
        this.$el.html('');
        this.$el.html(ADsearchview)        
       // appRouter.navigate("advancesearch", {trigger: true, replace: true});
        console.log("after calling router");

    }

});


