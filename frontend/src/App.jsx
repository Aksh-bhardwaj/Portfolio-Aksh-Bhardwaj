import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortfolioSite from './components/PortfolioSite';
import AdminBlog from './components/AdminBlog';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/studio" element={<AdminBlog />} />
                <Route path="/*" element={<PortfolioSite />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
