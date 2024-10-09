import gsap from "gsap"
import {
 forwardRef,
 useContext,
 useEffect,
 useImperativeHandle,
 useRef,
 useState,
} from "react"
import { products } from "../utils"
import { CartOnChangeContext } from "../utils/contexts"

function SectionProduct() {
 return (
  <section className="md:py-[5rem]">
   <div className="flex-1 flex max-md:flex-col justify-between gap-x-16 lg:gap-28 items-center w-full md:w-[85vw] md:max-w-[900px] md:mx-auto ">
    <ProductImages />
    <ProductDetails />
   </div>
  </section>
 )
}

function ProductImages() {
 const [isPreviousBtnDisabled, setIsPreviousBtnDisabled] = useState(true)
 const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false)

 const imgsUlRef = useRef(null)
 const ProductOverviewRef = useRef(null)

 // ACTIONS
 // previous button was clicked
 function handlePreviousClick() {
  const amount = imgsUlRef.current.clientWidth
  imgsUlRef.current.scrollBy({ left: -amount })
 }

 // next button was clicked
 function handleNextClick() {
  const amount = imgsUlRef.current.clientWidth
  imgsUlRef.current.scrollBy({ left: amount })
 }

 // container finished scrolling
 useEffect(() => {
  function handleScrollEnd() {
   const scrollOffset = element.scrollLeft
   const scrollportWidth = element.clientWidth
   const scrollAreaWidth = element.scrollWidth
   const isScrolledToStart = Math.abs(scrollOffset) < 2
   const isScrolledToEnd =
    Math.abs(scrollOffset + scrollportWidth - scrollAreaWidth) < 2

   setIsPreviousBtnDisabled(isScrolledToStart)
   setIsNextBtnDisabled(isScrolledToEnd)
  }

  const element = imgsUlRef.current
  element.addEventListener("scrollend", handleScrollEnd)

  return () => {
   element.removeEventListener("scrollend", handleScrollEnd)
  }
 }, [])

 // large image button was clicked
 function handleLargeImgButtonClick() {
  ProductOverviewRef.current.openAt(0)
 }

 // a thumbnail button was clicked
 function handleThumbnailClick(index) {
  ProductOverviewRef.current.openAt(index)
 }
 // ACTIONS

 return (
  <div className="flex-1">
   <div className="relative">
    <ul
     ref={imgsUlRef}
     className="scrollbar-none flex overflow-auto md:overflow-clip snap-x snap-mandatory scroll-smooth md:rounded-2xl"
    >
     {products[0].images.map((item, i) => (
      <li
       key={i}
       className="flex-none w-full snap-start snap-always"
      >
       <img
        src={item}
        alt=""
       />
      </li>
     ))}
    </ul>

    <button
     type="button"
     className="absolute inset-0 w-full h-full rounded-2xl max-md:hidden"
     onClick={handleLargeImgButtonClick}
    />

    <menu className="flex justify-between absolute inset-0 self-center w-[90%] mx-auto pointer-events-none md:hidden">
     <li>
      <button
       type="button"
       className="scroll-button"
       onClick={handlePreviousClick}
       disabled={isPreviousBtnDisabled}
      >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="18"
        viewBox="0 0 12 18"
        className="w-4 h-4"
       >
        <path
         d="M11 1 3 9l8 8"
         stroke="currentColor"
         strokeWidth="4"
         fill="none"
        />
       </svg>
      </button>
     </li>
     <li>
      <button
       type="button"
       className="scroll-button"
       onClick={handleNextClick}
       disabled={isNextBtnDisabled}
      >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="18"
        viewBox="0 0 13 18"
        className="w-4 h-4"
       >
        <path
         d="m2 1 8 8-8 8"
         stroke="currentColor"
         strokeWidth="4"
         fill="none"
        />
       </svg>
      </button>
     </li>
    </menu>
   </div>

   <ul className="mt-8 flex gap-8 max-md:hidden">
    {products[0].thumbnails.map((item, i) => (
     <li key={i}>
      <div className="flex bg-white rounded-lg">
       <button
        type="button"
        disabled={i === 0 ? true : false}
        className="thumbnail-button rounded-[inherit] overflow-clip"
        onClick={() => handleThumbnailClick(i)}
       >
        <img
         src={item}
         alt=""
        />
       </button>
      </div>
     </li>
    ))}
   </ul>
   <ProductOverview ref={ProductOverviewRef} />
  </div>
 )
}

