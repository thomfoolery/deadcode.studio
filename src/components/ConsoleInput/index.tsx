import React, {useEffect, useState, useRef} from 'react';
import {ConsoleEntryTypes} from '../../reducers/console';

import ConsoleLine from '../ConsoleLine';

import styles from './styles.module.css';

interface ConsoleInputProps {
  next(cmd: string): void;
  isConsoleFocused: boolean;
};

const ConsoleInput = React.memo(({ next, isConsoleFocused }: ConsoleInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const [inputValue, setInputValue] = useState('');

  function handleChange() {
    if (inputRef.current) {
      setInputValue(inputRef.current.value);
    }
  };

  function handleKeyUp(e: any) {
    if (!inputRef || !inputRef.current){ return; }

    let {
      selectionStart,
      selectionEnd,
      value
    } = inputRef.current;

    setSelectionStart(selectionStart || 0);
    setSelectionEnd(selectionEnd || 0);
    setInputValue(value || '');

    if (e.type === 'keyup'
      && e.key === 'Enter'
      && !e.metaKey) {

      next(inputRef.current.value.trim());
      setSelectionStart(0);
      setSelectionEnd(0);
      setInputValue('');
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleFocus);
    return () => document.removeEventListener('keydown', handleFocus);
    function handleFocus() {
      if (isConsoleFocused && inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isConsoleFocused]);

  const start = selectionStart
  const end = selectionStart === selectionEnd ? selectionEnd + 1 : selectionEnd;
  const value = end >= inputValue.length -1 ? inputValue + ' ' : inputValue;

  const a = value.substr(0,start);
  const b = value.substr(start, end-start);
  const c = value.substr(end);

  return (
    <div className={styles.ConsoleInput}>
      <ConsoleLine
        options={{color: 'white'}}
        type={ConsoleEntryTypes.Command}
      >
        <textarea
          autoFocus
          ref={inputRef}
          spellCheck={false}
          value={inputValue}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyUp}
          onChange={handleChange}
          className={styles.ConsoleInputTextArea}
        />
        <div className={styles.ConsoleInputFacade}>
          <span>{a}</span>
          <span className={styles.ConsoleInputCursor}>{b}</span>
          <span>{c}</span>
        </div>
      </ConsoleLine>
    </div>
  )
});

export default ConsoleInput;
