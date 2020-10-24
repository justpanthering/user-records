import React from 'react';
import Styles from './TableHeading.module.css';


const tableHeading = (props) => {
  const iconClass = ["fa fa-sort", Styles.Icon].join(" ");
  return (
    <div
      className={Styles.TableHeading}>
      <span>
        {props.children}
      </span>
      <i className={iconClass}
        aria-hidden="true"></i>
    </div>
  )
}

export default tableHeading;