import { useEffect, useState } from "react";

export default function MembershipsEndsToday() {

    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);

    const [filteredMembers, setFilteredMembers] = useState([]);

    const fetchMembers = async () => {

        try{
            const result = await window.electron.ipcRenderer.invoke("get-members");

            if (result.success) {
                    setMembers(result.members);
                    console.log(result.members)
                    const today = new Date().toISOString().split("T")[0];
                    const filtered = result.members.filter(member => {
                        const endDate = new Date(member.endDate).toISOString().split("T")[0];
                        return endDate === today;
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

    return (
        <div>
            <h2>Memberships Ending Today</h2>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {filteredMembers.length === 0 ? (
                <p>No memberships ending today.</p>
            ) : (
                <ul>
                    {filteredMembers.map((member, index) => (
                        <li key={index}>
                            {member.firstname} - Ends:
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}