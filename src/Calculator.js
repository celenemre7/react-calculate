import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [activeKey, setActiveKey] = useState(null);

  const handleClick = (value) => {
    setDisplay(display + value);
  };

  const calculate = () => {
    try {
      const result = eval(display);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clearDisplay = () => {
    setDisplay('');
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    if (/[0-9+\-*/.]/.test(key)) {
      event.preventDefault();
      handleClick(key);
      setActiveKey(key);
    } else if (key === 'Enter') {
      event.preventDefault();
      calculate();
      setActiveKey('=');
    } else if (key === 'Escape') {
      event.preventDefault();
      clearDisplay();
      setActiveKey('Clear');
    } else if (key === 'Backspace') {
      event.preventDefault();
      setDisplay(display.slice(0, -1));
    }
  };

  const handleKeyUp = () => {
    setActiveKey(null);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [display]);

  const buttonClass = (value) => `calculator-key ${activeKey === value ? 'active' : ''}`;

  return (
    <div className="calculator">
      <input type="text" value={display} readOnly className="display" />
      <div className="keypad">
        <button onClick={() => handleClick('7')} className={buttonClass('7')}>7</button>
        <button onClick={() => handleClick('8')} className={buttonClass('8')}>8</button>
        <button onClick={() => handleClick('9')} className={buttonClass('9')}>9</button>
        <button onClick={() => handleClick('+')} className={buttonClass('+')}>+</button>

        <button onClick={() => handleClick('4')} className={buttonClass('4')}>4</button>
        <button onClick={() => handleClick('5')} className={buttonClass('5')}>5</button>
        <button onClick={() => handleClick('6')} className={buttonClass('6')}>6</button>
        <button onClick={() => handleClick('-')} className={buttonClass('-')}>-</button>

        <button onClick={() => handleClick('1')} className={buttonClass('1')}>1</button>
        <button onClick={() => handleClick('2')} className={buttonClass('2')}>2</button>
        <button onClick={() => handleClick('3')} className={buttonClass('3')}>3</button>
        <button onClick={() => handleClick('*')} className={buttonClass('*')}>*</button>

        <button onClick={() => handleClick('0')} className={buttonClass('0')}>0</button>
        <button onClick={() => handleClick('.')} className={buttonClass('.')}>.</button>
        <button onClick={calculate} className={buttonClass('=')}>=</button>
        <button onClick={() => handleClick('/')} className={buttonClass('/')}>/</button>

        <button onClick={clearDisplay} className={`${buttonClass('Clear')} clear-btn`}>Clear</button>
      </div>
    </div>
  );
};

export default Calculator;