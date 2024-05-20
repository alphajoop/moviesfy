import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import WatchList from './components/WatchList';
import Watched from './components/Watched';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<WatchList />} />
          <Route path="/watched" element={<Watched />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
