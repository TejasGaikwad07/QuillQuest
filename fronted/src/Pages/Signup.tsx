import { SignupElement } from "../components/SignupElement"
import { Quote } from "../components/Quote"
export const Signup = () =>{
return (
<div className = "grid grid-cols-2 ">
    <SignupElement/>
    <Quote/>
   
</div>
)
}