import { act } from 'react-dom/test-utils'
import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if(action.type === LOAD_PRODUCTS){
    let maxPrice = action.payload.map((p)=>{ return p.price})
    /*for the max method we can not pass an array, so we use ... to make aobject*/
    maxPrice = Math.max(...maxPrice)
    
    console.log(maxPrice)
  {/* WE CAN NOT POINT TO A ONE PLACE IN TO PALCE, THEN WE MAKE ACOPY OF THEM AND POINT TO THE TO SOLUE THE PROBLEM*/}
    // first we need to show filtered-pro and product as payload.ACTIN but SHOULD USE ...  because WHITOUT them  we can not back to the default, az the js work point to the memory
    return{...state,
       filtered_products : [...action.payload ], 
        all_products:[...action.payload],
        filters:{...state.filters, max_price:maxPrice, price:maxPrice}
      }
  }
  if(action.type === SET_GRIDVIEW){
    return({...state, grid_view:true})
  }
  if(action.type === SET_LISTVIEW){
    return({...state, grid_view:false})
  }
  if(action.type ===  UPDATE_SORT){
    return({...state, sort:action.payload})
  }
  /*------------sort by select option-----------------*/
  if(action.type === SORT_PRODUCTS){
    const {sort, filtered_products} = state
    let tempProducts =[...filtered_products]
    
    if( sort === 'price-lowest'){
      tempProducts = tempProducts.sort((a,b)=>a.price - b.price     )
    }
    if( sort === 'price-highest'){
      tempProducts = tempProducts.sort((a,b)=>b.price - a.price     )
    }
    if( sort === 'name-a'){
      tempProducts =tempProducts.sort((a,b)=>{
        return a.name.localeCompare(b.name)
      })
      }
    if( sort === 'name-z'){
      tempProducts =tempProducts.sort((a,b)=>{
        return b.name.localeCompare(a.name)
      })
     }
    return{...state, filtered_products:tempProducts}
  }

  /*----------------------------filters-**********/
  if(action.type === UPDATE_FILTERS){
    const {name , value} = action.payload
    return{...state , filters:{...state.filters, [name]:value}}
  }
  /*we want to return all filter to initial defalt, but we dont want min and max == 0, because we did acalculation for max price,
  SO remove this two from the this action , and then use ...state.filters to accse to the previous value , and for price:state.filters.max_price */
  if(action.type ===  CLEAR_FILTERS){
  
    return{...state 
      , filters:{
      ...state.filters,
      text:'',
      company:'all',
      category:'all',
      color:'all',
      // min_price:0,
      // max_price:0,
      price:state.filters.max_price,
      shipping:false,
    }}
  }


  // after the change initialstateb by action.UPDATE_FILTERS now we need to dispatch a function in the useEffect that when a state.filters changed do that....
  //we get all_products from state, make a tempoProduct that is a copy of taht, and the in the end after all fillters filted_product: tempProducts*/
  if(action.type === FILTER_PRODUCTS){
   const {all_products}= state
   const {text, category, company, shipping, color, price}= state.filters
   let tempProducts = [...all_products]
   //-----------------filltering
   //text
   if(text){
     tempProducts =tempProducts.filter((product)=>{
       return product.name.toLowerCase().startsWith(text)
     })
    }
  //category
 if(category !== 'all'){
  tempProducts = tempProducts.filter((p)=>{
    return p.category === category
  })
 }

  //company
 if(company !== 'all'){
  tempProducts = tempProducts.filter((p)=>{
    return p.company === company
  })
 }
   //color
   if(color !== 'all'){
    tempProducts = tempProducts.filter((p)=>{
      return p.colors.find((c)=> c === color)
    })
   }
   //price
   tempProducts = tempProducts.filter((p)=>{
     return p.price <= price
   })
    //shipping
    if(shipping){
      tempProducts = tempProducts.filter((p)=>{
        return p.shipping === true
      })
     }
    



    return{...state, filtered_products:tempProducts}
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
