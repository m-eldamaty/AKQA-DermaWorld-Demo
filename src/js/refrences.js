var collapseToggle = document.getElementsByClassName("collapse-toggle-btn");

for (var i = 0; i < collapseToggle.length; i++) {
    collapseToggle[i].addEventListener("click", function () {
    toggleList(this);
  });
}
function toggleList(clickedItem){
    var content = clickedItem.nextElementSibling;
    content.classList.toggle('shown');
}