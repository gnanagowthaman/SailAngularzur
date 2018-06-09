var tableResizable;
// $(function () {

// 	// Resize window
// 	$( window ).resize(function() {
// 	  loadWindow();
// 	});

// 	function loadWindow(){
// 		var calcHeight = (2333*$(".guide-tree").outerWidth())/1650;
// 		$("#the-canvas").height(calcHeight);
// 		$(".guide-tree").height(calcHeight);
// 	}

// 	loadWindow();

// 	$(window).resize(function() {
// 		resizeTableTracker();
// 		hamburguerMenu_Close();
// 	});

// 	// Load Tree Object
// 	$('#files').tree({
// 		expanded: 'li:first'
// 	});

// 	// View mode
// 	$(".icon-view").click(function(event) {
// 		$("body").toggleClass('light');
// 	});
	
// 	$(".hamburger-menu").click(function(event) {
// 		hamburguerMenu_Open();
// 	});
// 	$(".close-menu, .close-menu2").click(function(event) {
// 		hamburguerMenu_Close();
// 	});

// 	$(".label_alerts").click(function(event) {
// 		$(this).parent().toggleClass('open_menu');
// 	});

// 	function hamburguerMenu_Open(){
// 		$(".close-menu").show();
// 		$(".close-menu2").show();
// 		$(".navmenu").show();
// 	}

// 	function hamburguerMenu_Close(){
// 		$(".close-menu").hide();
// 		$(".close-menu2").hide();
// 		$(".navmenu").css("display", "");
// 	}

// 	// Left Menu Events
// 	$(".title-panel").click(function(event) {
// 		if($(this).hasClass('close')){
// 			$(".title-panel").removeClass('close');
// 			$("#files").show();
// 			$(".left-panel").width('auto');
// 		} else{
// 			$(".title-panel").addClass('close');
// 			$("#files").hide();
// 			$(".left-panel").width(50);
// 		}
// 		resizeTableTracker();
// 	});

// 	// Top Menu Events
// 	$(".regulation-tracker .panel-title .content-header-min, .regulation-tracker .panel-title .content-header-max").click(function(event) {
// 		var container = $(".regulation-tracker .panel-container");
// 		var title = $(".regulation-tracker .panel-title");
// 		if(container.hasClass('close')){
// 			container.removeClass('close');
// 			title.removeClass('closed');
// 		} else{
// 			container.addClass('close');
// 			title.addClass('closed');
// 		}

// 		resizeTableTracker();
// 	});

// 	// Event to select domains from checkboxs
// 	$(".domains-container li, .status-container li").click(function(event) {
// 		if($(this).hasClass('selected')){
// 			$(this).removeClass('selected');
// 		} else {
// 			$(this).addClass('selected');
// 		}
// 	});

// 	// Event to select continents from Map
// 	$("svg g.continent").click(function() {
// 		var idObj = $(this).attr('id');
// 		mapSelection(idObj, !$(this).hasClass('selected'));

// 		if (!$(".regions-container li.item").not(".selected").length) {
// 			$(".regions-container li.all").addClass('selected');
// 		} else{
// 			$(".regions-container li.all").removeClass('selected');
// 		}
// 	});

// 	// Event to select continents from checkboxs
// 	$(".regions-container li").click(function(event) {
// 		if($(this).html()=="All"){
// 			if($(this).hasClass('selected')){
// 				$(".regions-container li").removeClass('selected');
// 			} else {
// 				$(".regions-container li").addClass('selected');
// 			}
// 		} else {
// 			if($(this).hasClass('selected')){
// 				$(this).removeClass('selected');
// 			} else {
// 				$(this).addClass('selected');
// 			}

// 			if (!$(".regions-container li.item").not(".selected").length) {
// 				$(".regions-container li.all").addClass('selected');
// 			} else{
// 				$(".regions-container li.all").removeClass('selected');
// 			}
// 		}

// 		var selection = $(this).html();

// 		if(selection == "Europe"){
// 			mapSelection("europe", $(this).hasClass('selected'));
// 		} else if(selection == "Asia Pacific"){
// 			mapSelection("asiapacific", $(this).hasClass('selected'));
// 		} else if(selection == "USA &amp; Canada"){
// 			mapSelection("northamerica", $(this).hasClass('selected'));
// 		} else if(selection == "Middle East"){
// 			mapSelection("middleeast", $(this).hasClass('selected'));
// 		} else if(selection == "All"){
// 			mapSelection("All", $(this).hasClass('selected'));
// 		}
// 	});

