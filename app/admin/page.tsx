import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  FileJson,
  AlertCircle,
  Calendar,
  Image,
  Video,
  Newspaper,
  PlayCircle,
  Plus,
  Settings,
} from "lucide-react";

export default function AdminDashboard() {
  // TODO: Add authentication check
  // const session = await getServerSession();
  // if (!session) redirect("/admin/login");

  // Mock data - replace with real data from database
  const lastImport = {
    time: "02 Dec 2025 - 11:21 AM",
    status: "SUCCESS",
    schemaVersion: "v1.4",
    duration: "4.2 sec",
  };

  const quickStats = {
    events: 82,
    photos: 14560,
    videos: 380,
    news: 112,
  };

  const recentFailures = [
    {
      file: "photos.json",
      error: "Missing field: event_id",
      time: "10:33 AM",
    },
    {
      file: "videos.json",
      error: "Invalid URL format",
      time: "10:25 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold">
              <span className="text-gray-900">MainStage</span>
              <span className="text-[#e91e63]">Vision</span>
            </h1>
            <input
              type="search"
              placeholder="Search..."
              className="px-4 py-2 border rounded-lg w-64"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              🔔
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen">
          <nav className="p-4 space-y-1">
            <a
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 bg-[#e91e63] text-white rounded-lg font-medium"
            >
              <Database size={20} />
              Dashboard
            </a>
            <a
              href="/admin/events"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg"
            >
              <Calendar size={20} />
              Events
            </a>
            <a
              href="/admin/media"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg"
            >
              <Image size={20} />
              Media Library
            </a>
            <a
              href="/admin/news"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg"
            >
              <Newspaper size={20} />
              News
            </a>
            <a
              href="/admin/ads"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg"
            >
              <PlayCircle size={20} />
              Ad Management
            </a>
            <a
              href="/admin/users"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg"
            >
              <Settings size={20} />
              Users
            </a>
            <a
              href="/admin/settings"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg"
            >
              <Settings size={20} />
              Settings
            </a>
            <a
              href="/admin/json-ingestion"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg"
            >
              <FileJson size={20} />
              JSON Ingestion
            </a>
            <a
              href="/admin/audit-logs"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg"
            >
              <AlertCircle size={20} />
              Audit Logs
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* JSON Ingestion Status Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileJson className="text-[#e91e63]" size={24} />
                  JSON Ingestion Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Import:</span>
                    <span className="font-medium">{lastImport.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge className="bg-green-500 hover:bg-green-600">
                      {lastImport.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Schema Version:
                    </span>
                    <span className="font-medium">
                      {lastImport.schemaVersion}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="font-medium">{lastImport.duration}</span>
                  </div>
                  <Button className="w-full bg-[#e91e63] hover:bg-[#c2185b] mt-4">
                    <PlayCircle className="mr-2" size={18} />
                    Run Import Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {quickStats.events}
                    </div>
                    <div className="text-sm text-gray-600">Events</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">
                      {quickStats.photos.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Photos</div>
                  </div>
                  <div className="p-4 bg-pink-50 rounded-lg">
                    <div className="text-3xl font-bold text-pink-600">
                      {quickStats.videos}
                    </div>
                    <div className="text-sm text-gray-600">Videos</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600">
                      {quickStats.news}
                    </div>
                    <div className="text-sm text-gray-600">News</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Import Failures */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="text-red-500" size={24} />
                Recent Import Failures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        File
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Error
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentFailures.map((failure, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">
                          {failure.file}
                        </td>
                        <td className="py-3 px-4 text-red-600">
                          {failure.error}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {failure.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-auto py-4 flex-col gap-2"
                >
                  <Plus size={24} />
                  <span>Create News Article</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex-col gap-2"
                >
                  <Settings size={24} />
                  <span>Manage Ad Zones</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex-col gap-2"
                >
                  <FileJson size={24} />
                  <span>SEO Defaults</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
