var app = app || {};

app.TreeView = Backbone.View.extend({
  el : $("#treeCanvas"),
  
  initialize: function(options) {

   /* this.openelement   = null ;*/
    this.docdata={};
   // $('.hamburger-menu').show();
    this.mode = app.ClientAppRouter.mode;
    console.log("this.mode",this.mode);
   
    
    app.ClientAppRouter.trail_user=false;

    //set-up scrollbar programmatically
    // $("#mcTree").mCustomScrollbar(); NP
    this.initTree();
    registerTrackerEvents(); //this function define in /js/hl-tracker.js
  },

  events: {
    //'click .rdocclick': 'rdomSelected',
    'click .docclick' : 'domSelected',
    //'click  .main-sidebar .treeselect' : 'selectdoc',
//    'change  #treeselect' : 'selectdoc',
    
  },
 
  initTree : function()
  {
    console.log("::::initTree::::");
    console.log("::::initTree:::: checking id")
    delete  app.ClientAppRouter.currentgid;
    delete  app.ClientAppRouter.currentcntid;
    delete  app.ClientAppRouter.currentstid;
    delete  app.ClientAppRouter.domainid;
    delete  app.ClientAppRouter.currentrid; 
    delete  app.ClientAppRouter.currentrlid; 
    delete  app.ClientAppRouter.currentdocid; 
    delete  app.ClientAppRouter.doctypeid;
    delete  app.ClientAppRouter.subdocname; 
    //Highlight All Continents in Map By programatically
    //Map
    $("svg .continent").addClass("selected");
    //List
    $(".regions-container .item").addClass('selected');   
    console.log("check the routerid", 
            app.ClientAppRouter.currentgid ,
            app.ClientAppRouter.currentcntid ,
            app.ClientAppRouter.currentstid ,
            app.ClientAppRouter.domainid ,
            app.ClientAppRouter.currentrid, 
            app.ClientAppRouter.currentrlid, 
            app.ClientAppRouter.currentdocid, 
            app.ClientAppRouter.doctypeid ,
            app.ClientAppRouter.subdocname );

    delete app.ClientAppRouter.currentgid;
    console.log('CURRENTID: ', app.ClientAppRouter.currentgid);
    
    this.roottmpl = "<ul></ul>";
    this.leaf = "<li >  </li>";   
      this.leaftmpl = "<a   class='ridclass' ></a>";
    this.span ="<span></span>";
    this.idomain = null;
    this.igeo = null;
    this.iregulation = null; 
    this.colDomain = new app.MDomainList();
    this.colRegulation = new app.MRegulationList();
    this.colDocument = new app.MDocumentList();
  //  this.coldDocList = new app.DocumentList();
    //added by Louis
    this.colGeoGraphy  = new app.MGeographyList();
    this.colCountry = new app.MCountryList();
    this.colState = new app.MStateList();
    this.colRegulator = new app.MRegulatorList();
    this.colSubdoc = new app.MSubDocumentList();

    this.docList = new app.DocumentList();
   

    app.ClientAppRouter.colDomain = this.colDomain;

    app.ClientAppRouter.colRegulation = this.colRegulation;
    app.ClientAppRouter.colDocument = this.colDocument;  

    app.ClientAppRouter.colGeoGraphy = this.colGeoGraphy;
    app.ClientAppRouter.colCountry = this.colCountry;
    app.ClientAppRouter.colState = this.colState;
    app.ClientAppRouter.colRegulator = this.colRegulator;  
    app.ClientAppRouter.colSubdoc = this.colSubdoc;  

    app.ClientAppRouter.docList = this.docList;  
    console.log("col",app.ClientAppRouter.docList);

    var _self = this;
    $.when(this.colGeoGraphy.fetch(),
      this.colDomain.fetch(),

      this.colRegulation.fetch(),
      this.colDocument.fetch(),
      this.colCountry.fetch(),
      this.colState.fetch(),
      this.colRegulator.fetch(),
   //   this.coldDocList.fetch(),
      this.colSubdoc.fetch(),
      this.docList.fetch({url: '/subscription'})).done( function() {
        console.log("subscription");
      _self.idomain = new Backbone.Collection(_self.colDomain.toJSON());
      _self.igeo = new Backbone.Collection(_self.colGeoGraphy.toJSON());
      _self.iregulation = new Backbone.Collection(_self.colRegulation.toJSON());
      _self.render();

      console.log("_self.mode",_self.mode);
      switch(_self.mode) {                        
        case '1':
          console.log('openDoc');
          _self.openDoc(); 
          _self.reset();
          break;
        case '2':
          console.log('openReg');
          // _self.openReg();
          $('#image_loader').remove();
          break;
        case '0':                    
        default:
          console.log('default');
          $('#image_loader').remove();
      }
          console.log("self.docdata",_self.docdata);    
    }).fail(function(data) {
      console.log("fail",data);
        try{      
          var errData = JSON.parse(data.responseText);
          if ( errData.errCode == 550) {
              window.location.href = '/sessionExpired';
          } else {
            if (errData.errMsg.length > 0) {
                var failureMsg = errData.errMsg;  
            } else {
                var failureMsg = "Error occurred while fetching Reg Tracker Information. Please Contact Administrator.";  
            }
            $( "div.failure").html(failureMsg);
            $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );        
          }
        }catch(e){
            window.location.href = '/sessionExpired';
        }               
    });
    console.log("completed subscription");

  // *****NP The following code commented by Niranjan@28-09-17  
    // $( document ).ajaxStart(function() {
    //   $(".row #canvas .worldmap").html('<center><img id="image_loader" src="../../images/loading.gif"styles="align:center;">');
    // });
    // $( document ).ajaxStop(function() {
    //   // do nothing here. End of ajax call success/failure callback show appropriate result
    // });
  },

  rdomSelected : function(e) {
   
 //  $(e.target).addClass('docclick');
    var data={};
    var strgid = $(e.target).parent().attr('gid');
    var strcntid = $(e.target).parent().attr('cntid');
    var strsid = $(e.target).parent().attr('sid');
    var strdid = $(e.target).parent().attr('did');
    var strrid = $(e.target).parent().attr('rid');  
    var strrlid = $(e.target).parent().attr('rlid');
     var strdocid = $(e.target).parent().attr('docid');
     var strsdocid = $(e.target).parent().attr('sdocid');

    app.ClientAppRouter.currentgid =  (strgid) ? strgid : 0;
    app.ClientAppRouter.currentcntid =  (strcntid) ? strcntid : 0;
    app.ClientAppRouter.currentstid =  (strsid) ? strsid : 0;
    app.ClientAppRouter.domainid =  (strdid) ? strdid : 0;
    app.ClientAppRouter.currentrid =  (strrid) ? strrid : 0;
    app.ClientAppRouter.currentrlid = (strrlid) ? strrlid : 0;
    app.ClientAppRouter.currentdocid = (strdocid) ? strdocid : 0;
    app.ClientAppRouter.doctypeid = (strsdocid) ? strsdocid : 0;
    
    $('#regtitle').remove();
    $('#breadcrumb').text('');
    $("#canvas").empty();
    $("#canvas").unbind();

    console.log(" current state id >>>>>>>>",strsid,app.ClientAppRouter.currentstid);
    console.log("sub docs "+JSON.stringify(this.colSubdoc));

 //   var subdocs = new app.MSubDocumentList();

   var gid =  parseInt(strgid,10); 
    var cntid = parseInt(strcntid,10);  
    var sid =  parseInt(strsid,10);   
    var did =  parseInt(strdid,10);   
    var rid =  parseInt(strrid,10);   
    var rlid = parseInt(strrlid,10);    
    var docid = parseInt(strdocid,10);  
    var sdocid = parseInt(strsdocid,10);
  var docDataList = this.colSubdoc.where({gid :gid,cntid :cntid, sid: sid, did : did, rid :rid, rlid :rlid,docid:docid, sdocid:sdocid});
  var subdoclist = new app.MSubDocumentList();
  subdoclist.add(docDataList);
  
    var box = new app.DocTypeView({el: $('#canvas'), collection: subdoclist, subscribedDocList: this.docList});
  },
  //This get called from elastic search result page
  openDoc: function() {
    console.log('openDoc');
    var data = {};
   data.gid = parseInt(app.ClientAppRouter.currentgid, 10);
    data.gid = parseInt(app.ClientAppRouter.currentgid, 10);
    data.cntid = parseInt(app.ClientAppRouter.currentcntid, 10);
    data.sid = parseInt(app.ClientAppRouter.currentstid, 10);
    data.did = parseInt(app.ClientAppRouter.domainid, 10);
    data.rid = parseInt(app.ClientAppRouter.currentrid, 10);
    data.rlid = parseInt(app.ClientAppRouter.currentrlid, 10);
    data.docid = parseInt(app.ClientAppRouter.currentdocid, 10);
    data.sdocid = parseInt(app.ClientAppRouter.doctypeid, 10);
    //data.docId = parseInt(app.ClientAppRouter.doctypeid, 10);
    data.docname = app.ClientAppRouter.subdocname;
    console.log("dtdta0",data);
    if (this.filterDoctype()) {
      this.renderSingleDoc(data);
    } else {
      console.log("not subscribed");
      $('#breadcrumb').text('');
      $('#panelFooter').empty();
      $('#rendersec , #Textdiv').remove();  //remove download form & button
      // $('#regtitle').remove();
      // $('.widget').empty();
      $("#canvas").children().remove();
      $("#canvas").unbind();
      $("#canvas").append("<div class='text-center'><H4>You are not subscribed</H4></div>");      
    }    
  },

  renderSingleDoc: function(data) {
    console.log(data);
    
    var selectedGeo    = this.colGeoGraphy.findWhere({id: data.gid}).get('name');
    var selectedCountry    = this.colCountry.findWhere({id: data.cntid}).get('name');
    var selectedState    = this.colState.findWhere({sid: data.sid}).get('name');
    var selectedDomain = this.colDomain.findWhere({did: data.did}).get('name');
    var selectedRegulator = this.colRegulator.findWhere({rid: data.rid}).get('name');
    var selectedReg    = this.colRegulation.findWhere({rlid: data.rlid}).get('name');
    var selectedDoc    = this.colDocument.findWhere({docid: data.docid}).get('name');
    // var selectedSubDoc    = this.colSubdoc.findWhere({sdocid: data.sdocid}).get('name'); Commented by Niranjan
    var selectedSubDoc    = this.colSubdoc.findWhere({id: data.sdocid}).get('name');
  if (  data.spl && data.spl == 1 ) {
            $("#canvas").empty();
            $("#canvas").unbind(); 
            $('#panelFooter').empty();
            $('#Textdiv').empty();
            $('#rendersec').empty();
            console.log ( $("#canvas"));
           var bstring = "";             
          if(selectedCountry = '-' && selectedSubDoc == '-'){
            bstring += selectedGeo + ' > ' + selectedState + ' > ' + selectedDomain + ' > ' + selectedRegulator + ' > ' + selectedReg + ' > ' + selectedDoc;
            $('#breadcrumb').text(bstring);
          }
         else if(selectedCountry = '-'){
           bstring += selectedGeo + ' > ' + selectedState + ' > ' + selectedDomain + ' > ' + selectedRegulator + ' > ' + selectedReg + ' > ' + selectedDoc + ' > ' + selectedSubDoc;
              $('#breadcrumb').text(bstring);
          }
          else if(selectedState = '-'){
              bstring +=selectedGeo + ' > ' + selectedCountry + ' > ' + selectedDomain + ' > ' + selectedRegulator + ' > ' + selectedReg + ' > ' + selectedDoc + ' > ' + selectedSubDoc;
              $('#breadcrumb').text(bstring);
          }
          else if(selectedSubDoc == '-'){
            bstring +=selectedGeo + ' > ' + selectedCountry + ' > ' + selectedState + ' > ' + selectedDomain + ' > ' + selectedRegulator + ' > ' + selectedReg + ' > ' + selectedDoc;
            $('#breadcrumb').text(bstring);
          }
          else{
            bstring += selectedGeo + ' > ' + selectedCountry + ' > ' + selectedState + ' > ' + selectedDomain + ' > ' + selectedRegulator + ' > ' + selectedReg + ' > ' + selectedDoc + ' > ' + selectedSubDoc;
            $('#breadcrumb').text(bstring);
          }
        app.ClientAppRouter.spldocname = bstring;
        console.log(app.ClientAppRouter.spldocname); 
          $('#regtitle').remove();
          $('.widget').prepend("<div id='regtitle' style='text-align:center;'><font size='5'>" + selectedDoc + "</font></div>");          
            console.log("spl document before displayed");
            var xlss = new app.XlsView({el: $("#canvas")});
            app.ClientAppRouter.xlsx = xlss;
            console.log('XLS-PATH: ', data);
            console.log("spl document before render spl");
            xlss.render_spl({ data : data });
            console.log("spl document displayed");

   } else { 
  
    //get the path of the selected document & render it
    $.ajax({
      type: "GET",
      url: '/document/' + data.gid + '/' + data.cntid + '/' + data.sid + '/' + data.did + '/' + data.rid + '/' + data.rlid + '/' + data.docid + '/' + data.sdocid ,
      success: function(data) {
        console.log(data);
        if (data.hasOwnProperty('path')) {
        
          if(selectedCountry = '-' && selectedSubDoc == '-'){
            $('#breadcrumb').text(selectedGeo + ' > ' + selectedState + ' > ' + selectedDomain + ' > ' + selectedRegulator + ' > ' + selectedReg + ' > ' + selectedDoc);
          }
         else if(selectedCountry = '-'){
              $('#breadcrumb').text(selectedGeo + ' > ' + selectedState + ' > ' + selectedDomain + ' > ' + selectedRegulator + ' > ' + selectedReg + ' > ' + selectedDoc + ' > ' + selectedSubDoc);
          }
          else if(selectedState = '-'){
              $('#breadcrumb').text(selectedGeo + ' > ' + selectedCountry + ' > ' + selectedDomain + ' > ' + selectedRegulator + ' > ' + selectedReg + ' > ' + selectedDoc + ' > ' + selectedSubDoc);
          }
          else if(selectedSubDoc == '-'){
            $('#breadcrumb').text(selectedGeo + ' > ' + selectedCountry + ' > ' + selectedState + ' > ' + selectedDomain + ' > ' + selectedRegulator + ' > ' + selectedReg + ' > ' + selectedDoc);
          }
          else{
            $('#breadcrumb').text(selectedGeo + ' > ' + selectedCountry + ' > ' + selectedState + ' > ' + selectedDomain + ' > ' + selectedRegulator + ' > ' + selectedReg + ' > ' + selectedDoc + ' > ' + selectedSubDoc);
          }
          $('#regtitle').remove();
          $('.widget').prepend("<div id='regtitle' style='text-align:center;'><font size='5'>" + selectedDoc + "</font></div>");          
          var path = data.path;
          path.replace(/&amp;/g, "&");
          var patt1=/\.[0-9a-z]+$/i;
          var mat = path.match(patt1);
          $('#rendersec, #Textdiv, #center').remove();
          if ( mat == ".pdf") {
            $("#canvas").empty();
            $("#canvas").unbind();              
            var pdf = new app.PdfView({el: $("#canvas")});
            app.ClientAppRouter.pdf = pdf
            console.log('PDF-PATH: ', path);
            pdf.render({ path : path});
          } else {
            $("#canvas").empty();
            $("#canvas").unbind();              
            var xls = new app.XlsView({el: $("#canvas")});
            app.ClientAppRouter.xlsx = xls;
            console.log('XLS-PATH: ', path);
            xls.render({ path : path });
          }                    
        } else {
            //show no doc available
            console.log('No data');
            $('#breadcrumb').text('');
            $('#panelFooter').empty();
            $('#rendersec , #Textdiv').remove();
            // $('#regtitle').remove();
            // $('.widget').empty();
            $("#canvas").children().remove();
            $("#canvas").unbind();
            $("#canvas").append("<div class='text-center'><H4> Currently no document available, contact Zurik Support at info@zurik.com </H4></div>");
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
                  var failureMsg = "Currently No Document available, Please Contact Administrator.";  
                }
                $( "div.failure").html(failureMsg);
                $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
              }
        }catch(e){
              window.location.href = '/sessionExpired';
        }
      }
    });
 }
  },
  domSelected : function(e) { 
   // This is to prevent further clicks on the same element   
   $(e.target).removeClass('docclick');

    var gid = $(e.target).attr('gid');
    var cntid = $(e.target).attr('cntid');
    var sid = $(e.target).attr('sid');
    var did = $(e.target).attr('did');
    var rid = $(e.target).attr('rid');
    var rlid = $(e.target).attr('rlid');
    var docid = $(e.target).attr('docid');
    var sdocid = $(e.target).attr('sdocid');
    var spl = $(e.target).attr('isspecial');
    docname = $(e.target).text();
    console.log("domSelected");
    this.openDocument(gid,cntid,sid,did,rid,rlid,docid,sdocid,docname,spl);
   $(e.target).addClass('docclick');
     }, 
    
   openDocument: function(gid,cntid,sid,did,rid,rlid,docid,sdocid,docname,spl){
    var data = {};

    data.did = parseInt(did, 10);
    data.gid = parseInt(gid, 10);
    data.cntid = parseInt(cntid, 10);
    data.sid = parseInt(sid, 10);
    data.rid = parseInt(rid, 10);
    data.rlid = parseInt(rlid, 10);
    data.docid = parseInt(docid, 10);
    data.sdocid = parseInt(sdocid, 10);
    data.docname =docname;
    data.spl = parseInt(spl,10);
    console.log("dom selected doc" + JSON.stringify(data));
    app.ClientAppRouter.currentgid =  (gid) ? gid : 0;
    app.ClientAppRouter.currentcntid =  (cntid) ? cntid : 0;
    app.ClientAppRouter.currentstid =  (sid) ? sid : 0;
    app.ClientAppRouter.currentrid =  (rid) ? rid : 0;
    app.ClientAppRouter.currentrlid = (rlid) ? rlid : 0;
    app.ClientAppRouter.domainid =  (did) ? did : 0;
    app.ClientAppRouter.currentdocid = (docid) ? docid : 0;
    app.ClientAppRouter.doctypeid = (sdocid) ? sdocid : 0;
    app.ClientAppRouter.spl = (spl) ? spl : 0;

    console.log(app.ClientAppRouter);
    if (this.filterDoctype()) {
      this.renderSingleDoc(data);
    } else {
      console.log("not subscribed");
      $('#breadcrumb').text('');      
      $('#panelFooter').empty();
      $('#rendersec , #Textdiv').remove();  //remove download form & button    
      $("#canvas").children().remove();
      $("#canvas").unbind();
      $("#canvas").append("<div class='text-center'><H4> You are not subscribed </H4></div>");      
    }        
  },

  render: function(options) {
      this.renderGeography();
    //this.reset();
  //  this.renderAllState();

     trail=new app.TrailModel();
    trail.fetch({
      success:function(data){
        console.log("for checking the data", data);
        if(data.permission_id === 6){

          app.ClientAppRouter.trail_user=true;
        }
      },

      error:function(data){
        console.log("check the error section", data);
      }
    });
     
  },

  renderGeography : function ()
  {

    this.root = "<ul id='geography' > </ul>";

   // this.renderGeography(options);

    var currentgid = parseInt(app.ClientAppRouter.currentgid, 10); 

    //Access button passing
    var gname=app.ClientAppRouter.geoname;
    var dname=app.ClientAppRouter.domainname;
    var did= app.ClientAppRouter.domainid;
    console.log("printing gname dname did",gname,dname,did);
    // Root domains
    var elem = $(this.leaftmpl);
    var lelem = $(this.leaf);
    var root = $(this.root);
    var delem, clelem;
    var selectedNodeId = 'dgr9999';
   // var col1 = new Backbone.Collection (this.colDomain.where({gid :gid,cntid :cntid, sid: sid }));

   
  

    this.colGeoGraphy.each(function ( item) {

  //    var gflag = item.attributes.name.toUpperCase() == "ALL";
     
      // if( gflag  == false)
      // {
      delem = elem.clone();
      clelem = lelem.clone();
      var gid = item.get('id');
      if (currentgid == gid) {
        clelem.attr('id', selectedNodeId);  
      }

               delem.attr('gid', item.get('id'));
               delem.text( item.get('name'));
               clelem.append(delem);
               this.renderCountry(false,clelem,gid);
               root.append(clelem);
      // }

    }, this);

    var  treeCanvas= $('#treeCanvas');

   // this.$el.append(root);
   treeCanvas.append(root);

    switch(this.mode) {                        
      case '1':
        console.log('openDoc');
        $('#geography').tree({
          expanded: '#' + selectedNodeId
        });         
        break;
      case '2':
        console.log('openReg');
        // $('#select-domain-ul').find('.select-domain').each(function(){
        //     var curname= $(this).text();
        //     console.log("compare the name",curname,dname);
        //   if(curname === dname){
        //     console.log("inside the class");
        //     $(this).addClass('selected');
        //   }
           
        // });

        //  $('#select-geo-ul').find('.item').each(function(){
        //     var curname= $(this).text();
        //     console.log("compare the name",curname,gname);
        //   if(curname === gname){
        //      console.log("inside the class");
        //      $(this).addClass('selected');
        //   }

        // });     
        //  $('#select-geo-ul').find('.all').each(function(){
        //     var curname= $(this).text();
        //     console.log("compare the name",curname,gname);
        //   if(curname === gname){
        //      console.log("inside the class");
        //      $(this).addClass('selected');
        //   }

        // });     



        $('#geography').tree({
          expanded: '#' + selectedNodeId
        }); 
        break;
      case '0':                    
      default:
        console.log('default - 0');
        $('#geography').tree({
          });  
        //expand the first - Europe           
        var liTag = $('#geography').children()[0];
        $(liTag).attr('aria-expanded', true);
        $(liTag).children('a').removeClass('tree-parent-collapsed');
        $(liTag).children('ul').removeClass('tree-group-collapsed'); 
        break;         
    }

  },

 

  renderCountry : function(fromCountry,delem,gid) {

      
   // this.renderGeography(options);

    var currentcntid = parseInt(app.ClientAppRouter.currentcntid, 10);   
    var currentgid = parseInt(app.ClientAppRouter.currentgid, 10);  

    var elem1 = $(this.roottmpl);
    var roelem1 = elem1.clone();

    // Root domains
    var elem2 = $(this.leaftmpl);
    var lelem1 = $(this.leaf);
    var clelem1;
    var selectedNodeId = 'dgr9999';
   // var col1 = new Backbone.Collection (this.colDomain.where({gid :gid,cntid :cntid, sid: sid }));

     var col2 = {};
    if(gid === undefined)
    {
      col2 = this.colCountry;
    }
    else
    {
       col2 = new Backbone.Collection (this.colCountry.where({gid:gid }));
    }
  
  // var gflag = true;
  console.log("col2 :::", col2.length);

  if(col2.length == 0){
      console.log("col length == 0");
      console.log(this.colState);
      var cntid =23;
     //var colName = new Backbone.Collection (this.colState.where({cntid : 23,gid:gid }));
      //console.log("colName :::", colName);
      this.renderState(delem,cntid,gid);
  }
  

    col2.each(function ( item) {

      // gflag = item.attributes.name.toUpperCase() == "ALL";
      console.log(col2.length);
      console.log(item.attributes.name );

      // if( gflag  == false)
      // {
            var selem = elem2.clone();
            clelem1 = lelem1.clone();

            var cntid = item.get('id');
         
             gid =  item.get('gid');

            //var col1 = new Backbone.Collection (this.colState.where({cntid : cntid,gid:gid }));
      
            if (currentcntid == cntid && currentgid == gid) 
            {
              clelem1.attr('id', selectedNodeId);
            }

               selem.attr('gid', gid);
               selem.attr('cntid', cntid); 
               selem.text( item.get('name'));
               clelem1.append(selem);
              

            //if(col1.length > 0){
                   this.renderState(clelem1, cntid,gid);
              //}
            // else{       
            //   this.renderDomain(clelem1, 1, cntid,gid);
            // }

             if(fromCountry)  
                  delem.append(clelem1);  
              else
                  roelem1.append(clelem1);  
      // }

    }, this);


    if( fromCountry == false  ) 
      {
        delem.append(roelem1);
      }


  },

  renderSingleState : function(fromState, selem,cntid, gid) {
    console.log("rendering state");
    var currentcntid = parseInt(app.ClientAppRouter.currentcntid, 10);   
    var currentgid = parseInt(app.ClientAppRouter.currentgid, 10);  
    var currentsid = parseInt(app.ClientAppRouter.currentstid, 10);
    console.log(gid);
    var elem3 = $(this.roottmpl);
    var relem2 = elem3.clone();
    
    var lelem3 = $(this.leaf);
    var elem4 = $(this.leaftmpl);
    var roelem2 = elem3.clone();
    roelem2.attr('id', 'state');
    var st;
    var selectedNodeId = 'dgr9999';
    var col1 = {};
    if( cntid == undefined )
         col1 = this.colState;
    else  if  ( cntid == 23) {
      console.log("checking cou id 23");
       col1 = new Backbone.Collection (this.colState.where({gid : gid }));
    }else{
        console.log("checking cou id");
          col1 = new Backbone.Collection (this.colState.where({cntid : cntid }));
      }

      if(col1.length == 0){
      console.log("col length == 0");
      console.log(this.colState);
      var cntid =23;
     //var colName = new Backbone.Collection (this.colState.where({cntid : 23,gid:gid }));
      //console.log("colName :::", colName);
      this.renderState(false, delem, cntid,gid);
  }
    var flag = false;
    col1.each(function ( item) 
    {
      flag = item.attributes.name.toUpperCase() == "ALL";
      if( flag  == false)
      {
          flag = true;
          var delem = elem4.clone();     
           st = lelem3.clone();
           var gid = item.get('gid');
          var sid = item.get('sid');
          var cntid = item.get('cntid');

          if (currentgid == gid && currentcntid == cntid && currentsid == sid) {
            st.attr('id', selectedNodeId);
          }
          //console.log(relem.attr('gid', rid));
          delem.attr('gid', gid); 
          delem.attr('cntid', cntid); 
          delem.attr('sid', sid); 
          var dname = item.get('name');   
          delem.text( dname); 
            st.append(delem);

          this.renderDomain(st,sid, cntid, gid);

                if(fromState)  
                        selem.append(st);  
                    else
                        roelem2.append(st);  

      }
    }, this);

      if( fromState == false &&  flag == false ) 
      {
        delem.append(roelem2);
      }  
  },

   renderState : function(selem,cntid, gid) {
    var currentcntid = parseInt(app.ClientAppRouter.currentcntid, 10);   
    var currentgid = parseInt(app.ClientAppRouter.currentgid, 10);  
    var currentsid = parseInt(app.ClientAppRouter.currentstid, 10);
    var elem3 = $(this.roottmpl);
    var relem2 = elem3.clone();
    
    var lelem3 = $(this.leaf);
    var elem4 = $(this.leaftmpl);
    var roelem2 = elem3.clone();
    roelem2.attr('id', 'state');
    var st;
    var selectedNodeId = 'dgr9999';
    console.log("cntid :::", cntid);
    if  ( cntid == 23) {
      console.log("checking cou id 23");
       col1 = new Backbone.Collection (this.colState.where({gid : gid }));
       console.log("couName ::", col1);

    }else{
       col1 = new Backbone.Collection (this.colState.where({cntid : cntid }));
    }
    var flag = false;
     if(col1.length == 0){
      var sid = 18;
       this.renderDomain(selem, sid, cntid, gid);
    }
    col1.each(function ( item) {
      flag = true;
      var delem = elem4.clone();
       st = lelem3.clone();
       var gid = item.get('gid');
      var sid = item.get('sid');
      var cntid = item.get('cntid');
      if (currentgid == gid && currentcntid == cntid && currentsid == sid) {
        st.attr('id', selectedNodeId);
      }
      //console.log(relem.attr('gid', rid));
      delem.attr('gid', gid); 
      delem.attr('cntid', cntid); 
      delem.attr('sid', sid); 
      var dname = item.get('name');   
      delem.text( dname); 
      st.append(delem);
      this.renderDomain(st,sid, cntid, gid);
      roelem2.append(st);
    }, this);
    if(flag) selem.append(roelem2);
   
  },

  renderDomain : function(delem,sid, cntid, gid) {
    var currentcntid = parseInt(app.ClientAppRouter.currentcntid, 10);   
    var currentgid = parseInt(app.ClientAppRouter.currentgid, 10);  
    var currentsid = parseInt(app.ClientAppRouter.currentstid, 10);
    var currentdid = parseInt(app.ClientAppRouter.domainid, 10);

    console.log(currentcntid,currentgid,currentsid,currentdid);
    var elem4 = $(this.roottmpl);
    var relem3 = elem4.clone();
    
    var lelem4 = $(this.leaf);
    var elem5 = $(this.leaftmpl);
    var roelem3 = elem4.clone();
    roelem3.attr('id', 'doamin');
    var le;
    var selectedNodeId = 'dgr9999';
    var col4 = new Backbone.Collection (this.colDomain.where({gid :gid, cntid :cntid, sid: sid }));


    var flag = false;
    col4.each(function ( item) 
    {
      flag = true;
      var relem = elem5.clone();
      le = lelem4.clone();

       var gid = item.get('gid');
      var did = item.get('did');
       var sid = item.get('sid');
       var cntid = item.get('cntid');
         console.log(" draw domain ", gid, cntid, sid,did);

      if (currentgid == gid && currentcntid == cntid && currentsid == sid && currentdid == did) {
        le.attr('id', selectedNodeId);
      }
      //console.log(relem.attr('gid', rid));
      relem.attr('gid', gid); 
      relem.attr('cntid', cntid); 
      relem.attr('sid', sid); 
       relem.attr('did', did); 
      var dname = item.get('name');   
      relem.text( dname); 
     // var span = $(this.span).clone();
      //span.addClass('rdocclick');
     // span.text(item.get('name'));
     // delem.append(span);
      le.append(relem);
       this.renderRegulation(le, did, sid, cntid, gid);
      roelem3.append(le);
    }, this);
    if(flag) delem.append(roelem3);
  },


 
  renderRegulator : function(relem, did, sid, cntid, gid) {
    var currentcntid = parseInt(app.ClientAppRouter.currentcntid, 10);   
    var currentgid = parseInt(app.ClientAppRouter.currentgid, 10);  
    var currentsid = parseInt(app.ClientAppRouter.currentstid, 10);
    var currentdid = parseInt(app.ClientAppRouter.domainid, 10);
    var currentrid = parseInt(app.ClientAppRouter.currentrid, 10);

    console.log("from the render Regulator",currentgid, currentcntid,currentsid,currentdid,currentrid);

    var elem3 = $(this.roottmpl);
    var relem2 = elem3.clone();
    
    var lelem3 = $(this.leaf);
    var elem4 = $(this.leaftmpl);
    var roelem2 = elem3.clone();
    roelem2.attr('id', 'regulator');
    var rl;
    var selectedNodeId = 'dgr9999';

   
  var col1 = new Backbone.Collection (this.colRegulator.where({gid :gid,cntid :cntid, sid: sid, did : did }));
    console.log("regulator collection", JSON.stringify(col1));
  var flag = false;
    col1.each(function ( item) {
      flag =true;
      var rgelem = elem4.clone();
         rl = lelem3.clone();
      var rid = item.get('rid');
      var did = item.get('did');
      var cntid = item.get('cntid');
      var sid = item.get('sid');
      var gid = item.get('gid');
      if (currentgid == gid && currentcntid == cntid && currentsid == sid && currentdid == did && currentrid == rid ) {
        rl.attr('id', selectedNodeId);
      }
      rgelem.attr('gid', gid); 
      rgelem.attr('cntid', cntid); 
      rgelem.attr('sid', sid); 

      rgelem.attr('did', did);
      rgelem.attr('rid' , rid);
      var rname = item.get('name');   
      rgelem.text(rname); 
     // var span = $(this.span).clone();
     // span.addClass('rdocclick');
     // span.text(item.get('name'));
      //rgelem.append(span);
   //   rl.append(rgelem);
      this.renderRegulation(relem, rid, did, sid, cntid, gid);
  //    roelem2.append(rl);
    }, this);
   // if(flag) relem.append(roelem2);
  },

  renderRegulation : function(rgelem,  did, sid, cntid, gid) {

    var currentcntid = parseInt(app.ClientAppRouter.currentcntid, 10);   
    var currentgid = parseInt(app.ClientAppRouter.currentgid, 10);  
    var currentsid = parseInt(app.ClientAppRouter.currentstid, 10);
    var currentdid = parseInt(app.ClientAppRouter.domainid, 10);
    var currentrid = parseInt(app.ClientAppRouter.currentrid, 10);
    var currentrlid = parseInt(app.ClientAppRouter.currentrlid, 10);

    var elem3 = $(this.roottmpl);
    var relem2 = elem3.clone();
    
    var lelem3 = $(this.leaf);
    var elem4 = $(this.leaftmpl);
    var roelem4 = elem3.clone();
    roelem4.attr('id', 'regulation')
    var reg;
    var selectedNodeId = 'dgr9999';
    var col1 = new Backbone.Collection (this.colRegulation.where({gid :gid,cntid :cntid, sid: sid, did : did }));
     
    var flag = false;

    col1.each(function ( item) {
      flag = true;
      var rlelem = elem4.clone();
      reg = lelem3.clone();
      var rlid = item.get('rlid');
      var rid =item.get('rid');
      var gid = item.get('gid');
      var cntid = item.get('cntid');
      var sid = item.get('sid');
      var did = item.get('did');
   
      if (currentgid == gid && currentcntid == cntid && currentsid == sid && currentdid == did && currentrid ==rid && currentrlid == rlid) {
        reg.attr('id', selectedNodeId);
      }
      rlelem.attr('rlid', rlid); 
      rlelem.attr('gid', gid); 
      rlelem.attr('cntid', cntid); 
      rlelem.attr('sid', sid); 
      rlelem.attr('did', did);
      rlelem.attr('rid', rid);
      var regname = item.get('name');   
      rlelem.text(regname);
     // var span = $(this.span).clone();
     // span.addClass('rdocclick');
      //span.text(item.get('name'));
      //delem.append(span);
      reg.append(rlelem);
      this.renderDocument(reg, rlid, rid, did, sid, cntid, gid);
      roelem4.append(reg);
    }, this);
    if(flag) rgelem.append(roelem4);
  },

  renderDocument : function(rlelem, rlid, rid, did, sid, cntid, gid) {
    var currentcntid = parseInt(app.ClientAppRouter.currentcntid, 10);   
    var currentgid = parseInt(app.ClientAppRouter.currentgid, 10);  
    var currentsid = parseInt(app.ClientAppRouter.currentstid, 10);
    var currentdid = parseInt(app.ClientAppRouter.domainid, 10);
    var currentrid = parseInt(app.ClientAppRouter.currentrid, 10);
    var currentrlid = parseInt(app.ClientAppRouter.currentrlid, 10);
    var currentdocid = parseInt(app.ClientAppRouter.currentdocid, 10);
    console.log("document ids", currentgid, currentcntid, currentsid, currentdid, currentrid, currentrlid, currentdocid);
    var elem3 = $(this.roottmpl);
    var lelem3 = $(this.leaf);
    var elem4 = $(this.leaftmpl);
    var roelem6 = elem3.clone();
    roelem6.attr('id', 'document');
    var doc;    
    var selectedNodeId = 'dgr9999';
    var col1 = new Backbone.Collection( this.colDocument.where({gid :gid,cntid :cntid, sid: sid, did : did, rid :rid, rlid :rlid }));
    var flag = false;
    console.log("DOCUMENT:", col1);
    var tmpDocid = 0;
    var distinctDocList = [];
    var docRegMap = {};
    if (col1.length >0) {//because mulltiple sub doc exist. Need to remove dubplicates at doc level.
      col1.each(function (item) {
        docRegMap[''+item.get('sdocid')] = {'docid': item.get('docid') , 
                                           'rdlid': item.get('rdlid')};
        if (tmpDocid != item.get('docid')) {
          distinctDocList.push(item.toJSON());
          tmpDocid = item.get('docid');
        }      
      });
    }
    console.log('docRegMap: ', JSON.stringify(docRegMap));
    //recreate backbone collection from distinct array
    var distinctDocCollection = new Backbone.Collection(distinctDocList);
    //Draw Documents & its sub docs
    distinctDocCollection.each(function (item) {
      flag = true;
      var sdelem = elem4.clone();
      doc = lelem3.clone();
      var docid = item.get('docid');
      var rlid = item.get('rlid');
      var rid =item.get('rid');
      var gid = item.get('gid');
      var cntid = item.get('cntid');
      var sid = item.get('sid');
      var did = item.get('did');
      var sdocid = item.get('sdocid');
      var isSpecial = item.get('is_special_doc');

      if (currentgid == gid && currentcntid == cntid && currentsid == sid && currentdid == did && rid == currentrid && rlid == currentrlid && docid == currentdocid) 
      {
        doc.attr('id', selectedNodeId);
      }

      sdelem.attr('docid', docid); 
      sdelem.attr('gid', gid); 
      sdelem.attr('cntid', cntid); 
      sdelem.attr('sid', sid); 
      sdelem.attr('did', did);
      sdelem.attr('rid', rid);
      sdelem.attr('rlid', rlid);
      sdelem.attr('sdocid', sdocid);
      sdelem.attr('isSpecial', isSpecial);
      console.log("idsss :::" ,rlid, rid, did, sid, cntid, gid, sdocid);

      var span = $(this.span).clone();
      span.attr('docid', docid); 
      span.attr('gid', gid); 
      span.attr('cntid', cntid); 
      span.attr('sid', sid); 
      span.attr('did', did);
      span.attr('rid', rid);
      span.attr('rlid', rlid);
      span.attr('sdocid', sdocid);
      span.attr('isSpecial', isSpecial);

      sdelem.text(item.get('name'));
      sdelem.append(span);
      doc.append(sdelem);

      var docname = item.get('name');   
      console.log("docname ::",docname);
      //sdelem.text(docname);
      if(sdocid == '10' || isSpecial == 1){//No sub doc exist OR the doc is special like LifeCycle & Doc
        sdelem.addClass("docclick");
        roelem6.append(doc);
      } else {
         // span.addClass('docclick');
         console.log("subdocument renderind reset");
          // this.renderSubDocument(doc, sdocid, docid, rlid, rid, did, sid, cntid, gid); comment by Niranjan for multiple sub doc
          this.renderSubDocument(doc, docid, docid, rlid, rid, did, sid, cntid, gid, docRegMap);
          roelem6.append(doc);
      }
        
          //this.renderSubDocument(doc, sdocid, docid, rlid, rid, did, sid, cntid, gid);
          // roelem6.append(doc);
      
    }, this);

    console.log("document to sub document ");
    if(flag) rlelem.append(roelem6);
  },

  renderSubDocument : function(sdelem, tpdocid, pdocid, rlid, rid, did, sid, cntid, gid, docRegMap) {
    var _self=this;
    var currentcntid = parseInt(app.ClientAppRouter.currentcntid, 10);   
    var currentgid = parseInt(app.ClientAppRouter.currentgid, 10);  
    var currentsid = parseInt(app.ClientAppRouter.currentstid, 10); 
    var currentdid = parseInt(app.ClientAppRouter.domainid, 10); 
    var currentrid = parseInt(app.ClientAppRouter.currentrid, 10); 
    var currentrlid = parseInt(app.ClientAppRouter.currentrlid, 10); 
    var currentdocid = parseInt(app.ClientAppRouter.currentdocid, 10); 
    var currentsdocid = parseInt(app.ClientAppRouter.doctypeid, 10); 

    var elem5 = $(this.leaf);
    var elem6 = $(this.leaftmpl);
    var elem7 = $(this.roottmpl);
    var elem8 = elem7.clone();
    elem8.attr('id', 'subdocument');
    var docelem,elem9;
    var selectedNodeId = 'dgr9999';

    console.log('PARENT DOC ID: ', pdocid);
    // var filtered = new Backbone.Collection( this.colSubdoc.where({gid :gid,cntid :cntid, sid: sid, did : did, rid :rid, rlid :rlid,docid:docid, sdocid:sdocid}));
    var filtered = new Backbone.Collection(this.colSubdoc.where({parent_id :pdocid}));
    var flag = false;
    if ( filtered.length != 0 ) {

      filtered.each(function ( item) {
        flag = true;
        docelem = elem6.clone();
        elem9 = elem5.clone();

        var docid = item.get('id');
        var isSpecial = item.get('is_special_doc');
        console.log('docRegMap: ', docRegMap);
        if (docRegMap.hasOwnProperty(docid)) {
          var rdlid = docRegMap[docid+''].rdlid;
          console.log('RDL-ID: ', rdlid);
          docelem.attr('rdlid', rdlid);
        } else {
          docelem.attr('rdlid', 0);
        }
        
        docelem.attr('isSpecial', isSpecial);
        docelem.attr('docid', tpdocid);
        docelem.attr('pdocid', pdocid);
        docelem.attr('sdocid', docid);
        docelem.attr('gid', gid); 
        docelem.attr('cntid', cntid);
        docelem.attr('sid', sid);
        docelem.attr('did', did); 
        docelem.attr('rid', rid); 
        docelem.attr('rlid', rlid); 

        docelem.text(item.get('name'));
        // docelem.addClass("docclick");
        console.log("name  ::" ,item.get('name'));
        console.log('SUB-DOC attr: ', pdocid, docid, rlid, rid, did, sid, cntid, gid);
        elem9.append(docelem);
        var nextSubDocCollection = new Backbone.Collection(this.colSubdoc.where({parent_id :docid}));
        if (nextSubDocCollection.length == 0) {//No next sub doc
          docelem.addClass("docclick");
          elem8.append(elem9);
        } else { //Exist next Sub doc
          this.renderSubDocument(elem9, tpdocid, docid, rlid, rid, did, sid, cntid, gid, docRegMap);
          elem8.append(elem9);  
        }
        
      }, this);
      sdelem.append(elem8);
    }
  },

