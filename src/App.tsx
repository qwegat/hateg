import {useState} from 'react';
import { Route,  Routes, HashRouter } from 'react-router-dom';
import './App.css';
import { GamePage } from './pages/Game';
import { TopPage } from './pages/Top';
import { getCurrentKanji} from './utils';
import { ResultPage } from './pages/Result';

import {AppBar, Typography} from '@mui/material';

import { Link } from "react-router-dom";
import { RankingPage } from './pages/Ranking';



interface Props {
}


function App(props: Props) {
  const [kanji,setKanji] = useState(getCurrentKanji())
  const refreshKanji = () => {
    setKanji(getCurrentKanji())
  }
  return (
  <>
    <HashRouter>
    <AppBar position="static" style={{padding: 10}}>
      <Link to="/" style={{textDecoration: "none"}}>
        <Typography variant="h5" gutterBottom color={"white"}>
            AIに読める範囲でもっとも下手な字を書いた奴が勝ちオフライン
        </Typography>
      </Link>
    </AppBar>
    <Link to="/">トップに戻る</Link>
      <Routes>
        <Route path="/" element={<TopPage char={kanji} setKanjiFunc={refreshKanji} />}></Route>
        <Route path="/game" element={<GamePage char={kanji} ranking={[]}/>}></Route>
        <Route path="/result" element={<ResultPage />}></Route>
        <Route path="/ranking" element={<RankingPage char={kanji} />}></Route>
      </Routes>
    </HashRouter>
  </>
  );
}

export default App;
