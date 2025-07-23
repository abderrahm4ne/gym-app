import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';

export default function UnCompletedPayment(){

    const navigate = useNavigate()

    const [error, setError] = useState(null);
    const [filteredMembers, setFilteredMembers] = useState([]);

    const { t, i18n } = useTranslation();       

    const fetchMembers = async () => {

        try{
            const result = await window.electron.ipcRenderer.invoke("get-members");

            if (result.success) {
                    const filtered = result.members.filter(member => {
                        return member.paidAmount < 2500
                    });
                    setFilteredMembers(filtered);
            } else {
                setError(result.error);
                console.error("Error fetching members:", error);
            }
        }
        catch(err){ 
             setError(err);
            console.error("Error fetching members:", err);
        }
    }
        
    useEffect(() => {
        fetchMembers();
    }, []);

    const formatDate = (d) => new Date(d).toISOString().split('T')[0];

    const fontCon = i18n.language === 'ar' ? '2.5rem' : '2rem'


    if(error){
        return <h1>error occured</h1>
    }


    return(
        <div className="p-6 text-white h-full ">
            <h2 className="mb-4 px-4" style={{fontSize:fontCon}}>{t('Uncompleted Payment')}</h2>

            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            {filteredMembers.length === 0 ? (
                <p className="mb-4" style={{fontSize:fontCon}}>{t('All Members has Completed Payment')}</p>
            ) : (       
                <div className="h-[90%] overflow-y-scroll p-3">

                    <table className="min-w-full text-xl text-white border border-[#00C4FF]">

                        <thead className="bg-[#2b2a2a] text-[#00C4FF] ">
                            <tr>
                                <th className="px-4 py-3">{t('First Name')}</th>
                                <th className="px-4 py-3">{t('Last Name')}</th>
                                <th className="px-4 py-3">{t('Phone')}</th>
                                <th className="px-4 py-3">{t('Membership')}</th>
                                <th className="px-4 py-3">{t('Start Date')}</th>
                                <th className="px-4 py-3">{t('End Date')}</th>
                                <th className="px-4 py-3">{t('Days Left')}</th>
                                <th className="px-4 py-3">{t('Paid Amount')}</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredMembers.map((m, index) => (
                                <tr
                                    key={index}
                                    className="border-t text-center border-[#00C4FF] hover:cursor-pointer"
                                    onClick={() =>  
                                    navigate(`/view-all-members/${m._id}`)}
                                
                                >
                                
                                    <td className="px-4 py-3">{m.firstname}</td>
                                    <td className="px-4 py-3">{m.lastname}</td>
                                    <td className="px-4 py-3">{m.phonenumber}</td>
                                    <td className="px-4 py-3">{m.membership}</td>
                                    <td className="px-4 py-3">{formatDate(m.startDate)}</td>
                                    <td className="px-4 py-3">{formatDate(m.endDate)}</td>
                                    <td className={`px-4 py-3 ${m.daysLeft < 5 && 'text-red-900 font-bold'}`}>{m.daysLeft}</td>
                                    <td className={`px-4 py-3 ${m.paidAmount < 2500 && 'text-red-900 font-bold'}`}>{m.paidAmount}</td>
                                </tr>
                                )
                            )}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    )
}