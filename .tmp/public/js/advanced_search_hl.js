// $(function () {
// 	// Event to select domains from checkboxs
// 	$(".advanced_selection li").click(function(event) {
// 		$(this).toggleClass('selected');
// 	});

// 	$(".regulation-tracker .content-header-min").click(function(event) {
// 		$(".panel_container_a").hide();
// 		$(".regulation-tracker .content-header-max").show();
// 		$(this).hide();
// 	});

// 	$(".regulation-tracker .content-header-max").click(function(event) {
// 		$(".panel_container_a").show();
// 		$(".regulation-tracker .content-header-min").show();
// 		$(this).hide();
// 	});
// });

function advanceSearchCheckbox() {
	// Event to select domains from checkboxs
	// $(".advanced_selection li").click(function(event) {
	// 	$(this).toggleClass('selected');
	// });

	$(".regulation-tracker .content-header-min").click(function(event) {
		$(".panel_container_a").hide();
		$(".regulation-tracker .content-header-max").show();
		$(this).hide();
	});

	$(".regulation-tracker .content-header-max").click(function(event) {
		$(".panel_container_a").show();
		$(".regulation-tracker .content-header-min").show();
		$(this).hide();
	});
}

