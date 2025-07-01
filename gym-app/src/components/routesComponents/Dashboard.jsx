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


import { NavLink } from 'react-router';

export default function Dashboard(){

    return(
        <div className="w-full h-full grid grid-cols-2 py-5 mt-3 gap-3 px-4">

                <NavLink to="/view-all-member" className="w-full py-4 px-20 flex flex-col justify-between items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                <p className='text-[#FFFFFF] text-2xl text-center'>VIEW ALL MEMBERS</p>
                <GroupIcon className='text-[#FFFFFF]' style={{fontSize:"2.5rem"}} />
                </NavLink>

                <NavLink to="/add-member" className="w-full py-4 px-20 flex flex-col justify-between items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                <p className='text-[#FFFFFF] text-2xl text-center'>ADD NEW MEMBER</p>
                <PersonAddAlt1Icon className='text-[#FFFFFF]' style={{fontSize:"2.5rem"}} />
                </NavLink>

                <NavLink to="/edit-member" className="w-full py-4 px-20 flex flex-col justify-between items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                <p className='text-[#FFFFFF] text-2xl text-center'>EDIT MEMBER INFORMATIONS</p>
                <div style={{fontSize:"2.5rem"}} className='flex items-center justify-center relative left-6'>
                    <PersonIcon className='text-[#FFFFFF]' style={{fontSize:"2.5rem"}} />
                    <CreateIcon className='text-[#FFFFFF] relative bottom-2 right-2.5' style={{fontSize:"1.5rem"}} />
                </div>
                
                </NavLink>

                <NavLink to="/renew-membership" className="w-full py-4 px-20 flex flex-col justify-between items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                <p className='text-[#FFFFFF] text-2xl text-center'>RENEW MEMBERSHIP</p>
                <AutorenewIcon className='text-[#FFFFFF]' style={{fontSize:"2.5rem"}} />
                </NavLink>

                <NavLink to="/membership-ends-today" className="w-full py-4 px-20 flex flex-col justify-between items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                <p className='text-[#FFFFFF] text-2xl text-center'>MEMBERSHIPS ENDS TODAY</p>
                <GroupRemoveIcon className='text-[#FFFFFF]' style={{fontSize:"2.5rem"}} />
                </NavLink>

                <NavLink to="/membership-ended" className="w-full py-4 px-20 flex flex-col justify-between items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                <p className='text-[#FFFFFF] text-2xl text-center'>MEMBERSHIPS HAS ENDED</p>
                <GroupRemoveIcon className='text-[#FFFFFF]' style={{fontSize:"2.5rem"}} />
                </NavLink>


                <NavLink to="/basic-statistics" className="w-full py-4 px-20 flex flex-col justify-between items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                <p className='text-[#FFFFFF] text-2xl text-center'>BASIC STATISTICS</p>
                <SignalCellularAltIcon className='text-[#FFFFFF]' style={{fontSize:"2.5rem"}} />
                </NavLink>

                <NavLink to="/take-note" className="w-full py-4 px-20 flex flex-col justify-between items-center box-nav " style={{border:"1px solid #00C4FF", borderRadius:"10px"}}>
                <p className='text-[#FFFFFF] text-2xl text-center'>TAKE A NOTE</p>
                <NotesIcon className='text-[#FFFFFF]' style={{fontSize:"2.5rem"}} />
                </NavLink>

                
        </div>
    )
}