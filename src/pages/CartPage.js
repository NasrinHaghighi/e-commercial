import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { CartContent, PageHero } from '../components'

const CartPage = () => {
  const {cart,removeItem,toggleAmount,clearCart} =useCartContext();
  console.log(cart)




  if(cart.length<1){
    return <Wrapper className='page-100' >
      <div className='empty'>
              <h5>your shopping cart is already empty...</h5>
              <Link to='/products' className='btn'>fill it</Link>
              </div>
            </Wrapper>
  }
  return <main>
   
      <PageHero title='cart'/>

      <Wrapper>
        <CartContent />
      </Wrapper>
  </main>
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default CartPage
