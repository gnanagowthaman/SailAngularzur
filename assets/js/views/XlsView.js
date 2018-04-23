var app = app || {};

app.XlsView = Backbone.View.extend({
  el : $("#canvas"),
  
  initialize: function() {
    console.log ( "here is xls...");
    this.collection = new app.XlsList();    
    this.templ = "<th class='text-center header small_col' id='elem'></th>"; //to show header with images
    this.templ1 = "<th class='text-center header ' id='elem'></th>"; //to show Description & Analysis of Amendments Column header
    this.templ2 = "<td class='text-left small_col' id='elem'></td>";
    this.templ3 = "<td class='text-left' id='elem'></td>";
    this.tblStart = "<table border='1' width='100%'  class='table table-hover  dt-responsive tracker_page ' id='";  
    this.spltblStart = "<table border='1' width='100%'  class='table  dt-responsive tracker_page ' id='";  
    this.tblEnd = "'> <thead  id ='xlshead' ><tr id='xlsheadrow'></tr> </thead> <tbody id='xlsbody'><tr id='xlsbodyrow'></tr></tbody> </table>";
    this.tbl = "";
    this.filterTemplate = '<div class="doc_filter_container">' +
                            '<div id="sort-asc">Sort A->Z</div>' +
                            '<div id="sort-dsc">Sort Z->A</div>' +
                            '<div class="selclear"><span><a id="select-all">Select All</a></span> <span><a id="clear-all">Clear All</a></span></div>' +
                            '<div class="form-group"><div id="filterByValue"></div></div>' +
                            '<div><button id="ok"     class="btn btn-outline btn-success">OK</button>' +
                            '     <button id="cancel" class="btn btn-outline btn-black">Cancel</button></div>' +
                          '</div>';
    this.checkBoxTemplate = '<div class="checkbox-custom">' +
                              '<input type="checkbox" value="" checked>' +
                              '<label></label>' +                         
                            '</div>';

    this.uncheckBoxTemplate = '<div class="checkbox-custom">' +
                              '<input type="checkbox" value="" >' +
                              '<label></label>' +                         
                            '</div>';
    app.ClientAppRouter.currentopendoc = 'xls';
    this.filterCollection = new Backbone.Collection();
    this.filterSliderOnOff = false; //show A-Z  [if true show Z-A] in filterPopupContainer
    _.bindAll(this, "render");
    _.bindAll(this, "drawRows");
    _.bindAll(this, "render_spl");
  },

  events: {           
    'click .sdoclick' : 'loadFile',
    'click #forsea'     : 'searchText',
    'click .filterarrrow' : 'showFilter',
    'click .trail_download':'trailuser_check' 
  },   
 loadFile : function(e) {
  console.log( "loadpath" );
  console.log( e );
   //    if ( (e.target).is('button'))
    //        console.log( "button");
    //   else if ((e.target).is('a'))
    //        console.log( "anchor");
    //   else if ( (e.target).is('td'))
    //        console.log( "td");
             
          var path = $(e.target).attr('path');
          
        //   var path = "/first.pdf"
  console.log( path );
          var doc = $(e.target).attr('doc');
       //   var doc ="First"
  console.log( doc );
            $("#canvas").empty();
            $("#canvas").unbind();
            $('#panelFooter').empty();
            $('#Textdiv').empty();
            $('#rendersec').empty();
  console.log( "loadpath" );
  console.log( path );
  console.log( doc );
          if ( path ) {
   
        var bstring = app.ClientAppRouter.spldocname;

              $('#breadcrumb').text(bstring +'>'+doc);

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
            $("#canvas").append("<div class='text-center'><H4> Currently no document available, contact Zurik Support at info@zurikglobal.com </H4></div>");
         }



 },
 

  render: function(options) {
    this.$el.children().remove();   
    $(".row #canvas").html('<center><img id="image_loader" src="/images/loading.gif" styles="align:center;">');
    // $('body').css('pointer-events','none');
    console.log('options: ', options);
    this.path = options.path;
    this.selectedDocEl = options.selectedDocEl;
    console.log(this.path);
    var squery = {
      'path' : encodeURIComponent(this.path)
    };
    console.log(squery);
    var _xlsview = this;
    //console.log("xls path test +++++++++++++++" + JSON.stringify(this.collection.fetch({data: $.param(squery)})));
    $.when(this.collection.fetch({data: $.param(squery)})).done( function() {

   var spl = false
      _xlsview.drawXLS(spl);
    }).fail(function(data) {
        try {
          $('#image_loader').remove();
          var errData = JSON.parse(data.responseText);
          if ( errData.errCode == 550) {
            window.location.href = '/sessionExpired';
        } else {
          if (errData.errMsg.length > 0) {
              var failureMsg = errData.errMsg;  
          } else {
              var failureMsg = "Error occurred while downloading the Document. Please Contact Administrator.";  
          }
             $('#breadcrumb').text('');
             $('#regtitle').remove();
             $('.widget').empty();
             $("#canvas").children().remove();
             $("#canvas").append('<H4><center>'+failureMsg+'</center></H4>');
             _xlsview.selectedDocEl.addClass('docclick');        
        } 
      } catch(e) {
          window.location.href = '/sessionExpired';
      }     
    }); 
     $("#canvas").bind("contextmenu", function(e) {
            e.preventDefault();
            return false;
       }); 

       console.log(this.collection);           
  },
 
  render_spl : function(options) {
    console.log("here in render spl");
    this.$el.children().remove();   
    $(".row #canvas").html('<center><img id="image_loader" src="/images/loading.gif" styles="align:center;">');
    this.selectedDocEl = options.selectedDocEl;
    var _xlsview = this;
    console.log("=======");
    console.log( JSON.stringify(options));
    var squery = {
      'data' : options.data
    };    
    $.when(this.collection.fetch({data: $.param(squery)})).done( function() {

     var spl = true;
      _xlsview.drawXLS(spl);
    }).fail(function(data) {
        try {
          $('#image_loader').remove();
          var errData = JSON.parse(data.responseText);
          if ( errData.errCode == 550) {
            window.location.href = '/sessionExpired';
        } else {
          if (errData.errMsg.length > 0) {
              var failureMsg = errData.errMsg;
          } else {
              var failureMsg = "Error occurred while downloading the Document. Please Contact Administrator.";
          }
             $('#breadcrumb').text('');
             $('#regtitle').remove();
             $('.widget').empty();
             $("#canvas").children().remove();
             $("#canvas").append('<H4><center>'+failureMsg+'</center></H4>');
             _xlsview.selectedDocEl.addClass('docclick');    
        }
      } catch(e) {
          // window.location.href = '/sessionExpired';
      }
    });
     $("#canvas").bind("contextmenu", function(e) {
            e.preventDefault();
            return false;
       });

       console.log(this.collection);
 },

  drawXLS: function(spl) {
     console.log("The spl document case");
     console.log(spl);
    if ( spl && spl == true) {
    this.drawSearchAndDownload(spl);
    this.drawRows(this.drawHeader(spl));
   } else {
    var spl1 = false;
    this.drawSearchAndDownload(spl1);
    this.drawRows(this.drawHeader(spl1));
   }
    var tblId = this.generateTblId();
    $("#" + tblId).colResizable({ disable : true });
    this.resizing();
  },

  drawSearchAndDownload: function(spl) {
            $('#rendersec , #Textdiv').remove();
      var hhtml ='<div id="Textdiv" class="input-group input-group-search-uview ">' +
          '<input id="searchTxt" type="text" placeholder="QUICK SEARCH" class="form-control">' +
          '<span class="input-group-btn"><button id="goSearch" type="button" class="btn btn-outline btn-default"></button></span>' +
        '</div>';
 if ( !spl )
   hhtml += "<form id='rendersec' method='get' action='/documents/publish" + this.path + "'>" + '<button type="submit" class="btn btn-success btn-rounded btn-block button-with-icon trail_download"><span>Download XLS</span> <img src="img/button_pdf.svg" width="19" height="19" alt="Download XLS"></button>' + "</form>";
   var fhtml ="";
 if ( !spl )
   fhtml +="<form id='rendersec' method='get' action='/documents/publish" + this.path + "'>" + '<button type="submit" class="btn btn-success btn-rounded btn-block button-with-icon trail_download"><span>Download XLS</span> <img src="img/button_pdf.svg" width="19" height="19" alt="Download XLS"></button>' + "</form>";
    $('#panelHeader').append( hhtml
    );

    $('#panelFooter').append(fhtml
     );
    $("#searchTxt").on('keyup',function(e) {
      e.preventDefault();
      if (e.keyCode === 13) {
        $('#forsea').trigger('click');
      } 
    }); 
    $("#goSearch").on('click',function(e) {
      e.preventDefault();
        $('#forsea').trigger('click');
    });

    $(".trail_download").bind('click', this.trailuser_check);
  },

  drawHeader : function(spl) {
    var ids;
    var genid = this.generateTblId(); 
    console.log("inside table header");
     if ( spl && spl == true ) 
    this.tbl = this.spltblStart + genid + this.tblEnd;
    else
    this.tbl = this.tblStart + genid + this.tblEnd;
    var newrow = $(this.tbl);

    this.collection.each(function ( item) {
      ids = item.keys();
    }, this); 
    if (ids) {
      console.log('IDS: ', ids);
      for ( i =0; i < ids.length; i++ ) {
         // To identify column header template. 
         // Description & Analysis of Amendments column uses template w/o class=small_coll
         var elem = null;
         switch (ids[i]) {
          case 'Description':
            elem = $(this.templ1);
            break;
          case 'Analysis of Amendments':
            elem = $(this.templ1);
            break;
          default:
            elem = $(this.templ);  
         };        
         console.log("Element....");
         console.log(elem);
         var newelem =  elem.filter('#elem');
         console.log("New Element....");
         console.log(newelem);
         var found = newelem.clone();
         console.log("Cloned Element....");
         console.log(found);
         found.attr('id',  ids[i]);
         if ( ids[i] == 'DocumentType' )
         found.append($('<div class="headrowsort"></div>').text('Document Type'));
         else
         found.append($('<div class="headrowsort"></div>').text(ids[i]));
         // switch (ids[i]) {
         //  case 'Article Ref':
         //    found.append($('<div class="headrowsort article_ref"></div>').text(ids[i]));
         //    break;
         //  case 'Related Document':
         //    found.append($('<div class="headrowsort documents"></div>').text(ids[i]));
         //    break;
         //  case 'Description':
         //    found.append($('<div class="headrowsort regulation"></div>').text(ids[i]));
         //    break;
         //  case 'Analysis of Amendments':
         //    found.append($('<div class="headrowsort analysis"></div>').text(ids[i]));
         //    break;
         //  case 'Comments':
         //    found.append($('<div class="headrowsort comments"></div>').text(ids[i]));
         //    break;
         //  case 'Level 1 & 2 Cross Reference':
         //    found.append($('<div class="headrowsort level-1-2"></div>').text(ids[i]));
         //    break;
         //  case 'Business':
         //    found.append($('<div class="headrowsort business"></div>').text(ids[i]));
         //    break;
         //  case 'Theme':
         //    found.append($('<div class="headrowsort theme"></div>').text(ids[i]));
         //    break;
         //  case 'Update':
         //    found.append($('<div class="headrowsort update"></div>').text(ids[i]));
         //    break;
         //  case 'Analysis':
         //    found.append($('<div class="headrowsort analysis"></div>').text(ids[i]));
         //    break;                                                                                                    
         // }

         // found.append($('<div class="headrowsort"></div>').text(ids[i]));
         var filter = $('<div class="filterarrrow"></div>');

         // var arrowImg = $('<img class="showFilter" src="/images/sort.png">');
         var arrowImg = $('<div class="showFilter"></div>');
         arrowImg.attr('filter', ids[i]); 
         arrowImg.attr('position', i);
         // filter.append($('<img class="showFilter" src="/images/sort.png">').attr('filter', ids[i]));
         filter.append(arrowImg);
         found.append(filter);         
         console.log("id.."+found.attr('id') );
         console.log("text.."+found.text() );
         console.log(found);
         var rel = newrow.find('#xlsheadrow');
         console.log( rel.html());
         console.log( "id>>"+ rel.attr('id'));
         rel.append(found);
      }           
    }
    return newrow;
  },
      
  drawRows  : function(rows) {
    var vrow = rows.find('#xlsbodyrow');
    var vbody = rows.find('#xlsbody');
    var ids, values;
    var counter = 0;
    this.collection.each(function (item, index) {
      ids = item.keys();
      values = item.values();
      var crow = vrow.clone();
      var elem = null;
      var docuid = 0;
      for ( i = 0; i < ids.length; i++ ) {
         switch (ids[i]) {
          case 'Description':
            elem = $(this.templ3);
            break;
          case 'Analysis of Amendments':
            elem = $(this.templ3);
            break;
          default:
            elem = $(this.templ2);  
         };                  
        var newelem =  elem.filter('#elem'); 
        var found = newelem.clone();
        if (index == 0) {
          found.attr('id', i);
        } else {
          found.attr('id', ids[i]);  
        } 
               
        if ( ids[i] == 'Link') {
        console.log(docuid);
        console.log("inside link" );
        console.log(values[docuid] );
        var spFilePath = values[i].replace(/'/g, "\'");
        console.log(spFilePath);
        var anchor = '<a class="sdoclick btn btn-success btn-rounded btn-block floatLeft btn-bigger" path="' + spFilePath + '" doc="'+values[2]+'">Access Now</a>';
        console.log(anchor);
        var aelem = $(anchor);
        found.append(aelem);
        found.addClass('last-buttion-table');
        } else 
        found.text(values[i]);

        // console.log(found);        
        crow.append(found);
      }
      $('#image_loader').remove(); 
      vbody.append(crow);
      counter = index;
    }, this); 
    console.log('counter: ' + counter);

    var Regtitle = $('#regtitle').text();
    // console.log("from xlsview", this.path);
    // $('body').css('pointer-events','visible');
    this.$el.append(rows);
    this.$el.append('<div id="forsea"></div>');  
     
    // if (Regtitle == 'Regulatory Tracker Level 1'|| Regtitle == 'Regulatory Tracker Level 2') {
      $(".header").css("background-color", "#A52A2A");
      $(".header").css("color", "white");
    // }
    //Clone the collection for sorting & filtering purposes only
    this.searchlection = this.collection.clone();
    this.selectedDocEl.addClass('docclick');    
  },

  searchText: function () {
    // $('body').css('pointer-events','none');
    searchcmd=$('#searchTxt').val();
    this.searchlection=this.collection.search(searchcmd)
    console.log(this.searchlection.length);
    //Before re-render table, It is required to disable a previously colResized table prior its removal
    //from the document object tree using JavaScript, and also before any DOM manipulations 
    //to an already colResized table such as adding columns, rows, etc
    // $("#xls-table").colResizable({ disable : true });
    var tblId = this.generateTblId();
    $("#" + tblId).colResizable({ disable : true });    
    this.searchlection.length > 0 ?  this.$el.children().remove() : alert(1);
    console.log(searchcmd, this.searchlection);
    var ids;
    var newrow = $(this.tbl);
    this.searchlection.each(function (item) {
      ids = item.keys();
    }, this); 
    if (ids) {
      for ( i =0; i < ids.length; i++ ) {
        // var elem = $(this.templ);
        // To identify column header template. 
        // Description & Analysis of Amendments column uses template w/o class=small_coll
        var elem = null;
        switch (ids[i]) {
          case 'Description':
            elem = $(this.templ1);
            break;
          case 'Analysis of Amendments':
            elem = $(this.templ1);
            break;
          default:
            elem = $(this.templ);  
        };         
        var newelem =  elem.filter('#elem');
        var found = newelem.clone();
        found.attr('id',  ids[i]);
         found.append($('<div class="headrowsort"></div>').text(ids[i]));
        // switch (ids[i]) {
        //   case 'Article Ref':
        //     found.append($('<div class="headrowsort article_ref"></div>').text(ids[i]));
        //     break;
        //   case 'Related Document':
        //     found.append($('<div class="headrowsort documents"></div>').text(ids[i]));
        //     break;
        //   case 'Description':
        //     found.append($('<div class="headrowsort regulation"></div>').text(ids[i]));
        //     break;
        //   case 'Analysis of Amendments':
        //     found.append($('<div class="headrowsort analysis"></div>').text(ids[i]));
        //     break;
        //   case 'Comments':
        //     found.append($('<div class="headrowsort comments"></div>').text(ids[i]));
        //     break;
        //   case 'Level 1 & 2 Cross Reference':
        //     found.append($('<div class="headrowsort level-1-2"></div>').text(ids[i]));
        //     break;
        //   case 'Business':
        //     found.append($('<div class="headrowsort business"></div>').text(ids[i]));
        //     break;
        //   case 'Theme':
        //     found.append($('<div class="headrowsort theme"></div>').text(ids[i]));
        //     break;
        //   case 'Update':
        //     found.append($('<div class="headrowsort update"></div>').text(ids[i]));
        //     break;                                                                                                    
        // }        
        // found.append($('<span class="headrowsort"></span>').text(ids[i]));
        var filter = $('<div class="filterarrrow"></div>');
        // var arrowImg = $('<img class="showFilter" src="/images/sort.png">');
        var arrowImg = $('<div class="showFilter"></div>');
        arrowImg.attr('filter', ids[i]); 
        arrowImg.attr('position', i);                
        found.append(filter.append(arrowImg));
        var rel = newrow.find('#xlsheadrow');
        rel.append(found);

      } 
      // $('#image_loader').remove();        
    }

    var vrow = newrow.find('#xlsbodyrow');
    var vbody = newrow.find('#xlsbody');
    var ids, values;
    this.searchlection.each(function (item, index) {
      ids = item.keys();
      values = item.values();
      var crow = vrow.clone();
      var elem = null;
      for ( i = 0; i < ids.length; i++ ) {
        // var elem = $(this.templ2);
        switch (ids[i]) {
          case 'Description':
            elem = $(this.templ3);
            break;
          case 'Analysis of Amendments':
            elem = $(this.templ3);
            break;
          default:
            elem = $(this.templ2);  
        };        
        var newelem =  elem.filter('#elem');; 
        var found = newelem.clone();
        // found.attr('id',  ids[i]);
        if (index == 0) {
          found.attr('id', i);
        } else {
          found.attr('id', ids[i]);  
        }
        if ( ids[i] == 'Link') {
        var spFilePath = values[i].replace(/'/g, "\'");
        console.log(spFilePath);
        var anchor = '<a class="sdoclick btn btn-success btn-rounded btn-block floatLeft btn-bigger" path="' + spFilePath + '" doc="'+values[2]+'">Access Now</a>';
        console.log(anchor);
        var aelem = $(anchor);
        found.append(aelem);
        found.addClass('last-buttion-table');
        } else                 
        found.text(values[i]);
        crow.append(found);
      }
      vbody.append(crow);
    }, this);
    // $('body').css('pointer-events','visible'); 
    this.$el.append(newrow);

    //Highlight the searched keyword in the document, if search is performed
    if (this.searchlection.length > 0 && searchcmd.trim() != "") {
      console.log('valid search:' + searchcmd.trim());
      var selectedTxt = '';
      var highlightTxt = '';
      var regExp = new RegExp("(" + searchcmd.trim() + ")","gi"); 
      //Commented by Niranjan. Because this does not work with jQuery 3.x
      // $('#xlsbody').children("*:contains(" + searchcmd.trim() + ")").each(function() {
      $('#xlsbody').children().each(function() {        
        $(this).children().each(function() {
          selectedTxt = $(this).text();
          console.log(selectedTxt);
          if (selectedTxt != 'Access Now') { //to skip Access Button in SP doc view
            highlightTxt = selectedTxt.replace(regExp, "<span style='background-color: #FFFF00'>$1</span>");
            console.log(highlightTxt);
            $(this).html(highlightTxt); 
          }
        });        
      });
    }
    this.$el.append('<div id="forsea"></div>');

    //To set the Header color for Regulatory Tracker Level 1 and 2
    var Regtitle = $('#regtitle').text();
    // if(Regtitle == 'Regulatory Tracker Level 1'|| Regtitle == 'Regulatory Tracker Level 2'){
      $(".header").css("background-color", "#A52A2A");
      $(".header").css("color", "white");
    // }
    this.resizing();
  },

  resizing: function() {
    //To drag and drop the columns 
    var tblId = this.generateTblId();
    console.log('Resizing - tblId::' + tblId);
    $('#' + tblId).sorttable({
      placeholder: 'placeholder',
      helperCells: null
    }).disableSelection();
    //To do Column resizable
    $('#' + tblId).colResizable({
      liveDrag: true,
      postbackSafe: true,
      resizeMode:'overflow'
    });                
  },

  doSort: function(typeOfSort, filterColumn) {                
    console.log("filterColumn: ", filterColumn);
    sortcollection = this.searchlection.clone();    
    var countOfBlanks = 0;
    sortcollection.comparator = function(a, b) {
      if (new String(typeOfSort).valueOf() == new String('asc').valueOf()) {
        if (a.get(filterColumn).trim() < b.get(filterColumn).trim()) {console.log('-1');return -1};
        if (a.get(filterColumn).trim() > b.get(filterColumn).trim()) {console.log('1');return 1};
        console.log('0');++countOfBlanks;return 0;
      } else { //dsc
        if (a.get(filterColumn).trim() > b.get(filterColumn).trim()) {console.log('-1');return -1};
        if (a.get(filterColumn).trim() < b.get(filterColumn).trim()) {console.log('1');return 1};
        console.log('0');++countOfBlanks;return 0;
      }
    };
    sortcol = sortcollection.sort();
    // console.log('countOfBlanks'); console.log(countOfBlanks);
    // console.log('sortcol'); console.log(sortcol);
    // console.log('sortcollection'); console.log(sortcollection);
    //if sorted column has all blank values then do nothing & return, leave the doc table as it is
    if (countOfBlanks == (sortcol.length-1)) return;

    //Reassign sorted-collection to this.searchlection
    this.searchlection = sortcol;
    //Before re-render table, It is required to disable a previously colResized table prior its removal
    //from the document object tree using JavaScript, and also before any DOM manipulations 
    //to an already colResized table such as adding columns, rows, etc
    // $("#xls-table").colResizable({ disable : true }); 
    var tblId = this.generateTblId();
    $("#" + tblId).colResizable({ disable : true });       
    this.$el.children().remove();

    var ids;
    var newrow = $(this.tbl);
    this.$el.children().remove(); 
    sortcol.each(function ( item) {
      ids = item.keys();
      // console.log("from item keys", item.keys());
    }, this); 
    if (ids) {
      for ( i =0; i < ids.length; i++ ) {
        // var elem = $(this.templ);
        // To identify column header template. 
        // Description & Analysis of Amendments column uses template w/o class=small_coll
        var elem = null;
        switch (ids[i]) {
          case 'Description':
            elem = $(this.templ1);
            break;
          case 'Analysis of Amendments':
            elem = $(this.templ1);
            break;
          default:
            elem = $(this.templ);  
        };        
        var newelem =  elem.filter('#elem');
        var found = newelem.clone();
         found.append($('<div class="headrowsort"></div>').text(ids[i]));
        // switch (ids[i]) {
        //   case 'Article Ref':
        //     found.append($('<div class="headrowsort article_ref"></div>').text(ids[i]));
        //     break;
        //   case 'Related Document':
        //     found.append($('<div class="headrowsort documents"></div>').text(ids[i]));
        //     break;
        //   case 'Description':
        //     found.append($('<div class="headrowsort regulation"></div>').text(ids[i]));
        //     break;
        //   case 'Analysis of Amendments':
        //     found.append($('<div class="headrowsort analysis"></div>').text(ids[i]));
        //     break;
        //   case 'Comments':
        //     found.append($('<div class="headrowsort comments"></div>').text(ids[i]));
        //     break;
        //   case 'Level 1 & 2 Cross Reference':
        //     found.append($('<div class="headrowsort level-1-2"></div>').text(ids[i]));
        //     break;
        //   case 'Business':
        //     found.append($('<div class="headrowsort business"></div>').text(ids[i]));
        //     break;
        //   case 'Theme':
        //     found.append($('<div class="headrowsort theme"></div>').text(ids[i]));
        //     break;
        //   case 'Update':
        //     found.append($('<div class="headrowsort update"></div>').text(ids[i]));
        //     break;                                                                                                    
        // }
        // found.append($('<span class="headrowsort"></span>').text(ids[i]));
        var filter = $('<div class="filterarrrow"></div>');
        // var arrowImg = $('<img class="showFilter" src="/images/sort.png">');
        var arrowImg = $('<div class="showFilter"></div>');
        arrowImg.attr('filter', ids[i]); 
        arrowImg.attr('position', i);                
        found.append(filter.append(arrowImg));                            
        console.log("id.."+found.attr('id') );
        console.log("text.."+found.text() );
        var rel = newrow.find('#xlsheadrow');
        console.log( rel.html());
        console.log( "id>>"+ rel.attr('id'));
        rel.append(found);
      }                  
    }
    
    var vrow = newrow.find('#xlsbodyrow');
    var vbody = newrow.find('#xlsbody');
    var ids, values;
    console.log("from the xlsviewsearch:");
    sortcol.each(function (item, index) {
      ids = item.keys();
      values = item.values();
      var crow = vrow.clone();
      var elem = null;
      for ( i = 0; i < ids.length; i++ ) {
        // var elem = $(this.templ2);
        switch (ids[i]) {
          case 'Description':
            elem = $(this.templ3);
            break;
          case 'Analysis of Amendments':
            elem = $(this.templ3);
            break;
          default:
            elem = $(this.templ2);  
        };        
        var newelem =  elem.filter('#elem');; 
        var found = newelem.clone();
        // found.attr('id',  ids[i]);
        if (index == 0) {
          found.attr('id', i);
        } else {
          found.attr('id', ids[i]);  
        }
        if ( ids[i] == 'Link') {
        var spFilePath = values[i].replace(/'/g, "\'");
        console.log(spFilePath);
        var anchor = '<a class="sdoclick btn btn-success btn-rounded btn-block floatLeft btn-bigger" path="' + spFilePath + '" doc="'+values[2]+'">Access Now</a>';
        console.log(anchor);
        var aelem = $(anchor);
        found.append(aelem);
        found.addClass('last-buttion-table');
        } else                
        found.text(values[i]);
        crow.append(found);
      }
      vbody.append(crow);              
    }, this); 
    this.$el.append(newrow);
    this.$el.append('<div id="forsea"></div>');
    
    var Regtitle = $('#regtitle').text();
    // if (Regtitle == 'Regulatory Tracker Level 1'|| Regtitle == 'Regulatory Tracker Level 2') {
      $(".header").css("background-color", "#A52A2A");
      $(".header").css("color", "white");
    // }
    this.resizing();
  },

  generateTblId: function() {
    return 'xls-table' + 
      app.ClientAppRouter.currentgid +
      app.ClientAppRouter.currentcntid +
      app.ClientAppRouter.curentstid +
      app.ClientAppRouter.domainid +
      app.ClientAppRouter.currentrid +
      app.ClientAppRouter.currentrlid +
      app.ClientAppRouter.currentdocid +
      app.ClientAppRouter.currentsubdocid;
  },

  showFilter: function(e) {
    this.renderFilter(e);
    this.registerFilterEvents();
  },

  renderFilter: function(e) {
    $('#filterPopupContainer').unbind();
    $('#filterPopupContainer').remove();
    var filterColumn = $(e.target).attr('filter');
    var columnPosition = $(e.target).attr('position');
    console.log('filterColumn: ' + filterColumn); console.log('columnPosition: ' + columnPosition);
    var arrowEl = $(e.target).parent();
      if(arrowEl.hasClass('open_filter')){
        $(".filterarrrow").removeClass('open_filter');
      } else {
        arrowEl.addClass('open_filter');
        var pos = arrowEl.parent().position();
        var plusTop = arrowEl.parent().outerHeight(true);
        var plusleft = arrowEl.parent().outerWidth(true);
        var filterPopup = $($('#filterPopupContainerTpl').html());

        filterPopup.find('#select-all').attr('isSelected', true);
        filterPopup.find('#clear-all').attr('isCleared', false);
        filterPopup.find('#sort-order').attr('filter', filterColumn);
        // filterPopup.find('#sort-dsc').attr('filter', filterColumn);
        filterPopup.find('#filter').attr('filter', filterColumn);
        filterPopup.find('#cancel').attr('filter', filterColumn);
        this.renderFilterValues(filterPopup, filterColumn);

        $('#canvas').append(filterPopup);
        var leftFilter = pos.left+plusleft-$("#filterPopupContainer").outerWidth(true);
        $("#filterPopupContainer").show().css({left:leftFilter,top:pos.top+plusTop+1});
      }
  },

  renderFilterValues: function(filterPopup, filterColumn) {
    console.log('filterColumn ' + filterColumn);
    this.filterMap = {};
    var self = this;
//this.searchlection.each(function(item) {
   if(this.filterCollection.length == 0){
   this.collection.each(function(item) {
       var filterValue = item.get(filterColumn);
      var filterValueStr1 = filterValue.substr(0, 30);
      var filterValueStr = filterValueStr1.trim();
      console.log('filterValueStr'); console.log(filterValueStr);
   
      if (this.filterMap.hasOwnProperty(filterValueStr)) {
        this.filterMap[filterValueStr].push(item.toJSON());
      } else {
        var filteredArray = []; filteredArray.push(item.toJSON());
        this.filterMap[filterValueStr] = filteredArray;
        var filterCheckBox = $(this.checkBoxTemplate);
        filterCheckBox.find('input').val(filterValueStr); 
         console.log("filterCheckBox",filterCheckBox);        
        if (filterValueStr.trim().length == 0) {
          filterCheckBox.find('input').attr('id', 'Blank');
          filterCheckBox.find('label').text('(Blank)');
          filterCheckBox.find('label').attr('for', 'Blank');  
        } else {
          filterCheckBox.find('input').attr('id', filterValueStr);
          filterCheckBox.find('label').text(filterValueStr);
          filterCheckBox.find('label').attr('for', filterValueStr);
        }                
        filterPopup.find('#filterByValue').append(filterCheckBox);      
      }
  }, this);
 }else{
     
      this.collection.each(function(item){
        var filterValue = item.get(filterColumn);
        var filterValueStr1 = filterValue.substr(0, 30);
        var filterValueStr = filterValueStr1.trim();
        var filterCheckBox = $(self.uncheckBoxTemplate);
        filterCheckBox.find('input').val(filterValueStr);
        var filteredArray = []; 
        filteredArray.push(item.toJSON());
        self.filterMap[filterValueStr] = filteredArray;
        filterCheckBox.find('input').attr('id', filterValueStr);
        filterCheckBox.find('label').text(filterValueStr);
        filterCheckBox.find('label').attr('for', filterValueStr);
        self.filterCollection.each(function(item1){
         var filtername=item1.get(filterColumn);
         if(filtername == filterValueStr){
          filterCheckBox = $(self.checkBoxTemplate);
          filterCheckBox.find('input').val(filterValueStr);
          filterCheckBox.find('input').attr('id', filterValueStr);
          filterCheckBox.find('label').text(filterValueStr);
          filterCheckBox.find('label').attr('for', filterValueStr);
          return ;
         }
        });
        filterPopup.find('#filterByValue').append(filterCheckBox); 

      });
     
     self.filterCollection = new Backbone.Collection();
    }
    var keys = _.keys(this.filterMap);
    console.log('this.filterMap.keys.length');console.log(keys.length);
  },

  registerFilterEvents: function() {
    var selectAll    = _.bind(this.selectAll, this);
    var clearAll     = _.bind(this.clearAll, this);
    // var doAscSort    = _.bind(this.doAscSort, this);
    // var doDscSort    = _.bind(this.doDscSort, this);
    var doFilter     = _.bind(this.doFilter, this);
    var cancelFilter = _.bind(this.cancelFilter, this);
    $('#select-all').on('click', selectAll);
    $('#clear-all').on('click', clearAll);
    // $('#sort-asc').on('click', doAscSort);
    // $('#sort-dsc').on('click', doDscSort);
    $('#filter').on('click', doFilter);
    $('#cancel').on('click', cancelFilter);
    _self = this;
    $('.easyswitch').easyswitch({'callback': this.sort, 'context1': _self});  //To show A-Z Z-A slider in filterPopup
    if (this.filterSliderOnOff) {
      console.log('filterSliderOnOff: ',this.filterSliderOnOff);
      $('#sort-order').removeClass('off').addClass('on');
      $('#sort-order').find('#easyswitch-slider').css('left', '50%;');
      $('#easyswitch-easyswitch').val('1');      
    } else {
      console.log('filterSliderOnOff: ',this.filterSliderOnOff);
      $('#sort-order').removeClass('on').addClass('off');
      $('#sort-order').find('#easyswitch-slider').css('left', '2px;');
      $('#easyswitch-easyswitch').val('0');
    }
  },

  sort: function(onOff) {
    if (onOff) { //A-Z [asending]
      this.filterSliderOnOff = true;
      var filterColumn = $('#sort-order').attr('filter');
      this.doSort('asc', filterColumn);
    } else {
      this.filterSliderOnOff = false;
      var filterColumn = $('#sort-order').attr('filter');
      this.doSort('dsc', filterColumn);      
    }
    
  },

  selectAll: function(e) {
    $('input', '#filterByValue').each(function () {
      $(this).prop('checked', true);
    });
    $('#select-all').attr('isSelected', true);
    $('#clear-all').attr('isCleared', false);
  },

  clearAll: function(e) {
    $('input', '#filterByValue').each(function () {
      $(this).prop('checked', false);
    });
    $('#clear-all').attr('isCleared', true);    
    $('#select-all').attr('isSelected', false);
  },

  doAscSort: function(e) {
    e.preventDefault();
    var filterColumn = $(e.target).attr('filter');
    filterColumn = 'Article Ref';
    this.doSort('asc', filterColumn);
    $('#filterPopupContainer').remove(); 
  },

  doDscSort: function(e) {
    e.preventDefault();
    var filterColumn = $(e.target).attr('filter');
    filterColumn = 'Article Ref';
    this.doSort('dsc', filterColumn);
    $('#filterPopupContainer').remove(); 
  },

  doFilter: function(e) {
    var filterColumn = $(e.target).attr('filter');
    console.log('doFilter: ' + filterColumn);
    var _xlsview = this;
    //check if all selected/all Cleared, then do nothing 
    // if ($('#select-all').attr('isSelected') == true) {
    //   $('#show-filter').empty();
    // } else {
      var filteredRows = [];
      console.log("this.filterMap",_xlsview.filterMap);
      $('input', '#filterByValue').each(function () {
          if ($(this).prop('checked')) {
            var selectedTxt = $(this).val();
            console.log(selectedTxt);
            var selectedRows = _xlsview.filterMap[selectedTxt];
            selectedRows.forEach(function(item) {
              filteredRows.push(item);  
            });            
          }          
      });
      //if any item is checked, then draw the table based on the filter criteria 

 //     var appendRows=filteredRows;
      if (filteredRows.length > 0) {
      // this.searchlection.each(function(item) {

      //     appendRows.push(item);
      // });

        _xlsview.drawTable(new Backbone.Collection(filteredRows));  
      }      
      $('#filterPopupContainer').remove();
      $(".filterarrrow").removeClass('open_filter');      
    // }
    // console.log('filteredRows');console.log(filteredRows);console.log(filteredRows.length);

  },    

  cancelFilter: function(e) {
    $('#filterPopupContainer').remove();
    $(".filterarrrow").removeClass('open_filter');
  },

  drawTable: function(data) {
    console.log(data);
    //reset to search collection for sorting & filtering purposes only
    this.filterCollection = data;
    var tblId = this.generateTblId();
    $("#" + tblId).colResizable({ disable : true });       
    this.$el.children().remove();
    var ids;
    var newrow = $(this.tbl);
    data.each(function ( item) {
      ids = item.keys();
      console.log("from item keys", item.keys());
    }, this); 
    if (ids) {
      for ( i =0; i < ids.length; i++ ) {
        // var elem = $(this.templ);
        // To identify column header template. 
        // Description & Analysis of Amendments column uses template w/o class=small_coll
        var elem = null;
        switch (ids[i]) {
          case 'Description':
            elem = $(this.templ1);
            break;
          case 'Analysis of Amendments':
            elem = $(this.templ1);
            break;
          default:
            elem = $(this.templ);  
        };          
        var newelem =  elem.filter('#elem');
        var found = newelem.clone();
        found.append($('<div class="headrowsort"></div>').text(ids[i]));
        // switch (ids[i]) {
        //   case 'Article Ref':
        //     found.append($('<div class="headrowsort article_ref"></div>').text(ids[i]));
        //     break;
        //   case 'Related Document':
        //     found.append($('<div class="headrowsort documents"></div>').text(ids[i]));
        //     break;
        //   case 'Description':
        //     found.append($('<div class="headrowsort regulation"></div>').text(ids[i]));
        //     break;
        //   case 'Analysis of Amendments':
        //     found.append($('<div class="headrowsort analysis"></div>').text(ids[i]));
        //     break;
        //   case 'Comments':
        //     found.append($('<div class="headrowsort comments"></div>').text(ids[i]));
        //     break;
        //   case 'Level 1 & 2 Cross Reference':
        //     found.append($('<div class="headrowsort level-1-2"></div>').text(ids[i]));
        //     break;
        //   case 'Business':
        //     found.append($('<div class="headrowsort business"></div>').text(ids[i]));
        //     break;
        //   case 'Theme':
        //     found.append($('<div class="headrowsort theme"></div>').text(ids[i]));
        //     break;
        //   case 'Update':
        //     found.append($('<div class="headrowsort update"></div>').text(ids[i]));
        //     break;                                                                                                    
        // };
        // found.append($('<span class="headrowsort"></span>').text(ids[i]));

        var filter = $('<div class="filterarrrow"></div>');
        // var arrowImg = $('<img class="showFilter" src="/images/sort.png">');
        var arrowImg = $('<div class="showFilter"></div>');
        arrowImg.attr('filter', ids[i]); 
        arrowImg.attr('position', i);                
        found.append(filter.append(arrowImg));        
        console.log("id.."+found.attr('id') );
        console.log("text.."+found.text() );
        var rel = newrow.find('#xlsheadrow');
        console.log( rel.html());
        console.log( "id>>"+ rel.attr('id'));
        rel.append(found);
      }                  
    }
    
    var vrow = newrow.find('#xlsbodyrow');
    var vbody = newrow.find('#xlsbody');
    var ids, values;
    console.log("from the xlsviewsearch:");
    data.each(function (item, index) {
      ids = item.keys();
      values = item.values();
      var crow = vrow.clone();
      var elem = null;
      for ( i = 0; i < ids.length; i++ ) {
        // var elem = $(this.templ2);
        switch (ids[i]) {
          case 'Description':
            elem = $(this.templ3);
            break;
          case 'Analysis of Amendments':
            elem = $(this.templ3);
            break;
          default:
            elem = $(this.templ2);  
        };        
        var newelem =  elem.filter('#elem');; 
        var found = newelem.clone();
        // found.attr('id',  ids[i]);
        if (index == 0) {
          found.attr('id', i);
        } else {
          found.attr('id', ids[i]);  
        }
        if ( ids[i] == 'Link') {
        var spFilePath = values[i].replace(/'/g, "\'");
        console.log(spFilePath);
        var anchor = '<a class="sdoclick btn btn-success btn-rounded btn-block floatLeft btn-bigger" path="' + spFilePath + '" doc="'+values[2]+'">Access Now</a>';
        console.log(anchor);
        var aelem = $(anchor);
        found.append(aelem);
        found.addClass('last-buttion-table');
        } else                
        found.text(values[i]);
        crow.append(found);
      }
      vbody.append(crow);              
    }, this); 
    this.$el.append(newrow);
    this.$el.append('<div id="forsea"></div>');
    
    var Regtitle = $('#regtitle').text();
    // if (Regtitle == 'Regulatory Tracker Level 1'|| Regtitle == 'Regulatory Tracker Level 2') {
      $(".header").css("background-color", "#A52A2A");
      $(".header").css("color", "white");
    // }
    this.resizing();
  },

  trailuser_check: function(e){
      console.log("print the trailuser_check in xlsview");
      e.preventDefault();
      if (app.ClientAppRouter.trail_user == true) {
        console.log("print the trailuser_check in xlsview");
        alert("Download option is currently not available under free trial. Please contact info@zurikglobal.com");                 
      } else {
        console.log("print the trailuser_check in xlsview");
        $('#rendersec').submit();
        return true;
      }
  }

});

