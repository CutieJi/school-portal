import rows from "./rows.js";

let data;
let year;
let transRowsBScreen = ``;
let permitRowsBScreen = ``;
let transRowsSScreen = ``;
let permitRowsSScreen = ``;
let avilableTransaction;
let listOptions;

$(document).ready(function () {
  getStudentLedgerData();
});

//Getting data from Student Ledger JSON File...
function getStudentLedgerData() {
  $.getJSON("../json/student_ledger.json", function (result) {
    data = result;
    avilableTransaction = Object.keys(result.Transaction).sort().reverse();

    if (sessionStorage.getItem("slInput")) {
      year = sessionStorage.getItem("slInput");
    } else {
      year = avilableTransaction[0];
    }

    // Get Available Transaction from JSON to transaction Year Sem Input...
    if (avilableTransaction) {
      let temp = ``;
      $.each(avilableTransaction, function (i, value) {
        if (value === year) {
          temp += `
        <option value="${value}" selected>
          ${value}
        </option>;`;
        } else {
          temp += `
        <option value="${value}">
          ${value}
        </option>;`;
        }
        listOptions = temp;
        $(".transaction-history .year-sem").html(listOptions);
      });
    }

    // Get data from JSON to transaction table...
    if (result.Transaction[year]) {
      let temp1 = ``;
      let temp2 = ``;
      $.each(result.Transaction[year], function (key, value) {
        temp1 += rows.transRowBScreen(value);
        temp2 += rows.transRowSScreen(value);
        if (!transRowsBScreen && $(window).width() >= 1025) {
          $("#transactionTable").append(rows.transRowBScreen(value));
        }
        if (!transRowsSScreen && $(window).width() <= 1024) {
          $("#transTableContainer .rows").append(rows.transRowSScreen(value));
        }
      });
      transRowsBScreen = temp1;
      transRowsSScreen = temp2;
    } else {
      console.log("No Transaction History...");
    }

    //Get data from JSON to permit table...
    if (result.ExamPermit.CurrentSem) {
      let temp1 = ``;
      let temp2 = ``;
      $.each(result.ExamPermit.CurrentSem, function (key, value) {
        temp1 += rows.permitRowBScreen(value);
        temp2 += rows.permitRowSScreen(value);
        if (!permitRowsBScreen && $(window).width() >= 1025) {
          $("#permitTable").append(rows.permitRowBScreen(value));
        }
        if (!permitRowsSScreen && $(window).width() <= 1024) {
          $("#permitTableContainer .rows").append(rows.permitRowSScreen(value));
        }
      });
      permitRowsBScreen = temp1;
      permitRowsSScreen = temp2;
    } else {
      console.log("No Permit History...");
    }
  });
}

function options() {
  if (listOptions) {
    $(".transaction-history .year-sem").html(listOptions);
  }

  $(".transaction-history .proceed-btn").click(() => proceedBTN());
}

function proceedBTN() {
  if (year !== $(".transaction-history .year-sem").val()) {
    year = $(".transaction-history .year-sem").val();
    sessionStorage.setItem("slInput", year);

    // Use save data for transaction table...
    if (data.Transaction[year].length) {
      let temp1 = ``;
      let temp2 = ``;
      $.each(data.Transaction[year], function (key, value) {
        temp1 += rows.transRowBScreen(value);
        temp2 += rows.transRowSScreen(value);
      });
      transRowsBScreen = temp1;
      transRowsSScreen = temp2;

      if ($(window).width() >= 1025) {
        transTableBScreen();
      }
      if ($(window).width() <= 1024) {
        transTableSScreen();
      }
    } else {
      transRowsBScreen = ``;
      transRowsSScreen = ``;

      if ($(window).width() >= 1025) {
        transTableBScreen();
      }
      if ($(window).width() <= 1024) {
        transTableSScreen();
      }
      console.log("No Transaction History...");
    }

    let temp = ``;
    $.each(avilableTransaction, function (i, value) {
      if (value === year) {
        temp += `
        <option value="${value}" selected>
          ${value}
        </option>;`;
      } else {
        temp += `
        <option value="${value}">
          ${value}
        </option>;`;
      }
      listOptions = temp;
    });
  }
}

//Student Ledger Table for Big Screens...
function transTableBScreen() {
  let table = `
  <table id="transactionTable">
    <tr>
      <th>#</th>
      <th>Description</th>
      <th>Date/Time</th>
      <th>Total Balance</th>
      <th>Cash</th>
      <th>Remaining Balance</th>
    </tr>
    ${transRowsBScreen}
  </table>`;

  if (transRowsBScreen) {
    $("#transTableContainer").html(
      `<div class="loading">
        <div class="loader">
        </div>
        <h2>Loading...</h2>
      </div>`
    );
    setTimeout(function () {
      $("#transTableContainer").html(table);
    }, 300);
  } else {
    $("#transTableContainer").html(table);
  }
}

function permitTableBScreen() {
  let table = `
  <table id="permitTable">
    <tr>
      <th colspan="6">SY: 2024 | SEM: 2</th>
    </tr>

    <tr>
      <th>Exam</th>
      <th>Required Amount</th>
      <th>Balance</th>
      <th>Exam Permit</th>
    </tr>

    ${permitRowsBScreen}
  </table>`;

  if (permitRowsBScreen) {
    $("#permitTableContainer").html(
      `<div class="loading">
        <div class="loader">
        </div>
        <h2>Loading...</h2>
      </div>`
    );
    setTimeout(function () {
      $("#permitTableContainer").html(table);
    }, 300);
  } else {
    $("#permitTableContainer").html(table);
  }
}

//Student Ledger Table for Small Screens...
function transTableSScreen() {
  let table = `
  <div class="row-wrap">
      <div class="row header">
        <h2>Transaction Details</h2>
      </div>
      <div class="rows">
        ${transRowsSScreen}
      </div>
  </div>`;

  if (transRowsBScreen) {
    $("#transTableContainer").html(
      `<div class="loading">
        <div class="loader">
        </div>
        <h2>Loading...</h2>
      </div>`
    );
    setTimeout(function () {
      $("#transTableContainer").html(table);
    }, 300);
  } else {
    $("#transTableContainer").html(table);
  }
}

function permitTableSScreen() {
  let table = `
   <div class="row-wrap">
       <div class="row header">
         <h2>SY: 2024 | SEM: 2</h2>
       </div>
       <div class="rows">
          ${permitRowsSScreen}
       </div>
   </div>
   `;

  if (permitRowsBScreen) {
    $("#permitTableContainer").html(
      `<div class="loading">
        <div class="loader">
        </div>
        <h2>Loading...</h2>
      </div>`
    );
    setTimeout(function () {
      $("#permitTableContainer").html(table);
    }, 300);
  } else {
    $("#permitTableContainer").html(table);
  }
}

export default {
  options,
  transTableBScreen,
  permitTableBScreen,
  transTableSScreen,
  permitTableSScreen,
};
