//Enrolled row for Big Screens...
function rowBScreen(data) {
  return `
  <tr>
      <td>${data.No}</td>
      <td>${data.Code}</td>
      <td>${data.Description}</td>
      <td>${data.From}</td>
      <td>${data.To}</td>
      <td>${data.Room}</td>
      <td>${data.Faculty}</td>
      <td>${data.Teacher}</td>
    </tr>`;
}

//Enrolled row for Small Screens...
function rowSScreen(data) {
  return `
  <div class="row">
    <p><span>No:</span><span>${data.No}</span></p>
    <p><span>Subj Code</span><span>${data.Code}</span></p>
    <p><span>Description:</span><span>${data.Description}</span></p>
    <p><span>From:</span><span>${data.From}</span></p>
    <p><span>To:</span><span>${data.To}</span></p>
    <p><span>Room:</span><span>${data.Room}</span></p>
    <p><span>Faculty:</span><span>${data.Faculty}</span></p>
    <p><span>Instructor:</span><span>${data.Teacher}</span></p>
  </div>
  `;
}
export default {
  rowBScreen,
  rowSScreen,
};
