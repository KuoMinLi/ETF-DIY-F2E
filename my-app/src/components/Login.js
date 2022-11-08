import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          這是登入的網頁
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default Login;