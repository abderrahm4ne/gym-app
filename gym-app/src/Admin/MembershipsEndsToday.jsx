import { useEffect, useState, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router";

export default function MembershipsEndsToday() {
    
    const navigate = useNavigate()

    const [error, setError] = useState(null);

    const [filteredMembers, setFilteredMembers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const membersPerPage = 10;

    const { t, i18n } = useTranslation();       

    const fetchMembers = async () => {

        try{
            const result = await window.electron.ipcRenderer.invoke("get-members");

            if (result.success) {
                    const today = new Date().toISOString().split("T")[0];
                    const filtered = result.members.filter(member => {
                        const endDate = new Date(member.endDate).toISOString().split("T")[0];
                        return endDate === today;
                    });
                    
                    setFilteredMembers(filtered);
            } else {
                const alertMessage = i18n.language === 'ar' ? 'خطأ في جلب الأعضاء:خطأ في جلب الأعضاء:' : 'Error fetching members:'
                setError(result.error);
                console.error(alertMessage, error);
            }
        }
        catch(err){
            const alertMessage = i18n.language === 'ar' ? 'خطأ في جلب الأعضاء:خطأ في جلب الأعضاء:' : 'Error fetching members:'
            setError(err);
            console.error(alertMessage, err);
        }
    }
        
    useEffect(() => {
        fetchMembers();
    }, []);

    const indexOfLast = currentPage * membersPerPage;
    const indexOfFirst = indexOfLast - membersPerPage;
    const currentMembers = filteredMembers.slice(indexOfFirst, indexOfLast);

    const formatDate = (d) => new Date(d).toISOString().split('T')[0];


    const memberRows = useMemo(() => {
                return currentMembers.map((m, index) => (
                        <tr
                        key={index}
                        className="border-t text-center border-[#00C4FF] hover:cursor-pointer"
                        onClick={() => navigate(`/view-all-members/${m._id}`)}
                        >
                        <td className="px-4 py-3">{m.firstname}</td>
                        <td className="px-4 py-3">{m.lastname}</td>
                        <td className="px-4 py-3">{m.phonenumber}</td>
                        <td className="px-4 py-3">{m.membership}</td>
                        <td className="px-4 py-3">{formatDate(m.startDate)}</td>
                        <td className="px-4 py-3">{formatDate(m.endDate)}</td>
                        <td
                            className={`px-4 py-3 ${
                            m.daysLeft < 3 && 'text-red-900 font-bold'
                            }`}
                        >
                            {m.daysLeft}
                        </td>
                        <td
                            className={`px-4 py-3 ${
                            m.paidAmount < 2500 && 'text-red-900 font-bold'
                            }`}
                        >
                            {m.paidAmount}
                        </td>
                        </tr>
                    ))}
            , [currentMembers]);

    const memberCount = useMemo(() => filteredMembers.length, [filteredMembers]);
    const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

    const paginationButtons = useMemo(() => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisiblePages) {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;
      
      if (currentPage <= maxPagesBeforeCurrent) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - maxPagesAfterCurrent) {
        startPage = totalPages - maxVisiblePages + 1;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className={`mx-1 btn px-3 py-1 rounded ${
            currentPage === 1
              ? 'bg-[#00C4FF] text-white'
              : 'bg-gray-700 text-white'
          }`}
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis-start" className="mx-1 px-1">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === i
              ? 'bg-[#00C4FF] text-white'
              : 'bg-gray-700 text-white'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis-end" className="mx-1 px-1">
            ...
          </span>
        );
      }
      
      buttons.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={`mx-1 btn px-3 py-1 rounded ${
            currentPage === totalPages
              ? 'bg-[#00C4FF] text-white'
              : 'bg-gray-700 text-white'
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
    }, [currentPage, totalPages]);



    

    const fontCon = i18n.language === 'ar' ? '2.5rem' : '2rem'
    const fontSz = i18n.language === 'ar' ? '1.5rem' : '1.2rem'

    if(error){
        return <h1>error occured</h1>
    }

    return (
        <div className="p-6 text-white h-full ">
            <h2 className="mb-4 px-4" style={{fontSize:fontCon}}>{t('Memberships Ending Today')}</h2>

            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <h2 className="mb-2 px-4" style={{fontSize:fontSz}}>
                {t('Number Of Memberships Who Ends Today ')} : {memberCount}
            </h2>

            {filteredMembers.length === 0 ? (
                    <p className="mb-4" style={{fontSize:fontCon}}>{t('No memberships ending today.')}</p>
            ) : ( 
                    
                    <div className="h-[90%] p-3">

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

                                {memberRows}
                            </tbody>

                        </table>
                    </div>
            )}


            <div className="flex justify-center mt-4" style={{justifySelf:"end"}}>
                {totalPages > 0 && (
                    <div className="flex justify-center items-center">
                        <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`mx-1 btn px-3 py-1 rounded ${
                            currentPage === 1
                            ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                            : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                        >
                        {'<-'}
                        </button>
                        
                        {paginationButtons}
                        
                        <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`mx-1 btn px-3 py-1 rounded ${
                            currentPage === totalPages
                            ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                            : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                        >
                        {'->'}
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}