// 	function mapSelection(continent, selected){
// 		var contToShow;
// 		if(continent == "asiapacific"){
// 			if(selected){
// 		  		//Map
// 		  		$("svg #asiapacific.continent").addClass("selected");
// 		  		//List
// 		  		$(".regions-container .asiapacific").addClass('selected');
// 		  	} else {
// 	  			//Map
// 	  			$("svg #asiapacific.continent").removeClass("selected");
// 		  		//List
// 		  		$(".regions-container .asiapacific.selected").removeClass('selected');
// 		  	}
// 		  } else if(continent == "asia"){
// 		  } else if(continent == "northamerica"){
// 		  	if(selected){
// 		  		//Map
// 		  		$("svg #northamerica.continent").addClass("selected");
// 		  		//List
// 		  		$(".regions-container .northamerica").addClass('selected');
// 		  	} else {
// 	  			//Map
// 	  			$("svg #northamerica.continent").removeClass("selected");
// 		  		//List
// 		  		$(".regions-container .northamerica.selected").removeClass('selected');
// 		  	}
// 		  } else if(continent == "southamerica"){
// 		  } else if(continent == "middleeast"){
// 		  	if(selected){
// 		  		//Map
// 		  		$("svg #middleeast.continent").addClass("selected");
// 		  		//List
// 		  		$(".regions-container .middleeast").addClass('selected');
// 		  	} else {
// 	  			//Map
// 	  			$("svg #middleeast.continent").removeClass("selected");
// 		  		//List
// 		  		$(".regions-container .middleeast.selected").removeClass('selected');
// 		  	}
// 		  } else if(continent == "europe"){
// 		  	if(selected){
// 		  		//Map
// 		  		$("svg #europe.continent").addClass("selected");
// 		  		//List
// 		  		$(".regions-container .europe").addClass('selected');
// 		  	} else {
// 	  			//Map
// 	  			$("svg #europe.continent").removeClass("selected");
// 		  		//List
// 		  		$(".regions-container .europe.selected").removeClass('selected');
// 		  	}
// 		  } else if(continent == "africa"){
// 		  } else if(continent == "southafrica"){
// 		  } else if(continent == "All"){
// 		  	if(selected){
// 		  		//Map
// 		  		$("svg .continent").addClass("selected");
// 		  		//List
// 		  		$(".regions-container .item").addClass('selected');
// 		  	} else {
// 	  			//Map
// 	  			$("svg .continent").removeClass("selected");
// 		  		//List
// 		  		$(".regions-container .item").removeClass('selected');
// 		  	}
// 		  }
// 		}

// 		// Managing the Event for the tree Showing PDF/Background
// 		$("#files a").click(function(event) {
// 			$(".pdf-container").removeClass('pdf');
// 		});

// 		//Showing when Its PDF the file
// 		$(".pdfClickEvent").click(function(event) {
// 			event.preventDefault();

// 			$(".pdf-container").addClass('pdf');

// 			PDFJS.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

// 			var url = $(this).attr("href");

// 			// Asynchronous download of PDF
// 			var loadingTask = PDFJS.getDocument(url);
// 			loadingTask.promise.then(function(pdf) {
// 				console.log('PDF loaded');

// 				// Fetch the first page
// 				var pageNumber = 1;
// 				pdf.getPage(pageNumber).then(function(page) {
// 					console.log('Page loaded');

// 					var scale = 2;
// 					var viewport = page.getViewport(scale);

// 				    // Prepare canvas using PDF page dimensions
// 				    var canvas = document.getElementById('the-canvas');
// 				    var context = canvas.getContext('2d');
// 				    canvas.height = viewport.height;
// 				    canvas.width = viewport.width;

// 				    // Render PDF page into canvas context
// 				    var renderContext = {
// 				    	canvasContext: context,
// 				    	viewport: viewport
// 				    };
// 				    var renderTask = page.render(renderContext);
// 				    renderTask.then(function () {
// 				    	console.log('Page rendered');
// 				    });
// 				});
// 			}, function (reason) {
// 				// PDF loading error
// 				console.error(reason);
// 			});

