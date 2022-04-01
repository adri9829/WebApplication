
function cookieCheck() {
    var text = "";
    if (!getCookie("cookiesEnabled")) {
        if (navigator.cookieEnabled == true) {
            text = "Cookies sind aktiviert.";
            setCookie("cookiesEnabled", true);
        } else {
            text = "Cookies sind nicht aktiviert.\nUm die Funktionalität der Website zu berwerktstelligen sind Cookies notwendig.";
        }
        alert(text)
    }
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/";
}

function getCookie(productObject) {
    var name = productObject + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split('=');
    var text = ca[ca.length - 1];
    return (text);
}

function checkCookie(object) {
    setCookie("objectCookie", object);
}

function searchCookie() {
    var search = document.getElementById("search_input").value;
    if (search !== "") {
        setCookie("searchCookie", search);
    }
}
function genericHeader() {
    var pi = document.getElementById("genHeader");
    var content = document.createTextNode(getCookie("searchCookie"));
    pi.appendChild(content);
}