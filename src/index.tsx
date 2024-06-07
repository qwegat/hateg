import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { DbSchema } from './utils';
import Tesseract from 'tesseract.js';

// データベースのスキーマを定義


// JSONファイルを使ったアダプタの作成
/*
const adapter = new JSONFile<DbSchema>('db.json');
const db = new Low<DbSchema>(adapter,  {results: []});
*/



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
