import React, { useState } from 'react';

function App() {

  const [loading, setLoading] = useState(false);
  const [importedData, setImportedData] = useState(null);

  const handleImport = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:8080/orders/import', {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setImportedData(data);
      } else {
        console.error('Request error', response.status);
      }
    } catch (error) {
      console.error('Red error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setLoading(true);

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
        console.error('Request error', response.status);
      }
    } catch (error) {
      console.error('Red error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={handleImport}>Import</button>
      <button onClick={handleDownload}>Download</button>

      {loading && (
        <div>
          <p>This may take a few minutes...</p>
          <div>Loading...</div>
        </div>
      )}

      {importedData && (
        <div>
          <div className="total-imported">{`Total Importado: ${importedData.totalImported}`}</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {Object.entries(importedData).map(([category, data]) => (
              category !== 'totalImported' && (
                <div key={category} style={{ margin: '20px', textAlign: 'center' }}>
                  <h2>{category}</h2>
                  <ul>
                    {Object.entries(data).map(([key, value]) => (
                      <li key={key}>{`${key}: ${value}`}</li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App
