var jSearch = (function (){
	// Item List
	var input = $('input');
	var items = $('.item');
	
	// Search Listener
	input.keyup(function() {
		var input = $(this).val();
		
		switch(true){	
			case input === '':
				items.css('opacity', '1');
				break;
			default:
				items.css('opacity', '0.2');
				items.filter('[data-type*="' + input.toLowerCase() + '"]').css('opacity', '1');			
				break;
		}
	});
}());
$( "#input_search" ).focus(function() {
	$( "ul.list-group" ).show();
});
$( "#input_search" ).focusout(function() {
	$( "ul.list-group" ).hide();
	$( "#input_search" ).val().empty();
	$( "#input_search" ).val().clear();
});

$( "#input_search" ).blur(function(){
    $(this).val('');
});