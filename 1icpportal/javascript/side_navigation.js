export default function side_navigation() {
  return `
<div class="side-navigation">
<div class="blur-bg">
  <i id="close-menu" class="fa-solid fa-xmark"></i>
  <div class="wrapper">
    <div class="logo-section">
      <img src="../images/icp_logo.png" alt="ICP Logo" />
      <h2>Immaculate Conception Polytechnic</h2>
    </div>
    <nav>
      <hr />
      <button class="active" id="student_ledger" value="student_ledger">Student Ledger</button>
      <hr />
      <button id="report_card" value="report_card">Report Card</button>
      <hr />
      <button id="enrolled_subject" value="enrolled_subject">Enrolled Subject</button>
      <hr />
      <button id="enrollment" value="enrollment">Enrollment/Advising</button>
      <hr />
    </nav>
  </div>
</div>
</div>
`;
}
