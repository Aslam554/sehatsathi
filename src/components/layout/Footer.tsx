import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-xl">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">SehatSathi X</span>
            </div>
            <p className="text-sm text-muted-foreground">
              From sick-care to smart-care for rural India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/features/medicine" className="text-sm text-muted-foreground hover:text-primary">
                  Medicine Status
                </Link>
              </li>
              <li>
                <Link to="/features/ambulance" className="text-sm text-muted-foreground hover:text-primary">
                  Emergency
                </Link>
              </li>
              <li>
                <Link to="/wellness" className="text-sm text-muted-foreground hover:text-primary">
                  Wellness
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features/schemes" className="text-sm text-muted-foreground hover:text-primary">
                  Health Schemes
                </Link>
              </li>
              <li>
                <Link to="/features/queues" className="text-sm text-muted-foreground hover:text-primary">
                  Queue Tokens
                </Link>
              </li>
              <li>
                <Link to="/features/disaster" className="text-sm text-muted-foreground hover:text-primary">
                  Disaster Alerts
                </Link>
              </li>
              <li>
                <Link to="/features/community" className="text-sm text-muted-foreground hover:text-primary">
                  Community Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>108 (Emergency)</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@sehatsathi.in</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Sitapur, Uttar Pradesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SehatSathi X. Built for rural India with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
