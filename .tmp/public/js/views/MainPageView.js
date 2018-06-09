var app = app || {};

app.MainPageView =Backbone.View.extend({
  el:  $("#mainCanvas"),
  template: $('#mainCanvasTpl').html(),
  initialize: function() {
          this.mode = app.ClientAppRouter.mode;
         this.filteredval = false;
         app.ClientAppRouter.origin = 0;
         this.render();
  },

  render: function() {
    this.$el.html(this.template);
    console.log('Rendering MainPageView');
  //  $(".regulation-tracker .panel-title .content-header-min").find('div ').css('background-image','url(../img/panel-close-icon-h.svg)')
    
    this.treeList = new app.TreeView({el: $('#treeCanvas')});
    this.renderDomainGeo();
    return this;
  },

  events: {
      'click  #go'    : 'filter',
      'click  #reset' : 'reset',
      'click #regsearch' :'regsearch'
  },

   filter : function(selectedGeo) {
      var filterGeo = [];
      $('#select-geo-ul').find('.selected').each( function() {
         filterGeo.push($(this).text());
      });
      console.log('filterGeo', filterGeo);
      var filterDomain = [];
      $('#select-domain-ul').find('.selected').each( function() {
        filterDomain.push($(this).text());
      });
      console.log('filterDomain', filterDomain);
      var filterStatus = [];
      $('#select-status-ul').find('.selected').each( function() {        
        switch ($(this).text()) {
          case 'Upcoming regulations':
            filterStatus.push(1);
            break;
          case 'Ongoing regulations':
            filterStatus.push(2);
            break;
          case 'Completed regulations':
            filterStatus.push(3);
            break;
          case 'Not Applicable':
            filterStatus.push(4);
            break;
        }        
      });  
      console.log('filterStatus', filterStatus);    
      if ( this.filteredval ){
        this.treeList.colGeoGraphy = new Backbone.Collection(this.treeList.igeo.toJSON());
        this.treeList.colDomain = new Backbone.Collection(this.treeList.idomain.toJSON());
        this.treeList.colRegulation = new Backbone.Collection(this.treeList.iregulation.toJSON());
      }      
      console.log(this.treeList.colGeoGraphy);
      console.log(this.treeList.colDomain);
      console.log(this.treeList.colRegulation);
      console.log( "===================================================");
      if (filterGeo.length >0) {
        this.treeList.colGeoGraphy = this.filterCollection( this.treeList.colGeoGraphy, 'name',filterGeo);  
      }
      console.log('FilterGeos:', this.treeList.colGeoGraphy);
     
      if (filterDomain.length >0) {
        this.treeList.colDomain = this.filterCollection( this.treeList.colDomain, 'name', filterDomain);  
      }      
      console.log('FilterDomains:', this.treeList.colDomain);
      if (filterStatus.length >0) {
        this.treeList.colRegulation = this.filterCollectionByNum( this.treeList.colRegulation, 'rstatus', filterStatus);  
      }      
      console.log('FilterRegs:', this.treeList.colRegulation);
      $('#breadcrumb').text('');      
      $('#panelFooter').empty();
      $('#rendersec , #Textdiv').remove();  //remove download form & button    
      $("#canvas").children().remove();
      $("#canvas").unbind();
      $("#treeCanvas").empty();
      this.treeList.reset();
      this.treeList.render();
    //  this.expandDomainTreeNode(filterGeo,true);
      this.filteredval = true;
  },
  
  filterCollectionByNum  : function (collection, attribute, value) {
    var models = [] ;
    console.log('COLLECTION:::', collection);
    for (var  i =0; i < value.length; i++) {
     console.log(value[i]);
     console.log(models);
     fmodel = collection.where({ 'rstatus' : value[i]});
     console.log (fmodel);
     models = models.concat(fmodel);
     console.log(models);
    }
    return new collection.constructor(models);
  },

  filterCollection  : function (collection, attribute, value) {
    var models = [] ;
    for (var  i =0; i < value.length; i++) {
     console.log(typeof value[i]);
     console.log(models);
     fmodel = collection.where({ "name" : value[i].valueOf()});
     console.log (fmodel);
     models = models.concat(fmodel);
     console.log(models);
   }
    return new collection.constructor(models);
},


expandDomainTreeNode: function(selectedGeo, isExpand) {
  console.log('CLICK GEO: ', selectedGeo);
  $('#geography').children().each(function(index, liTag) {
    var geo = $(liTag).children('a').text();
    console.log("DB GEO: ", geo);
    if (selectedGeo == 'All') {
      if (isExpand) {
        $(liTag).attr('aria-expanded', true);
        $(liTag).children('a').removeClass('tree-parent-collapsed');
        $(liTag).children('ul').removeClass('tree-group-collapsed');
        //liTag is Geography
        $(liTag).children('ul').children('li').each(function() { //each items is country        
          console.log('UL COUNTRY TAG: ', $(this)); 
          $(this).children('ul').children('li').each(function() { //each items is state
            console.log('UL STATE TAG: ', $(this)); 
            $(this).children('ul').children('li').each(function() { //each items is domain
              var domainName = $(this).children('a').text();
              var domainli = $(this);
              $('#select-domain-ul').children('li').each(function() {
                if($(this).text() == domainName && $(this).hasClass('selected')) {//loop through domain checkboxes list & expand only those domains
                  console.log('UL DOMAIN TAG: ', domainli);
                  // console.log('DOMAIN NAME: ', domainli.text());
                  console.log('DOMAIN NAME1: ', domainName);
                  domainli.attr('aria-expanded', true);
                  domainli.children('a').removeClass('tree-parent-collapsed');
                  // $(this).children('ul').removeClass('tree-group-collapsed');
                  //move up to state
                  domainli.parent().removeClass('tree-group-collapsed'); //domain ul
                  domainli.parent().parent().children('a').removeClass('tree-parent-collapsed');
                  domainli.parent().parent().attr('aria-expanded', true);
                  //move up to country
                  var stateul = domainli.parent().parent(); //state ul
                  stateul.parent().removeClass('tree-group-collapsed'); //domain ul
                  stateul.parent().parent().children('a').removeClass('tree-parent-collapsed');
                  stateul.parent().parent().attr('aria-expanded', true);
                }
              });             
            });
          });
        })        
      } else {
        $(liTag).attr('aria-expanded', false);
        $(liTag).children('a').addClass('tree-parent-collapsed');
        $(liTag).children('ul').addClass('tree-group-collapsed');
      }
    } else if (selectedGeo != 'All') {
      if (isExpand) {
        $('#select-geo-ul').children('li').each(function() {
          if($(this).text() == geo && $(this).hasClass('selected')) {//only selected geo
            $(liTag).attr('aria-expanded', true);
            $(liTag).children('a').removeClass('tree-parent-collapsed');
            $(liTag).children('ul').removeClass('tree-group-collapsed');
            //liTag is Geography
            $(liTag).children('ul').children('li').each(function() { //each items is country        
              console.log('UL COUNTRY TAG: ', $(this)); 
              $(this).children('ul').children('li').each(function() { //each items is state
                console.log('UL STATE TAG: ', $(this)); 
                $(this).children('ul').children('li').each(function() { //each items is domain
                  var domainName = $(this).children('a').text();
                  var domainli = $(this);
                  $('#select-domain-ul').children('li').each(function() {
                    if($(this).text() == domainName && $(this).hasClass('selected')) {//loop through domain checkboxes list & expand only those domains
                      console.log('DOMAIN NAME1: ', domainName);
                      domainli.attr('aria-expanded', true);
                      domainli.children('a').removeClass('tree-parent-collapsed');
                      // $(this).children('ul').removeClass('tree-group-collapsed');
                      //move up to state
                      domainli.parent().removeClass('tree-group-collapsed'); //domain ul
                      domainli.parent().parent().children('a').removeClass('tree-parent-collapsed');
                      domainli.parent().parent().attr('aria-expanded', true);
                      //move up to country
                      var stateul = domainli.parent().parent(); //state ul
                      stateul.parent().removeClass('tree-group-collapsed'); //domain ul
                      stateul.parent().parent().children('a').removeClass('tree-parent-collapsed');
                      stateul.parent().parent().attr('aria-expanded', true);
                    }
                  });             
                });
              });
            });
          }
        });  
      } else {
        $(liTag).attr('aria-expanded', false);
        $(liTag).children('a').addClass('tree-parent-collapsed');
        $(liTag).children('ul').addClass('tree-group-collapsed');
      }
    }
  });
},

reset: function(){
  $('#select-geo-ul').find('.selected').each( function() {
     $(this).removeClass('selected');
  });
  $('#select-domain-ul').find('.selected').each( function() {
     $(this).removeClass('selected');
  });
  $('#select-status-ul').find('.selected').each( function() {
     $(this).removeClass('selected');
  });
  
  $('.map-regions-container').find("svg #asiapacific.continent").removeClass('selected');
  $('.map-regions-container').find("svg #northamerica.continent").removeClass('selected');
  $('.map-regions-container').find("svg #middleeast.continent").removeClass('selected');
  $('.map-regions-container').find("svg #europe.continent").removeClass('selected');
   $('.map-regions-container').find("svg .continent").removeClass('selected');



  this.treeList.colGeoGraphy = new Backbone.Collection(this.treeList.igeo.toJSON());
  this.treeList.colDomain = new Backbone.Collection(this.treeList.idomain.toJSON());
  $('#breadcrumb').text('');      
  $('#panelFooter').empty();
  $('#rendersec , #Textdiv').remove();  //remove download form & button    
  $("#canvas").children().remove();
  $("#canvas").unbind();
  $("#treeCanvas").empty();
  this.treeList.reset();
  this.treeList.render();
},

renderDomainGeo : function(){
     //Access button passing
    

  if(this.mode == 2){
    var gname=app.ClientAppRouter.gname;
    var dname=app.ClientAppRouter.dname;
    var did= app.ClientAppRouter.domainid;
    console.log("printing gname dname did",gname,dname,did);
     $('#select-domain-ul').find('.select-domain').each(function(){
            var curname= $(this).text();
            console.log("compare the name",curname,dname);
          if(curname === dname){
            console.log("inside the class");
            $(this).addClass('selected');
          }
           
        });

         $('#select-geo-ul').children('li').each(function(){
            if(gname == "All") {

            } else if($(this).text() != gname){
              $(this).removeClass('selected');
            }
           else if(gname == "Asia Pacific"){
                $("svg #northamerica.continent").removeClass("selected");
                $("svg #middleeast.continent").removeClass("selected");
                 $("svg #europe.continent").removeClass("selected");
              }else if(gname == "United States"){
                 $("svg #asiapacific.continent").removeClass("selected");
                $("svg #middleeast.continent").removeClass("selected");
                 $("svg #europe.continent").removeClass("selected");
              }else if(gname == "Middle East"){
                 $("svg #asiapacific.continent").removeClass("selected");
                 $("svg #northamerica.continent").removeClass("selected");
                 $("svg #europe.continent").removeClass("selected");
               }else if(gname == "European Union"){
                 $("svg #asiapacific.continent").removeClass("selected");
                 $("svg #northamerica.continent").removeClass("selected");
                 $("svg #middleeast.continent").removeClass("selected");
               }

            
        });     


        //  $('#select-geo-ul').find('.all').each(function(){
        //     var curname= $(this).text();
        //     console.log("compare the name",curname,gname);
        //   if(curname === gname){
        //      console.log("inside the class");
        //      $(this).addClass('selected');
        //   }

        // });  
    }   
    else if(this.mode == 1){
    var gname=app.ClientAppRouter.gname;
    var dname=app.ClientAppRouter.dname;
    var did= app.ClientAppRouter.domainid;
    console.log("printing gname dname did",gname,dname,did);
       $('#select-domain-ul').find('.select-domain').each(function(){
            var curname= $(this).text();
            console.log("compare the name",curname,dname);
          if(curname === dname){
            console.log("inside the class");
            $(this).addClass('selected');
          }
           
        });

         $('#select-geo-ul').children('li').each(function(){
            if(gname == "All") {

            } else if($(this).text() != gname){
              $(this).removeClass('selected');
            }
           else if(gname == "Asia Pacific"){
                $("svg #northamerica.continent").removeClass("selected");
                $("svg #middleeast.continent").removeClass("selected");
                 $("svg #europe.continent").removeClass("selected");
              }else if(gname == "United States"){
                 $("svg #asiapacific.continent").removeClass("selected");
                $("svg #middleeast.continent").removeClass("selected");
                 $("svg #europe.continent").removeClass("selected");
              }else if(gname == "Middle East"){
                 $("svg #asiapacific.continent").removeClass("selected");
                 $("svg #northamerica.continent").removeClass("selected");
                 $("svg #europe.continent").removeClass("selected");
               }else if(gname == "European Union"){
                 $("svg #asiapacific.continent").removeClass("selected");
                 $("svg #northamerica.continent").removeClass("selected");
                 $("svg #middleeast.continent").removeClass("selected");
               }
            
        });     

    }
},

	regsearch : function(){
	console.log("test");
	if(app.ClientAppRouter.searchname == "search"){
        console.log(app.ClientAppRouter.SearchKey);
        routeCalled('showSearch/'+ searchKey);
        var searchKey = app.ClientAppRouter.SearchKey;
         console.log('Click:searchKey:' + searchKey);
         if (searchKey != '') {
           appRouter.navigate("showSearch/" + searchKey, {trigger: true, replace: true});
         }
	}

else if(app.ClientAppRouter.searchname == "advancesearch")
{
app.ClientAppRouter.origin = 1;
appRouter.navigate("advancesearch", {trigger: true, replace: true});
}
}

});
