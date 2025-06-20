// src/components/Header/Header.tsx
import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';

interface HeaderProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onAddButtonClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ inputValue, onInputChange, onInputKeyDown, onAddButtonClick }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  }

  return (
    <header className="header-container">
      <h1 className="header-title jersey-20">
        My Next Dream{' '}
        <motion.span
          className="concert-word"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }} // Aumenta e gira um pouco
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Concert
        </motion.span>
      </h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="What is the next concert you will be attending?"
          className="header-input jersey-25"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={onInputKeyDown}
        />
        <button
          onClick={onAddButtonClick}
          className="add-concert-button jersey-25"
        >
          Add Concert
        </button>
      </div>
    </header>
  );
};

export default Header;