// 		});

// 		$(".lifecycleClickEvent").click(function(event) {
// 			$(".pdf-container").addClass('lifecycle');
// 			$(".pdf-container").removeClass('tableregulatory');
// 		});

// 		$(".tableClickEvent").click(function(event) {
// 			resizeTableTracker();
// 			$(".pdf-container").removeClass('lifecycle');
// 			$(".pdf-container").addClass('tableregulatory');

// 			tableResizable = $('#xls-table221undefined319113').colResizable({
// 		    	liveDrag: false,
// 		    	resizeMode:'fit',
// 		    	flush:true
// 		    });
// 		});

// 		$("#select-all").click(function(event) {
// 			$("#filterByValue input").prop('checked', true);
// 		});

// 		$("#clear-all").click(function(event) {
// 			$("#filterByValue input").prop('checked', false);
// 		});

// 		$(".filterarrrow").click(function(event) {
// 			if($(this).hasClass('open_filter')){
// 				$(".filterarrrow").removeClass('open_filter');
// 				$("#filterPopupContainer").hide();
// 			} else {
// 				$(this).addClass('open_filter');
// 				var pos = $(this).parent().position();
// 				var plusTop = $(this).parent().outerHeight(true);
// 				var plusleft = $(this).parent().outerWidth(true);
// 				var leftFilter = pos.left+plusleft-$("#filterPopupContainer").outerWidth(true);
// 				$("#filterPopupContainer").show().css({left:leftFilter,top:pos.top+plusTop+1});
// 			}
// 		});

// 		$("#cancel-filter").click(function(event) {
// 			$("#filterPopupContainer").hide();
// 			$(".filterarrrow").removeClass('open_filter');
// 		});

// 	});

