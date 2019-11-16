import React, { useEffect, useContext } from 'react';

import { GameActionTypes} from '../../reducers';
import { GameState } from '../../reducers/game';
import { GameControllerContext } from '../GameController';

import styles from './styles.module.css';

function GameTitle() {
  const { next, dispatch } = useContext(GameControllerContext);

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
    function handleKeyPress() {
      dispatch({
        type: GameActionTypes.SetGameState,
        payload: GameState.GamePlaying,
      });
      next();
    }
  }, []);

  return (
    <div className={styles.GameTitle}>
      <div>DEAD</div>
      <div>CODE</div>
      <small>Press ENTER</small>
    </div>
  )
}

export default React.memo(GameTitle);
