import {useState} from "react";
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles['header']}>
      <div className={styles['header-inner']}>
        <div className={styles['logo']}>FURNITURES</div>
        <nav>
          <ul>
            <li className={styles['li']}>
              <a href='/'>discover</a>
            </li>
            <li className={styles['li']}>
              <a href='/'>products</a>
            </li>
            <li className={styles['li']}>
              <a href='/'>solutions</a>
            </li>
            <li className={styles['li']}>
              <a href='/'>reach</a>
            </li>
            <li className={styles['btn']}>
              <a href='/'>order</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}