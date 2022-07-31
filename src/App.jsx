import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/form/Form";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form/:id" element={<Form />} />
        <Route path="/login/:id" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
