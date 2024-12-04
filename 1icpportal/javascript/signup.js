export function signup() {
  return `<div class="back-container">
  <div class="head-container">
    <h3>New Student</h3>
    <h1>Registration</h1>
  </div></div>
  
  <div id="steps"></div>

  <input id="next-btn" class="next-btn" type="button" value="Next" />
  <span id="goto-login" class="back-to-login">Back to Login</span>`;
}

export function step1() {
  return `<div class="group-input">
    <label for="firstname">
      Firstname
      <input id="firstname" class="input-box" type="text" />
    </label>
    <label for="lastname">
      Lastname
      <input id="lastname" class="input-box" type="text" />
    </label>
  </div>
  <label for="birthday">
    Birthday
    <div class="group-input">
      <select id="month" class="input-box">
      </select>
      <select id="day" class="input-box">
      </select>
      <select id="year" class="input-box">
      </select>
    </div>
  </label>
  <label for="Gender">
    Gender
    <div class="group-input gender">
      <input type="radio" value="female" name="select" id="option-1" />
      <input type="radio" value="male" name="select" id="option-2" />
      <label for="option-1" class="option option-1">
        <span>Female</span>
        <div class="dot"></div>
      </label>
      <label for="option-2" class="option option-2">
        <span>Male</span>
        <div class="dot"></div>
      </label>
    </div>
  </label>`;
}

export function step2() {
  return `<label for="nationality">
    Nationality
    <input id="nationality" class="input-box" type="text" />
  </label>
  <label for="mobile-number">
    Mobile Number
    <input id="mobile-number" class="input-box" type="text" />
  </label>
  <label for="email">
    Email Address
    <input id="email" class="input-box" type="text" />
  </label>`;
}

export function step3() {
  return `<label for="strand">
    Select strand you want to take
    <select class="input-box">
      <option value="none" selected="selected">No Options</option>
    </select>
  </label>
  <label for="strand">
    Select temporary student status
    <select class="input-box">
      <option value="none" selected="selected">No Options</option>
    </select>
  </label>

  <div class="group-input">
    </label>
    <label for="student-type">
      Student Type
      <select class="input-box">
        <option value="none" selected="selected">No Options</option>
      </select>
    </label>
  </div>`;
}
