import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    FileJson,
    PlayCircle,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function JSONIngestionPage() {
    const lastImport = {
        time: "02 Dec 2025 11:21 AM",
        status: "SUCCESS",
        duration: "4.2 sec",
    };

    const filesDetected = [
        { name: "events.json", version: "v1.4", status: "ready" },
        { name: "photos.json", version: "v1.4", status: "ready" },
        { name: "videos.json", version: "v1.4", status: "ready" },
    ];

    const importLogs = [
        {
            fileName: "events.json",
            status: "SUCCESS",
            duration: "2.1s",
            errors: "--",
            retries: 0,
            timestamp: "11:21 AM",
        },
        {
            fileName: "photos.json",
            status: "FAILED",
            duration: "--",
            errors: "Missing event_id",
            retries: 3,
            timestamp: "10:33 AM",
        },
        {
            fileName: "videos.json",
            status: "SUCCESS",
            duration: "1.6s",
            errors: "--",
            retries: 0,
            timestamp: "10:20 AM",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Bar */}
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-6">
                        <Link href="/admin" className="text-xl font-bold">
                            <span className="text-gray-900">MainStage</span>
                            <span className="text-[#e91e63]">Vision</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 hover:bg-gray-100 rounded-full">
                            🔔
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
                            <div className="w-8 h-8 bg-[#e91e63] rounded-full flex items-center justify-center text-white font-semibold">
                                A
                            </div>
                            <span className="font-medium">Admin</span>
                            <span>▼</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar - Same as dashboard */}
                <aside className="w-64 bg-white border-r min-h-screen">
                    <nav className="p-4 space-y-1">
                        <Link
                            href="/admin"
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/json-ingestion"
                            className="flex items-center gap-3 px-4 py-3 bg-[#e91e63] text-white rounded-lg font-medium"
                        >
                            <FileJson size={20} />
                            JSON Ingestion
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            JSON Ingestion
                        </h1>
                        <p className="text-gray-600">
                            Manage and monitor JSON data imports from external systems
                        </p>
                    </div>

                    {/* Last Import Summary */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="text-green-500" size={24} />
                                Last Import Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Time</div>
                                    <div className="font-semibold">{lastImport.time}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Status</div>
                                    <Badge className="bg-green-500 hover:bg-green-600">
                                        {lastImport.status}
                                    </Badge>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Duration</div>
                                    <div className="font-semibold">{lastImport.duration}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Files Detected */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Files Detected</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {filesDetected.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileJson className="text-[#e91e63]" size={24} />
                                            <div>
                                                <div className="font-semibold">{file.name}</div>
                                                <div className="text-sm text-gray-600">
                                                    {file.version}
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-green-600">
                                            Ready
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex gap-4 mb-8">
                        <Button className="bg-[#e91e63] hover:bg-[#c2185b]">
                            <PlayCircle className="mr-2" size={18} />
                            Run Import Now
                        </Button>
                        <Button variant="outline">
                            <Clock className="mr-2" size={18} />
                            View Logs
                        </Button>
                    </div>

                    {/* Import Logs */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Import Logs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                                File Name
                                            </th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                                Status
                                            </th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                                Duration
                                            </th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                                Errors
                                            </th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                                Retries
                                            </th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                                Timestamp
                                            </th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {importLogs.map((log, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4 font-medium">
                                                    {log.fileName}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {log.status === "SUCCESS" ? (
                                                        <Badge className="bg-green-500 hover:bg-green-600">
                                                            SUCCESS
                                                        </Badge>
                                                    ) : (
                                                        <Badge className="bg-red-500 hover:bg-red-600">
                                                            FAILED
                                                        </Badge>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4">{log.duration}</td>
                                                <td className="py-3 px-4">
                                                    {log.errors === "--" ? (
                                                        <span className="text-gray-400">--</span>
                                                    ) : (
                                                        <span className="text-red-600">{log.errors}</span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4">{log.retries}</td>
                                                <td className="py-3 px-4 text-gray-600">
                                                    {log.timestamp}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {log.errors !== "--" && (
                                                        <Button variant="ghost" size="sm">
                                                            View Error Details
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
