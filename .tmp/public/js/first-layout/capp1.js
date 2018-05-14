'use strict';

var appRouter;

var subslimit = 8;
var subsoffset  = 0;
var docsClicked = [];

function renderGeoMap() {

  try { 

  var width = document.getElementById('geoMap').offsetWidth-60;
  var height = width / 2;
  var projection = d3.geo.robinson().translate([0, 0]).scale(width / 2 / Math.PI);
  var graticule = d3.geo.graticule();
  var path = d3.geo.path().projection(projection);
  var svg = d3.select("#geoMap").append("svg")
        .attr("class", 'continentmap')
        .attr("width", width)
        .attr("height", height);
  var outterg = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  var g = outterg.append("g").attr("id", "innerg");
  var tooltip = d3.select("#geoMap").append("div").attr("class", "tooltip hidden");
  d3.json("data/content.json", function(error, world) {    
      var countries = topojson.feature(world, world.objects.countries);
      //feature collections only have type, id, and name so i would not sitck properties in there but i dont think its invalid!
      //http://geojson.org/geojson-spec.html#introduction
      var asia       = {type: "FeatureCollection", name: "APAC", color: "#ffbb78", id:1, features: countries.features.filter(function(d) { return d.properties.continent=="Asia"; })};
      var africa     = {type: "FeatureCollection", name: "Africa", color: "#2ca02c", id:2, features: countries.features.filter(function(d) { return d.properties.continent=="Africa"; })};
      var europe     = {type: "FeatureCollection", name: "EU", color: "#ff7f0e", id:3, features: countries.features.filter(function(d) { return d.properties.continent=="Europe"; })};
      var na         = {type: "FeatureCollection", name: "US", color: "#1f77b4", id:4, features: countries.features.filter(function(d) { return d.properties.continent=="North America"; })};
      var sa         = {type: "FeatureCollection", name: "South America", color: "#d62728", id:5, features: countries.features.filter(function(d) { return d.properties.continent=="South America"; })};
      var antarctica = {type: "FeatureCollection", name: "Antarctica", color: "#98df8a", id:6, features: countries.features.filter(function(d) { return d.properties.continent=="Antarctica"; })};
      var oceania    = {type: "FeatureCollection", name: "Australia", color: "#aec7e8", id:7, features: countries.features.filter(function(d) { return d.properties.continent=="Oceania"; })};
      var middleeast = {type: "FeatureCollection", name: "Middle East", color: "#009de6", id:8, features: countries.features.filter(function(d) { return d.properties.continent=="middle east"; })};
      var uk         = {type: "FeatureCollection", name: "uk", color: "#009de6", id:9, features: countries.features.filter(function(d) { return d.properties.continent=="uk"; })};

      //skipped: Seven seas (open ocean) - only applies to French Southern and Antarctic Lands
      var continents = [asia,africa,europe,na,sa,antarctica,oceania,middleeast,uk];
      var continent  = g.selectAll(".continent").data(continents);
      var continentidname={'APAC':1,'AFRICA':2,'EU':3,'US':4,'SOUTH AMERICA':5,'ANTARCTICA':6,'AUSTRALIA':7};

      continent.enter().insert("path")
        .attr("class", "continent")
        .attr("d", path)
        .attr("id", function(d,i) { return d.id; })
        .attr("title", function(d,i) { return d.name; })
        .style("fill", function(d,i) { return d.color; });

      continent
        .on("mousemove", function(d,i) {
          var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
            tooltip
              .classed("hidden", false)
              .attr("style", "left:"+(mouse[0]+50)+"px;top:"+(mouse[1]+50)+"px")
              .html(d.name);
        })
        .on("mouseout", function(d,i) {
            tooltip.classed("hidden", true)
        }).on("click", function(d,i) {
                    
            $(this).addClass('geoactiveset').siblings().removeClass('geoactiveset');            
            if($("path.continent").is( ".geoactiveset")) {  
            console.log("d.id",d.id);              
              if(d.id==1) {
                //$('div#geoMap').hide();
                AsiaMapShow();
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
              else if(d.id==2) {
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
              else if(d.id==3) {
                EuropeMapShow();
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
              else if(d.id==4) {
                NorthAmericaMapShow();
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
              else if(d.id==5) {
                SouthAmericaMapShow();
                $("path#1").attr('style','fill:#FFD8B1;');
                $("path#2").attr('style','fill:#A2FFA2;');
                $("path#3").attr('style','fill:#FFA95C;');
                $("path#4").attr('style','fill:#BEC9E8;');
                $("path#5").attr('style','fill:#A52A2A;');
                $("path#6").attr('style','fill:#D0FCC8;');
                $("path#7").attr('style','fill:#C8DDF9;');
                $("path#8").attr('style','fill:#ccefff;');
                $("path#9").attr('style','fill:#d9b3ff;');
              }
              else if(d.id==6) {                
                $("path#1").attr('style','fill:#FFD8B1;');
                $("path#2").attr('style','fill:#A2FFA2;');
                $("path#3").attr('style','fill:#FFA95C;');
                $("path#4").attr('style','fill:#BEC9E8;');
                $("path#5").attr('style','fill:#FFF28A;');
                $("path#6").attr('style','fill:#A52A2A;');
                $("path#7").attr('style','fill:#C8DDF9;');
                $("path#8").attr('style','fill:#ccefff;');
                $("path#9").attr('style','fill:#d9b3ff;');
              }
              else if(d.id==7) {
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
              else if(d.id==8) {
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
              else if(d.id==9) {
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
            }            
            console.log('GeoName: ' + d.name);
            console.log(app.ClientAppRouter.geoMap);
            var geoId = app.ClientAppRouter.geoMap[d.name.toUpperCase().trim()];
            console.log('geoId: ' + geoId);
            if (app.ClientAppRouter.page == 'updates') {
                console.log("UPDATES");
                appRouter.currentView.renderUpdatesByGeo(geoId);
            } else {
                appRouter.currentView.renderLibraryByGeo(geoId);
            }
        });

      g.append("path")
        .datum(graticule)
        .attr("id", "graticule")
        .attr("d", path);
  });

  } catch (err) {
    console.log("Geo graph is not being drawn.");
  }
}
//..................................................................ukMapShow
function ukMapShow() {
    $(".continentmap").hide();
    var width = 6000,
    height = 1000;

// draw svg
var svg = d3.select("#geoMap").append("svg")
  .attr("class", 'uk')
  .attr("width", width)
  .attr("height", height)
  .attr("style", 'position:absolute;top:0;left:0;');

// map projection
var projection = d3.geo.patterson()
  .center([58,54])
    .scale(2000)
    .translate([0,0])
    .precision(.1);

// path generator
var path = d3.geo.path()
  .projection(projection);


d3.json("data/uk.json", function(error, europe) {   // South America
  
  var subunits = topojson.feature(europe, europe.objects.uk);

  var outterg = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  //translate(2700,650);
  var g = outterg.append("g").attr("id", "innerg");
  
  svg.attr('xmlns','http://www.w3.org/2000/svg');
  svg.attr('width','800');
  svg.attr('height','600');
  //svg.attr('viewBox','0 0 860 500');
  svg.attr('viewBox','0 0 2000 900');
  svg.attr('preserveAspectRatio','xMinYMin meet');

  g.selectAll(".subunit")
      .data(subunits.features)
    .enter()
      .append("path")
 
      .attr("class", function(d) { 
        console.log('Country id: ' + d.properties.sov_a3);
        return "subunit " + d.properties.sov_a3; 
      })
      .attr("id", function(d) { 
        return d.properties.sov_a3; 
      })
      .attr("title", function(d) { 
        return d.properties.sov_a3; 
      })
      .attr("d", path);
      //console.log('this' + d.id);
    subunits
    $('svg.uk path.subunit').on("click", function() {
      var countrycode = this.id;
      console.log("countrycode",countrycode);
      
      if (app.ClientAppRouter.page == 'updates') {
          console.log("UPDATES");
          appRouter.currentView.renderUpdatesByCountry(countrycode);
      } else {
          appRouter.currentView.renderLibraryByCountry(countrycode);
      }
      $(this).addClass('asia_ctry').siblings().removeClass('asia_ctry');
      /*if(!($('path.subunit').is('asia_ctry'))) {        
        addClass('asia_ctry_less');
      }
      var ids = $("#id").html();*/
    });

    });
}
//......................................................................................NorthAmericaMapShow

function NorthAmericaMapShow() {
  var countrycode;
    $(".continentmap").hide();
    var width = 6200,
    height = 1300;

// draw svg
var svg = d3.select("#geoMap").append("svg")
  .attr("class", 'northamerica')
  .attr("width", width)
  .attr("height", height)
  .attr("style", 'position:absolute;top:0;left:0;');

// map projection
var projection = d3.geo.patterson()
  .center([58,54])
    .scale(720)
    .translate([0,0])
    .precision(.1);

// path generator
var path = d3.geo.path()
  .projection(projection);
  d3.json("data/northamerica.json", function(error, europe) {   // North America  
  var subunits = topojson.feature(europe, europe.objects.northamerica);
  var outterg = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  //translate(2700,650);
  var g = outterg.append("g").attr("id", "innerg");  
  svg.attr('xmlns','http://www.w3.org/2000/svg');
  svg.attr('width','800');
  svg.attr('height','600');
  //svg.attr('viewBox','0 0 860 500');
  svg.attr('viewBox','0 0 2500 900');
  svg.attr('preserveAspectRatio','xMinYMin meet');
  g.selectAll(".subunit")
      .data(subunits.features)
      .enter()
      .append("path") 
      .attr("class", function(d) { 
        console.log('Country id: ' + d.properties.sov_a3);
        return "subunit " + d.properties.sov_a3; 
      })
      .attr("id", function(d) {         
        return d.properties.sov_a3; 
      })
      .attr("title", function(d) { 
        return d.properties.sov_a3; 
      })
      .attr("d", path);
      //console.log('this' + d.id);
    subunits
      	$('svg.northamerica path.subunit').on("click", function() {

          var countrycode = this.id;    
        	$(this).addClass('asia_ctry').siblings().removeClass('asia_ctry');
          if (app.ClientAppRouter.page == 'updates') {
                        console.log("elseUPDATES");
                        appRouter.currentView.renderUpdatesByCountry(countrycode);
                      } else {
                        appRouter.currentView.renderLibraryByCountry(countrycode);
                      }
          nacountry(countrycode);
    	});
//.....................................................................nacountry
        function nacountry(countrycode){
          console.log("nacountry");
          console.log("countrycode",countrycode);
          if (countrycode == "US1"){
        
        	    //$('svg.northamerica path.subunit.US1').on("click", function() {  
               $(".continentmap").hide();
               $("svg.northamerica").hide();       
                  var width = 6000,
                    height = 700;
                // draw svg
                var svg = d3.select("#geoMap").append("svg")
                  .attr("class", 'northamerica')
                  .attr("width", width)
                  .attr("height", height)
                  .attr("style", 'position:absolute;top:0;left:0;');
                // map projection
                var projection = d3.geo.patterson()
                  .center([58,54])
                    .scale(720)
                    .translate([0,0])
                    .precision(.1);
                // path generator
                var path = d3.geo.path()
                  .projection(projection);

              d3.json("data/usstates.json", function(error, europe) {   // usstates......       
                var subunits = topojson.feature(europe, europe.objects.usstates);
                var outterg = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                //translate(2700,650);
                var g = outterg.append("g").attr("id", "innerg");       
                svg.attr('xmlns','http://www.w3.org/2000/svg');
                svg.attr('width','800');
                svg.attr('height','600');
                //svg.attr('viewBox','0 0 860 500');
                svg.attr('viewBox','0 0 1700 900');
                svg.attr('preserveAspectRatio','xMinYMin meet');
                g.selectAll(".subunit")
                    .data(subunits.features)
                  .enter()
                    .append("path")      
                    .attr("class", function(d) { 
                      console.log('USA State id: ' + d.properties.name);
                      return "subunit " + d.properties.name; 
                    })
                    .attr("id", function(d) { 
                      return d.properties.name; 
                    })
                    .attr("title", function(d) { 
                      return d.properties.name; 
                    })
                    .attr("d", path);
                    //console.log('this' + d.id);
                    console.log("subunits.features",subunits.features);
                  subunits
                  $('svg.northamerica path.subunit').on("click", function() {
                  console.log("statename ",this.id);
                  var statename = this.id;
                  console.log("statename",statename);  
                  if (app.ClientAppRouter.page == 'updates') {
                    console.log("UPDATES");
                    appRouter.currentView.renderUpdatesByState(statename);
                  } else {
                    appRouter.currentView.renderLibraryByState(statename);
                  }
                  $(this).addClass('asia_ctry').siblings().removeClass('asia_ctry');
                  });

                  });
              //});
          }else{
            if (app.ClientAppRouter.page == 'updates') {
                        console.log("elseUPDATES");
                        appRouter.currentView.renderUpdatesByCountry(countrycode);
                      } else {
                        appRouter.currentView.renderLibraryByCountry(countrycode);
                      }
          }
        }      	     

    });
}
//.............................................................................SouthAmericaMapShow

function SouthAmericaMapShow() {
    $(".continentmap").hide();
    var width = 4000,
    height = -1000;

// draw svg
var svg = d3.select("#geoMap").append("svg")
  .attr("class", 'southamerica')
  .attr("width", width)
  .attr("height", height)
  .attr("style", 'position:absolute;top:0;left:0;');

// map projection
var projection = d3.geo.patterson()
  .center([58,54])
    .scale(720)
    .translate([0,0])
    .precision(.1);

// path generator
var path = d3.geo.path()
  .projection(projection);


d3.json("data/southamerica.json", function(error, europe) {   // South America
  
  var subunits = topojson.feature(europe, europe.objects.southamerica);

  var outterg = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  //translate(2700,650);
  var g = outterg.append("g").attr("id", "innerg");
  
  svg.attr('xmlns','http://www.w3.org/2000/svg');
  svg.attr('width','800');
  svg.attr('height','600');
  //svg.attr('viewBox','0 0 860 500');
  svg.attr('viewBox','0 0 2000 900');
  svg.attr('preserveAspectRatio','xMinYMin meet');

  g.selectAll(".subunit")
      .data(subunits.features)
    .enter()
      .append("path")
 
      .attr("class", function(d) { 
        console.log('Country id: ' + d.properties.sov_a3);
        return "subunit " + d.properties.sov_a3; 
      })
      .attr("id", function(d) { 
        return d.properties.sov_a3; 
      })
      .attr("title", function(d) { 
        return d.properties.sov_a3; 
      })
      .attr("d", path);
      //console.log('this' + d.id);
    subunits
    $('svg.southamerica path.subunit').on("click", function() {
      $(this).addClass('asia_ctry').siblings().removeClass('asia_ctry');
      if(!($('path.subunit').is('asia_ctry'))) {        
        addClass('asia_ctry_less');
      }
      var ids = $("#id").html();
    });

    });
}
//.........................................................................AsiaMapShow

  function AsiaMapShow() {
        $(".continentmap").hide();
        var width = 1000,
        height = 100;

    // draw svg
    var svg = d3.select("#geoMap").append("svg")
      .attr("class", 'asia')
      .attr("width", width)
      .attr("height", height)
      .attr("style", 'position:absolute;top:0;left:0;');

    // map projection
    var projection = d3.geo.patterson()
      .center([58,54])
        .scale(720)
        .translate([0,0])
        .precision(.1);

    // path generator
    var path = d3.geo.path()
      .projection(projection);


    d3.json("data/asia.json", function(error, europe) {   // Asia
      var subunits = topojson.feature(europe, europe.objects.asia);
      var outterg = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      //translate(2700,650);
      var g = outterg.append("g").attr("id", "innerg");
      
      svg.attr('xmlns','http://www.w3.org/2000/svg');
      svg.attr('width','800');
      svg.attr('height','600');
      //svg.attr('viewBox','0 0 860 500');
      svg.attr('viewBox','0 0 2000 900');
      svg.attr('preserveAspectRatio','xMinYMin meet');


      g.selectAll(".subunit")
          .data(subunits.features)
        .enter()
          .append("path")
     
          .attr("class", function(d) { 
            console.log('Country id: ' + d.properties.sov_a3);
            return "subunit " + d.properties.sov_a3; 
          })
          .attr("id", function(d) { 
            return d.properties.sov_a3; 
          })
          .attr("title", function(d) { 
            return d.properties.sov_a3; 
          })
          .attr("d", path);
          //console.log('this' + d.id);
        subunits
          $('svg.asia path.subunit').on("click", function() { 
          console.log("this",this.id); 
          var countrycode = this.id;
          getcountry(countrycode);  
            $(this).addClass('asia_ctry').siblings().removeClass('asia_ctry');
          });
    //........................................................TO LOAD COUNTRIES
       
          function getcountry(countrycode){
              console.log("countrycode",countrycode);
               $(".continentmap").hide();
               $("svg.asia").hide();           
                  var width = 6000,
                  height = 700;
              // draw svg
              var svg = d3.select("#geoMap").append("svg")
                .attr("class", 'asia')
                .attr("width", width)
                .attr("height", height)
                .attr("style", 'position:absolute;top:0;left:0;');
              // map projection
              var projection = d3.geo.patterson()
                .center([60,55])
                  .translate([0,0])
                  .precision(.1);
              // path generator
              var path = d3.geo.path()
                .projection(projection);
                 var width = 1000,
                    height = 100;
                d3.json("data/Country/"+ countrycode + ".json", function(error, asia) { // INDIA 
                    //console.log("test 2",asia.objects[countrycode]);
                    var subunits = topojson.feature(asia, asia.objects[countrycode]);
                    var outterg = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                    //translate(2700,650);
                    var g = outterg.append("g").attr("id", "innerg");                
                    svg.attr('xmlns','http://www.w3.org/2000/svg');
                    svg.attr('width','800');
                    svg.attr('height','600');
                    //svg.attr('viewBox','0 0 860 500');
                    svg.attr('viewBox','0 0 1700 900');
                    svg.attr('preserveAspectRatio','xMinYMin meet');
                    console.log("test 3");
                    g.selectAll(".subunit")
                          .data(subunits.features)
                          .enter()
                          .append("path")       
                          .attr("class", function(d) { 
                           console.log(' id: ' + d.properties.name);
                           return "subunit " + d.properties.name; 
                          })
                          .attr("id", function(d) { 
                            return d.properties.name; 
                          })
                          .attr("title", function(d) { 
                            return d.properties.name; 
                          })
                         .attr("d", path);
                      subunits
                      if (app.ClientAppRouter.page == 'updates') {
                        console.log("UPDATES");
                        appRouter.currentView.renderUpdatesByCountry(countrycode);
                      } else {                       
                        appRouter.currentView.renderLibraryByCountry(countrycode);
                      }
                    /*$('svg.asia path.subunit.'+countrycode).on("click", function() { 
                          $(this).addClass('asia_ctry').siblings().removeClass('asia_ctry');
                    });
                    */
                    /*if (app.ClientAppRouter.page == 'updates') {
                      console.log("UPDATES");
                      appRouter.currentView.renderUpdatesByGeo(countrycode);
                    } else {
                      appRouter.currentView.renderLibraryByGeo(countrycode);
                    }*/
                });
               
          }      
    });
  } 
//...............................................................................AfricaMapShow
function AfricaMapShow() {
    $(".continentmap").hide();
    var width = 2000,
    height = -500;

// draw svg
var svg = d3.select("#geoMap").append("svg")
  .attr("class", 'africa')
  .attr("width", width)
  .attr("height", height)
  .attr("style", 'position:absolute;top:0;left:0;');

// map projection
var projection = d3.geo.patterson()
  .center([58,54])
    .scale(720)
    .translate([0,0])
    .precision(.1);

// path generator
var path = d3.geo.path()
  .projection(projection);


d3.json("data/africa.json", function(error, europe) {   // Africa
  
  var subunits = topojson.feature(europe, europe.objects.africa);

  var outterg = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  //translate(2700,650);
  var g = outterg.append("g").attr("id", "innerg");
  
  svg.attr('xmlns','http://www.w3.org/2000/svg');
  svg.attr('width','800');
  svg.attr('height','600');
  //svg.attr('viewBox','0 0 860 500');
  svg.attr('viewBox','0 0 2000 900');
  svg.attr('preserveAspectRatio','xMinYMin meet');

  g.selectAll(".subunit")
      .data(subunits.features)
    .enter()
      .append("path")
 
      .attr("class", function(d) { 
        console.log('Country id: ' + d.properties.sov_a3);
        return "subunit " + d.properties.sov_a3; 
      })
      .attr("id", function(d) { 
        return d.properties.sov_a3; 
      })
      .attr("title", function(d) { 
        return d.properties.sov_a3; 
      })
      .attr("d", path);
      //console.log('this' + d.id);
    subunits
    $('svg.africa path.subunit').on("click", function() {
      $(this).addClass('asia_ctry').siblings().removeClass('asia_ctry');
      if(!($('path.subunit').is('asia_ctry'))) {   
       $(this).addClass('asia_ctry_less').siblings().removeClass('asia_ctry_less');
      }
      var ids = $("#id").html();
    });

    });
}

//..................................................................................EuropeMapShow
function EuropeMapShow() {
    $(".continentmap").hide();
    var width = 2200,
    height = 1300;

// draw svg
var svg = d3.select("#geoMap").append("svg")
  .attr("class", 'europe')
  .attr("width", width)
  .attr("height", height)
  .attr("style", 'position:absolute;top:0;left:0;');

// map projection
var projection = d3.geo.patterson()
  .center([58,54])
    .scale(720)
    .translate([0,0])
    .precision(.1);

// path generator
var path = d3.geo.path()
  .projection(projection);


d3.json("data/europe.json", function(error, europe) {   // Europe
  
  var subunits = topojson.feature(europe, europe.objects.europe);

  var outterg = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  //translate(2700,650);
  var g = outterg.append("g").attr("id", "innerg");
  
  svg.attr('xmlns','http://www.w3.org/2000/svg');
  svg.attr('width','800');
  svg.attr('height','600');
  //svg.attr('viewBox','0 0 860 500');
  svg.attr('viewBox','0 0 3000 900');
  svg.attr('preserveAspectRatio','xMinYMin meet');

  g.selectAll(".subunit")
      .data(subunits.features)
    .enter()
      .append("path")
 
      .attr("class", function(d) { 
        console.log('Country id: ' + d.properties.sov_a3);
        return "subunit " + d.properties.sov_a3; 
      })
      .attr("id", function(d) { 
        return d.properties.sov_a3; 
      })
      .attr("title", function(d) { 
        return d.properties.sov_a3; 
      })
      .attr("d", path);
      //console.log('this' + d.id);
       subunits
    $('svg.europe path.subunit').on("click", function() {
      console.log("this",this.id); 
          var countrycode = this.id;
          geteucountry(countrycode);  
            $(this).addClass('asia_ctry').siblings().removeClass('asia_ctry');
    });
      

		function geteucountry(countrycode){
              console.log("countrycode",countrycode);
               $(".continentmap").hide();
               $("svg.europe").hide();           
                  var width = 6000,
                  height = 700;
              // draw svg
              var svg = d3.select("#geoMap").append("svg")
                .attr("class", 'europe')
                .attr("width", width)
                .attr("height", height)
                .attr("style", 'position:absolute;top:0;left:0;');
              // map projection
              var projection = d3.geo.patterson()
                .center([60,55])
                  .translate([0,0])
                  .precision(.1);
              // path generator
              var path = d3.geo.path()
                .projection(projection);
                 var width = 1000,
                    height = 100;
                d3.json("data/Country/"+ countrycode + ".json", function(error, europe) { // INDIA 
                    //console.log("test 2",asia.objects[countrycode]);
                    var subunits = topojson.feature(europe, europe.objects[countrycode]);
                    var outterg = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                    //translate(2700,650);
                    var g = outterg.append("g").attr("id", "innerg");                
                    svg.attr('xmlns','http://www.w3.org/2000/svg');
                    svg.attr('width','800');
                    svg.attr('height','600');
                    //svg.attr('viewBox','0 0 860 500');
                    svg.attr('viewBox','0 0 1700 900');
                    svg.attr('preserveAspectRatio','xMinYMin meet');
                    console.log("test 3");
                    g.selectAll(".subunit")
                          .data(subunits.features)
                          .enter()
                          .append("path")       
                          .attr("class", function(d) { 
                           console.log(' id: ' + d.properties.name);
                           return "subunit " + d.properties.name; 
                          })
                          .attr("id", function(d) { 
                            return d.properties.name; 
                          })
                          .attr("title", function(d) { 
                            return d.properties.name; 
                          })
                         .attr("d", path);
                      subunits
                        if (app.ClientAppRouter.page == 'updates') {
                        console.log("UPDATES");
                        appRouter.currentView.renderUpdatesByCountry(countrycode);
                      } else {
                        appRouter.currentView.renderLibraryByCountry(countrycode);
                      }
                    /*$('svg.asia path.subunit.'+countrycode).on("click", function() { 
                          $(this).addClass('asia_ctry').siblings().removeClass('asia_ctry');
                    });
                    */
                });
          }   

   

    });
}
//.....................................................................................AustraliaMapShow

function AustraliaMapShow() {
    $(".continentmap").hide();
    var width = -1200,
    height = -1600;

// draw svg
var svg = d3.select("#geoMap").append("svg")
  .attr("class", 'australia')
  .attr("width", width)
  .attr("height", height)
  .attr("style", 'position:absolute;top:0;left:0;');

// map projection
var projection = d3.geo.patterson()
  .center([58,54])
    .scale(720)
    .translate([0,0])
    .precision(.1);

// path generator
var path = d3.geo.path()
  .projection(projection);


d3.json("data/oceania.json", function(error, europe) {   // Australia
  
  var subunits = topojson.feature(europe, europe.objects.oceania);

  var outterg = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  //translate(2700,650);
  var g = outterg.append("g").attr("id", "innerg");
  
  svg.attr('xmlns','http://www.w3.org/2000/svg');
  svg.attr('width','600');
  svg.attr('height','600');
  //svg.attr('viewBox','0 0 860 500');
  svg.attr('viewBox','0 0 1000 900');
  svg.attr('preserveAspectRatio','xMinYMin meet');

  g.selectAll(".subunit")
      .data(subunits.features)
    .enter()
      .append("path")
 
      .attr("class", function(d) { 
        console.log('Country id: ' + d.properties.sov_a3);
        return "subunit " + d.properties.sov_a3; 
      })
      .attr("id", function(d) { 
        return d.properties.sov_a3; 
      })
      .attr("title", function(d) { 
        return d.properties.sov_a3; 
      })
      .attr("d", path);
      //console.log('this' + d.id);
    subunits
    $('svg.australia path.subunit').on("click", function() {
      $(this).addClass('asia_ctry').siblings().removeClass('asia_ctry');
      if(!($('path.subunit').is('asia_ctry'))) {        
        addClass('asia_ctry_less');
      }
      var ids = $("#id").html();
    });

    });
}
//.............................................................................MiddleeastMapShow
function MiddleeastMapShow() {
    $(".continentmap").hide();
    var width = 2000,
    height = 100;

// draw svg
var svg = d3.select("#geoMap").append("svg")
  .attr("class", 'middleeast')
  .attr("width", width)
  .attr("height", height)
  .attr("style", 'position:absolute;top:0;left:0;');

// map projection
var projection = d3.geo.patterson()
  .center([58,54])
    .scale(720)
    .translate([0,0])
    .precision(.1);

// path generator
var path = d3.geo.path()
  .projection(projection);


d3.json("data/middleeast.json", function(error, europe) {   // South America
  
  var subunits = topojson.feature(europe, europe.objects.middleeast);

  var outterg = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  //translate(2700,650);
  var g = outterg.append("g").attr("id", "innerg");
  
  svg.attr('xmlns','http://www.w3.org/2000/svg');
  svg.attr('width','800');
  svg.attr('height','600');
  //svg.attr('viewBox','0 0 860 500');
  svg.attr('viewBox','0 0 2000 900');
  svg.attr('preserveAspectRatio','xMinYMin meet');

  g.selectAll(".subunit")
      .data(subunits.features)
    .enter()
      .append("path")
 
      .attr("class", function(d) { 
        console.log('Country id: ' + d.properties.sov_a3);
        return "subunit " + d.properties.sov_a3; 
      })
      .attr("id", function(d) { 
        return d.properties.sov_a3; 
      })
      .attr("title", function(d) { 
        return d.properties.sov_a3; 
      })
      .attr("d", path);
      //console.log('this' + d.id);
    subunits
    $('svg.middleeast path.subunit').on("click", function() {
      var countrycode = this.id;
      console.log("countrycode",countrycode);      
      if (app.ClientAppRouter.page == 'updates') {
          console.log("UPDATES");
          appRouter.currentView.renderUpdatesByCountry(countrycode);
      } else {
          appRouter.currentView.renderLibraryByCountry(countrycode);
      }
      $(this).addClass('asia_ctry').siblings().removeClass('asia_ctry');
      /*if(!($('path.subunit').is('asia_ctry'))) {        
        addClass('asia_ctry_less');
      }
      var ids = $("#id").html();*/
    });

    });
}

/*$('svg.northamerica path#US1').on("click", function() {
      alert('Generate US State---');
});*/

$(document).ready(function() {

    // Element Blocking
    // --------------------------------------------------

    // function blockUI(element) {
    //     $(element).block({
    //         message: '<div class=\'sk-double-bounce\'><div class=\'sk-child sk-double-bounce1\'></div><div class=\'sk-child sk-double-bounce2\'></div></div>',
    //         css: {
    //             border: 'none',
    //             backgroundColor: 'transparent'
    //         },
    //         overlayCSS: {
    //             backgroundColor: '#FAFEFF',
    //             opacity: 0.5,
    //             cursor: 'wait'
    //         }
    //     });
    // }

    // function unblockUI(element) {
    //     $(element).unblock();
    // }

    // Toggle Sidebar
    // --------------------------------------------------

    // $('.sidebar-control').on('click', function() {
    //     $('body').toggleClass('sidebar-unpin');
    // });

    $('.hamburger-menu').on('click', function() {
        var xlstableid = '';
        if (app.ClientAppRouter.currentopendoc == 'xls') {
            console.log(app.ClientAppRouter.currentopendoc);
            var xlstableid = 'xls-table' + 
                app.ClientAppRouter.currentgid +
                app.ClientAppRouter.currentrid +
                app.ClientAppRouter.domainid +
                app.ClientAppRouter.doctypeid;
            $("#" + xlstableid).colResizable({ disable : true });
            console.log('xlstableid[BEFORE] - ' + xlstableid);    
        }        
        $(this).toggleClass('active');
        $('body').toggleClass('main-sidebar-toggled');
        if (app.ClientAppRouter.currentopendoc == 'xls') {
            console.log(app.ClientAppRouter.currentopendoc);
            $('#' + xlstableid).sorttable({
              placeholder: 'placeholder',
              helperCells: null
            }).disableSelection();
            //To do Column resizable
            $('#' + xlstableid).colResizable({
              liveDrag: true,
              postbackSafe: true,
              resizeMode:'overflow'
            });
            console.log('xlstableid[AFTER] - ' + xlstableid);            
        }
    });

    // $('.hamburger-menu').on('click', function() {
    //     $(this).toggleClass('active');
    //     $('body').toggleClass('main-sidebar-toggled');
    // });

    // Extra Sidebars
    // --------------------------------------------------

    // $('.sidebar-toggle').on('click', function() {
    //     $('body').toggleClass('sidebar-toggled');
    // });

    // Toogle Searchbar
    // --------------------------------------------------

    // $('.search-bar-toggle').on('click', function() {
    //     $('.search-bar').toggleClass('closed');
    // });

    // Toggle Right Sidebar
    // --------------------------------------------------

    // $('.right-sidebar-toggle').on('click', function() {
    //     $('.right-sidebar').toggleClass('closed');
    // });

    // Toggle Conversation Sidebar
    // --------------------------------------------------

    // $('.conversation-toggle').on('click', function() {
    //     $('.conversation').toggleClass('closed');
    // });

    // Tooltips & Popovers
    // --------------------------------------------------

    // $('[data-toggle=\'tooltip\']').tooltip();
    // $('[data-toggle=\'popover\']').popover();

    // Widget Controls
    // --------------------------------------------------

    // $('.widget-collapse').on('click', function() {
    //     $(this).closest('.widget').find('.widget-body').slideToggle(300);
    //     $(this).find('i').toggleClass('ion-chevron-up ion-chevron-down');
    // });
    // $('.widget-reload').on('click', function() {
    //     var element = $(this).closest('.widget');
    //     blockUI(element);
    //     window.setTimeout(function() {
    //         unblockUI(element);
    //     }, 3000);
    // });
    // $('.widget-remove').on('click', function() {
    //     $(this).closest('.widget').hide();
    // });

    // Progressbar
    // --------------------------------------------------

    // if ($('.progress').length > 0) {
    //     $('.progress .progress-bar').progressbar();
    // }

    // User Profile
    // --------------------------------------------------
    $('#esp-user-profile').easyPieChart({
        barColor: '#FFFFFF',
        trackColor: 'rgba(0,0,0,0)',
        scaleColor: false,
        scaleLength: 0,
        lineCap: 'round',
        lineWidth: 3,
        size: 56,
        animate: {
            duration: 2000,
            enabled: true
        }
    });
    // Managing CSS animations
    // --------------------------------------------------
    $('.animated').animo({
        duration: 0.2
    });
    // Register Events
    $('#showRegulation').on('click', function(e) {
        console.log('route to showReg');
        app.ClientAppRouter.mode = '0';        
        routeCalled('showReg');
        appRouter.navigate("showReg", {trigger: true, replace: true});
    });    
    $('#profile_link').on('click', function(e) {
        console.log('route to showProfile');
        $('#menu_header li').removeClass('zmactive');
        routeCalled('showProfile');
        appRouter.navigate("showProfile", {trigger: true, replace: true});
    });        
    $('#esearch').on('click', function(e) {
        // e.preventDefault();
        routeCalled('showSearch/'+ searchKey);
        var searchKey = $('#searchKey').val();
        console.log('Click:searchKey:' + searchKey);
        if (searchKey != '') {
          appRouter.navigate("showSearch/" + searchKey, {trigger: true, replace: true});
        }                
    });
    $('#searchKey').on('keyup', function(e) {
        // e.preventDefault();
        if (e.keyCode === 13) {
          routeCalled('showSearch/'+ searchKey);
          var searchKey = $('#searchKey').val();
          console.log('KeyUp:searchKey:' + searchKey);
          appRouter.navigate("showSearch/" + searchKey, {trigger: true, replace: true});
        }
    });
    $('#showUpdates').on('click', function(e) {
        app.ClientAppRouter.page = 'updates';        
        console.log("UPDATES1: ", app.ClientAppRouter.page);
     //   history.pushState('updates', null, location.href);  
     routeCalled('showDashboard');
        appRouter.navigate("showDashboard", {trigger: true, replace: true});
    }); 

    $('#showAlerts').on('click', function(e) {
        app.ClientAppRouter.page = 'alerts';        
        console.log("Alerts: ", app.ClientAppRouter.page);
     //    history.pushState('alerts', null, location.href);    
     routeCalled('showAlerts');          
        appRouter.navigate("showAlerts", {trigger: true, replace: true});
    }); 
    $("#zkhome").on('click',function() {
        app.ClientAppRouter.page = '';
        routeCalled('userDashboard'); 
        $(this).addClass('zmactive').siblings().removeClass('zmactive');
    });


    $("#zurikAnchor").on('click',function() {
        app.ClientAppRouter.page = '';
        routeCalled('userDashboard'); 
        //$(this).addClass('zmactive').siblings().removeClass('zmactive');
    });


    $("#zklibrary").on('click',function(){

       //routeCalled('showReg');
        $(this).addClass('zmactive').siblings().removeClass('zmactive');
    });

    $("#zkupdate").on('click',function(){

      routeCalled('showDashboard');
        $(this).addClass('zmactive').siblings().removeClass('zmactive');
    });

    $("#zkalert").on('click',function(){
      routeCalled('showAlerts'); 
        $(this).addClass('zmactive').siblings().removeClass('zmactive');
    });
    $('#advancesearch').on('click', function(e) {
        console.log('route to advance search view');
        $('#menu_header li').removeClass('zmactive');
        routeCalled('advancesearch');
        appRouter.navigate("advancesearch", {trigger: true, replace: true});
    });    
    console.log('getting ready');
    appRouter = new app.ClientAppRouter();
    Backbone.history.start();
    console.log('View is Ready');
    
});

var int=self.setInterval(showAlertCount, 60000); 

 function  showAlertCount()
 {

  try
  {
   

     $.ajax({
            type: "GET",
            url: "/getUserAlertCount", 
             cache: false,           
          contentType: false,
          processData: false,     
            success: function(data) {
              console.log(data);
              console.log( " _self.regulations ::" + JSON.stringify(data));
              console.log("alert count "+data.alertCount);

              if( data.alertCount > 0 )
                $('#alertCount').text(data.alertCount);
              else
                  $('#alertCount').text('');
              console.log("alert count html "+ $('alertCount').text());
              //geoArray = JSON.stringify(_self.regulations.geoCollection);
              /*if (data.length > 0) {
                data.forEach(function(item) {                     
                  _self.regMap[item.geography_name] = item;
                });
              }*/
            }
        });              
  }
   catch(exception)
   {

   }

  }

function routeCalled(routeName)
{
   if( docsClicked[routeName] == undefined )
   {
      docsClicked[routeName] = 1;
   }
   else
   {
     docsClicked[routeName] = 1;
   }

}

$( "#leaveCurrentPageOK" ).click(function() {
  $('#saveConfirmDialog').modal('hide');
  location.href = location.protocol + '//' + location.host;

});



$( "#leaveCurrentPageCancel" ).click(function() {
  $('#leaveCurrentPageCancel').modal('hide');
  

});

var count = 0; 


window.onload = function () 
{ 
  console.log("current location "+Backbone.history.getFragment());
  //alert(window.location.href);

 
    if (typeof history.pushState === "function") 
    { 
        var rootname = Backbone.history.getFragment();
        if( rootname == undefined || rootname == '' )
          rootname="userDashboard";   
      //    alert("rootname "+rootname);       
         history.pushState('back', null, null);  
         routeCalled(rootname); 
          docsClicked[rootname] = 0;    

        window.onpopstate = function (event) 
        { 
   
              var rootname = Backbone.history.getFragment();
       
              if( rootname == undefined || rootname == '' )
              {
                history.pushState('back', null, null); 
                 rootname="userDashboard"; 
              }
              else
              {
                history.pushState('back', null, null);
              }

              if( docsClicked[rootname] == undefined )
               {
                  docsClicked[rootname] = 1;
               }
               else
               {

                   if( docsClicked[rootname]  <=  0 )
                   {

                   /* $('#exitBrowserDialog').modal('show');

                     if( confirm("Do you want to leave current page?") == true)
                     {
                        location.href = location.protocol + '//' + location.host;
                     }*/

                      $('#exitBrowserDialog').modal('show');
                  }
                  else
                  {
                    docsClicked[rootname]--;
                  }
               }
            


           //if(count == 1){window.location = 'your url';}
          
         }; 
     }
     
 }  
 

