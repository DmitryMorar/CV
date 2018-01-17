/*
 * 	Menu toggle
 * ====================================
 * */

$('.navbar-toggle').click(function(e) {

	var buttonToggle = $(e.target);

	toggleMenu(buttonToggle);
});

//TODO find best solution
var toggleMenu = function(buttonToggle) {
	var leftBlock = $('.left-block'),
		navbar = $('.nav-wrap');

	if($(buttonToggle).hasClass('menu-on')) {
		leftBlock.css('left', '0');
		navbar.css('left', '-115px');
		$(buttonToggle).removeClass('menu-on');
		return
	}

	leftBlock.css('left', '115px');
	navbar.css('left', '0');
	$(buttonToggle).addClass('menu-on');
};
