import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let prices = action.payload.map((p) => p.price);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: Math.max(...prices),
        price: Math.max(...prices),
        min_price: Math.min(...prices),
      },
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload.value,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    let sortedProducts = [...state.filtered_products];

    if (state.sort === 'price-lowest') {
      sortedProducts = sortedProducts.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (state.sort === 'price-highest') {
      sortedProducts = sortedProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (state.sort === 'name-a') {
      console.log(state.sort);
      sortedProducts = sortedProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (state.sort === 'name-z') {
      sortedProducts = sortedProducts
        .sort((a, b) => a.name.localeCompare(b.name))
        .reverse();
    }
    return {
      ...state,
      filtered_products: sortedProducts,
    };
  }

  if (action.type === UPDATE_FILTERS) {
    let name = action.payload.name;
    let value = action.payload.value;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value,
      },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    let filteredProducts = [...all_products];
    if (text) {
      filteredProducts = filteredProducts.filter((prod) =>
        prod.name.toLowerCase().startsWith(text.toLowerCase())
      );
    }
    if (category !== 'all') {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.category === category
      );
    }
    if (company !== 'all') {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.company === company
      );
    }

    if (color !== 'all') {
      filteredProducts = filteredProducts.filter((prod) =>
        prod.colors.find((c) => c === color)
      );
    }
    if (price > 0) {
      filteredProducts = filteredProducts.filter((prod) => prod.price <= price);
    }
    if (shipping) {
      filteredProducts = filteredProducts.filter((prod) => prod.shipping);
    }

    return {
      ...state,
      filtered_products: filteredProducts,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
