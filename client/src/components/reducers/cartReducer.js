// import Item1 from '../../images/item1.jpg'
import Item1 from '../../images/ugu.png'
// import Item2 from '../../images/item2.jpg'
import Item2 from '../../images/oha.jpeg'
// import Item3 from '../../images/item3.jpg'
import Item3 from '../../images/okazi.jpeg'
// import Item4 from '../../images/item4.jpg'
import Item4 from '../../images/utazi.jpeg'
// import Item5 from '../../images/item5.jpg'
import Item5 from '../../images/egusi.jpeg'
// import Item6 from '../../images/item6.jpg'
import Item6 from '../../images/scent.jpeg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'Ugu Leaf', desc: "Order for your fresh vegetable leaf. Recieve before payment when ordered. Thanks", price:500,img:Item1},
        {id:2,title:'Oha Leaf', desc: "Order for your fresh vegetable leaf. Recieve before payment when ordered. Thanks", price:350,img: Item2},
        {id:3,title:'Okazi Leaf', desc: "Order for your fresh vegetable leaf. Recieve before payment when ordered. Thanks",price:1500,img: Item3},
        {id:4,title:'Utazi Leaf', desc: "Order for your fresh vegetable leaf. Recieve before payment when ordered. Thanks", price:260,img:Item4},
        {id:5,title:'Egusi', desc: "Order for your fresh egusi. Recieve before payment when ordered. Thanks", price:900,img: Item5},
        {id:6,title:'Scent Leaf', desc: "Order for your fresh vegetable leaf. Recieve before payment when ordered. Thanks",price:250,img: Item6}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 150
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 150
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer