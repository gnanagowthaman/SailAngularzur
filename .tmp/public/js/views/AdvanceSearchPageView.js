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
//    this.libraryCollection = new app.LibraryList();
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

    this.templ  = "<ul class='selectGeo'></ul>";
    this.templ1 = "<ul class='selectCountry'></ul>";
    this.templ2 = "<ul class='selectState'></ul>";
    this.templ3 = "<ul class='selectDomain'></ul>";
    this.templ4 = "<ul class='selectRegulator'></ul>";
    this.templ5 = "<ul class='selectReg'></ul>";
    //this.templ2 = "<option id='' value=''></option>";   
    _.bindAll(this, "render");
    _.bindAll(this, "BacktoAdvancesearch");
    this.searchCollection = new app.SearchList();
    this.trail = new app.TrailModel();
    app.ClientAppRouter.trail_user=false;
    this.render();
  },

  events: {
    'click #search' : 'searchFile',
    'click #clear'   : 'clearfile',
    'click .selectGeo li' : 'Selectedgeo',
    'click .selectCountry li' : 'Selectedcountry',
    'click .selectState li' : 'Selectedstate',
    'click .selectDomain li' : 'Selecteddomain',
    'click .selectRegulator li' : 'Selectedregulator',
    'click .selectReg li' : 'Selectedregulation',
    'click .showDocument': 'showDocumentInTreeView',
    'click #back2search':'BacktoAdvancesearch',
    'click .trail_download':'trailuser_check',

    },

  render: function() {     
    var _self = this;
    this.$el.html(this.template); 
    advanceSearchCheckbox();
    // trail=new app.TrailModel();
    //   trail.fetch({
    //     success:function(data){
    //       console.log("for checking the data", data);
    //       if(data.permission_id === 6){

    //         app.ClientAppRouter.trail_user=true;
    //       }
    //     },

    //     error:function(data){
    //       console.log("check the error section", data);
    //     }
    //   });

//if(app.ClientAppRouter.origin ==1 ){
  //     _self.geoCollection =  app.ClientAppRouter.geoCollection;
   //    _self.countryCollection =  app.ClientAppRouter.countryCollection;
   //    _self.stateCollection =  app.ClientAppRouter.stateCollection;
   //    _self.domainCollection = app.ClientAppRouter.domainCollection;
   //    _self.regulatorCollection = app.ClientAppRouter.regulatorCollection;
   //    _self.regulationCollection =  app.ClientAppRouter.regulationCollection;
   //    console.log("searchkeymass",app.ClientAppRouter.searchKey);
    //    $("#searchkeymass").val(app.ClientAppRouter.searchKey);
   //    _self.drawGeo(_self.geoCollection);
   //    _self.searchFile();
   //  }

//else{
      $.when(_self.searchcollection.fetch(), _self.trail.fetch()).done(function() {
      if (_self.searchcollection.length > 0) {
        console.log("length",_self.searchcollection.length);
        _self.geoCollection =_self.searchcollection.at(0).get('geoCollection');
        _self.countryCollection =_self.searchcollection.at(0).get('countryCollection');
        _self.stateCollection =_self.searchcollection.at(0).get('stateCollection');
        _self.domainCollection =_self.searchcollection.at(0).get('domainCollection');
        _self.regulatorCollection = _self.searchcollection.at(0).get('regulatorCollection');
        _self.regulationCollection = _self.searchcollection.at(0).get('regulationCollection');
        console.log("searchcollection ::::1 ",JSON.stringify(_self.searchcollection));
        console.log("for checking searchcollection",_self.searchcollection.at(0));
        console.log("for checking searchcollection :::1 ",_self.searchcollection.at(0).get('regulationCollection'));
        app.ClientAppRouter.geoCollection=_self.geoCollection;
        app.ClientAppRouter.countryCollection=_self.countryCollection;
        app.ClientAppRouter.stateCollection= _self.stateCollection;
        app.ClientAppRouter.domainCollection=_self.domainCollection;
        app.ClientAppRouter.regulatorCollection=_self.regulatorCollection;
        app.ClientAppRouter.regulationCollection =_self.regulationCollection;
        _self.drawGeo(_self.geoCollection);
        if(app.ClientAppRouter.origin == 1){
 //         _self.searchFile();
    $("#searchkeymass").val(app.ClientAppRouter.searchKey);
           console.log(app.ClientAppRouter.selectgeolist);
      var selectgeolist =app.ClientAppRouter.selectgeolist;
     console.log(selectgeolist.length);
     for(var i = 0;i<selectgeolist.length;i++){
      var gid=selectgeolist[i].gid;
      $(".selectGeo li").each(function(){
       var gid1 = $(this).val();
       console.log(gid1);
        if(gid==gid1){
            $(this).addClass('selected');
          _self.loadcountry(gid1);
  }
       });
  }
 var selectcountrylist = app.ClientAppRouter.selectcountrylist;
      for(var i = 0;i<selectgeolist.length;i++){
      var gid=selectgeolist[i].gid;
      for(var j=0 ;j<selectcountrylist.length;j++){
       var cnid=selectcountrylist[j].cnid;
       $(".selectCountry li").each(function(){
        var cnid1 = $(this).val();
        console.log(gid);
         if(cnid==cnid1){
             $(this).addClass('selected');
           _self.loadstate(cnid1,gid);
   }
        });
   }
 }

         var selectstatelist = app.ClientAppRouter.selectstatelist;
        console.log(selectgeolist.length);
        for(var i = 0;i<selectgeolist.length;i++){
        var gid=selectgeolist[i].gid;
        for(var j=0 ;j<selectcountrylist.length;j++){
         var cnid=selectcountrylist[j].cnid;
        for(var k=0;k<selectstatelist.length;k++){
          var sid=selectstatelist[k].stid;
         $('.selectState li').each(function(){
          var sid1 = $(this).val();
          console.log(sid,sid1);
           if(sid==sid1){
               $(this).addClass('selected');
             _self.loaddomain(sid,gid);
     }
         });
 }
  }
   }
var selectdomainlist = app.ClientAppRouter.selectdomainlist;
      console.log(selectgeolist.length);
      for(var i = 0;i<selectgeolist.length;i++){
       var gid=selectgeolist[i].gid;
      for(var j=0;j<selectdomainlist.length;j++){
        var did = selectdomainlist[j].did;
       $(".selectDomain li").each(function(){
        var did1 = $(this).val();
        console.log(gid);
         if(did==did1){
             $(this).addClass('selected');
           _self.loadregulator(did,gid);
   } 
       });
   }}

         var selectregulatorlist = app.ClientAppRouter.selectregulatorlist;
        console.log(selectgeolist.length);
        for(var i = 0;i<selectgeolist.length;i++){
         var gid=selectgeolist[i].gid;
        for(var k =0;k<selectdomainlist.length;k++){
        var did = selectdomainlist[k].did;
        for(var j=0;j<selectregulatorlist.length;j++){
          var rid = selectregulatorlist[j].rtorid;
         $(".selectRegulator li").each(function(){
          var rid1 = $(this).val();
          console.log(gid);
           if(rid==rid1){
               $(this).addClass('selected');
             _self.loadregulation(rid,gid,did);
     }
          });
     }}}

_self.searchFile();
} 
        console.log('TRAIL: ', _self.trail.get('permission_id'));
        if (_self.trail.get('permission_id') == 6) {
          app.ClientAppRouter.trail_user=true;  
        }         
      }
    });
//} 
    return this;
  },

  drawGeo: function(geo) {
    var selectel = $('.selectGeo'); 
    var exists = false;
    var _self = this;
    for(i=0;i<geo.length;i++) {
      selectel.append($('<li id="" class="item" value="'+ geo[i].id +'">'+ geo[i].name+'</li>'));
    }

   if(app.ClientAppRouter.origin == 1){
   console.log(app.ClientAppRouter.selectgeolist);
 // var selectgeolist =app.ClientAppRouter.selectgeolist;
// console.log(selectgeolist.length);
// for(var i = 0;i<selectgeolist.length;i++){
 // var gid=selectgeolist[i].gid;
  //$(".selectGeo li").each(function(){
  // var gid1 = $(this).val();
  // console.log(gid1);
  //  if(gid==gid1){
  //      $(this).addClass('selected');
  //    _self.loadcountry(gid1);
//}
  //   });
//}
return selectel;
 }   
    ADsearchview = this.$el.html();
  },

  Selectedgeo: function(e){
    e.preventDefault();
    console.log("geo selected ::", $(e.target).text() + $(e.target).val());
    var _self = this;

    // var geoID = $(e.target);
    // $("#selectedcountryoption").empty();
    // $("#selectedcountryoption").unbind();
    // var selectel1 = $(this.templ1).clone();
    
    // $("#selectedcountryoption").append($(selectel1));
    // query_formation=[];
    if ($(e.target).hasClass('selected')) {
      $(e.target).removeClass('selected');
    } else {
      $(e.target).addClass('selected');
    }
    // $('.selectGeo li').each(function() {  
      if ($(e.target).hasClass('selected')) {
        // console.log("Check geoid inside the looping", $(this).text(), $(this).val());
        // query_formation.push({"gname":$(this).text(), "gid":$(this).val()})
        // console.log("For checking the gname section", query_formation);
        // _self.loadcountry($(e.target).val(),selectel1); 
        _self.loadcountry($(e.target).val());              
      } else { //remove all domains, its childrens & filter & re-render domains only by selected state
        $(".selectCountry").empty();
        $(".selectCountry").unbind();
        $(".selectState").empty();
        $(".selectState").unbind();
        $(".selectDomain").empty();
        $(".selectDomain").unbind();
        $(".selectRegulator").empty();
        $(".selectRegulator").unbind();
        $(".selectReg").empty();
        $(".selectReg").unbind();                  
        $(".selectGeo").find('li.selected').each(function(){       
          _self.loadcountry($(this).val());
        });

      }    
      // }); 
  
      // var geodata=$(".selectGeo").find('li.selected').text();
      // console.log("SelectGeo ::" + geodata);
      // console.log('QUERY_FORMATION', query_formation);
  },

  loadcountry: function(geoID){
    console.log("SELECTED GEO-ID", geoID);
    var _self = this;
    var selectel1 = $('.selectCountry');        
    var countrydat = new Backbone.Collection(_self.countryCollection).where({gid:geoID});
    console.log(countrydat);
    var countryByGeoList = new Backbone.Collection(countrydat);
    if ( countrydat == undefined || countrydat.length ==0) {
      _self.loadstate(23, geoID);
    } else if (countrydat.length > 0) {
      // NEW CODE commented by Niranjan
      // console.log('Countries: ', countryByGeoList);
      // //check "ALL" country is already selected. If yes don't add again in country list
      // var isAllAdded = false;
      // $('.selectCountry  li').each(function() {
      //   if ($(this).text() == 'ALL') {
      //     isAllAdded = true;
      //   }
      // });
      // countryByGeoList.each(function(item) {
      //   if (!isAllAdded && item.get('name') == 'ALL') {
      //     selectel1.append($('<li class="item" gid="'+geoID+'" id="" value="'+ item.get('cntid') +'">'+ item.get('name')+'</li>'));          
      //   } else if (item.get('name') != 'ALL') {
      //     selectel1.append($('<li class="item" gid="'+geoID+'" id="" value="'+ item.get('cntid') +'">'+ item.get('name')+'</li>'));          
      //   }        
      // }, this);

      //OLD CODE uncommeted by Niranjan
      for(i=0;i<_self.countryCollection.length;i++) {
        var  exists=false;             
        if(_self.countryCollection[i].gid == geoID) {           
            $('.selectCountry  li').each(function() {  
              console.log('select country',$(this).text());
              var txt =$(this).text();
              if (txt == _self.countryCollection[i].name) { 
                var geogid = $(this).attr('gid');
                if (geogid !=geoID ){
               console.log("inside the attributes");
               $(this).removeClass('selected');
              var selectedGids = $(this).attr('sgid');
              if (selectedGids) {
                selectedGids = selectedGids + ',' + geoID;
                $(this).attr('sgid', selectedGids);
              } else {
                $(this).attr('sgid', geoID+'');
              }
                  $(".selectState").empty();
                  $(".selectState").unbind();
                  $(".selectDomain").empty();
                  $(".selectDomain").unbind();
                  $(".selectRegulator").empty();
                  $(".selectRegulator").unbind();
                  $(".selectReg").empty();
                  $(".selectReg").unbind();            
             }
                 exists = true;
              }              
            });   
            if(exists == false)  selectel1.append($('<li class="item" gid="'+geoID+'" id="" value="'+ _self.countryCollection[i].cntid +'">'+ _self.countryCollection[i].name+'</li>'));
        }
      }
 if(app.ClientAppRouter.origin == 1){
 //    console.log(app.ClientAppRouter.selectgeolist);
 //     var selectgeolist =app.ClientAppRouter.selectgeolist;
 //     var selectcountrylist = app.ClientAppRouter.selectcountrylist;
 //    console.log(selectgeolist.length);
 //    for(var i = 0;i<selectgeolist.length;i++){
 //    var gid=selectgeolist[i].gid; 
 //    for(var j=0 ;j<selectcountrylist.length;j++){
 //     var cnid=selectcountrylist[j].cnid;
 //     $(".selectCountry li").each(function(){
 //      var cnid1 = $(this).val();
 //      console.log(gid);
 //       if(cnid==cnid1){
 //           $(this).addClass('selected');
 //         _self.loadstate(cnid1,gid);
 // }    
  //     });
//  }
//  }
  } 

return selectel1;
    }
  },

  Selectedcountry: function(e) {
    e.preventDefault();
    console.log("country selected ::", $(e.target).text() + $(e.target).val());
    var _self = this;
    // $("#selectedstateoption").empty();
    // $("#selectedstateoption").unbind();
    // var selectel1 = $(this.templ2);
    // $("#selectedstateoption").append($(selectel1)); 
    // advanceSearchCheckbox();

    if ($(e.target).hasClass('selected')) {
      $(e.target).removeClass('selected');
    } else {
      $(e.target).addClass('selected');
    }
    if ($(e.target).hasClass('selected')) {
      _self.loadstate($(e.target).val(), $(e.target).attr('gid')); 


      $('.selectCountry').find('li.selected').each(function(){
        var geoclass = $(this).attr('sgid');
        if ( geoclass != undefined){
        var geosplit = geoclass.split(',');
        console.log("domclass",geosplit);
        geosplit.forEach(function(item){
            console.log("for each split",$(e.target).val(),item);
             _self.loadstate($(e.target).val(),item);
          }); 
      }    
      });             
    } else { //remove all domains, its childrens & filter & re-render domains only by selected state
      $(".selectState").empty();
      $(".selectState").unbind();
      $(".selectDomain").empty();
      $(".selectDomain").unbind();
      $(".selectRegulator").empty();
      $(".selectRegulator").unbind();
      $(".selectReg").empty();
      $(".selectReg").unbind();     
       $('.selectCountry').find('li.selected').each(function(){
        var geoclass =$(this).attr('gid');
        if (geoclass  != undefined ){
          console.log("domclass",geoclass);
           _self.loadstate($(this).val(),geoclass);
           var regval =$(this).val() ;
        }
        var geoclass = $(this).attr('sgid');
        if (geoclass){
           var geosplit = geoclass.split(',');
        console.log("domclass",geosplit);
        geosplit.forEach(function(item){
            console.log("for each split",regval,item);
             _self.loadstate(regval,item);
          });
       }
      });             
      // $(".selectCountry").find('li.selected').each(function(){       
      //   _self.loadstate($(this).val());
      // });

    }     

    // $('.selectCountry li').each(function(){  
    //   if($(this).hasClass('selected')){
    //     console.log("For checking the cname section", query_formation)
    //     cname= $(this).text();
    //     gname=$(this).attr('gn')
    //     cid=$(this).attr('value')
    //     console.log("check the cname section", cname,gname);

    //     _self.query_iteration("gid",gname,"cname", cname);
    //     _self.query_iteration("gid",gname,"cnid", cid);
                          
    //       //selectel1.append($('<option id="" value="'+ _self.countryCollection[i].cid +'">'+ _self.countryCollection[i].name+'</option>'));
    //      // selectel1.append($('<li class="item" id="" value="'+ _self.countryCollection[i].cntid +'">'+ _self.countryCollection[i].name+'</li>'));
    //        //advanceSearchCheckbox(); 
    //       _self.loadstate($(this).val(),selectel1,gname);
    //   }
    // }); 
         
   // $("#selectedstateoption").append($(selectel1));
    // var countrydata=$(".selectCountry").find('li.selected').text();
    // console.log("countrydata",countrydata);
    // console.log('QUERY_FORMATION-c', query_formation);
  },

  loadstate: function(countryID, geoID){
    console.log("SELECTED GEO-ID, COUNTRY_ID: ", geoID + ', ' + countryID);
    var _self = this;
    var selectel1 = $('.selectState');
    // console.log("countryID",countryID);
    // console.log("countryID.length",countryID.length);
    // console.log("check the state collection", _self.stateCollection);
    // console.log("check the state collection length", _self.stateCollection.length);

    var statedat = new Backbone.Collection(_self.stateCollection).where({cntid:countryID});
    // console.log("state collection",statedat,statedat.length);
    // var stateByGeoList = new Backbone.Collection(statedat);
    if ( statedat == undefined || statedat.length ==0) {
        // _self.query_iteration("cnid",countryID,"stname", '-');
        // _self.query_iteration("cnid",countryID,"sid", 23);           
        // $("#selecteddomainoption").empty();
        //  $("#selecteddomainoption").unbind();
        // var selectel1 = $(this.templ3);
        // $("#selecteddomainoption").append($(selectel1)); 
      _self.loaddomain(18,geoID);
    } else if(statedat.length > 0) {
      // console.log('States: ', stateByGeoList);
      //NEW CODE commented by Niranjan
      // //check "ALL" country is already selected. If yes don't add again in country list
      // var isAllAdded = false;
      // $('.selectState  li').each(function() {
      //   if ($(this).text() == 'ALL') {
      //     isAllAdded = true;
      //   }
      // });
      // stateByGeoList.each(function(item) {
      //   if (!isAllAdded && item.get('name') == 'ALL') {
      //     selectel1.append($('<li class="item" id="" gid="'+geoID+'" cid="'+ item.get('cntid') +'" value="'+ item.get('sid') +'">'+ item.get('name')+'</li>'));          
      //   } else if (item.get('name') != 'ALL') {
      //     selectel1.append($('<li class="item" id="" gid="'+geoID+'" cid="'+ item.get('cntid') +'" value="'+ item.get('sid') +'">'+ item.get('name')+'</li>'));          
      //   }        
      // }, this);

      //OLD CODE - uncommented by Niranjan
      for(i=0;i<_self.stateCollection.length;i++){
          console.log("check the loadstate", _self.stateCollection[i].cntid, countryID);
          if((_self.stateCollection[i].cntid == countryID) && (_self.stateCollection[i].gid == geoID)){   
              var exists = false;
              $('.selectState  li').each(function()
              {  
                 console.log('select state',$(this).text());
                var txt =$(this).text();
                console.log("check the text in loadstate, ", txt, _self.stateCollection[i].name);
                if (txt == _self.stateCollection[i].name)
                { 

                var geogid = $(this).attr('gid');
                if (geogid !=geoID ){
               console.log("inside the attributes");
               $(this).removeClass('selected');
              var selectedGids = $(this).attr('sgid');
              if (selectedGids) {
                selectedGids = selectedGids + ',' + geoID;
                $(this).attr('sgid', selectedGids);
              } else {
                $(this).attr('sgid', geoID+'');
              }
                  $(".selectDomain").empty();
                  $(".selectDomain").unbind();
                  $(".selectRegulator").empty();
                  $(".selectRegulator").unbind();
                  $(".selectReg").empty();
                  $(".selectReg").unbind();            
             }
                  exists = true;
                }
              });   
              if(exists == false) selectel1.append($('<li class="item" id="" gid="'+geoID+'" cid="'+ _self.stateCollection[i].cntid +'" value="'+ _self.stateCollection[i].sid +'">'+ _self.stateCollection[i].name+'</li>'));          
          }               
      }
 if(app.ClientAppRouter.origin == 1){
   //   console.log(app.ClientAppRouter.selectstatelist);
   //     var selectgeolist =app.ClientAppRouter.selectgeolist;
   //     var selectcountrylist = app.ClientAppRouter.selectcountrylist;
   //     var selectstatelist = app.ClientAppRouter.selectstatelist;
   //    console.log(selectgeolist.length);
   //    for(var i = 0;i<selectgeolist.length;i++){
   //    var gid=selectgeolist[i].gid;
   //    for(var j=0 ;j<selectcountrylist.length;j++){
   //     var cnid=selectcountrylist[j].cnid;
   //    for(var k=0;k<selectstatelist.length;k++){
   //      var sid=selectstatelist[k].stid;
   //     $('.selectState li').each(function(){
   //      var sid1 = $(this).val();
   //      console.log(sid,sid1);
   //       if(sid==sid1){
   //           $(this).addClass('selected');
   //         _self.loaddomain(sid,gid);
   // }
     //    });
  //  }   
// }
//  }
return selectel1; 
  }     

}
  },

  Selectedstate: function(e){
    e.preventDefault();
    console.log("state selected ::", $(e.target).text() + $(e.target).val());
    var _self = this;      
      // var _self = this;
      // e.preventDefault();
      // var stateID = $(e.target);
      // $("#selecteddomainoption").empty();
      // $("#selecteddomainoption").unbind();
      // var selectel1 = $(this.templ3);
      // $("#selecteddomainoption").append($(selectel1));
       
    if($(e.target).hasClass('selected')){
      $(e.target).removeClass('selected');
    } else {
      $(e.target).addClass('selected');
    }
    if ($(e.target).hasClass('selected')) {
      _self.loaddomain($(e.target).val(), $(e.target).attr('gid'));    
       $('.selectState').find('li.selected').each(function(){
        var geoclass = $(this).attr('sgid');
        if ( geoclass != undefined){
        var geosplit = geoclass.split(',');
        console.log("domclass",geosplit);
        geosplit.forEach(function(item){
            console.log("for each split",$(e.target).val(),item);
             _self.loaddomain($(e.target).val(),item);
          }); 
      }    
      });              
    } else { //remove all domains, its childrens & filter & re-render domains only by selected state

      $('.selectDomain').find('li.selected').each(function(){
        var geoclass =$(this).attr('gid');
        if (geoclass  != undefined ){
          console.log("domclass",geoclass);
           _self.loaddomain($(this).val(),geoclass);
           var regval =$(this).val() ;
        }
        var geoclass = $(this).attr('sgid');
        if (geoclass){
           var geosplit = geoclass.split(',');
        console.log("domclass",geosplit);
        geosplit.forEach(function(item){
            console.log("for each split",regval,item);
             _self.loaddomain(regval,item);
          });
       }
      });
      // $('.selectState').find('li.selected').each(function(){
      //   var geoclass = $(this).attr('gid');
      //   if ( geoclass == undefined  ){
      //      var geoclass = $(this).find('li').attr('class').split(' ')[3];
      //      }
      //   $(".selectDomain").empty();
      //   $(".selectDomain").unbind();
      //   $(".selectRegulator").empty();
      //   $(".selectRegulator").unbind();
      //   $(".selectReg").empty();
      //   $(".selectReg").unbind();      
      //   console.log("domclass",geoclass);
      //   $(this).find('li.selected').each(function() {  
      //   console.log("domclass",geoclass,$(this).val());     
      //     _self.loaddomain($(this).val(),geoclass);
      //   });
      // });
      // $(".selectDomain").empty();
      // $(".selectDomain").unbind();
      // $(".selectRegulator").empty();
      // $(".selectRegulator").unbind();
      // $(".selectReg").empty();
      // $(".selectReg").unbind();                  
      // $(".selectState").find('li.selected').each(function(){       
      //   _self.loaddomain($(this).val());
      // });

    }       
      // $('.selectState li').each(function(){
      //   if($(this).hasClass('selected')){
      //     console.log("option",$(this).val());
      //      gname=$(this).attr('gn');
      //      cid=$(this).attr('cid');
      //      console.log("For checking the state", $(this).val(), $(this).text());
      //     _self.query_iteration('cnid',cid,'stname',$(this).text());
      //     _self.query_iteration('cnid',cid,'sid',$(this).val());
      //     console.log("For checking the sname section", query_formation);
      //     // selectel1.append($('<li class="item" id="" value="'+ _self.stateCollection[i].cntid +'">'+ _self.stateCollection[i].name+'</li>'));
      //     // advanceSearchCheckbox();
      //     _self.loaddomain($(this).val(),selectel1,gname);
        
      //   }
      // }); 

     // var statedata=$("#selectState").find('li.selected').text();
     // console.log(statedata);
     // console.log('QUERY_FORMATION-st', query_formation);
    },

  loaddomain: function(stateID, geoID){
    var _self = this;
    var selectel1 = $('.selectDomain');
    console.log("SELECTED GEO-ID, STATE_ID: ", geoID + ', ' + stateID);
    for (i=0;i<_self.domainCollection.length;i++) {
      if (_self.domainCollection[i].sid == stateID && (_self.domainCollection[i].gid == geoID)) {                
        var exists = false;
        $('.selectDomain  li').each(function() {
          var dname =$(this).text();
          console.log('select domain',dname);  
           $(this).removeClass('selected');                      
          if (dname == _self.domainCollection[i].dname) {

            var geodid = $('.selectDomain li').attr('gid');
             if(geodid != geoID){
              console.log("inside the attributes");
             // $(this).addClass('gid = '+geoID);
              var selectedGids = $(this).attr('sgid');
              if (selectedGids) {
                selectedGids = selectedGids + ',' + geoID;
                $(this).attr('sgid', selectedGids);
              } else {
                $(this).attr('sgid', geoID+'');
              }
              $(".selectRegulator").empty();
              $(".selectRegulator").unbind();
              $(".selectReg").empty();
              $(".selectReg").unbind();        
             }
            exists = true;
          }
        });
        if( exists == false)  selectel1.append($('<li class="item" id="" gid="'+geoID+'"stid="'+stateID+'" value="'+ _self.domainCollection[i].did +'">'+ _self.domainCollection[i].dname+'</li>'));
      } 
    }

 if(app.ClientAppRouter.origin == 1){
   //  console.log(app.ClientAppRouter.selectgeolist);
  //    var selectgeolist =app.ClientAppRouter.selectgeolist;
  //    var selectdomainlist = app.ClientAppRouter.selectdomainlist;
  //   console.log(selectgeolist.length);
  //   for(var i = 0;i<selectgeolist.length;i++){
  //    var gid=selectgeolist[i].gid;
   //  for(var j=0;j<selectdomainlist.length;j++){
    //   var did = selectdomainlist[j].did;
   //   $(".selectDomain li").each(function(){
   //    var did1 = $(this).val();
    //   console.log(gid);
      //  if(did==did1){
   //         $(this).addClass('selected');
    //      _self.loadregulator(did,gid);
 // }    
   //    });
 // }}

return selectel1;
  } 

    // var _self = this;
    // for(i=0;i<_self.domainCollection.length;i++) {
    //   if(_self.domainCollection[i].sid == stateID && (_self.domainCollection[i].gid == geoID)) {                
    //     var exists = false;
    //     $('.selectDomain  li').each(function() {
    //       console.log('select domain',$(this).text());
    //       var txt =$(this).text();              
    //       if (txt == _self.domainCollection[i].dname) {
    //         exists = true;
    //       }
    //     });
    //     if( exists == false)  selectel1.append($('<li class="item" id="" stid="'+stateID+'" value="'+ _self.domainCollection[i].did +'">'+ _self.domainCollection[i].dname+'</li>'));
    //   } 
    //   console.log("check country collection", _self.domainCollection)
    // }

  },

  Selecteddomain: function(e) {
    e.preventDefault();
    console.log("domain selected ::", $(e.target).text() + $(e.target).val());
    var _self = this;      
    if($(e.target).hasClass('selected')){
      $(e.target).removeClass('selected');
    } else {
      $(e.target).addClass('selected');
    }
    if ($(e.target).hasClass('selected')) {
      _self.loadregulator($(e.target).val(),$(e.target).attr('gid')); 

      // $('.selectDomain li.gid').each(function(){
      //   var geoclass = $(this).attr('class').split(' ')[3];
      //   console.log("domclass",domclass);
      //   if ( geoclass != undefined  ){
      //   console.log("inside the domclass");
      //   _self.loadregulation($(e.target).val(),geoclass);
      // }    
      // });

      $('.selectDomain').find('li.selected').each(function(){
        var geoclass = $(this).attr('sgid');
        if ( geoclass != undefined){
        var geosplit = geoclass.split(',');
        console.log("domclass",geosplit);
        geosplit.forEach(function(item){
            console.log("for each split",$(e.target).val(),item);
             _self.loadregulator($(e.target).val(),item);
          }); 
      }    
      });

    } else { //remove all regulators, its childrens & filter & re-render regulator only by selected domain
        $(".selectRegulator").empty();
        $(".selectRegulator").unbind();
        $(".selectReg").empty();
        $(".selectReg").unbind(); 
       $('.selectDomain').find('li.selected').each(function(){
        var geoclass =$(this).attr('gid');
        if (geoclass  != undefined ){
          console.log("domclass",geoclass);
           _self.loadregulator($(this).val(),geoclass);
           var regval =$(this).val() ;
        }
        var geoclass = $(this).attr('sgid');
        if (geoclass){
           var geosplit = geoclass.split(',');
        console.log("domclass",geosplit);
        geosplit.forEach(function(item){
            console.log("for each split",regval,item);
             _self.loadregulator(regval,item);
          });
       }
      });
 
      // $('.selectDomain').each(function(){
      //   var geoclass = $(this).find('li').attr('gid');
      //   if ( geoclass == undefined  ){
      //      var geoclass = $(this).find('li').attr('class').split(' ')[3];
      //      }
                 
      //       console.log("domclass",geoclass);
      //       $(this).find('li.selected').each(function() {  
      //       console.log("domclass",geoclass,$(this).val());     
      //         _self.loadregulator($(this).val(),geoclass);
      //       });
      // });
     
    }    
      // var _self = this;
      // e.preventDefault();
      // var domainID = $(e.target);
      // $("#selectedregulatoroption").empty();
      // $("#selectedregulatoroption").unbind();
      // var selectel1 = $(this.templ4);
      // $("#selectedregulatoroption").append($(selectel1));
      // if($(e.target).hasClass('selected')){
      //   $(e.target).removeClass('selected');
      // } else {
      //   $(e.target).addClass('selected');
      // }
      // $('.selectDomain li').each(function(){
      //   if($(this).hasClass('selected')){
      //     var stnid=$(this).attr('stid');
      //     var dname=$(this).text();
      //     console.log("for checking the", $(this).val())
      //     console.log("For check the stname and dname", stnid, dname);
      //    _self.query_iteration('sid', stnid, 'dname', dname);
      //    _self.query_iteration('sid', stnid, 'did', $(this).val());
      //    console.log("For checking the dname section", query_formation);
      //     //selectel1.append($('<li class="item" id="" value="'+ _self.domainCollection[i].cntid +'">'+ _self.domainCollection[i].name+'</li>'));
      //        _self.loadregulator($(this).val(),selectel1);
      //   }
      // }); 
      // //$("#selectedregulatoroption").append($(selectel1));
      // var domaindata=$(".selectDomain").find('li.selected').text();
      // console.log("domaindata", domaindata);
      // console.log('QUERY_FORMATION-DO', query_formation);
  },

  loadregulator: function(domainID,geoID){
    var _self = this;
    var selectel1 = $('.selectRegulator');
    console.log("SELECTED DOMAIN-ID: ", domainID);
    for (i=0;i<_self.regulatorCollection.length;i++) {
      if ((_self.regulatorCollection[i].did == domainID) && (_self.regulatorCollection[i].gid == geoID)) {                
        var exists = false;
        $('.selectRegulator  li').each(function() {
          var rname =$(this).text();
          console.log('select regulator ',rname); 
          $(this).removeClass('selected');                       
          if (rname == _self.regulatorCollection[i].rname) {
             var domaindid = $('.selectRegulator li').attr('did');
             var geogid = $('.selectRegulator li').attr('gid');
             if(domaindid != domainID ){
              console.log("inside the attributes");
              // $(this).addClass('did = '+domainID);
              // $(this).addClass('gid = '+geoID);
              var selectedGids = $(this).attr('sgid');
              if (selectedGids) {
                selectedGids = selectedGids + ',' + geoID;
                $(this).attr('sgid', selectedGids);
              } else {
                $(this).attr('sgid', geoID+'');
              }

              var selectedDids = $(this).attr('sdid');
              if (selectedDids) {
                selectedDids = selectedDids + ',' + domainID;
                $(this).attr('sdid', selectedDids);
              } else {
                $(this).attr('sdid', domainID+'');
              }
              $(".selectReg").empty();
              $(".selectReg").unbind();   
             }
             else if (geogid !=geoID ){
               console.log("inside the attributes");
              // $(this).addClass('did = '+domainID);
              // $(this).addClass('gid = '+geoID);
              var selectedGids = $(this).attr('sgid');
              if (selectedGids) {
                selectedGids = selectedGids + ',' + geoID;
                $(this).attr('sgid', selectedGids);
              } else {
                $(this).attr('sgid', geoID+'');
              }

              var selectedDids = $(this).attr('sdid');
              if (selectedDids) {
                selectedDids = selectedDids + ',' + domainID;
                $(this).attr('sdid', selectedDids);
              } else {
                $(this).attr('sdid', domainID+'');
              }
              $(".selectReg").empty();
              $(".selectReg").unbind();
             }
          exists = true;
          }
        });
        if(exists == false)  
          selectel1.append($('<li class="item" id="" gid="'+geoID+'" did="'+domainID+'" value="'+ _self.regulatorCollection[i].rid +'">'+ _self.regulatorCollection[i].rname+'</li>'));
      } 
    }

 if(app.ClientAppRouter.origin == 1){
     //  console.log(app.ClientAppRouter.selectgeolist);
     //   var selectgeolist =app.ClientAppRouter.selectgeolist;
     //   var selectdomainlist = app.ClientAppRouter.selectdomainlist;
    //    var selectregulatorlist = app.ClientAppRouter.selectregulatorlist;
   //    console.log(selectgeolist.length);
   //    for(var i = 0;i<selectgeolist.length;i++){
   //     var gid=selectgeolist[i].gid;
   //    for(var k =0;k<selectdomainlist.length;k++){
  //     var did = selectdomainlist[k].did;
  //     for(var j=0;j<selectregulatorlist.length;j++){
  //       var rid = selectregulatorlist[j].rtorid;
  //      $(".selectRegulator li").each(function(){
   //      var rid1 = $(this).val();
   //      console.log(gid);
   //       if(rid==rid1){
   //           $(this).addClass('selected');
   //         _self.loadregulation(rid,gid,did);
  // } 
   //      });
  //  }}}
return selectel1;
    } 
  //     var _self = this;
  //     var exists= false;
  //     console.log('domain id ',domainID);
  //     console.log("regulator collection length",_self.regulatorCollection.length );
  //       for(i=0;i<_self.regulatorCollection.length;i++){
  //         //console.log("_self.regulatorCollection[i].did",_self.regulatorCollection[i].did);
        
  //         if(_self.regulatorCollection[i].did == domainID ) {
  //        console.log("check the load regulator function", _self.regulatorCollection[i]);     
  //               var exists = false;
  //            $('.selectRegulator li').each(function()
  //            {   
  //               console.log('select regulator',$(this).text());
  //               var txt =$(this).text();
  //               console.log("for checking the name", txt, _self.regulatorCollection[i].rname)
  //               if (txt == _self.regulatorCollection[i].rname)
  //              {   
  //                 exists = true;
  //              }   
  //            }); 
    
  //           if(exists == false)   
  //             {
  //               console.log("testing data in regulator");
  //           selectel1.append($('<li class="item" id="" did="'+domainID+'" value="'+ _self.regulatorCollection[i].rid +'">'+ _self.regulatorCollection[i].rname+'</li>'));
            
  //          }
  //           //advanceSearchCheckbox();

  // //    $("#selectedregulatoroption").append($(selectel1));
  //          }
  //   //     console.log("check the load regulator function", _self.regulationCollection[i]); 
  //       }

  },

  Selectedregulator: function(e){
    e.preventDefault();
    console.log("regulator selected ::", $(e.target).text() + $(e.target).val());
    var _self = this;      
    if($(e.target).hasClass('selected')){
      $(e.target).removeClass('selected');
    } else {
      $(e.target).addClass('selected');
    }
    if ($(e.target).hasClass('selected')) {
      _self.loadregulation($(e.target).val(),$(e.target).attr('gid'),$(e.target).attr('did'));


      $('.selectRegulator li').each(function(){
        var domclass = $(this).attr('sdid');
        var geoclass = $(this).attr('sgid');
        if ( domclass != undefined && geoclass != undefined){
        var domsplit = domclass.split(',');
        var geosplit = geoclass.split(',');
        console.log("domclass",domsplit,geosplit);
        geosplit.forEach(function(item){
          domsplit.forEach(function(item1){
            console.log("for each split",$(e.target).val(),item,item1);
             _self.loadregulation($(e.target).val(),item,item1);
          });
        });   
       // _self.loadregulation($(e.target).val(),geoclass,domclass);
      }    
      });
              
    } else { //remove all regulations & filter & re-render regulation by selected regulator
        $(".selectReg").empty();
        $(".selectReg").unbind(); 
      $('.selectRegulator').find('li.selected').each(function(){
        var geoclass = $(this).attr('gid');
        var domclass = $(this).attr('did');
        if (geoclass  != undefined &&  domclass  != undefined){
          console.log("domclass",geoclass,domclass);
           _self.loadregulation($(this).val(),geoclass,domclass);
           var regval =$(this).val() ;
        }
        var geoclass = $(this).attr('sgid');
        var domclass = $(this).attr('sdid');
        if (geoclass && domclass){
           var geosplit = geoclass.split(',');
          var domsplit = domclass.split(',');
        console.log("domclass",domsplit,geosplit);
        geosplit.forEach(function(item){
          domsplit.forEach(function(item1){
            console.log("for each split",regval,item,item1);
             _self.loadregulation(regval,item,item1);
          });
        });   
    }
      });
 
      // $(".selectReg").empty();
      // $(".selectReg").unbind();
      // $(".selectRegulator").find('li.selected').each(function(){       
      //   _self.loadregulation($(this).val());
      // });      
    } 
  //     var _self = this;
  //     e.preventDefault();
  //     var regulatorID = $(e.target.id);
  //     $("#selectedregulationoption").empty();
  //     $("#selectedregulationoption").unbind();
  //     var selectel1 = $(this.templ5);
  //     $("#selectedregulationoption").append($(selectel1));
  //     console.log("regulator event triggers");
  //     if($(e.target).hasClass('selected')){
  //       $(e.target).removeClass('selected');
  //     } else {
  //       $(e.target).addClass('selected');
  //     }
  //     $('.selectRegulator li').each(function(){
  //       if($(this).hasClass('selected')){
  //            var did = $(this).attr('did');
  //            var rid=$(this).val();
  //            var rname=$(this).text();
  //              console.log("For checking did, rid, rname", did, rid, rname);
  //              console.log("For checking d", did, rid, rname);
  //              _self.query_iteration('did',did,'rname',rname);
  //              _self.query_iteration('did',did,'rid',rid);
  //               console.log("For checking the rname section", query_formation);
  //            //   selectel1.append($('<li class="item" id="" value="'+ _self.regulatorCollection[i].cntid +'">'+ _self.regulatorCollection[i].name+'</li>'));
         
  //               _self.loadregulation($(this).val(),selectel1);
  //         }
  //     }); 
  // //    $("#selectedregulationoption").append($(selectel1));
  //     var regulatordata=$(".selectRegulator").find('li.selected').text();
  //     console.log("TEST DATA",regulatordata);
  //     console.log('QUERY_FORMATION-RETR', query_formation);
  },

  loadregulation: function(regulatorID,geoID,domainID){
    var _self = this;
    var selectel1 = $('.selectReg');
    console.log("SELECTED REGULATOR-ID: ", regulatorID);
    for (i=0;i<_self.regulationCollection.length;i++) {
      if ((_self.regulationCollection[i].rid == regulatorID) && (_self.regulationCollection[i].did == domainID) && (_self.regulationCollection[i].gid == geoID)) {             
        var exists = false;
        $('.selectReg  li').each(function() {
          var regname =$(this).text();
          console.log('select regulation ',regname);                        
          if (regname == _self.regulationCollection[i].regname) {
            exists = true;
          }
        });
        if(exists == false)  
          selectel1.append($('<li class="item" id="" rid="'+regulatorID+'" value="'+ _self.regulationCollection[i].rlid +'">'+ _self.regulationCollection[i].regname+'</li>'));
      } 
    }
 if(app.ClientAppRouter.origin == 1){
         var selectregulationlist = app.ClientAppRouter.selectregulationlist;
        for(var i = 0;i<selectregulationlist.length;i++){
          var rid = selectregulationlist[i].rid;
       $(".selectReg li").each(function(){
           var rid1 = $(this).val();
           if(rid==rid1){
               $(this).addClass('selected');
   }
         });
}      
      } 
      // var _self = this;
      // var regulatorID = regulatorID;
      // console.log("Check regulation",_self.regulationCollection[i], regulatorID);
      
      //   for(i=0;i<_self.regulationCollection.length;i++){
      //     var exists = false;
          
      //     if(_self.regulationCollection[i].rid == regulatorID ) {
      //           $('.selectReg li').each(function()
      //        {
      //         console.log('select regulation',$(this).text());
      //           var txt =$(this).text();
      //           console.log("inside the regulation", txt, _self.regulationCollection[i].regname);
      //           if (txt == _self.regulationCollection[i].regname) 
      //          {
      //             exists = true;
      //          }
      //        });

      //     if(exists == false) {
      //       selectel1.append($('<li class="item" id="" rid="'+regulatorID+'" value="'+ _self.regulationCollection[i].rlid +'">'+ _self.regulationCollection[i].regname+'</li>'));    
      //   }
      //    //advanceSearchCheckbox();
      //   }
      // }
  },
  
  Selectedregulation: function(e){
    e.preventDefault();
    console.log("regulation selected ::", $(e.target).text() + $(e.target).val());    
    if($(e.target).hasClass('selected')){
      $(e.target).removeClass('selected');
    } else {
      $(e.target).addClass('selected');
    }
 
      // var _self = this;
      // e.preventDefault();
      // var regulationID = $(e.target);
      // var regulationdata=$(".selectReg").find('li.selected').text();
      // console.log("regulationdata",regulationdata);
      // if($(e.target).hasClass('selected')){
      //   $(e.target).removeClass('selected');
      // } else {
      //   $(e.target).addClass('selected');
      // }
      // $('.selectReg li').each(function(){
      //   if($(this).hasClass('selected')){
      //     var rid = $(this).attr('rid');
      //     var reid=$(this).val();
      //     var rename=$(this).text();
      //     console.log("For checking rid, rename", rid, rename);
      //     _self.query_iteration('rid',rid,'rename',rename);
      //     _self.query_iteration('rid',rid,'reid',reid);
      //   }
      // });
      // console.log('QUERY_FORMATION-REG', query_formation);
  },

  searchFile:function () {
//    e.preventDefault();
    $('#advancedSearchResultContainer').empty();
    $('#advancedSearchResultContainer').unbind();
    var _self = this;
    var regulatordata="";
    var regulationdata="";
    var domaindata="";
    var statedata="";
    var countrydata= "";
    var geodata = "";
    var searchTerm = "";
    var isUsSelected = false;
    var usGeoId = '0';
    var selectedGeoList = [],
        selectedCountryList = [],
        selectedStateList = [],
        selectedDomainList = [],
        selectedRegulatorList = [],
        selectedRegulationList = [];
    var adSearchResultList = [];
    var filePath ='documents/publish';

    $(".selectGeo").find('li.selected').each(function(){       
        geodata += $(this).text()+ " ";
        searchTerm += $(this).text()+ " > ";
        selectedGeoList.push({gid: $(this).val()+''});
        if ($(this).text() == 'United States') {
          isUsSelected = true;
          usGeoId = $(this).val()+'';
        }
    }); 
    $(".selectCountry").find('li.selected').each(function(){       
        countrydata += $(this).text()+ " ";
        searchTerm += $(this).text()+ " > ";
        selectedCountryList.push({cnid: $(this).val()+''});
    }); 
    $(".selectState").find('li.selected').each(function(){       
        statedata += $(this).text()+ " ";
        searchTerm += $(this).text()+ " > ";
        selectedStateList.push({stid: $(this).val()+''});
    });
    $(".selectDomain").find('li.selected').each(function(){       
        domaindata += $(this).text()+ " ";
        searchTerm += $(this).text()+ " > ";
        selectedDomainList.push({did: $(this).val()+''});
    }); 
    $(".selectRegulator").find('li.selected').each(function(){       
        regulatordata += $(this).text()+ " ";
        searchTerm += $(this).text()+ " > ";
        selectedRegulatorList.push({rtorid: $(this).val()+''});
    });
    $(".selectReg").find('li.selected').each(function(){        
        regulationdata += $(this).text()+ " ";
        searchTerm += $(this).text()+ " > ";
        selectedRegulationList.push({rid: $(this).val()+''}); 
    }); 

    // $('.selectDomain').find('li.selected').each(function(){
    //     var slctclass = $(this).attr('sgid');
    //     if (geoclass){
    //     var geosplit = geoclass.split(',');
    //     geosplit.forEach(function(item){
    //         console.log("for each split",regval,item);
    //          _self.loadregulator(regval,item);
    //       });
    //    }
    //   });

    // $('.selectDomain li.gid').each(function(){
    //     var geoclass = $(this).attr('class').split(' ')[3];
    //     selectedGeoList.push({gid: geoclass+''});
    //   });

    // $('.selectRegulator li.did').each(function(){
    //     var domclass = $(this).attr('class').split(' ')[3];
    //     selectedDomainList.push({did: domclass+''});
    //   });
 if(app.ClientAppRouter.origin == 1)
 {
 selectedGeoList = app.ClientAppRouter.selectgeolist;
 selectedCountryList = app.ClientAppRouter.selectcountrylist;
 selectedStateList = app.ClientAppRouter.selectstatelist;
 selectedDomainList = app.ClientAppRouter.selectdomainlist;
 selectedRegulationList = app.ClientAppRouter.selectregulationlist;
 selectedRegulatorList = app.ClientAppRouter.selectregulatorlist;
 }

app.ClientAppRouter.origin =0;
    searchword = $('#searchkeymass').val();
    searchTerm += searchword;    
    var searchKey = searchword;              
    console.log("searchKey: ",searchKey);
    console.log('searchTerm: ' + searchTerm);

if(searchKey == '')
{
searchKey = "*";
}

    console.log('selectedGeoList: ', selectedGeoList);
    console.log('selectedCountryList: ', selectedCountryList);
    console.log('selectedStateList: ', selectedStateList);
    console.log('selectedDomainList: ', selectedDomainList);
    console.log('selectedRegulatorList: ', selectedRegulatorList);
    console.log('selectedRegulationList: ', selectedRegulationList); 
    console.log('isUsSelected: ', isUsSelected);
    console.log('usGeoId: ', usGeoId);
    app.ClientAppRouter.searchKey = searchKey;
    app.ClientAppRouter.selectgeolist= selectedGeoList;
    app.ClientAppRouter.selectcountrylist= selectedCountryList;
    app.ClientAppRouter.selectstatelist= selectedStateList;
    app.ClientAppRouter.selectdomainlist= selectedDomainList;
    app.ClientAppRouter.selectregulationlist= selectedRegulationList;
    app.ClientAppRouter.selectregulatorlist= selectedRegulatorList;

if (searchKey != '') {    
 console.log("searchKey: ",searchKey);
      $.when(this.searchCollection.fetch({reset: true, data: {'searchKey': searchKey}, processData: true})).done(function() {
         // $("#mainCanvas").empty();
         //_self.$el.html($('#AdvanceSearchTpl').html());
         // $('#searchTerm').text(searchTerm);          
          console.log('SEARCH-COLLECTION: ', _self.searchCollection.length);
             if(_self.searchCollection.length > 0){
              var adSearchResult = _self.filterAdSearchResult(_self.searchCollection, selectedGeoList, selectedCountryList, selectedStateList, selectedDomainList, selectedRegulatorList, selectedRegulationList);
              console.log('AD Search RESULTS AFTER: ', adSearchResult);
              if (adSearchResult.length > 0) {
                _self.renderSearchResult(adSearchResult);             
              } else {
                //show no data found after filteration by AD search key          
                _self.showNoData();
                console.log("NO DATA FOUND...");        
              }             
           }else {
            //show no data found          
            _self.showNoData();
            console.log("NO DATA FOUND...");        
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
    } else {
      console.log('Please Provide SearchKey.');
    }       
  },

  filterAdSearchResult: function(searchCollection, selectedGeoList, selectedCountryList, selectedStateList, selectedDomainList, selectedRegulatorList, selectedRegulationList) {
    var filterGeoCollection = [],
        filterCountryCollection = [];
        filterStateCollection = [];
        filterDomainCollection = [];
        filterRegulatorCollection = [];
        filterRegulationCollection = [];
    var finalAdsearchResult = searchCollection;    
    //filter geo    
    if (selectedGeoList.length > 0) {
      var filterGeoList = [];
      selectedGeoList.forEach(function(item) {
        console.log('ITEM: ', item);
        var T = searchCollection.where({gid: item.gid});
        console.log('T: ', T);
        filterGeoList = _.union(filterGeoList, searchCollection.where({gid: item.gid}));  
        console.log('filterGeoList ', filterGeoList);
      }); 
      if (filterGeoList.length > 0) {
        filterGeoCollection = new Backbone.Collection(filterGeoList);
        finalAdsearchResult = filterGeoCollection;
        console.log('selectedGeoList: ', selectedGeoList);
        console.log('filterGeoCollection: ', filterGeoCollection);
      } else {
        return [];
      }
   }
    //filter country
    // if (selectedCountryList.length > 0) {
    //   var filterCountryList = [];
    //   selectedCountryList.forEach(function(item) {
    //     if (filterGeoCollection.length > 0) {          
    //       filterCountryList = _.union(filterCountryList, filterGeoCollection.where({cnid: item.cnid}));  
    //     } 
    //     // else {
    //     //   filterCountryList = _.union(filterCountryList, searchCollection.where({cnid: item.cnid}));  
    //     // }          
    //   }); 
    //   if (filterCountryList.length > 0) {
    //     filterCountryCollection = new Backbone.Collection(filterCountryList);
    //     finalAdsearchResult = filterCountryCollection; 
    //     console.log('selectedCountryList: ', selectedCountryList);
    //     console.log('filterCountryCollection: ', filterCountryCollection);
    //   } else {
    //     return [];
    //   }          
    // }
    // //filter state    
    // if (selectedStateList.length > 0) {
    //   var filterStateList = [];
    //   var typeOfFilterCollection = '';
    //   selectedStateList.forEach(function(item) {
    //     if (filterCountryCollection.length > 0) {
    //       typeOfFilterCollection = 'country';          
    //       filterStateList = _.union(filterStateList, filterCountryCollection.where({stid: item.stid}));  
    //     } else if (filterGeoCollection.length > 0) {          
    //       typeOfFilterCollection = 'geo';
    //       filterStateList = _.union(filterStateList, filterGeoCollection.where({stid: item.stid}));  
    //     } 
    //     // else {
    //     //   typeOfFilterCollection = 'search';
    //     //   filterStateList = _.union(filterStateList, searchCollection.where({stid: item.stid}));  
    //     // }          
    //   }); 
    //   if (filterStateList.length > 0) {
    //     filterStateCollection = new Backbone.Collection(filterStateList);
    //     if (typeOfFilterCollection == 'country') {
    //       var filterAllExceptUS = filterCountryCollection.filter(function(item) {
    //         return (item.get('gid') != usGeoId);      
    //       });
    //     } else if (typeOfFilterCollection == 'geo') {
    //       var filterAllExceptUS = filterGeoCollection.filter(function(item) {
    //         return (item.get('gid') != usGeoId);
    //       });  
    //     }
    //     filterStateCollection.add(filterAllExceptUS);
    //     finalAdsearchResult = filterStateCollection;
    //     console.log('selectedStateList: ', selectedStateList);
    //     console.log('filterStateCollection: ', filterStateCollection);
    //   } else {
    //     return [];
    //   }           
    // }
    //filter Domain
    if (selectedDomainList.length > 0) {
      var filterDomainList = [];
      selectedDomainList.forEach(function(item) {
        console.log('ITEM: ', item);
        // if (filterStateCollection.length > 0) {          
        //   filterDomainList = _.union(filterDomainList, filterStateCollection.where({did: item.did}));  
        // } else if (filterCountryCollection.length > 0) {          
        //   filterDomainList = _.union(filterDomainList, filterCountryCollection.where({did: item.did}));  
        // } else if (filterGeoCollection.length > 0) {          
        //   filterDomainList = _.union(filterDomainList, filterGeoCollection.where({did: item.did}));  
        // } 
         if (filterGeoCollection.length > 0) {          
          filterDomainList = _.union(filterDomainList, filterGeoCollection.where({did: item.did}));  
          } 
        else {
          filterDomainList = _.union(filterDomainList, searchCollection.where({did: item.did}));  
        }          
      }); 
      if (filterDomainList.length > 0) {
        filterDomainCollection = new Backbone.Collection(filterDomainList);
        finalAdsearchResult = filterDomainCollection;
        console.log('selectedDomainList: ', selectedDomainList);
        console.log('filterDomainCollection: ', filterDomainCollection);
      } else {
        return [];
      }          
    }

    //filter Regulator
    if (selectedRegulatorList.length > 0) {
      var filterRegulatorList = [];
      selectedRegulatorList.forEach(function(item) {
        if (filterDomainCollection.length > 0) {          
          filterRegulatorList = _.union(filterRegulatorList, filterDomainCollection.where({rtorid: item.rtorid}));  
        // } else if (filterStateCollection.length > 0) {          
        //   filterRegulatorList = _.union(filterRegulatorList, filterStateCollection.where({rtorid: item.rtorid}));  
        // } else if (filterCountryCollection.length > 0) {          
        //   filterRegulatorList = _.union(filterRegulatorList, filterCountryCollection.where({rtorid: item.rtorid}));  
        } 
        else if (filterGeoCollection.length > 0) {          
          filterRegulatorList = _.union(filterRegulatorList, filterGeoCollection.where({rtorid: item.rtorid}));  
        } else {
          filterRegulatorList = _.union(filterRegulatorList, searchCollection.where({rtorid: item.rtorid}));  
        }          
      }); 
      if (filterRegulatorList.length > 0) {
        filterRegulatorCollection = new Backbone.Collection(filterRegulatorList);
        finalAdsearchResult = filterRegulatorCollection;
        console.log('selectedRegulatorList: ', selectedRegulatorList);
        console.log('filterRegulatorCollection: ', filterRegulatorCollection);        
      } else {
        return [];
      }           
    }

    //filter Regulation
    if (selectedRegulationList.length > 0) {
      var filterRegulationList = [];
      selectedRegulationList.forEach(function(item) {
        console.log('REG-ITEM:', item);
        if (filterRegulatorCollection.length > 0) {          
          filterRegulationList = _.union(filterRegulationList, filterRegulatorCollection.where({rid: item.rid}));  
        } else if (filterDomainCollection.length > 0) {          
          filterRegulationList = _.union(filterRegulationList, filterDomainCollection.where({rid: item.rid}));  
        // } else if (filterStateCollection.length > 0) {          
        //   filterRegulationList = _.union(filterRegulationList, filterStateCollection.where({rid: item.rid}));  
        // } else if (filterCountryCollection.length > 0) {          
        //   filterRegulationList = _.union(filterRegulationList, filterCountryCollection.where({rid: item.rid}));  
        } else if (filterGeoCollection.length > 0) {          
          filterRegulationList = _.union(filterRegulationList, filterGeoCollection.where({rid: item.rid}));  
        } else {
          filterRegulationList = _.union(filterRegulationList, searchCollection.where({rid: item.rid}));  
        }          
      });
      console.log('selectedRegulationList: ', selectedRegulationList); 
      if (filterRegulationList.length > 0) {
        filterRegulationCollection = new Backbone.Collection(filterRegulationList);
        finalAdsearchResult = filterRegulationCollection;
        console.log('selectedRegulationList: ', selectedRegulationList);
        console.log('filterRegulationCollection: ', filterRegulationCollection);        
      } else {
        return [];
      }          
    }    
    return finalAdsearchResult;
  },

  renderSearchResult: function(data) {
    var tpl = '';
    var _self = this;
    var filePath = 'documents/publish';
    if (app.ClientAppRouter.trail_user == true) {
      tpl = _.template($('#searchRowTpl').html());
    } else {
      tpl = _.template($('#searchTrailRowTpl').html());
    }
    for(i=0;i<data.models.length;i++) {
      var item = data.models[i].attributes;
      if (item.subdocument == undefined) {
        item['subdocument']="";
        item['filePath'] = filePath + item.fileName;
        // var tpl = _.template($('#searchRowTpl').html());
        _self.$el.find('#advancedSearchResultContainer').append(tpl(item));
      } else {
        item['filePath'] = filePath + item.fileName;
        // var tpl = _.template($('#searchRowTpl').html());
        _self.$el.find('#advancedSearchResultContainer').append(tpl(item));
      }
    }

  },

  showNoData: function() {
      // this.$el.empty();
      this.$el.append($(this.parentDiv))
      var newrow = $(this.tbl);
      var elem = $(this.cell);
      var newelem =  elem.filter('#elem');
      var found = newelem.clone();
      found.append($('<span></span>').text('No Search Results available.'));
      var rel = newrow.find('#xlsheadrow');
      rel.append(found);
      this.$el.find('#advancedSearchResultContainer').append(this.back2);
      this.$el.find('#advancedSearchResultContainer').append(newrow);    
  },

  clearfile:function (e) {
     e.preventDefault();
     console.log("clearfile");
     //$("#selectGeo").empty();
     $('.selectGeo').find('li').removeClass('selected');
     $('.selectCountry').find('li').removeClass('selected');
     $('.selectState').find('li').removeClass('selected');
     $('.selectDomain').find('li').removeClass('selected');
     $('.selectRegulator').find('li').removeClass('selected');
     $('.selectReg').find('li').removeClass('selected');
    
  },


    query_iteration:function(key, de_value,keyn,keyn1){
                for(i=0;i<query_formation.length;i++) {
                           console.log("For check the query formation from the query sector", query_formation[i]); 
                           console.log("check the basic keys arg 1 2 3 4 ", key, de_value, keyn, keyn1);
                           console.log("check the basic keys arg 1 2 3 4 ", (query_formation[i][key]), de_value);
                                
                              if(query_formation[i][key] == de_value )  {
                                console.log("inside 2nd if loop");
                                query_formation[i][keyn]=keyn1
                                console.log("final QUERY_FORMATION: ", query_formation);
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
            var spl  = $(e.target).attr('spl');
            var gname = $(e.target).attr('gname');
            var dname = $(e.target).attr('dname');
            var fid  = $(e.target).attr('fid');            
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
            //app.ClientAppRouter.docname = (docname) ? docname : ''; 
            app.ClientAppRouter.subdocname = (subdocname) ? subdocname : '';
            app.ClientAppRouter.spl = (spl) ? spl : 0;
            app.ClientAppRouter.fid = (fid) ? fid : 0;             
            app.ClientAppRouter.mode = '1';
            app.ClientAppRouter.searchname = "advancesearch";
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

