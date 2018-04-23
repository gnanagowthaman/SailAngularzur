function renderGeoMap1() {

	console.log("renderGeoMap1");

var self= this;
		$.ajax({
                    type: 'GET',
                    url: '/regulation-status',
                    cache:false,
                    success: function(data) {
                      console.log("sucessfully data received",data);
                      updateregulation(data);
                    },
                    error: function(data) {
               			
                    }
             });



    try{
		$('.scrollbar-inner').scrollbar();
	} catch(err){}

	// try{

	    
	// 	var timer = !1;
	// 	_Ticker = $("#T1").newsTicker();
	// 	_Ticker.on("mouseenter",function(){
	// 		var __self = this;
	// 		timer = setTimeout(function(){
	// 			__self.pauseTicker();
	// 		},200);
	// 	});
	// 	_Ticker.on("mouseleave",function(){
	// 		clearTimeout(timer);
	// 		if(!timer) return !1;
	// 		this.startTicker();
	// 	});
	// } catch(err){}


	// $(window).resize(function() {
	// 	hamburguerMenu_Close();
	// });

	$("svg g.continent").click(function() {
	  	var idObj = $(this).attr('id');
	  	console.log('Map ID: ', idObj);
	  	mapSelection(idObj);
	});

	/* EVENTS */
	// $(".icon-view").click(function(event) {
	// 	//$("body").toggleClass('light');
 //                //alert("work well");
	// });
	// $(".hamburger-menu").click(function(event) {
	// 	hamburguerMenu_Open();
	// });
	// $(".close-menu, .close-menu2").click(function(event) {
	// 	hamburguerMenu_Close();
	// });

	// $(".label_alerts").click(function(event) {
 //    	$(this).parent().toggleClass('open_menu');
 // 	 });

	$(".arrow").click(function(event) {
		if($(this).parent().hasClass('opened')){
			$(this).parent().parent().height(95);
			$(this).parent().find('.news-db-text').height(38);
			$(this).parent().removeClass('opened');
		} else {
			var height = $(this).parent().find('.news-db-text').height();
			var scrollHeight = $(this).parent().find('.news-db-text')[0].scrollHeight;
			var diff = scrollHeight-height;

			$(this).parent().parent().height(95+diff);
			$(this).parent().find('.news-db-text').height(scrollHeight);
			$(this).parent().addClass('opened');
		}

	});





	$(".alerts_archive_details_b").click(function(event) {
		if($(this).hasClass('opened')){
			$(this).parent().parent().parent().height(150);
			$(this).parent().parent().parent().find('.search-result-date').height(100);
			$(this).parent().parent().parent().find('.search-result-icon').height(100);
			
			$(this).parent().parent().find('.search-result-text').height(38);
			$(this).toggleClass('opened');
		} else {
			var height = $(this).parent().parent().find('.search-result-text').height();
			var scrollHeight = $(this).parent().parent().find('.search-result-text')[0].scrollHeight;
			var diff = scrollHeight-height;

			$(this).parent().parent().parent().height(150+diff);
			$(this).parent().parent().parent().find('.search-result-date').height(100+diff);
			$(this).parent().parent().parent().find('.search-result-icon').height(100+diff);

			$(this).parent().parent().find('.search-result-text').height(scrollHeight);
			$(this).toggleClass('opened');
		}

	});

	$(".selection-map ul li").click(function(event) {
		var selection = $(this).html();
		/*$("#mainMap .continent").removeClass('selected');
		$(".selection-map ul li").removeClass('selected');
		$("#circles g.selected").removeClass("selected");
		$(this).addClass('selected');*/
		console.log("selection",selection);

		if(selection == "European Union"){
			/*$("#mainMap #europe").addClass('selected');
			$("#circles .circles_europe").addClass('selected');*/
			mapSelection("europe");
		} else if(selection == "Asia Pacific"){
			mapSelection("asiapacific");
		} else if(selection == "United States"){
			mapSelection("northamerica");
		} else if(selection == "Middle East"){
			mapSelection("middleeast");
		} else if(selection == "South Africa"){
			mapSelection("southafrica");
		} else if(selection == "All"){
			mapSelection("All");
		}
	});

	function mapSelection(continent){
		var contToShow;
		console.log("continent ::", continent);
		if(continent == "asiapacific"){
	  		$("svg g.continent.selected").removeClass("selected");
	  		$("#circles g.selected").removeClass("selected");
	  		$(".selection-map ul li.selected").removeClass('selected');

	  		//Map
	  		$("svg #asiapacific.continent").addClass("selected");
	  		//Title
	  		$(".title_map").html("ASIA PACIFIC");
	  		//Circles
	  		var circles = svg.selectAll(".circles_asiapacific circle");
	  		contToShow = $("#circles .circles_asiapacific");
	  		circles.each(showCircle);
	  		//List
	  		$(".selection-map .asiapacific").addClass('selected');
	  		//Code below added by Vahai
	  		console.log(app.ClientAppRouter.geoMap);
	  		var geoId = app.ClientAppRouter.geoMap['ASIA PACIFIC'];
	  		console.log('GEO ID: ', geoId);
	  		appRouter.currentView.renderLibraryByGeo(geoId,'Asia Pacific');
	  	} else if(continent == "asia"){
	  	} else if(continent == "northamerica"){
	  		$("svg g.continent.selected").removeClass("selected");
	  		$("#circles g.selected").removeClass("selected");
	  		$(".selection-map ul li.selected").removeClass('selected');

	  		//Map
	  		$("svg #northamerica.continent").addClass("selected");
	  		//Title
	  		$(".title_map").html("UNITED STATES");
	  		//Circles
	  		var circles = svg.selectAll(".circles_usa circle");
	  		contToShow = $("#circles .circles_usa");
	  		circles.each(showCircle);
	  		//List
	  		$(".selection-map .northamerica").addClass('selected');
	  		//Code below added by Vahai
	  		console.log(app.ClientAppRouter.geoMap);
	  		var geoId = app.ClientAppRouter.geoMap['UNITED STATES'];
	  		console.log('GEO ID: ', geoId);
	  		appRouter.currentView.renderLibraryByGeo(geoId,'United States');	  		
	  	} else if(continent == "southamerica"){
	  	} else if(continent == "middleeast"){
	  		$("svg g.continent.selected").removeClass("selected");
	  		$("#circles g.selected").removeClass("selected");
	  		$(".selection-map ul li.selected").removeClass('selected');

	  		//Map
	  		$("svg #middleeast.continent").addClass("selected");
	  		//Title
	  		$(".title_map").html("MIDDLE EAST");
	  		//Circles
	  		var circles = svg.selectAll(".circles_middleeast circle");
	  		contToShow = $("#circles .circles_middleeast");
	  		circles.each(showCircle);

	  		//List
	  		$(".selection-map .middleeast").addClass('selected');
	  		//Code below added by Vahai
	  		console.log(app.ClientAppRouter.geoMap);
	  		var geoId = app.ClientAppRouter.geoMap['MIDDLE EAST'];
	  		console.log('GEO ID: ', geoId);	  
	  		appRouter.currentView.renderLibraryByGeo(geoId,'Middle East');	  		
	  	} else if(continent == "europe"){
	  		$("svg g.continent.selected").removeClass("selected");
	  		$("#circles g.selected").removeClass("selected");
	  		$(".selection-map ul li.selected").removeClass('selected');

	  		//Map
	  		$("svg #europe.continent").addClass("selected");
	  		//Title
	  		$(".title_map").html("EUROPEAN UNION");
	  		//Circles
	  		var circles = svg.selectAll(".circles_europe circle");
	  		contToShow = $("#circles .circles_europe");
	  		circles.each(showCircle);
	  		//List
	  		$(".selection-map .europe").addClass('selected');
	  		//Code below added by Vahai
	  		console.log(app.ClientAppRouter.geoMap);
	  		var geoId = app.ClientAppRouter.geoMap['EUROPEAN UNION'];
	  		console.log('GEO ID: ', geoId);
	  		appRouter.currentView.renderLibraryByGeo(geoId,'European Union');		  		
	  	} else if(continent == "africa"){
	  	} else if(continent == "southafrica"){
	  	} else if(continent == "All"){
	  		$(".selection-map ul li.selected").removeClass('selected');

			$("#mainMap #europe").addClass('selected');
			$("#mainMap #asiapacific").addClass('selected');
			$("#mainMap #northamerica").addClass('selected');
			$("#mainMap #middleeast").addClass('selected');

			var circles = svg.selectAll("#circles circle");
			contToShow = $("#circles .circles_usa").addClass('selected');
			$("#circles .circles_europe").addClass('selected');
			$("#circles .circles_asiapacific").addClass('selected');
			$("#circles .circles_middleeast").addClass('selected');
	  		circles.each(showCircle);

			//Title
	  		$(".title_map").html("ALL");
			//List
	  		$(".selection-map .all").addClass('selected');
	  		//Code below added by Vahai
	  		// console.log(app.ClientAppRouter.geoMap);
	  		// var geoId = app.ClientAppRouter.geoMap['ALL'];
	  		// console.log('GEO ID: ', geoId);
	  		appRouter.currentView.renderLibraryByGeo(0, "All");		  		
		}

		function showCircle(){
  			var circle = d3.select(this);
			var attrR = circle.attr('r');
  			circle.attr('r', 0);
	  		contToShow.addClass('selected');
	  		circle = circle.transition()
					.duration(1000)
					.attr("r", attrR);
		}
	}

	// function hamburguerMenu_Open(){
	// 	$(".close-menu").show();
	// 	$(".close-menu2").show();
	// 	$(".navmenu").show();
	// }

	// function hamburguerMenu_Close(){
	// 	$(".close-menu").hide();
	// 	$(".close-menu2").hide();
	// 	$(".navmenu").css("display", "");
	// }



	try{
		console.log("RENDER MAP");
		var htmlSVG = document.getElementById('mainMap');
		var svg = d3.select(htmlSVG);
		
		

		/* Europe */
function updateregulation(data){
console.log("data  ::", data);
console.log("length of the dta",data.length);
for(var i=0;i<data.length;i++){
if(data[i].gname=="European Union"){
	  	var circles_europe = svg.select('.circles_europe');
	  	if(data[i].regulationStatus==2){
		circles_europe.append('circle')
	    .attr('cx', '280')
	    .attr('cy', '90')
	    .attr('r', findSizeCircle(data[i].count))
	    .style('fill', '#FF7300')
	    .style('fill-opacity', '0.6');

	    circles_europe.append('text')
	    .attr('dx', '270px')
	    .attr('dy', '83px')
	    .attr('x', '10')
	    .attr('y', '10')
	    .attr('text-anchor', 'middle')
	    .attr('stroke', '#51c5cf')
	    .attr('stroke-width', '0px')
	    .attr('font-size', '8')
	    .style('fill', '#FFF')
	    .style('fill-opacity', '0.6')
	    .text(data[i].count);
	  }else if(data[i].regulationStatus==3){
		circles_europe.append('circle')
	    .attr('cx', '300')
	    .attr('cy', '62')
	    .attr('r', findSizeCircle(data[i].count))
	    .style('fill', '#85D100')
	    .style('fill-opacity', '0.6');

	     circles_europe.append('text')
	    .attr('dx', '290px')
	    .attr('dy', '55px')
	    .attr('x', '10')
	    .attr('y', '10')
	    .attr('text-anchor', 'middle')
	    .attr('stroke', '#51c5cf')
	    .attr('stroke-width', '0px')
	    .attr('font-size', '8')
	    .style('fill', '#FFF')
	    .style('fill-opacity', '0.6')
	    .text(data[i].count);
      }else if(data[i].regulationStatus==1){
		circles_europe.append('circle')
	    .attr('cx', '307')
	    .attr('cy', '82')
	    .attr('r', findSizeCircle(data[i].count))
	    .style('fill', '#D22227')
	    .style('fill-opacity', '0.6');

	     circles_europe.append('text')
	    .attr('dx', '297px')
	    .attr('dy', '75px')
	    .attr('x', '10')
	    .attr('y', '10')
	    .attr('text-anchor', 'middle')
	    .attr('stroke', '#51c5cf')
	    .attr('stroke-width', '0px')
	    .attr('font-size', '8')
	    .style('fill', '#FFF')
	    .style('fill-opacity', '0.6')
	    .text(data[i].count);
	}
}
	    /* USA */     
else if(data[i].gname=="United States"){
	console.log("testing United States");
	  	var circles_usa = svg.select('.circles_usa');
	  if(data[i].regulationStatus==2){
		circles_usa.append('circle')
	    .attr('cx', '100px')
	    .attr('cy', '110px')
	    .attr('r', findSizeCircle(data[i].count))
	    .style('fill', '#FF7300')
	    .style('fill-opacity', '0.6');

	     circles_usa.append('text')
	    .attr('dx', '90px')
	    .attr('dy', '103px')
	    .attr('x', '10')
	    .attr('y', '10')
	    .attr('text-anchor', 'middle')
	    .attr('stroke', '#51c5cf')
	    .attr('stroke-width', '0px')
	    .attr('font-size', '8')
	    .style('fill', '#FFF')
	    .style('fill-opacity', '0.6')
	    .text(data[i].count);
	     }else if(data[i].regulationStatus==3){
		circles_usa.append('circle')
	    .attr('cx', '120px')
	    .attr('cy', '82px')
	    .attr('r', findSizeCircle(data[i].count))
	    .style('fill', '#85D100')
	    .style('fill-opacity', '0.6');

	    circles_usa.append('text')
	    .attr('dx', '110px')
	    .attr('dy', '75px')
	    .attr('x', '10')
	    .attr('y', '10')
	    .attr('text-anchor', 'middle')
	    .attr('stroke', '#51c5cf')
	    .attr('stroke-width', '0px')
	    .attr('font-size', '8')
	    .style('fill', '#FFF')
	    .style('fill-opacity', '0.6')
	    .text(data[i].count);

	    }else if(data[i].regulationStatus==1){ 
		circles_usa.append('circle')
	    .attr('cx', '127px')
	    .attr('cy', '102px')
	    .attr('r', findSizeCircle(data[i].count))
	    .style('fill', '#D22227')
	    .style('fill-opacity', '0.6');

	    circles_usa.append('text')
	    .attr('dx', '117px')
	    .attr('dy', '95px')
	    .attr('x', '10')
	    .attr('y', '10')
	    .attr('text-anchor', 'middle')
	    .attr('stroke', '#51c5cf')
	    .attr('stroke-width', '0px')
	    .attr('font-size', '8')
	    .style('fill', '#FFF')
	    .style('fill-opacity', '0.6')
	    .text(data[i].count);
}
}
	    /* MIDDLEEAST */
else if(data[i].gname=="Middle East"){
	  	var circles_middleeast = svg.select('.circles_middleeast');
	     if(data[i].regulationStatus==2){
		circles_middleeast.append('circle')
	    .attr('cx', '310')
	    .attr('cy', '160')
	    .attr('r', findSizeCircle(data[i].count))
	    .style('fill', '#FF7300')
	    .style('fill-opacity', '0.6');

	     circles_middleeast.append('text')
	    .attr('dx', '300px')
	    .attr('dy', '153px')
	    .attr('x', '10')
	    .attr('y', '10')
	    .attr('text-anchor', 'middle')
	    .attr('stroke', '#51c5cf')
	    .attr('stroke-width', '0px')
	    .attr('font-size', '8')
	    .style('fill', '#FFF')
	    .style('fill-opacity', '0.6')
	    .text(data[i].count);

	     }else if(data[i].regulationStatus==3){
		circles_middleeast.append('circle')
	    .attr('cx', '330')
	    .attr('cy', '132')
	    .attr('r', findSizeCircle(data[i].count))
	    .style('fill', '#85D100')
	    .style('fill-opacity', '0.6');

	    circles_middleeast.append('text')
	    .attr('dx', '320px')
	    .attr('dy', '125px')
	    .attr('x', '10')
	    .attr('y', '10')
	    .attr('text-anchor', 'middle')
	    .attr('stroke', '#51c5cf')
	    .attr('stroke-width', '0px')
	    .attr('font-size', '8')
	    .style('fill', '#FFF')
	    .style('fill-opacity', '0.6')
	    .text(data[i].count);

	     }else if(data[i].regulationStatus==1){ 
	    circles_middleeast.append('circle')
	    .attr('cx', '347')
	    .attr('cy', '152')
	    .attr('r', findSizeCircle(data[i].count))
	    .style('fill', '#D22227')
	    .style('fill-opacity', '0.6');

	     circles_middleeast.append('text')
	    .attr('dx', '337px')
	    .attr('dy', '145px')
	    .attr('x', '10')
	    .attr('y', '10')
	    .attr('text-anchor', 'middle')
	    .attr('stroke', '#51c5cf')
	    .attr('stroke-width', '0px')
	    .attr('font-size', '8')
	    .style('fill', '#FFF')
	    .style('fill-opacity', '0.6')
	    .text(data[i].count);
}
	 
}
	    /* ASIA PACIFIC */
else if(data[i].gname=="Asia Pacific"){
	  	var circles_asiapacific = svg.select('.circles_asiapacific');
	  	if(data[i].regulationStatus==2){
		circles_asiapacific.append('circle')
	    .attr('cx', '420')
	    .attr('cy', '140')
	    .attr('r', findSizeCircle(data[i].count))
	    .style('fill', '#FF7300')
	    .style('fill-opacity', '0.6');

	     circles_asiapacific.append('text')
	    .attr('dx', '410px')
	    .attr('dy', '133px')
	    .attr('x', '10')
	    .attr('y', '10')
	    .attr('text-anchor', 'middle')
	    .attr('stroke', '#51c5cf')
	    .attr('stroke-width', '0px')
	    .attr('font-size', '8')
	    .style('fill', '#FFF')
	    .style('fill-opacity', '0.6')
	    .text(data[i].count);
	     }else if(data[i].regulationStatus==3){
	    circles_asiapacific.append('circle')
	    .attr('cx', '440')
	    .attr('cy', '112')
	    .attr('r', findSizeCircle(data[i].count))
	    .style('fill', '#85D100')
	    .style('fill-opacity', '0.6');

	    circles_asiapacific.append('text')
	    .attr('dx', '430px')
	    .attr('dy', '105px')
	    .attr('x', '10')
	    .attr('y', '10')
	    .attr('text-anchor', 'middle')
	    .attr('stroke', '#51c5cf')
	    .attr('stroke-width', '0px')
	    .attr('font-size', '8')
	    .style('fill', '#FFF')
	    .style('fill-opacity', '0.6')
	    .text(data[i].count);

	    }else if(data[i].regulationStatus==1){ 
	    circles_asiapacific.append('circle')
	    .attr('cx', '457')
	    .attr('cy', '132')
	    .attr('r', findSizeCircle(data[i].count))
	    .style('fill', '#D22227')
	    .style('fill-opacity', '0.6');

	    circles_asiapacific.append('text')
	    .attr('dx', '447px')
	    .attr('dy', '125px')
	    .attr('x', '10')
	    .attr('y', '10')
	    .attr('text-anchor', 'middle')
	    .attr('stroke', '#51c5cf')
	    .attr('stroke-width', '0px')
	    .attr('font-size', '8')
	    .style('fill', '#FFF')
	    .style('fill-opacity', '0.6')
	    .text(data[i].count);

	}
	    
} 
	    /* South Africa */
	  	/*var circles_southafrica = svg.select('.circles_southafrica');
		circles_southafrica.append('circle')
	    .attr('cx', '280')
	    .attr('cy', '250')
	    .attr('r', findSizeCircle(47))
	    .style('fill', '#FF7300')
	    .style('fill-opacity', '0.6');

		circles_southafrica.append('circle')
	    .attr('cx', '300')
	    .attr('cy', '222')
	    .attr('r', findSizeCircle(25))
	    .style('fill', '#85D100')
	    .style('fill-opacity', '0.6');

		circles_southafrica.append('circle')
	    .attr('cx', '307')
	    .attr('cy', '242')
	    .attr('r', findSizeCircle(19))
	    .style('fill', '#D22227')
	    .style('fill-opacity', '0.6');

	    circles_southafrica.append('text')
	    .attr('dx', '270px')
	    .attr('dy', '243px')
	    .attr('x', '10')
	    .attr('y', '10')
	    .attr('text-anchor', 'middle')
	    .attr('stroke', '#51c5cf')
	    .attr('stroke-width', '0px')
	    .attr('font-size', '8')
	    .style('fill', '#FFF')
	    .style('fill-opacity', '0.6')
	    .text('47');

	    circles_southafrica.append('text')
	    .attr('dx', '290px')
	    .attr('dy', '215px')
	    .attr('x', '10')
	    .attr('y', '10')
	    .attr('text-anchor', 'middle')
	    .attr('stroke', '#51c5cf')
	    .attr('stroke-width', '0px')
	    .attr('font-size', '8')
	    .style('fill', '#FFF')
	    .style('fill-opacity', '0.6')
	    .text('25');

	    circles_southafrica.append('text')
	    .attr('dx', '297px')
	    .attr('dy', '235px')
	    .attr('x', '10')
	    .attr('y', '10')
	    .attr('text-anchor', 'middle')
	    .attr('stroke', '#51c5cf')
	    .attr('stroke-width', '0px')
	    .attr('font-size', '8')
	    .style('fill', '#FFF')
	    .style('fill-opacity', '0.6')
	    .text('19');*/
	}
}

	    function findSizeCircle(value){
	    	//Max 150 min 20	    	
	    	return ((2*value)+40)/2;
	    	// return (((130/100)*value)+20)/2;
	    	// return (((79/100)*value)+11)/2; Commented By Niranjan
	    	// var radius = (((79/100)*value)+11)/2;
	    	// if (radius < 20) {
	    	// 	radius = 20;
	    	// } else if (radius > 150) {
	    	// 	radius = 150;
	    	// }
	    	// return radius;
	    }
	} 

	
	catch(err){}
	

};
