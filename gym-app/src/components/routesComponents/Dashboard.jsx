    import DashboardIcon from '@mui/icons-material/Dashboard';
    import GroupIcon from '@mui/icons-material/Group';
    import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
    import BlockIcon from '@mui/icons-material/Block';
    import NotesIcon from '@mui/icons-material/Notes';

    import { useTranslation } from 'react-i18next';
    import { NavLink, Outlet } from 'react-router';

    export default function Dashboard(){

        const { t, i18n } = useTranslation(); 

        const currentDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
    
        return(
            <div className="p-4 w-[100%] h-full flex flex-row gap-3  " style={{direction:currentDirection}}>

                <div className='w-[25%]  px-4 py-5  rounded-2xl flex flex-col gap-1' style={{backgroundImage: 'linear-gradient(to bottom, #33334a, #1a1f2e)', boxShadow:"1px 4px 5px rgba(0, 0, 0, 0.3)"}}>

                    <div className='text-xl gap-3.5 flex flex-row items-center rounded-2xl px-3 py-2.5 bg-[#4CAF50] text-white w-fit hover:cursor-pointer'>
                        <DashboardIcon style={{fontSize:"2rem"}} />
                        <p className={` ${i18n.language === 'ar' ? 'text-3xl' : 'text-xl'} `}>{t("Dashboard")}</p>
                    </div>

                    <div className='flex flex-col gap-2 mt-4'>

                        <NavLink to="/view-all-members" className="flex flex-row gap-2 items-center text-[#B0B7C4] hover:text-white hover:bg-[#4CAF50] px-3 py-2 rounded-lg transition duration-300">
                        <GroupIcon style={{fontSize:"1.5rem"}} />
                        <p className={` ${i18n.language === 'ar' ? 'text-2xl' : 'text-xl'}`}>{t("View All Members")}</p>
                    </NavLink>

                    <NavLink to="/add-member" className="flex flex-row gap-2 items-center text-[#B0B7C4] hover:text-white hover:bg-[#4CAF50] px-3 py-2 rounded-lg transition duration-300">
                        <PersonAddAlt1Icon style={{fontSize:"1.5rem"}} />
                        <p className={` ${i18n.language === 'ar' ? 'text-2xl' : 'text-xl'}`}>{t("Add Member")}</p>
                    </NavLink>

                    <NavLink to="/memberships-ends-today" className="flex flex-row gap-2 items-center text-[#B0B7C4] hover:text-white hover:bg-[#4CAF50] px-3 py-2 rounded-lg transition duration-300">
                        <BlockIcon style={{fontSize:"1.5rem"}} />
                        <p className={` ${i18n.language === 'ar' ? 'text-2xl' : 'text-xl'}`}>{t("Memberships Ends Today")}</p>
                    </NavLink>

                    <NavLink to="/memberships-ended" className="flex flex-row gap-2 items-center text-[#B0B7C4] hover:text-white hover:bg-[#4CAF50] px-3 py-2 rounded-lg transition duration-300">
                        <BlockIcon style={{fontSize:"1.5rem"}} />
                        <p className={` ${i18n.language === 'ar' ? 'text-2xl' : 'text-xl'}`}>{t("Memberships Ended")}</p>
                    </NavLink>

                    <NavLink to="/uncompleted-paiment" className="flex flex-row gap-2 items-center text-[#B0B7C4] hover:text-white hover:bg-[#4CAF50] px-3 py-2 rounded-lg transition duration-300">
                        <BlockIcon style={{fontSize:"1.5rem"}} />
                        <p className={` ${i18n.language === 'ar' ? 'text-2xl' : 'text-xl'}`}>{t("Uncompleted Payment")}</p>
                    </NavLink>

                    <NavLink to="/take-note" className="flex flex-row gap-2 items-center text-[#B0B7C4] hover:text-white hover:bg-[#4CAF50] px-3 py-2 rounded-lg transition duration-300">
                        <NotesIcon style={{fontSize:"1.5rem"}} />
                        <p className={` ${i18n.language === 'ar' ? 'text-2xl' : 'text-xl'}`}>{t("Take Note")}</p>
                    </NavLink>

                    </div>



                </div>


                <div className='w-full min-h-[90vh] px-4 py-5 rounded-2xl flex flex-col gap-1' style={{backgroundImage: 'linear-gradient(to bottom, #33334a, #1a1f2e)', boxShadow:"1px 4px 5px rgba(0, 0, 0, 0.3)"}}>
                    <Outlet />
                </div>

            </div>
        )
    }