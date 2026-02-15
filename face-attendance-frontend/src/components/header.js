import logo from "../assets/image.png";

function Header() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="header">
      <div className="header-left">
        <h1>
          Face Recognition Based Attendance System <br />
          <span>Vidyalankar Institute of Technology</span>
        </h1>
      </div>

      <div className="header-right">
        <img src={logo} alt="College Logo" className="college-logo" />
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Header;
