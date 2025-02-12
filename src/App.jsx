import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-white p-6">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>

      {/* 
      Theme Test */}
      {/* <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-bold text-primary">Slack App Theme</h1>
        <p className="text-secondary">This is your custom DaisyUI theme!</p>
        <button className="btn btn-primary mt-4">Primary Button</button>
        <button className="btn btn-secondary mt-4">Secondary Button</button>
        <button className="btn btn-accent mt-4">Accent Button</button>
        <button className="btn btn-info mt-4">Info Button</button>
        <button className="btn btn-success mt-4">Success Button</button>
        <button className="btn btn-warning mt-4">Warning Button</button>
        <button className="btn btn-error mt-4">Error Button</button>
      </div> */}
    </div>
  );
}

export default App;
