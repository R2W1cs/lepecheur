import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function LegalPage() {
  return (
    <main className="bg-primary-light min-h-screen">
      <Navbar />
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold mb-8">Mentions Légales</h1>
        <div className="prose prose-lg text-primary-dark/70 font-body space-y-6">
          <p>
            Conformément aux dispositions de la loi, nous vous informons que le site **Le Pêcheur** est édité par :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Raison sociale :</strong> Restaurant Le Pêcheur</li>
            <li><strong>Adresse :</strong> Ezzahra, Ben Arous, Tunisie</li>
            <li><strong>Contact :</strong> +216 71 000 000</li>
          </ul>
          <h2 className="text-2xl font-bold text-primary-dark pt-4">Hébergement</h2>
          <p>Le site est hébergé par Vercel Inc., situé à San Francisco, CA.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
