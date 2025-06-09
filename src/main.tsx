import { StrictMode } from 'react'
import { Toaster } from 'react-hot-toast';

import { createRoot } from 'react-dom/client'
import 'modern-normalize/modern-normalize.css';
import './index.css'
import App from './components/App/App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
    <App />
    <Toaster position="top-center" />
    </QueryClientProvider>
  </StrictMode>,
)
