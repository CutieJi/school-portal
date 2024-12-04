export default function show_page() {
  return `
  <div class="current-page">
    <div class="page-header">
      <header>
          <div class="left-group">
            <i id="menu" class="fa-solid fa-bars"></i>
            <h1 id="page_title">Student Ledger</h1>
          </div>
          <div class="account">
            <div class="account-name">
              <h4>2023-2723-ICP</h4>
              <h4>Ingel, Jahn Rosh J.</h4>
            </div>
            <img
              id="profile-icon"
              src="../images/blank-profile-picture.png"
              alt="Blank Profile Picture"
            />
          </div>
      </header>
    </div>
    <div class="sub-wrap">
              <div class="sub-prof">
                <i id="close-sub-profile" class="fa-solid fa-xmark"></i>
                <div class="change-profile">
                <img
                  id="img-sub"
                  src="../images/blank-profile-picture.png"
                  alt="Blank Profile Picture"
                />
                <div class="camera-icon">
                <i class="fa-solid fa-camera" style="color: #e6e6e6; font-size:24px;"></i>
                </div>
                </div>
                <h4>Ingel, Jahn Rosh J.</h4>
                <hr>
                <button id="change-pass">Change password</button>
                <hr>
                <button id="logout">Logout</button>
                <hr>
              </div>
            </div>
    <div class="page-content">
  </div>
    `;
}
