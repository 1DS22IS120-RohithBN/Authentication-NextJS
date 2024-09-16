"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import  axios  from "axios"
import Link from "next/link"
import toast from "react-hot-toast"

export default function SignupPage(){
    const router = useRouter()
    const [user,setUser]=useState({
        email:"",
        password:"",
    })
    const [loading,setLoading]=useState(false)

    const onLogin=async ()=>{
        try{
            setLoading(true)
            const response=await axios.post("/api/users/login",user)
            console.log(response.data);
            toast.success("Login Successful")
            router.push("/profile")
        }
        catch(error:any){
            console.log(error);
            toast.error(error.message)
        }
        finally{
            setLoading(false)}
    }
    return (
        <div className="flex items-center justify-center">
        <div className="flex flex-col items-centre p-6 justify-center h-96  w-96 border-slate-500 border mt-36 rounded-2xl shadow-lg shadow-purple-500">
            <h1>{loading?"Processing":"Login"}</h1>
            <hr />
           
              <label className="mt-4 " htmlFor="email"/>Email:
            <input type="text"
            id="email"
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
         
            className="p-2 h-8 border-gray-500 rounded-lg shadow-sm shadow-purple-200 text-black focus:outline-none
            focus:border-gray-900 "
            />
             <label className="mt-4 " htmlFor="password"/>Password:
            <input type="password"
            id="password"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            
            className=" p-2 h-8 border-gray-500 rounded-lg shadow-md shadow-slate-400 text-black focus:outline-none
            focus:border-gray-900 "
            />
            <div className="flex flex-col items-center justify-center">
            <button className="p-2 border shadow-md shadow-slate-500 rounded-lg mb-4  align-middle focus:outline-none w-28 h-10 text-center mt-5 "onClick={onLogin}>Login</button>
            <Link href="/signup">
            Click here to <u className="text-slate-500 hover:text-slate-800">SIgnUp</u>
            </Link>
            </div>
           

        </div>
        </div>
    )
}