async function dynamise2(obj11) {

	$.ajax({
		url: "http://localhost:8000/api/bestellposition",
		method: "post",
		async: false,
		contentType: "application/json",
		data: JSON.stringify(obj11)
	}).done(function (response) {
		console.log(response);
		$("#output").html(JSON.stringify(response));
	}).fail(function (jqXHR, statusText, error) {
		console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
		$("#output").html("Ein Fehler ist aufgetreten");
	});
}
async function getData() {
	var currentdate = new Date();
	var datetime = currentdate.getDate() + "/"
		+ (currentdate.getMonth() + 1) + "/"
		+ currentdate.getFullYear() + " "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":"
		+ currentdate.getSeconds();
	var checkBox = document.getElementById("difference_delivery");
	if (checkBox.checked == true) {

		var vorname_1 = document.getElementById("vorname_1").value;
		var email_1 = document.getElementById("email_1").value;
		var geburtsdatum_1 = document.getElementById("geburtsdatum_1").value;
		var name_1 = document.getElementById("name_1").value;
		var inputs_form1 = document.getElementById("inputs_form1").value;
		var strasse_1 = document.getElementById("strasse_1").value;
		var hausnummer_1 = document.getElementById("hausnummer_1").value;
		var plz_1 = document.getElementById("plz_1").value;
		var ort_1 = document.getElementById("ort_1").value;
		var land_1 = document.getElementById("land_1").value;

		var vorname_2 = document.getElementById("vorname_2").value;
		var name_2 = document.getElementById("name_2").value;
		var inputs_form2 = document.getElementById("inputs_form2").value;
		var strasse_2 = document.getElementById("strasse_2").value;
		var hausnummer_2 = document.getElementById("hausnummer_2").value;
		var plz_2 = document.getElementById("plz_2").value;
		var ort_2 = document.getElementById("ort_2").value;
		var land_2 = document.getElementById("land_2").value;

		var x = document.getElementById("inputs_form");
		var ZahlungsId = x.selectedIndex + 1;


		if (vorname_1 == null || vorname_1 == "" || email_1 == null || email_1 == "" || name_1 == null || name_1 == "" || strasse_1 == null || strasse_1 == "" || hausnummer_1 == null || hausnummer_1 == "" || plz_1 == null || plz_1 == "" || ort_1 == null || ort_1 == "" || land_1 == null || land_1 == "" || vorname_2 == null || vorname_2 == "" || name_2 == null || name_2 == "" || strasse_2 == null || strasse_2 == "" || hausnummer_2 == null || hausnummer_2 == "" || plz_2 == null || plz_2 == "" || ort_2 == null || ort_2 == "" || land_2 == null || land_2 == "") {
			alert("Bitte alle Felder ausfüllen");
			return false;
		}
		var land_id;
		var person_id;
		var kunde_id;
		var adresse_id;

		console.log("button senddbtn clicked");
		console.log(i);
		var obj = { "bezeichnung": land_2 }
		$.ajax({
			url: "http://localhost:8000/api/land",
			method: "post",
			async: false,
			contentType: "application/json",
			data: JSON.stringify(obj)
		}).done(function (response) {
			console.log(response);
			$("#output").html(JSON.stringify(response));
		}).fail(function (jqXHR, statusText, error) {
			console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
			$("#output").html("Ein Fehler ist aufgetreten");
		});


		var obj2 = { "anrede": inputs_form2, "vorname": vorname_2, "name": name_2 };

		$.ajax({
			url: "http://localhost:8000/api/person",
			method: "post",
			async: false,
			contentType: "application/json",
			data: JSON.stringify(obj2)
		}).done(function (response) {
			console.log(response);
			$("#output").html(JSON.stringify(response));
		}).fail(function (jqXHR, statusText, error) {
			console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
			$("#output").html("Ein Fehler ist aufgetreten");
		});

		$.ajax({
			url: "http://localhost:8000/api/land/neuste",
			method: "get",
			async: false,
			dataType: "json"
		}).done(function (response) {
			console.log("Data loaded successfully");
			console.log(response);

			var obj = response.daten[0];
			land_id = obj.id;

			var obj1 = { "strasse": strasse_2, "hausnummer": hausnummer_2, "plz": plz_2, "ort": ort_2, "land_id": land_id };

			$.ajax({
				url: "http://localhost:8000/api/adresse",
				method: "post",
				async: false,
				contentType: "application/json",
				data: JSON.stringify(obj1)
			}).done(function (response) {
				console.log(response);
				$("#output").html(JSON.stringify(response));
			}).fail(function (jqXHR, statusText, error) {
				console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
				$("#output").html("Ein Fehler ist aufgetreten");
			});
		});

		$.ajax({
			url: "http://localhost:8000/api/adresse/neuste",
			method: "get",
			async: false,
			dataType: "json"
		}).done(function (response) {
			console.log("Data loaded successfully");
			console.log(response);

			var resp4 = response.daten[0];
			adresse_id = resp4.id;


			$.ajax({
				url: "http://localhost:8000/api/person/neuste",
				method: "get",
				async: false,
				dataType: "json"
			}).done(function (response) {
				console.log("Data loaded successfully");
				console.log(response);

				var resp3 = response.daten[0];
				person_id = resp3.id;

				var obj6 = { "person_id": person_id, "adresse_id": adresse_id };
				$.ajax({
					url: "http://localhost:8000/api/lieferadresse",
					method: "post",
					async: false,
					contentType: "application/json",
					data: JSON.stringify(obj6)
				}).done(function (response) {
					console.log(response);
					$("#output").html(JSON.stringify(response));
				}).fail(function (jqXHR, statusText, error) {
					console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
					$("#output").html("Ein Fehler ist aufgetreten");
				});

			});

		});
		var obj = { bezeichnung: land_1 }
		$.ajax({
			url: "http://localhost:8000/api/land",
			method: "post",
			async: false,
			contentType: "application/json",
			data: JSON.stringify(obj)
		}).done(function (response) {
			console.log(response);
			$("#output").html(JSON.stringify(response));
		}).fail(function (jqXHR, statusText, error) {
			console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
			$("#output").html("Ein Fehler ist aufgetreten");
		});


		var obj2 = { "anrede": inputs_form1, "vorname": vorname_1, "name": name_1 };

		$.ajax({
			url: "http://localhost:8000/api/person",
			method: "post",
			async: false,
			contentType: "application/json",
			data: JSON.stringify(obj2)
		}).done(function (response) {
			console.log(response);
			$("#output").html(JSON.stringify(response));
		}).fail(function (jqXHR, statusText, error) {
			console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
			$("#output").html("Ein Fehler ist aufgetreten");
		});

		$.ajax({
			url: "http://localhost:8000/api/land/neuste",
			method: "get",
			async: false,
			dataType: "json"
		}).done(function (response) {
			console.log("Data loaded successfully");
			console.log(response);

			var obj = response.daten[0];
			land_id = obj.id;

			var obj1 = { "strasse": strasse_1, "hausnummer": hausnummer_1, "plz": plz_1, "ort": ort_1, "land_id": land_id };

			$.ajax({
				url: "http://localhost:8000/api/adresse",
				method: "post",
				async: false,
				contentType: "application/json",
				data: JSON.stringify(obj1)
			}).done(function (response) {
				console.log(response);
				$("#output").html(JSON.stringify(response));
			}).fail(function (jqXHR, statusText, error) {
				console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
				$("#output").html("Ein Fehler ist aufgetreten");
			});
		});


		$.ajax({
			url: "http://localhost:8000/api/person/neuste",
			method: "get",
			async: false,
			dataType: "json"
		}).done(function (response) {
			console.log("Data loaded successfully");
			console.log(response);

			var obj = response.daten[0];
			person_id = obj.id;


			var obj3 = { "email": email_1, "geburtsdatum": geburtsdatum_1, "person_id": person_id };

			$.ajax({
				url: "http://localhost:8000/api/kunde",
				method: "post",
				async: false,
				contentType: "application/json",
				data: JSON.stringify(obj3)
			}).done(function (response) {
				console.log(response);
				$("#output").html(JSON.stringify(response));
			}).fail(function (jqXHR, statusText, error) {
				console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
				$("#output").html("Ein Fehler ist aufgetreten");
			});
		});



		$.ajax({
			url: "http://localhost:8000/api/adresse/neuste",
			method: "get",
			async: false,
			dataType: "json"
		}).done(function (response) {
			console.log("Data loaded successfully");
			console.log(response);

			var resp = response.daten[0];
			adresse_id = resp.id;
			$.ajax({
				url: "http://localhost:8000/api/kunde/neuste",
				method: "get",
				async: false,
				dataType: "json"
			}).done(function (response) {
				console.log("Data loaded successfully");
				console.log(response);

				var resp2 = response.daten[0];
				kunde_id = resp2.id;

				var obj5 = { "kunde_id": kunde_id, "adresse_id": adresse_id };
				$.ajax({
					url: "http://localhost:8000/api/rechnungsadresse",
					method: "post",
					async: false,
					contentType: "application/json",
					data: JSON.stringify(obj5)
				}).done(function (response) {
					console.log(response);
					$("#output").html(JSON.stringify(response));
				}).fail(function (jqXHR, statusText, error) {
					console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
					$("#output").html("Ein Fehler ist aufgetreten");
				});



			});
		});


	} else {

		var vorname_1 = document.getElementById("vorname_1").value;
		var email_1 = document.getElementById("email_1").value;
		var geburtsdatum_1 = document.getElementById("geburtsdatum_1").value;
		var name_1 = document.getElementById("name_1").value;
		var inputs_form1 = document.getElementById("inputs_form1").value;
		var strasse_1 = document.getElementById("strasse_1").value;
		var hausnummer_1 = document.getElementById("hausnummer_1").value;
		var plz_1 = document.getElementById("plz_1").value;
		var ort_1 = document.getElementById("ort_1").value;
		var land_1 = document.getElementById("land_1").value;
		var land_id;
		var person_id;
		var kunde_id;
		var adresse_id;
		var x = document.getElementById("inputs_form");
		var ZahlungsId = x.selectedIndex + 1;

		if (vorname_1 == null || vorname_1 == "" || email_1 == null || email_1 == "" || name_1 == null || name_1 == "" || strasse_1 == null || strasse_1 == "" || hausnummer_1 == null || hausnummer_1 == "" || plz_1 == null || plz_1 == "" || ort_1 == null || ort_1 == "" || land_1 == null || land_1 == "") {
			alert("Bitte alle Felder ausfüllen");
			return false;
		}
		console.log("button senddbtn clicked");
		var obj = { bezeichnung: land_1 }
		$.ajax({
			url: "http://localhost:8000/api/land",
			method: "post",
			async: false,
			contentType: "application/json",
			data: JSON.stringify(obj)
		}).done(function (response) {
			console.log(response);
			$("#output").html(JSON.stringify(response));
		}).fail(function (jqXHR, statusText, error) {
			console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
			$("#output").html("Ein Fehler ist aufgetreten");
		});


		var obj2 = { "anrede": inputs_form1, "vorname": vorname_1, "name": name_1 };

		$.ajax({
			url: "http://localhost:8000/api/person",
			method: "post",
			async: false,
			contentType: "application/json",
			data: JSON.stringify(obj2)
		}).done(function (response) {
			console.log(response);
			$("#output").html(JSON.stringify(response));
		}).fail(function (jqXHR, statusText, error) {
			console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
			$("#output").html("Ein Fehler ist aufgetreten");
		});

		$.ajax({
			url: "http://localhost:8000/api/person/neuste",
			method: "get",
			async: false,
			dataType: "json"
		}).done(function (response) {
			console.log("Data loaded successfully");
			console.log(response);

			var obj = response.daten[0];
			person_id = obj.id;


			var obj3 = { "email": email_1, "geburtsdatum": geburtsdatum_1, "person_id": person_id };

			$.ajax({
				url: "http://localhost:8000/api/kunde",
				method: "post",
				async: false,
				contentType: "application/json",
				data: JSON.stringify(obj3)
			}).done(function (response) {
				console.log(response);
				$("#output").html(JSON.stringify(response));
			}).fail(function (jqXHR, statusText, error) {
				console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
				$("#output").html("Ein Fehler ist aufgetreten");
			});
		});

		$.ajax({
			url: "http://localhost:8000/api/land/neuste",
			method: "get",
			async: false,
			dataType: "json"
		}).done(function (response) {
			console.log("Data loaded successfully");
			console.log(response);

			var obj = response.daten[0];
			land_id = obj.id;

			var obj1 = { "strasse": strasse_1, "hausnummer": hausnummer_1, "plz": plz_1, "ort": ort_1, "land_id": land_id };

			$.ajax({
				url: "http://localhost:8000/api/adresse",
				method: "post",
				async: false,
				contentType: "application/json",
				data: JSON.stringify(obj1)
			}).done(function (response) {
				console.log(response);
				$("#output").html(JSON.stringify(response));
			}).fail(function (jqXHR, statusText, error) {
				console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
				$("#output").html("Ein Fehler ist aufgetreten");
			});

		});

		$.ajax({
			url: "http://localhost:8000/api/adresse/neuste",
			method: "get",
			async: false,
			dataType: "json"
		}).done(function (response) {
			console.log("Data loaded successfully");
			console.log(response);

			var resp = response.daten[0];
			adresse_id = resp.id;
			$.ajax({
				url: "http://localhost:8000/api/kunde/neuste",
				method: "get",
				async: false,
				dataType: "json"
			}).done(function (response) {
				console.log("Data loaded successfully");
				console.log(response);

				var resp2 = response.daten[0];
				kunde_id = resp2.id;

				var obj5 = { "kunde_id": kunde_id, "adresse_id": adresse_id };
				$.ajax({
					url: "http://localhost:8000/api/rechnungsadresse",
					method: "post",
					async: false,
					contentType: "application/json",
					data: JSON.stringify(obj5)
				}).done(function (response) {
					console.log(response);
					$("#output").html(JSON.stringify(response));
				}).fail(function (jqXHR, statusText, error) {
					console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
					$("#output").html("Ein Fehler ist aufgetreten");
				});

				$.ajax({
					url: "http://localhost:8000/api/person/neuste",
					method: "get",
					async: false,
					dataType: "json"
				}).done(function (response) {
					console.log("Data loaded successfully");
					console.log(response);

					var resp3 = response.daten[0];
					person_id = resp3.id;

					var obj6 = { "person_id": person_id, "adresse_id": adresse_id };
					$.ajax({
						url: "http://localhost:8000/api/lieferadresse",
						method: "post",
						async: false,
						contentType: "application/json",
						data: JSON.stringify(obj6)
					}).done(function (response) {
						console.log(response);
						$("#output").html(JSON.stringify(response));
					}).fail(function (jqXHR, statusText, error) {
						console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
						$("#output").html("Ein Fehler ist aufgetreten");
					});

				});

			});
		});
	}
	$.ajax({
		url: "http://localhost:8000/api/lieferadresse/neuste",
		method: "get",
		async: false,
		dataType: "json"
	}).done(function (response) {
		console.log("Data loaded successfully");
		console.log(response);
		var resp4 = response.daten[0];
		lieferadresse_id = resp4.id;

		$.ajax({
			url: "http://localhost:8000/api/rechnungsadresse/neuste",
			method: "get",
			async: false,
			dataType: "json"
		}).done(function (response) {
			console.log("Data loaded successfully");
			console.log(response);
			var resp5 = response.daten[0];
			rechnungsadresse_id = resp5.id;
			var obj10 = { "bestellzeitpunkt": datetime, "zahlungsart_id": ZahlungsId, "lieferadresse_id": lieferadresse_id, "rechnungsadresse_id": rechnungsadresse_id }
			$.ajax({
				url: "http://localhost:8000/api/bestellung",
				method: "post",
				async: false,
				contentType: "application/json",
				data: JSON.stringify(obj10)
			}).done(function (response) {
				console.log(response);
				$("#output").html(JSON.stringify(response));
			}).fail(function (jqXHR, statusText, error) {
				console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
				$("#output").html("Ein Fehler ist aufgetreten");
			});
		});
	});
	$.ajax({
		url: "http://localhost:8000/api/bestellung/neuste",
		method: "get",
		async: false,
		dataType: "json"
	}).done(function (response) {
		console.log("Data loaded successfully");
		console.log(response);
		var resp8 = response.daten[0];
		bestellung_id = resp8.id;

		var warenkorb = JSON.parse(localStorage.getItem('warenkorb'));

		for (i = 0; i < warenkorb.length; i++) {
			var id = warenkorb[i].Produkt.Id;
			var menge = warenkorb[i].Menge;
			var obj11 = { "menge": menge, "produkt_id": id, "bestellung_id": bestellung_id }

			dynamise2(obj11);

		}
	});
	window.location.href = "order_confirmation.html";
}
