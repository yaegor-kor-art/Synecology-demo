import { Link, useLocation } from "wouter";
import { Leaf, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavigationLink from "./NavigationLink";
import ContactQuickLinks from "./ContactQuickLinks";
import { CONTACTS, CTA_LABELS } from "@/lib/contacts";
import { trackPhoneClick } from "@/lib/analytics";
import { FEATURES } from "@/lib/features";

export default function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navLinkClass = (href: string) =>
    `whitespace-nowrap text-sm 2xl:text-base text-dark-slate hover:text-sea-green transition-colors ${
      location === href ? "text-sea-green font-semibold" : ""
    }`;

  const mobileNavLinkClass = (href: string) =>
    `block text-dark-slate hover:text-sea-green transition-colors py-3 px-2 rounded-lg ${
      location === href ? "text-sea-green font-semibold bg-sea-green/10" : ""
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glassmorphic border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 min-w-0 gap-2 sm:gap-3">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0" onClick={handleLogoClick}>
            <div className="w-8 h-8 bg-sea-green rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg md:text-xl font-heading font-bold text-dark-slate">
              Synecology
            </span>
          </Link>

          <nav
            className="hidden lg:flex flex-1 items-center justify-center gap-2 xl:gap-3 2xl:gap-5 min-w-0 px-1"
            role="navigation"
            aria-label="Основная навигация"
          >
            <NavigationLink href="/" className={navLinkClass("/")}>Главная</NavigationLink>
            <NavigationLink href="/services" className={navLinkClass("/services")}>Услуги</NavigationLink>
            {FEATURES.caseStudies && (
              <NavigationLink href="/case-studies" className={navLinkClass("/case-studies")}>Кейсы</NavigationLink>
            )}
            {FEATURES.blog && (
              <NavigationLink href="/blog" className={navLinkClass("/blog")}>Блог</NavigationLink>
            )}
            <NavigationLink href="/about" className={navLinkClass("/about")}>О нас</NavigationLink>
            <NavigationLink href="/contact" className={navLinkClass("/contact")}>Контакты</NavigationLink>
          </nav>

          <div className="flex items-center gap-1 sm:gap-1.5 xl:gap-2 flex-shrink-0 ml-auto lg:ml-0">
            <ContactQuickLinks
              variant="header"
              messengersOnly
              className="flex lg:hidden shrink-0"
            />
            <ContactQuickLinks variant="header" className="hidden lg:flex shrink-0" />

            <a
              href={`tel:${CONTACTS.phone.tel}`}
              onClick={() => trackPhoneClick("header_cta")}
              className="hidden lg:inline-flex items-center gap-1.5 border border-sea-green text-sea-green px-2.5 xl:px-3 py-2 rounded-full font-semibold hover:bg-sea-green hover:text-white transition-all duration-300 text-sm whitespace-nowrap shrink-0"
              aria-label={`${CTA_LABELS.callNow}: ${CONTACTS.phone.display}`}
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span className="hidden 2xl:inline">{CTA_LABELS.callNow}</span>
            </a>

            <NavigationLink
              href="/contact"
              analyticsLabel={CTA_LABELS.consultation}
              analyticsLocation="header"
              className="hidden lg:inline-flex bg-sea-green text-white px-3 xl:px-4 2xl:px-5 py-2 rounded-full font-semibold hover:bg-sea-green/90 transition-all duration-300 text-sm whitespace-nowrap shrink-0"
            >
              {CTA_LABELS.consultation}
            </NavigationLink>

            <a
              href={`tel:${CONTACTS.phone.tel}`}
              onClick={() => trackPhoneClick("header_mobile_icon")}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-sea-green"
              aria-label={CTA_LABELS.callNow}
            >
              <Phone className="w-5 h-5" />
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-dark-slate" />
              ) : (
                <Menu className="w-5 h-5 text-dark-slate" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glassmorphic border-t border-white/20"
          >
            <div className="px-4 py-6 space-y-4">
              <NavigationLink href="/" className={mobileNavLinkClass("/")} onClick={() => setIsMenuOpen(false)}>
                Главная
              </NavigationLink>
              <NavigationLink href="/services" className={mobileNavLinkClass("/services")} onClick={() => setIsMenuOpen(false)}>
                Услуги
              </NavigationLink>
              {FEATURES.caseStudies && (
                <NavigationLink href="/case-studies" className={mobileNavLinkClass("/case-studies")} onClick={() => setIsMenuOpen(false)}>
                  Кейсы
                </NavigationLink>
              )}
              {FEATURES.blog && (
                <NavigationLink href="/blog" className={mobileNavLinkClass("/blog")} onClick={() => setIsMenuOpen(false)}>
                  Блог
                </NavigationLink>
              )}
              <NavigationLink href="/about" className={mobileNavLinkClass("/about")} onClick={() => setIsMenuOpen(false)}>
                О нас
              </NavigationLink>
              <NavigationLink href="/contact" className={mobileNavLinkClass("/contact")} onClick={() => setIsMenuOpen(false)}>
                Контакты
              </NavigationLink>

              <div className="pt-2 border-t border-white/20">
                <ContactQuickLinks variant="mobile" className="flex-col items-start gap-3" />
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <a
                  href={`tel:${CONTACTS.phone.tel}`}
                  onClick={() => {
                    trackPhoneClick("mobile_menu");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full border border-sea-green text-sea-green px-6 py-3 rounded-full font-semibold hover:bg-sea-green hover:text-white transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  {CTA_LABELS.callNow}
                </a>
                <NavigationLink
                  href="/contact"
                  analyticsLabel={CTA_LABELS.consultation}
                  analyticsLocation="mobile_menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full bg-sea-green text-white px-6 py-3 rounded-full font-semibold hover:bg-sea-green/90 transition-all duration-300 text-center"
                >
                  {CTA_LABELS.consultation}
                </NavigationLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
