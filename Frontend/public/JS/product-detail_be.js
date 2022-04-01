$(document).ready(function () {
    console.log("Document ready, loading data from Service");



    $.ajax({
        url: "http://localhost:8000/api/produkt/gib/" + getCookie("objectCookie"),
        method: "get",
        dataType: "json"
    }).done(function (response) {
        console.log("Data loaded successfully");
        console.log(response);

        var content = '';
        var bruttopreis;
        var pfand = '';

        var obj = response.daten;

        bruttopreis = (obj.bruttopreis.toString()).replace(".", ",");
        pfand = (obj.pfandstufe.gebuehr.toString()).replace(".", ",");
        content += '<div class="conatainer-fluid col-12">';
        content += '<div class="row mt-5">';
        content += '<div class="col-6">';
        content += '<img src="' + obj.bilder.bildpfad + '" id="product_picture" alt="Produkt"></div>';
        content += '<div class="col-6">';
        content += '<h3 class="underscored">' + obj.name + '</h3>';
        content += '<h4 id="price">' + bruttopreis + '&#x20ac</h4>';
        content += '<div class="container-fluid col-12">';
        content += '<div class="row">';
        content += '<input type="number" id="numeric" class="col-1 form-control" value="1" min=1 onkeypress="return /[0-9]/i.test(event.key)" oninput="helpme();priceCalc(' + obj.bruttopreis + ')">';
        content += '<button type="button" id="prod_sendbtn" onclick="Add()"	class="col-3 btn align-self-center btn-danger">In den Warenkorb</button>';
        content += '</div>';
        content += '</div>';
        content += '<p class="underscored1"></p>';
        content += '<div class="container-fluid col-12">';
        content += '<div class="row">';
        content += '<div class="col-4">';
        content += '<p id="artikel_details">Artikelnummer</p>';
        content += '</div>';
        content += '<div class="col-3">';
        content += '<p id="artikel_details1">' + obj.id + '</p>';
        content += '</div>';
        content += '</div>';
        content += '</div>';
        content += '<p id="upperscored"></p>';
        content += '<div class="container-fluid col-12">';
        content += '<div class="row">';
        content += '<div class="col-4">';
        content += '<p id="artikel_details">Pfand pro Flasche</p>';
        content += '</div>';
        content += '<div class="col-3">';
        content += '<p id="artikel_details1">' + pfand + '&#x20ac</p>';
        content += '</div>';
        content += '</div>';
        content += '</div>';
        content += '<p id="upperscored"></p>';
        content += '</div>';
        content += '</div>';
        content += '</div>';
        content += '<div class="conatainer-fluid col-12">';
        content += '<h4 class="underscored2"> Beschreibung </h4>';
        content += '<p id="discription">' + obj.beschreibung + '</p>';
        content += '</div>';



        // neuen code zusammensetzen



        // zusammengesetzen Code im Dokument ausgeben
        $('#dyntargetDetail').html(content);


    });
});
function helpme() {
    var g = document.getElementById("numeric");
    g.value = g.value <= 360 ? g.value : 360;
}
