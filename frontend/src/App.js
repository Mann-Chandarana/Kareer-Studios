import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer";
import Layout from "./Layout";
import SessionContext from "./contexts/SessionContext";
import { useSession } from "./hooks/useSession";
import Login from "./pages/Login";
import { Payment } from "./pages/Payment";
import Login2 from "./pages/Login2";
import Register1 from "./pages/Register1";
import { ToastContainer } from "react-toastify";

function App() {
  const session = useSession();

  const [toShow, setToShow] = useState(true);

  if (session.status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (session.status === "unauthorized") {
    return (
      <Router>
        <Routes>
          <Route path="/link/register/:id" element={<Register1 />} />
          <Route path="*" element={<Login2 />} />
        </Routes>
      </Router>
    );
  }

  if (
    session.status === "authorized" &&
    session.user.role === "student" &&
    !session.user.paid
  ) {
    return (
      <Router>
        <Payment
          user={session.user}
          renewUser={session.renewUser}
          logout={session.logout}
        />
      </Router>
    );
  }

  return (
    <>
      <ToastContainer />
      <SessionContext.Provider value={session}>
        <Router>
          <div className={toShow ? "" : "toggle-sidebar"}>
            <Navbar setToShow={setToShow} />
            <Layout />
            <Footer />
          </div>
        </Router>
      </SessionContext.Provider>
    </>
  );
}

export default App;
