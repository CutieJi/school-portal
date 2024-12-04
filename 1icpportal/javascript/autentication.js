export default function (usernameInput, passwordInput, access) {
  let username = "user";
  let password = "user";

  if (usernameInput === "" && passwordInput === "") {
    return "error1";
  } else if (usernameInput === "") {
    return "error2";
  } else if (passwordInput === "") {
    return "error3";
  }

  if (
    username === usernameInput &&
    password === passwordInput &&
    access === "student"
  ) {
    let account = {
      access: "student",
      username: usernameInput,
      password: passwordInput,
    };
    document.cookie = `cuser = ${JSON.stringify(account)}; max-age= ${
      30 * 60
    }; path=/`;
    return true;
  } else {
    return false;
  }
}
