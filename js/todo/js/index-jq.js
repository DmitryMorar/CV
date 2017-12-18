$(document).ready(function () {

    var items = [];
    var idCount = 0;
    var arrayCount = 0;

    function createElement() {
        var inputValue = $('.js-jq').val();

        if (inputValue == '') {
            $('.state').css({'color': '#ff0000', 'visibility': 'visible'}).text('Must not be empty!');
        } else {
            items.push({txt: inputValue, id: idCount});
            idCount++;

            for (arrayCount; arrayCount < items.length; arrayCount++) {
                addElement(items[arrayCount].txt, arrayCount);
            }
        }
    }

    function addElement(newEl, id) {
        $('.state').text('');
        $('.list').append('<li data-item-id="' + id + '">' + newEl + '<span class="remove"></span></li>');
        $('.count').html(items.length);
        $('.js-jq').val('');
    }

    //	handler enter
    $('.js-jq').bind('keydown', function (e) {
        if (e.keyCode === 13) {
            createElement();
        }
    });

    //	handler button "Ok"
    $('.js-btn').on('click', function () {
        createElement();
    });

    //	handler remove element
    $('.list').on('click', '.remove', function () {
        var keyEl = $(this).parent().data("item-id");
        for (var i = 0; i <= items.length; i++) {

            if (keyEl == items[i].id) {

                $(this).parent().remove();
                items.splice(i, 1);
                $('.count').html(items.length);

                arrayCount--;
                idCount--;

                break
            }
        }
    });
});