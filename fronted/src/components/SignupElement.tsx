import { Signin } from "../Pages/Signin"
import { Link } from "react-router-dom"
import { Textbox } from "./TextBox"
import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios"
export const SignupElement = () =>{
     const [username,setUsername] = useState<string>("")
     const [email,setEmail] = useState<string>("")
     const [password,setPassword] = useState<string>("")


    return(
          <div className = "flex justify-center px-32 py-32">
          <div className="text-5xl font-extrabold 	">
            Create an account
            <div className = "font-normal text-sm py-4">
             already have an account? 
             <Link className ="underline" to = "Signin">signin</Link>
          <div className =  "py-3.5	">
            <Textbox label="Username" onChange={(e)=>{setUsername(e.target.value)}} placeholder="Tejas"/>
            <Textbox label="Email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="tejasbharat@gmail.com"/>
            <Textbox label="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="123456"/>
           <div className="py-6"><Button onClick={()=>{
            useEffect(()=>{
              const response = axios.post("https://backend.tejasbharatgaikwad.workers.dev/v1/user/signup",{
                username:username,
                email:email,
                password:password
              }
                
              )

            }, [])
            



           }}
            /></div> 

            
</div>
</div>
          </div>
        </div>
    )
}