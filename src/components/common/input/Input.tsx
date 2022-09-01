import styles from './Input.module.scss';

interface inputProps {
  name: string,
  type: string,
  value: string,
  placeholder: string,
  pattern?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<inputProps> = function ({name, type, pattern, value, placeholder, onChange}) {
  return (
    <input name={name} type={type} pattern={pattern} value={value} className={styles.input} placeholder={placeholder} onChange={onChange}></input>
  );
}

export default Input;
