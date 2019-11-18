import React, { useState, useEffect, useContext } from 'react';
import { ConsoleActionTypes } from '../../reducers';
import { GameContext } from '../../contexts/game';

import styles from './styles.module.css';

function DevTools() {
  const { next, dispatch, storyEngine } = useContext(GameContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
    function handleKeyDown(e: KeyboardEvent) {
      if (e.altKey && e.keyCode === 68) {
        setIsOpen(!isOpen);
        e.preventDefault();
      }
    }
  }, [isOpen]);

  const handleClickBookmark = () => {
    const bookmarks: any = JSON.parse(localStorage.getItem('game-state') || '[]') ;
    bookmarks.push(storyEngine.state.toJson());
  }

  const handleClickRestart = () => {
    dispatch({ type: ConsoleActionTypes.Reset });
    storyEngine.ResetState();
    next();
  }

  return isOpen ? (
    <div className={styles.DevTools}>

      <header>
        <div className={styles.DevToolsTitle}>
          Dev Tools
        </div>
        <div className={styles.DevToolsButtons}>
          <button
            type="button"
            onClick={handleClickBookmark}>
            Bookmark
          </button>
          <button
            type="button"
            onClick={handleClickRestart}
          >
            Restart
          </button>
        </div>
      </header>

      <div>
        <pre>
          <code>
            {/* { JSON.stringify(JSON.parse(storyEngine.state.toJson()), null, 2) } */}
            {/* { JSON.stringify(state, null, 2) } */}
          </code>
        </pre>
      </div>

    </div>
  ) :
  null
}

export default DevTools;
