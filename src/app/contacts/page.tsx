import { readCSV } from "@/lib/csv";
import { getUsageStatus } from "@/lib/limit";
import { auth } from "@clerk/nextjs/server"; // Import nécessaire

export default async function ContactsPage() {
  // Récupérer l'ID de l'utilisateur connecté
  const { userId } = await auth();

  // Si pas d'utilisateur (ne devrait pas arriver grâce au middleware), on arrête
  if (!userId) return null;

  // On passe l'ID utilisateur à la fonction de lecture
  const status = await getUsageStatus(userId);

  // --- ÉTAT LIMITE ATTEINTE ---
  if (!status.allowed) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center border border-red-200 max-w-md">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Limite atteinte !</h2>
          <p className="mb-6 text-gray-600">
            Vous avez vu plus de {status.limit} contacts aujourd'hui.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-bold">
            Passer à la version PRO 🚀
          </button>
        </div>
      </div>
    );
  }

  // --- LE RESTE DU CODE NE CHANGE PAS ---
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
          Utilisation : {Math.min(status.count, status.limit)} / {status.limit}
        </span>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-sm text-yellow-700">
          Attention : Rafraîchir cette page consomme 10 crédits.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Prénom</th>
              <th className="p-4">Nom</th>
              <th className="p-4">Titre / Poste</th>
              <th className="p-4">Département</th>
              <th className="p-4">Email</th>
              <th className="p-4">Téléphone</th>
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
