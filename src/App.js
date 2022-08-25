import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';

import {
  Home,
  About,
  Products,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  Private,
} from './pages';

function App() {
  return (
    <>
      <BrowserRouter>
        <Router>
          <Navbar />
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/products/:id" children={<SingleProduct />} />
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/checkout">
              <Checkout />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </BrowserRouter>
    </>
  );
}

export default App;
