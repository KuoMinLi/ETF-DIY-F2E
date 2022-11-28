import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from './components/NotFound';
import Layout from './components/Layout';
import ETFBlank from './components/ETFBlank';
import ETFIndex from "./components/ETFIndex";
import Register from "./components/Register";
import Login from "./components/Login";
import ETFIItem from "./components/ETFItem";
import Compare from "./components/Compare";
import ETFDiy from "./components/ETFDiy";
import UserInfo from "./components/UserInfo";
import { Provider } from "react-redux";
import store from "./store";



function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="userinfo" element={<UserInfo />} />
            <Route path="*" element={<NotFound />} />
            <Route path="etfindex" element={<ETFIndex />} >
              <Route index element={<ETFBlank />}/>
              <Route path=":userId" element={<ETFIItem />} />
            </Route>
            <Route path="etfdiy" element={<ETFDiy />} />
            <Route path="compare" element={<Compare />} />
          </Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
