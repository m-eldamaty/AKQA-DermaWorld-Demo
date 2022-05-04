var menuItemToggle = document.getElementsByClassName("subitems-toggle");

for (var i = 0; i < menuItemToggle.length; i++) {
  menuItemToggle[i].addEventListener("click", function () {
    toggleSubItems(this);
  });
}
function toggleSubItems(ele) {
    console.log(document.querySelectorAll('#navigationContainer .active').length)
//   if(document.querySelectorAll('#navigationContainer .active').length == 1){
//     document.getElementById('mainNav').classList.add('second-level-opened')
//   }
//   else{
//     document.getElementById('mainNav').classList.remove('second-level-opened')
//   }
  toggleOthers(ele.parentElement, ele);
  for (i = 0; i < menuItemToggle.length; i++) {
    ele.parentElement.classList.toggle("active");
  }

  toggleAriaAttribute(ele);
}
function toggleOthers(menuParentItem, clickedMenuItem) {
  let menuItems =
    menuParentItem.parentElement.querySelectorAll("li.has-subitems");
  menuItems.forEach(function (menuItem) {
    if (menuItem != clickedMenuItem.parentElement)
      menuItem.classList.remove("active");
  });
}
function toggleAriaAttribute(menuItem) {
  var menuListStatus = menuItem.getAttribute("aria-expanded");
  if (menuListStatus == "true") {
    menuListStatus = "false";
  } else {
    menuListStatus = "true";
  }
  menuItem.setAttribute("aria-expanded", menuListStatus);
}
function toggleMenu() {
  closeOpenedSubItems();
  document.getElementById("mainNav").classList.toggle("expanded");
  document.getElementsByTagName("body")[0].classList.toggle("in");
  document.getElementsByTagName("body")[0].classList.remove("search-opened");
}
function toggleSearch() {
  document.getElementsByTagName("body")[0].classList.toggle("search-opened");
  document.getElementsByTagName("body")[0].classList.remove("in");
  document.getElementById("mainNav").classList.remove("expanded");
  closeOpenedSubItems();
}
function closeOpenedSubItems() {
  let menuItems = document.querySelectorAll("li.has-subitems");
  menuItems.forEach(function (menuItem) {
    menuItem.classList.remove("active");
  });
}
