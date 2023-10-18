import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import Layout from "./components/MainLayout";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/reset-password" element={<Resetpassword />}></Route>
        <Route path="/forgot-password" element={<Forgotpassword />}></Route>
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
