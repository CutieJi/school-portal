export function login() {
  return `<h1>Login</h1>
    <select id="access" class="input-box">
      <option value="student" selected="selected">STUDENT</option>
      <option value="admin" disabled>ADMINISTRATOR</option>
      <option value="faculty" disabled>FACULTY</option>
      <option value="cashier" disabled>CASHIER</option>
      <option value="cashadmin" disabled>CASHIER ADMINISTRATOR</option>
      <option value="regstaff" disabled>REGISTRAR STAFF</option>
      <option value="misstaff" disabled>MIS STAFF</option>
    </select>
    <input
      id="studentId"
      class="input-box"
      type="password"
      placeholder="Student ID | Login ID"
    />
    <input
      id="password"
      class="input-box"
      type="password"
      placeholder="Password"
    />
    <input id="login-btn" class="login-btn" type="button" value="Login" />
    <div>
      <h3 class="new-student">
        New Student? Please <span id="goto-signup">click here!</span>
      </h3>
    </div>`;
}
