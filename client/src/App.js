import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo, useContext, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import Login from "./scenes/login";
import Signup from "./scenes/signup";
import {AuthContext,AuthProvider} from "./state/AuthContext";
import {ThemeContext,ThemeProvider1} from "./state/ThemeContext";

function App() {
  const authContext = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);
  const theme = useMemo(() => createTheme(themeSettings(themeContext.mode)), [themeContext.mode]);
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => setCurrentForm(formName);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="container">
      {authContext.auth.email ? 
      <div className="App">
        <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route exact path="/products" element={<Products />} />
                <Route exact path="/customers" element={<Customers />} />
                <Route exact path="/transactions" element={<Transactions />} />
                <Route exact path="/geography" element={<Geography />} />
                <Route exact path="/overview" element={<Overview />} />
                <Route exact path="/daily" element={<Daily />} />
                <Route exact path="/monthly" element={<Monthly />} />
                <Route exact path="/breakdown" element={<Breakdown />} />
                <Route exact path="/admin" element={<Admin />} />
                <Route exact path="/performance" element={<Performance />} />
              </Route>
            </Routes>
        </BrowserRouter>
      </div>
      : currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Signup onFormSwitch={toggleForm} />
      }
      </div>
    </ThemeProvider>
  );
}

function AppWithStore(){
  return (
  <ThemeProvider1>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider1>
  );
}

export default AppWithStore;

