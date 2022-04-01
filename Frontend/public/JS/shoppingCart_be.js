async function dynamise(url, menge, count, warenkorb) {
	$.ajax({
		url: url,
		method: "get",
		dataType: "json"

	}).done(function (response) {
		console.log("Data loaded successfully");
		console.log(response);
		var obj = response.daten;
		var numericInput = "inputLoop" + count;
		var texti = "price" + count;
		var pfandi = "pfand" + count;

		bruttopreis = ((obj.bruttopreis * menge).toFixed(2).replace(".", ","));
		content += '<div class="row m-5 onload="priceCalc(' + obj.bruttopreis + ',' + numericInput + ',' + texti + ')">';
		content += '<div class="col-1"></div>';
		content += '<div class="col-2">';
		content += '<a href="product-detail.html" onclick="checkCookie(' + obj.id.toString() + ')" title="Produktdetails"><img src="' + obj.bilder.bildpfad + '" class="pictures" alt="Produkt"></a>';
		content += '</div>';
		content += '<div class="col-2 " id="shopping">';
		content += '<span>' + obj.name + '</span>';
		content += '</div>';
		content += '<div class="col-1"></div>';
		content += '<div class="col-2" id="number">';
		content += '<input step="1" data-step-max="10" class="col-4" type="number" id="' + numericInput + '" value="' + menge + '" data-decimals="0" min="1" max="360" onkeypress="return /[0-9]/i.test(event.key)" oninput="checkCookie(' + obj.id.toString() + ');updateShoppingCart(this);priceCalc(' + obj.bruttopreis + ',' + numericInput + ',' + texti + ',' + obj.pfandstufe.gebuehr + ',' + pfandi + ');sumPrices()" />';
		content += '</div>';
		content += '<div class="col-2" id="garbage">';
		content += '<a onclick="deleteProduct()"><img onclick="checkCookie(' + obj.id.toString() + ')" src="/pictures/delete.png" class="col-3" alt="Produkt"></a>';
		content += '</div>';
		content += '<div class="col-2" id="shopping">';
		content += '<span id="' + texti + '">' + bruttopreis + ' €</span>';
		content += '</div>';
		content += '</div>';
		content += '<div id="' + pfandi + '" hidden >' + (obj.pfandstufe.gebuehr * menge) + '</div>'

		$('#dyntarget5').html(content.substring(15, [content.length]));


	});
};


function priceCalc(preis, numericInput, texti, pfand, pfandi) {
	let show = texti;
	let notShow = pfandi;
	if (numericInput.value > 0) {
		preis = numericInput.value * preis;
		preis = preis.toFixed(2) + "";

		show.innerHTML = preis.replace(".", ",") + "&#x20ac";
		notShow.innerHTML = numericInput.value * pfand;
	}
}



$(document).ready(async function () {
	console.log("Document ready, loading data from Service");
	var warenkorb = JSON.parse(localStorage.getItem('warenkorb'));
	var count;
	if (warenkorb.length != 0) {
		for (i = 0; i < warenkorb.length; i++) {
			var id = warenkorb[i].Produkt.Id;
			var menge = warenkorb[i].Menge;
			var url = "http://localhost:8000/api/produkt/gib/" + id;
			count = i;
			await dynamise(url, menge, count, warenkorb);
		}
		setTimeout(function () {
			var pfandi = "";
			var deposit = 0;
			var interCost = 0;
			for (j = 0; j < warenkorb.length; j++) {
				pfandi = "pfand" + j;
				texti = "price" + j;
				var pull2 = document.getElementById(texti);
				var pull = document.getElementById(pfandi);
				deposit += parseFloat(pull.innerHTML);
				var stringi = pull2.innerHTML;
				interCost += parseFloat(stringi.split(" €")[0].replace(",", "."));
			}
			document.getElementById("deposit").innerHTML = (deposit.toFixed(2) + " €").replace(".", ",");
			document.getElementById("interSum").innerHTML = ((interCost + deposit).toFixed(2) + " €").replace(".", ",");
			document.getElementById("shipping").innerHTML = "20,00 €";
			document.getElementById("allCost").innerHTML = ((deposit + interCost + 20).toFixed(2) + " €").replace(".", ",");

		}, 3000);
	}
});

function sumPrices() {
	var warenkorb = JSON.parse(localStorage.getItem('warenkorb'));
	var pfandi = "";
	var deposit = 0;
	var interCost = 0;
	for (j = 0; j < warenkorb.length; j++) {
		pfandi = "pfand" + j;
		texti = "price" + j;
		var pull2 = document.getElementById(texti);
		var pull = document.getElementById(pfandi);
		deposit += parseFloat(pull.innerHTML);
		var stringi = pull2.innerHTML;
		interCost += parseFloat(stringi.split(" €")[0].replace(",", "."));
	}
	document.getElementById("deposit").innerHTML = (deposit.toFixed(2) + " €").replace(".", ",");
	document.getElementById("interSum").innerHTML = ((interCost + deposit).toFixed(2) + " €").replace(".", ",");
	document.getElementById("shipping").innerHTML = "20,00 €";
	document.getElementById("allCost").innerHTML = ((deposit + interCost + 20).toFixed(2) + " €").replace(".", ",");


}


function updateShoppingCart(e) {
	console.log("updating shopping cart");
	var warenkorb = JSON.parse(localStorage.getItem('warenkorb'));
	e.value = e.value <= 360 ? e.value : 360;
	var menge = e.value;
	for (i = 0; i < warenkorb.length; i++) {
		if (warenkorb[i].Produkt.Id == getCookie("objectCookie")) {
			var erg = parseInt(menge);
			console.log(warenkorb[i].Menge);
			warenkorb[i].Menge = erg;
			console.log(erg);
			break;
		}

	}
	localStorage.setItem('warenkorb', JSON.stringify(warenkorb));


}


function deleteProduct() {
	console.log("delete product");
	var warenkorb = JSON.parse(localStorage.getItem('warenkorb'));

	for (var i = 0; i < warenkorb.length; i++) {
		var erg = (warenkorb[i].Produkt.Id);
		if (erg === getCookie("objectCookie")) {
			warenkorb.splice(i, 1);
		}
	}
	warenkorb = JSON.stringify(warenkorb);
	localStorage.setItem("warenkorb", warenkorb);
	console.log(warenkorb);
	location.href = location.href; // magic reload
}

function checkItem() {
	console.log("check number of items");
	var warenkorb = JSON.parse(localStorage.getItem('warenkorb'));
	if (warenkorb.length > 0) {
		document.getElementById("sendbtn").disabled = false;
	}

	else {
		document.getElementById("sendbtn").disabled = true;
	}
}


