import React from 'react';
import './styles.css';

const App: React.FC = () => {
  return (
    <div className="content">
      <h1>Hi, I'm Tyler Woodfin.</h1>
      <ul className="links">
        <li><a href="#">about</a></li>
        <li><a href="#">latest stuff</a></li>
        <li><a href="#">older stuff</a></li>
        <li><a href="#">github</a></li>
        <li><a href="#">linkedin</a></li>
        <li><a href="#">reach out</a></li>
      </ul>
    </div>
  );
}

export default App;