function ProductDetails() {
 const [quantity, setQuantity] = useState(1)

 const onChange = useContext(CartOnChangeContext)

 // ACTIONS
 // decrease button was clicked
 function handleDecreaseClick() {
  setQuantity(quantity - 1)
 }

 // increase button was clicked
 function handleIncreaseClick() {
  setQuantity(quantity + 1)
 }

 // add to cart button was clicked
 function handleAddClick() {
  onChange([{ id: 0, quantity }])
 }
 // ACTIONS

 return (
  <div className="flex-1 max-md:p-6 max-md:max-w-[600px]">
   <div className="uppercase font-extrabold text-[.8rem] tracking-[.1rem] text-[var(--color-dark-grayish-blue)]">
    Sneaker Company
   </div>
   <div className="text-3xl md:text-[2.6rem] font-bold leading-[1.1] text-[var(--color-dark-blue)] mt-3 md:mt-4 mb-5 md:mb-9">
    {products[0].label}
   </div>
   <p className="text-[var(--color-dark-grayish-blue)] mb-6 text-sm">
    {products[0].description}
   </p>

   <div className="flex md:flex-col gap-3 justify-between items-center md:items-start mb-7">
    <div className="flex items-center gap-4">
     <span className="price text-3xl font-extrabold text-[var(--color-dark-blue)]">
      {products[0].currentPrice.toFixed(2)}
     </span>
     <span className="percentage text-lg font-semibold text-white px-[.7rem] py-1 scale-[80%] rounded-lg bg-[var(--color-dark-blue)]">
      {products[0].discount}
     </span>
    </div>
    <s className="price text-[var(--color-dark-grayish-blue)] font-bold">
     {products[0].previousPrice.toFixed(2)}
    </s>
   </div>

   <div className="flex max-md:flex-col gap-5">
    <div className="h-[3.25rem] md:flex-[1] flex justify-between items-stretch md:scale-[.97] bg-[hsl(223,64%,98%)] rounded-lg">
     <button
      type="button"
      className="quantity-button"
      onClick={handleDecreaseClick}
      disabled={quantity === 0}
     >
      <svg
       xmlns="http://www.w3.org/2000/svg"
       width="12"
       height="4"
       fill="currentColor"
      >
       <path d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z" />
      </svg>
     </button>
     <output className="font-extrabold content-center text-[var(--color-dark-blue)]">
      {quantity}
     </output>
     <button
      type="button"
      className="quantity-button"
      onClick={handleIncreaseClick}
     >
      <svg
       xmlns="http://www.w3.org/2000/svg"
       width="12"
       height="12"
       fill="currentColor"
      >
       <path d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z" />
      </svg>
     </button>
    </div>

    <button
     type="button"
     className="standard-button h-[3.25rem] md:flex-[1.5] flex justify-center items-stretch gap-4"
     onClick={handleAddClick}
     disabled={quantity === 0}
    >
     <span className=" content-center">
      <svg
       xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 22 20"
       fill="currentColor"
       className="w-4 h-4"
      >
       <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" />
      </svg>
     </span>
     <span className="content-center">Add to cart</span>
    </button>
   </div>
  </div>
 )
}

