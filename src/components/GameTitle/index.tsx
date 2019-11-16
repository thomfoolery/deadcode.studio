import React, { useEffect, useContext } from 'react';
import { GameControllerContext } from '../GameController';
import styles from './styles.module.css';

interface IProps {}

function GameTitle({}: IProps) {
  const { next, setIsConsoleEnabled, } = useContext(GameControllerContext);

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
    function handleKeyPress(e) {
      if (e.key === 'Enter') {
        next();
        setIsConsoleEnabled(true);
      }
    }
  }, [next, setIsConsoleEnabled]);

  return (
    <div className={styles.GameTitle}>
      <div>DEAD</div>
      <div>CODE</div>
    </div>
  )
}

export default React.memo(GameTitle);
