import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { filtered_products: products, grid_view: grid } = useFilterContext();

  if (products.length === 0) {
    return (
      <h5 style={{ textTransform: 'none' }}>Sorry, no products found...</h5>
    );
  }

  if (!grid) {
    return <ListView products={products} />;
  }

  return <GridView products={products} />;
};

export default ProductList;
