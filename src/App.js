import {
  BrowserRouter as Router,
} from "react-router-dom";
import './App.css';
import Layout from "./routes/layout";
import ScrollToTop from "./components/scroll";
function App() {
  return (
    <Router >
          {/* <ScrollToTop /> */}
      
    <Layout />
  </Router>
  );
}

export default App;
