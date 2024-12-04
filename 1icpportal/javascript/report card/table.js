import rows from "./rows.js";

let data;
let year;
let sem;
let reportRowsBScreen = ``;
let reportRowsSScreen = ``;
let availableYear;
let listOptionsYear;
let availableSem;
let listOptionsSem;

$(document).ready(function () {
  getReportCardData();
});

//Getting data from Report Card JSON File...
function getReportCardData() {
  $.getJSON("../json/student_report.json", function (result) {
    let ys = JSON.parse(sessionStorage.getItem("rcInput"));
    data = result;

    availableYear = Object.keys(result.Year).sort().reverse();
    if (ys) {
      year = ys.year;
    } else {
      year = availableYear[0];
    }

    availableSem = Object.keys(result.Year[year]).sort().reverse();
    if (ys) {
      sem = ys.sem;
    } else {
      sem = availableSem[0];
    }

    // Get Available year and sem from JSON to report card Inputs...
    if (availableYear) {
      let temp1 = ``;
      let temp2 = ``;
      $.each(availableYear, function (i, value) {
        if (value === year) {
          temp1 += `
                <option value="${value}" selected>
                  ${value}
                </option>;`;
        } else {
          temp1 += `
                  <option value="${value}">
                    ${value}
                  </option>;`;
        }
      });
      listOptionsYear = temp1;
      $(".reportCard-section #year").html(listOptionsYear);

      $.each(availableSem, function (i, value) {
        if (value === sem) {
          temp2 += `
                <option value="${value}" selected>
                  ${value}
                </option>;`;
        } else {
          temp2 += `
                  <option value="${value}">
                    ${value}
                  </option>;`;
        }
      });
      listOptionsSem = temp2;
      $(".reportCard-section #sem").html(listOptionsSem);
    }

    //Get data from JSON to report card table...
    if (result.Year[year][sem]) {
      let temp1 = ``;
      let temp2 = ``;
      $.each(result.Year[year][sem], function (key, value) {
        temp1 += rows.rowBScreen(value, result.ShowGrade);
        temp2 += rows.rowSScreen(value, result.ShowGrade);
        if (!reportRowsBScreen && $(window).width() >= 1025) {
          $("#reportTable").append(rows.rowBScreen(value, result.ShowGrade));
        }
        if (!reportRowsSScreen && $(window).width() <= 1024) {
          $(".reportCard-section .rows").append(
            rows.rowSScreen(value, result.ShowGrade)
          );
        }
      });
      reportRowsBScreen = temp1;
      reportRowsSScreen = temp2;
    } else {
      console.log("No Record...");
    }
  });
}

function options() {
  if (listOptionsYear) {
    $(".reportCard-section #year").html(listOptionsYear);
  }

  if (listOptionsSem) {
    $(".reportCard-section #sem").html(listOptionsSem);
  }

  $(".reportCard-section .proceed-btn").click(() => proceedBTN());
}

function proceedBTN() {
  if (
    year !== $(".reportCard-section #year").val() ||
    sem !== $(".reportCard-section #sem").val()
  ) {
    year = $(".reportCard-section #year").val();
    sem = $(".reportCard-section #sem").val();

    sessionStorage.setItem("rcInput", JSON.stringify({ year: year, sem: sem }));

    // Use save data for report card table...
    if (data.Year[year][sem].length) {
      let temp1 = ``;
      let temp2 = ``;
      $.each(data.Year[year][sem], function (key, value) {
        temp1 += rows.rowBScreen(value);
        temp2 += rows.rowSScreen(value);
      });
      reportRowsBScreen = temp1;
      reportRowsSScreen = temp2;

      if ($(window).width() >= 1025) {
        reportTableBScreen();
      }
      if ($(window).width() <= 1024) {
        reportTableSScreen();
      }
    } else {
      reportRowsBScreen = ``;
      reportRowsSScreen = ``;

      if ($(window).width() >= 1025) {
        reportTableBScreen();
      }
      if ($(window).width() <= 1024) {
        reportTableSScreen();
      }
      console.log("No Record...");
    }

    let temp1 = ``;
    $.each(availableYear, function (i, value) {
      if (value === year) {
        temp1 += `
          <option value="${value}" selected>
            ${value}
          </option>;`;
      } else {
        temp1 += `
          <option value="${value}">
            ${value}
          </option>;`;
      }
      listOptionsYear = temp1;
    });

    let temp2 = ``;
    $.each(availableSem, function (i, value) {
      if (value === sem) {
        temp2 += `
          <option value="${value}" selected>
            ${value}
          </option>;`;
      } else {
        temp2 += `
          <option value="${value}">
            ${value}
          </option>;`;
      }
      listOptionsSem = temp2;
    });
  }
}

//Report Card Table for Big Screens...
function reportTableBScreen() {
  let table = `
  <table id="reportTable">
    <tr>
      <th colspan="12">Student's Subjects</th>
    </tr>
    <tr>
      <th>#</th>
      <th>Code</th>
      <th>Description</th>
      <th>Faculty</th>
      <th>Instructor</th>
      <th>Midterm Average</th>
      <th>Finals Average</th>
    </tr>
    ${reportRowsBScreen}
  </table>`;

  if (reportRowsBScreen) {
    $("#reportCardContainer").html(
      `<div class="loading">
        <div class="loader">
        </div>
        <h2>Loading...</h2>
      </div>`
    );
    setTimeout(function () {
      $("#reportCardContainer").html(table);
    }, 300);
  } else {
    $("#reportCardContainer").html(table);
  }
}

//Report Card Table for Small Screens...
function reportTableSScreen() {
  let table = `
  <div class="row-wrap">
    <div class="row header">
      <h2>Student's Subjects</h2>
    </div>
    <div class="rows">
      ${reportRowsSScreen}
    </div>
  </div>
  `;

  if (reportRowsBScreen) {
    $("#reportCardContainer").html(
      `<div class="loading">
        <div class="loader">
        </div>
        <h2>Loading...</h2>
      </div>`
    );
    setTimeout(function () {
      $("#reportCardContainer").html(table);
    }, 300);
  } else {
    $("#reportCardContainer").html(table);
  }
}

export default {
  options,
  reportTableBScreen,
  reportTableSScreen,
};
