import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from './components/NotFound';
import Layout from './components/Layout';
import ETFBlank from './components/ETFBlank';
import ETFIndex from "./components/ETFIndex";
import Register from "./components/Register";
import Login from "./components/Login";
import ETFIItem from "./components/ETFItem";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="etfindex" element={<ETFIndex />} >
            <Route index element={<ETFBlank />}/>
            <Route path=":userId" element={<ETFIItem />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
