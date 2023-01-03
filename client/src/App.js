import {
  Routes as Switch,
  Route,
  Router,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
const App = () => {
  return (
    <BrowserRouter>
    <ToastContextProvider>
    <AuthContextProvider>
          <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
      </AuthContextProvider>
      </ToastContextProvider>
      
    </BrowserRouter>
  );
};

export default App;
