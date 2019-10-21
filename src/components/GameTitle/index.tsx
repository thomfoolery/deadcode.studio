import React, { useEffect, useContext } from 'react';
import { ConsoleContext } from '../Game';
import styles from './styles.module.css';

interface IProps {
  next(): void;
}

function GameTitle({ next }: IProps) {
  const { setIsConsoleEnabled } = useContext(ConsoleContext);
  useEffect(() => {
    setTimeout(() => { setIsConsoleEnabled(true); }, 8 * 1000);
    setTimeout(() => { next(); }, 13 * 1000);
  }, []);

  return (
    <div className={styles.GameTitle}>
      <div>DEAD</div>
      <div>CODE</div>
    </div>
  )
}

export default GameTitle;
