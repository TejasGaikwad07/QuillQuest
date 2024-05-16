import { ChangeEvent, MouseEvent } from "react"

interface ButtonType{
    onClick: (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({onClick}:ButtonType)=>{
    return(
      <div>
       <button  onClick = {onClick} type="button" className="w-full h-12 px-6 bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">SignUp</button>
     </div>
    )
}