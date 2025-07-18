import { useEffect, useState } from "react";

export default function MembershipsEndsToday() {

    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);


    const fetchMembers = async () => {

        const result = await window.electron.ipcRenderer.invoke("get-members");
            console.log(' fetched data : ', result)
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

    return (
        <div>
            <h2>Memberships Ending Today</h2>
            
                    {members.map( member => {
                       return member.firstname
                    })}
            
        </div>
    )
}