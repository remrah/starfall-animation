import { useState } from 'react';
import WarpAnimation from './WarpAnimation';

function App() {
  const [showWarp, setShowWarp] = useState(true);

  const handleClose = () => {
    console.log('Button clicked!');
    setShowWarp(false);
  };

  return (
    <>
      {showWarp && <WarpAnimation onClose={handleClose} />}
      {!showWarp && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: '#000',
          color: '#fff',
          fontFamily: 'monospace'
        }}>
          <h1>Journey Started!</h1>
        </div>
      )}
    </>
  );
}

export default App;