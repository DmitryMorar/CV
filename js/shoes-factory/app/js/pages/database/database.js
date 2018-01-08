$(window).load(function () {

	var employeesList = $('.js-employee-list'),
		modelsList = $('.js-models-list'),
		rightBlock = $('.right-block');

	drawAllItems();


	//Add remove and edit buttons in cell
	//TODO find best solution
	rightBlock.on('mouseenter', '.js-list-row__item', function () {

		$(this).append($('<span class="js-button-edit-item list-row__item__edit-button fa fa-pencil"></span>'));
		$(this).append($('<span class="js-button-delete-item list-row__item__delete-button fa fa-trash-o"></span>'));

	}).on('mouseleave', '.js-list-row__item', function () {

		$(this).find('.js-button-edit-item').remove();
		$(this).find('.js-button-delete-item').remove();
	});


	/*
	 * ====================================
	 * 	Edit item
	 * ====================================
	 * */

	//handler on button which edit cell
	rightBlock.on('click', '.js-button-edit-item', function (event) {

		var target =event.target,
			itemOffset = $(target).offset().top,
			itemType = $(target).parent().data('item-type');


		//TODO find best solution
		var changeItem = readCellInItem(target);

		if (itemType == 'employees') {
			addEmployeesModalBox(changeItem.id, changeItem.position, changeItem.name, itemOffset);
		}
		if (itemType == 'models') {
			addModelsModalBox(itemOffset, changeItem.model, changeItem.cutter, changeItem.seamstress, changeItem.shoemaker, changeItem.packer, changeItem.id);
		}

	});


	function readCellInItem(target) {
		var allField = $(target).parent().children('.js-edit-cell'),
			changeItem = {},
			key,
			value,
			i = 0;

		changeItem.id = $(target).parent().data('item-id');

		for (i; i < allField.length; i++) {
			key = $(allField[i]).data('cell-type');
			value = $(allField[i]).text();
			changeItem[key] = value
		}

		return changeItem
	}


	/*
	 * ====================================
	 * 	Modal-box
	 * ====================================
	 * */

	//handler on buttons in modal-box
	rightBlock.on('click', '.js-button-modal-box', function () {

		var buttonAction = $(this).data('action'),
			//TODO why don't work with variable
			fieldsInModalBox = $('.js-modal-box').find('.js-field-modal-box');

		if (buttonAction == 'save') {
			//TODO find best solution
			var modalValue = readModalBox(fieldsInModalBox);

			//if new item
			if (modalValue.id == 'undefined') {
				modalValue.id = Math.floor(Math.random() * 1000);

				//what type of item
				if (modalValue.position == undefined) {
					addNewModels(modalValue.id, modalValue.model, modalValue.cutter, modalValue.seamstress, modalValue.shoemaker, modalValue.packer);
					deleteModalBox();
					return
				}
				addNewEmployees(modalValue.id, modalValue.position, modalValue.name);
				deleteModalBox();
			}
		}
		if (buttonAction == 'cancel') {
			deleteModalBox()
		}
	});

	//delete modal-box
	function deleteModalBox() {
		$('.js-modal-box').remove();
		$('.js-modal-overlay').remove();
	}

	//read all modal-box in db page
	function readModalBox(fieldsInModalBox) {
		var i = 0,
			modalValue = {},
			key,
			value;
		for (i; i < fieldsInModalBox.length; i++) {
			key = $(fieldsInModalBox[i]).data('cell-type');
			value = $(fieldsInModalBox[i]).val();
			modalValue[key] = value;
		}
		return modalValue
	}


	//add employee modal-box
	function addEmployeesModalBox(id, position, name, itemOffset) {

		//if this modal-box new, clear value
		//TODO find best solution
		if (id == undefined) {
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

	}

	//add model modal-box
	function addModelsModalBox(itemOffset, model, cutter, seamstress, shoemaker, packer, id) {

		//if this modal-box new, clear value
		//TODO find best solution
		if (id == undefined) {
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
	}


	/*
	 * ====================================
	 * 		Add new item
	 * ====================================
	 * */

	//handler on button
	var buttonAddNewItem = $('.js-add-new-item');

	$(buttonAddNewItem).click(function () {

			var listType = $(this).data('list-type');

			if (listType == 'employees') {
				addEmployeesModalBox()
			} else if (listType == 'models') {
				addModelsModalBox()
			}
		}
	);

	//template employee item
	function addNewEmployees(id, position, name) {
		employeesList.prepend(
			'<div class="js-list-row__item list-row__item  animated flipInX" data-item-id="' + id + '" data-item-type="employees" >' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_employees" data-cell-type="position">' + position + '</div>' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_employees" data-cell-type="name">' + name + '</div>' +
			'</div>'
		)
	}

	//template model item
	function addNewModels(id, model, cutter, seamstress, shoemaker, packer) {
		modelsList.prepend(
			'<div class="js-list-row__item list-row__item list-row__item_models animated flipInX" data-item-id="' + id + '" data-item-type="models">' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_models" data-cell-type="model">' + model + '</div>' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_models" data-cell-type="cutter">' + cutter + '</div>' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_models" data-cell-type="seamstress">' + seamstress + '</div>' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_models" data-cell-type="shoemaker">' + shoemaker + '</div>' +
			'<div class="js-edit-cell list-row__item__cell list-row__item__cell_models" data-cell-type="packer">' + packer + '</div>' +
			'</div>'
		)
	}


	/*
	 * ====================================
	 * 	Delete item
	 * ====================================
	 * */

	//TODO find solution with setTime and animation
	//handler on button which delete item
	rightBlock.on('click', '.js-button-delete-item', function (event) {
			var target = event.target;
			$(target).parent().remove();
		}
	);


	/*
	 * ====================================
	 * 		Draw all item
	 * ====================================
	 * */

	function drawAllItems() {
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
	}

});
