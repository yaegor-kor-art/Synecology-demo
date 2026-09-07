import { motion } from "framer-motion";
import { PlayCircle, ArrowRight, Phone, Factory, Recycle, FileText, Droplets, Trash2, ClipboardList, Truck, ShoppingBag, HardHat, UtensilsCrossed, Stethoscope, Wheat, Landmark, Award, Users, MapPin, ShieldCheck, Clock, TrendingUp } from "lucide-react";
import { CONTACTS, CTA_LABELS } from "@/lib/contacts";
import { trackPhoneClick } from "@/lib/analytics";
import { FEATURES } from "@/lib/features";
import { fetchDirectusCases, type CaseStudy } from "@/lib/directus";
import { useEffect, useState } from "react";
import OrganicBlob from "@/components/OrganicBlob";
import GlassmorphicCard from "@/components/GlassmorphicCard";
import StructuredData from "@/components/StructuredData";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSEO } from "@/hooks/useSEO";
import NavigationLink from "@/components/NavigationLink";

export default function Home() {
  const isMobile = useIsMobile();
  const [casePreviews, setCasePreviews] = useState<CaseStudy[]>([]);

  useEffect(() => {
    if (!FEATURES.caseStudies) return;

    fetchDirectusCases()
      .then((cases) => setCasePreviews(cases.slice(0, 3)))
      .catch(() => setCasePreviews([]));
  }, []);

  const industrySegments = [
    {
      icon: Factory,
      title: "Производственные предприятия",
      services: "НДВ, инвентаризация выбросов, экологический паспорт, паспорта ГОУ, документация по отходам, первичный учёт",
    },
    {
      icon: HardHat,
      title: "Строительные компании",
      services: "Экологическая документация, инвентаризация выбросов, обращение с отходами строительства",
    },
    {
      icon: UtensilsCrossed,
      title: "Пищевые производства",
      services: "Документация по отходам, экологический учёт, инвентаризация выбросов",
    },
    {
      icon: Truck,
      title: "Логистические компании",
      services: "Инвентаризация выбросов, обращение с маслами, аккумуляторами и шинами",
    },
    {
      icon: Stethoscope,
      title: "Медицинские организации",
      services: "Документация по отходам, экологический учёт, инвентаризация выбросов",
    },
    {
      icon: Wheat,
      title: "Сельское хозяйство",
      services: "Экологическая документация, обращение с отходами, экологический учёт",
    },
    {
      icon: Landmark,
      title: "Государственные организации",
      services: "Экологическая документация, инвентаризация выбросов и отходов, сопровождение проверок",
    },
    {
      icon: ShoppingBag,
      title: "Торговля и услуги",
      services: "Документация по отходам, паспорта вентиляции, инвентаризация выбросов",
    },
  ];

  const stats = [
    { value: "150+", label: "Проектов завершено", icon: TrendingUp },
    { value: "99%", label: "Довольных клиентов", icon: Users },
    { value: "9+", label: "Лет опыта", icon: Award },
  ];

  const advantages = [
    { icon: Award, title: "Более 10 лет опыта", text: "Практический опыт решения экологических задач для предприятий по всей Беларуси." },
    { icon: ShieldCheck, title: "Сопровождение под ключ", text: "Берём на себя полный цикл: от аудита до сдачи документов и поддержки при проверках." },
    { icon: MapPin, title: "Работа по всей Беларуси", text: "Выезжаем на объекты и сопровождаем клиентов в любом регионе страны." },
    { icon: Users, title: "Собственные эксперты", text: "Ваш проект ведут практикующие экологи, а не сторонние подрядчики." },
    { icon: ShieldCheck, title: "Помощь при проверках", text: "Готовим документы и консультируем при взаимодействии с контролирующими органами." },
    { icon: Clock, title: "Соблюдение сроков", text: "Планируем работы заранее и сдаём проекты в согласованные сроки." },
  ];

  // SEO optimization
  useSEO({
    title: "Synecology - Экологический консалтинг в Беларуси | Экологические услуги",
    description: "Экологический консалтинг для устойчивого будущего. Экспертные решения в области экологической оценки, планирования устойчивости и соответствия требованиям в Беларуси.",
    keywords: "экологический консалтинг, экологические услуги, Беларусь, Минск, экологическая оценка, ПДВ, инвентаризация выбросов, экологический паспорт, обращение с отходами",
    ogTitle: "Synecology - Экологический консалтинг в Беларуси",
    ogDescription: "Превращаем эконормы в вашу прибыль. Экологический консалтинг для устойчивого будущего в Беларуси.",
    ogImage: "https://synecology.ru/og-image.jpg",
    canonical: "https://synecology.ru/"
  });

  const handleCardClick = (e: React.MouseEvent) => {
    // Removed mobile click blocking to allow navigation
  };

  const services = [
    {
      icon: Factory,
      title: "Разработка акта инвентаризации выбросов загрязняющих веществ в атмосферный воздух",
      description: "Комплексная инвентаризация источников выбросов для соблюдения экологических нормативов.",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    },
    {
      icon: Recycle,
      title: "Разработка проекта нормативов допустимых выбросов загрязняющих веществ в атмосферный воздух",
      description: "Определение предельно допустимых концентраций выбросов для предприятий.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    },
    {
      icon: FileText,
      title: "Разработка экологического паспорта предприятия",
      description: "Составление документа, отражающего экологическое состояние и воздействие предприятия.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    },
    {
      icon: Droplets,
      title: "Разработка паспорта газоочистной установки (ГОУ)",
      description: "Техническая документация для систем очистки промышленных газов.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    },
    {
      icon: Trash2,
      title: "Разработка инструкции по обращению с отходами",
      description: "Правила и процедуры безопасного обращения с промышленными отходами.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    },
    {
      icon: ClipboardList,
      title: "Ведение книг и журналов учета в области экологии",
      description: "Ведение обязательной экологической отчетности и документооборота.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    },
  ];

  return (
    <>
      <StructuredData
        type="Organization"
        data={{}}
      />
      <StructuredData
        type="WebPage"
        data={{
          title: "Synecology - Экологический консалтинг в Беларуси",
          description: "Экологический консалтинг для устойчивого будущего. Экспертные решения в области экологической оценки, планирования устойчивости и соответствия требованиям в Беларуси."
        }}
      />
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-20 md:pt-0">
        <OrganicBlob className="absolute top-20 right-20 opacity-20" size="lg" />
        <OrganicBlob className="absolute bottom-20 left-20 opacity-15" size="md" delay={3} />

        <div
          className="absolute inset-0 parallax-bg opacity-60"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <motion.div
                className="bg-white/85 backdrop-blur-md rounded-3xl p-4 md:p-8 shadow-2xl border border-white/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-dark-slate leading-tight mb-4 md:mb-6 animate-fade-in">
                  Превращаем эконормы в {" "}
                  <span className="text-sea-green">вашу прибыль</span>
                </h1>
                <p className="hero-description text-lg md:text-xl text-dark-slate/80 mb-6 md:mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  Мы не просто готовим документы. Мы находим решения, которые защищают вас от штрафов, открывают новые рынки и делают вашу компанию лидером в заботе об окружающей среде.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <a
                    href={`tel:${CONTACTS.phone.tel}`}
                    onClick={() => trackPhoneClick("hero")}
                    className="bg-sea-green text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-sea-green/90 transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm md:text-base shadow-lg hover:shadow-xl"
                  >
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    {CTA_LABELS.callNow}
                  </a>
                  <NavigationLink
                    href="/contact"
                    analyticsLabel={CTA_LABELS.consultation}
                    analyticsLocation="hero"
                    className="glassmorphic glassmorphic-hover px-6 md:px-8 py-3 md:py-4 rounded-full text-sea-green font-semibold inline-flex items-center justify-center gap-2 text-sm md:text-base border border-sea-green/30"
                  >
                    {CTA_LABELS.consultation}
                  </NavigationLink>
                  {FEATURES.caseStudies && (
                    <NavigationLink
                      href="/case-studies"
                      className="glassmorphic glassmorphic-hover px-6 md:px-8 py-3 md:py-4 rounded-full text-sea-green font-semibold inline-flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      <PlayCircle className="w-4 h-4 md:w-5 md:h-5" />
                      Наши проекты
                    </NavigationLink>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="relative mt-8 lg:mt-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="glassmorphic rounded-3xl p-4 md:p-8 transform rotate-1 md:rotate-3"
                   style={{ transition: 'transform 0.3s ease-out' }}
                   onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
                   onMouseLeave={(e) => e.currentTarget.style.transform = window.innerWidth >= 768 ? 'rotate(3deg)' : 'rotate(1deg)'}>
                <img
                    src="https://images.unsplash.com/photo-1683402964714-a161848996d0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Environmental documentation"
                    className="rounded-xl shadow-lg w-full h-auto max-h-96 md:max-h-none object-cover"
                  />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative bg-subtle-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl lg:text-5xl font-heading font-bold text-dark-slate mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Наши <span className="text-sea-green">услуги</span>
            </motion.h2>
            <motion.p
              className="text-xl text-dark-slate/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Комплексные консалтинговые услуги в области экологии, адаптированные под ваши конкретные потребности и нормативные требования.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={`service-${service.title}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02, duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.1 }}
                className="group transform-gpu"
              >
                <div
                  className="relative rounded-3xl p-6 md:p-8 h-full backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden cursor-pointer transform-gpu"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(46, 139, 87, 0.08) 50%, rgba(255, 255, 255, 0.85) 100%)",
                  }}
                >
                  {/* Декоративный элемент */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-sea-green/20 to-sea-green/5 rounded-bl-[3rem] opacity-60"></div>

                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-dark-slate leading-tight mb-4 md:mb-6 group-hover:text-sea-green transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-dark-slate/80 mb-6 md:mb-8 text-base md:text-lg leading-relaxed group-hover:text-dark-slate/90 transition-colors duration-300">
                      {service.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                      <NavigationLink
                        href="/services"
                        className="inline-flex items-center gap-3 text-sea-green font-bold text-base md:text-lg group-hover:gap-4 transition-all duration-300 group-hover:text-sea-green/80"
                      >
                        Подробнее
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                      </NavigationLink>
                      <NavigationLink
                        href="/contact"
                        analyticsLabel={CTA_LABELS.consultation}
                        analyticsLocation="home_services"
                        className="btn-primary mt-2 sm:mt-0 inline-flex items-center gap-2"
                      >
                        {CTA_LABELS.consultation}
                      </NavigationLink>
                    </div>
                  </div>

                  {/* Hover эффект */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sea-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12 md:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <NavigationLink
              href="/services"
              className="bg-white text-sea-green px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold border-2 border-sea-green hover:bg-sea-green hover:text-white transition-all duration-300 inline-flex items-center gap-2 text-sm md:text-base shadow-md hover:shadow-lg"
            >
              Все наши услуги
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </NavigationLink>
          </motion.div>
        </div>
      </section>

      {/* For Whom Section */}
      <section className="py-20 relative bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2
              className="text-4xl lg:text-5xl font-heading font-bold text-dark-slate mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Экологические услуги для <span className="text-sea-green">бизнеса</span>
            </motion.h2>
            <motion.p
              className="text-xl text-dark-slate/70 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Мы работаем с предприятиями разных отраслей — от промышленности и АПК до торговли, логистики и сферы услуг. Помогаем решать задачи по экологической документации, выбросам и обращению с отходами.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {industrySegments.map((segment, index) => (
              <motion.div
                key={segment.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <GlassmorphicCard className="h-full">
                  <div className="w-12 h-12 bg-sea-green/15 rounded-xl flex items-center justify-center mb-4">
                    <segment.icon className="w-6 h-6 text-sea-green" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-dark-slate mb-3">{segment.title}</h3>
                  <p className="text-sm text-dark-slate/70 leading-relaxed mb-4">{segment.services}</p>
                  <NavigationLink
                    href="/contact"
                    className="text-sea-green font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Получить консультацию
                    <ArrowRight className="w-4 h-4" />
                  </NavigationLink>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Advantages Section */}
      <section className="py-20 relative bg-subtle-gradient">
        <OrganicBlob className="absolute bottom-10 left-10 opacity-10" size="md" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2
              className="text-4xl lg:text-5xl font-heading font-bold text-dark-slate mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Наш опыт — <span className="text-sea-green">ваша уверенность</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <GlassmorphicCard className="text-center">
                  <stat.icon className="w-10 h-10 text-sea-green mx-auto mb-3" />
                  <div className="text-4xl font-heading font-bold text-dark-slate mb-2">{stat.value}</div>
                  <div className="text-dark-slate/70">{stat.label}</div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {advantages.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <GlassmorphicCard className="h-full">
                  <item.icon className="w-8 h-8 text-sea-green mb-4" />
                  <h3 className="text-lg font-heading font-bold text-dark-slate mb-2">{item.title}</h3>
                  <p className="text-dark-slate/70 text-sm leading-relaxed">{item.text}</p>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>

          {FEATURES.caseStudies && casePreviews.length > 0 && (
            <div>
              <h3 className="text-2xl font-heading font-bold text-dark-slate mb-6 text-center">
                Примеры наших проектов
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {casePreviews.map((caseStudy) => (
                  <NavigationLink
                    key={caseStudy.id}
                    href={`/case-studies/${caseStudy.slug}`}
                    className="block group"
                  >
                    <GlassmorphicCard className="h-full group-hover:shadow-lg transition-shadow">
                      {caseStudy.coverImage && (
                        <img
                          src={caseStudy.coverImage}
                          alt={caseStudy.title}
                          className="w-full h-40 object-cover rounded-xl mb-4"
                          loading="lazy"
                        />
                      )}
                      <h4 className="font-heading font-bold text-dark-slate group-hover:text-sea-green transition-colors mb-2">
                        {caseStudy.title}
                      </h4>
                      <p className="text-sm text-dark-slate/70 line-clamp-3">
                        {caseStudy.excerpt || caseStudy.content}
                      </p>
                    </GlassmorphicCard>
                  </NavigationLink>
                ))}
              </div>
              <div className="text-center mt-8">
                <NavigationLink
                  href="/case-studies"
                  className="text-sea-green font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Все кейсы
                  <ArrowRight className="w-5 h-5" />
                </NavigationLink>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quick CTA Section */}
      <section className="py-20 relative">
        <OrganicBlob className="absolute top-10 right-10 opacity-10" size="md" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassmorphicCard className="text-center">
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-dark-slate mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Сделайте экологию  <span className="text-sea-green">вашим преимуществом.</span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-dark-slate/70 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Правильный подход к экологии — это не затраты, а инвестиция в будущее. Давайте начнем сегодня.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <NavigationLink
                href="/contact"
                analyticsLabel={CTA_LABELS.consultation}
                analyticsLocation="home_cta"
                className="bg-sea-green text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-sea-green/90 transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm md:text-base shadow-lg hover:shadow-xl"
              >
                {CTA_LABELS.consultation}
              </NavigationLink>
              {FEATURES.caseStudies && (
                <NavigationLink
                  href="/case-studies"
                  className="glassmorphic glassmorphic-hover px-6 md:px-8 py-3 md:py-4 rounded-full text-sea-green font-semibold inline-flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  Посмотреть кейсы
                </NavigationLink>
              )}
            </motion.div>
          </GlassmorphicCard>
        </div>
      </section>
    </div>
    </>
  );
}