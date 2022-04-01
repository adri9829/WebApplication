
function priceCalc(preis) {
    let show = document.getElementById("price");
    var element = document.getElementById("numeric");
    if (element.value > 0) {
        preis = element.value * preis;
        preis = String(preis.toFixed(2));
        show.innerHTML = preis.replace(".", ",") + "&#x20ac";
    }
}