function registerTrackerEvents() {
	// Resize window
	$( window ).resize(function() {
	  loadWindow();
	});

	function loadWindow(){
		var calcHeight = (2333*$(".guide-tree").outerWidth())/1650;
		$("#the-canvas").height(calcHeight);
		$(".guide-tree").height(calcHeight);
	}

	loadWindow();

	$(window).resize(function() {
		resizeTableTracker();
		hamburguerMenu_Close();
	});

	// Load Tree Object
	// $('#files').tree({
	// 	expanded: 'li:first'
	// });

	// View mode
	
	$(".hamburger-menu").click(function(event) {
		hamburguerMenu_Open();
	});
	$(".close-menu, .close-menu2").click(function(event) {
		hamburguerMenu_Close();
	});

	// $(".label_alerts").click(function(event) {
	// 	$(this).parent().toggleClass('open_menu');
	// });

	function hamburguerMenu_Open(){
		$(".close-menu").show();
		$(".close-menu2").show();
		$(".navmenu").show();
	}

	function hamburguerMenu_Close(){
		$(".close-menu").hide();
		$(".close-menu2").hide();
		$(".navmenu").css("display", "");
	}

	// Left Menu Events
	$(".title-panel").click(function(event) {
		if($(this).hasClass('close')){
			$(".title-panel").removeClass('close');
			$("#treeCanvas").show();
			$(".left-panel").width('auto');
		} else{
			$(".title-panel").addClass('close');
			$("#treeCanvas").hide();
			$(".left-panel").width(50);
		}
		resizeTableTracker();
	});

	// Top Menu Events
	$(".regulation-tracker .panel-title .content-header-min, .regulation-tracker .panel-title .content-header-max").click(function(event) {
		var container = $(".regulation-tracker .panel-container");
		var title = $(".regulation-tracker .panel-title");
		if(container.hasClass('close')){
			container.removeClass('close');
			title.removeClass('closed');
		} else{
			container.addClass('close');
			title.addClass('closed');
		}

		resizeTableTracker();
	});

	// Event to select domains from checkboxs
	$(".domains-container li, .status-container li").click(function(event) {
		var selectedGeo = ($('#all-geos').hasClass('selected')) ? 'All' : 'NotAll';
		if($(this).hasClass('selected')){			
			$(this).removeClass('selected');			
			//expandDomainTreeNode(selectedGeo, false);
		} else {
			$(this).addClass('selected');
			//expandDomainTreeNode(selectedGeo, true);
		}
	});

	// Event to select continents from Map
	$("svg g.continent").click(function() {
		//Mapping geo id in world map with Geo name in check box
		var map = {
			"europe" 			: "Europe",
			"asiapacific" : "Asia Pacific",
			"northamerica": "USA & Canada",
			"middleeast"	: "Middle East"
		}		
		var idObj = $(this).attr('id');
	//	expandGeoTreeNode(map[idObj], !$(this).hasClass('selected'));		
		mapSelection(idObj, !$(this).hasClass('selected'));
		if (!$(".regions-container li.item").not(".selected").length) {
			$(".regions-container li.all").addClass('selected');
		} else{
			$(".regions-container li.all").removeClass('selected');
		}
	});

	// Event to select continents from checkboxs
	$(".regions-container li").click(function(event) {
		if($(this).html()=="All"){
			if($(this).hasClass('selected')){
				$(".regions-container li").removeClass('selected');
			//	expandGeoTreeNode($(this).text(), false);
			} else {
				$(".regions-container li").addClass('selected');
				//expandGeoTreeNode($(this).text(), true);
			}
		} else {
			if($(this).hasClass('selected')){
				$(this).removeClass('selected');
				//expandGeoTreeNode($(this).text(), false);
			} else {
				$(this).addClass('selected');
				//expandGeoTreeNode($(this).text(), true);
			}

			if (!$(".regions-container li.item").not(".selected").length) {
				$(".regions-container li.all").addClass('selected');
			} else{
				$(".regions-container li.all").removeClass('selected');
			}
		}

		var selection = $(this).html();

		if(selection == "European Union"){
			mapSelection("europe", $(this).hasClass('selected'));
		} else if(selection == "Asia Pacific"){
			mapSelection("asiapacific", $(this).hasClass('selected'));
		} else if(selection == "United States"){
			mapSelection("northamerica", $(this).hasClass('selected'));
		} else if(selection == "Middle East"){
			mapSelection("middleeast", $(this).hasClass('selected'));
		} else if(selection == "All"){
			mapSelection("All", $(this).hasClass('selected'));
		}
	});

	function mapSelection(continent, selected){
		var contToShow;
		if(continent == "asiapacific"){
			if(selected){
		  		//Map
		  		$("svg #asiapacific.continent").addClass("selected");
		  		//List
		  		$(".regions-container .asiapacific").addClass('selected');
		  	} else {
	  			//Map
	  			$("svg #asiapacific.continent").removeClass("selected");
		  		//List
		  		$(".regions-container .asiapacific.selected").removeClass('selected');
		  	}
		  } else if(continent == "asia"){
		  } else if(continent == "northamerica"){
		  	if(selected){
		  		//Map
		  		$("svg #northamerica.continent").addClass("selected");
		  		//List
		  		$(".regions-container .northamerica").addClass('selected');
		  	} else {
	  			//Map
	  			$("svg #northamerica.continent").removeClass("selected");
		  		//List
		  		$(".regions-container .northamerica.selected").removeClass('selected');
		  	}
		  } else if(continent == "southamerica"){
		  } else if(continent == "middleeast"){
		  	if(selected){
		  		//Map
		  		$("svg #middleeast.continent").addClass("selected");
		  		//List
		  		$(".regions-container .middleeast").addClass('selected');
		  	} else {
	  			//Map
	  			$("svg #middleeast.continent").removeClass("selected");
		  		//List
		  		$(".regions-container .middleeast.selected").removeClass('selected');
		  	}
		  } else if(continent == "europe"){
		  	if(selected){
		  		//Map
		  		$("svg #europe.continent").addClass("selected");
		  		//List
		  		$(".regions-container .europe").addClass('selected');
		  	} else {
	  			//Map
	  			$("svg #europe.continent").removeClass("selected");
		  		//List
		  		$(".regions-container .europe.selected").removeClass('selected');
		  	}
		  } else if(continent == "africa"){
		  } else if(continent == "southafrica"){
		  } else if(continent == "All"){
		  	if(selected){
		  		//Map
		  		$("svg .continent").addClass("selected");
		  		//List
		  		$(".regions-container .item").addClass('selected');
		  	} else {
	  			//Map
	  			$("svg .continent").removeClass("selected");
		  		//List
		  		$(".regions-container .item").removeClass('selected');
		  	}
		  }
		}

		// Managing the Event for the tree Showing PDF/Background
		// $("#files a").click(function(event) {
		// 	$(".pdf-container").removeClass('pdf');
		// });

		//Showing when Its PDF the file
		// $(".pdfClickEvent").click(function(event) {
		// 	event.preventDefault();

		// 	$(".pdf-container").addClass('pdf');

		// 	PDFJS.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

		// 	var url = $(this).attr("href");

		// 	// Asynchronous download of PDF
		// 	var loadingTask = PDFJS.getDocument(url);
		// 	loadingTask.promise.then(function(pdf) {
		// 		console.log('PDF loaded');

		// 		// Fetch the first page
		// 		var pageNumber = 1;
		// 		pdf.getPage(pageNumber).then(function(page) {
		// 			console.log('Page loaded');

		// 			var scale = 2;
		// 			var viewport = page.getViewport(scale);

		// 		    // Prepare canvas using PDF page dimensions
		// 		    var canvas = document.getElementById('the-canvas');
		// 		    var context = canvas.getContext('2d');
		// 		    canvas.height = viewport.height;
		// 		    canvas.width = viewport.width;

		// 		    // Render PDF page into canvas context
		// 		    var renderContext = {
		// 		    	canvasContext: context,
		// 		    	viewport: viewport
		// 		    };
		// 		    var renderTask = page.render(renderContext);
		// 		    renderTask.then(function () {
		// 		    	console.log('Page rendered');
		// 		    });
		// 		});
		// 	}, function (reason) {
		// 		// PDF loading error
		// 		console.error(reason);
		// 	});

		// });

		// $(".lifecycleClickEvent").click(function(event) {
		// 	$(".pdf-container").addClass('lifecycle');
		// 	$(".pdf-container").removeClass('tableregulatory');
		// });

		// *****NP by Niranjan - tableClickEvent No class  define in tracker.html
		// $(".tableClickEvent").click(function(event) {
		// 	resizeTableTracker();
		// 	$(".pdf-container").removeClass('lifecycle');
		// 	$(".pdf-container").addClass('tableregulatory');

		// 	tableResizable = $('#xls-table221undefined319113').colResizable({
		//     	liveDrag: false,
		//     	resizeMode:'fit',
		//     	flush:true
		//     });
		// });

		// *****NP by Niranjan - select-all , clear-allclass & filterarrrow not define in tracker.html
		// $("#select-all").click(function(event) {
		// 	$("#filterByValue input").prop('checked', true);
		// });

		// $("#clear-all").click(function(event) {
		// 	$("#filterByValue input").prop('checked', false);
		// });

		// $(".filterarrrow").click(function(event) {
		// 	if($(this).hasClass('open_filter')){
		// 		$(".filterarrrow").removeClass('open_filter');
		// 		$("#filterPopupContainer").hide();
		// 	} else {
		// 		$(this).addClass('open_filter');
		// 		var pos = $(this).parent().position();
		// 		var plusTop = $(this).parent().outerHeight(true);
		// 		var plusleft = $(this).parent().outerWidth(true);
		// 		var leftFilter = pos.left+plusleft-$("#filterPopupContainer").outerWidth(true);
		// 		$("#filterPopupContainer").show().css({left:leftFilter,top:pos.top+plusTop+1});
		// 	}
		// });
		// *****NP by Niranjan - cancel-filter class not define in tracker.html
		// $("#cancel-filter").click(function(event) {
		// 	$("#filterPopupContainer").hide();
		// 	$(".filterarrrow").removeClass('open_filter');
		// });
};

function resizeTableTracker(){
	var windowW = $("body").width();
	var leftPanelW = $(".left-panel").outerWidth(true);
	$(".tableContainer").width(windowW-leftPanelW-20);
};

//Added by Vahai
function expandGeoTreeNode(selectedGeo, isExpand) {
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
    } else if (selectedGeo == geo && selectedGeo != 'All') {
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
    }
  });
};


function expandDomainTreeNode(selectedGeo, isExpand) {
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
};

