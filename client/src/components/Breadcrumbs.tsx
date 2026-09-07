import { useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import NavigationLink from "@/components/NavigationLink";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const [location] = useLocation();
  
  // Generate breadcrumbs from URL if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;
    
    const pathSegments = location.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Главная', href: '/' }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      let label = segment;
      switch (segment) {
        case 'services':
          label = 'Услуги';
          break;
        case 'about':
          label = 'О нас';
          break;
        case 'contact':
          label = 'Контакты';
          break;
        case 'blog':
          label = 'Блог';
          break;
        case 'case-studies':
          label = 'Кейсы';
          break;
        case 'faq':
          label = 'FAQ';
          break;
        default:
          label = segment.charAt(0).toUpperCase() + segment.slice(1);
      }
      
      breadcrumbs.push({
        label,
        href: currentPath
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  if (breadcrumbs.length <= 1) return null;
  
  return (
    <nav aria-label="Навигационные ссылки" className="mb-6">
      <ol 
        className="flex items-center space-x-2 text-sm text-dark-slate/70"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {breadcrumbs.map((crumb, index) => (
          <li 
            key={crumb.href}
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-2 text-dark-slate/40" />
            )}
            {index === breadcrumbs.length - 1 ? (
              <span 
                className="text-dark-slate font-medium"
                itemProp="name"
                aria-current="page"
              >
                {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
                {crumb.label}
              </span>
            ) : (
              <NavigationLink 
                href={crumb.href}
                className="hover:text-sea-green transition-colors duration-200 flex items-center"
                itemProp="item"
              >
                {index === 0 && <Home className="w-4 h-4 mr-1" />}
                <span itemProp="name">{crumb.label}</span>
              </NavigationLink>
            )}
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
