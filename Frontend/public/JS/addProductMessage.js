function Add() {
    var warenkorb = JSON.parse(localStorage.getItem('warenkorb'));
    if (localStorage.getItem('warenkorb') == null) {
        var warenkorb = [];

        var bestellposition = {
            'Produkt': {
                'Id': getCookie("objectCookie"),

            },
            'Menge': 1
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
                // beim treffer, nur menge erhöhen
                warenkorb[i].Menge++;
                break;
            } // end if match found
        } // end for

        // bei keinem Treffer, muss neue bestellposition hinzufügen
        if (!found) {
            warenkorb.push({
                'Produkt': hinzufuegen,
                'Menge': 1
            });
        } // end if

        // unbedingt die session aktualisieren
        localStorage.setItem('warenkorb', JSON.stringify(warenkorb));
        console.log('Warenkorb verändert');
    }

    alert('Zum Warenkorb hinzugefügt')
}