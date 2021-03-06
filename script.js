/**
 * Created by LEE on 2016/10/10.
 */

var colorChoice = 4;

$(document).ready(function () {
    $("#random-button").on("click", function () {
        colorChoice = Math.floor(Math.random() * colorC500Array.length);
        changeColor();
    });

    $("#search-box").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            searchWiki();
        }
    });
});

function searchWiki() {
    var listContainer = $("#list-container");
    var masterContainer = $("#master-container");

    listContainer.text("");

    var title = $("#search-box").val();
    if (title == "") {
        masterContainer.attr("class", "vertical-center");
    }

    var url = "";
    var itemUrl = "";
    var snippetStr = "";

    url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="
        + encodeURI(title) + "&format=json&callback=?";

    $.getJSON(url, function (data) {
        var searchResult = data.query.search;

        masterContainer.attr("class", "");

        searchResult.forEach(function (val) {
            itemUrl = "https://en.wikipedia.org/wiki/" + val.title;
            snippetStr = val.snippet;

            listContainer.hide();

            listContainer.append(
                //assign a link to the proper
                $("<a>").attr({
                    "href": itemUrl,
                    "target": "_blank",
                    "class": "list-group-item"
                }).append(
                    $("<h2>")
                        .append(val.title))
                    .append($("<p>").append(snippetStr)
                    )
            );
        });
        listContainer.show("slide", {direction: "down"});
        changeColor();
    });
}

function changeColor() {
    $("body").animate({backgroundColor: colorC500Array[colorChoice]}, 1000);
    $("#list-container a").animate({borderColor: colorC500Array[colorChoice]}, 1000)
        .hover(function () {
                $(this).css("border-color", "white");
            },
            function () {
                $(this).css("border-color", colorC500Array[colorChoice]);
            });
}