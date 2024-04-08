import {
  BrowserRouter as Router,
} from "react-router-dom";
import './App.css';
import Layout from "./routes/layout";
function App() {
  return (
    <Router>
    <Layout />
  </Router>
  );
}

export default App;
