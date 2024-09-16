export default function UserProfilePage({params}:any){
    return (
        <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col p-4 text-2xl text-slate-200 text-pretty text-center itesmq justify-center min-h-screen w-96">
            <h1>Profile</h1>
            
            <p className="mt-10 text-2xl">This is a profile page of</p>
            <span className="bg-violet-400 text-black border border-black w-full  mt-6 rounded-lg shadow-md shadow-white">{params.id}</span>
            </div>
        </div>)
}