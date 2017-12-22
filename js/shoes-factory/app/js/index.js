$(window).load(function () {

    var dataShoemaker = {
        firstShoemaker: {
            name: 'name',
            sizeShoe: [],
            allSize: 1,
            allSizeInWeek: 0
        },
        secondShoemaker: {
            name: 'name',
            sizeShoe: [],
            allSize: 1,
            allSizeInWeek: 0
        },
        thirdShoemaker: {
            name: 'name',
            sizeShoe: [],
            allSize: 1,
            allSizeInWeek: 0
        },
        fourthShoemaker: {
            name: 'name',
            sizeShoe: [],
            allSize: 1,
            allSizeInWeek: 0
        }
    };

    var dispatch = {
        s40: 0,
        s41: 0,
        s42: 0,
        s43: 0,
        s44: 0,
        s45: 0,
        allS: 0
    };


    $('.js-btn-save-entry').click(function (event) {
        event.preventDefault();

        var nameShoemaker = $('.js-name-employee :selected').text();
        var dayWeek = $('.js-day-of-week :selected').text();
        var sizesShoe0 = $('.js-size-40 :selected').text();
        var sizesShoe1 = $('.js-size-41 :selected').text();
        var sizesShoe2 = $('.js-size-42 :selected').text();
        var sizesShoe3 = $('.js-size-43 :selected').text();
        var sizesShoe4 = $('.js-size-44 :selected').text();
        var sizesShoe5 = $('.js-size-45 :selected').text();

        if (nameShoemaker == 'Дима') {

            dataShoemaker.firstShoemaker.name = nameShoemaker;
            dataShoemaker.firstShoemaker.sizeShoe = [sizesShoe0, sizesShoe1, sizesShoe2, sizesShoe3, sizesShoe4, sizesShoe5];
            dataShoemaker.firstShoemaker.allSize = sumAllSize(dataShoemaker.firstShoemaker.sizeShoe);
            dataShoemaker.firstShoemaker.allSizeInWeek += dataShoemaker.firstShoemaker.allSize;
            $('.js-first-employee-week >.item-count').text(dataShoemaker.firstShoemaker.allSizeInWeek);

            saveSumDispatch(dataShoemaker.firstShoemaker.sizeShoe);
            drawSumDispatch(dispatch);
            // var a = ''
            createDayInCalendar('.js-first-employee-day', dayWeek, dataShoemaker.firstShoemaker.allSize)

        }
        if (nameShoemaker == 'Игорь') {

            dataShoemaker.secondShoemaker.name = nameShoemaker;
            dataShoemaker.secondShoemaker.sizeShoe = [sizesShoe0, sizesShoe1, sizesShoe2, sizesShoe3, sizesShoe4, sizesShoe5];
            dataShoemaker.secondShoemaker.allSize = sumAllSize(dataShoemaker.secondShoemaker.sizeShoe);
            dataShoemaker.secondShoemaker.allSizeInWeek += dataShoemaker.secondShoemaker.allSize


            saveSumDispatch(dataShoemaker.secondShoemaker.sizeShoe);
            drawSumDispatch(dispatch);
            $('.js-second-employee-week >.item-count').text(dataShoemaker.secondShoemaker.allSizeInWeek);
            createDayInCalendar('.js-second-employee-day', dayWeek, dataShoemaker.secondShoemaker.allSize)
        }
        if (nameShoemaker == 'Рома') {

            dataShoemaker.thirdShoemaker.name = nameShoemaker;
            dataShoemaker.thirdShoemaker.sizeShoe = [sizesShoe0, sizesShoe1, sizesShoe2, sizesShoe3, sizesShoe4, sizesShoe5];
            dataShoemaker.thirdShoemaker.allSize = sumAllSize(dataShoemaker.thirdShoemaker.sizeShoe);
            dataShoemaker.thirdShoemaker.allSizeInWeek += dataShoemaker.thirdShoemaker.allSize;


            saveSumDispatch(dataShoemaker.thirdShoemaker.sizeShoe);
            drawSumDispatch(dispatch);
            $('.js-third-employee-week >.item-count').text(dataShoemaker.thirdShoemaker.allSizeInWeek);
            createDayInCalendar('.js-third-employee-day', dayWeek, dataShoemaker.thirdShoemaker.allSize)
        }
        if (nameShoemaker == 'Саша') {

            dataShoemaker.fourthShoemaker.name = nameShoemaker;
            dataShoemaker.fourthShoemaker.sizeShoe = [sizesShoe0, sizesShoe1, sizesShoe2, sizesShoe3, sizesShoe4, sizesShoe5];
            dataShoemaker.fourthShoemaker.allSize = sumAllSize(dataShoemaker.fourthShoemaker.sizeShoe);
            dataShoemaker.fourthShoemaker.allSizeInWeek += dataShoemaker.fourthShoemaker.allSize;


            saveSumDispatch(dataShoemaker.fourthShoemaker.sizeShoe);
            drawSumDispatch(dispatch);
            $('.js-fourth-employee-week >.item-count').text(dataShoemaker.fourthShoemaker.allSizeInWeek);
            createDayInCalendar('.js-fourth-employee-day', dayWeek, dataShoemaker.fourthShoemaker.allSize)
        }

    });


    function sumAllSize(a) {
        var sum = parseInt(a[0]) + parseInt(a[1]) + parseInt(a[2]) + parseInt(a[3]) + parseInt(a[4]) + parseInt(a[5]);
        return sum
    }

    function saveSumDispatch(a) {
        dispatch.s40 += parseInt(a[0]);
        dispatch.s41 += parseInt(a[1]);
        dispatch.s42 += parseInt(a[2]);
        dispatch.s43 += parseInt(a[3]);
        dispatch.s44 += parseInt(a[4]);
        dispatch.s45 += parseInt(a[5]);
        dispatch.allS = dispatch.s40 + dispatch.s41 + dispatch.s42 + dispatch.s43 + dispatch.s44 + dispatch.s45;

    }

    function drawSumDispatch(a) {
        $('.js-dispatch-size-40 >.item-count').text(a.s40);
        $('.js-dispatch-size-41 >.item-count').text(a.s41);
        $('.js-dispatch-size-42 >.item-count').text(a.s42);
        $('.js-dispatch-size-43 >.item-count').text(a.s43);
        $('.js-dispatch-size-44 >.item-count').text(a.s44);
        $('.js-dispatch-size-45 >.item-count').text(a.s45);
        $('.js-dispatch-total-count').text(a.allS);
    }


    function createDayInCalendar(a, b, c) {
        $(a).append('<div class="employee__amount-in-day"><span class="day__date js-day__date">' + b + '</span><span class="day__amount js-day__amount"><span class="value">' + c + '</span> шт</span> <span class="js-remove-day glyphicon glyphicon-remove"></span> </div>')
    }

// Remove day
    $('.js-remove-day').bind('click', function () {
        $(this).parents('.employee__amount-in-day').remove();
        console.log('1');
    });


});
