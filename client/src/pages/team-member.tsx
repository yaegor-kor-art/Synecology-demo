import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { Mail, Phone, MapPin, Clock, Award, FileText, ArrowRight, Quote, X, Users } from "lucide-react";
import OrganicBlob from "@/components/OrganicBlob";
import GlassmorphicCard from "@/components/GlassmorphicCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import NavigationLink from "@/components/NavigationLink";
import { trackEmailClick, trackPhoneClick } from "@/lib/analytics";
import { FEATURES } from "@/lib/features";


export default function TeamMember() {
  const { slug } = useParams();
  const [member, setMember] = useState<any>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  const teamMembers = {
    "egor-koryakin": {
      name: "Корякин Егор Дмитриевич",
      role: "Директор",
      quote: "Экологическая ответственность и инновационные решения — основа устойчивого развития. Реальные изменения возможны только через грамотное управление ресурсами, профессиональный подход и системную работу.",
      bio: "Стратегическое руководство компанией и контроль реализации экологических проектов. Разработка и внедрение программ природопользования и охраны окружающей среды в соответствии с требованиями законодательства. Координация взаимодействия с органами власти, включая Минприроды.",
      image: "https://i.ibb.co/0RCtbCgY/5192954527513441803-1-1.jpg",
      expertise: [
        "Стратегическое руководство компанией",
        "Разработка программ природопользования и охраны окружающей среды",
        "Координация взаимодействия с органами власти",
        "Управление бюджетом и ресурсами",
        "Анализ рынка экологических услуг",
        "Руководство командой специалистов",
        "Контроль соблюдения экологических стандартов"
      ],
      approach: "Более 100 успешно реализованных проектов, повышение экологической эффективности предприятий-партнеров и вклад в устойчивое развитие региона. Реальные изменения возможны только через грамотное управление ресурсами, профессиональный подход и системную работу.",
      keyProjects: [
        {
          title: "Экологическое сопровождение производства спешлти кофе",
          role: "Директор проекта",
          description: "Разработка полного комплекса экологической документации для производства премиального кофе с получением всех необходимых разрешений",
          link: "/case-studies/coffee-environmental-documentation"
        }
      ],
      articles: [
        {
          title: "Экосертификат для бизнеса в Беларуси: как подтвердить «зеленый» статус и обойти конкурентов",
          link: "/blog/eco-certification-business-belarus"
        },
        {
          title: "Выбросы в атмосферу в Беларуси: как легально работать и не платить лишнего",
          link: "/blog/atmospheric-emissions-belarus"
        },
        {
          title: "Отходы на предприятии в Беларуси: полное руководство по обращению от А до Я",
          link: "/blog/waste-management-enterprise-belarus"
        }
      ],
      contact: {
        email: "synecology@yandex.by",
        phone: "+375 (29) 602-42-80"
      },
      experience: "100+ проектов",
      education: "Магистр экологии и природопользования"
    },
    "inna-voloshko": {
      name: "Волошко Инна Владимировна",
      role: "Директор",
      quote: "Экологическая ответственность и инновационные решения — основа устойчивого развития. Реальные изменения возможны только через грамотное управление ресурсами, профессиональный подход и системную работу.",
      bio: "Стратегическое руководство компанией и контроль реализации экологических проектов. Разработка и внедрение программ природопользования и охраны окружающей среды в соответствии с требованиями законодательства. Координация взаимодействия с органами власти, включая Минприроды.",
      image: "https://i.ibb.co/0RCtbCgY/5192954527513441803-1-1.jpg",
      expertise: [
        "Стратегическое руководство компанией",
        "Разработка программ природопользования и охраны окружающей среды",
        "Координация взаимодействия с органами власти",
        "Управление бюджетом и ресурсами",
        "Анализ рынка экологических услуг",
        "Руководство командой специалистов",
        "Контроль соблюдения экологических стандартов"
      ],
      approach: "Более 100 успешно реализованных проектов, повышение экологической эффективности предприятий-партнеров и вклад в устойчивое развитие региона. Реальные изменения возможны только через грамотное управление ресурсами, профессиональный подход и системную работу.",
      keyProjects: [
        {
          title: "Экологическое сопровождение производства спешлти кофе",
          role: "Директор проекта",
          description: "Разработка полного комплекса экологической документации для производства премиального кофе с получением всех необходимых разрешений",
          link: "/case-studies/coffee-environmental-documentation"
        }
      ],
      articles: [
        {
          title: "Экосертификат для бизнеса в Беларуси: как подтвердить «зеленый» статус и обойти конкурентов",
          link: "/blog/eco-certification-business-belarus"
        },
        {
          title: "Выбросы в атмосферу в Беларуси: как легально работать и не платить лишнего",
          link: "/blog/atmospheric-emissions-belarus"
        },
        {
          title: "Отходы на предприятии в Беларуси: полное руководство по обращению от А до Я",
          link: "/blog/waste-management-enterprise-belarus"
        }
      ],
      contact: {
        email: "synecology@yandex.by",
        phone: "+375 (29) 602-42-80"
      },
      experience: "100+ проектов",
      education: "Магистр экологии и природопользования"
    },
  };

  useEffect(() => {
    if (slug) {
      setMember(teamMembers[slug as keyof typeof teamMembers] || null);
    }
  }, [slug]);

  if (!member) {
    return (
      <div className="pt-24 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-heading font-bold text-dark-slate mb-4">
            Специалист не найден
          </h1>
          <Link href="/about" className="text-sea-green hover:underline">
            ← Вернуться к команде
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <OrganicBlob className="absolute top-10 right-10 opacity-15" size="lg" />
        <OrganicBlob className="absolute bottom-10 left-10 opacity-10" size="md" delay={2} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <BackButton />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="w-80 h-80 bg-sea-green/20 rounded-3xl shadow-2xl mx-auto lg:mx-0 flex items-center justify-center">
                  <Users className="w-32 h-32 text-sea-green" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl lg:text-6xl font-heading font-bold text-dark-slate mb-4">
                {member.name}
              </h1>
              <p className="text-2xl text-sea-green font-semibold mb-6">
                {member.role}
              </p>

              <div className="glassmorphic p-6 rounded-2xl mb-8">
                <Quote className="w-8 h-8 text-sea-green/50 mb-4" />
                <p className="text-lg text-dark-slate italic leading-relaxed">
                  {member.quote}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="glassmorphic p-4 rounded-xl">
                  <Mail className="w-5 h-5 text-sea-green mb-2" />
                  <p className="text-sm text-dark-slate/70">Email</p>
                  <a
                    href={`mailto:${member.contact.email}`}
                    onClick={() => trackEmailClick("team_member_profile")}
                    className="text-dark-slate font-medium hover:text-sea-green transition-colors"
                  >
                    {member.contact.email}
                  </a>
                </div>
                <div className="glassmorphic p-4 rounded-xl">
                  <Phone className="w-5 h-5 text-sea-green mb-2" />
                  <p className="text-sm text-dark-slate/70">Телефон</p>
                  <a
                    href={`tel:${member.contact.phone}`}
                    onClick={() => trackPhoneClick("team_member_profile")}
                    className="text-dark-slate font-medium hover:text-sea-green transition-colors"
                  >
                    {member.contact.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialization Section */}
      <section className="py-20 bg-gradient-to-b from-off-white to-soft-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-heading font-bold text-dark-slate mb-8 text-center">
              Моя <span className="text-sea-green">специализация</span>
            </h2>

            <GlassmorphicCard className="mb-8">
              <p className="text-lg text-dark-slate/80 leading-relaxed mb-6">
                {member.bio}
              </p>

              <h3 className="text-2xl font-heading font-bold text-dark-slate mb-4">
                Ключевые компетенции:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {member.expertise.map((skill: string, index: number) => (
                  <div key={skill} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sea-green rounded-full flex-shrink-0" />
                    <span className="text-dark-slate">{skill}</span>
                  </div>
                ))}
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>



      {/* Key Projects Section - только если есть проекты */}
      {FEATURES.caseStudies && member.keyProjects && member.keyProjects.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-off-white to-soft-blue/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-heading font-bold text-dark-slate mb-8 text-center">
                Проекты, которыми <span className="text-sea-green">я горжусь</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {member.keyProjects.map((project: any, index: number) => (
                  <GlassmorphicCard key={project.title} delay={index * 0.1}>
                    <h3 className="text-xl font-heading font-bold text-dark-slate mb-3">
                      {project.title}
                    </h3>
                    <p className="text-sea-green font-semibold mb-3">
                      {project.role}
                    </p>
                    <p className="text-dark-slate/70 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <Link
                      href={project.link}
                      className="inline-flex items-center gap-2 text-sea-green font-semibold hover:text-sea-green/80 transition-colors"
                    >
                      Узнать подробнее <ArrowRight className="w-4 h-4" />
                    </Link>
                  </GlassmorphicCard>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles Section */}
      {FEATURES.blog && (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-heading font-bold text-dark-slate mb-8 text-center">
              Делюсь <span className="text-sea-green">опытом</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {member.articles.map((article: any, index: number) => (
                <GlassmorphicCard key={article.title} delay={index * 0.1}>
                  <div className="flex items-start gap-4">
                    <FileText className="w-6 h-6 text-sea-green flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-dark-slate mb-2">
                        {article.title}
                      </h3>
                      <Link
                        href={article.link}
                        className="text-sea-green font-medium hover:text-sea-green/80 transition-colors"
                      >
                        Читать статью →
                      </Link>
                    </div>
                  </div>
                </GlassmorphicCard>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-off-white to-soft-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassmorphicCard className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-heading font-bold text-dark-slate mb-6">
                Готовы обсудить <span className="text-sea-green">ваш проект?</span>
              </h2>
              <p className="text-xl text-dark-slate/70 mb-8 max-w-3xl mx-auto">
                Свяжитесь со мной или оставьте заявку, и мы вместе найдем лучшее решение для вашей задачи.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${member.contact.email}`}
                  onClick={() => trackEmailClick("team_member_cta")}
                  className="bg-sea-green text-white px-8 py-4 rounded-full font-semibold hover:bg-sea-green/90 transition-all duration-300 inline-flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Связаться со мной
                </a>
                <NavigationLink
                  href="/contact"
                  analyticsLabel="Оставить заявку"
                  analyticsLocation="team_member_cta"
                  className="bg-sea-green text-white px-8 py-4 rounded-full font-semibold hover:bg-sea-green/90 transition-all duration-300 inline-flex items-center gap-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  Оставить заявку
                </NavigationLink>
              </div>
            </motion.div>
          </GlassmorphicCard>
        </div>
      </section>


    </div>
  );
}