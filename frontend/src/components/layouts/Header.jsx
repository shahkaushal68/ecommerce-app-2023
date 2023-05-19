import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../styles/header.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
//import { useSelector } from "react-redux";

const Header = () => {
  //const state = useSelector((state) => state.user);

  const token = localStorage.getItem("_token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log("state", state);
  const handleLogout = () => {
    localStorage.removeItem("_token");
    dispatch(logout());
    navigate("/login");
  };
  return (
    <>
      <div>
        <div className="utility-nav d-none d-md-block">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6">
                <p className="small">
                  <i className="bx bx-envelope" /> logo@example.com
                  <i className="bx bx-phone" /> +91-9876543210
                </p>
              </div>
              <div className="col-12 col-md-6 text-right">
                <p className="small">
                  Free shipping on total of $99 of all products
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav
          className="navbar navbar-expand-md navbar-light bg-light main-menu"
          style={{ boxShadow: "none" }}
        >
          <div className="container">
            <button
              type="button"
              id="sidebarCollapse"
              className="btn btn-link d-block d-md-none"
            >
              <i className="bx bx-menu icon-single" />
            </button>
            <NavLink className="navbar-brand" to="">
              <h4 className="font-weight-bold">Logo</h4>
            </NavLink>
            <ul className="navbar-nav ml-auto d-block d-md-none">
              <li className="nav-item">
                <NavLink className="btn btn-link" to="">
                  <i className="bx bxs-cart icon-single" />
                  <span className="badge badge-danger">3</span>
                </NavLink>
              </li>
            </ul>
            <div className="collapse navbar-collapse">
              <form className="form-inline my-2 my-lg-0 mx-auto">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search for products..."
                  aria-label="Search"
                />
                <button className="btn btn-success my-2 my-sm-0" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </form>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="btn btn-link" to="">
                    <i className="bi bi-cart"></i>
                    <span className="badge badge-danger">3</span>
                  </NavLink>
                </li>
                {!token ? (
                  <li className="nav-item ml-md-3">
                    <Link className="btn btn-primary" to="/login">
                      <i className="bi bi-person-circle"></i> Log In
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item ml-md-3">
                    <Link
                      className="btn btn-danger"
                      to="/login"
                      onClick={handleLogout}
                    >
                      LogOut
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-expand-md navbar-light bg-light sub-menu">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbar">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
