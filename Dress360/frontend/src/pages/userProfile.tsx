import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import { useUpdateProfileMutation } from "../hooks/userHooks";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import "./userProfile.css";
//import 'bootstrap/dist/css/bootstrap.css';

export default function userProfile() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo!.name);
  const [email, setEmail] = useState(userInfo!.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutateAsync: updateProfile, isLoading } = useUpdateProfileMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const data = await updateProfile({
        name,
        email,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  const handleClick = () => {
    window.location.href = '/measurements'; 
  };

  return (
    <div className="container">
      <h2>User Profile</h2>
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    {/* <p className="text-secondary mb-1">Full Stack Developer</p> */}

                    {/* <button className="btn btn-primary">Follow</button> */}
                    <button className="btn btn-outline-primary mx-3 mb-3" onClick={handleClick}>
                      Add Body measurements
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <form onSubmit={submitHandler}>
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0" style={{ color: "black" }}>
                        Full Name
                      </h6>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0" style={{ color: "black" }}>
                        Email
                      </h6>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        value={email}
                        defaultValue="0708989221"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0" style={{ color: "black" }}>
                        Mobile
                      </h6>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        // value={email}
                        defaultValue="0708989221"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0" style={{ color: "black" }}>
                        Password
                      </h6>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0" style={{ color: "black" }}>
                        Confirm Password
                      </h6>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-12">
                      <Button
                        disabled={isLoading}
                        type="submit"
                        className="btn btn-info "
                      >
                        Update Details
                      </Button>
                    </div>
                    {isLoading && <LoadingBox></LoadingBox>}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
