// update copyright year automatically
function displayFullYear() {
  var d = new Date();
  var n = d.getFullYear();
  document.getElementById("get-full-year").innerHTML = n;
}
displayFullYear();
