import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function PrivacyPage() {
  return (
    <main className="bg-primary-light min-h-screen">
      <Navbar />
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold mb-8">Politique de Confidentialité</h1>
        <div className="prose prose-lg text-primary-dark/70 font-body space-y-6">
          <p>
            Nous attachons une grande importance à la protection de vos données personnelles.
          </p>
          <h2 className="text-2xl font-bold text-primary-dark pt-4">Collecte des données</h2>
          <p>
            Les informations recueillies via le formulaire de réservation (nom, téléphone, date) sont uniquement utilisées pour la gestion de votre table.
          </p>
          <h2 className="text-2xl font-bold text-primary-dark pt-4">Utilisation</h2>
          <p>
            Vos données ne sont jamais partagées avec des tiers à des fins commerciales. Elles sont transmises de manière sécurisée à notre équipe via le service Resend.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
