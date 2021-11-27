import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filtered_products : products, grid_view} = useFilterContext();



if(products.length < 1){
  return <h5> sorry, there is not a matched product by your search...</h5>
}
/*-----change between grid  and list view----*/

if(grid_view === false){
  return <ListView products={products}/>
}

  return <GridView products={products}> product list</GridView>
}

export default ProductList
