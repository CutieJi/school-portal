import { login } from "./login.js";
import * as singup from "./signup.js";
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

function checkCookie() {
  if (getCookie("cuser")) {
    location.replace("./main.html");
    return true;
  } else {
    return false;
  }
}
if (checkCookie() === false) {
  $("body").show();
  $(document).ready(function () {
    let form = $(".login-form");
    let head = $("head");

    if (sessionStorage.getItem("cform")) {
      if (sessionStorage.getItem("cform") == "login") {
        login_form(form, head);
      } else if (sessionStorage.getItem("cform") == "s1") {
        signup_step1(form, head);
      } else if (sessionStorage.getItem("cform") == "s2") {
        signup_step1(form, head);
        signup_step2(form, head);
      } else if (sessionStorage.getItem("cform") == "s3") {
        signup_step1(form, head);
        signup_step3(form, head);
      }
    } else {
      login_form(form, head);
    }
  });

  function calendar() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const d = new Date();
    // today date...
    let currentDay = d.getDate();
    let currentMonth = d.getMonth();
    let currentYear = d.getFullYear();

    //selected date...

    if (sessionStorage.getItem("bday")) {
      let bday = JSON.parse(sessionStorage.getItem("bday"));
      var sDay = bday.day;
      var sMonth = bday.month;
      var sYear = bday.year;
    } else {
      var sDay = currentDay;
      var sMonth = currentMonth;
      var sYear = currentYear;
    }

    // month...
    $.each(months, function (i, value) {
      if (sMonth == i) {
        $("#month").append(
          $("<option />").val(i).html(value).attr("selected", "selected")
        );
      } else {
        $("#month").append($("<option />").val(i).html(value));
      }
    });

    daysOptions(sMonth, sDay, sYear);

    // year...
    for (let i = new Date().getFullYear(); i > 1900; i--) {
      if (sYear == i) {
        $("#year").append(
          $("<option />").val(i).html(i).attr("selected", "selected")
        );
      } else {
        $("#year").append($("<option />").val(i).html(i));
      }
    }

    // onchange of month or year update days in month...
    $("#month").bind("change", function () {
      daysOptions($("#month").val(), $("#day").val(), $("#year").val());
      tempSaveBday();
    });

    $("#year").bind("change", function () {
      daysOptions($("#month").val(), $("#day").val(), $("#year").val());
      tempSaveBday();
    });
    $("#day").bind("change", function () {
      tempSaveBday();
    });
  }

  function tempSaveBday() {
    let bday = {
      month: $("#month").val(),
      day: $("#day").val(),
      year: $("#year").val(),
    };
    sessionStorage.setItem("bday", JSON.stringify(bday));
  }

  function daysOptions(mm, dd, yy) {
    $("#day").empty();
    let days = daysInMonth(parseInt(mm) + 1, yy);
    for (let i = 1; i <= days; i++) {
      if (dd == i) {
        $("#day").append(
          $("<option />").val(i).html(i).attr("selected", "selected")
        );
      } else {
        $("#day").append($("<option />").val(i).html(i));
      }
    }
  }

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  function showMSG(title, info) {
    $("body").prepend(popup_message(title, info));
    $("#ok").click(function () {
      $(".popup-message").remove();
    });
  }

  function login_form(form, head) {
    sessionStorage.removeItem("bday");
    sessionStorage.removeItem("cform");

    form.addClass("login-form").removeClass("signup-form");

    form.hide();
    form.html(login());
    form.fadeIn(300);

    $("#login-btn").click(function () {
      if ($(".popup-message").length == 0) {
        let response = autentication(
          $("#studentId").val(),
          $("#password").val(),
          $("#access").val()
        );

        if (response === true) {
          setTimeout(function () {
            location.replace("./main.html");
          }, 1000);
        } else if (response === "error1") {
          setTimeout(function () {
            showMSG("Invalid Input", "Please Enter Student ID and Password.");
          }, 1000);
        } else if (response === "error2") {
          setTimeout(function () {
            showMSG("Invalid Input", "Please Enter your Student ID.");
          }, 1000);
        } else if (response === "error3") {
          setTimeout(function () {
            showMSG("Invalid Input", "Please Enter your Password.");
          }, 1000);
        } else {
          setTimeout(function () {
            showMSG("Invalid Account", "Student ID and Password not Match.");
          }, 1000);
        }
      }
    });

    $(document).keydown(function (e) {
      if (e.which == 13 && $(".popup-message").length == 0) {
        $("#login-btn").trigger("click");
      }
    });

    $("#goto-signup").unbind("click");
    $("#goto-signup").bind("click", () =>
      form.fadeOut(300, () => signup_step1(form, head))
    );
  }

  function signup_step1(form, head) {
    sessionStorage.setItem("cform", "s1");
    $("#backBTN").remove();

    if (!$(".signup-form").length) {
      form.addClass("signup-form").removeClass("login-form");

      form.hide();
      form.html(singup.signup());
      form.fadeIn(300);
    }

    let steps = $("#steps");

    steps.hide();
    steps.html(singup.step1());
    calendar();
    steps.fadeIn(300);

    let nextBTN = $("#next-btn");
    let goto_login = $("#goto-login");
    nextBTN.unbind("click");
    nextBTN.bind("click", () => {
      steps.fadeOut(300, () => signup_step2(form, head));
      tempSaveBday();
    });
    goto_login.unbind("click");
    goto_login.bind("click", () =>
      form.fadeOut(300, () => login_form(form, head))
    );
  }

  function signup_step2(form, head) {
    sessionStorage.setItem("cform", "s2");

    let steps = $("#steps");
    var nextBTN;
    steps.hide();
    steps.html(singup.step2());
    steps.fadeIn(300, () => {
      nextBTN = $("#next-btn");
      nextBTN.removeAttr("id").attr("id", "next-btn").val("Next");
      nextBTN.unbind("click");
      nextBTN.bind("click", () =>
        steps.fadeOut(300, () => signup_step3(form, head))
      );
    });

    if (!$("#backBTN").length) {
      $(".back-container").prepend(
        `<i id="backBTN" class="backBTN fa-solid fa-chevron-left"></i>`
      );
    }

    $("#backBTN").unbind("click");
    $("#backBTN").bind("click", () =>
      steps.fadeOut(300, () => signup_step1(form, head))
    );
  }

  function signup_step3(form, head) {
    sessionStorage.setItem("cform", "s3");
    let steps = $("#steps");
    var nextBTN;
    steps.hide();
    steps.html(singup.step3());
    steps.fadeIn(300, () => {
      nextBTN = $("#next-btn");
      nextBTN.removeAttr("id").attr("id", "submit-btn").val("Submit");
      nextBTN.unbind("click");

      let submitBTN = $("#submit-btn");

      submitBTN.bind("click", function () {
        showMSG("Invalid to Perform", "This function is not working yet");
      });
    });

    if (!$("#backBTN").length) {
      $(".back-container").prepend(
        `<i id="backBTN" class="backBTN fa-solid fa-chevron-left"></i>`
      );
    }

    $("#backBTN").unbind("click");
    $("#backBTN").bind("click", () => {
      steps.fadeOut(300, () => {
        signup_step2(form, head);
        nextBTN.removeAttr("id").attr("id", "next-btn").val("Next");
      });
    });
  }
}
