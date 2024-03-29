import React, { useEffect, useState, Suspense, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Canvas } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'; // Import OBJLoader
import { OrbitControls } from '@react-three/drei';
import './TryonRoom.css';

const TryonRoom = ({ handleClose, show }: { handleClose: any, show: any }) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const mesh = useRef<any>(null); // Ref for the loaded mesh

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetch('/api/tryon'); // Fetch 3D model from backend API
        const data = await response.json();
        
        const loader = new OBJLoader(); // Use OBJLoader to load OBJ files
        loader.load(data.path, (loadedMesh) => {
          mesh.current = loadedMesh;
          console.log(mesh.current); 
          setModelLoaded(true);
        });
      } catch (error) {
        console.error('Error fetching 3D model:', error);
      }
    };

    fetchModel();
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Try Your Clothes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="tryon-room">
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {modelLoaded && (
              <Suspense fallback={null}>
                <primitive object={mesh.current} />
              </Suspense>
            )}
            <OrbitControls />
          </Canvas>
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
