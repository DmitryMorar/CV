$(window).load(function () {

	var employeesList = $('.js-employee-list');
	drawAllEmployee();


	/*
	 * =============================
	 * 	Add edit item
	 * =============================
	 * */

	//Add/remove buttons in cell
	//TODO find best solution
	$('.right-block').on('mouseenter', '.js-list-row__item', function () {

		$(this).append($('<span class="js-button-edit-item list-row__item__edit-button fa fa-pencil"></span>'));
		$(this).append($('<span class="js-button-delete-item list-row__item__delete-button fa fa-trash-o"></span>'));

	}).on('mouseleave', '.js-list-row__item', function () {

		$(this).find('.js-button-edit-item').remove();
		$(this).find('.js-button-delete-item').remove();
	});

	//handler on button which edit cell
	$('.right-block').on('click', '.js-button-edit-item', function () {

		var allField = $(this).parent().children('.js-edit-cell'),
			itemType = $(this).parent().data('item-type'),
			changeEmp = {},
			key,
			value,
			i = 0,
			itemOffset = $(this).offset().top;


		changeEmp.itemType = itemType;
		changeEmp.id = $(this).parent().data('item-id');

			for (i; i < allField.length; i++) {
				key = $(allField[i]).data('cell-type');
				value = $(allField[i]).text();
				changeEmp[key] = value
			}


		addModalEditCell(changeEmp.id, changeEmp.position, changeEmp.name, itemOffset);

		console.log(changeEmp);
	});


		//	addModalEditCell(offset.top, offset.left, textCell);


		//var typeCell = $(this).parent().data('cell-type');
		//
		//var offset = $(this).offset();
		////TODO find best realise
		//if (offset.left > 500) {
		//	offset.left = 700;
		//
		//	addModalEditCell(offset.top, offset.left, textCell);
		//	return
		//}
		//offset.left = 180;
		//addModalEditCell(offset.top, offset.left, textCell)


	function addModalEditCell(id, position, name, itemOffset) {

		$('.right-block').prepend(
			'<div class="js-modal-box modal-box modal-box_new-employees" data-modal-type="employees" style="top:'+itemOffset+'px">' +
			'<div class="modal-box__inner">' +
			'<div class="modal-box__form form form_new-employees">' +
			'<div class="modal-box__field w90">' +
			'<input class="js-field-modal-box field field_modal" type="text" placeholder="Должность" data-cell-type="position" value="'+position+'">' +
			'</div>' +
			'<div class="modal-box__field">' +
			'<input class="js-field-modal-box field field_modal" type="text" placeholder="ФИО" data-cell-type="name" value="'+name+'">' +
			'</div>' +
			'</div>' +
			'<input class="js-field-modal-box field field_modal disnone" type="text" data-cell-type="id" value="'+id+'">' +
			'<div class="modal-box__buttons">' +
			'<button class="js-button-modal-box btn_modal-box btn_green btn" data-action="save"><span class="fa fa-check"></span></button>' +
			'<button class="js-button-modal-box btn_modal-box btn_red btn" data-action="cancel"><span class="fa fa-times"></span></button>' +
			'</div></div></div>');
		$('body').append('<div class="js-modal-overlay modal_overlay"></div>');

		//var filedModalWindow = $('.js-field-modal-box');
		//$(filedModalWindow).focus();

		////TODO убедись что это лучшее решение!
		//var inpuT = document.getElementById('int');
		//inpuT.setSelectionRange($(filedModalWindow).val().length, $(filedModalWindow).val().length)
	}


	//handler buttons on modal-box
	$('.right-block').on('click', '.js-button-modal-box', function (e) {



		var buttonAction = $(this).data('action');
		var fieldModalBox = $('.js-modal-box').find('.js-field-modal-box');
		var listItemId = $('.js-list-item').data('item-id');


		if (buttonAction == 'save') {


		}
		if (buttonAction == 'cancel') {
			$('.js-modal-box').remove();
			$('.js-modal-overlay').remove();
		}
	});


	function readModalBox(val) {

		fieldModalBox.each(function (indx, element) {

			console.log($(this).data('type-cell'))


		})

	}

	//TODO найди лучше решение с setTime...
	//handler on button which delete item
	$('.right-block').on('click', '.js-button-delete-item', function (event) {
			var target = event.target;

			$(target).parent().addClass('animated slideOutLeft');
			$(target).parent().remove();

			//setTimeout(func, 100);
			//function func() {
			//
			//}
		}
	);

	/*
	 * =============================
	 * 		Add new item
	 * =============================
	 * */

	//handler on button
	var buttonAddNewItem = $('.js-add-new-item');

	function addNewEmployees(id, position, name) {
		employeesList.append(
			'<div class="js-list-row__item list-row__item  animated flipInX" data-item-id="' + id + '" data-item-type="employees" >' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_employees" data-cell-type="position">' + position + '</div>' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_employees" data-cell-type="name">' + name + '</div>' +
			'</div>')
	}


	$(buttonAddNewItem).click(function () {

			var whichList = $(this).data('list');

			if (whichList == 'employees') {


			} else if (whichList == 'models') {

				console.log('Привет! Mod')

			}
		}
	);


	//drawList
	function drawAllEmployee() {

		$.getJSON("js/pages/database/db.json", function (data) {
			$.each(data, function (section) {

				if (section == 'employees') {
					$.each(this, function (key, val) {
						addNewEmployees(val.id, val.position, val.name);
					})

				} else if (section == 'models') {
					$.each(this, function (key, val) {

					});
				}
			})
		});

	}

});
