import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          這是註冊的網頁
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default Register;