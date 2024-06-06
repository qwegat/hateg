import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import { GamePage } from './pages/Game';
import { Low } from "lowdb";
import { DbSchema, } from './utils';


interface Props {
  //db: Low<DbSchema>
}

function App(props: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GamePage char="猫" ranking={[]}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
