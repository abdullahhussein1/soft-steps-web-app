import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ThemeProvider from "@/components/ThemeProvider";
import { DarkModeProvider } from "./context/DarkModeProvider";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="blue">
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthenticationPage />} />
          <Route
            path="/"
            element={
              <DarkModeProvider>
                <HomePage />
              </DarkModeProvider>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
