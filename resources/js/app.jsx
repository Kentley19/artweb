import './bootstrap';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {Main} from './index.jsx';
import Icon from './assets/img-art-3-removebg-preview-1.png';
import { isComputerDevice } from './components/isComputerDevice.jsx';
function App() {
    const iconComponent=document.getElementById('icon');
  const isPC = isComputerDevice();
useEffect(()=>{
    
  iconComponent.href=Icon;
},[])
    return (
        <>
        <Main></Main>
        </>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}
