import SidebarClient from './SidebarClient';

const DashboardClient = () => {
  return (
    <div className="pt-16 flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <SidebarClient />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Bienvenue sur votre espace client</h1>
        <p className="text-gray-600">Consultez vos réservations, mettez à jour votre profil et explorez nos véhicules disponibles.</p>
      </main>
    </div>
  );
};

export default DashboardClient;