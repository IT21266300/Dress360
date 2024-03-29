import React from 'react';
import { Modal, Button } from 'react-bootstrap';
// import close_icon from '../../assets/close.png';
import './TryonRoom.css';

const TryonRoom = ({ handleClose, show }: { handleClose: any, show: any }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Try Your Clothes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="tryon-room">
          <div className="3d-model">
            <div className="3d-model-left"></div>
            <div className="3d-model-right"></div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TryonRoom;
