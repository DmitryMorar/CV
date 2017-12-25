$(window).load(function () {

	var employeeList = $('.js-employee-list');


	var listItem = $('.list-row__item');

	var arrEmployee = [];
	drawAllEmployee();


	//TODO хочется реализовать делегирование события, не работает на новых элементах
	//handler add edit-button in cell
	var cellInItem = $(".js-edit-cell");
	$(cellInItem).hover(
		function (event) {
			var target = event.target;
			$(target).append($('<span class="list-row__item__cell__edit-button fa fa-pencil"></span>'));
		},
		function () {

			//TODO найди лучшее решение

			$(this).find("span:last").remove();
			//$(this).$('<span class="list-row__item__cell__edit-button fa fa-pencil"></span>').remove();
		}
	);

	//TODO подумай как лучше использовать setTime...
	//handler on button which delete item
	$(employeeList).on('click', '.js-delete-item', function (event) {
			var target = event.target;

			$(this).parent().addClass('animated bounceOutLeft');
			function func() {
				target.parentElement.remove();
			}

			setTimeout(func, 500);
		}
	);

	//handler on button which add new employee or shoes-model
	var buttonAddNewItem = $('.js-add-new-employee');
	var i = 0;

	//TODO how i can save this codi in path add handler on newItem?
	function addNewItem() {
		employeeList.prepend('<div class="js-list-new-item list-row__item list-row__item_add-new animated wobble">' +
			'<div class="js-edit-cell list-row__item__cell employee-position">Test</div>' +
			'<div class="js-edit-cell list-row__item__cell employee-name">Test</div>' +
			'<span class="js-delete-item list-row__item__delete-button fa fa-trash-o">' +
			'</span><span class="js-save-new-item list-row__item__save-button btn_green fa fa-check"></span>' +
			'<span class="js-cancel-new-item list-row__item__cancel-button btn_red fa fa-times"></span>' +
			'</div>')
	}

	$(buttonAddNewItem).click(
		function () {
			addNewItem();
		}
	);


	//add new employees
	function drawAllEmployee() {
		if (arrEmployee.length != 0) {
			for (i = 0; i < arrEmployee.length; i++) {

			}
		}
	}

});
