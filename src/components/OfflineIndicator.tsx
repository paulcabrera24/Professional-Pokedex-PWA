import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

interface OfflineIndicatorProps {
  isOnline: boolean;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOnline }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOnline) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setShow(true);
    }
  }, [isOnline]);

  if (!show) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 p-2 text-white text-center transition-all duration-300 ${isOnline ? 'bg-green-500' : 'bg-yellow-500'}`}>
      {isOnline ? (
        <>
          <Wifi className="inline-block mr-2" size={20} />
          <span>Conexión restablecida</span>
        </>
      ) : (
        <>
          <WifiOff className="inline-block mr-2" size={20} />
          <span>Estás offline. Algunas funciones pueden no estar disponibles.</span>
        </>
      )}
    </div>
  );
};

export default OfflineIndicator;