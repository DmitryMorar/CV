/*
* Draw all item and data in page
* Add functions / change DOM
* Weekly list
* New orders
* DropDown
* DatePicker
* */

$(function () {

	/*
	 * 	Draw all item and data in page
	 * ====================================
	 * */

	var drawAllItemsInPage = function() {
		$.getJSON("js/pages/database/db.json", function (data) {

			//TODO maybe use other loop
			$.each(data, function (section) {

				switch (section) {

					case 'employees':
						$.each(this, function () { //this - employees section
							var employee = this;
							addItemInDropDonw(employee);
						});
						break;

					case 'models':
						$.each(this, function () { //this - models section
							var model = this;
							addItemInDropDonw(model);
						});
						break;

					case 'listWorksDuringWeek':
						$.each(this, function () { //this - listWorksDuringWeek section
							var dataDay = this;
							addItemInWeeklyList(dataDay);
						});
						break;

					case 'moneysDuringWeek':
						var moneysWeek = this;
						addDataInMoneysWeek(moneysWeek);
						break;

					default:
				}
			})
		});
	};
	drawAllItemsInPage();

	/*
	 * 	Add functions / change DOM
	 * ====================================
	 * */

	var addItemInDropDonw = function (obj) {

			if (typeof obj !== 'object') {
				return false
			}

			var employeeDropdown = $('[data-dropdown-type=employee]'),
				modelDropdown = $('[data-dropdown-type=model]');

			//check dropdown type item
			if (obj.hasOwnProperty('position')) {
				employeeDropdown.append(
					'<div class="js-dropdown-item dropdown__menu__item" data-item-type="employees"><span>' + obj.position + '</span><span>' + obj.name + '</span></div>'
				)
			} else if (obj.hasOwnProperty('model')) {
				modelDropdown.append(
					'<div class="js-dropdown-item dropdown__menu__item" data-item-type="models">' + obj.model + '</div>'
				)
			}

		},

		addItemInWeeklyList = function (dataDay) {

			if (typeof dataDay !== 'object') {
				return
			}

			var dateOfDay = dataDay.date,
				cutterList = $('[data-list-type=cutter]'),
				seamstressList = $('[data-list-type=seamstress]'),
				shoemakerList = $('[data-list-type=shoemaker]'),
				packerList = $('[data-list-type=packer]'),

			//if obj dataDay from newOrder save him how array
				dataEmployee = dataDay.employees ? dataDay.employees : [dataDay];

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
		},

		addItemInPositionList = function (listWhereAddItem, employee, dateOfDay) {

			if (typeof employee !== 'object') {
				return
			}

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
		},

		addDataInMoneysWeek = function (moneyWeek) {

			if (typeof moneyWeek !== 'object') {
				return
			}

			var itemsPosition = $('.js-moneys-week__employee'),
				moneysWeekTotalSum = $('[data-moneys-week=total]'),
				i = 0,
				max;

			for (i, max = itemsPosition.length; i < max; i++) {

				//dependency between obj property and data-attribute of DOM element
				var a = $(itemsPosition[i]).data('moneys-week-employee'),
					b = moneyWeek[a];

				$(itemsPosition[i]).find('span').text(b);
			}
			moneysWeekTotalSum.text(moneyWeek.total);
		};

	/*
	 *	Weekly list
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
	 * 	New orders
	 * ====================================
	 * */

	//handler on button which read fields values in orders
	$('.js-save-btn-new-order').click(function () {
		event.preventDefault();

		var objNewOrder = readNewOrder();

		addItemInWeeklyList(objNewOrder);

		clearFieldsNewOrder();
	});

	//handler on button which clear fields values in orders
	$('.js-cancel-btn-new-order').click(function () {
		event.preventDefault();

		clearFieldsNewOrder();
	});

	var readNewOrder = function () {

			var allInput = $('input[type=hidden]'),
				allSelect = $('select'),
				newOrder = {};

			//save date where create orders
			newOrder.date = $('#datepicker').val();

			//save in obj employee data
			readFieldsNewOrder(allInput, newOrder);

			//save in obj number of sizes
			readFieldsNewOrder(allSelect, newOrder);

			return newOrder
		},

		readFieldsNewOrder = function (nodes, newOrder) {
			for (var i = 0, max = nodes.length; i < max; i++) {
				key = nodes[i].name;
				value = nodes[i].value;
				newOrder[key] = value;
			}
		},

		clearFieldsNewOrder = function () {

			//clear value in employee data
			var allInputs = $('input[type=hidden]'),
				allSelect = $('select'),
				dropDownTitles = $('.js-dropdown-title'),
				datePicker = $("#datepicker");

			//TODO find best solution
			dropDownTitles.removeClass('dark-color').addClass('grey-color');
			$(dropDownTitles[0]).text('Сотрудники');
			$(dropDownTitles[1]).text('Модель');

			datePicker.val('');

			//clear value in employee data
			clearValuesNewOrder(allInputs);

			//clear value in number of sizes
			clearValuesNewOrder(allSelect);

		},

		clearValuesNewOrder = function (nodes) {

			for (var i = 0, max = nodes.length; i < max; i++) {
				nodes[i].value = '';
			}

		};


	/*
	 * 	DropDown
	 * ====================================
	 * */

	//handler which show/close dropdown menu
	$('.js-dropdown').click(function () {

		var dropDownMenu = $('.js-dropdown-menu');

		$(this).find(dropDownMenu).toggle('fast');
	});

	//handler on dropdown item
	$('.js-dropdown-menu').on('click', '.js-dropdown-item', function (event) {
		event.stopPropagation();

		var currentItem = event.currentTarget,
			mainParent = $(currentItem).parent($('.js-dropdown-menu')).parent($('.js-dropdown')),
			dropDownMenu = $(currentItem).parent('.js-dropdown-menu'),
			dropDownTitle = mainParent.find($('.js-dropdown-title'));

		var itemData = readCurrentItem(currentItem);

		changeTextDropdown(currentItem, itemData);

		$(currentItem).parent(dropDownMenu).toggle('fast');
		dropDownTitle.addClass('dark-color');
	});

	var readCurrentItem = function (currentItem) {

		var obj1 = {},
			employeePosition = $(currentItem).find('span:first').text(),
			employeeName = $(currentItem).find('span:last').text(),
			modelName = $(currentItem).text(),
			typeItem = $(currentItem).data('item-type');

		switch (typeItem) {
			case 'employees':
				obj1.typeItem = typeItem;
				obj1.position = employeePosition;
				obj1.name = employeeName;
				break;

			case 'models':
				obj1.typeItem = typeItem;
				obj1.model = modelName;
				break;

			default:
		}
		return obj1;
		},

		changeTextDropdown = function (currentItem, itemData) {

		if (typeof itemData !== 'object') {
			return false
		}

		var mainParent = $(currentItem).parent().parent(),
			allInputsDropDown = mainParent.find('input[type=hidden]'),
			dropDownTitle = mainParent.find($('.js-dropdown-title'));

		//TODO find best solution
		if (allInputsDropDown.length == 1) {
			$(allInputsDropDown[0]).attr('value', itemData.model);

			dropDownTitle.text(itemData.model); //change title

		} else if (allInputsDropDown.length == 2) {
			$(allInputsDropDown[0]).attr('value', itemData.position);
			$(allInputsDropDown[1]).attr('value', itemData.name);

			dropDownTitle.text(itemData.name); //change title
		}
	};

	/*
	 * 	DatePicker
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