//   renderSubDocument : function(sdelem, sdocid, docid, rlid, rid, did, sid, cntid, gid) {
//     var _self=this;
//     var currentcntid = parseInt(app.ClientAppRouter.currentcntid, 10);   
//     var currentgid = parseInt(app.ClientAppRouter.currentgid, 10);  
//     var currentsid = parseInt(app.ClientAppRouter.currentstid, 10); 
//     var currentdid = parseInt(app.ClientAppRouter.domainid, 10); 
//     var currentrid = parseInt(app.ClientAppRouter.currentrid, 10); 
//     var currentrlid = parseInt(app.ClientAppRouter.currentrlid, 10); 
//     var currentdocid = parseInt(app.ClientAppRouter.currentdocid, 10); 
//     var currentsdocid = parseInt(app.ClientAppRouter.doctypeid, 10); 
//     //var openelement   = null ;



//       var elem5 = $(this.leaf);
//       var elem6 = $(this.leaftmpl);
//       var elem7 = $(this.roottmpl);
//       var elem8 = elem7.clone();
//       elem8.attr('id', 'subdocument');
//       var docelem,elem9;
//       var selectedNodeId = 'dgr9999';

     
//       var filtered = new Backbone.Collection( this.colSubdoc.where({gid :gid,cntid :cntid, sid: sid, did : did, rid :rid, rlid :rlid,docid:docid, sdocid:sdocid}));
//       var flag = false;
//       if ( filtered.length != 0 ) {
  
