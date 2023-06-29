import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/logo.module.css';

function Logo() {
    return (
        <Link to="/" className="logo d-flex align-items-center">
            <div className={styles['logo']}>
                <h1 className={styles['karrer']}>KAREER</h1>
                <h1 className={styles['studio']}>
                    St<font style={{ color: '#f57200' }}>u</font>dio
                </h1>
            </div>
        </Link>
    );
}

export default Logo;
