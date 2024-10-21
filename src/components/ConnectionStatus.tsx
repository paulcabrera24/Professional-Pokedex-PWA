import React from 'react';

interface ConnectionStatusProps {
  isOnline: boolean;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isOnline }) => {
  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-r-md shadow-md">
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm font-medium">{isOnline ? 'Conectado' : 'Desconectado'}</span>
      </div>
    </div>
  );
};

export default ConnectionStatus;