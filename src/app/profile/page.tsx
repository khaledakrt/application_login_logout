import Header from "@/components/Header";
import { apiGetAuthUser } from "@/lib/api-requests";
import { cookies } from "next/headers";
import { AuthPageInvisible } from "@/lib/protect-page";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const user = await apiGetAuthUser(token?.value);
  // Exemple de données pour le tableau
  const vmData = [
    { matiere: "Mathématiques", nomVM: "VM1", adresseIP: "192.168.1.101" },
    { matiere: "Physique", nomVM: "VM2", adresseIP: "192.168.1.102" },
    { matiere: "Chimie", nomVM: "VM3", adresseIP: "192.168.1.103" },
  ];

  return (
    <>
      <Header />
      <section className="bg-ct-blue-600 min-h-screen pt-20 flex justify-start items-start">
        <div className="bg-ct-dark-100 h-[20rem] flex justify-start items-start p-8">
          <div className="flex items-center">
            <p className="mb-3 text-5xl text-left font-semibold">
              Profile 
            </p>
            <div className="bg-white w-px h-24 mx-4"></div>
            <div className="mt-8 text-left">
              <p className="mb-3">Id: {user.id}</p>
              <p className="mb-3">Name: {user.name}</p>
              <p className="mb-3">Email: {user.email}</p>
              <p className="mb-3">Role: {user.role}</p>
              <p className="mb-3">Verified: {String(user.verified)}</p>
            </div>
          </div>
        </div>
        <div className="bg-black w-2 h-16"></div>
        <div className="bg-ct-gray-100 h-[20rem] flex flex-col justify-start items-start p-8">
          <p className="mb-3 text-5xl text-left font-semibold">Travail</p>
          <div className="mt-4 w-full">
            <table className="min-w-full bg-white border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Matière</th>
                  <th className="border border-gray-300 px-4 py-2">Nom de la VM</th>
                  <th className="border border-gray-300 px-4 py-2">Adresse IP</th>
                </tr>
              </thead>
              <tbody>
                {vmData.map((data, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="border border-gray-300 px-4 py-2">{data.matiere}</td>
                    <td className="border border-gray-300 px-4 py-2">{data.nomVM}</td>
                    <td className="border border-gray-300 px-4 py-2">{data.adresseIP}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      <AuthPageInvisible />
    </>
  );
}
