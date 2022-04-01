
$(document).ready(function () {
    console.log("Document ready, loading data from Service");

    $.ajax({
        url: "http://localhost:8000/api/produkt/gibkategorie/3",
        method: "get",
        dataType: "json"
    }).done(function (response) {
        console.log("Data loaded successfully");
        console.log(response);

        var content = '';


        var obj = response.daten[0];
        bruttopreis = (obj.bruttopreis.toString()).replace(".", ",");
        content += '<div class="container col-sm-12" id="container2">';
        content += '<div class="row">';
        content += '<div class="col-sm-12">';
        content += '<div class="row">';
        content += '<div class="col-sm-3">';
        content += '<div class="thumb-wrapper" id="productname_slider">';
        content += '<div class="content productname_box">';
        content += '<a href="product-detail.html" id="product_name" title="Produktdetails" onclick="checkCookie(' + obj.id.toString() + ')">';
        content += '<h5>' + obj.name + '</h5>';
        content += '</a>';
        content += '</div>';
        content += '<div class="img-box">';
        content += '<a href="product-detail.html"  title="Produktdetails" onclick="checkCookie(' + obj.id.toString() + ')"><img src="' + obj.bilder.bildpfad + '" class="img-responsive img-fluid pictures" alt=""></a>';
        content += '</div>';
        content += '<div class="row">';
        content += '<p class="item-price col-sm-6" id="price_product"> <span>' + bruttopreis + '&#x20ac</span></p>';
        content += '<a class="col-sm-2"><img class="shoppingCart2" src="pictures/commerce-and-shopping-1.png" alt="Einkaufswagen" onclick="checkCookie(' + obj.id.toString() + ');Add()"></a>';
        content += '</div>';
        content += '</div>';
        content += '</div>';



        // neuen code zusammensetzen

        for (i = 1; i < response.daten.length; i++) {
            var obj = response.daten[i];
            var bruttopreis;
            bruttopreis = (obj.bruttopreis.toString()).replace(".", ",");
            if (i % 4 == 0) {

                content += '</div>';
                content += '</div>';
                content += '</div>';
                content += '</div>';
                content += '<div class="container col-sm-12" id="container2">';
                content += '<div class="row">';
                content += '<div class="col-sm-12">';
                content += '<div class="row">';
                content += '<div class="col-sm-3">';
                content += '<div class="thumb-wrapper" id="productname_slider">';
                content += '<div class="content productname_box">';
                content += '<a href="product-detail.html" id="product_name" title="Produktdetails" onclick="checkCookie(' + obj.id.toString() + ')">';
                content += '<h5>' + obj.name + '</h5>';
                content += '</a>';
                content += '</div>';
                content += '<div class="img-box">';
                content += '<a href="product-detail.html"  title="Produktdetails" onclick="checkCookie(' + obj.id.toString() + ')"><img src="' + obj.bilder.bildpfad + '" class="img-responsive img-fluid pictures" alt=""></a>';
                content += '</div>';
                content += '<div class="row">';
                content += '<p class="item-price col-sm-6" id="price_product"> <span>' + bruttopreis + '&#x20ac</span></p>';
                content += '<a class="col-sm-2"><img class="shoppingCart2" src="pictures/commerce-and-shopping-1.png" alt="Einkaufswagen" onclick="checkCookie(' + obj.id.toString() + ');Add()"></a>';
                content += '</div>';
                content += '</div>';
                content += '</div>';

            }



            else {
                content += '<div class="col-sm-3">';
                content += '<div class="thumb-wrapper" id="productname_slider">';
                content += '<div class="content productname_box">';
                content += '<a href="product-detail.html" id="product_name" title="Produktdetails">';
                content += '<h5>' + obj.name + '</h5>';
                content += '</a>';
                content += '</div>';
                content += '<div class="img-box">';
                content += '<a href="product-detail.html"  title="Produktdetails" onclick="checkCookie(' + obj.id.toString() + ')"><img src="' + obj.bilder.bildpfad + '" class="img-responsive img-fluid pictures" alt=""></a>';
                content += '</div>';
                content += '<div class="row">';
                content += '<p class="item-price col-sm-6" id="price_product" onclick="checkCookie(' + obj.id.toString() + ')"> <span>' + bruttopreis + '&#x20ac</span></p>';
                content += '<a class="col-sm-2"><img class="shoppingCart2" src="pictures/commerce-and-shopping-1.png" alt="Einkaufswagen" onclick="checkCookie(' + obj.id.toString() + ');Add()"></a>';
                content += '</div>';
                content += '</div>';
                content += '</div>';
            };




            $('#dyntarget').html(content);

        }
    });
});
