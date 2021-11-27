import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

// all of the filters will be do in the ...all_products, means we make a copy of this array to cahnge*/
const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view:true,
  sort:'price-highest',
  filters:{
    text:'',
    company:'all',
    category:'all',
    color:'all',
    min_price:0,
    max_price:0,
    price:0,
    shipping:false,
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const {products} =useProductsContext();
 
  const [state, dispatch] =useReducer(reducer, initialState)

/*when the poducts is load we need to calculate max-price*/
useEffect(()=>{
  dispatch({type:LOAD_PRODUCTS, payload:products})
},[products])


// بعد ار اینکه ولیو را از اینیوت گرفتیم حالا باید بگوییم که با هر بار تغییر استیت بیا و سودت را بذ اساس آن انام بده
useEffect(()=>{
  dispatch({type:FILTER_PRODUCTS})
 dispatch({type: SORT_PRODUCTS})
},[products, state.sort, state.filters])


const setGridView =()=>{
  dispatch({type: SET_GRIDVIEW})
}

const setListView = ()=>{
  dispatch({type: SET_LISTVIEW})
}
const updateSort = (e)=>{
  const value=e.target.value
 /*in here the name is not important because we have just an palce that use inser data*/

  dispatch({type: UPDATE_SORT, payload:value})
}
const updateFilters = (e)=>{
   let name = e.target.name
   let value = e.target.value;
  if(name === 'category'){
    value =e.target.textContent
  }
  if( name === 'color'){
    value= e.target.dataset.color
  }
  if( name === 'shipping'){
    value =e.target.checked
  }
   
    console.log(name, value)
   /*but here we have abunche of state in filters and we need to change the statevalue by name, then az palyload we pass two value:name+value*/
   dispatch({type: UPDATE_FILTERS, payload:{name , value}})

}
const clearFilters = ()=>{
  dispatch({type:CLEAR_FILTERS })

}

  return (
    <FilterContext.Provider value={{...state, setGridView, setListView,  updateSort, updateFilters, clearFilters }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
