import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <main>
        <h2>網址出錯了~請確認網址</h2>
      </main>
      <nav>
        <Link to="/">回到首頁</Link>
      </nav>
    </>
  );
}

export default NotFound;