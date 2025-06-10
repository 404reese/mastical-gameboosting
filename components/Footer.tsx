import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1C] border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-impact text-lg mb-4 text-primary">Premium Gaming</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted partner for GTA5 boosting services. Fast, secure, and reliable.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-impact text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/buy/gta-5-boost" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-impact text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/buy-money-for-pc" className="text-sm text-muted-foreground hover:text-primary transition-colors">PC Money Boost</Link></li>
              <li><Link href="/buy-money-for-xbox" className="text-sm text-muted-foreground hover:text-primary transition-colors">Xbox Money Boost</Link></li>
              <li><Link href="/buy-credits-for-pc" className="text-sm text-muted-foreground hover:text-primary transition-colors">PC Credits</Link></li>
              <li><Link href="/buy-rank-boost" className="text-sm text-muted-foreground hover:text-primary transition-colors">Rank Boost</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-impact text-lg mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                support@gta5boost.com
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                24/7 Online Support
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Premium Gaming. All rights reserved. | Terms of Service | Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
}