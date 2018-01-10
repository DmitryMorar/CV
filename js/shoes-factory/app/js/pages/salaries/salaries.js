$(function () {

	drawAllItemsInPage();

	/*
	 * ====================================
	 * 		Draw all item and data in page
	 * ====================================
	 * */
	function drawAllItemsInPage() {
		$.getJSON("js/pages/database/db.json", function (data) {

			$.each(data, function (section) {

				switch (section) {

					case 'employees':
						$.each(this, function () {
							var employee = this;
							addItemEmployeeDropdown(employee.position, employee.name);
						});
						break;

					case 'models':
						$.each(this, function () {
							var model = this;
							addItemModelDropdown(model.model)
						});
						break;

					case 'listWorksDuringWeek':
						$.each(this, function () {
							var dataDay = this;
							addItemInWeeklyList(dataDay);
						});
						break;

					case 'moneysDuringWeek':
						var value = this;
						addDataInMoneyAtWeek(value);
						break;

					default:
				}
			})
		});
	}


	/*
	 * ====================================
	 * 		Add functions / change DOM
	 * ====================================
	 * */
	function addItemEmployeeDropdown(position, name) {

		var employeeDropdown = $('[data-dropdown-type=employee]');

		employeeDropdown.append(
			'<div class="js-dropdown-item dropdown__menu__item"><span>' + position + '</span><span>' + name + '</span></div>'
		)
	}

	function addItemModelDropdown(name) {

		var modelDropdown = $('[data-dropdown-type=model]');

		modelDropdown.append(
			'<div class="js-dropdown-item dropdown__menu__item">' + name + '</div>'
		)
	}

	function addItemInWeeklyList(dataDay) {

		//if obj dataDay from newOrder save him how array
		var dataEmployee = dataDay.employees ? dataDay.employees : [dataDay];

		var dateOfDay = dataDay.date,
			cutterList = $('[data-list-type=cutter]'),
			seamstressList = $('[data-list-type=seamstress]'),
			shoemakerList = $('[data-list-type=shoemaker]'),
			packerList = $('[data-list-type=packer]');

		$.each(dataEmployee, function (key, employee) {

			switch (employee.position) {

				case 'Закройщик':
					addItemInPositionList(cutterList, employee, dateOfDay);
					break;

				case 'Швея':
					addItemInPositionList(seamstressList, employee, dateOfDay);
					break;

				case 'Сапожник':
					addItemInPositionList(shoemakerList, employee, dateOfDay);
					break;

				case 'Упаковщик':
					addItemInPositionList(packerList, employee, dateOfDay);
					break;

				default:
			}
		})
	}

	function addItemInPositionList(listWhereAddItem, employee, dateOfDay) {

		listWhereAddItem.append(
			'<div class="js-days-list__item column__days-list__item">' +
			'<div class="js-item__title item__title">' + dateOfDay + '</div>' +
			'<div class="js-item__content item__content">' +
			'<div class="item__employee-name">' + employee.name + '</div>' +
			'<span class="item__employee-model">' + employee.model + '</span>' +
			'<span class="item__size" data-size="36">36/<span>' + employee.size36 + '</span> </span>' +
			'<span class="item__size" data-size="37">37/ <span>' + employee.size37 + '</span> </span>' +
			'<span class="item__size" data-size="38">38/ <span>' + employee.size38 + '</span> </span>' +
			'<span class="item__size" data-size="39">39/ <span>' + employee.size39 + '</span> </span>' +
			'<span class="item__size" data-size="40">40/ <span>' + employee.size40 + '</span> </span>' +
			'<span class="item__size" data-size="41">41/ <span>' + employee.size41 + '</span> </span>' +
			'</div>' +
			'</div>'
		)
	}

	//TODO find best solution
	function addDataInMoneyAtWeek(value) {
		var moneysAllWeek = value[0].totalSum.allWeek,
			allMoneysCutter = value[0].totalSum.cutter,
			allMoneysSeamstress = value[0].totalSum.seamstress,
			allMoneysShoemaker = value[0].totalSum.shoemaker,
			allMoneysPacker = value[0].totalSum.packer,
			moneysWeekPositionCutter = $('[data-moneys-during-week-employee=cutter]'),
			moneysWeekPositionSeamstress = $('[data-moneys-during-week-employee=seamstress]'),
			moneysWeekPositionShoemaker = $('[data-moneys-during-week-employee=shoemaker]'),
			moneysWeekPositionPacker = $('[data-moneys-during-week-employee=packer]'),
			moneysWeektoTotalSum = $('[data-moneys-during-week-total=sum]');

		moneysWeekPositionCutter.find('span').text(allMoneysCutter);
		moneysWeekPositionSeamstress.find('span').text(allMoneysSeamstress);
		moneysWeekPositionShoemaker.find('span').text(allMoneysShoemaker);
		moneysWeekPositionPacker.find('span').text(allMoneysPacker);
		moneysWeektoTotalSum.text(moneysAllWeek);
	}


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


	/*
	 * ====================================
	 * 	New orders
	 * ====================================
	 * */
	//handler on button which read fields values in orders
	$('.js-save-btn-new-order').click(function () {
		event.preventDefault();


			var cat = readNewOrder();

			addItemInWeeklyList(cat);

			clearFieldNewOrder();
	});

	//handler on button which clear fields values in orders
	$('.js-cancel-btn-new-order').click(function () {
		event.preventDefault();

		clearFieldNewOrder();
	});

	function readNewOrder() {

		var allInput = $('input[type=hidden]'),
			allSelect = $('select'),
			i = 0,
			max,
			key,
			value,
			newOrder = {};

		//save date where create orders
		newOrder.date = $('#datepicker').val();

		//save in obj employee data
		for (i, max = allInput.length; i < max; i++) {
			key = allInput[i].name;
			value = allInput[i].value;

			newOrder[key] = value;
		}

		//TODO duplicated code!!!
		//save in obj number of sizes
		for (i = 0, max = allSelect.length; i < max; i++) {
			key = allSelect[i].name;
			value = allSelect[i].value;

			newOrder[key] = value;
		}
		return newOrder
	}

	//clear fields in new order
	function clearFieldNewOrder() {

		//clear value in employee data
		var allInputs = $('input[type=hidden]'),
			allSelect = $('select'),
			dropDownTitles = $('.js-dropdown-title'),
			datePicker = $("#datepicker"),
			i = 0,
			max;

		//TODO find best solution
		dropDownTitles.removeClass('dark-color').addClass('grey-color');
		$(dropDownTitles[0]).text('Сотрудники');
		$(dropDownTitles[1]).text('Модель');

		datePicker.val('');

		//clear value in employee data
		for (i, max = allInputs.length; i < max; i++) {
			allInputs[i].value = '';
		}

		//TODO duplicated code!!!
		//clear value in number of sizes
		for (i = 0, max = allSelect.length; i < max; i++) {
			allSelect[i].value = '';
		}
	}


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

		//TODO find best solution
		if (allInputInCurrentDropDown.length == 2) {

			$(allInputInCurrentDropDown[0]).attr('value', employeePosition);
			$(allInputInCurrentDropDown[1]).attr('value', employeeName);

			//change title
			dropDownTitle.text(employeeName)

		} else if (allInputInCurrentDropDown.length == 1) {

			$(allInputInCurrentDropDown[0]).attr('value', modelName);

			//change title
			dropDownTitle.text(modelName)
		}

		$(this).parent(dropDownMenu).toggle('fast');
		dropDownTitle.addClass('dark-color');
	});


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

});
