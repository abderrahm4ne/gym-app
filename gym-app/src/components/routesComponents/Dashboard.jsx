import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonIcon from '@mui/icons-material/Person';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import AddIcon from '@mui/icons-material/Add';
import BlockIcon from '@mui/icons-material/Block';

export default function Dashboard(){

    return(
        <div className="w-full h-[100vh] py-2 bg-[#383636] mt-2">

                
                <div className='grid grid-cols-5 p-4 '>

                        <div className='bg-[#1f1e1e] box text-[#FFF287] flex flex-col items-center justify-center rounded-lg border-1 border-black m-2 h-[280px]' style={{borderShadow:"20px 20px 20px white"}}>

                            <GroupIcon sx={{fontSize:"10rem", height:"60%"}} />

                            <div className='height-[40%]'>
                                <p className='text-2xl'>VIEW ALL MEMBERS</p>
                            </div>
                            
                        </div>

                        <div className='bg-[#1f1e1e] box height-[30%] text-[#FFF287] flex flex-col items-center justify-center rounded-lg m-2 h-[280px]'>
                            <PersonAddAlt1Icon className='relative left-5' sx={{fontSize:"10rem", height:"60%",}} />
                            <div className='height-[40%]'>
                                <p className='text-2xl'>ADD NEW MEMBER</p>
                            </div>
                            
                        </div>

                        <div className='bg-[#1f1e1e] box height-[30%] text-[#FFF287] flex flex-col items-center justify-center rounded-lg m-2 h-[280px]'>
                            <div className='relative h-[60%]'>
                                <PersonIcon sx={{fontSize:"10rem"}} />
                                <PlusOneIcon sx={{fontSize:"5.5rem", position:"absolute", top:"25px", right:"-25px", color:"#FFF287", zIndex:"1"}} />
                            </div>
                            <div className='height-[40%]'>
                                <p className='text-2xl'>ADDED TODAY</p>
                            </div>

                        </div>

                        <div className='bg-[#1f1e1e] box height-[30%] text-[#FFF287] flex flex-col items-center justify-center rounded-lg m-2 h-[280px]'>
                            <div className='relative h-[60%]'>
                                <PersonIcon sx={{fontSize:"10rem"}} />
                                <AddIcon sx={{fontSize:"5.5rem", position:"absolute", top:"25px", right:"-25px", color:"#FFF287", zIndex:"1"}} />
                            </div>
                            <div className='height-[40%]'>
                                <p className='text-2xl'>ADDED LAST 7 DAYS</p>
                            </div>

                        </div>

                        <div className='bg-[#1f1e1e] box height-[30%] text-[#FFF287] flex flex-col items-center justify-center rounded-lg m-2 h-[280px]'>
                            <div className='relative h-[60%]'>
                                <PersonIcon sx={{fontSize:"10rem"}} />
                                <AutorenewIcon sx={{fontSize:"5.5rem", position:"absolute", top:"25px", right:"-25px", color:"#FFF287", zIndex:"1"}} />
                            </div>
                            <div className='height-[40%]'>
                                <p className='text-2xl'>RENEW MEMBERSHIP</p>
                            </div>

                        </div>

                        <div className='bg-[#1f1e1e] box height-[30%] text-[#610404] flex flex-col items-center justify-center rounded-lg m-2 h-[280px]'>
                            <div className='relative h-[60%]'>
                                <PersonIcon sx={{fontSize:"10rem"}} />
                                <AutorenewIcon sx={{fontSize:"5.5rem", position:"absolute", top:"25px", right:"-25px", color:"#610404", zIndex:"1"}} />
                            </div>
                            <div className='height-[40%]'>
                                <p className='text-2xl'>SUBSCRIPTIONS ENDS TODAY</p>
                            </div>

                        </div>

                        <div className='bg-[#1f1e1e] box height-[30%] text-[#610404] flex flex-col items-center justify-center rounded-lg m-2 h-[280px]'>
                            <div className='relative h-[60%]'>
                                <PersonIcon sx={{fontSize:"10rem"}} />
                                <AutorenewIcon sx={{fontSize:"5.5rem", position:"absolute", top:"25px", right:"-25px", color:"#610404", zIndex:"1"}} />
                            </div>
                            <div className='height-[40%]'>
                                <p className='text-2xl'>ENDS THIS 3 DAYS</p>
                            </div>

                        </div>

                        <div className='bg-[#1f1e1e] box height-[30%] text-[#610404] flex flex-col items-center justify-center rounded-lg m-2 h-[280px]'>
                            <div className='relative h-[60%]'>
                                <PersonIcon sx={{fontSize:"10rem"}} />
                                <BlockIcon sx={{fontSize:"5.5rem", position:"absolute", top:"25px", right:"-30px", color:"#610404", zIndex:"1"}} />
                            </div>
                            <div className='height-[40%]'>
                                <p className='text-2xl'>BANNED MEMBERS</p>
                            </div>

                        </div>

                </div>
            
                        
        </div>
    )
}