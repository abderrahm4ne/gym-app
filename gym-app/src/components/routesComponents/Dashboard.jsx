import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Dashboard(){

    return(
        <div className="bg-[#efefef] h-[100vh]">

            <div className="w-[100%] py-4 text-3xl pl-15 bg-[#2b2a2a] text-[#FFF287] flex flex-row items-center gap-3" style={{ boxShadow: "0px -2px 6px black", borderBottom:"3px solid #FFA673"}}>

                <DashboardIcon style={{fontSize:"2.5rem"}}/>
                <p>DASHBOARD</p>
            </div>
            
            <div className='grid grid-cols-4 p-4'>
                    <div className='bg-[#FFD8D8] p-6'>
                        ADD MEMBER
                    </div>
            </div>
            
        </div>
    )
}