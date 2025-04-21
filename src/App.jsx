import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import PdfDataTable from './PdfDataTable';
import Faq from './Faq';

export default function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/start' element={<PdfDataTable/>} />
                <Route path='/faq' element={<Faq/>} />
            </Routes>
        </>
    );
}