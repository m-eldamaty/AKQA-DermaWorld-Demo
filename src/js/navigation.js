var menuItemToggle = document.getElementsByClassName("subitems-toggle");

for (var i = 0; i < menuItemToggle.length; i++) {
  menuItemToggle[i].addEventListener("click", function () {
    toggleSubItems(this);
  });
}

// toggle menu lists
function toggleSubItems(ele) {
  toggleOthers(ele.parentElement, ele);
  for (i = 0; i < menuItemToggle.length; i++) {
    ele.parentElement.classList.toggle("active");
  }
    if(document.querySelectorAll('#navigationContainer .active').length > 1){
    document.getElementById('mainNav').classList.add('second-level-opened')
  }
  else{
    document.getElementById('mainNav').classList.remove('second-level-opened')
  }
  toggleAriaAttribute(ele);
}

//close all opened menu lists before opening a new one
function toggleOthers(menuParentItem, clickedMenuItem) {
  let menuItems =
    menuParentItem.parentElement.querySelectorAll("li.has-subitems");
  menuItems.forEach(function (menuItem) {
    if (menuItem != clickedMenuItem.parentElement)
      menuItem.classList.remove("active");
  });
}

//expand and collpase hamburger menu based on button click, search button click in mobile view
function toggleMenu() {
  closeOpenedSubItems();
  document.getElementById("mainNav").classList.toggle("expanded");
  document.getElementsByTagName("body")[0].classList.toggle("in");
  document.getElementsByTagName("body")[0].classList.remove("search-opened");
}

//expand and collpase search text box  based on search icon click, hamburger menu click in mobile view
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
