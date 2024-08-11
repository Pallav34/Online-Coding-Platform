
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import CodingPlayground from './pages/CodingPlayground'
import CodingArena from './pages/CodingArena';
import QuestionPage from './pages/Question';
import UploadQuestion from './pages/UploadQuestion';
import CodingBattleground from './pages/CodingBattleGround';
import ContestPage from './pages/ContestPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/coding-playground" element={<CodingPlayground/>} />
        <Route path="/coding-arena" element={<CodingArena />} />
        <Route path="/coding-battleground" element={<CodingBattleground />} />
        <Route path="/question/:id" element={<QuestionPage />} />
        <Route path="/upload" element={<UploadQuestion/>}/>
        <Route path="/codingbattleground/:id" element={<ContestPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
