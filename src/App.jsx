import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

import Home from './Home';
import PdfDataTable from './PdfDataTable';
import WhatsNew from './WhatsNew';
import Faq from './Faq';

export default function App() {

    const location = useLocation();

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.href });
    }, [location]);

    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/start' element={<PdfDataTable/>} />
                <Route path='/whats-new' element={<WhatsNew/>} />
                <Route path='/faq' element={<Faq/>} />
            </Routes>
        </>
    );
}