import { useState } from "react"
import MainContent from "./components/MainContent"
import PageHeader from "./components/PageHeader"
import { CartContext, CartOnChangeContext } from "./utils/contexts"

function App() {
 const [cart, setCart] = useState([])

 function onChange(next) {
  setCart(next)
 }

 return (
  <CartContext.Provider value={cart}>
   <CartOnChangeContext.Provider value={onChange}>
    <PageHeader />
    <MainContent />
   </CartOnChangeContext.Provider>
  </CartContext.Provider>
 )
}

export default App
