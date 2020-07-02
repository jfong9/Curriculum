import React from 'react'
import styles from './DropdownMenu.module.css'

export function DropdownMenu(props) {
    let dropdownClass = `${styles.dropdown} ${props.className}`;
    return (
        <div className={dropdownClass}>
            {props.children}
        </div>
    )
}
export function DropdownItem(props) {
        return (
          <a href="#" className={styles.menuItem}>
              <span className={styles.iconButton}>{props.leftIcon}</span>
              {props.children}
              <span className={styles.iconRight}>{props.rightIcon}</span>
          </a>  
        );
    }