const ProductOverview = forwardRef(function ProductOverview(props, ref) {
 const [currentImgIndex, setCurrentImgIndex] = useState(0)
 const [isScrolledToEnd, setIsScrolledToEnd] = useState(false)

 const dialogRef = useRef(null)
 const imgsUlRef = useRef(null)

 // ACTIONS
 // close button was clicked
 function handleCloseClick() {
  gsap.to(dialogRef.current, {
   "--brightness": "1",
   y: 150,
   scale: 0.8,
   opacity: 0,
   duration: 0.2,
   onComplete: () => {
    dialogRef.current.close()
   },
  })
 }

 // previous button was clicked
 function handlePreviousClick() {
  const amount = imgsUlRef.current.clientWidth
  imgsUlRef.current.scrollBy({ left: -amount })
 }

 // next button was clicked
 function handleNextClick() {
  const amount = imgsUlRef.current.clientWidth
  imgsUlRef.current.scrollBy({ left: amount })
 }

 // a thumbnail button was clicked
 function handleThumbnailClick(index) {
  const position = index * imgsUlRef.current.clientWidth
  imgsUlRef.current.scrollTo({ left: position })
 }

 // container finished scrolling
 useEffect(() => {
  function handleScrollEnd() {
   const scrollOffset = element.scrollLeft
   const scrollportWidth = element.clientWidth
   const scrollAreaWidth = element.scrollWidth
   const index = Math.round(scrollOffset / scrollportWidth)
   const isAtEnd =
    Math.abs(scrollOffset + scrollportWidth - scrollAreaWidth) < 2

   setCurrentImgIndex(index)
   setIsScrolledToEnd(isAtEnd)
  }

  const element = imgsUlRef.current
  element.addEventListener("scrollend", handleScrollEnd)

  return () => {
   element.removeEventListener("scrollend", handleScrollEnd)
  }
 }, [])

 // dialog received a close request
 function handleCancel(event) {
  event.preventDefault()

  gsap.to(dialogRef.current, {
   "--brightness": "1",
   y: 150,
   scale: 0.8,
   opacity: 0,
   duration: 0.2,
   onComplete: () => {
    dialogRef.current.close()
   },
  })
 }
 // ACTIONS

 useImperativeHandle(
  ref,
  () => {
   return {
    openAt(index) {
     dialogRef.current.showModal()
     gsap.to(dialogRef.current, {
      "--brightness": "0.2",
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.2,
      onComplete: () => {
       const position = index * imgsUlRef.current.clientWidth
       imgsUlRef.current.scrollTo({ left: position })
      },
     })
    },
   }
  },
  []
 )

 return (
  <dialog
   ref={dialogRef}
   className="max-w-[65vh] overflow-visible bg-transparent backdrop:bg-transparent opacity-0 translate-y-[150px] scale-[.8]"
   onCancel={handleCancel}
  >
   <button
    type="button"
    className="py-2 px-1 w-fit ml-auto block text-white hover:text-[var(--color-orange)] transition-colors"
    autoFocus={true}
    onClick={handleCloseClick}
   >
    <svg
     xmlns="http://www.w3.org/2000/svg"
     width="14"
     height="15"
     viewBox="0 0 14 15"
     fill="currentColor"
    >
     <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" />
    </svg>
   </button>

   <div className="relative mt-2">
    <ul
     ref={imgsUlRef}
     className="scrollbar-none flex overflow-auto snap-x snap-mandatory scroll-smooth rounded-2xl"
    >
     {products[0].images.map((item, i) => (
      <li
       key={i}
       className="flex-none w-full snap-start snap-always"
      >
       <img
        src={item}
        alt=""
       />
      </li>
     ))}
    </ul>

    <menu className="flex justify-between absolute inset-0 self-center pointer-events-none">
     <li>
      <button
       type="button"
       className="scroll-button -translate-x-1/2"
       disabled={currentImgIndex === 0}
       onClick={handlePreviousClick}
      >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="18"
        viewBox="0 0 12 18"
        className="w-4 h-4"
       >
        <path
         d="M11 1 3 9l8 8"
         stroke="currentColor"
         strokeWidth="4"
         fill="none"
        />
       </svg>
      </button>
     </li>
     <li>
      <button
       type="button"
       className="scroll-button translate-x-1/2"
       disabled={isScrolledToEnd}
       onClick={handleNextClick}
      >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="18"
        viewBox="0 0 13 18"
        className="w-4 h-4"
       >
        <path
         d="m2 1 8 8-8 8"
         stroke="currentColor"
         strokeWidth="4"
         fill="none"
        />
       </svg>
      </button>
     </li>
    </menu>
   </div>

   <ul className="flex gap-7 px-[11%] py-[7%]">
    {products[0].thumbnails.map((item, i) => (
     <li key={i}>
      <div className="flex bg-white rounded-lg">
       <button
        type="button"
        className="thumbnail-button rounded-[inherit] overflow-clip"
        disabled={i === currentImgIndex}
        onClick={() => handleThumbnailClick(i)}
       >
        <img
         src={item}
         alt=""
        />
       </button>
      </div>
     </li>
    ))}
   </ul>
  </dialog>
 )
})

export default SectionProduct
