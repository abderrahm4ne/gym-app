import { NavLink } from "react-router"
import { Outlet } from "react-router"

// mui imports
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';


export default function SideBar(){

    return(
        <div className="h-[100vh] w-[100vw] flex flex-row">
            

                <div className="flex flex-col w-[17%]" style={{backgroundImage:"linear-gradient( #1a1919 40% , #1f1e1e 60%)", borderRight:"2px solid white"}}>
                    
                        <div className="py-8 w-[100%] border-b-2 border-[#FFD8D8]"> 
                            <p className="text-[#8CCDEB] text-xl text-center">GYM SYSTEM  MANAGEMENT</p>
                        </div>

                        <div className="flex flex-row items-center justify-center gap-4 w-[100%] border-b-2 border-[#FFD8D8] py-8">

                            <img src="" alt="pic" className="rounded-[50%] p-3 text-[#2b2a2a] bg-[#FFD8D8]" />


                            <div className="">
                                <p className="text-2xl text-[#8CCDEB]">ADMIN SALIM</p>
                            </div>

                            <div className="rounded-[50%]" style={{border:"5px #07b335 solid"}}> 

                            </div>

                        </div>
                        
                        <div className="w-[100%] flex flex-col">

                            <div className="py-5 pl-15 text-[#8CCDEB] text-2xl hover:bg-[black] hover:cursor-pointer flex flex-row gap-3.5" >
                                <DashboardIcon sx={{fontSize:"2rem"}}/>
                                <NavLink to={"/"} >DASHBOARD</NavLink>
                            </div>
                            
                            <div className="py-5 pl-15 text-[#8CCDEB] text-xl hover:bg-[black] hover:cursor-pointer flex flex-row gap-3.5">
                                <GroupIcon sx={{fontSize:"2rem"}}/>
                                <NavLink to={"/members"} >ALL MEMBERS</NavLink>
                            </div>

                        </div>


                </div>

                <div className="w-[83%]">
                    <Outlet />
                </div>

        </div>
    )
}