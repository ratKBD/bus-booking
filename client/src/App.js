import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./components/login/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/login/RegisterForm";
import Login from "./components/login/Login";
import { useAuth } from "./contexts/AuthContext";
import Booking from "./components/booking/Booking";
import SelectBus from "./components/booking/SelectBus";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Router>
        {/* <Header /> */}
        <div>
          <Routes>
            <Route path="/" element={<LoginForm />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<RegisterForm />}></Route>
            <Route path="/booking" element={<SelectBus />}></Route>
            <Route path="/booking/:id" element={<Booking />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
