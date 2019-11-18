import React, { useEffect, useContext } from 'react';
import { GameContext } from '../../contexts/game';
import { GameActionTypes } from '../../reducers';

import styles from './styles.module.css';

function GameTitle() {
  const { next, dispatch, debug = false } = useContext(GameContext);

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
    function handleKeyPress() {
      if (!debug) { setTimeout(next, 2000); }
      dispatch({ type: GameActionTypes.Start });
    }
  }, []);

  return (
    <div className={styles.GameTitle}>
      <div>DEAD</div>
      <div>CODE</div>
      <small>
        to begin<br/>
        press <span>ENTER</span>
      </small>
    </div>
  )
}

export default React.memo(GameTitle);
