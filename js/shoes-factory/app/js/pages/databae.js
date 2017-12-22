$(window).load(function () {

    var listItem = $(".js-list-item");
    $(listItem).hover(
        function() {
            $(this).append( $("<span> ***</span>"));
        }, function() {
            $(this).find("span:last").remove();
        }
    );

});