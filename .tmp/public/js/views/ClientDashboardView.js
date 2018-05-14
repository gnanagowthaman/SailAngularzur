    var app = app || {};
     
    app.ClientDashboardView = Backbone.View.extend({
        el : $("#mainCanvas"),
     
      initialize: function() {
        $('.hamburger-menu').hide();
        this.libraryCollection = new app.LibraryList();
        this.geoCollection     = new app.MGeographyList();
        this.AlertCollection = new app.MAlertList();
        this.newsCollection = new app.NewsList();
        this.alertsCollection = new app.AlertsList();
        /*this.templ  = "<th class='text-center header' id='elem'></th>";
        this.templ2 = "<td class='text-center' id='elem'></td>";*/
        this.templ  = "<th data-field='domain' data-sortable='true' id='elem'></th>";
        this.templ2 = "<td id='elem'></td>";
        this.tbl  = "<table data-toggle='table' data-sort-name='domain' data-sort-order='desc'> <thead  id ='xlshead' ><tr class='tr-class-1' id='xlsheadrow'></tr> </thead> <tbody id='xlsbody'><tr id='xlsbodyrow'></tr></tbody> </table>";
        this.tblNews  = "<div class='news-db-container'> <div class='news-db-date'><div class='news-db-content'></div></div></div>";
        _.bindAll(this, "render");
        _.bindAll(this, "drawTable");
        app.ClientAppRouter.origin = 0;    
        console.log("initialize1");   
        this.render();
        console.log("initialize2");
        
      },
     
      events: {
        'click .selectedGeo': 'showLibraryOrUpdatesByGeo',
        'click #accessLib'  : 'renderlibrary',
        'click .accessdoc'  : 'showDocumentInTreeView',
        'click [data-field="Domain"]'    : 'sortByDomain',
        'click [data-field="Regulations"]' : 'sortByRegulation',
        'click  [data-field="Docs"]'      : 'sortByDocs',
     },
      render: function () {
        this.$el.html($('#regulationTrackerTpl').html());
        // $('[data-toggle="table"]').bootstrapTable();
        renderGeoMap1();
        var _self = this;   
     
        if (app.ClientAppRouter.page == 'updates') {
          $('#pagecontent').empty();
          $('#pagecontent').unbind();      
          var updateshtml = '<h3 id= "updateheader">Updates</h3><div id="updates" class="listcontent4"></div>'; 
          $('#pagecontent').html(updateshtml);           
          $.when(this.AlertCollection.fetch({reset: true, data: {geoId: 0}, processData: true}),
                 // this.newsCollection.fetch({reset: true, data: {geoId: 0}, processData: true}),
                this.geoCollection.fetch()).done(function() {
                  console.log("geoCollection",_self.geoCollection);
                    console.log("AlertCollection",JSON.stringify(_self.AlertCollection));
            //Render Geo
            if (_self.geoCollection.length > 0) { 
              _self.drawGeo();

            }
            //render news collection
            // $.when(_self.newsCollection.fetch()).done(function() {
            //     if (_self.newsCollection.length > 0) {
            //   _self.drawnews_table(_self.newsCollection, '#newstable'); 
            // }}).fail(function(data) {
            //     //show no data found
            //   _self.showNoData('#newstable');
            // });
     
            //  _self.render_news(0);
            
            //render Alerts
           if (_self.AlertCollection.length > 0) {
              _self.drawTableUpdates(_self.AlertCollection, '#updates'); 
            } else {
              //show no data found
              _self.showNoData('#updates');        
            }
          }).fail(function(data) {
              try{
                $('#pagecontent').empty();
                $('#pagecontent').unbind();      
                var updateshtml = '<h3 id= "updateheader">Updates</h3><div id="updates" class="listcontent4"></div>'; 
                $('#pagecontent').html(updateshtml);      
                var errData = JSON.parse(data.responseText);
                if ( errData.errCode == 550) {
                  window.location.href = '/sessionExpired';
              } else {
                if (errData.errMsg.length > 0) {
                    var failureMsg = errData.errMsg;  
                } else {
                    var failureMsg = "Error occurred while fetching the Dashboard. Please Contact Administrator.";  
                }
                $( "div.failure").html(failureMsg);
                $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );        
              } 
            }catch(e){
     
                window.location.href = '/sessionExpired';
            }     
          }); 
        }
        // else if(app.ClientAppRouter.page == 'alerts'){
        //  // alert("alert test 1");
        //    $('.map-container').empty();
        //    $('#map-container').unbind();
        //    $('.news-db').empty();
        //   $('.news-db').unbind();
        //    $('.rt-db').empty();
        //    $('.rt-db').unbind();
     
        //    this.alertsCollection = new app.AlertListView({el: $( '#alertsList' )});
           // var updateshtml = '<h3 id= "alertheader">Alerts</h3><div id="alerts" class="listcontent4"></div>'; 
           // $('#pagecontent').html(updateshtml); 
           // $.when(this.alertsCollection.fetch({reset: true, data: {geoId: 0}, processData: true}),
           //    this.geoCollection.fetch()).done(function() {
           //  //Render Geo
           //  if (_self.geoCollection.length > 0) { 
           //    _self.drawGeo();
           //    console.log("alert draw geo");
           //  }
     
           //   _self.render_news(0) 
     
           //    //render Alerts
           //  if (_self.alertsCollection.length > 0) {
           //    _self.drawTableAlerts(_self.alertsCollection, '#alerts'); 
           //    console.log("aler draw table");
           //  } else {
           //    //show no data found
           //    _self.showNoData('#alerts');        
           //  }
     
           //    console.log("update alert status ...........................>>>>>>>>>>>>>>>>>>>>>>> ");
           //    _self.updateAlertStatus();
           //    $('#alertCount').text('');
     
           //  }).fail(function(data) {
           //    try{
           //      $('#pagecontent').empty();
           //      $('#pagecontent').unbind();      
           //      var updateshtml = '<h3 id= "alertheader">Alerts</h3><div id="alerts" class="listcontent4"></div>'; 
           //      $('#pagecontent').html(updateshtml);      
           //      var errData = JSON.parse(data.responseText);
           //      if ( errData.errCode == 550) {
           //        window.location.href = '/sessionExpired';
           //    } else {
           //      if (errData.errMsg.length > 0) {
           //          var failureMsg = errData.errMsg;  
           //      } else {
           //          var failureMsg = "Error occurred while fetching the Dashboard. Please Contact Administrator.";  
           //      }
           //      $( "div.failure").html(failureMsg);
           //      $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );        
           //    } 
           //  }catch(e){
     
           //      window.location.href = '/sessionExpired';
           //  }     
           // });
          
      //  }
         else {
          $('#pagecontent').empty();
          $('#pagecontent').unbind();            
          var libshtml = '<div id= "library" class="listcontent3"></div>'; 
          $('#pagecontent').html(libshtml);      
          $.when(this.libraryCollection.fetch({reset: true, data: {geoId: 0}, processData: true}),
               // this.newsCollection.fetch({reset: true, data: {geoId: 0}, processData: true}),
                this.geoCollection.fetch()).done(function() {
                  
                  // var geoId=this.geoCollection.id;
                  // console.log("inside the geolocation",geoId);
            //Render Geo
            console.log("geoCollection length",_self.geoCollection.length);
            if (_self.geoCollection.length > 0) { 
              _self.drawGeo();

            }
             //Render News
            // if (_self.newsCollection.length > 0) { 
            //   _self.drawnews_table(_self.newsCollection, '#newstable' );
            // }else{
            //   console.log(_self.newsCollection.location);
            //   _self.showNoData('#newstable', 'News');
            // }
     
            //  $.when(_self.newsCollection.fetch()).done(function() {
            //     if (_self.newsCollection.length > 0) {
            //       console.log("For check the newcollection", _self.newsCollection);
            //   _self.drawnews_table(_self.newsCollection, '#newstable'); 
            // }}).fail(function(data) {
            //     //show no data found
            //   _self.showNoData('#newstable');
            // });
     
                // _self.render_news(0);
                $('#newsList').empty();
                $('#newsList').unbind();
              this.newsList = new app.NewsListView({el: $( '#newsList' ), geoId:0});
              this.alertsList = new app.DashboardAlertListView({el: $( '#dAlertsList' )});
            //render Library      
            if (_self.libraryCollection.length >= 0) {
              console.log("render page content",JSON.stringify(_self.libraryCollection));
              _self.drawTable(_self.libraryCollection, '#library','0','EUROPEAN UNION'); 
            } else {
              //show no data found
              console.log(_self.libraryCollection.length);
              _self.showNoData('#library');        
            }        
            $('#pagecontent').append($('#terminalheaderTpl').html());
          }).fail(function(data) {
              try{
                $('#pagecontent').empty();
                $('#pagecontent').unbind();            
                var libshtml = '<div id= "library" class="listcontent3"></div>'; 
                $('#pagecontent').html(libshtml);
                $('#pagecontent').append($('#terminalheaderTpl').html());
                var errData = JSON.parse(data.responseText);
                if ( errData.errCode == 550) {
                  window.location.href = '/sessionExpired';
              } else {
                if (errData.errMsg.length > 0) {
                    var failureMsg = errData.errMsg;  
                } else {
                    var failureMsg = "Error occurred while fetching the Dashboard. Please Contact Administrator.";  
                }
                $( "div.failure").html(failureMsg);
                $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );        
              } 
            }catch(e){
                window.location.href = '/sessionExpired';
            }     
          });
        }  
        // $('#regBeacon').append("<h3>Regulation Beacon</h3>");
      },
     
      renderLibraryByGeo: function(geoId,geoName) {
        console.log(geoId);
        console.log("geoName" , geoName);
        var _self = this;
        $.when(this.libraryCollection.fetch({reset: true, data: {geoId: geoId}, processData: true}))
         .done(function() {
          if (_self.libraryCollection.length > 0) {
            console.log('render library by geo idsss');
            _self.drawTable(_self.libraryCollection, '#library',geoId,geoName); 
          } else {
            //show no data found
            _self.showNoData('#library');
          }    
         
          //Calling the news section
          if (geoId || geoId=='0') {
            // _self.render_news(geoId);
            $('#newsList').empty();
            $('#newsList').unbind();
            this.newsList = new app.NewsListView({el: $( '#newsList' ), geoId:geoId});
          }else{
            //_self.render_news(geoId);
             $('#newsList').empty();
            $('#newsList').unbind();
            this.newsList = new app.NewsListView({el: $( '#newsList' ), geoId:0});
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
                  var failureMsg = "Error occurred while fetching the Reg Tracker Information. Please Contact Administrator.";  
              }
              $( "div.failure").html(failureMsg);
              $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );        
            } 
          }catch(e){
              window.location.href = '/sessionExpired';
          }     
        }); 
     
      },
     
      showLibraryOrUpdatesByGeo: function(e) {
        console.log("From the Showlibrary by Geo");
        $(e.target).parent().addClass('geoHighlight').siblings().removeClass('geoHighlight');
        var geoId = parseInt($(e.target).attr('geo'), 10);
        console.log("geoid",geoId);
        var geoname = $(e.target).text().toUpperCase();
        console.log("text",geoname);
        $('svg').hide();
        if (geoname=='ALL')
           geoId = geoId;
        if (app.ClientAppRouter.page == 'updates') {
            console.log("UPDATES");
            appRouter.currentView.renderUpdatesByGeo(geoId);
        } else {
            console.log("render library");
            appRouter.currentView.renderLibraryByGeo(geoId);
        } 
        // if (app.ClientAppRouter.page == 'alerts') {
        //     console.log("UPDATES");
        //     appRouter.currentView.renderAlertsByGeo(geoId);
        // } else {
        //     appRouter.currentView.renderLibraryByGeo(geoId);
        // } 
     
         // Select news by Geo
         appRouter.currentView.render_news(geoId);
      
            console.log(geoId)   
        if(geoname=='ALL'){
          renderGeoMap();
    /*
          $("path#1").attr('style','fill:#FFBB78;');
          $("path#2").attr('style','fill:#2CA02C;');
          $("path#3").attr('style','fill:#FF7F0E;');
          $("path#4").attr('style','fill:#1F77B4;');
          $("path#5").attr('style','fill:#EDD400;');
          $("path#6").attr('style','fill:#98DF8A;');
          $("path#7").attr('style','fill:#AEC7E8;');*/
        }
        else if(geoname=='EU'){       
        EuropeMapShow();                      //EU
          $("path#1").attr('style','fill:#FFD8B1;');
          $("path#2").attr('style','fill:#A2FFA2;');
          $("path#3").attr('style','fill:#A52A2A;');
          $("path#4").attr('style','fill:#BEC9E8;');
          $("path#5").attr('style','fill:#FFF28A;');
          $("path#6").attr('style','fill:#D0FCC8;');
          $("path#7").attr('style','fill:#C8DDF9;');
          $("path#8").attr('style','fill:#ccefff;');
          $("path#9").attr('style','fill:#d9b3ff;');
        }
        else if(geoname=='US'){
         NorthAmericaMapShow();                             //US  
          $("path#1").attr('style','fill:#FFD8B1;');
          $("path#2").attr('style','fill:#A2FFA2;');
          $("path#3").attr('style','fill:#FFA95C;');
          $("path#4").attr('style','fill:#A52A2A;');
          $("path#5").attr('style','fill:#FFF28A;');
          $("path#6").attr('style','fill:#D0FCC8;');
          $("path#7").attr('style','fill:#C8DDF9;');
          $("path#8").attr('style','fill:#ccefff;');
          $("path#9").attr('style','fill:#d9b3ff;');
        }
        else if(geoname=='APAC'){ 
        AsiaMapShow();                         //APAC
          $("path#1").attr('style','fill:#A52A2A;');
          $("path#2").attr('style','fill:#A2FFA2;');
          $("path#3").attr('style','fill:#FFA95C;');
          $("path#4").attr('style','fill:#BEC9E8;');
          $("path#5").attr('style','fill:#FFF28A;');
          $("path#6").attr('style','fill:#D0FCC8;');
          $("path#7").attr('style','fill:#C8DDF9;');
          $("path#8").attr('style','fill:#ccefff;');
          $("path#9").attr('style','fill:#d9b3ff;');
        }    
        else if(geoname=='MIDDLE EAST') {   
          MiddleeastMapShow();
     
          $("path#1").attr('style','fill:#FFD8B1;');
          $("path#2").attr('style','fill:#A2FFA2;');
          $("path#3").attr('style','fill:#FFA95C;');
          $("path#4").attr('style','fill:#BEC9E8;');
          $("path#5").attr('style','fill:#FFF28A;');
          $("path#6").attr('style','fill:#D0FCC8;');
          $("path#7").attr('style','fill:#C8DDF9;');
          $("path#8").attr('style','fill:#0099e6;');
          $("path#9").attr('style','fill:#d9b3ff;');
        }
         else if(geoname=='UK') {
          ukMapShow();
          $("path#1").attr('style','fill:#FFD8B1;');
          $("path#2").attr('style','fill:#A2FFA2;');
          $("path#3").attr('style','fill:#FFA95C;');
          $("path#4").attr('style','fill:#BEC9E8;');
          $("path#5").attr('style','fill:#FFF28A;');
          $("path#6").attr('style','fill:#D0FCC8;');
          $("path#7").attr('style','fill:#C8DDF9;');
          $("path#8").attr('style','fill:#ccefff;');
          $("path#9").attr('style','fill:#400080;');
        }
        else if(geoname=='AFRICA') {
          AfricaMapShow();
          $("path#1").attr('style','fill:#FFD8B1;');
          $("path#2").attr('style','fill:#A52A2A;');
          $("path#3").attr('style','fill:#FFA95C;');
          $("path#4").attr('style','fill:#BEC9E8;');
          $("path#5").attr('style','fill:#FFF28A;');
          $("path#6").attr('style','fill:#D0FCC8;');
          $("path#7").attr('style','fill:#C8DDF9;');
          $("path#8").attr('style','fill:#ccefff;');
          $("path#9").attr('style','fill:#d9b3ff;');
        }
        else if(geoname=='AUSTRALIA') {
          AustraliaMapShow();
          $("path#1").attr('style','fill:#FFD8B1;');
          $("path#2").attr('style','fill:#A2FFA2;');
          $("path#3").attr('style','fill:#FFA95C;');
          $("path#4").attr('style','fill:#BEC9E8;');
          $("path#5").attr('style','fill:#FFF28A;');
          $("path#6").attr('style','fill:#D0FCC8;');
          $("path#7").attr('style','fill:#A52A2A;');
          $("path#8").attr('style','fill:#ccefff;');
          $("path#9").attr('style','fill:#d9b3ff;');
        }
        else {
          $("path#1").attr('style','fill:#FFD8B1;');
          $("path#2").attr('style','fill:#A2FFA2;');
          $("path#3").attr('style','fill:#FFCCF9;');
          $("path#4").attr('style','fill:#BEC9E8;');
          $("path#5").attr('style','fill:#EDD400;');
          $("path#6").attr('style','fill:#D0FCC8;');
          $("path#7").attr('style','fill:#C8DDF9;');
          $("path#8").attr('style','fill:#ccefff;');
          $("path#9").attr('style','fill:#d9b3ff;'); 
        }
      },
     
     
      showAlertCount: function()
      {
         $('alertCount').text(this.alertCollection.length);
      },
     
      renderUpdatesByGeo: function(geoId) {
        console.log(geoId);
        console.log('updates is performed');
        var _self = this;
        $.when(this.AlertCollection.fetch({reset: true, data: {geoId: geoId}, processData: true}))
         .done(function() {
          if (_self.AlertCollection.length > 0) {
            _self.drawTableUpdates(_self.AlertCollection, '#updates'); 
          } else {
            //show no data found
            _self.showNoData('#updates');
          }
     
          //Calling the news section
          if(geoId){
              _self.render_news(geoId);
          }else{
             _self.render_news(-1);
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
                  var failureMsg = "Error occurred while fetching the Reg Tracker Information. Please Contact Administrator.";  
              }
              $( "div.failure").html(failureMsg);
              $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );        
            } 
          }catch(e){
              window.location.href = '/sessionExpired';
          }     
        }); 
     
      },
     
      showNoData: function(sourceelement) {
        console.log("there is no element in the row");
       // $('[data-toggle="table"]').bootstrapTable('removeAll');
        //$('#drawGeoImage').hide();
        $('[data-toggle="table"] tbody').hide();           
      },
     
      drawGeo: function() {
        var e0='&nbsp|&nbsp';
        var e1 = '&nbsp&nbsp <ul><a geo="';
        var e2 = '" class="selectedGeo">';
        var e3 = '</a></ul> ';
        var geoHtml = '<ul class="geoHighlight"><li geo="0" class="selectedGeo"></li></ul>';
        app.ClientAppRouter.geoMap = {};
        var i=0;
        this.geoCollection.each(function (item) {
          var geoName = item.get('name').toUpperCase().trim();
          geoHtml = geoHtml + e1 + item.get('id') + e2 + geoName + e3 +e0;
          app.ClientAppRouter.geoMap[geoName] = item.get('id');
          //geoHtml = geoHtml + e1 + i + e2 + geoName + e3 +e0;
          //app.ClientAppRouter.geoMap[geoName] = i;
          //i++;
        }, this);
        this.$el.find('#map_loc').html(geoHtml);
      },
     
  drawTable: function(datas, sourceelement,geoId,geoName) { 
        data=datas.toJSON();
        console.log("geoId finding",geoId);
        console.log("geoName finding",geoName);
         temp_json={};
          if(geoName == "EUROPEAN UNION"){
             temp_json["geoId"]=geoId;
            temp_json["geoName"] = "All";
          } else {
             temp_json["geoId"]=geoId;
             temp_json["geoName"]=geoName;
          }
            
        console.log("temp_json",JSON.stringify(temp_json));
        document.getElementById("locationid").value=JSON.stringify(temp_json);        
        console.log(datas.toJSON());
        $('[data-toggle="table"] tbody').show();
        $('[data-toggle="table"]').bootstrapTable({data:data});
        $('[data-toggle="table"]').removeClass('table-hover');
        setTimeout(function(){
            $('[data-field="Domain"]').find('div').addClass('desc').css('background-image','url(../img/sort_desc.png)');
        },200);
     
        var drawImage ='<div class="icon_cont_tr">'+
                          '<div class="supervisory_icon"></div>'+
                        '</div><span>Supervisory</span>';
        var drawBanking = '<div class="icon_cont_tr">' +
                          '<div class="banking_icon"></div>' +
                        '</div><span>Banking & Credit Union</span>';
        var drawCons = '<div class="icon_cont_tr">' +
                          '<div class="consumer_icon"></div>' +
                        '</div><span>Consumer Finance</span>';
        var drawPayment = '<div class="icon_cont_tr">' +
                          '<div class="services_icon"></div>' +
                        '</div><span>Payment Services</span>';
        var drawPensions = '<div class="icon_cont_tr">' +
                           '<div class="pensions_icon"></div>' +
                        '</div><span>Pensions</span>';
        var drawIns = '<div class="icon_cont_tr">' +
                           '<div class="insurance_icon"></div>' +
                        '</div><span>Insurance</span>';
        var drawFinCrime = '<div class="icon_cont_tr">' +
                           '<div class="financial_crime_icon"></div>' +
                        '</div><span>Financial Crime</span>';
        var drawFinmarket = '<div class="icon_cont_tr">' +
                           '<div class="financial_icon"></div>' +
                        '</div><span>Financial Markets</span>';
       

       $('#drawGeoImage').find('tbody tr').each(function(tr){
          console.log("testing function :::::::");
          console.log("tr ::", $(this).find("td:first-child").text());

          var image = $(this).find("td:first-child").text();
          $(this).find("td:first-child").addClass("td-class-1");
          console.log(image);
          console.log("llll",data[tr],tr);
          
        
          if(image == "Supervisory"){
            $(this).find("td:first-child").html(drawImage);
         // $(this).find("td:last-child").hide();
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'"  gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
             
          }
          else if(image == "Banking & Credit Union"){
            $(this).find("td:first-child").html(drawBanking);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Consumer Finance"){
            $(this).find("td:first-child").html(drawCons);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Payment Services"){
            $(this).find("td:first-child").html(drawPayment);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
            // $('#drawGeoImage').tablesorter();
          }
          else if(image == "Pensions"){
            $(this).find("td:first-child").html(drawPensions);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image =="Insurance"){
            $(this).find("td:first-child").html(drawIns);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Financial Markets"){
            $(this).find("td:first-child").html(drawFinmarket);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Financial Crime"){
            $(this).find("td:first-child").html(drawFinCrime);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
       //    var access = $("th:last-child").text();
       // if(access == 'Access'){
          // $("td:last-child").append('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger">Access Now</a>');
       // }
      

       });


      //  $('#drawGeoImage').tablesorter();
      //   $('#drawGeoImage').bind("sortStart",function() { 
      //   console.log("sort is perfom"); 
      //   }).bind("sortEnd",function() { 
      //    console.log("sort is over");
      // });
       //  $('#drawGeoImage').find('[data-field="Domain"]').each(function(){
       //  console.log("inside the sort table");


       // });

        // $('[data-toggle="table"]').tablesorter(); 



        // this.$el.find(sourceelement).empty();
        // var newrow = $(this.tbl);
        // var ids;
        // data.each(function ( item) {
        //   ids = item.keys();
        // }, this); 
        // if (ids) {
        //   for ( i =0; i < ids.length; i++ ) {
        //   //  if(ids[i] != 'id') {
        //     if(i < 7) {
        //       var elem = $(this.templ);
        //       var newelem =  elem.filter('#elem');
        //       var found = newelem.clone();
        //       found.append($('<span class="headrowsort"></span>').text(ids[i]));        
        //       var rel = newrow.find('#xlsheadrow');
        //       rel.append(found);
        //     }
        //   }
        //   // $(sourceelement).prepend('<h3>Reg Tracker</h3>');                  
        // }    
        // var vrow = newrow.find('#xlsbodyrow');
        // var vbody = newrow.find('#xlsbody');
        // var ids, values;
        // data.each(function (item, index) {
        //   ids = item.keys();
        //   values = item.values();
        //   console.log("TEST1",ids);
        //   console.log("TEST2",values);
        //   var crow = vrow.clone();
        //   for ( i = 0; i < ids.length; i++ ) {
        //    // if(ids[i] != 'id') {
        //     if(i < 7) {
        //       var elem = $(this.templ2);
        //       var newelem =  elem.filter('#elem');; 
        //       var found = newelem.clone();
        //       // found.text(values[i]);
        //       if (i == 0) {
        //         found.attr('class', 'text-left');
        //       }
        //       if (ids[i] == 'Access') {
        //         found.append('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" gid="' + values[i] + '" cntid="' + values[i+1] + '" sid="' + values[i+2] + '" did="' + values[i+3] + '"  >Access Now</a>');
        //       } else {
        //         found.text(values[i]);
        //       }
        //       crow.append(found);
        //   }
        //   }
        //   vbody.append(crow);              
        // }, this); 
        // this.$el.find(sourceelement).append(newrow);
      },
      drawTableUpdates: function(data, sourceelement) { 
        this.$el.find(sourceelement).empty();
        var newrow = $(this.tbl);
        var ids;
        data.each(function ( item) {
          ids = item.keys();
        }, this); 
        if (ids) {
          for ( i =0; i < ids.length; i++ ) {
            if(i < 10) {
              var elem = $(this.templ);
              var newelem =  elem.filter('#elem');
              var found = newelem.clone();
              found.append($('<span class="headrowsort"></span>').text(ids[i]));        
              var rel = newrow.find('#xlsheadrow');
              rel.append(found);
            }
          }                  
        }    
        var vrow = newrow.find('#xlsbodyrow');
        var vbody = newrow.find('#xlsbody');
        var ids, values;
        data.each(function (item, index) {
          ids = item.keys();
          values = item.values();
     
          var crow = vrow.clone();
          for ( i = 0; i < ids.length; i++ ) {
            if(i < 10) {
              var elem = $(this.templ2);
              var newelem =  elem.filter('#elem');
              var found = newelem.clone();
              // found.text(values[i]);
              if (i == 0) {
                found.attr('class', 'text-left');
              }
              if (ids[i] == 'access') {
                found.append('<a class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" gid="' + values[i] + '" cntid="' + values[i+1] + '" sid="' + values[i+2] + '" did="' + values[i+3] + '"rid="'+ values[i+4] + '"rlid="' + values[i+5] + '"docid="' + values[i+6] + '"sdocid="' + values[i+7] + '" docname="' + values[i-1] + '">Access Now</a>');
              } else {
                found.text(values[i]);
              }
              crow.append(found);
            }      
          }
          vbody.append(crow);              
        }, this); 
        this.$el.find(sourceelement).append(newrow);
        // this.$el.find(sourceelement).prepend('<h3>Updates</h3>');
      },
     
      renderlibrary:function(e) {
          $('li#zklibrary').addClass('zmactive').siblings().removeClass('zmactive');
          e.preventDefault();
          var gid = $(e.target).attr('gid');
          var gname = $(e.target).attr('gname');
          var dname = $(e.target).attr('dname');
          var did = $(e.target).attr('did');
          var tr=$

          console.log("show reg pages",gid,did,dname,gname);

          if(gname == "EUROPEAN UNION"){
            app.ClientAppRouter.currentgid =  (gid) ? gid : 0;
            app.ClientAppRouter.gname =  "All";
            app.ClientAppRouter.dname =  (dname) ? dname : 0;
            app.ClientAppRouter.domainid =  (did) ? did : 0;
            app.ClientAppRouter.mode = '2';
            console.log(app.ClientAppRouter.domainid);
            appRouter.navigate("/showReg" , {trigger: true, replace: true});
          } else {
              app.ClientAppRouter.currentgid =  (gid) ? gid : 0;
              app.ClientAppRouter.gname =  (gname) ? gname : 0;
              app.ClientAppRouter.dname =  (dname) ? dname : 0;
              app.ClientAppRouter.domainid =  (did) ? did : 0;
              app.ClientAppRouter.mode = '2';
              console.log(app.ClientAppRouter.domainid);
              appRouter.navigate("/showReg" , {trigger: true, replace: true});
          }
     
        
      },
      showDocumentInTreeView: function(e) {
        console.log('showDocumentInTreeView');
        var gid = $(e.target).attr('gid');
        var cntid = $(e.target).attr('cntid');
        var sid = $(e.target).attr('sid');
        var did = $(e.target).attr('did');
        var rid = $(e.target).attr('rid');
        var rlid = $(e.target).attr('rlid');
        var docid = $(e.target).attr('docid');
        var sdocid = $(e.target).attr('sdocid');
        var docname  = $(e.target).attr('docname');
        console.log("gid");console.log(gid);
        console.log("cntid");console.log(cntid);
        console.log("sid");console.log(sid);
        console.log("did");console.log(did);
        console.log("rid");console.log(rid);
        console.log("rlid");console.log(rlid);
        console.log("docid");console.log(docid);
        console.log("sdocid");console.log(sdocid);
        console.log("docname");console.log(docname);
     
        app.ClientAppRouter.currentgid =  (gid) ? gid : 0;
        app.ClientAppRouter.currentcntid =  (cntid) ? cntid : 0;
        app.ClientAppRouter.currentstid =  (sid) ? sid : 0;
        app.ClientAppRouter.currentrid =  (rid) ? rid : 0;
        app.ClientAppRouter.currentrlid = (rlid) ? rlid : 0;
        app.ClientAppRouter.domainid =  (did) ? did : 0;
        app.ClientAppRouter.currentdocid = (docid) ? docid : 0;
        app.ClientAppRouter.doctypeid = (sdocid) ? sdocid : 0;
        app.ClientAppRouter.subdocname = (docname) ? docname : '';
        app.ClientAppRouter.mode = '1';
        console.log("domainid ::", app.ClientAppRouter.domainid);
        $('#zklibrary').addClass('zmactive').siblings().removeClass('zmactive');
        appRouter.navigate("showReg", {trigger: true, replace: true});
      },
     
      render_news: function(geoId){
        console.log("<<<<<<<<<<<" + geoId);
        var _self = this;
        $.when(this.newsCollection.fetch({reset: true, data: {geoId: geoId}, processData: true}))
         .done(function() {
          if (_self.newsCollection.length > 0) {
            _self.drawnews_table(_self.newsCollection, '#newstable'); 
          } else {
            //show no data found
            _self.showNoData('#newstable');
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
                  
                  var failureMsg = "Error occurred while fetching the News Information. Please Contact Administrator.";  
              }
              _self.showNoData('#newstable');
              console.log(_self.showNoData('#newstable'));
              $( "div.failure").html(failureMsg);
              $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );        
            } 
          }catch(e){
              window.location.href = '/sessionExpired';
          }     
        }); 
      },
     
      drawnews_table: function(data, sourceelement){
     
        this.$el.find(sourceelement).empty();
        var newrow = $(this.tbl);
        var ids;
        console.log("From the drawnews_table data", data);
        data.each(function ( item) {
     
          ids = item.keys();
        }, this); 
        if (ids) {
          for ( i =0; i < ids.length; i++ ) {
            if(i < 6) {
              var elem = $(this.templ);
              var newelem =  elem.filter('#elem');
              var found = newelem.clone();
              console.log("check the data", elem, newelem, found);
              found.append($('<span class="headrowsort"></span>').text(ids[i]));        
              var rel = newrow.find('#xlsheadrow');
              rel.append(found);
            }
          }                  
        }    
        var vrow = newrow.find('#xlsbodyrow');
        var vbody = newrow.find('#xlsbody');
        var ids, values;
        data.each(function (item, index) {
          ids = item.keys();
          values = item.values();
          console.log("KEYS:", item.keys());
          console.log("VALUES:", values);
          var crow = vrow.clone();
          for ( i = 0; i < ids.length; i++ ) {
            if(i < 6) {
              var elem = $(this.templ2);
              var newelem =  elem.filter('#elem');; 
              var found = newelem.clone();
              // found.text(values[i]);
              if (i == 0) {
                found.attr('class', 'text-left');
              }
              
              found.text(values[i]);
              crow.append(found);
            }      
          }
          console.log("TEST PASS.");
          vbody.append(crow);              
        }, this); 
        console.log("TEST PASS2.");
        this.$el.find(sourceelement).append(newrow);
        console.log("TEST PASS3.");
     
      },
     
      renderAlertsByGeo:function(){
        console.log(geoId);
        var _self = this;
        $.when(this.alertsCollection.fetch({reset: true, data: {geoId: geoId}, processData: true}))
         .done(function() {
          if (_self.alertsCollection.length > 0) {
            _self.drawTableAlerts(_self.alertsCollection, '#alerts'); 
          } else {
            //show no data found
            _self.showNoData('#updates');
          }
     
          // if (_self.alertsCollection.length > 0) {
          //   _self.drawTableAlerts(_self.AlertCollection, '#alerts'); 
          // } else {
          //   //show no data found
          //   _self.showNoData('#alerts');
          // }
     
          //Calling the news section
          if(geoId){
              _self.render_news(geoId);
          }else{
             _self.render_news(-1);
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
                  var failureMsg = "Error occurred while fetching the Alerts Information. Please Contact Administrator.";  
              }
              $( "div.failure").html(failureMsg);
              $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );        
            } 
          }catch(e){
              window.location.href = '/sessionExpired';
          }     
        }); 
     
     
      },
     
      drawTableAlerts: function(data, sourceelement) { 
     
        console.log("render alerts");
        this.$el.find(sourceelement).empty();
        var newrow = $(this.tbl);
        var ids;
        data.each(function ( item) {
          ids = item.keys();
        }, this); 
        if (ids) {
          for ( i =0; i < ids.length; i++ ) {
            if(i < 10) {
              var elem = $(this.templ);
              var newelem =  elem.filter('#elem');
              var found = newelem.clone();
              found.append($('<span class="headrowsort"></span>').text(ids[i]));        
              var rel = newrow.find('#xlsheadrow');
              rel.append(found);
            }
          }                  
        }    
        var vrow = newrow.find('#xlsbodyrow');
        var vbody = newrow.find('#xlsbody');
        var ids, values;
        data.each(function (item, index) {
          ids = item.keys();
          values = item.values();
          var crow = vrow.clone();
          for ( i = 0; i < ids.length; i++ ) {
            if(i < 10) {
              var elem = $(this.templ2);
              var newelem =  elem.filter('#elem');; 
              var found = newelem.clone();
              // found.text(values[i]);
              if (i == 0) {
                found.attr('class', 'text-left');
              }
              else
              {
                found.attr('class', 'text-center');
              }
              //if (ids[i] == 'access') {
               // found.append('<a class="accessdoc" did="' + values[i] + '" gid="' + values[i+1] + '" rid="' + values[i+2] + '" docid="' + values[i+3] + '" docname="' + values[i-1] + '">Access Now</a>');
              //} else {
                found.text(values[i]);
             // }
              crow.append(found);
            }      
          }
          vbody.append(crow);              
        }, this); 
        this.$el.find(sourceelement).append(newrow);
        // this.$el.find(sourceelement).prepend('<h3>Updates</h3>');
      },
      renderUpdatesByCountry: function(ccode) {
        var code=ccode.toUpperCase();
        console.log("ccode",code);
        console.log("AlertCollection",JSON.stringify(this.AlertCollection));
        var alertCollection = this.AlertCollection; 
        console.log("alertCollection",JSON.stringify(alertCollection));
        var _self = this;
        var filter = {"ccode": code}; console.log("filter",filter);
        var alertCollectionBycountry = new app.MAlertList(alertCollection.where(filter)); 
        console.log("AlertCollection!!!!!!!",JSON.stringify(alertCollectionBycountry)); 
       if (alertCollectionBycountry.length > 0) {
            _self.drawTableUpdates(alertCollectionBycountry, '#updates'); 
          } else {
            //show no data found
            _self.showNoData('#updates');
          }    
      },
      renderLibraryByCountry: function(ccode) {
        var code=ccode.toUpperCase();
        console.log("ccode",code);
        var libraryCollection = this.libraryCollection; 
        console.log("libraryCollection",JSON.stringify(this.libraryCollection));
        var _self = this;
        var filter = {"ccode": code}; console.log("filter",filter);
                    var libraryCollectionBycountry = new app.LibraryList(libraryCollection.where(filter)); 
                    console.log("AlertCollection!!!!!!!",JSON.stringify(libraryCollectionBycountry)); 
        var _self = this;
         if (libraryCollectionBycountry.length > 0) {
            _self.drawTable(libraryCollectionBycountry, '#library'); 
          } else {
            //show no data found
            _self.showNoData('#library');
          }    
       
      },renderUpdatesByState: function(ccode) {
        var code=ccode.toUpperCase();
        console.log("ccode",code);
        console.log("AlertCollection",JSON.stringify(this.AlertCollection));
        var alertCollection = this.AlertCollection; 
        console.log("alertCollection",JSON.stringify(alertCollection));
        var _self = this;
        var filter = {"sname": code}; console.log("filter",filter);
        var alertCollectionBycountry = new app.MAlertList(alertCollection.where(filter)); 
        console.log("AlertCollection!!!!!!!",JSON.stringify(alertCollectionBycountry)); 
       if (alertCollectionBycountry.length > 0) {
            _self.drawTableUpdates(alertCollectionBycountry, '#updates'); 
          } else {
            //show no data found
            _self.showNoData('#updates');
          }    
      },renderLibraryByState: function(ccode) {
        var code=ccode.toUpperCase();
        console.log("ccode",code);
        var libraryCollection = this.libraryCollection; 
        console.log("libraryCollection",JSON.stringify(this.libraryCollection));
        var _self = this;
        var filter = {"State": code}; console.log("filter",filter);
        var libraryCollectionBycountry = new app.LibraryList(libraryCollection.where(filter)); 
        console.log("AlertCollection!!!!!!!",JSON.stringify(libraryCollectionBycountry)); 
        var _self = this;
         if (libraryCollectionBycountry.length > 0) {
            _self.drawTable(libraryCollectionBycountry, '#library'); 
          } else {
            //show no data found
            _self.showNoData('#library');
          }    
       
      },
     
      updateAlertStatus: function()
      {
         var formData =  new FormData();
         formData.append('status',1);
     
    //var formData = { updateAlert: "yes", status : 1};
     
         $.ajax({
                type: "POST",
                url: "/updateAlertStatus", 
                data    : formData,
                 cache: false,           
              contentType: false,
              processData: false,     
                success: function(data) {
                  console.log(data);
                  console.log( " _self.regulations ::" + JSON.stringify(data));
                  //geoArray = JSON.stringify(_self.regulations.geoCollection);
                  /*if (data.length > 0) {
                    data.forEach(function(item) {                     
                      _self.regMap[item.geography_name] = item;
                    });
                  }*/
                }
            });              
     
      },
     
    //   updateAlertCount: function()
    //   {
       
    // //var formData = { updateAlert: "yes", status : 1};
     
    //      $.ajax({
    //             type: "GET",
    //             url: "/getUserAlertCount", 
    //              cache: false,           
    //           contentType: false,
    //           processData: false,     
    //             success: function(data) {
    //               console.log(data);
    //               console.log( " _self.regulations ::" + JSON.stringify(data));
                
    //           if( data.alertCount > 0 )
    //             $('#alertCount').text(data.alertCount);
    //           else
    //               $('#alertCount').text('');
    //           console.log("alert count html "+ $('alertCount').text());
    //             }
    //         });              
     
    //   },

      sortByDomain: function() {
        console.log("sortByDomain triggers");
        var _self = this;
       // var filter = this.libraryCollection.where({'Regulations':2});
       // var collectionFilter = new Backbone.Collection(filter);
      //  var array = collectionFilter.toJSON();
      //  console.log(array);
      var geolocid=document.getElementById("locationid").value;
      console.log("geolocid",geolocid);
      var objgeolocid = JSON.parse(geolocid);
      var geoId=objgeolocid.geoId;
      var geoName=objgeolocid.geoName;
      console.log("geoooid",geoId);
      var flagsort=document.getElementById("sortid").value;
      if(flagsort==0){
      console.log("descending order");
      setTimeout(function(){
           $('[data-field="Domain"]').find('div').addClass('desc').css('background-image','url(../img/sort_desc.png)');
      },200);
     
      console.log("flagsort",flagsort);
      this.libraryCollection.comparator = 'Domain' ;
      this.libraryCollection.sorting =0;
      
      this.libraryCollection.comparator =  function(umodel1,umodel2) {
                name1 = umodel1.get('Domain').toLowerCase();
                name2 = umodel2.get('Domain').toLowerCase();
                if (name1 < name2) return -1; // before
                if (name2 < name1) return 1; // afterfunction(UserModel){
            }
      var sort = this.libraryCollection.sort(true);
      var data = sort.toJSON();
      document.getElementById("sortid").value=1;
     }
     else if(flagsort==1){
      console.log("ascending order");
      setTimeout(function(){
        $('[data-field="Domain"]').find('div').addClass('asc').css('background-image','url(../img/sort_asc.png)');
      },200);
      this.libraryCollection.comparator = 'Domain' ;
      this.libraryCollection.sorting =1;
      this.libraryCollection.comparator =  function(umodel1,umodel2) {
                name1 = umodel1.get('Domain').toLowerCase();
                name2 = umodel2.get('Domain').toLowerCase();
                if (name1 > name2) return -1; // before
                if (name2 > name1) return 1; // afterfunction(UserModel){
            }
      var sort = this.libraryCollection.sort(true);
      var data = sort.toJSON();
      document.getElementById("sortid").value=0;
      }
        if(this.libraryCollection.length == 0){
          _self.showNoData('#library');
        }else {

        $('[data-toggle="table"]').bootstrapTable('destroy');
        $('[data-toggle="table"] tbody').show();
        $('[data-toggle="table"]').bootstrapTable({data:data});
        $('[data-toggle="table"]').removeClass('table-hover');

        var drawImage ='<div class="icon_cont_tr">'+
                          '<div class="supervisory_icon"></div>'+
                        '</div><span>Supervisory</span>';
        var drawBanking = '<div class="icon_cont_tr">' +
                          '<div class="banking_icon"></div>' +
                        '</div><span>Banking & Credit Union</span>';
        var drawCons = '<div class="icon_cont_tr">' +
                          '<div class="consumer_icon"></div>' +
                        '</div><span>Consumer Finance</span>';
        var drawPayment = '<div class="icon_cont_tr">' +
                          '<div class="services_icon"></div>' +
                        '</div><span>Payment Services</span>';
        var drawPensions = '<div class="icon_cont_tr">' +
                           '<div class="pensions_icon"></div>' +
                        '</div><span>Pensions</span>';
        var drawIns = '<div class="icon_cont_tr">' +
                           '<div class="insurance_icon"></div>' +
                        '</div><span>Insurance</span>';
        var drawFinCrime = '<div class="icon_cont_tr">' +
                           '<div class="financial_crime_icon"></div>' +
                        '</div><span>Financial Crime</span>';
        var drawFinmarket = '<div class="icon_cont_tr">' +
                           '<div class="financial_icon"></div>' +
                        '</div><span>Financial Markets</span>';
       

       $('#drawGeoImage').find('tbody tr').each(function(tr){
          console.log("testing function :::::::");
          console.log("tr ::", $(this).find("td:first-child").text());

          var image = $(this).find("td:first-child").text();
          console.log(image);
          console.log("llll",data[tr],tr);
          
        
          if(image == "Supervisory"){
            $(this).find("td:first-child").html(drawImage);
         // $(this).find("td:last-child").hide();
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'"  gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
             
          }
          else if(image == "Banking & Credit Union"){
            $(this).find("td:first-child").html(drawBanking);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Consumer Finance"){
            $(this).find("td:first-child").html(drawCons);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Payment Services"){
            $(this).find("td:first-child").html(drawPayment);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
            // $('#drawGeoImage').tablesorter();
          }
          else if(image == "Pensions"){
            $(this).find("td:first-child").html(drawPensions);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image =="Insurance"){
            $(this).find("td:first-child").html(drawIns);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Financial Markets"){
            $(this).find("td:first-child").html(drawFinmarket);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Financial Crime"){
            $(this).find("td:first-child").html(drawFinCrime);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
       //    var access = $("th:last-child").text();
       // if(access == 'Access'){
          // $("td:last-child").append('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger">Access Now</a>');
       // }
      

       });
    }

  },

      sortByRegulation: function() {
        console.log("this geoId",this.geoId);
        console.log("sortByRegulation triggers");
       // var filter = this.libraryCollection.where({'Regulations':2});
       // var collectionFilter = new Backbone.Collection(filter);
      //  var array = collectionFilter.toJSON();
      //  console.log(array);
      var geolocid=document.getElementById("locationid").value;
      console.log("geolocid",geolocid);
      var objgeolocid = JSON.parse(geolocid);
      var geoId=objgeolocid.geoId;
      var geoName=objgeolocid.geoName;
      console.log("geoooid",geoId);
      var flagsort=document.getElementById("sortid").value;
      if(flagsort==0){
      console.log("descending order");
      setTimeout(function(){
        $('[data-field="Regulations"]').find('div').addClass('desc').css('background-image','url(../img/sort_desc.png)');
      },200);
      console.log("flagsort",flagsort);
      this.libraryCollection.comparator = 'Regulations' ;
      this.libraryCollection.sorting =0;
      var sort = this.libraryCollection.sort(true);
      var data = sort.toJSON();
      document.getElementById("sortid").value=1;
     }
     else if(flagsort==1){
      console.log("ascending order");
      setTimeout(function(){
        $('[data-field="Regulations"]').find('div').addClass('asc').css('background-image','url(../img/sort_asc.png)');
      },200);
      this.libraryCollection.comparator = 'Regulations' ;
      this.libraryCollection.sorting =1;
      this.libraryCollection.comparator = function(UserModel){
                        return -UserModel.get("Regulations");
                    }
      var sort = this.libraryCollection.sort(true);
      var data = sort.toJSON();
      document.getElementById("sortid").value=0;
      }

      if(this.libraryCollection.length == 0){
        _self.showNoData('#library');
      }else {
        $('[data-toggle="table"]').bootstrapTable('destroy');
        $('[data-toggle="table"] tbody').show();
        $('[data-toggle="table"]').bootstrapTable({data:data});
        $('[data-toggle="table"]').removeClass('table-hover');

            var drawImage ='<div class="icon_cont_tr">'+
                          '<div class="supervisory_icon"></div>'+
                        '</div><span>Supervisory</span>';
        var drawBanking = '<div class="icon_cont_tr">' +
                          '<div class="banking_icon"></div>' +
                        '</div><span>Banking & Credit Union</span>';
        var drawCons = '<div class="icon_cont_tr">' +
                          '<div class="consumer_icon"></div>' +
                        '</div><span>Consumer Finance</span>';
        var drawPayment = '<div class="icon_cont_tr">' +
                          '<div class="services_icon"></div>' +
                        '</div><span>Payment Services</span>';
        var drawPensions = '<div class="icon_cont_tr">' +
                           '<div class="pensions_icon"></div>' +
                        '</div><span>Pensions</span>';
        var drawIns = '<div class="icon_cont_tr">' +
                           '<div class="insurance_icon"></div>' +
                        '</div><span>Insurance</span>';
        var drawFinCrime = '<div class="icon_cont_tr">' +
                           '<div class="financial_crime_icon"></div>' +
                        '</div><span>Financial Crime</span>';
        var drawFinmarket = '<div class="icon_cont_tr">' +
                           '<div class="financial_icon"></div>' +
                        '</div><span>Financial Markets</span>';
       

       $('#drawGeoImage').find('tbody tr').each(function(tr){
          console.log("testing function :::::::");
          console.log("tr ::", $(this).find("td:first-child").text());
          var image = $(this).find("td:first-child").text();
          console.log(image);
          console.log("llll",data[tr],tr);
          
        
          if(image == "Supervisory"){
            $(this).find("td:first-child").html(drawImage);
         // $(this).find("td:last-child").hide();
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'"  gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
             
          }
          else if(image == "Banking & Credit Union"){
            $(this).find("td:first-child").html(drawBanking);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Consumer Finance"){
            $(this).find("td:first-child").html(drawCons);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Payment Services"){
            $(this).find("td:first-child").html(drawPayment);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
            // $('#drawGeoImage').tablesorter();
          }
          else if(image == "Pensions"){
            $(this).find("td:first-child").html(drawPensions);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image =="Insurance"){
            $(this).find("td:first-child").html(drawIns);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Financial Markets"){
            $(this).find("td:first-child").html(drawFinmarket);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Financial Crime"){
            $(this).find("td:first-child").html(drawFinCrime);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
       //    var access = $("th:last-child").text();
       // if(access == 'Access'){
          // $("td:last-child").append('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger">Access Now</a>');
       // }
      

       });
    }
        
  },

  sortByDocs:function() {

      console.log("sortByDocs triggers");
       // var filter = this.libraryCollection.where({'Regulations':2});
       // var collectionFilter = new Backbone.Collection(filter);
      //  var array = collectionFilter.toJSON();
      //  console.log(array);
      var geolocid=document.getElementById("locationid").value;
      console.log("geolocid",geolocid);
      var objgeolocid = JSON.parse(geolocid);
      var geoId=objgeolocid.geoId;
      var geoName=objgeolocid.geoName;
      console.log("geoooid",geoId);
      var flagsort=document.getElementById("sortid").value;
      console.log("flagsort",flagsort);
      if(flagsort==0){
      console.log("descending order");
      setTimeout(function(){
        $('[data-field="Docs"]').find('div').addClass('desc').css('background-image','url(../img/sort_desc.png)');
      },200);
      this.libraryCollection.comparator = 'Docs' ;
      this.libraryCollection.sorting =0;
      var sort = this.libraryCollection.sort(true);
      var data = sort.toJSON();
      document.getElementById("sortid").value=1;
     }
     else if(flagsort==1){
      console.log("ascending order");
      setTimeout(function(){
        $('[data-field="Docs"]').find('div').addClass('asc').css('background-image','url(../img/sort_asc.png)');
      });
      this.libraryCollection.comparator = 'Docs' ;
      this.libraryCollection.sorting =1;
      this.libraryCollection.comparator = function(UserModel){
                        return -UserModel.get("Regulations");
                    }
      var sort = this.libraryCollection.sort(true);
      var data = sort.toJSON();
      document.getElementById("sortid").value=0;
      }
      if(this.libraryCollection.length == 0){
          _self.showNoData('#library');
      } else {
        $('[data-toggle="table"]').bootstrapTable('destroy');
        $('[data-toggle="table"] tbody').show();
        $('[data-toggle="table"]').bootstrapTable({data:data});
        $('[data-toggle="table"]').removeClass('table-hover');

           var drawImage ='<div class="icon_cont_tr">'+
                          '<div class="supervisory_icon"></div>'+
                        '</div><span>Supervisory</span>';
        var drawBanking = '<div class="icon_cont_tr">' +
                          '<div class="banking_icon"></div>' +
                        '</div><span>Banking & Credit Union</span>';
        var drawCons = '<div class="icon_cont_tr">' +
                          '<div class="consumer_icon"></div>' +
                        '</div><span>Consumer Finance</span>';
        var drawPayment = '<div class="icon_cont_tr">' +
                          '<div class="services_icon"></div>' +
                        '</div><span>Payment Services</span>';
        var drawPensions = '<div class="icon_cont_tr">' +
                           '<div class="pensions_icon"></div>' +
                        '</div><span>Pensions</span>';
        var drawIns = '<div class="icon_cont_tr">' +
                           '<div class="insurance_icon"></div>' +
                        '</div><span>Insurance</span>';
        var drawFinCrime = '<div class="icon_cont_tr">' +
                           '<div class="financial_crime_icon"></div>' +
                        '</div><span>Financial Crime</span>';
        var drawFinmarket = '<div class="icon_cont_tr">' +
                           '<div class="financial_icon"></div>' +
                        '</div><span>Financial Markets</span>';
       

       $('#drawGeoImage').find('tbody tr').each(function(tr){
          console.log("testing function :::::::");
          console.log("tr ::", $(this).find("td:first-child").text());

          var image = $(this).find("td:first-child").text();
          console.log(image);
          console.log("llll",data[tr],tr);
          
        
          if(image == "Supervisory"){
            $(this).find("td:first-child").html(drawImage);
         // $(this).find("td:last-child").hide();
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'"  gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
             
          }
          else if(image == "Banking & Credit Union"){
            $(this).find("td:first-child").html(drawBanking);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Consumer Finance"){
            $(this).find("td:first-child").html(drawCons);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Payment Services"){
            $(this).find("td:first-child").html(drawPayment);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
            // $('#drawGeoImage').tablesorter();
          }
          else if(image == "Pensions"){
            $(this).find("td:first-child").html(drawPensions);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image =="Insurance"){
            $(this).find("td:first-child").html(drawIns);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Financial Markets"){
            $(this).find("td:first-child").html(drawFinmarket);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
          else if(image == "Financial Crime"){
            $(this).find("td:first-child").html(drawFinCrime);
            $(this).find("td:last-child").html('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger" did="'+ data[tr].Access+'" gid="'+ geoId+'" gname="'+geoName+'" dname="'+data[tr].Domain+'">Access Now</a>');
          }
       //    var access = $("th:last-child").text();
       // if(access == 'Access'){
          // $("td:last-child").append('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger">Access Now</a>');
       // }
      

       });
    }

  }
  
 });
