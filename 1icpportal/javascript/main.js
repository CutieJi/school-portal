import side_navigation from "./side_navigation.js";
import show_page from "./show_page.js";
import current_page from "./pageController.js";
// import studentLedger from "./student ledger/studentLedger.js";
import studentLedger from "./deploy_version/studentLedger.js";
// import reportCard from "./report card/reportCard.js";
import reportCard from "./deploy_version/reportCard.js";
// import enrolledSubject from "./enrolled subjects/enrolledSubjects.js";
import enrolledSubject from "./deploy_version/enrolledSubject.js";
import popup_message from "./popup_message.js";
import autentication from "./autentication.js";

function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

function setCookie(name, value, time = 30 * 60) {
  document.cookie = `${name} = ${JSON.stringify(
    value
  )}; max-age= ${time}; path=/`;
}

function deleteCookie() {
  setCookie("cuser", null, 0);
}

let user = JSON.parse(getCookie("cuser"));
function checkCookie() {
  if (getCookie("cuser")) {
    setCookie("cuser", {
      username: user.username,
      password: user.password,
      access: user.access,
    });
    return true;
  } else {
    location.replace("./index.html");
    return false;
  }
}

setInterval(function () {
  checkCookie();
}, 15 * 60);

if (
  checkCookie() &&
  autentication(user.username, user.password, user.access) === true
) {
  $("body").prepend(side_navigation);
  $(".side-navigation").after(show_page);

  let page_content = $(".page-content");
  let data = sessionStorage.getItem("page");
  let nav = $("nav");
  let curPage = $("#page_title");

  let pages;
  let is_bigScreen = false;
  let is_smallScreen = false;

  function smallScreen() {
    pages = [
      ["Student Ledger", studentLedger.studentLedgerSScreen, "#student_ledger"],
      ["Report Card", reportCard.reportCardSScreen, "#report_card"],
      [
        "Enrolled Subject",
        enrolledSubject.enrolledSScreen,
        "#enrolled_subject",
      ],
      [
        "Enrollment/Advising",
        `<div class="content-not-ready">
        <h1>Sorry, this page isn't available.</h1>
    </div>`,
        "#enrollment",
      ],
    ];
  }

  function bigScreen() {
    pages = [
      ["Student Ledger", studentLedger.studentLedgerBScreen, "#student_ledger"],
      ["Report Card", reportCard.reportCardBScreen, "#report_card"],
      [
        "Enrolled Subject",
        enrolledSubject.enrolledBScreen,
        "#enrolled_subject",
      ],
      [
        "Enrollment/Advising",
        `<div class="content-not-ready">
        <h1>Sorry, this page isn't available.</h1>
    </div>`,
        "#enrollment",
      ],
    ];
  }

  $(window).resize(function () {
    if ($(window).width() > 1024 && !is_bigScreen) {
      is_smallScreen = false;
      is_bigScreen = true;
      bigScreen();
      getState();
    } else if ($(window).width() <= 1024 && !is_smallScreen) {
      is_bigScreen = false;
      is_smallScreen = true;
      smallScreen();
      getState();
    }
  });

  if ($(window).width() > 1024 && !is_bigScreen) {
    is_smallScreen = false;
    is_bigScreen = true;
    bigScreen();
  } else if ($(window).width() <= 1024 && !is_smallScreen) {
    is_bigScreen = false;
    is_smallScreen = true;
    smallScreen();
  }

  function setState(headTitle) {
    sessionStorage.setItem("page", headTitle);
  }

  function getState() {
    data = sessionStorage.getItem("page");

    pages.forEach(function (arr) {
      if (arr[0] === data) {
        current_page(nav, curPage, arr, page_content);
      }
    });
  }

  $(document).ready(function () {
    if (data) {
      getState();
    } else {
      setState(pages[0][0]);
      getState();
    }

    let header_title = $("#page_title");
    let main_buttons = $("nav button");

    //adding function to each of main buttons...
    main_buttons.each(function () {
      let button = $(this);
      button.click(function () {
        if (button.val() === "student_ledger") {
          if (!button.hasClass("active")) {
            page_content.scrollTop(0);
            header_title.text("Student Ledger");
            setState(header_title.text());
            getState();
            if (c1) {
              $(".side-navigation").toggle();
            }
          }
        } else if (button.val() === "report_card") {
          if (!button.hasClass("active")) {
            page_content.scrollTop(0);
            header_title.text("Report Card");
            setState(header_title.text());
            getState();
            if (c1) {
              $(".side-navigation").toggle();
            }
          }
        } else if (button.val() === "enrolled_subject") {
          if (!button.hasClass("active")) {
            page_content.scrollTop(0);
            header_title.text("Enrolled Subject");
            setState(header_title.text());
            getState();
            if (c1) {
              $(".side-navigation").toggle();
            }
          }
        } else if (button.val() === "enrollment") {
          if (!button.hasClass("active")) {
            page_content.scrollTop(0);
            header_title.text("Enrollment/Advising");
            setState(header_title.text());
            getState();
            if (c1) {
              $(".side-navigation").toggle();
            }
          }
        }
      });
    });

    //open and close menu...
    $("#menu").click(function () {
      $(".side-navigation").toggle();
    });

    $("#close-menu").click(function () {
      $(".side-navigation").toggle();
    });

    //open and close sub nav of profile icon...
    $("#profile-icon").click(function () {
      $(".sub-wrap").toggle();
    });

    $("#close-sub-profile").click(function () {
      $(".sub-wrap").toggle();
    });

    $(".change-profile").click(function () {
      $("body").prepend(
        popup_message(
          "Invalid to Perform",
          "You can't change the profile picture of this account."
        )
      );
      $("#ok").click(function () {
        $(".popup-message").remove();
      });
    });

    $("#change-pass").click(function () {
      $("body").prepend(
        popup_message(
          "Invalid to Perform",
          "You can't change the password of this account."
        )
      );
      $("#ok").click(function () {
        $(".popup-message").remove();
      });
    });

    $("#logout").click(function () {
      sessionStorage.clear();
      deleteCookie();
      location.replace("../index.html");
    });
  });

  function navHideOnClick() {
    $(document).bind("click", function (e) {
      if (
        !$(e.target).closest(".side-navigation").length &&
        !$(e.target).closest("#menu").length &&
        !$(e.target).closest(".popup-message").length
      ) {
        if ($(".side-navigation").is(":visible")) {
          $(".side-navigation").toggle();
        }
      }
      if (
        !$(e.target).closest(".sub-wrap").length &&
        !$(e.target).closest("#profile-icon").length &&
        !$(e.target).closest(".popup-message").length
      ) {
        if ($(".sub-wrap").is(":visible")) {
          $(".sub-wrap").toggle();
        }
      }
    });
  }

  let c1 = false;
  let c2 = false;
  if ($(window).width() <= 1199) {
    if (!c1) {
      c2 = false;
      c1 = true;
      $(document).unbind("click");
      navHideOnClick();
    }
  } else if ($(window).width() >= 1200) {
    if (!c2) {
      c1 = false;
      c2 = true;
      $(document).unbind("click");
      $(document).bind("click", function (e) {
        if (
          !$(e.target).closest(".sub-wrap").length &&
          !$(e.target).closest("#profile-icon").length &&
          !$(e.target).closest(".popup-message").length
        ) {
          if ($(".sub-wrap").is(":visible")) {
            $(".sub-wrap").toggle();
          }
        }
      });
    }
  }

  $(window).resize(function () {
    if ($(window).width() <= 1199) {
      if (!c1) {
        c2 = false;
        c1 = true;
        $(document).unbind("click");
        navHideOnClick();
      }
    } else if ($(window).width() >= 1200) {
      if (!c2) {
        c1 = false;
        c2 = true;
        $(document).unbind("click");
        $(document).bind("click", function (e) {
          if (
            !$(e.target).closest(".sub-wrap").length &&
            !$(e.target).closest("#profile-icon").length &&
            !$(e.target).closest(".popup-message").length
          ) {
            if ($(".sub-wrap").is(":visible")) {
              $(".sub-wrap").toggle();
            }
          }
        });
      }
    }
  });
} else {
  deleteCookie();
  location.replace("./index.html");
}
