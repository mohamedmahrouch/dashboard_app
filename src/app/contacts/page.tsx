import { readCSV } from "@/lib/csv";
import { getUsageStatus } from "@/lib/limit";

export default async function ContactsPage() {
  const status = await getUsageStatus();

  // --- LIMIT REACHED STATE ---
  if (!status.allowed) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center border border-red-200 max-w-md">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Limit Reached!</h2>
          <p className="mb-6 text-gray-600">
            You have viewed more than {status.limit} contacts today.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-bold">
            Upgrade to PRO 🚀
          </button>
        </div>
      </div>
    );
  }

  // --- DATA LOADING ---
  const contacts: any[] = await readCSV('contacts.csv');
  const itemsToShow = 10;
  
  const safeCount = Math.max(itemsToShow, status.count);
  const start = Math.max(0, safeCount - itemsToShow);
  const contactsAffiches = contacts.slice(start, safeCount);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Contacts</h1>
        <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold">
          Usage: {Math.min(status.count, status.limit)} / {status.limit}
        </span>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-sm text-yellow-700">
          Warning: Refreshing this page consumes 10 credits.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">First Name</th>
              <th className="p-4">Last Name</th>
              <th className="p-4">Title / Position</th>
              <th className="p-4">Department</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
            </tr>
          </thead>
          <tbody>
            {contactsAffiches.map((contact, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-4">{contact.first_name}</td>
                <td className="p-4 font-bold">{contact.last_name}</td>
                <td className="p-4">{contact.title}</td>
                <td className="p-4 text-gray-500">{contact.department}</td>
                <td className="p-4 text-blue-600">{contact.email}</td>
                <td className="p-4">{contact.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}