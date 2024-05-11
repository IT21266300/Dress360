import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import { useUpdateProfileMutation } from "../hooks/userHooks";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import "./userProfile.css";
import axios from "axios";
import apiClient from "../apiClient";
//import 'bootstrap/dist/css/bootstrap.css';

export default function userProfile() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo!.name);
  const [mobile, setMobile] = useState(userInfo!.mobile);
  const [email, setEmail] = useState(userInfo!.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false); // State to control the visibility of the confirmation modal
  const [isDeleting, setIsDeleting] = useState(false);

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
        mobile,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  const handleMeasument = () => {
    window.location.href = "/measurements";
  };

  const userID = localStorage.getItem("userInfo");

  let userData: { _id: string } | null = null;

  if (userID !== null) {
    userData = JSON.parse(userID);
  }

  const mID: string = userData && userData._id;

  console.log(mID);


  const deleteHandler = async () => {
    try {
      setIsDeleting(true);

      // Make sure you have the correct API endpoint and method
      await apiClient.delete(`/api/users/${userInfo!.id}`);

      setIsDeleting(false);
      toast.success("Profile deleted successfully");

      // Sign out the user
      dispatch({ type: 'USER_SIGNOUT' });
      localStorage.removeItem('userInfo');

      // Redirect to the home page (or any other appropriate page)
      window.location.href = '/'; 
    } catch (error) {
      setIsDeleting(false);
      toast.error("Failed to delete profile");
      console.error("Error deleting profile:", error);
    }
  };

  const handleClick = () => {
    setShowConfirmModal(true); // Show the confirmation modal when the "Delete Profile" button is clicked
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
                    <button
                      className="btn btn-outline-primary mx-3 mb-3"
                      onClick={handleMeasument}
                    >
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
                        onChange={(e) => setMobile(e.target.value)}
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
                        type="password"
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
                        type="password"
                        className="form-control"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-6">
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
            <div className="col-sm-3">
              <Button
                disabled={isLoading}
                type="submit"
                className="btn btn-danger "
                style={{
                  backgroundColor: "#dc3545",
                  borderColor: "#dc3545",
                  color: "#fff",
                }}
                onClick={() => deleteHandler(mID)}
              >
                Delete Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Are you sure you want to delete your profile?</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteHandler(mID)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
