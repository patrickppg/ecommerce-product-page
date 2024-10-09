import { Popover } from "@mui/material"
import { useContext } from "react"
import { products } from "../utils"
import { CartContext, CartOnChangeContext } from "../utils/contexts"

function Cart({ open, anchorEl, onClose }) {
 const cart = useContext(CartContext)

 function handleClose() {
  onClose()
 }

 return (
  <Popover
   open={open}
   anchorEl={anchorEl}
   onClose={handleClose}
   anchorOrigin={{
    horizontal: "center",
    vertical: 60,
   }}
   transformOrigin={{
    horizontal: "center",
    vertical: "top",
   }}
  >
   <div className=" bg-white w-[92vw] md:max-w-[350px] text-sm rounded-[8px] overflow-clip">
    <div className="font-bold px-6 py-4">Cart</div>

    <div className="h-[1px] bg-[hsl(0,0%,90%)]" />

    <div className="p-5 min-h-[168px] content-center">
     {cart.length === 0 ? (
      <p className="w-fit mx-auto font-bold text-[var(--color-dark-grayish-blue)]">
       Your cart is empty.
      </p>
     ) : (
      <CartItems />
     )}
    </div>
   </div>
  </Popover>
 )
}

function CartItems() {
 const cart = useContext(CartContext)
 const onChange = useContext(CartOnChangeContext)

 const price = products[0].currentPrice.toFixed(2)
 const quantity = cart[0].quantity
 const total = (price * quantity).toFixed(2)

 // ACTIONS
 // remove from cart button was clicked
 function handleRemoveClick() {
  onChange([])
 }
 // ACTIONS

 return (
  <>
   <div className="flex gap-4 text-[rgb(107,114,128)]">
    <img
     src={products[0].thumbnails[0]}
     alt=""
     className="w-12 h-fit rounded-md"
    />

    <div className="flex flex-col justify-between text-[15px]">
     <div>{products[0].label}</div>

     <div>
      <span className="price">{price}</span> &times; <span>{quantity}</span>{" "}
      <b className="price text-black">{total}</b>
     </div>
    </div>

    <button
     className="text-[var(--color-grayish-blue)] hover:text-[var(--color-dark-grayish-blue)] transition-colors ml-auto"
     onClick={handleRemoveClick}
    >
     <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="currentColor"
      className="w-4 h-4"
     >
      <path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" />
     </svg>
    </button>
   </div>

   <button className="standard-button py-4 w-full mt-7">Checkout</button>
  </>
 )
}

export default Cart
