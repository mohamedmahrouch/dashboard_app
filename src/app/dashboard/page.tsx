import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <Link href="/agencies" className="block p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold mb-2">🏢 Agencies</h2>
          <p className="text-gray-600">View the complete list of agencies.</p>
        </Link>

        <Link href="/contacts" className="block p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition border-l-4 border-green-500">
          <h2 className="text-2xl font-bold mb-2">👥 Contacts</h2>
          <p className="text-gray-600">View employees (Daily limit of 50).</p>
        </Link>

      </div>
    </div>
  );
}