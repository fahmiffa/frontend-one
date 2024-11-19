import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.tsx'
import Kelas from './components/Kelas.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavbarComponent from './components/navBar.tsx';
import Gelanggang from './components/Gelanggang.tsx';
import Peserta from './components/Peserta.tsx';
import Device from './components/Device.tsx';
import Head from './components/Head.tsx';
import Liga from './components/Liga.tsx';
import Diagram from './components/Bracket.tsx';
import { Provider } from 'react-redux';
import store from './redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <StrictMode>
        <Router>
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/match-league" element={<Head />} />
            <Route path="/liga" element={<Liga />} />
            <Route path="/kelas" element={<Kelas />} />
            <Route path="/gelanggang" element={<Gelanggang />} />
            <Route path="/peserta" element={<Peserta />} />
            <Route path="/device" element={<Device />} />
            <Route path="/diagram" element={<Diagram />} />
          </Routes>
        </Router>
      </StrictMode>,
    </Provider>
  </QueryClientProvider>
)
