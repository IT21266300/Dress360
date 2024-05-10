import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import { Model as MaleModel } from "./Male";
import { Model as FemaleModel } from "./Female";
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
  const [visualPopupOpen, setVisualPopupOpen] = useState(false); // State for visual disability popup

  const scale: [number, number, number] = [0.26, 0.26, 0.26]; // Adjust the scale factor for x, y, and z axes.

  const handleModelChange = (model: "male" | "female") => {
    setSelectedModel(model);
  };

  const handleVisualButtonClick = () => {
    setVisualPopupOpen(true);
  };

  const closeVisualPopup = () => {
    setVisualPopupOpen(false);
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
              className="top-canva"
              camera={{ fov: 100, position: [0, 0, 3] }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight intensity={0.8} position={[5, 5, 5]} />
              <OrbitControls
                enableZoom={true}
                enablePan={false}
                enableRotate={true}
                maxPolarAngle={Math.PI / 2}
              />
              {selectedModel === "male" ? (
                <MaleModel scale={scale} />
              ) : (
                <FemaleModel />
              )}
            </Canvas>
          </div>
          <div className="model-bottom">
            <label htmlFor="gender">Gender:</label>
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
