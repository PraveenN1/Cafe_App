import React from "react";
import { Route, Routes } from "react-router-dom";
import CoffeeDetails from "./pages/CoffeeDetails";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollTop";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import About from "./pages/About";
// import { About } from "./pages/About";
const LazyMenu = React.lazy(() => import("./pages/Menu"));
function App() {
  return (
    <div>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="menu"
            element={
              <React.Suspense fallback="Loading...">
                <LazyMenu />
              </React.Suspense>
            }
          />
          <Route path="coffee-details" element={<CoffeeDetails />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
