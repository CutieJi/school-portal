import { pageChanger } from "../contentUpdater.js";
import table from "./table.js";

//Report Card Big Screen...
function reportCardBScreen() {
  let page = `<section class="reportCard-section">
    <header>
      <h2>Report Card (Online)</h2>
    </header>

    <div class="wrapper">
    <div class="selector">
      <div class="group-inputs">
        <label for="">
          School Year
          <select id="year" class="input-box year-sem">
          </select>
        </label>
        <label for="">
          Semester
          <select id="sem" class="input-box year-sem">
          </select>
        </label>
      </div>

        <div class="btn">
          <button class="proceed-btn">Proceed</button>
        </div>
      </div>
      <div id="reportCardContainer">
      </div>
    </div>
  </section>`;

  pageChanger(page);

  table.options();
  table.reportTableBScreen();
}

//Report Card Small Screen...
function reportCardSScreen() {
  let page = `<section class="reportCard-section">
    <header>
      <h2>Report Card (Online)</h2>
    </header>

    <div class="wrapper">
    <div class="selector">
      <div class="group-inputs">
        <label for="">
          School Year
          <select id="year" class="input-box year-sem">
          </select>
        </label>
        <label for="">
          Semester
          <select id="sem" class="input-box year-sem">
          </select>
        </label>
      </div>

      <div class="btn">
              <button class="proceed-btn">Proceed</button>
            </div>
      </div>

      <div id="reportCardContainer">
      </div>
    </div>
    </div>
  </section>`;

  pageChanger(page);

  table.options();
  table.reportTableSScreen();
}

export default { reportCardBScreen, reportCardSScreen };
