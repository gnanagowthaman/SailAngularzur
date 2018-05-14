var app = app || {};

app.DocTypeView = Backbone.View.extend({
       el : $("#canvas"),
	
	initialize: function(options) {
    this.subscribedDocList = options.subscribedDocList;

    console.log(this.subscribedDocList);
    this.td = "<td class='text-center  ' style='width:30%;border:0px'  id='elem'></td>";
    this.div = " <div  id='elem'></div>";
  	this.bhtml = "<div id='noDocMsg' class='text-center'><table id='box-table' style='width: 100%' class='table  dt-responsive nowrap'> <thead id ='lxlshead'><tr id='lxlsheadrow'></tr> </thead> <tbody id='lxlsbody'><tr id='lxlsbodyrow'></tr></tbody> </table>";
    _.bindAll(this, "render");
    _.bindAll(this, "row");    
    this.render({reset : 1});
  },

  events: {
    'click .docSelected': 'domSelected'
  },

  domSelected : function(e) {
		console.log (e.target.id);

	  app.ClientAppRouter.currentsubdocid = e.target.id;
    console.log("dom selected ++++++++++++++++++++" + app.ClientAppRouter.currentsubdocid);
    if (!this.filterDoctype()) {
      $('#breadcrumb').text('');
      $('#regtitle').remove();
      $('.widget').empty();
      $("#canvas").children().remove();
      $("#canvas").unbind();
      $("#canvas").append("<div class='text-center'><H4> You are not subscribed </H4></div>");
    } else {
      var Name = $(e.target).text();
      var geoId = parseInt(app.ClientAppRouter.currentgid, 10);
      var currentcntid = parseInt(app.ClientAppRouter.currentcntid, 10); 
      var currentsid = parseInt(app.ClientAppRouter.currentstid, 10);  
      var domainId = parseInt(app.ClientAppRouter.domainid, 10);
      var regId = parseInt(app.ClientAppRouter.currentrid, 10);
      var currentrlid = parseInt(app.ClientAppRouter.currentrlid, 10);
      var docId = parseInt(app.ClientAppRouter.currentdocid, 10);  
      var sdocId = parseInt(app.ClientAppRouter.currentsubdocid, 10);

      console.log(geoId,currentcntid,currentsid,domainId,regId,currentrlid,docId,sdocId);

      var selectedGeo = app.ClientAppRouter.colGeoGraphy.findWhere({id: geoId}).get('name');
      var selectedCountry = app.ClientAppRouter.colCountry.findWhere({id: currentcntid}).get('name');

      console.log(" document >>>"+JSON.stringify(app.ClientAppRouter.colDocument));

      var selectedState = app.ClientAppRouter.colState.findWhere({sid: currentsid}).get('name');
      var selectedDomain = app.ClientAppRouter.colDomain.findWhere({did: domainId}).get('name');
      var selectedRegulator = app.ClientAppRouter.colRegulator.findWhere({rid: regId}).get('name');
      var selectedRegulation = app.ClientAppRouter.colRegulation.findWhere({rlid: currentrlid}).get('name');
      var selectedDoc = app.ClientAppRouter.colDocument.findWhere({docid: docId}).get('name');
      var selectedSubDoc = app.ClientAppRouter.colSubdoc.findWhere({sdocid: sdocId}).get('name');

      console.log(selectedGeo,selectedCountry,selectedState,selectedDomain,selectedRegulator,selectedRegulation,selectedDoc,selectedSubDoc);
      console.log(domainId);

     // var breadMsg = selectedGeo + '->' + selectedCountry + '->' + selectedState + '->' +  selectedDomain + '->' + selectedRegulator '->' +  selectedRegulation + '->' + selectedDoc + '->' +  selectedSubDoc ;

     var breadMsg = selectedGeo + '->' + selectedCountry + '->' + selectedState + '->' +  selectedDomain + '->' + selectedRegulator + '->' + selectedRegulation + '->' + selectedDoc + '->' +  selectedSubDoc;
     
      console.log("breadcrumb "+breadMsg);

      //get the path of the selected document & render it
      $.ajax({
        type: "GET",
       // url: '/document/' + domainId + '/' + geoId + '/' + regId + '/' + docId,
       url: '/document/' + geoId + '/' + currentcntid + '/' + currentsid + '/' + domainId + '/' + regId + '/' + currentrlid + '/' + docId + '/' + sdocId,
        success: function(data) {
          console.log(data);
          console.log(data.hasOwnProperty('path'));
          if (data.hasOwnProperty('path')) {
           //$('#breadcrumb').text(selectedDomain + '->' + selectedGeo + '->' + selectedReg + '->' + Name);

        //   $('#breadcrumb').text(selectedGeo + '->' + selectedCountry + '->' + selectedState + '->' +  selectedDomain + '->' + selectedRegulator '->' +  selectedRegulation + '->' + selectedDoc + '->' +  selectedSubDoc );
          
            $('#breadcrumb').text(breadMsg);

            $('#regtitle').remove();
            $('.widget').prepend("<div id='regtitle' style='text-align:center;'><font size='5'>" + Name + "</font></div>");          
            var path = data.path;
            path.replace(/&amp;/g, "&");
            console.log("path: "+ path);
            var patt1=/\.[0-9a-z]+$/i;
            var mat = path.match(patt1);
            console.log("file extension - "+ mat);
            $('#rendersec, #Textdiv, #center').remove();

            if ( mat == ".pdf") {
              // if ( app.ClientAppRouter.pdf ){
              //   app.ClientAppRouter.pdf.render( { path : path});
              // } else {
                $("#canvas").empty();
                $("#canvas").unbind();
                var pdf = new app.PdfView({el: $("#canvas")});
                app.ClientAppRouter.pdf = pdf
                pdf.render({ path : path});
              // }
            } else {
              // if (app.ClientAppRouter.xlsx )
              //   app.ClientAppRouter.xlsx.render( { path : path });
              // else {
                $("#canvas").empty();
                $("#canvas").unbind();
                var xls = new app.XlsView({el: $("#canvas")});
                app.ClientAppRouter.xlsx = xls;
                xls.render({ path : path });
               // }
            }                    
          } else{
               //show no doc available
                console.log('No data');
                $('#breadcrumb').text('');
                $('#regtitle').remove();
                $('.widget').empty();
                $("#canvas").children().remove();
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
    data.sdocid = parseInt(app.ClientAppRouter.currentsubdocid, 10);

    console.log("filter document++++++++++++" + JSON.stringify(data));

    console.log("filter doc +++" + JSON.stringify(this.subscribedDocList));

    console.log("filter document list"    + JSON.stringify(this.subscribedDocList.where(data)));

    return (this.subscribedDocList.where(data).length > 0) ? true : false;
  },
            
	render: function(options) {
      this.$el.children().remove();
      $('#rendersec, #Textdiv, #searchTxt, #center').remove();
      var newrow = $(this.bhtml);
      this.reset = options.reset;             
      console.log(this.collection);
      this.row(newrow);
	},

  header: function() {
      var ids;
      var newrow = $(this.bhtml);
      var clonerow = newrow.find("#lxlsheadrow").clone();
  	  this.collection.each(function ( item) {
              ids = item.keys();
       }, this);
      if (ids) {
       for ( i =0; i < ids.length; i++ ) {
            var elem = $(this.templ);
             console.log("Element....");
             console.log(elem);
            var newelem =  elem.find('#elem');; 
             console.log("New Element....");
             console.log(newelem);
            var found = newelem.clone();
             console.log("Cloned Element....");
             console.log(found);
             found.attr('id',  ids[i]);
             found.text(ids[i]);
             console.log("id.."+found.attr('id') );
             console.log("text.."+found.text() );
            var rel = newrow.find('#lxlsheadrow');
             console.log( rel.html());
             console.log( "id>>"+ rel.attr('id'));
             var nclone;
             if ( i < 2) 
       rel.append(found);
             else {
              if (( i % 2 ) == 0) {
              
             nclone = clonerow.clone().append(found);
       rel.append(nclone);
             } else {
                 nclone.append( found);
       rel.append(nclone);
            }
            }

        }       
    }
//     this.row(newrow);

     this.$el.append(newrow);

   },
  
  row  : function(rows) {
    console.log("from the row");
    if( $('#box-table').length == 1 ) return; 
    this.$el.children().remove();
    var vrow = rows.find('#lxlsbodyrow');
    console.log( rows.find('#lxlsbodyrow'));
    var vbody = rows.find('#lxlsbody');

    var ids, values;
    var j = this.collection.length;
    var jj =0;
    var crow = vrow.clone();
    crow.attr("id", "lxlsbodyrow1");
    var telem = $(this.td);
    var delem = $(this.div);
    var tfound = null;
    _.each (this.collection.getUniqueByProperty('name'),function ( item) {
     jj++;
//   ids = item.keys();
//   ids = _.uniq(ids);
//   values = item.values();
//	 values = _.uniq(values);
    var dfound = delem.clone();
    tfound = telem.clone();
    console.log("Debugging ids and values");
 //console.log(ids[0]);
// console.log(values[0]);
    dfound.attr('id',  item.sdocid);
 // dfound.append($('<button class="Regsplit"></button>').text(item.name));
    var belm = $('<button class="Regsplit docSelected"></button>').text(item.name);
    belm.attr('id', item.sdocid);
    dfound.append(belm);           
    console.log(" found element" + dfound.html());
    console.log("row element " + crow.html());
    tfound.append(dfound);
    if ( jj % 2 == 0) {
    crow.append(tfound);
         vbody.append(crow);
         crow = vrow.clone();
    } else{
             crow.append( tfound);
             vbody.append(crow);
      }
        tfound = null;

    }); 
    if ( tfound != null) crow.append(tfound);
       this.$el.append(rows);
  },

  is_Empty : function (str) {
            return (!str || 0 === str.length);
  }

});
