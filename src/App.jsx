import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import PdfTables from './PdfTables';
import Faq from './Faq';

export default function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/start' element={<PdfTables/>} />
                <Route path='/faq' element={<Faq/>} />
            </Routes>
        </>
    );
}