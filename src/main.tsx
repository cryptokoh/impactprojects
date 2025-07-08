import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DiscoveredProjectsProvider } from './contexts/DiscoveredProjectsContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DiscoveredProjectsProvider>
      <App />
    </DiscoveredProjectsProvider>
  </StrictMode>
);