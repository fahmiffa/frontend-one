import React, { useEffect, useState } from 'react';

const Sockets: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  // const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    connecting();
  }, []);

  const connecting = async () => {
    // Create WebSocket connection
    const socket = new WebSocket('ws://localhost:3000');

    // Set WebSocket instance
    // setWs(socket);

    // Connection opened
    socket.addEventListener('open', () => {
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      if (event.data instanceof Blob) {
        handleBlobData(event.data);
      }
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });

    socket.addEventListener('error', (error) => {
      console.log(error);
    });

    return () => {
      // socket.close();
    };
  };

  const handleBlobData = async (blob: Blob) => {
    const text = await blob.text();
    const da = JSON.parse(text);
    setMessage(da.data);
  };
  return (
    <div className="container my-5">
      <h6 className='text-center'>Timer : {message}</h6>
    </div>
  );
};

export default Sockets;
