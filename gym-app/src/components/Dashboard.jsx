import { NavLink } from "react-router"

export default function Dashboard(){

    return(
        <div className="h-[100vh] w-[100vw] flex flex-row">
            

                <div className="flex flex-col w-[17%] bg-[#1f1e1e]" style={{borderRight:"1px black solid"}}>
                    
                        <div className="py-8 w-[100%] border-b-2 border-[#f75f07] bg-[#1f1e1e]"> 
                            <p className="text-[#FFF287] text-xl text-center">GYM SYSTEM  MANAGEMENT</p>
                        </div>

                        <div className="flex flex-row items-center justify-center gap-4 w-[100%] border-b-2 border-[#f75f07] py-8">

                            <img src="" alt="pic" className="rounded-[50%] p-3 text-[#2b2a2a] bg-[#FFD8D8]" />


                            <div className="">
                                <p className="text-2xl text-[#FFF287]">ADMIN SALIM</p>
                            </div>

                            <div className="rounded-[50%]" style={{border:"5px #40f57f solid"}}> 

                            </div>

                        </div>
                        
                        <div className="w-[100%] flex flex-col">

                            <div className="py-5 pl-22 text-[#FFF287] text-xl hover:bg-[black] hover:cursor-pointer">
                                <NavLink to={"/"} >DASHBOARD</NavLink>
                            </div>
                            
                            <div className="py-5 pl-22 text-[#FFF287] text-xl hover:bg-[black] hover:cursor-pointer">
                                <NavLink to={"/members"} >ALL MEMBERS</NavLink>
                            </div>

                            <div className="py-5 pl-22 text-[#FFF287] text-xl hover:bg-[black] hover:cursor-pointer">
                                <NavLink to={"/bannedusers"} >BANNED MEMBERS</NavLink>
                            </div>

                        </div>


                </div>



        </div>
    )
}