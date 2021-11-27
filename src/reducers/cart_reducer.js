import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
    if (action.type === ADD_TO_CART) {
        const { id, color, amount, product } = action.payload
            //we need to check if item exisct in the cart or not
            //secend point:when we want add a item in cart we use id+color because may be user select different color of one product, 
        let tempItem = state.cart.find((item) => item.id === id + color)
            //if it matched means itemis aleady in the cart
            //then we need to do a map on the cart to find some one that already id is match with id taht exist in the cart increase the amount
        if (tempItem) {
            const tempCart = state.cart.map((cartItem) => {
                if (cartItem.id === id + color) {
                    let newAmount = cartItem.amount + amount
                    return {...cartItem, amount: newAmount }
                } else {
                    return cartItem
                }
            })
            console.log('ok')


            return {...state, cart: tempCart }
        } else {

            //if the item is not in the cart we need to make anew item and add to the prvious cart/
            //for the newitem we need to pick all the information that we need to show in the cartpage
            const newItem = {
                id: id + color,
                amount,
                color,
                name: product.name,
                image: product.images[0].url,
                price: product.price,
                max: product.stock
            }

            return {...state, cart: [...state.cart, newItem] }
            //this line means all that are in the cart and add newitem to on
        }
    }
    if (action.type === REMOVE_CART_ITEM) {
        const newCartArray = state.cart.filter((item) => {
            return item.id !== action.payload

        })
        return {...state, cart: newCartArray }
    }
    if (action.type === CLEAR_CART) {
        return {...state, cart: [] }
    }
    if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
        const { id, value } = action.payload
        let tempCart = state.cart.map((item) => {
            console.log(item)
            if (item.id === id) {
                if (value === 'inc') {
                    let newAmount = item.amount + 1
                    if (newAmount > item.max) {
                        newAmount = item.max
                    }
                    return {...item, amount: newAmount }
                }
                if (value === 'dec') {
                    let newAmount = item.amount - 1
                    if (newAmount < 1) {
                        newAmount = 1
                    }
                    return {...item, amount: newAmount }
                }
            } else {
                return item
            }
        })
        return {...state, cart: tempCart }
    }
    if (action.type === COUNT_CART_TOTALS) {

        const { total_items, total_amount } = state.cart.reduce((total, cartItem) => {
            const { price, amount } = cartItem
            total.total_items += amount
            total.total_amount += price * amount



            return total

        }, { total_items: 0, total_amount: 0 })
        return {...state, total_items, total_amount }
    }

    //throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer