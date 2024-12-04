import { pageChanger } from "../contentUpdater.js";
import table from "./table.js";

//Enrolled Subjects Big Screen...
function enrolledBScreen() {
  let page = `
  <section class="enrolledSubject-section">
    <header>
      <h2>Subjects Enrolled/Assessed</h2>
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
      <div class="stud-info">
        <h4>Student#: <span>2023-2723-ICP</span></h4>
        <h4>Name: <span>Ingel, Jahn Rosh J.</span></h4>
        <h4>Strand: <span>ICT</span></h4>
        <h4>Enrollment Status: <span>Enrolled</span></h4>
      </div>
      <div id="enrolledTableContainer">
      </div>
    </div>
  </section>`;

  pageChanger(page);

  table.options();
  table.enrolledTableBScreen();
}

//Enrolled Subjects Small Screen...
function enrolledSScreen() {
  let page = `<section class="enrolledSubject-section">
    <header>
      <h2>Subjects Enrolled/Assessed</h2>
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
      <div class="stud-info">
        <h4><span>Student No:</span><span>2023-2723-ICP</span></h4>
        <h4><span>Name:</span><span>Ingel, Jahn Rosh J.</span></h4>
        <h4><span>Starand:</span><span>ICT</span></h4>
        <h4><span>Enrollment Status:</span><span>Enrolled</span></h4>
      </div>
      <div id="enrolledTableContainer">
      </div>
    </div>
  </section>`;

  pageChanger(page);

  table.options();
  table.enrolledTableSScreen();
}

export default { enrolledBScreen, enrolledSScreen };
