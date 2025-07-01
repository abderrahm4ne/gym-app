import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonIcon from '@mui/icons-material/Person';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import AddIcon from '@mui/icons-material/Add';
import BlockIcon from '@mui/icons-material/Block';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import CreateIcon from '@mui/icons-material/Create';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import NotesIcon from '@mui/icons-material/Notes';


import { NavLink, Outlet } from 'react-router';

export default function Dashboard(){

    return(
        <div className="rounded-2xl p-4 w-[100%] flex flex-row gap-3">

            <div className='w-[30%] flex flex-col rounded-2xl ' style={{backgroundImage:"linear-gradient(to bottom, rgba(0, 196, 255, 0.1) 0%, rgba(0, 196, 255, 0.1) 100%)", boxShadow:"0px 5px 5px rgba(0, 0, 0, 0.2)", border:"1px solid #00C4FF"}}>

                <NavLink to="/" className="box flex flex-col items-center justify-center self-center w-[20%] h-[100px] rounded-lg pt-3 mt-1">
                    <DashboardIcon className=" text-[#000000]" style={{fontSize:"3rem"}} />
                        <p className="text-[#000000] text-lg">DASHBOARD</p>
                </NavLink>


                <div className="w-full h-full grid grid-cols-2 py-5 gap-x-3 gap-y-1.5 px-4">

                    <NavLink to="/view-all-member" className="w-full h-[17vh] py-4 px-20 flex flex-col justify-center items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                    <p className='text-[#B0B7C4] text-2xl  text-center'>VIEW ALL MEMBERS</p>
                    <GroupIcon className='text-[#B0B7C4]' style={{fontSize:"2.5rem"}} />
                    </NavLink>

                    <NavLink to="/add-member" className="w-full h-[17vh] py-4 px-20 flex flex-col justify-center items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                    <p className='text-[#B0B7C4] text-2xl text-center'>ADD NEW MEMBER</p>
                    <PersonAddAlt1Icon className='text-[#B0B7C4]' style={{fontSize:"2.5rem"}} />
                    </NavLink>

                    <NavLink to="/edit-member" className="w-full h-[17vh] py-4 px-20 flex flex-col justify-center items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                    <p className='text-[#B0B7C4] text-2xl text-center'>EDIT MEMBER INFORMATIONS</p>
                    <div style={{fontSize:"2.5rem"}} className='flex items-center justify-center relative left-3'>
                        <PersonIcon className='text-[#B0B7C4]' style={{fontSize:"2.5rem"}} />
                        <CreateIcon className='text-[#B0B7C4] relative bottom-2 right-2.5' style={{fontSize:"1.5rem"}} />
                    </div>
                    
                    </NavLink>

                    <NavLink to="/renew-membership" className="w-full h-[17vh] py-4 px-20 flex flex-col justify-center items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                    <p className='text-[#B0B7C4] text-2xl text-center'>RENEW MEMBERSHIP</p>
                    <AutorenewIcon className='text-[#B0B7C4]' style={{fontSize:"2.5rem"}} />
                    </NavLink>

                    <NavLink to="/membership-ends-today" className="w-full h-[17vh] py-4 px-20 flex flex-col justify-center items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                    <p className='text-[#B0B7C4] text-2xl text-center'>MEMBERSHIPS ENDS TODAY</p>
                    <GroupRemoveIcon className='text-[#B0B7C4]' style={{fontSize:"2.5rem"}} />
                    </NavLink>

                    <NavLink to="/membership-ended" className="w-full h-[17vh] py-4 px-20 flex flex-col justify-center items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                    <p className='text-[#B0B7C4] text-2xl text-center'>MEMBERSHIPS HAS ENDED</p>
                    <GroupRemoveIcon className='text-[#B0B7C4]' style={{fontSize:"2.5rem"}} />
                    </NavLink>


                    <NavLink to="/basic-statistics" className="w-full h-[17vh] py-4 px-20 flex flex-col justify-center items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                    <p className='text-[#B0B7C4] text-2xl text-center'>BASIC STATISTICS</p>
                    <SignalCellularAltIcon className='text-[#B0B7C4]' style={{fontSize:"2.5rem"}} />
                    </NavLink>

                    <NavLink to="/take-note" className="w-full h-[17vh] py-4 px-20 flex flex-col justify-center items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                    <p className='text-[#B0B7C4] text-2xl text-center'>TAKE A NOTE</p>
                    <NotesIcon className='text-[#B0B7C4]' style={{fontSize:"2.5rem"}} />
                    </NavLink>

                
                 </div>

            </div>
            
            <div className='w-[70%] rounded-2xl p-4' style={{backgroundImage:"linear-gradient(to bottom, rgba(0, 196, 255, 0.1) 0%, rgba(0, 196, 255, 0.1) 100%)", boxShadow:"0px 5px 5px rgba(0, 0, 0, 0.2)", border:"1px solid #00C4FF"}}>
                <Outlet />
            </div>

        </div>
    )
}