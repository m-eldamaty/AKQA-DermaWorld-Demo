function toggleAriaAttribute(item) {
    var menuListStatus = item.getAttribute("aria-expanded");
    if (menuListStatus == "true") {
      menuListStatus = "false";
    } else {
      menuListStatus = "true";
    }
    item.setAttribute("aria-expanded", menuListStatus);
  }