import React from 'react';
import styles from './App.module.scss';
import { Chat } from './pages';

function App() {
  return <div className={styles.app}>
    <Chat />
  </div>
}

export default App
