import { pageChanger } from "../contentUpdater.js";
import table from "./table.js";

//Student Ledger Big Screen...
function studentLedgerBScreen() {
  let page = `
  <section class="transaction-history">
  <header>
    <h2>Transaction History</h2>
  </header>

  <div class="wrapper">
    <div class="selector">
      <div class="group-inputs">
        <select id="year-sem" class="input-box year-sem">
        </select>
        </div>

      <div class="btn">
        <button class="proceed-btn">Proceed</button>
      </div>
    </div>
    <div id="transTableContainer">
  </div>
</section>

<section class="permit-history">
  <div class="wrapper">
    <div id="permitTableContainer">
    </div>
  </div>
</section>`;

  pageChanger(page);

  table.options();
  table.transTableBScreen();
  table.permitTableBScreen();
}

function studentLedgerSScreen() {
  let page = `
    <section class="transaction-history">
    <header>
      <h2>Transaction History</h2>
    </header>

    <div class="wrapper">
      <div class="selector">
        <div class="group-inputs">
          <select class="input-box year-sem">
          </select>
        </div>

        <div class="btn">
          <button class="proceed-btn">Proceed</button>
        </div>
      </div>
      <div id="transTableContainer"></div>
    </div>
  </section>

  <section class="permit-history">
    <div class="wrapper">
      <div id="permitTableContainer">
      </div>
    </div>
  </section>
      `;

  pageChanger(page);

  table.options();
  table.transTableSScreen();
  table.permitTableSScreen();
}

export default { studentLedgerBScreen, studentLedgerSScreen };
