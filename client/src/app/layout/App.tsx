import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import About from "../../features/about/About";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import Contact from "../../features/contact/Contact";
import { HomePage } from "../../features/home/HomePage";
import Header from "./Header";

function App() {
  const [darkmode, setDarkmode] = useState(false);
  const dark = darkmode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: dark,
      background: { default: dark === 'light' ? "#eaeaea" : "#121212" }
    }
  })
  const thsetter = () => setDarkmode(!darkmode)
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkmode} themeSetter={thsetter} />
      <Container>
        <Routes>
          <Route  path="/" element={<HomePage />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:id" element={<ProductDetails />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
