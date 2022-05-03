import './App.scss';
import React from 'react'
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import { TeamPage } from './pages/TeamPage';
import { MatchPage } from './pages/MatchPage'
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Routes>
          <Route path="/team/:teamName" element={<TeamPage/>}/>
          <Route path="/team/:teamName/matches/:year" element={<MatchPage/>}/>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
