'use client'
import { HiOutlineLogout } from "react-icons/hi";
import axios from "axios";
import { useRouter } from "next/navigation";
function Logout() {
    const router=useRouter()
   const logout=async()=>{
      const response = await  axios.post('http://localhost:4000/api/logout',{},{
            headers:{
                token:localStorage.getItem('token')
            }
        })
        if(response.status === 200){
            localStorage.removeItem('token');
           router.push('/login');
        }
    }
  return (
    <div className="relative group flex flex-col items-center cursor-pointer">
      {/* Icon */}
      <HiOutlineLogout onClick={logout}  className="text-2xl text-gray-700 group-hover:text-red-500 transition-colors duration-200" />

      {/*Logout text on hover */}
      <span className="absolute top-8 text-sm bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Logout
      </span>
    </div>
  );
}

export default Logout;
