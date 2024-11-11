import './bootstrap.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import DocumentViewer from './DocumentViewer.jsx';

function App() {
    return (
        <>
        <DocumentViewer filePath="storage/videos/DTBOxcI0EO26QDAoAK5D1KQ5tPLuMiigWBpwjRoE.docx" />

        </>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}
