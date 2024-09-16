"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import toast from "react-hot-toast"


export default function ProfilePage(){
    const[username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [id,setId]=useState(null)
    const router = useRouter();
        const fetch=async()=>{
        try{const response=await axios.get("/api/users/profile")
        setUsername(response.data.username)
        setId(response.data.id)
        setEmail(response.data.email)
    
    }
        catch(error){console.error(error)}
    }
   
    

    const logout=async()=>{
       try{ const response=await axios.get("/api/users/logout");
        if(response.status===200){
            router.push("/login");
            toast.success("Logged out successfully");
            }
        }
        catch(e){
            console.log(e);
        }


    }


    return (
        <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col p-4 text-2xl text-slate-200 text-pretty text-center itesmq justify-center min-h-screen w-96">
            <h1>Profile</h1>
            <hr />
            <Link href={`/profile/${id}`}>
            <p className="mt-10">This is profile page of {username}</p>
            </Link>
            <button 
            onClick={logout}
            className="text-white font-bold py-2 mt-4 border border-white shadow-md shadow-white px-4 rounded-xl ">Logout</button>
             <button 
            onClick={fetch}
            className="text-white font-bold py-2 mt-4 border border-white shadow-md shadow-white px-4 rounded-xl ">Get details</button>
            </div>
        </div>)
}