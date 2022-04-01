
function myFunction() {
  var checkBox = document.getElementById("difference_delivery");
  var text = document.getElementById("text");
  var text2 = document.getElementById("text2");
  var text3 = document.getElementById("text3");
  var text4 = document.getElementById("text4");
  var text5 = document.getElementById("text5");
  var text6 = document.getElementById("text6");
  var text7 = document.getElementById("text7");
  if (checkBox.checked == true) {
    text.style.visibility = "visible";
    text2.style.visibility = "visible";
    text3.style.visibility = "visible";
    text4.style.visibility = "visible";
    text5.style.visibility = "visible";
    text6.style.visibility = "visible";
    text7.style.visibility = "visible";
  } else {
    text.style.visibility = "hidden";
    text2.style.visibility = "hidden";
    text3.style.visibility = "hidden";
    text4.style.visibility = "hidden";
    text5.style.visibility = "hidden";
    text6.style.visibility = "hidden";
    text7.style.visibility = "hidden";

  }
}

