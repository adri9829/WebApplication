function Add() {
    var menge = document.getElementById("numeric").value;
    var warenkorb = JSON.parse(localStorage.getItem('warenkorb'));
    if (localStorage.getItem('warenkorb') == null) {
        var warenkorb = [];

        var bestellposition = {
            'Produkt': {
                'Id': getCookie("objectCookie"),

            },
            'Menge': menge
        };

        warenkorb.push(bestellposition);

        localStorage.setItem('warenkorb', JSON.stringify(warenkorb));
        console.log('fertig');
    }
    else {

        var hinzufuegen = {
            'Id': getCookie("objectCookie"),

        };

        var found = false;
        for (i = 0; i < warenkorb.length; i++) {
            if (warenkorb[i].Produkt.Id == hinzufuegen.Id) {
                found = true;
                var erg = parseInt(warenkorb[i].Menge) + parseInt(menge);
                // beim treffer, nur menge erhöhen
                warenkorb[i].Menge = erg;
                break;
            } // end if match found
        } // end for

        // bei keinem Treffer, muss neue bestellposition hinzufügen
        if (!found) {
            warenkorb.push({
                'Produkt': hinzufuegen,
                'Menge': menge
            });
        } // end if

        // unbedingt die session aktualisieren
        localStorage.setItem('warenkorb', JSON.stringify(warenkorb));
        console.log('Warenkorb verändert');
    }

    alert('Zum Warenkorb hinzugefügt')
}