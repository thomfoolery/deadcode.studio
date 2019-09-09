import React, {useEffect, useState, useRef} from 'react';
import {ActionTypes, IAction} from '../../reducers/console';
import styles from './styles.module.css';

interface ConsoleInputProps {
  dispatch(action: IAction): void;
};

const ConsoleInput = React.memo(({dispatch}: ConsoleInputProps) => {
  const inputElement = useRef<HTMLTextAreaElement>(null);

  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const [inputValue, setInputValue] = useState('');

  function handleChange() {
    if (!inputElement || !inputElement.current){ return; }

    setInputValue(inputElement.current.value);
  };

  function handleKeyUp(e: any) {
    if (!inputElement || !inputElement.current){ return; }

    let {selectionStart} = inputElement.current;
    let {selectionEnd} = inputElement.current;
    let {value} = inputElement.current;

    setSelectionStart(selectionStart || 0);
    setSelectionEnd(selectionEnd || 0);
    setInputValue(value || '');

    if (e.type === 'keyup'
      && e.key === 'Enter'
      && !e.metaKey) {
        const {value} = inputElement.current;

        setSelectionStart(0);
        setSelectionEnd(0);
        setInputValue('');

        dispatch({
          type: ActionTypes.AppendCommandToEntries,
          payload: value
        });
    }
  }

  function handleFocus() {
    if (!inputElement || !inputElement.current){ return; }

    inputElement.current.focus();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleFocus);
    return () => document.removeEventListener('keydown', handleFocus);
  }, []);

  const start = selectionStart
  const end = selectionStart === selectionEnd ? selectionEnd + 1 : selectionEnd;
  const value = end >= inputValue.length -1 ? inputValue + ' ' : inputValue;

  const a = value.substr(0,start);
  const b = value.substr(start, end-start);
  const c = value.substr(end);

  return (
    <div className={styles.ConsoleInput}>
      <textarea
        autoFocus
        value={inputValue}
        ref={inputElement}
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
    </div>
  )
});

export default ConsoleInput;
