import { Link } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import useRegisterForm from "../../hooks/auth/registerForm.hook";

const Register = () => {
  const { formValues, errorMessages, handleChange, handleSubmit } =
    useRegisterForm();
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="mt-5 d-flex justify-content-center align-items-center ">
            <div className="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
              <h2 className="text-center mb-4 text-primary">Register Form</h2>
              <form>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control border border-primary"
                    name="userName"
                    value={formValues.userName}
                    onChange={handleChange}
                  />
                  {errorMessages.userNameError && (
                    <span className="error">{errorMessages.userNameError}</span>
                  )}
                </div>
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
                    Register
                  </button>
                </div>
              </form>
              <div className="mt-3">
                <p className="mb-0  text-center">
                  Do not have an account?
                  <Link to="/login" className="text-primary fw-bold">
                    Login
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

export default Register;
