import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import { Model as MaleModel } from "./Male";
import './TryonRoom.css';

const TryonRoom = ({ handleClose, show }: { handleClose: any; show: any }) => {
  const scale: [number, number, number] = [0.26, 0.26, 0.26]; // Adjust the scale factor for x, y, and z axes.
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Try Your Clothes</Modal.Title>
      </Modal.Header>
      <Modal.Body className="tryon-room-body">
        <div className="tryon-room">
          <div className="model-top">
            <Canvas className='top-canva' camera={{ fov: 100, position: [0, 0, 3] }}>
              <ambientLight intensity={5} />
              <OrbitControls enableZoom={true} enablePan={false} enableRotate={true} maxPolarAngle={Math.PI / 2} />
              <MaleModel scale={scale} />
            </Canvas>
          </div>
          <div className="model-bottom"></div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TryonRoom;
