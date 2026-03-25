import Link from "next/link";
import { Facebook, Instagram, Phone, MapPin, Mail, MessageSquare } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-primary-light pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Brand & Social */}
        <div className="space-y-6">
          <h2 className="text-3xl font-heading font-bold">LE PÊCHEUR</h2>
          <p className="font-body text-primary-light/70 max-w-xs">
            La marée la plus fraîche, servie au bord de la mer — jour et nuit. Une tradition méditerranéenne depuis plus de 20 ans.
          </p>
          <div className="flex gap-4">
            <Link href="https://www.facebook.com/people/Restaurant-Le-P%C3%A9cheur/100070393052917/" target="_blank" className="hover:text-accent-gold transition-colors">
              <Facebook size={24} />
            </Link>
            <Link href="#" className="hover:text-accent-gold transition-colors">
              <Instagram size={24} />
            </Link>
            <Link href="https://wa.me/21626000000" className="hover:text-accent-gold transition-colors">
              <MessageSquare size={24} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-heading font-semibold text-accent-gold">Lien Rapides</h3>
          <ul className="space-y-4 font-body">
            <li><Link href="/menu" className="hover:underline">Le Menu</Link></li>
            <li><Link href="/reservation" className="hover:underline">Réservations</Link></li>
            <li><Link href="/galerie" className="hover:underline">Galerie</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-heading font-semibold text-accent-gold">Contact</h3>
          <ul className="space-y-4 font-body">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="shrink-0 text-accent-gold" />
              <span>Rue 2 Mars 1934, Ez Zahra, Ben Arous, Tunisie</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="shrink-0 text-accent-gold" />
              <a href="tel:+21671000000" className="hover:underline">+216 71 000 000</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="shrink-0 text-accent-gold" />
              <a href="mailto:contact@lepecheur.tn" className="hover:underline">contact@lepecheur.tn</a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div className="space-y-6">
          <h3 className="text-xl font-heading font-semibold text-accent-gold">Horaires</h3>
          <div className="p-4 border border-accent-gold/30 rounded-lg">
            <p className="text-2xl font-heading font-bold mb-1">24h/24</p>
            <p className="text-sm opacity-70">7 jours sur 7, 365 jours par an</p>
          </div>
          <Link href="/reservation" className="btn-primary block text-center py-3 text-base">
            Réserver maintenant
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm opacity-50">
        <p>© {currentYear} Restaurant Le Pêcheur. Tous droits réservés.</p>
        <div className="flex gap-8">
          <Link href="/legal">Mentions Légales</Link>
          <Link href="/privacy">Politique de Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
