$(function () {

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

	// Load Tree Object
	$('#files').tree({
		expanded: 'li:first'
	});

	// Left Menu Events
	$(".title-panel").click(function(event) {
		if($(this).hasClass('close')){
			$(".title-panel").removeClass('close');
			$("#files").show();
			$(".left-panel").width('auto');
		} else{
			$(".title-panel").addClass('close');
			$("#files").hide();
			$(".left-panel").width(50);
		}
	});

	// Left Menu Events
	$(".regulation-tracker .panel-title .content-header-min, .regulation-tracker .panel-title .content-header-max").click(function(event) {
		var container = $(".regulation-tracker .panel-container");
		if(container.hasClass('close')){
			container.removeClass('close');
		} else{
			container.addClass('close');
		}
	});

	// Event to select domains from checkboxs
	$(".domains-container li, .status-container li").click(function(event) {
		if($(this).hasClass('selected')){
			$(this).removeClass('selected');
		} else {
			$(this).addClass('selected');
		}
	});

	// Event to select continents from Map
	$("svg g.continent").click(function() {
		var idObj = $(this).attr('id');
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
			} else {
				$(".regions-container li").addClass('selected');
			}
		} else {
			if($(this).hasClass('selected')){
				$(this).removeClass('selected');
			} else {
				$(this).addClass('selected');
			}

			if (!$(".regions-container li.item").not(".selected").length) {
				$(".regions-container li.all").addClass('selected');
			} else{
				$(".regions-container li.all").removeClass('selected');
			}
		}

		var selection = $(this).html();

		if(selection == "Europe"){
			mapSelection("europe", $(this).hasClass('selected'));
		} else if(selection == "Asia Pacific"){
			mapSelection("asiapacific", $(this).hasClass('selected'));
		} else if(selection == "USA &amp; Canada"){
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
		$("#files a").click(function(event) {
			$(".pdf-container").removeClass('pdf');
		});

		//Showing when Its PDF the file
		$(".pdfClickEvent").click(function(event) {
			event.preventDefault();

			$(".pdf-container").addClass('pdf');

			PDFJS.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

			var url = $(this).attr("href");

			// Asynchronous download of PDF
			var loadingTask = PDFJS.getDocument(url);
			loadingTask.promise.then(function(pdf) {
				console.log('PDF loaded');

				// Fetch the first page
				var pageNumber = 1;
				pdf.getPage(pageNumber).then(function(page) {
					console.log('Page loaded');

					var scale = 2;
					var viewport = page.getViewport(scale);

				    // Prepare canvas using PDF page dimensions
				    var canvas = document.getElementById('the-canvas');
				    var context = canvas.getContext('2d');
				    canvas.height = viewport.height;
				    canvas.width = viewport.width;

				    // Render PDF page into canvas context
				    var renderContext = {
				    	canvasContext: context,
				    	viewport: viewport
				    };
				    var renderTask = page.render(renderContext);
				    renderTask.then(function () {
				    	console.log('Page rendered');
				    });
				});
			}, function (reason) {
				// PDF loading error
				console.error(reason);
			});

		});

	});

