import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    //checking with tempItem to see if that
    //exact id and color are in the cart already
    //if yes, then just update the amount
    //if no, then create a newItem to add to cart with id as id+color
    const tempItem = state.cart.find((i) => i.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        //applying changes to the relevant product with id+color combo for id
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return {
            ...cartItem,
            amount: newAmount,
          };
        } else {
          return cartItem;
        }
      });

      return {
        ...state,
        cart: tempCart,
      };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const { id } = action.payload;
    const tempCart = state.cart.filter((cartItem) => cartItem.id !== id);
    return {
      ...state,
      cart: tempCart,
    };
  }

  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === id) {
          if (value === 'increase') {
            cartItem.amount = cartItem.amount + 1;
            if (cartItem.amount > cartItem.max) {
              cartItem.amount = cartItem.max;
            }
          } else {
            cartItem.amount = cartItem.amount - 1;
            if (cartItem.amount < 1) {
              cartItem.amount = 0;
            }
          }
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount > 0);

    return {
      ...state,
      cart: tempCart,
    };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;

        total.total_items += amount;
        total.total_amount += price * amount;
        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    );
    return { ...state, total_items, total_amount };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
