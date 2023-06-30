import Navbar from './components/Navbar';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import Footer from './components/Footer';
import Layout from './Layout';
import SessionContext from './contexts/SessionContext';
import { useSession } from './hooks/useSession';
import { Payment } from './pages/Payment';
import Login from './pages/Login';
import Register from './pages/Register';
import PaymentVerify from './pages/PaymentVerify';
import Loading from './pages/Loading';

function App() {
    const session = useSession();
    const [toShow, setToShow] = useState(true);

    if (session.status === 'loading') {
        return <Loading />;
    }

    if (window.location.pathname === '/payment/verify') {
        return (
            <Router>
                <PaymentVerify />
            </Router>
        );
    }

    if (session.status === 'unauthorized') {
        return (
            <Router>
                <Routes>
                    <Route path='/link/register/:id' element={<Register />} />
                    <Route path='*' element={<Login />} />
                </Routes>
            </Router>
        );
    }

    if (session.status === 'authorized' && session.user.role === 'student' && !session.user.paid) {
        return (
            <Router>
                <Payment user={session.user} renewUser={session.renewUser} logout={session.logout} />
            </Router>
        );
    }

    return (
        <SessionContext.Provider value={session}>
            <Router>
                <div className={toShow ? '' : 'toggle-sidebar'}>
                    <Navbar setToShow={setToShow} />
                    <Layout />
                    <Footer />
                </div>
            </Router>
        </SessionContext.Provider>
    );
}

export default App;
