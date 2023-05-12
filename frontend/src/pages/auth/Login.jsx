import { Link } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import { useState } from "react";
import { omit } from "lodash";

const Login = () => {
  const [formVal, setFormVal] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    //To stop default events
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validate(event, name, val);

    //Let's set these values in state
    setFormVal({
      ...formVal,
      [name]: val,
    });
  };
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    const check = Object.values(formVal).some((val) => val !== "");
    console.log(check);
    if (
      Object.keys(errors).length === 0 &&
      Object.values(formVal).some((val) => val !== "")
    ) {
      console.log(formVal);
    } else {
      setErrors(validate(event.target.name, event.target.value));
      console.log(errors);
    }
  };

  const validate = (event, name, value) => {
    //A function to validate each input values

    switch (name) {
      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Enter a valid email address",
          });
        } else {
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }
        break;

      case "password":
        if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
        ) {
          setErrors({
            ...errors,
            password:
              "Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers",
          });
        } else {
          let newObj = omit(errors, "password");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="mt-5 d-flex justify-content-center align-items-center ">
            <div className="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
              <h2 className="text-center mb-4 text-primary">Login Form</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="text"
                    className="form-control border border-primary"
                    name="email"
                    value={formVal.email}
                    onChange={handleChange}
                  />
                  {errors.email && <h3>{errors.email}</h3>}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    className="form-control border border-primary"
                    type="password"
                    name="password"
                    value={formVal.password}
                    onChange={handleChange}
                  />
                  {errors.password && <h3>{errors.password}</h3>}
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
