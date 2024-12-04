export default function current_page(nav, curPage, page, page_content) {
  curPage.text(page[0]);

  if (page[0] === "Enrollment/Advising") {
    page_content.html(page[1]);
  } else {
    page[1]();
  }

  nav.find(".active").removeAttr("class");
  nav.find(page[2]).addClass("active");
}
