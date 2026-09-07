import { Leaf } from "lucide-react";
import NavigationLink from "./NavigationLink";
import { CONTACTS } from "@/lib/contacts";
import { trackEmailClick, trackPhoneClick } from "@/lib/analytics";
import { FEATURES } from "@/lib/features";

export default function Footer() {

  return (
    <footer className="bg-dark-slate text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-sea-green flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-heading font-bold">Synecology</span>
            </div>
            <p className="text-white/70 mb-4">Экологический консалтинг. Помогаем разобраться в законодательстве РБ.</p>
          </div>


          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <NavigationLink href="/services/emissions-inventory" className="hover:text-sea-green transition-colors">
                  Инвентаризация выбросов
                </NavigationLink>
              </li>
              <li>
                <NavigationLink href="/services/pdv-standards" className="hover:text-sea-green transition-colors">
                  Нормативы ПДВ
                </NavigationLink>
              </li>
              <li>
                <NavigationLink href="/services/ecological-passport" className="hover:text-sea-green transition-colors">
                  Экологический паспорт
                </NavigationLink>
              </li>
              <li>
                <NavigationLink href="/services/gas-treatment-passport" className="hover:text-sea-green transition-colors">
                  Паспорт газоочистной установки
                </NavigationLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <NavigationLink href="/about" className="hover:text-sea-green transition-colors">
                  О нас
                </NavigationLink>
              </li>
              {FEATURES.caseStudies && (
                <li>
                  <NavigationLink href="/case-studies" className="hover:text-sea-green transition-colors">
                    Кейсы
                  </NavigationLink>
                </li>
              )}
              {FEATURES.blog && (
                <li>
                  <NavigationLink href="/blog" className="hover:text-sea-green transition-colors">
                    Блог
                  </NavigationLink>
                </li>
              )}
              <li>
                <NavigationLink href="/contact" className="hover:text-sea-green transition-colors">
                  Контакты
                </NavigationLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="text-white/70 space-y-2">
              <p>ООО «Синэкология»</p>
              <p>УНП 193885234</p>
              <p>{CONTACTS.address}, 220117</p>
              <a
                href={`tel:${CONTACTS.phone.tel}`}
                onClick={() => trackPhoneClick("footer")}
                className="block hover:text-sea-green transition-colors"
              >
                {CONTACTS.phone.display}
              </a>
              <a
                href={`mailto:${CONTACTS.email}`}
                onClick={() => trackEmailClick("footer")}
                className="block hover:text-sea-green transition-colors"
              >
                {CONTACTS.email}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70 text-sm">
          <p>&copy; 2025 Synecology. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}