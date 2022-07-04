var modaldriver = document.getElementById("modalDriver")

// var tabledriver = document.getElementById("table-driver")
// console.log(tabledriver.rows.length)
// var a = tabledriver.getElementsByTagName("tr");
// // var td = tr.getElementsByTagName("td")
// //var a = tr.getElementsByTagName("a");
// var btn = document.getElementsByClassName("fullname")
var span = document.getElementsByClassName("close")[0]

// const collection = document.getElementsByTagName("a")
// for (var i = 0; i < collection.length; i++) {
//     btn[i].onclick = function() {
//         modaldriver.style.display = "block";
//     }
//   //  btn[i].addEventListener('click', showDriver);
//    // console.log(i)
// }


function showDriver() {
    modaldriver.style.display = "block";
  //  var btn = document.getElementsByClassName("fullname")
}
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modaldriver.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modaldriver) {
      modaldriver.style.display = "none";
    }
  }