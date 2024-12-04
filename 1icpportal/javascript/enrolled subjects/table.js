import rows from "./rows.js";

let data;
let year;
let sem;
let enrolledRowsBScreen = ``;
let enrolledRowsSScreen = ``;
let availableYear;
let listOptionsYear;
let availableSem;
let listOptionsSem;

$(document).ready(function () {
  getEnrolledData();
});

//Getting data from Enrolled Subject JSON File...
function getEnrolledData() {
  $.getJSON("../json/student_subjects.json", function (result) {
    let ys = JSON.parse(sessionStorage.getItem("esInput"));
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

    // Get Available year and sem from JSON to Enrolled Subject Inputs...
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
      $(".enrolledSubject-section #year").html(listOptionsYear);
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
      $(".enrolledSubject-section #sem").html(listOptionsSem);
    }
    //Get data from JSON to Enrolled Subject table...
    if (result.Year[year][sem]) {
      let temp1 = ``;
      let temp2 = ``;
      $.each(result.Year[year][sem], function (key, value) {
        temp1 += rows.rowBScreen(value, result.ShowGrade);
        temp2 += rows.rowSScreen(value, result.ShowGrade);
        if (!enrolledRowsBScreen && $(window).width() >= 1025) {
          $("#enrolledTable").append(rows.rowBScreen(value, result.ShowGrade));
        }
        if (!enrolledRowsSScreen && $(window).width() <= 1024) {
          $(".enrolledSubject-section .rows").append(
            rows.rowSScreen(value, result.ShowGrade)
          );
        }
      });
      enrolledRowsBScreen = temp1;
      enrolledRowsSScreen = temp2;
    } else {
      console.log("No Record...");
    }
  });
}

function options() {
  if (listOptionsYear) {
    $(".enrolledSubject-section #year").html(listOptionsYear);
  }
  if (listOptionsSem) {
    $(".enrolledSubject-section #sem").html(listOptionsSem);
  }
  $(".enrolledSubject-section .proceed-btn").click(() => proceedBTN());
}

function proceedBTN() {
  if (
    year !== $(".enrolledSubject-section #year").val() ||
    sem !== $(".enrolledSubject-section #sem").val()
  ) {
    year = $(".enrolledSubject-section #year").val();
    sem = $(".enrolledSubject-section #sem").val();
    sessionStorage.setItem("esInput", JSON.stringify({ year: year, sem: sem }));

    // Use save data for Enrolled Subject table...
    if (data.Year[year][sem].length) {
      let temp1 = ``;
      let temp2 = ``;
      $.each(data.Year[year][sem], function (key, value) {
        temp1 += rows.rowBScreen(value);
        temp2 += rows.rowSScreen(value);
      });

      enrolledRowsBScreen = temp1;
      enrolledRowsSScreen = temp2;

      if ($(window).width() >= 1025) {
        enrolledTableBScreen();
      }
      if ($(window).width() <= 1024) {
        enrolledTableSScreen();
      }
    } else {
      enrolledRowsBScreen = ``;
      enrolledRowsSScreen = ``;

      if ($(window).width() >= 1025) {
        enrolledTableBScreen();
      }
      if ($(window).width() <= 1024) {
        enrolledTableSScreen();
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

//Enrolled Subject Table for Big Screens...
function enrolledTableBScreen() {
  let table = `
  <table id="enrolledTable">
    <tr>
      <th colspan="12">Student's Subjects</th>
    </tr>
    <tr>
      <th>#</th>
      <th>Subj Code</th>
      <th>Description</th>
      <th>From</th>
      <th>To</th>
      <th>Room</th>
      <th>Faculty</th>
      <th>Instructor</th>
    </tr>
    ${enrolledRowsBScreen}
  </table>`;

  if (enrolledRowsBScreen) {
    $("#enrolledTableContainer").html(
      `<div class="loading">
        <div class="loader">
        </div>
        <h2>Loading...</h2>
      </div>`
    );
    setTimeout(function () {
      $("#enrolledTableContainer").html(table);
    }, 300);
  } else {
    $("#enrolledTableContainer").html(table);
  }
}

//Enrolled Subject Table for Small Screens...
function enrolledTableSScreen() {
  let table = `
  <div class="row-wrap">
    <div class="row header">
      <h2>Student's Subjects</h2>
    </div>

    <div class="rows">
      ${enrolledRowsSScreen}
    </div>
  </div>`;

  if (enrolledRowsBScreen) {
    $("#enrolledTableContainer").html(
      `<div class="loading">
        <div class="loader">
        </div>
        <h2>Loading...</h2>
      </div>`
    );
    setTimeout(function () {
      $("#enrolledTableContainer").html(table);
    }, 300);
  } else {
    $("#enrolledTableContainer").html(table);
  }
}

export default {
  options,
  enrolledTableBScreen,
  enrolledTableSScreen,
};
