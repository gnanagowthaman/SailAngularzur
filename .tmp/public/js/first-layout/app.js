'use strict';

var appRouter;
var limit = 8; //for loadmore user,domain,geo (vinitha)
var offset = 0; //for loadmore user,domain,geo(vinitha)
var doclimit = 8;
var docOffSet = 0;
var filelimit = 8;
var countrylimit= 8;
var statelimit= 8;
var stateoffset= 0;
//var stateOffSet= 8;
//var regulatorlimit=8;
var reglimit = 8;
var doclimit=8
var subslimit = 8;
var subsoffset  = 0;
var doc_m_limit =8;
var doc_m_offset=0;

var spclLimit = 8;
var spclOffset = 0;

var mainDocLimit = 8;
var mainDocOffset = 0;

var docsClicked = [];

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
        $(this).toggleClass('active');
        $('body').toggleClass('main-sidebar-toggled');
    });

    // Extra Sidebars
    // --------------------------------------------------

    // $('.sidebar-toggle').on('click', function() {
    //     $('body').toggleClass('sidebar-toggled');
    // });

    // // Toogle Searchbar
    // // --------------------------------------------------

    // $('.search-bar-toggle').on('click', function() {
    //     $('.search-bar').toggleClass('closed');
    // });

    // // Toggle Right Sidebar
    // // --------------------------------------------------

    // $('.right-sidebar-toggle').on('click', function() {
    //     $('.right-sidebar').toggleClass('closed');
    // });

    // // Toggle Conversation Sidebar
    // // --------------------------------------------------

    // $('.conversation-toggle').on('click', function() {
    //     $('.conversation').toggleClass('closed');
    // });

    // // Tooltips & Popovers
    // // --------------------------------------------------

    // $('[data-toggle=\'tooltip\']').tooltip();
    // $('[data-toggle=\'popover\']').popover();

    // // Widget Controls
    // // --------------------------------------------------

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

    // // Progressbar
    // // --------------------------------------------------

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

    $('#user_click').on('click',function() {
        $('#dashboard_click a').removeClass('active');
        $('#user_click a').addClass('active');       
    });
    $('#dashboard_click').on('click',function() {
        $('#user_click a').removeClass('active');
        $('#dashboard_click a').addClass('active');
    });
    $('#accdboard').on('click',function() {
        appRouter.navigate("manageUsers", {trigger: true});
    });

    // Register Events
    // --------------------------------------------------
    $('#usermgnt').on('click', function() {
        console.log('route to manageUsers');
        routeCalled('manageUsers');
        appRouter.navigate("manageUsers", {trigger: true});
    });

    $('#docmgnt').on('click', function() {
        console.log('route to manageDocuments');
        routeCalled('manageDocuments');
        appRouter.navigate("manageDocuments", {trigger: true});
    });
    $("#dommgnt").on('click',function(){
        console.log('route to manageDomain');
        routeCalled('manageDomain');
        appRouter.navigate("manageDomain",{trigger: true});
    });
     $("#geomgnt").on('click',function(){
        console.log('route to manageGeo');
        //alert(123);
        routeCalled('manageGeo');
        appRouter.navigate("manageGeo",{trigger: true});
    });


    $("#countrymgnt").on('click',function(){
        console.log('route to managecountry');
        routeCalled('managecountry');
       appRouter.navigate("managecountry",{trigger: true});
    });  
//===================================================================//
 $("#statemgnt").on('click',function(){
        console.log('route to managestate');
        routeCalled('managestate');
       appRouter.navigate("managestate",{trigger: true});
    });

//====================================================================//
    $("#regmgnt").on('click',function(){
        console.log('route to manageReg');
        routeCalled('manageReg');
        appRouter.navigate("manageReg",{trigger: true});
    });
    $("#doctmgnt").on('click',function(){
        console.log('route to manageDocType');
        routeCalled('manageDocType');
        appRouter.navigate("manageDocType",{trigger: true});
    });
    $("#profileMgnt").on('click',function(){
        console.log('route to profileManagement');
        routeCalled('profileManagement');
        appRouter.navigate("profileManagement",{trigger: true});
    });

    $("#esp-user-profile").on('click',function(){
        console.log('route to profileManagement');
        routeCalled('profileManagement');
        appRouter.navigate("profileManagement",{trigger: true});
        $('#dashboard_click a').removeClass('active');
        $('#user_click a').addClass('active');  
        $('body').find('#collapse1').removeClass('in');
    });

    $("#newsMgnt").on('click',function(){
    console.log('route to newsManagement');
    routeCalled('newsManagement');
    appRouter.navigate("newsManagement",{trigger: true});
    });
    $("#regulatormgnt").on('click',function(){
        console.log('route to manageRegulator');
        //alert(123);
        routeCalled('newsManagement');
        appRouter.navigate("manageRegulator",{trigger: true});
    });

    $("#subdocMgnt").on('click',function(){
       console.log('route to sub document management');
        routeCalled('subDocManagement');
       appRouter.navigate("subDocManagement",{trigger: true});
   });

    
    $("#alertMgnt").on('click',function(){
       console.log('route to salert document management');
       routeCalled('manageAlert');
       appRouter.navigate("manageAlert",{trigger: true});
   });
    
    // Initiate Backbone Router
    // --------------------------------------------------
    console.log('getting ready');
    appRouter = new admin.AdminAppRouter();
    Backbone.history.start();
    console.log('View is Ready');
    
});

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

var count = 0; 

var previousPageName ="adminDashboard";

window.onload = function () 
{ 
  console.log("current location "+Backbone.history.getFragment());
  //alert(window.location.href);

 
    if (typeof history.pushState === "function") 
    { 
        var rootname = Backbone.history.getFragment();
        if( rootname == undefined || rootname == '' )
          rootname="adminDashboard";   
      //    alert("rootname "+rootname);       
         history.pushState('back', null, null);  
         routeCalled(rootname); 
         routeCalled('manageUsers');

          docsClicked[rootname] = 0;    

        window.onpopstate = function (event) 
        { 
   
              var rootname = Backbone.history.getFragment();
              if( rootname == undefined || rootname == '' )
              {
                history.pushState('back', null, null); 
                 rootname="adminDashboard"; 
              }
              else
              {
                history.pushState('back', null, null);
              }

                if( previousPageName == rootname )
               {

                   if( docsClicked[rootname] != undefined && docsClicked[rootname]  <=  0 )
                   {
                     /*if( confirm("Do you want to leave current page?") == true)
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
               else
               {
                     previousPageName = rootname;
                     if( docsClicked[previousPageName] != undefined ) docsClicked[previousPageName]--;
               }
            
           //if(count == 1){window.location = 'your url';}
          
         }; 
     }
     
 }  

 $( "#leaveCurrentPageOK" ).click(function() {
  $('#saveConfirmDialog').modal('hide');
  location.href = location.protocol + '//' + location.host;

});



$( "#leaveCurrentPageCancel" ).click(function() {
  $('#leaveCurrentPageCancel').modal('hide');
  

});
