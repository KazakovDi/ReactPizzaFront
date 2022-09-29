import "./scss/app.scss"

import {Routes, Route} from "react-router-dom"
import React from "react"
import Cart from "./components/Cart/Cart";
import Success from "./components/Success/Success"
// components
import Header from "./components/Header";
import Content from "./components/Content/Content";
import Auth from "./components/Admin/Auth/Auth";
import {useDispatch, useSelector} from "react-redux"
import {fetchAuthMe, selectAuth} from "./redux/slices/authSlice"
import CreatePizza from "./components/Admin/CreatePizza/CreatePizza"
function App() {
  const dispatch = useDispatch()
  React.useEffect(()=> {
      dispatch(fetchAuthMe())
  }, [])
  return (
    <div className="wrapper">
      <Header/>
      <Routes>
        <Route path="/" element={<Content />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/admin/auth" element={<Auth />}/>
        <Route path="/admin/create-pizza" element={<CreatePizza />}/>
        <Route path="/admin/edit/:id" element={<CreatePizza />}/>
        <Route path="/success" element={<Success />}/>
      </Routes>
    </div>
  );
}

export default App;
