$(window).load(function () {

	var arrEmployee = [];
	drawAllEmployee();


	//TODO хочется реализовать делегирование события
	//handler add edit-button in cell
	var listItem = $(".js-edit-cell");
	$(listItem).hover(
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

	//handler on button which delete item
	var buttonDeleteItem = $('.js-delete-item');
	$(buttonDeleteItem).click(
		function (event) {
			var target = event.target;
			target.parentElement.remove();
		}
	);

	//handler on button which add new employee or shoes-model
	var buttonAddNewEmployee = $('.js-add-new-employee');
	var listRow = $('.js-list-row');
	var i = 0;

	$(buttonAddNewEmployee).click(
		function () {


		}
	);

	//add on list all employees

	function drawAllEmployee() {
		if (arrEmployee.length != 0) {
			for (i = 0; i < arrEmployee.length; i++) {

			}
		}
	}

});
