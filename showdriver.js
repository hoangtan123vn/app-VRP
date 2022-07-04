var modaldriver = document.getElementById("modalDriver")

var btn = document.getElementsByClassName("fullname")

var span = document.getElementsByClassName("close")[0]


console.log(modaldriver)
// console.log(btn)
const collection = document.getElementsByTagName("a")
for (var i = 0; i < collection.length; i++) {
    btn[i].onclick = function() {
        modaldriver.style.display = "block";
    }
  //  btn[i].addEventListener('click', showDriver);
   // console.log(i)
}


// function showDriver() {
//     modaldriver.style.display = "block";
//     var btn = document.getElementsByClassName("fullname")
//     console.log(btn)
// }
  
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