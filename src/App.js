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
  AuthWrapper,
} from './pages';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthWrapper>
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
              <Private exact path="/checkout">
                <Checkout />
              </Private>
              <Route path="*">
                <Error />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </AuthWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
