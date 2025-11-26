import { readCSV } from "@/lib/csv";
import { MapPin, Building2, ChevronLeft, ChevronRight, ExternalLink, Users } from "lucide-react";
import Link from "next/link";

export default async function AgenciesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {

  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const ITEMS_PER_PAGE = 20;


  const allAgencies: any[] = await readCSV('agencies.csv');

  const totalItems = allAgencies.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAgencies = allAgencies.slice(startIndex, endIndex);

  const formatPop = (num: string) => {
    if (!num) return "N/A";
    return new Intl.NumberFormat('fr-FR').format(Number(num));
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      {}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agencies</h1>
          <p className="text-gray-500 mt-1">
            Public Database • {totalItems} records found
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 transition">
            Export CSV
          </button>
        </div>
      </div>
      
      {}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Agency Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Population</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Website</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentAgencies.map((agency, index) => (
              <tr key={index} className="hover:bg-gray-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-100">
                      {agency.name?.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-900">{agency.name}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                      <MapPin size={14} className="text-gray-400" />
                      {agency.state}
                    </div>
                    {agency.county && (
                      <span className="text-xs text-gray-500 ml-5">
                        {agency.county}
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    agency.type === 'City' 
                      ? 'bg-blue-50 text-blue-700 border-blue-100' 
                      : 'bg-purple-50 text-purple-700 border-purple-100'
                  }`}>
                    <Building2 size={12} />
                    {agency.type || "Other"}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-gray-400" />
                    {formatPop(agency.population)}
                  </div>
                </td>

                <td className="px-6 py-4">
                  {agency.website ? (
                    <a 
                      href={agency.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1 hover:underline"
                    >
                      Visit <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs italic">Not available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {}
      <div className="flex items-center justify-between bg-white px-4 py-3 border border-gray-200 rounded-xl shadow-sm sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <Link
                href={currentPage > 1 ? `/agencies?page=${currentPage - 1}` : '#'}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage > 1 ? 'text-gray-500 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </Link>
              
              <Link
                href={currentPage < totalPages ? `/agencies?page=${currentPage + 1}` : '#'}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage < totalPages ? 'text-gray-500 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </nav>
          </div>
        </div>
        
        {}
        <div className="flex items-center justify-between w-full sm:hidden gap-4">
           <Link
              href={currentPage > 1 ? `/agencies?page=${currentPage - 1}` : '#'}
              className={`flex-1 text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage > 1 ? 'text-gray-700 bg-white hover:bg-gray-50' : 'text-gray-300 bg-gray-50 pointer-events-none'}`}
            >
              Previous
            </Link>
            <Link
              href={currentPage < totalPages ? `/agencies?page=${currentPage + 1}` : '#'}
              className={`flex-1 text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage < totalPages ? 'text-gray-700 bg-white hover:bg-gray-50' : 'text-gray-300 bg-gray-50 pointer-events-none'}`}
            >
              Next
            </Link>
        </div>
      </div>
    </div>
  );
}