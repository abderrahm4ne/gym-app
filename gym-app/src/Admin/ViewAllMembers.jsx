import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function ViewAllMembers() {

    const [members, setMembers] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const fetchMembers = async () => {
        const result = await window.electron.ipcRenderer.invoke("get-members");
        if (result.success) {
            setMembers(result.members);
        } else {
            setError(result.error);
            console.error("Error fetching members:", result.error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const formatDate = (d) => new Date(d).toISOString().split('T')[0];
    
    return (
        <div className="p-6 text-white h-full ">
      <h1 className="text-3xl mb-4 px-4">All Members</h1>

      {error && (
        <div className="text-red-500 font-semibold mb-2">
          Error: {error}
        </div>
      )}
      <h2 className="text-xl mb-2 px-4"> Number Of Members : {members.length} {members.length <= 1 ? 'Member' : 'Members'}</h2>

      <input className='outline-none border-[#00C4FF] border-1 rounded-md px-3 py-1 text-xl w-[37%] mx-4' type="text" name="search" id="search" placeholder='SEARCH MEMBER BY LASTNAME'/>
      <div className="h-[90%] overflow-y-scroll p-3">
        <table className="min-w-full text-xl text-white border border-[#00C4FF]">
          <thead className="bg-[#2b2a2a] text-[#00C4FF] ">
            <tr className=''>
              <th className="px-4 py-3 ">First Name</th>
              <th className="px-4 py-3">Last Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Membership</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">End Date</th>
              <th className="px-4 py-3">Days Left</th>
              <th className="px-4 py-3">Paid Amount</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, index) => (
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
    </div>
    )
}