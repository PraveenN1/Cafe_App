import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CoffeeDetails from "./pages/CoffeeDetails";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollTop";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
const LazyMenu = React.lazy(() => import("./pages/Menu"));

function App() {
  const location = useLocation();

  // Routes that do not require the Layout component
  const noLayoutRoutes = ["/login", "/signup"];

  return (
    <div>
      <ScrollToTop />
      {/* Conditionally wrap routes with Layout */}
      {noLayoutRoutes.includes(location.pathname) ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="menu"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <LazyMenu />
                </React.Suspense>
              }
            />
            <Route path="coffee-details" element={<CoffeeDetails />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Routes>
        </Layout>
      )}
    </div>
  );
}

export default App;
