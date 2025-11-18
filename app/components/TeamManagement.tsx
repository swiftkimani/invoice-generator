// components/TeamManagement.tsx
'use client';

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'staff';
    permissions: string[];
}

export default function TeamManagement() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Team Members</h3>
            {teamMembers.map(member => (
                <div key={member.id} className="flex justify-between items-center p-3 border-b">
                    <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.email} • {member.role}</p>
                    </div>
                    <button className="text-red-600 hover:text-red-800">Remove</button>
                </div>
            ))}
        </div>
    );
}