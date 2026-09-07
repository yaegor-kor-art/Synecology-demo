import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";
import OrganicBlob from "@/components/OrganicBlob";
import GlassmorphicCard from "@/components/GlassmorphicCard";
import NavigationLink from "@/components/NavigationLink";
import { trackEmailClick } from "@/lib/analytics";
import { FEATURES } from "@/lib/features";

export default function About() {
  const stats = [
    { value: "150+", label: "Проектов завершено", icon: TrendingUp },
    { value: "99%", label: "Довольных клиентов", icon: Users },
    { value: "9", label: "Лет опыта", icon: Award },
  ];

  const teamMembers = [
    {
      name: "Корякин Егор Дмитриевич",
      role: "Директор",
      bio: "Стратегическое руководство компанией и контроль реализации экологических проектов. Разработка и внедрение программ природопользования и охраны окружающей среды в соответствии с требованиями законодательства. Более 100 успешно реализованных проектов.",
      image: "https://i.ibb.co/k2rDZbqt/5192954527513441803.jpg",
      expertise: [
        "Стратегическое руководство",
        "Программы природопользования",
        "Взаимодействие с органами власти",
        "Управление экологическими проектами",
      ],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "synecology@yandex.by",
      },
    },
    {
      name: "Волошко Инна Владимировна",
      role: "Директор",
      bio: "Стратегическое руководство компанией и контроль реализации экологических проектов. Разработка и внедрение программ природопользования и охраны окружающей среды в соответствии с требованиями законодательства. Более 100 успешно реализованных проектов.",
      image: "https://i.ibb.co/k2rDZbqt/5192954527513441803.jpg",
      expertise: [
        "Стратегическое руководство",
        "Программы природопользования",
        "Взаимодействие с органами власти",
        "Управление экологическими проектами",
      ],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "synecology@yandex.by",
      },
    },
  ];

  const values = [
    {
      title: "Инновации",
      description:
        "Мы находим нестандартные пути для решения стандартных задач, экономя ваше время, нервы и ресурсы.",
      icon: <TrendingUp className="w-8 h-8 text-sea-green" />,
    },
    {
      title: "Устойчивость",
      description:
        "Мы создаем решения, которые не просто решают текущую задачу, но и закладывают прочный фундамент для вашего спокойного будущего.",
      icon: <Award className="w-8 h-8 text-sea-green" />,
    },
    {
      title: "Сотрудничество",
      description:
        "Мы слышим вас. Открытый диалог, честность и полное понимание ваших потребностей — ключ к нашему совместному успеху.",
      icon: <Users className="w-8 h-8 text-sea-green" />,
    },
    {
      title: "Совершенство",
      description:
        "Мы гарантируем порядок в каждом документе и точность в каждом расчете. Ваше спокойствие — наша лучшая награда.",
      icon: <ArrowRight className="w-8 h-8 text-sea-green" />,
    },
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <OrganicBlob
          className="absolute top-10 right-10 opacity-15"
          size="lg"
        />
        <OrganicBlob
          className="absolute bottom-10 left-10 opacity-10"
          size="md"
          delay={2}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h1
                className="text-5xl lg:text-6xl font-heading font-bold text-dark-slate mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                О <span className="text-sea-green">Synecology</span>
              </motion.h1>
              <motion.p
                className="text-xl text-dark-slate/70 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Synecology — это команда экспертов с многолетним опытом в
                области экологического консалтинга. Мы специализируемся на
                комплексном подходе к природоохранной деятельности предприятий.
                Для нас каждый проект — это в первую очередь конкретный
                результат для клиента. За годы работы мы научились не просто
                помогать получить документы, а выстраивать надежные системы,
                которые экономят деньги и защищают от рисков.
              </motion.p>
              <motion.div
                className="grid grid-cols-3 gap-8 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-heading font-bold text-sea-green mb-2">
                      {stat.value}
                    </div>
                    <div className="text-dark-slate/70 text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative z-10"
              >
                <NavigationLink
                  href="/contact"
                  className="bg-sea-green text-white px-8 py-4 rounded-full font-semibold hover:bg-sea-green/90 transition-all duration-300 inline-flex items-center gap-2 relative z-10"
                >
                  <Users className="w-5 h-5" />
                  Работать с нами
                </NavigationLink>
              </motion.div>
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="glassmorphic rounded-3xl p-8 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1623303647440-967d26b95b47?q=80&w=1155&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
                  alt="Environmental consulting team"
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <OrganicBlob
          className="absolute top-10 right-10 opacity-10"
          size="md"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl lg:text-5xl font-heading font-bold text-dark-slate mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Люди, которые решают{" "}
              <span className="text-sea-green">ваши задачи</span>
            </motion.h2>
            <motion.p
              className="text-xl text-dark-slate/70 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              За каждым нашим проектом стоит команда профильных экологов,
              инженеров и юристов. Мы объединили десятилетия практического
              опыта, чтобы находить для вас самые эффективные и юридически
              выверенные решения.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers
              .filter((member) => member.name === "Волошко Инна Владимировна")
              .map((member, index) => {
                const memberSlug = "inna-voloshko";

                return (
                  <motion.div
                    key={`team-${member.name}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="card-stable visible"
                    onClick={() =>
                      (window.location.href = `/team/${memberSlug}`)
                    }
                  >
                    {/* Desktop/Tablet - clickable card */}
                    <div className="hidden sm:block">
                      <GlassmorphicCard className="h-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg cursor-pointer">
                        <div className="flex flex-col h-full p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 bg-sea-green/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                              <Users className="w-8 h-8 text-sea-green" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-heading font-bold text-dark-slate mb-1 group-hover:text-sea-green transition-colors">
                                {member.name}
                              </h3>
                              <p className="text-sea-green font-semibold text-sm">
                                {member.role}
                              </p>
                            </div>
                          </div>

                          <p className="text-dark-slate/70 text-sm leading-relaxed mb-4 flex-grow">
                            {member.bio}
                          </p>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-sea-green flex-shrink-0" />
                              <span className="text-sm font-medium text-dark-slate">
                                Опыт работы: 5+ лет
                              </span>
                            </div>

                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-dark-slate">
                                Экспертиза:
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {member.expertise.slice(0, 4).map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-2 py-1 bg-sea-green/10 text-sea-green text-xs rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-6 pt-4 border-t border-dark-slate/10">
                            <div className="text-sea-green font-medium text-sm inline-flex items-center gap-1">
                              Подробнее <ArrowRight className="w-3 h-3" />
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                trackEmailClick("about_team_card");
                                window.location.href = `mailto:${member.social.email}`;
                              }}
                              className="text-dark-slate/60 hover:text-sea-green transition-colors"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </GlassmorphicCard>
                    </div>

                    {/* Mobile - non-clickable card with buttons */}
                    <div className="sm:hidden">
                      <GlassmorphicCard className="h-full">
                        <div className="flex flex-col h-full p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 bg-sea-green/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                              <Users className="w-8 h-8 text-sea-green" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-heading font-bold text-dark-slate mb-1">
                                {member.name}
                              </h3>
                              <p className="text-sea-green font-semibold text-sm">
                                {member.role}
                              </p>
                            </div>
                          </div>

                          <p className="text-dark-slate/70 text-sm leading-relaxed mb-4 flex-grow">
                            {member.bio}
                          </p>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-sea-green flex-shrink-0" />
                              <span className="text-sm font-medium text-dark-slate">
                                Опыт работы: 5+ лет
                              </span>
                            </div>

                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-dark-slate">
                                Экспертиза:
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {member.expertise.slice(0, 4).map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-2 py-1 bg-sea-green/10 text-sea-green text-xs rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3 mt-6 pt-4 border-t border-dark-slate/10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `/team/${memberSlug}`;
                              }}
                              className="flex-1 bg-sea-green text-white px-4 py-2 rounded-full font-medium text-sm text-center hover:bg-sea-green/90 transition-colors"
                            >
                              Подробнее
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                trackEmailClick("about_team_card");
                                window.location.href = `mailto:${member.social.email}`;
                              }}
                              className="px-4 py-2 glassmorphic glassmorphic-hover rounded-full text-sea-green font-medium text-sm hover:text-sea-green/80 transition-colors inline-flex items-center gap-2"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </GlassmorphicCard>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gradient-to-b from-off-white to-soft-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl lg:text-5xl font-heading font-bold text-dark-slate mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Наша миссия:{" "}
              <span className="text-sea-green">Делать экологию выгодной</span>
            </motion.h2>
            <motion.p
              className="text-xl text-dark-slate/70 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Мы верим, что ответственный подход к экологии — это не расходы, а
              умные инвестиции в репутацию, рост и будущее вашего бизнеса.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 card-grid">
            {values.map((value, index) => (
              <motion.div
                key={`value-${value.title}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="card-stable visible"
              >
                <GlassmorphicCard className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-center card-content">
                    <div className="flex justify-center mb-4">{value.icon}</div>
                    <h3 className="text-2xl font-heading font-bold text-dark-slate mb-4">
                      {value.title}
                    </h3>
                    <p className="text-dark-slate/70 flex-grow">
                      {value.description}
                    </p>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-off-white to-soft-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassmorphicCard className="text-center">
            <motion.h2
              className="text-4xl font-heading font-bold text-dark-slate mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Готовы работать <span className="text-sea-green">вместе</span>?
            </motion.h2>
            <motion.p
              className="text-xl text-dark-slate/70 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Лучшие решения рождаются в диалоге. Позвоните или напишите нам —
              мы будем рады познакомиться с вами и вашим проектом.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <NavigationLink href="/contact" className="btn-primary">
                <ArrowRight className="w-5 h-5" />
                Получить консультацию
              </NavigationLink>
              {FEATURES.caseStudies && (
                <Link href="/case-studies" className="btn-secondary">
                  Посмотреть наши работы
                </Link>
              )}
            </motion.div>
          </GlassmorphicCard>
        </div>
      </section>
    </div>
  );
}
