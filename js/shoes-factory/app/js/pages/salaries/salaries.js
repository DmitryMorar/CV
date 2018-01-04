$(window).load(function () {

	var dropDown = $('.js-dropdown');
	var dropDownMenu = $('.js-dropdown__menu');


	dropDown.click(function(event) {

		dropDownMenu.slideToggle('fast');

	});

	dropDown.on('click', '.js-dropdown-item', function() {
		//console.log($(this).find(span).text())
		console.log($(this).data('employee-position'))

	})

});