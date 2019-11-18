import React, { useRef, useEffect, useState, useContext } from 'react';
import { ConsoleEntryTypes, IConsoleChoice } from '../../reducers/console';
import { GameContext } from '../../contexts/game';

import ConsoleLine from '../ConsoleLine';

import styles from './styles.module.css';

interface IProp {
  consoleChoices: IConsoleChoice[];
}

function cleanChoiceContent(text: string = '') {
  if (text.includes(':')) {
    const parts: string[] = text.split(':');
    return parts[parts.length - 1].trim();
  }
  return text.trim();
}

function ConsoleChoices({ consoleChoices }: IProp) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { next } = useContext(GameContext);

  const handleInputChange = (index: number) => () => {
    setSelectedIndex(index);
  }

  useEffect(() => {
    document.addEventListener('keydown', handleFocus);
    return () => document.removeEventListener('keydown', handleFocus);
    function handleFocus() {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, []);

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const { index } = consoleChoices[selectedIndex];

      next(index);
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      const newIndex = selectedIndex === 0 ?
        consoleChoices.length - 1 :
        selectedIndex - 1;

      setSelectedIndex(newIndex);
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      const newIndex = selectedIndex <  consoleChoices.length - 1 ?
        selectedIndex + 1 :
        0;

      setSelectedIndex(newIndex);
    }
  }

  return (
    <div className={styles.container}>
      <input
        autoFocus
        type="text"
        ref={inputRef}
        onKeyUp={handleKeyUp}
        className={styles.hiddenInput}
      />
      {
        consoleChoices.map(({ text, index }: any) => (
          <label
            key={`${index}-${text}`}
            className={styles.ConsoleChoiceRadio}
          >
            <input
              autoFocus
              type="radio"
              name="choice"
              checked={index === selectedIndex}
              className={styles.hiddenInput}
              onChange={handleInputChange(index)}
            />
              <ConsoleLine
                options={{ color: 'white' }}
                type={index === selectedIndex ? ConsoleEntryTypes.Command : ConsoleEntryTypes.Output}
              >
                {cleanChoiceContent(text)}
              </ConsoleLine>
            </label>
        ))
      }
    </div>
  )
}

export default ConsoleChoices;
