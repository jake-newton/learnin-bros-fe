import {createRef, useEffect} from 'react' 

const FocusInput = () => {
   const inputEl = createRef()

   const focusInput = () => {
      inputEl.current.focus()
   }

   return (
      <div>
         <input ref={inputEl} type="text" />
         <button onClick={focusInput}>Focus input</button>
      </div>
   )
}