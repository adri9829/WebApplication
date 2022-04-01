$(document).ready(function () {
    console.log("Document ready, loading data from Service");

    $.ajax({
        url: "http://localhost:8000/api/kategorie/alle",
        method: "get",
        dataType: "json"
    }).done(function (response) {
        console.log("Data loaded successfully");
        console.log(response);

        var content = '';

        content += '<nav class="navbar navbar-expand-sm">';
        content += '<ul class="navbar-nav">';
        content += '<li class="nav-item" id="categorynav">';
        content += '<a class="nav-link" href="index.html">';
        content += '<img id="homeButton" src="pictures/home-1.png" alt="Home">';
        content += '</li>';



        // neuen code zusammensetzen

        for (i = 1; i < response.daten.length; i++) {
            var obj = response.daten[i];

            content += '<li class="nav-item categorynav_item">';
            content += '<a class="nav-link text-dark text-center" href="non_alcoholic-cat.html">' + obj.name + '</a>';
            content += '</li>';

        };

        content += '</ul>';
        content += '</nav>';


        $('#dyntarget2').html(content);
    });
});


