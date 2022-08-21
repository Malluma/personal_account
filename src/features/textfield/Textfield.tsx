import styles from './Textfield.module.scss';

interface textFieldProps {
  type: string;
}

const Textfield: React.FC<textFieldProps> = function ({type}) {
  return (
    <input type={type} className={styles.textfield}></input>
  );
}

export default Textfield;
