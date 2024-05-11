import React from "react";
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

export default function measurements() {

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [height, setHeight] = useState(userInfo!.name);
  const [chest, setChest ] = useState(userInfo!.name);
  const [hip, setHip ] = useState(userInfo!.email);
  const [waist , setWaist  ] = useState(userInfo!.email);
  const [thigh, setThigh  ] = useState(userInfo!.email);
  const [outerleg, setOuterleg ] = useState(userInfo!.email);
  const [innerleg, setInnerleg ] = useState(userInfo!.email);
  const [nekHip, setNeckHip ] = useState(userInfo!.email);
  const [shoulder, setShoulder  ] = useState(userInfo!.email);
  
  const { mutateAsync: updateProfile, isLoading } = useUpdateProfileMutation();

  return (
    <div className="container">
      <h2>Body Measurements</h2>
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-6 mb-3">
            <div className="card" style={{ height: "500px" }}>
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://raw.githubusercontent.com/vcarlosrb/3d-body-measurements/main/images/measurements.png"
                    alt="Prototype"
                    className="rounded-circle"
                    width="250"
                    height="450"
                  />
                  <div className="mt-3">
                    {/* <p className="text-secondary mb-1">Full Stack Developer</p> */}

                    {/* <button className="btn btn-primary">Follow</button> */}
                
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mx-3">
            <form >
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <h6 className="mb-0" style={{ color: "black" }}>
                      A: Height (cm)
                      </h6>
                    </div>
                    <div className="col-sm-3">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="170"
                        style={{ width: "60px" }} 
                        onChange={(e) => setHeight(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-6">
                      <h6 className="mb-0" style={{ color: "black" }}>
                      B: Chest (cm)
                      </h6>
                    </div>
                    <div className="col-sm-3">
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: "60px" }} 
                        // value={email}
                        defaultValue="100"
                        onChange={(e) => setChest(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-6">
                      <h6 className="mb-0" style={{ color: "black" }}>
                      C: Hip (cm)
                      </h6>
                    </div>
                    <div className="col-sm-3">
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: "60px" }} 
                        // value={email}
                        defaultValue="110"
                        onChange={(e) => setHip(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-6">
                      <h6 className="mb-0" style={{ color: "black" }}>
                      D: Waist (cm)
                      </h6>
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: "60px" }} 
                        // value={email}
                        defaultValue="80"
                        onChange={(e) => setWaist(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-6">
                      <h6 className="mb-0" style={{ color: "black" }}>
                      E: Thigh (cm)
                      </h6>
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control"
                        // value={email}
                        style={{ width: "60px" }} 
                        defaultValue="50"
                        onChange={(e) => setThigh(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <hr />
    
                  <div className="row">
                    <div className="col-sm-6">
                      <h6 className="mb-0" style={{ color: "black" }}>
                      F: Outer leg (cm)
                      </h6>
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: "60px" }} 
                        // value={email}
                        defaultValue="150"
                        onChange={(e) => setOuterleg(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <hr />
             
                  <div className="row">
                    <div className="col-sm-6">
                      <h6 className="mb-0" style={{ color: "black" }}>
                      G: Inner leg (cm)
                      </h6>
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: "60px" }} 
                        // value={email}
                        defaultValue="130"
                        onChange={(e) => setInnerleg(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-6">
                      <h6 className="mb-0" style={{ color: "black" }}>
                      H: Neck-Hip length (cm)
                      </h6>
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: "60px" }} 
                        // value={email}
                        defaultValue="23"
                        onChange={(e) => setNeckHip(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-6">
                      <h6 className="mb-0" style={{ color: "black" }}>
                      I: Shoulder (cm)
                      </h6>
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control"
                        // value={email}
                        style={{ width: "60px" }} 
                        defaultValue="20"
                        onChange={(e) => setShoulder(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-12">
                      <Button
                        disabled={isLoading}
                        type="submit"
                        className="btn btn-info "
                      >
                        Add Mesurements
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
