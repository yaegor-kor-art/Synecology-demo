import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import OrganicBlob from "@/components/OrganicBlob";
import GlassmorphicCard from "@/components/GlassmorphicCard";
import NavigationLink from "@/components/NavigationLink";
import { BackButton } from "@/components/BackButton";
import { CTA_LABELS } from "@/lib/contacts";

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Какие услуги предоставляет Synecology?",
      answer: "Мы предлагаем полный спектр экологических консультационных услуг, включая оценку воздействия на окружающую среду, управление водными ресурсами, мониторинг качества воздуха, консультации по устойчивому развитию, помощь в соответствии требованиям и восстановление экосистем.",
    },
    {
      question: "Сколько времени занимает типичная оценка воздействия на окружающую среду?",
      answer: "Продолжительность оценки воздействия на окружающую среду варьируется в зависимости от сложности проекта. Простые оценки могут занять 2-4 недели, в то время как комплексные проекты могут потребовать 3-6 месяцев. Мы предоставляем подробные временные рамки во время первичной консультации.",
    },
    {
      question: "Работаете ли вы с небольшими предприятиями или только с крупными корпорациями?",
      answer: "Мы работаем с организациями всех размеров, от малого бизнеса до крупных корпораций. Наши услуги масштабируются в соответствии с потребностями и бюджетом каждого клиента. Мы верим, что каждый бизнес может внести вклад в экологическую устойчивость.",
    },
    {
      question: "Какие отрасли вы обслуживаете?",
      answer: "Мы работаем в широком спектре отраслей, включая производство, строительство, недвижимость, энергетику, горнодобывающую промышленность, сельское хозяйство, здравоохранение и муниципальные услуги. Наша команда имеет опыт работы в различных секторах экономики.",
    },
    {
      question: "Как начать работу с Synecology?",
      answer: "Начать работу просто! Свяжитесь с нами через нашу страницу контактов или позвоните нам напрямую. Мы назначим первичную консультацию для обсуждения ваших потребностей и предоставим бесплатное предложение по нашим услугам.",
    },
    {
      question: "Предоставляете ли вы услуги экстренного реагирования?",
      answer: "Да, мы предлагаем услуги экстренного экологического реагирования 24/7. Если у вас произошел экологический инцидент, такой как разлив химикатов или загрязнение, немедленно свяжитесь с нами, и мы быстро развернем нашу команду для минимизации воздействия.",
    },
    {
      question: "Каковы ваши тарифы на консультационные услуги?",
      answer: "Наши тарифы варьируются в зависимости от типа и сложности услуги. Мы предлагаем как почасовые ставки, так и фиксированные цены за проект. Свяжитесь с нами для получения индивидуального предложения, основанного на ваших конкретных потребностях.",
    },
    {
      question: "Предоставляете ли вы обучение и образовательные программы?",
      answer: "Да, мы предлагаем обучающие программы и семинары по экологическому соответствию, устойчивым практикам и экологическому управлению. Эти программы могут быть адаптированы для вашей команды и проводиться на месте или в нашем учебном центре.",
    },
    {
      question: "Как Synecology остается в курсе изменений в экологическом законодательстве?",
      answer: "Наша команда постоянно отслеживает изменения в экологическом законодательстве и нормативных актах. Мы поддерживаем партнерские отношения с регулирующими органами, участвуем в профессиональных ассоциациях и регулярно посещаем отраслевые конференции, чтобы быть в курсе последних требований.",
    },
    {
      question: "Можете ли вы помочь с получением экологических разрешений?",
      answer: "Абсолютно! Мы специализируемся на подготовке и подаче заявок на экологические разрешения. Наша команда имеет обширный опыт работы с различными типами разрешений и может провести вас через весь процесс от начальной оценки до окончательного одобрения.",
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

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
          <div className="text-center mb-16">
            <motion.h1
              className="text-5xl lg:text-6xl font-heading font-bold text-dark-slate mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Часто задаваемые <span className="text-sea-green">вопросы</span>
            </motion.h1>
            <motion.p
              className="text-xl text-dark-slate/70 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Найдите ответы на самые популярные вопросы о наших экологических консультационных услугах и процессах.
            </motion.p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-off-white to-soft-blue/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={`faq-${index}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="mb-6 card-stable visible"
              >
                <GlassmorphicCard className="overflow-hidden">
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-sea-green focus:ring-offset-2 rounded-2xl"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-heading font-semibold text-dark-slate pr-4">
                        {faq.question}
                      </h3>
                      {openQuestion === index ? (
                        <ChevronUp className="w-6 h-6 text-sea-green flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-sea-green flex-shrink-0" />
                      )}
                    </div>
                  </button>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: openQuestion === index ? "auto" : 0,
                      opacity: openQuestion === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-dark-slate/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassmorphicCard className="text-center">
            <motion.h2
              className="text-4xl font-heading font-bold text-dark-slate mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Не нашли ответ на свой <span className="text-sea-green">вопрос?</span>
            </motion.h2>
            <motion.p
              className="text-xl text-dark-slate/70 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Наша команда экспертов готова помочь вам с любыми вопросами об экологических консультационных услугах.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <NavigationLink
                href="/contact"
                className="bg-sea-green text-white px-8 py-4 rounded-full font-semibold hover:bg-sea-green/90 transition-all duration-300 inline-flex items-center gap-2"
              >
                {CTA_LABELS.consultation}
              </NavigationLink>
              <button className="glassmorphic glassmorphic-hover px-8 py-4 rounded-full text-sea-green font-semibold">
                Запросить консультацию
              </button>
            </motion.div>
          </GlassmorphicCard>
        </div>
      </section>
    </div>
  );
}