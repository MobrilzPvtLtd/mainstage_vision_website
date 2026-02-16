"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { User, Mail, Shield, CheckCircle2, XCircle } from "lucide-react";
import { Author } from "@/lib/api";

interface UsersClientProps {
    initialUsers: Author[];
}

export default function UsersClient({ initialUsers }: UsersClientProps) {
    const [users] = useState<Author[]>(initialUsers);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
                <Badge variant="outline" className="text-sm">
                    Total: {users.length}
                </Badge>
            </div>

            <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50">
                            <TableHead className="w-[200px]">User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 text-xs font-bold uppercase">
                                            {user.firstName[0]}{user.lastName[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.firstName} {user.lastName}</div>
                                            <div className="text-xs text-gray-500">@{user.username}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Mail size={14} className="text-gray-400" />
                                        {user.email}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {(user.roles || ["USER"]).map(role => (
                                            <Badge key={role} variant="secondary" className="text-[10px] uppercase font-bold">
                                                {role}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {user.isActive ? (
                                        <div className="flex items-center gap-1.5 text-green-600 text-xs font-bold">
                                            <CheckCircle2 size={14} /> Active
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-red-500 text-xs font-bold">
                                            <XCircle size={14} /> Inactive
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className="text-right text-xs text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
