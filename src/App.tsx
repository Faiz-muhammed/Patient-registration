import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { PgliteProvider } from './context/pgliteContext';

function App() {
  return (
    <PgliteProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </PgliteProvider>
  );
}

export default App;