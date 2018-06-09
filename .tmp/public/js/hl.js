$(function () {
    try{
		$('.scrollbar-inner').scrollbar();
	} catch(err){}

	try{
		var timer = !1;
		_Ticker = $("#T1").newsTicker();
		_Ticker.on("mouseenter",function(){
			var __self = this;
			timer = setTimeout(function(){
				__self.pauseTicker();
			},200);
		});
		_Ticker.on("mouseleave",function(){
			clearTimeout(timer);
			if(!timer) return !1;
			this.startTicker();
		});
	} catch(err){}


	$(window).resize(function() {
		hamburguerMenu_Close();
	});

	$("svg g.continent").click(function() {
	  	var idObj = $(this).attr('id');
	  	mapSelection(idObj);
	});

	/* EVENTS */
	$(".icon-view").click(function(event) {
		//$("body").toggleClass('light');
                //alert("work well");
	});
	$(".hamburger-menu").click(function(event) {
		hamburguerMenu_Open();
	});
	$(".close-menu, .close-menu2").click(function(event) {
		hamburguerMenu_Close();
	});

	$(".label_alerts").click(function(event) {
		$(this).parent().toggleClass('open_menu');
	});

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

		if(selection == "Europe"){
			/*$("#mainMap #europe").addClass('selected');
			$("#circles .circles_europe").addClass('selected');*/
			mapSelection("europe");
		} else if(selection == "Asia Pacific"){
			mapSelection("asiapacific");
		} else if(selection == "USA &amp; Canada"){
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
	  	} else if(continent == "asia"){
	  	} else if(continent == "northamerica"){
	  		$("svg g.continent.selected").removeClass("selected");
	  		$("#circles g.selected").removeClass("selected");
	  		$(".selection-map ul li.selected").removeClass('selected');

	  		//Map
	  		$("svg #northamerica.continent").addClass("selected");
	  		//Title
	  		$(".title_map").html("USA & CANADA");
	  		//Circles
	  		var circles = svg.selectAll(".circles_usa circle");
	  		contToShow = $("#circles .circles_usa");
	  		circles.each(showCircle);
	  		//List
	  		$(".selection-map .northamerica").addClass('selected');
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
	  	} else if(continent == "europe"){
	  		$("svg g.continent.selected").removeClass("selected");
	  		$("#circles g.selected").removeClass("selected");
	  		$(".selection-map ul li.selected").removeClass('selected');

	  		//Map
	  		$("svg #europe.continent").addClass("selected");
	  		//Title
	  		$(".title_map").html("EUROPE");
	  		//Circles
	  		var circles = svg.selectAll(".circles_europe circle");
	  		contToShow = $("#circles .circles_europe");
	  		circles.each(showCircle);
	  		//List
	  		$(".selection-map .europe").addClass('selected');
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

	try{
		var htmlSVG = document.getElementById('mainMap');
		var svg = d3.select(htmlSVG);

		/* Europe */
	  	var circles_europe = svg.select('.circles_europe');
		circles_europe.append('circle')
	    .attr('cx', '280')
	    .attr('cy', '90')
	    .attr('r', findSizeCircle(70))
	    .style('fill', '#FF7300')
	    .style('fill-opacity', '0.6');

		circles_europe.append('circle')
	    .attr('cx', '300')
	    .attr('cy', '62')
	    .attr('r', findSizeCircle(45))
	    .style('fill', '#85D100')
	    .style('fill-opacity', '0.6');

		circles_europe.append('circle')
	    .attr('cx', '307')
	    .attr('cy', '82')
	    .attr('r', findSizeCircle(1))
	    .style('fill', '#D22227')
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
	    .text('70');

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
	    .text('45');

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
	    .text('1');

	    /* USA */
	  	var circles_usa = svg.select('.circles_usa');
		circles_usa.append('circle')
	    .attr('cx', '100')
	    .attr('cy', '110')
	    .attr('r', findSizeCircle(23))
	    .style('fill', '#FF7300')
	    .style('fill-opacity', '0.6');

		circles_usa.append('circle')
	    .attr('cx', '120')
	    .attr('cy', '82')
	    .attr('r', findSizeCircle(40))
	    .style('fill', '#85D100')
	    .style('fill-opacity', '0.6');

		circles_usa.append('circle')
	    .attr('cx', '127')
	    .attr('cy', '102')
	    .attr('r', findSizeCircle(12))
	    .style('fill', '#D22227')
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
	    .text('23');

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
	    .text('40');

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
	    .text('12');

	    /* MIDDLEEAST */
	  	var circles_middleeast = svg.select('.circles_middleeast');
		circles_middleeast.append('circle')
	    .attr('cx', '310')
	    .attr('cy', '160')
	    .attr('r', findSizeCircle(30))
	    .style('fill', '#FF7300')
	    .style('fill-opacity', '0.6');

		circles_middleeast.append('circle')
	    .attr('cx', '330')
	    .attr('cy', '132')
	    .attr('r', findSizeCircle(45))
	    .style('fill', '#85D100')
	    .style('fill-opacity', '0.6');

	    circles_middleeast.append('circle')
	    .attr('cx', '347')
	    .attr('cy', '152')
	    .attr('r', findSizeCircle(70))
	    .style('fill', '#D22227')
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
	    .text('30');

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
	    .text('45');
		
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
	    .text('70');

	    /* ASIA PACIFIC */
	  	var circles_asiapacific = svg.select('.circles_asiapacific');
		circles_asiapacific.append('circle')
	    .attr('cx', '420')
	    .attr('cy', '140')
	    .attr('r', findSizeCircle(100))
	    .style('fill', '#FF7300')
	    .style('fill-opacity', '0.6');

	    circles_asiapacific.append('circle')
	    .attr('cx', '440')
	    .attr('cy', '112')
	    .attr('r', findSizeCircle(15))
	    .style('fill', '#85D100')
	    .style('fill-opacity', '0.6');

	    circles_asiapacific.append('circle')
	    .attr('cx', '457')
	    .attr('cy', '132')
	    .attr('r', findSizeCircle(20))
	    .style('fill', '#D22227')
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
	    .text('100');

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
	    .text('15');

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
	    .text('20');

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

	    function findSizeCircle(value){
	    	//Max 150 min 20
	    	
	    	//return (((130/100)*value)+20)/2;
	    	return (((79/100)*value)+11)/2;
	    }
	} catch(err){}

});

/*(function() {
    var path = '//easy.myfonts.net/v2/js?sid=575(font-family=Futura+BT+Pro+Bold)&sid=313024(font-family=Futura+BT+Pro+Book)&sid=313029(font-family=Futura+BT+Pro+Light)&sid=313031(font-family=Futura+BT+Pro+Medium)&key=mYK4owxwre',
        protocol = ('https:' == document.location.protocol ? 'https:' : 'http:'),
        trial = document.createElement('script');
    trial.type = 'text/javascript';
    trial.async = true;
    trial.src = protocol + path;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(trial);
})();*/

/*var svg = null;
var maproot = null;

d3.xml("img/map.svg", function(error, xml) {
  if (error) throw error;

  // "xml" is the XML DOM tree
  var htmlSVG = document.getElementById('mainMap');  // the svg-element in our HTML file
  // append the "maproot" group to the svg-element in our HTML file
  htmlSVG.appendChild(xml.documentElement.getElementById('maproot'));

  // d3 objects for later use
  svg = d3.select(htmlSVG);
  maproot = svg.select('#asiapacific');

  // get the svg-element from the original SVG file
  var xmlSVG = d3.select(xml.getElementsByTagName('svg')[0]);
  // copy its "viewBox" attribute to the svg element in our HTML file
  svg.attr('viewBox', xmlSVG.attr('viewBox'));
});*/
