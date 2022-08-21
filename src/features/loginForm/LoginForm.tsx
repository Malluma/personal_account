import styles from './LoginForm.module.scss';
import Textfield from '../textfield/Textfield';

function LoginForm() {

  function submitLogin(){

  }

  return (
    <form className={styles.loginForm} onSubmit={submitLogin}>
      <h2 className={styles.title}>Войти</h2>
      <div className={styles.username}>
        <Textfield type='username'></Textfield>
      </div>
      <Textfield type='password'></Textfield>
    </form>
  );
}

export default LoginForm
