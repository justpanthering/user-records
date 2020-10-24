import React from 'react';
import { Link } from 'react-router-dom'

// Style
import Styles from './Toolbar.module.css';

const toolbar = () => {
  return (
    <div className={Styles.Toolbar}>
      <h2 className={Styles.Logo}>User Records</h2>
    </div>
  )
}

export default toolbar;