//Report Card row for Big Screens...
function rowBScreen(data, is_cardShow) {
  let cardShow = `
      <td>${data.MAverage}</td>
      <td>${data.FAverage}</td>
  `;

  return `
  <tr>
      <td>${data.No}</td>
      <td>${data.Code}</td>
      <td>${data.Description}</td>
      <td>${data.Faculty}</td>
      <td>${data.Teacher}</td>
  </tr>`;
}

//Report Card row for Small Screens...
function rowSScreen(data, is_cardShow) {
  let cardShow = `
    <p><span>Midterm Average:</span><span>${data.MAverage}</span></p>
    <p><span>Finals Average:</span><span>${data.FAverage}</span></p>
    `;
  return `
  <div class="row">
    <p><span>No:</span><span>${data.No}</span></p>
    <p><span>Code:</span><span>${data.Code}</span></p>
    <p><span>Description:</span><span>${data.Description}</span></p>
    <p><span>Faculty:</span><span>${data.Faculty}</span></p>
    <p><span>Instructor:</span><span>${data.Teacher}</span></p>
    `
    }
  </div>
  `;
}
export default {
  rowBScreen,
  rowSScreen,
};
