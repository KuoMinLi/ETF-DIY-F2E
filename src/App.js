import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from './components/NotFound';
import Layout from './components/Layout';
import ETFListView from './components/ETFListView';
import Register from "./components/Register";
import Login from "./components/Login";
import ETFItem from "./components/ETFItem";
import Compare from "./components/Compare";
import AddDiyETF from "./components/DIY/AddDiyETF";
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
            <Route path=":category" element={<ETFListView />} >
              <Route path=":userId" element={<ETFItem />} />
            </Route>
            <Route path=":category"  element={<ETFListView />} >
              {/* <Route index element={<DiyList />}/> */}
              <Route path=":userId" element={<ETFItem />} />
            </Route>
            <Route path="etfadddiy" element={<AddDiyETF />} />
            <Route path="compare" element={<Compare />} />
          </Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