//         filtered.each(function ( item) {
//           flag = true;
//         docelem = elem6.clone();
//         elem9 = elem5.clone();
        
//       var sdocid = item.get('sdocid');
//       var docid = item.get('docid');

//       var rlid = item.get('rlid');
//       var rid =item.get('rid');
//       var gid = item.get('gid');
//       var cntid = item.get('cntid');
//       var sid = item.get('sid');
//       var did = item.get('did'); 
// /*
//            if (currentgid == gid && currentcntid == cntid && currentsid == sid && currentdid == did && rid == currentrid && rlid == currentrlid && docid == currentdocid && currentsdocid == sdocid) 
//       {  
//          _self.openelement = docelem;
//          _self.docdata.currentgid=currentgid;
//          _self.docdata.currentcntid=currentcntid;
//          _self.docdata.currentsid=currentsid;
//          _self.docdata.currentdid=currentdid;
//          _self.docdata.currentrid=currentrid;
//          _self.docdata.currentrlid=currentrlid;
//          _self.docdata.currentdocid=currentdocid;
//          _self.docdata.currentsdocid=currentsdocid;
//       } */
//           docelem.attr('sdocid', sdocid);
//           docelem.attr('docid', docid);
//           docelem.attr('gid', gid); 
//           docelem.attr('cntid', cntid);
//           docelem.attr('sid', sid);
//           docelem.attr('did', did); 
//           docelem.attr('rid', rid); 
//           docelem.attr('rlid', rlid); 

