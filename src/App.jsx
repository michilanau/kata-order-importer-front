import './App.css'
import React, { useState } from 'react';

function App (){

  const [importedData, setImportedData] = useState(null);

  const handleImport = async () => {
    try {
      const response = await fetch('http://localhost:8080/orders/import', {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setImportedData(data);
      } else {
        console.error('Error en la solicitud', response.status);
      }
    } catch (error) {
      console.error('Error de red', error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:8080/orders/download', {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'orders.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Error en la solicitud', response.status);
      }
    } catch (error) {
      console.error('Error de red', error);
    }
  };

  return (
    <div>
      <button onClick={handleImport}>Import</button>
      <button onClick={handleDownload}>Download</button>

      {importedData && (
        <div>
          <h2>Total Importado: {importedData.totalImported}</h2>

          <h3>Tipos de Artículos:</h3>
          <ul style={{ overflowX: 'auto', whiteSpace: 'nowrap', display: 'inline-block' }}>
            {Object.entries(importedData.itemTypes).map(([type, count]) => (
              <li key={type} style={{ marginRight: '10px' }}>{`${type}: ${count}`}</li>
            ))}
          </ul>

          <h3>Canales de Venta:</h3>
          <ul style={{ overflowX: 'auto', whiteSpace: 'nowrap', display: 'inline-block' }}>
            {Object.entries(importedData.salesChannel).map(([channel, count]) => (
              <li key={channel} style={{ marginRight: '10px' }}>{`${channel}: ${count}`}</li>
            ))}
          </ul>

          <h3>Prioridades:</h3>
          <ul style={{ overflowX: 'auto', whiteSpace: 'nowrap', display: 'inline-block' }}>
            {Object.entries(importedData.priority).map(([priority, count]) => (
              <li key={priority} style={{ marginRight: '10px' }}>{`${priority}: ${count}`}</li>
            ))}
          </ul>

          <h3>Países:</h3>
          <ul style={{ overflowX: 'auto', whiteSpace: 'nowrap', display: 'inline-block' }}>
            {Object.entries(importedData.country).map(([country, count]) => (
              <li key={country} style={{ marginRight: '10px' }}>{`${country}: ${count}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App
