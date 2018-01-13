/*
* Draw all items
* Edit item
* Modal-box
* Add new item
* Delete item
* */

$(function() {

	var rightBlock = $('.right-block');

	/*
	 * 		Draw all item
	 * ====================================
	 * */

	var drawAllItems = function() {
		$.getJSON("js/pages/database/db.json", function (data) {
			$.each(data, function (section) {
				if (section == 'employees') {
					$.each(this, function (key, val) {
						addNewEmployees(val.id, val.position, val.name);
					})
				}

				if (section == 'models') {
					$.each(this, function (key, val) {
						addNewModels(val.id, val.model, val.price.cutter, val.price.seamstress, val.price.shoemaker, val.price.packer)
					});
				}
			})
		});
	};

	drawAllItems();

	/*
	 * 	Edit item
	 * ====================================
	 * */

	//Add remove/edit buttons in cell
	rightBlock.on('mouseenter', '.js-list-row__item', function () {

		$(this).append($('<span class="js-button-edit-item list-row__item__edit-button fa fa-pencil"></span>'));
		$(this).append($('<span class="js-button-delete-item list-row__item__delete-button fa fa-trash-o"></span>'));

	}).on('mouseleave', '.js-list-row__item', function () {

		$(this).find('.js-button-edit-item').remove();
		$(this).find('.js-button-delete-item').remove();
	});

	//handler on button which edit cell
	rightBlock.on('click', '.js-button-edit-item', function (event) {

		var currentItem = event.target,
			itemOffset = $(currentItem).offset().top,
			itemType = $(currentItem).parent().data('item-type');

		var changeableItem = readCellsInItem(currentItem);

		switch (itemType) {
			case 'employees':
				addEmployeesModalBox(changeableItem.id, changeableItem.position, changeableItem.name, itemOffset);
				break;

			case 'models':
				addModelsModalBox(itemOffset, changeableItem.model, changeableItem.cutter, changeableItem.seamstress, changeableItem.shoemaker, changeableItem.packer, changeableItem.id);
				break;

			default:
				alert('I NOT UNDERSTAND TYPE ITEM')
		}
	});

	var readCellsInItem = function (currentItem) {
		var allFields = $(currentItem).parent().children('.js-edit-cell'),
			changeableItem = {},
			key,
			value,
			i = 0,
			max;

		changeableItem.id = $(currentItem).parent().data('item-id');

		for (i, max = allFields.length; i < max; i++) {
			key = $(allFields[i]).data('cell-type');
			value = $(allFields[i]).text();
			changeableItem[key] = value
		}

		return changeableItem
	};

	/*
	 * 	Modal-box
	 * ====================================
	 * */

	//handler on modal-box buttons
	rightBlock.on('click', '.js-button-modal-box', function () {

		var buttonTypeAction = $(this).data('action'),
			fieldsInModalBox = $('.js-modal-box').find('.js-field-modal-box');

		var dataModalBox = readFieldsModalBox(fieldsInModalBox);

		//if new item
		if (dataModalBox.id === undefined) {
			dataModalBox.id = Math.floor(Math.random() * 1000);
		}

		switch (buttonTypeAction) {

			case 'save':
				//check type of item
				if (dataModalBox.hasOwnProperty('model')) {
					addNewModels(dataModalBox.id, dataModalBox.model, dataModalBox.cutter, dataModalBox.seamstress, dataModalBox.shoemaker, dataModalBox.packer);
					deleteModalBox();
					return

				}else if (dataModalBox.hasOwnProperty('position')) {

					addNewEmployees(dataModalBox.id, dataModalBox.position, dataModalBox.name);
					deleteModalBox();
					return
				}
				break;

			case 'cancel':
				deleteModalBox();
				break;

			default:
				alert('MODAL BOX BUTTON DON`T WORKED');
		}
	});

	var deleteModalBox = function() {
		$('.js-modal-box').remove();
		$('.js-modal-overlay').remove();
		},

		readFieldsModalBox = function(fieldsInModalBox) {

		var modalValue = {},
			i = 0,
			max,
			key,
			value;

		for (i,max = fieldsInModalBox.length; i < max; i++) {
			key = $(fieldsInModalBox[i]).data('cell-type');
			value = $(fieldsInModalBox[i]).val();

			modalValue[key] = value;
		}

		return modalValue
		},

 		addEmployeesModalBox = function (id, position, name, itemOffset) {

		//if this modal-box new, clear value
		//TODO find best solution
		if (id === undefined) {
			position = '';
			name = '';
		}

		rightBlock.prepend(
			'<div class="js-modal-box modal-box modal-box_employees" data-modal-type="employees" style="top:' + itemOffset + 'px">' +
			'<div class="modal-box__inner">' +
			'<div class="modal-box__form form form_employees">' +
			'<div class="modal-box__field w90">' +
			'<input class="js-field-modal-box field field_modal-box" type="text" placeholder="Должность" data-cell-type="position" value="' + position + '">' +
			'</div>' +
			'<div class="modal-box__field">' +
			'<input class="js-field-modal-box field field_modal-box" type="text" placeholder="ФИО" data-cell-type="name" value="' + name + '">' +
			'</div>' +
			'</div>' +
			'<input class="js-field-modal-box field field_modal-box disnone" type="text" data-cell-type="id" value="' + id + '">' +
			'<div class="modal-box__buttons">' +
			'<button class="js-button-modal-box btn btn_outline-green" data-action="save"><span class="fa fa-check"></span></button>' +
			'<button class="js-button-modal-box btn btn_outline-red" data-action="cancel"><span class="fa fa-times"></span></button>' +
			'</div></div></div>'
		);
		$('body').append('<div class="js-modal-overlay modal_overlay"></div>');

	 },

		addModelsModalBox = function (itemOffset, model, cutter, seamstress, shoemaker, packer, id) {

		//if this modal-box new, clear value
		//TODO find best solution
		if (id === undefined) {
			model = '';
			cutter = '';
			seamstress = '';
			shoemaker = '';
			packer = '';
		}

		rightBlock.prepend(
			'<div class="js-modal-box modal-box modal-box_models" data-modal-type="models" style="top:' + itemOffset + 'px">' +
			'<div class="modal-box__inner">' +
			'<div class="modal-box__form form form_models">' +
			'<div class="modal-box__field w90">' +
			'<input class="js-field-modal-box field field_modal-box" type="text" placeholder="Модель" data-cell-type="model" value="' + model + '">' +
			'</div>' +
			'<div class="modal-box__field w65">' +
			'<input class="js-field-modal-box field field_modal-box" type="text" placeholder="Закройщик" data-cell-type="cutter" value="' + cutter + '">' +
			'</div>' +
			'<div class="modal-box__field w65">' +
			'<input class="js-field-modal-box field field_modal-box" type="text" placeholder="Швея" data-cell-type="seamstress" value="' + seamstress + '">' +
			'</div>' +
			'<div class="modal-box__field w65">' +
			'<input class="js-field-modal-box field field_modal-box" type="text" placeholder="Сапожник" data-cell-type="shoemaker" value="' + shoemaker + '">' +
			'</div>' +
			'<div class="modal-box__field w65">' +
			'<input class="js-field-modal-box field field_modal-box" type="text" placeholder="Упаковщик" data-cell-type="packer" value="' + packer + '">' +
			'</div>' +
			'</div>' +
			'<input class="js-field-modal-box field field_modal-box disnone" type="text" data-cell-type="id" value="' + id + '">' +
			'<div class="modal-box__buttons">' +
			'<button class="js-button-modal-box btn btn_outline-green" data-action="save"><span class="fa fa-check"></span></button>' +
			'<button class="js-button-modal-box btn btn_outline-red" data-action="cancel"><span class="fa fa-times"></span></button>' +
			'</div></div></div>'
		);
		$('body').append('<div class="js-modal-overlay modal_overlay"></div>');
	};

	/*
	 * 	Add new item
	 * ====================================
	 * */

	//handler on button which add new item
	$('.js-add-new-item').click(function () {

			var listType = $(this).data('list-type');

			switch (listType) {
			case 'employees':
				addEmployeesModalBox();
				break;

			case 'models':
				addModelsModalBox();
				break;

			default:
				alert('ADD NEW DON`T WORKED')
			}
		});

		//template employee item
	var addNewEmployees = function(id, position, name) {
		$('.js-employee-list').prepend(
			'<div class="js-list-row__item list-row__item  animated flipInX" data-item-id="' + id + '" data-item-type="employees" >' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_employees" data-cell-type="position">' + position + '</div>' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_employees" data-cell-type="name">' + name + '</div>' +
			'</div>'
		)

		},

		//template model item
		addNewModels = function(id, model, cutter, seamstress, shoemaker, packer) {
		$('.js-models-list').prepend(
			'<div class="js-list-row__item list-row__item list-row__item_models animated flipInX" data-item-id="' + id + '" data-item-type="models">' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_models" data-cell-type="model">' + model + '</div>' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_models" data-cell-type="cutter">' + cutter + '</div>' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_models" data-cell-type="seamstress">' + seamstress + '</div>' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_models" data-cell-type="shoemaker">' + shoemaker + '</div>' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_models" data-cell-type="packer">' + packer + '</div>' +
			'</div>'
		)
	};

	/*
	 * 	Delete item
	 * ====================================
	 * */

	//handler on button which delete item
	rightBlock.on('click', '.js-button-delete-item', function (event) {
		var target = event.target;
		$(target).parent().remove();
	});
});