//           docelem.text( item.get('name'));
//           docelem.addClass("docclick");
//           console.log("name  ::" ,item.get('name'));
//           // if(item.get('name') == '-'){
//           //   docelem.removeClass("docclick");
//           // }
//           console.log(docid, rlid, rid, did, sid, cntid, gid);
//           elem9.append(docelem); 
//           elem8.append(elem9);
//         }, this);
//         sdelem.append(elem8);
//       }
//   },

  filterDoctype : function() {
    var data = {};
    // data.gid = parseInt(app.ClientAppRouter.currentgid, 10);
    // data.rid = parseInt(app.ClientAppRouter.currentrid, 10);  
    // data.did = parseInt(app.ClientAppRouter.domainid, 10); 

     data.did = parseInt(app.ClientAppRouter.domainid, 10);
    data.gid = parseInt(app.ClientAppRouter.currentgid, 10);
    data.cntid = parseInt(app.ClientAppRouter.currentcntid, 10);
    data.sid = parseInt(app.ClientAppRouter.currentstid, 10);
    data.rid = parseInt(app.ClientAppRouter.currentrid, 10);
    data.rlid = parseInt(app.ClientAppRouter.currentrlid, 10);
    data.docid = parseInt(app.ClientAppRouter.currentdocid, 10);
    data.sdocid = parseInt(app.ClientAppRouter.doctypeid, 10);

    console.log("filterDoctype DATA :: ", data);
    console.log("SUBSCRIPTION:", this.docList);
    console.log(this.docList.where(data));
    return (this.docList.where(data).length > 0) ? true : false;
  },

  selectdoc:function()
  {
 // e.preventDefault();
 // var data= $(this).val();     
   //alert("data");
   _self = this;

     var selText = $("#treeselect :selected").text();
        $( "#treeCanvas" ).empty();

     if( selText == "Geography")
     {
        _self.reset();
       _self.renderGeography();
     }
     else if( selText == "Country")
     {
        _self.reset();
        _self.renderAllCountry();
     }
     else
     {
        _self.reset();
        this.renderAllState();
     }
  
},

