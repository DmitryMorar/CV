$(window).load(function () {


	drawAllItemsInDropdown();

	/*
	 * ====================================
	 * 		Dropdown
	 * ====================================
	 * */

	var dropDown = $('.js-dropdown'),
		dropDownMenu = $('.js-dropdown-menu');


	dropDown.click(function () {
		$(this).find(dropDownMenu).toggle('fast');
	});

	dropDownMenu.on('click', '.js-dropdown-item', function () {

		event.stopPropagation();

		var mainParent = $(this).parent(dropDownMenu).parent(dropDown),
			dropDownTitle = $(this).parent(dropDownMenu).prev('.js-dropdown-title'),
			allInputInCurrentDropDown = mainParent.find('input[type=hidden]'),
			employeePosition = $(this).find('span:first').text(),
			employeeName = $(this).find('span:last').text(),
			modelName = $(this).text();

		if (allInputInCurrentDropDown.length == 2) {

			$(allInputInCurrentDropDown[0]).attr('value', employeePosition);
			$(allInputInCurrentDropDown[1]).attr('value', employeeName)

			//change title
			dropDownTitle.text(employeeName)

		} else if (allInputInCurrentDropDown.length == 1) {

			$(allInputInCurrentDropDown[0]).attr('value', modelName);

			//change title
			dropDownTitle.text(modelName)
		}

		$(this).parent(dropDownMenu).toggle('fast');
		dropDownTitle.css('color', '#000');
	});

	/*
	 * ====================================
	 * 		Draw all item in dropdown
	 * ====================================
	 * */

	var modelDropdown = $('[data-dropdown-type=model]'),
		employeeDropdown = $('[data-dropdown-type=employee]');


	function drawAllItemsInDropdown() {
		$.getJSON("js/pages/database/db.json", function (data) {

			$.each(data, function (section) {

				if (section == 'employees') {

					$.each(this, function (key, val) {
						addItemEmployeeDropdown(val.position, val.name);
					})
				}

				if (section == 'models') {
					$.each(this, function (key, val) {
						addItemModelDropdown(val.model)
					});
				}
			})
		});
	}


	function addItemEmployeeDropdown(position, name) {

		employeeDropdown.append(
			'<div class="js-dropdown-item dropdown__menu__item"><span>' + position + '</span><span>' + name + '</span></div>'
		)
	}

	function addItemModelDropdown(name) {

		modelDropdown.append(
			'<div class="js-dropdown-item dropdown__menu__item">' + name + '</div>'
		)
	}


	/*
	 * ====================================
	 * 		Datepicker
	 * ====================================
	 * */

	$("#datepicker").datepicker({
		monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		firstDay: 1,
		dateFormat: "M d",
		monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
	});


	/*
	 * ====================================
	 * 		Weekly list
	 * ====================================
	 * */

	//handler which open content in item
	$('.js-days-list').on('click', '.js-days-list__item', function () {
		event.stopPropagation();

		var currentItem = $(this),
			daysItemContent = currentItem.find('.js-item__content');

		daysItemContent.toggle('fast');
	});


	//draw all item in weekly list
	//function drawAllItemInWeeklyList() {
	//
	//	$.getJSON("js/pages/database/db.json", function (data) {
	//
	//		$.each(data, function (section) {
	//
	//			if (section == 'employees') {
	//
	//				$.each(this, function (key, val) {
	//					addItemEmployeeDropdown(val.position, val.name);
	//				})
	//			}
	//
	//			if (section == 'models') {
	//				$.each(this, function (key, val) {
	//					addItemModelDropdown(val.model)
	//				});
	//			}
	//		})
	//	});
	//}


});




