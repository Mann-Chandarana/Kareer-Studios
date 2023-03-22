import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import Footer from './components/Footer';
import Layout from './Layout';
import SessionContext from './contexts/SessionContext';
import { useSession } from './hooks/useSession';
import Login from './pages/Login';

function App() {

  const session = useSession();

  const [toShow, setToShow] = useState(true);

  if (session.status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (session.status === 'unauthorized') {
    return <Login />;
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
