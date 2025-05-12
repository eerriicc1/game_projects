// src/games/reversi/NavigationControls.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default function NavigationControls({ onStart, onPrev, onNext, onEnd, disableStart, disablePrev, disableNext, disableEnd }) {
  return (
    <div className="navigation-controls">
      <button className="nav-btn" onClick={onStart} disabled={disableStart}>|&lt;</button>
      <button className="nav-btn" onClick={onPrev} disabled={disablePrev}>&lt;</button>
      <button className="nav-btn" onClick={onNext} disabled={disableNext}>&gt;</button>
      <button className="nav-btn" onClick={onEnd} disabled={disableEnd}>&gt;|</button>
    </div>
  );
}

NavigationControls.propTypes = {
  onStart: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
  disableStart: PropTypes.bool.isRequired,
  disablePrev: PropTypes.bool.isRequired,
  disableNext: PropTypes.bool.isRequired,
  disableEnd: PropTypes.bool.isRequired,
};
