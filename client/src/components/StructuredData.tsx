
import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'Article' | 'Service' | 'Organization' | 'WebPage';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    let structuredData;

    switch (type) {
      case 'Article':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "image": data.image,
          "author": {
            "@type": "Person",
            "name": data.author?.name || "Synecology Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Synecology",
            "logo": {
              "@type": "ImageObject",
              "url": "https://synecology.ru/logo.png"
            }
          },
          "datePublished": data.datePublished,
          "dateModified": data.dateModified || data.datePublished,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": window.location.href
          }
        };
        break;

      case 'Service':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.title,
          "description": data.description,
          "provider": {
            "@type": "Organization",
            "name": "Synecology",
            "url": "https://synecology.ru"
          },
          "serviceType": "Экологическое консультирование",
          "category": "Экологические услуги",
          "offers": {
            "@type": "Offer",
            "price": data.price,
            "priceCurrency": "RUB"
          }
        };
        break;

      case 'Organization':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Synecology",
          "alternateName": "Синекология",
          "url": "https://synecology.ru",
          "logo": {
            "@type": "ImageObject",
            "url": "https://synecology.ru/logo.png",
            "width": "200",
            "height": "60"
          },
          "image": "https://synecology.ru/og-image.jpg",
          "description": "Экологическое консультирование и природоохранные решения в Беларуси",
          "slogan": "Превращаем эконормы в вашу прибыль",
          "foundingDate": "2020",
          "areaServed": {
            "@type": "Country",
            "name": "Беларусь"
          },
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "53.9006",
              "longitude": "27.5590"
            },
            "geoRadius": "200000"
          },
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+375 (29) 602-42-80",
              "contactType": "Клиентская поддержка",
              "areaServed": "BY",
              "availableLanguage": ["Russian", "Belarusian"]
            }
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "пр-т. Газеты звезда д.16, пом. 53, офис 5В",
            "addressLocality": "Минск",
            "postalCode": "220117",
            "addressCountry": "BY"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Экологические услуги",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Разработка нормативов ПДВ"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Инвентаризация выбросов"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Экологический паспорт предприятия"
                }
              }
            ]
          },
          "sameAs": [
            "https://vk.com/synecology",
            "https://t.me/+375296024280"
          ],
          "knowsAbout": [
            "Экологическое консультирование",
            "Экологическая оценка",
            "Природоохранные решения",
            "Соответствие экологическим требованиям",
            "Управление отходами"
          ]
        };
        break;

      default:
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": data.title,
          "description": data.description,
          "url": window.location.href
        };
    }

    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [type, data]);

  return null;
}
