import {useState} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route,  Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import { GamePage } from './pages/Game';
import { TopPage } from './pages/Top';
import { Low } from "lowdb";
import { getCurrentKanji} from './utils';
import { ResultPage } from './pages/Result';

import {AppBar, Typography} from '@mui/material';
import Tesseract from 'tesseract.js';

import { Link } from "react-router-dom";



interface Props {
}


function App(props: Props) {
  const [kanji,setKanji] = useState(getCurrentKanji())
  setTimeout((()=>{
    setKanji(getCurrentKanji)
  }),1000*60);
  return (
  <>
    <BrowserRouter>
    <AppBar position="static" style={{padding: 10}}>
      <Link to="/" style={{textDecoration: "none"}}>
        <Typography variant="h5" gutterBottom color={"white"}>
            読める範囲で下手な字を書いた奴が勝ちオフライン
        </Typography>
      </Link>
    </AppBar>
      <Routes>
        <Route path="/" element={<TopPage char={kanji} />}></Route>
        <Route path="/game" element={<GamePage char={kanji} ranking={[]}/>}></Route>
        <Route path="/result" element={<ResultPage />}></Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
