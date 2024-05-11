import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import { Model as MaleModel } from "./Male";
import { Model as FemaleModel } from "./Female";
import { Model as Cloth1Model } from "./Cloth1"; // Import the Cloth1 component
import { Model as Cloth2Model } from "./Cloth2"; // Import the Cloth2 component
import { Model as Cloth3Model } from "./Cloth3"; // Import the Cloth3 component
import Visual from "../VisualDisability/Visual"; // Import the Visual component
import './TryonRoom.css';

const TryonRoom = ({
  handleClose,
  show,
}: {
  handleClose: () => void;
  show: boolean;
}) => {
  const [selectedModel, setSelectedModel] = useState<"male" | "female">("male");
  const [selectedColor, setSelectedColor] = useState<"red" | "blue" | "yellow" | "default">("default");
  const [visualPopupOpen, setVisualPopupOpen] = useState(false); // State for visual disability popup

  const scale: [number, number, number] = [0.26, 0.26, 0.26]; // Adjust the scale factor for x, y, and z axes.

  const handleModelChange = (model: "male" | "female") => {
    setSelectedModel(model);
  };

  const handleColorChange = (color: "red" | "blue" | "yellow" | "default") => {
    setSelectedColor(color);
  };

  const handleVisualButtonClick = () => {
    setVisualPopupOpen(true);
  };

  const closeVisualPopup = () => {
    setVisualPopupOpen(false);
  };

  const renderSelectedModel = () => {
    if (selectedModel === "male") {
      return <MaleModel scale={scale} />;
    } else {
      switch (selectedColor) {
        case "default":
          return <FemaleModel/>;
        case "red":
          return <Cloth2Model />;
        case "blue":
          return <Cloth1Model />;
        case "yellow":
          return <Cloth3Model />;
        default:
          return <FemaleModel />;
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Try Your Clothes</Modal.Title>
      </Modal.Header>
      <Modal.Body className="tryon-room-body">
        <div className="tryon-room">
          <div className="model-top">
            <Canvas
              className="top-canvas"
              camera={{ fov: 100, position: [0, 0, 3] }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight intensity={0.8} position={[5, 5, 5]} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                maxPolarAngle={Math.PI / 2}
              />
              {renderSelectedModel()}
            </Canvas>
          </div>
          <hr /> {/* Add the hr tag here */}
          <div className="model-bottom">
            <div className="color-buttons">
            <label htmlFor="dress-color">Select Dress Color:</label>
              <Button variant="danger" onClick={() => handleColorChange("red")}></Button>
              <Button variant="primary" onClick={() => handleColorChange("blue")}></Button>
              <Button variant="warning" onClick={() => handleColorChange("yellow")}></Button>
            </div>
            <div className="gender" style={{marginBottom: "10px"}}>
              <label htmlFor="gender">Select Gender:</label>
            <select
              id="gender"
              value={selectedModel}
              onChange={(e) =>
                handleModelChange(e.target.value as "male" | "female")
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            </div>
            
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleVisualButtonClick}>
          You Have Any Visual Disability
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
      {/* Render the visual disability popup if open */}
      {visualPopupOpen && <Visual handleClose={closeVisualPopup} />}
    </Modal>
  );
};

export default TryonRoom;
