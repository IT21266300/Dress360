import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const TryonRoom = ({ handleClose, show }: { handleClose: any, show: any }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:4000/api/tryon'); // Change the URL to match your backend endpoint
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError('Error fetching data from the server.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Try Your Clothes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data && (
          <div className="tryon-room">
            {/* Render the data here */}
            <img src={data.imageUrl} alt="3D Model" />
          </div>
        )}
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
