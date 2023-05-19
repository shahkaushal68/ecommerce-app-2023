import { Link } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import useLoginForm from "../../hooks/auth/loginForm.hook";

const Login = () => {
  const { formValues, errorMessages, handleChange, handleSubmit } =
    useLoginForm();
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="mt-5 d-flex justify-content-center align-items-center ">
            <div className="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
              <h2 className="text-center mb-4 text-primary">Login Form</h2>
              <form>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control border border-primary"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                  {errorMessages.emailError && (
                    <span className="error">{errorMessages.emailError}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control border border-primary"
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                  {errorMessages.passwordError && (
                    <span className="error">{errorMessages.passwordError}</span>
                  )}
                </div>

                <div className="d-grid">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="mt-3">
                <p className="mb-0  text-center">
                  Do not have an account?
                  <Link to="/register" className="text-primary fw-bold">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