renderAllCountry: function()
{
    this.root = "<ul id='country' > </ul>";
     var root = $(this.root);
    this.renderCountry(true,root);


    var  treeCanvas= $('#treeCanvas');

   // this.$el.append(root);
   treeCanvas.append(root);

    switch(this.mode) {                        
      case '1':
        console.log('openDoc');
        $('#country').tree({
          expanded: '#' + selectedNodeId
        });         
        break;
      case '2':
        console.log('openReg');
        $('#country').tree({
          expanded: '#' + selectedNodeId
        }); 
        break;
      case '0':                    
      default:
        console.log('default - 0');
        $('#country').tree({
          });          
    }
     
},


renderAllState: function()
{
    this.root = "<ul id='state' > </ul>";
     var root = $(this.root);
    this.renderSingleState(true,root);


    var  treeCanvas= $('#treeCanvas');

   // this.$el.append(root);
   treeCanvas.append(root);

    switch(this.mode) {                        
      case '1':
        console.log('openDoc');
        $('#state').tree({
          expanded: '#' + selectedNodeId
        });         
        break;
      case '2':
        console.log('openReg');
        $('#state').tree({
          expanded: '#' + selectedNodeId
        }); 
        break;
      case '0':                    
      default:
        console.log('default - 0');
        $('#state').tree({
          });          
    }
},

isSelected: function(e) {

      e.preventDefault();
      console.log(" Is selected ");
  //  this.selectedData();
},
reset: function(){
  console.log("reset",app.ClientAppRouter.mode);
    //app.ClientAppRouter.mode=0;
    app.ClientAppRouter.currentgid =  0;
    app.ClientAppRouter.currentcntid =   0;
    app.ClientAppRouter.currentstid =   0;
    app.ClientAppRouter.currentrid =   0;
    app.ClientAppRouter.currentrlid = 0;
    app.ClientAppRouter.domainid =  0;
    app.ClientAppRouter.currentdocid =0;
    app.ClientAppRouter.doctypeid = 0;
    app.ClientAppRouter.sdocid = 0;


} 


});


