import React from 'react';
import styles from './Button.module.scss';

interface buttonProps {
  type?: 'button' | 'submit' | 'reset',
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  children?: React.ReactNode;
}

const Button: React.FC<buttonProps> = function (props) {

  const { type = 'button', onClick, children } = props;

  return (
    <button className={styles.button} type={type} onClick={onClick}>{children}</button>
  );
}

export default Button;
