$(document).ready(function () {
	console.log("Document ready, loading data from Service");

	$.ajax({
		url: "http://localhost:8000/api/produkt/top/",
		method: "get",
		dataType: "json"
	}).done(function (response) {
		console.log("Data loaded successfully");
		console.log(response);

		var content = '';


		var obj = response.daten[0];
		bruttopreis = (obj.bruttopreis.toString()).replace(".", ",");
		content += '<div class="container col-sm-12" id="container1">';
		content += '<div class="row">';
		content += '<div class="col-sm-12">';
		content += '<h3 id="our_products">Top 10</h3><br><br>';
		content += '<div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="0">';
		content += '<ol class="carousel-indicators">';
		content += '<li data-target="#myCarousel1" data-slide-to="0" class="active"></li>';
		content += '<li data-target="#myCarousel1" data-slide-to="1"></li>';
		content += '<li data-target="#myCarousel1" data-slide-to="2"></li>';
		content += '</ol>';
		content += '<div class="carousel-inner">';
		content += '<div class="item carousel-item active">';
		content += '<div class="row">';
		content += '<div class="col-sm-3">';
		content += '<div class="thumb-wrapper slider_productname">';
		content += '<div class="content productname_box">';
		content += '<a href="product-detail.html" id="product_name" onclick="checkCookie(' + obj.id.toString() + ')">';
		content += '<h5>' + obj.name + '</h5>';
		content += '</a>';
		content += '</div>';
		content += '<div class="img-box">';
		content += '<a href="product-detail.html" onclick="checkCookie(' + obj.id.toString() + ')"><img src="' + obj.bilder.bildpfad + '" class="img-responsive img-fluid pictures" alt=""></a>';
		content += '</div>';
		content += '<div class="row">';
		content += '<p class="item-price col-sm-6" id="price_product"> <span>29,99 €</span>';
		content += '</p>';
		content += '<a class="col-sm-2"><img class="shoppingCart2" src="pictures/commerce-and-shopping-1.png" alt="Einkaufswagen" onclick="checkCookie(' + obj.id.toString() + ');Add()"></a>';
		content += '</div>';
		content += '</div>';
		content += '</div>';




		// neuen code zusammensetzen

		for (i = 1; i < response.daten.length - 1; i++) {
			var obj = response.daten[i];
			var bruttopreis;
			bruttopreis = (obj.bruttopreis.toString()).replace(".", ",");
			if (i % 4 == 0) {
				content += '<div class="item carousel-item">';
				content += '<div class="row">';
				content += '<div class="col-sm-3">';
				content += '<div class="thumb-wrapper slider_productname">';
				content += '<div class="content productname_box">';
				content += '<a href="product-detail.html" id="product_name" onclick="checkCookie(' + obj.id.toString() + ')">';
				content += '<h5>' + obj.name + '</h5>';
				content += '</a>';
				content += '</div>';
				content += '<div class="img-box">';
				content += '<a href="product-detail.html" onclick="checkCookie(' + obj.id.toString() + ')"><img src="' + obj.bilder.bildpfad + '" class="img-responsive img-fluid pictures pictures" alt=""></a>';
				content += '</div>';
				content += '<div class="row">';
				content += '<p class="item-price col-sm-6" id="price_product"> <span>' + bruttopreis + ' €</span>';
				content += '</p>';
				content += '<a class="col-sm-2"><img class="shoppingCart2" src="pictures/commerce-and-shopping-1.png" alt="Einkaufswagen" onclick="checkCookie(' + obj.id.toString() + ');Add()"></a>';
				content += '</div>';
				content += '</div>';
				content += '</div>';

			}

			else if (i % 4 == 3) {
				content += '<div class="col-sm-3">';
				content += '<div class="thumb-wrapper slider_productname">';
				content += '<div class="content productname_box">';
				content += '<a href="product-detail.html"  id="product_name" onclick="checkCookie(' + obj.id.toString() + ')">';
				content += '<h5>' + obj.name + '</h5>';
				content += '</a>';
				content += '</div>';
				content += '<div class="img-box">';
				content += '<a href="product-detail.html" onclick="checkCookie(' + obj.id.toString() + ')"><img src="' + obj.bilder.bildpfad + '" class="img-responsive img-fluid pictures" alt=""></a>';
				content += '</div>';
				content += '<div class="row">';
				content += '<p class="item-price col-sm-6" id="price_product"> <span>' + bruttopreis + ' €</span>';
				content += '</p>';
				content += '<a class="col-sm-2"><img class="shoppingCart2" src="pictures/commerce-and-shopping-1.png" alt="Einkaufswagen" onclick="checkCookie(' + obj.id.toString() + ');Add()"></a>';
				content += '</div>';
				content += '</div>';
				content += '</div>';
				content += '</div>';
				content += '</div>';
			}

			else {

				content += '<div class="col-sm-3">';
				content += '<div class="thumb-wrapper slider_productname">';
				content += '<div class="content productname_box">';
				content += '<a href="product-detail.html" id="product_name" onclick="checkCookie(' + obj.id.toString() + ')">';
				content += '<h5>' + obj.name + '</h5>';
				content += '</a>';
				content += '</div>';
				content += '<div class="img-box">';
				content += '<a href="product-detail.html" onclick="checkCookie(' + obj.id.toString() + ')"><img src="' + obj.bilder.bildpfad + '" class="img-responsive img-fluid pictures" alt=""></a>';
				content += '</div>';
				content += '<div class="row">';
				content += '<p class="item-price col-sm-6" id="price_product"> <span>' + bruttopreis + ' €</span>';
				content += '</p>';
				content += '<a class="col-sm-2"><img class="shoppingCart2" src="pictures/commerce-and-shopping-1.png" alt="Einkaufswagen" onclick="checkCookie(' + obj.id.toString() + ');Add()"></a>';
				content += '</div>';
				content += '</div>';
				content += '</div>';
			}





		}

		var obj = response.daten[response.daten.length - 1];
		content += '<div class="col-sm-3">';
		content += '<div class="thumb-wrapper slider_productname">';
		content += '<div class="content productname_box">';
		content += '<a href="product-detail.html" id="product_name" onclick="checkCookie(' + obj.id.toString() + ')">';
		content += '<h5>' + obj.name + '</h5>';
		content += '</a>';
		content += '</div>';
		content += '<div class="img-box">';
		content += '<a href="product-detail.html" onclick="checkCookie(' + obj.id.toString() + ')"><img src="' + obj.bilder.bildpfad + '" class="img-responsive img-fluid pictures" alt=""></a>';
		content += '</div>';
		content += '<div class="row">';
		content += '<p class="item-price col-sm-6" id="price_product"> <span>' + bruttopreis + ' €</span>';
		content += '</p>';
		content += '<a class="col-sm-2"><img class="shoppingCart2" src="pictures/commerce-and-shopping-1.png" alt="Einkaufswagen" onclick="checkCookie(' + obj.id.toString() + ');Add()"></a>';
		content += '</div>';
		content += '</div>';
		content += '</div>';
		content += '</div>';
		content += '</div>';
		content += '<a class="carousel-control-prev bg-secondary col-sm-1" id="arrow" href="#myCarousel"role="button" data-slide="prev">';
		content += '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
		content += '<span class="sr-only">Previous</span>';
		content += '</a>';
		content += '<a class="carousel-control-next bg-secondary col-sm-1" id="arrow" href="#myCarousel"role="button" data-slide="next">';
		content += '<span class="carousel-control-next-icon" aria-hidden="true"></span>';
		content += '<span class="sr-only">Next</span>';
		content += '</a>';
		content += '</div>';
		content += '</div>';
		content += '</div>';
		content += '</div>';
		content += '</div>';
		$('#dyntarget4').html(content);
	});
});