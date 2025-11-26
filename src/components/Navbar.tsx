"use client"; // Nécessaire pour usePathname
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Building2, DatabaseZap } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {}
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <DatabaseZap className="w-6 h-6 text-white" />
            </div>
            <Link href="/dashboard" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              DataDash
            </Link>
          </div>

          {}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/dashboard" className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${isActive('/dashboard')}`}>
              <LayoutDashboard size={18} />
              MyDashboard
            </Link>
            <Link href="/agencies" className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${isActive('/agencies')}`}>
              <Building2 size={18} />
              Agencies
            </Link>
            <Link href="/contacts" className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${isActive('/contacts')}`}>
              <Users size={18} />
              Contacts (Limited)
            </Link>
          </div>

          {}
          <div className="flex items-center gap-4">
            <div className="h-8 w-[1px] bg-gray-200 hidden md:block"></div>
            <UserButton appearance={{
              elements: {
                avatarBox: "w-9 h-9 border-2 border-white shadow-sm"
              }
            }} />
          </div>
        </div>
      </div>
    </nav>
  );
}