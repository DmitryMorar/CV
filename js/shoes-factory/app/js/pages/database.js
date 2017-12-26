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

			$(target).append($('<span class="js-button-edit-cell list-row__item__cell__edit-button fa fa-pencil"></span>'));
		},
		function () {

			//TODO найди лучшее решение

			$(this).find("span:last").remove();
			//$(this).$('<span class="list-row__item__cell__edit-button fa fa-pencil"></span>').remove();
		}
	);

	//handler which edit cell
	$(cellInItem).on('click', '.js-button-edit-cell', function () {

		var textCell = $(this).parent().text();

		var offset = $(this).offset();
		//TODO найди лучшее решение вставки модального окна
		if (offset.left > 500) {
			offset.left = 700;

			addModalWindow(offset.top, offset.left, textCell);
			return
		}
		offset.left = 180;
		addModalWindow(offset.top, offset.left, textCell)
	});


	//add modal window

	function addModalWindow(offsetTop, offsetLeft, textCell) {


		$('.right-block').prepend('<div class="js-modal-window modal-window" style="top:' + offsetTop + 'px; left:' + offsetLeft + 'px">' +
			'<div class="modal-window__inner">' +
			'<div class="modal-window__form form">' +
			'<div class="modal-window__field">' +
			'<input id="int" class="js-field-modal-window field field_modal" type="text" value="'+textCell+'">' +
			'</div></div>' +
			'<div class="modal-window__buttons">' +
			'<button class="js-button-modal-window btn_modal-window btn_green btn" data-action="save"><span class="fa fa-check"></span></button>' +
			'<button class="js-button-modal-window btn_modal-window btn_red btn" data-action="cancel"><span class="fa fa-times"></span></button>' +
			'</div></div></div>');
		$('body').append('<div class="js-modal-overlay modal_overlay"></div>');

		var filedModalWindow = $('.js-field-modal-window');


		$(filedModalWindow).focus();

		//TODO не знаю насколько хорошо! думаю есть решение лучше!
		var inpuT = document.getElementById('int');
		inpuT.setSelectionRange($(filedModalWindow).val().length, $(filedModalWindow).val().length)
	}

	//handler on modal buttons
	$('.right-block').on('click', '.js-button-modal-window', function () {

		var buttonAction = $(this).data('action');

		if (buttonAction == 'save') {

			return
		}

		$('.js-modal-window').remove();
		$('.js-modal-overlay').remove();
	});


	//TODO подумай как лучше использовать setTime...
	//handler on button which delete item
	$(employeeList).on('click', '.js-delete-item', function (event) {
			var target = event.target;

			$(this).parent().addClass('animated slideOutLeft');
			function func() {
				target.parentElement.remove();
			}

			setTimeout(func, 500);
		}
	);

	//handler on button which add new employee or shoes-model
	var buttonAddNewItem = $('.js-add-new-employee');
	var i = 0;

	var templateNewItem = ('<div class="js-list-new-item list-row__item list-row__item_add-new animated flipInX">' +
	'<div class="js-edit-cell list-row__item__cell employee-position">Test</div>' +
	'<div class="js-edit-cell list-row__item__cell employee-name">Test</div>' +
	'<span class="js-delete-item list-row__item__delete-button fa fa-trash-o">' +
	'</div>');

	$(buttonAddNewItem).click(
		function () {
			employeeList.prepend(templateNewItem)

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
