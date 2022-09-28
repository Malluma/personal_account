import styles from './Input.module.scss';
import Mask from 'react-text-mask';

interface inputProps {
  name: string,
  type: string,
  value: string,
  placeholder: string,
  pattern?: string,
  disabled?: boolean,
  mask?: Mask,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<inputProps> = function ({name, type, pattern, value, placeholder, disabled, mask, onChange}) {
  return (
    <input name={name} type={type} pattern={pattern} value={value} className={styles.input} placeholder={placeholder} disabled={disabled} onChange={onChange}></input>
  );
}

export default Input;
