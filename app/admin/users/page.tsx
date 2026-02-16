import UsersClient from "./users-client";
import { Author } from "@/lib/api";

// Mock data based on the structure returned by the API
const mockUsers: Author[] = [
    {
        id: 7,
        username: "gunther",
        email: "gunther@mainstage.vision",
        firstName: "Gunther",
        lastName: "Example",
        isActive: true,
        mustChangePassword: false,
        createdAt: new Date().toISOString(),
        roles: ["ADMIN", "EDITOR"],
        emailPreferences: {
            newEvents: true,
            applicationUpdates: true,
            eventStatusChanges: true,
            assignmentNotifications: true
        }
    }
];

export default function AdminUsersPage() {
    return <UsersClient initialUsers={mockUsers} />;
}
