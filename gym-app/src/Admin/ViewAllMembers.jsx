import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ViewAllMembers() {
  const { t, i18n } = useTranslation();
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;
  const [error, setError] = useState('');
  const [searchVal, setSearchVal] = useState('');
  

  const filteredMembers = useMemo(() => {
  return members.filter((member) =>
    member.lastname.toLowerCase().includes(searchVal.toLowerCase())
    );  
  }, [searchVal, members]);

  const indexOfLast = currentPage * membersPerPage;
  const indexOfFirst = indexOfLast - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirst, indexOfLast);



  const navigate = useNavigate();

  const fetchMembers = async () => {
    const result = await window.electron.ipcRenderer.invoke('get-members');
    if (result.success) {
      setMembers(result.members);
    } else {
      setError(result.error);
      console.error('Error fetching members:', result.error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

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

  const memberCount = useMemo(() => members.length, [members]);
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
          className={`mx-1 btn px-3 py-1 rounded ${
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
 
  return (
    <div className="p-6 text-white h-full flex flex-col">
      <h1 className="text-3xl mb-4 px-4">{t('All Members')}</h1>

      {error && (
        <div className="text-red-500 font-semibold mb-2">
          {t('Error')}: {error}
        </div>
      )}

      <h2 className="text-xl mb-2 px-4">
        {t('Number Of Members ')}: {(memberCount != 1) && memberCount}{' '}
        {memberCount === 1 ? t('One Member') :
        i18n.language === 'ar' && memberCount <= 10 ? (
          'أعضاء'
        ) : i18n.language === 'ar' ? 'عضو' : 'Members'
        }
      </h2>

      <input
        className="outline-none border-[#00C4FF] border-1 rounded-md px-3 py-1 text-xl w-[37%] mx-4"
        type="text"
        name="search"
        id="search"
        placeholder={t('Search member by lastname')}
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      />
      {currentMembers.length === 0 ? (
                <p className="mb-4" style={{fontSize:fontCon}}>{t('No memberships .')}</p>
              ) : (  
        <div className="h-[90%] p-3">
          <table className="min-w-full text-xl text-white border border-[#00C4FF]">
            <thead className="bg-[#2b2a2a] text-[#00C4FF]">
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

      <div className="flex justify-center mt-4"  style={{justifySelf:"end"}}>
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
  );
}
