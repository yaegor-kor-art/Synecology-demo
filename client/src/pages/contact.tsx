import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs, { EMAILJS_CONFIG } from "@/lib/emailjs";
import OrganicBlob from "@/components/OrganicBlob";
import GlassmorphicCard from "@/components/GlassmorphicCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  CONTACTS,
  CTA_LABELS,
  FORM_VALUE_PROPOSITION,
  INTEREST_OPTIONS,
  LEAD_MAGNET_ITEMS,
} from "@/lib/contacts";
import { formatBelarusPhone, isValidBelarusPhone } from "@/lib/phone";
import { trackEmailClick, trackFormSubmit, trackPhoneClick } from "@/lib/analytics";

const contactFormSchema = z.object({
  firstName: z.string().optional(),
  phone: z
    .string()
    .min(1, "Укажите номер телефона")
    .refine(isValidBelarusPhone, "Введите корректный номер в формате +375 (XX) XXX-XX-XX"),
  interest: z.string().min(1, "Выберите, что вас интересует"),
  email: z
    .string()
    .refine((val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Введите корректный email адрес",
    }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      phone: "+375",
      interest: "",
      email: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG;
      const templateParams = {
        to_name: "Synecology Team",
        from_name: data.firstName || "Не указано",
        from_email: data.email || "Не указан",
        phone: data.phone,
        project_type: data.interest,
        reply_to: data.email || CONTACTS.email,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch(() => undefined);

      trackFormSubmit({ interest: data.interest, page: "contact" });

      toast({
        title: "Заявка успешно отправлена!",
        description: "Мы свяжемся с вами в течение 24 часов.",
      });

      form.reset({
        firstName: "",
        phone: "+375",
        interest: "",
        email: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Ошибка отправки заявки",
        description:
          error instanceof Error
            ? error.message
            : "Проверьте подключение к интернету и попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, title: "Адрес", details: CONTACTS.address },
    { icon: Phone, title: "Телефон", details: CONTACTS.phone.display, href: `tel:${CONTACTS.phone.tel}` },
    { icon: Mail, title: "Email", details: CONTACTS.email, href: `mailto:${CONTACTS.email}` },
    { icon: Clock, title: "Часы работы", details: CONTACTS.workingHours },
  ];

  return (
    <div className="pt-24">
      <section className="py-20 bg-subtle-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <GlassmorphicCard>
              <div className="mb-6 p-4 rounded-2xl bg-sea-green/5 border border-sea-green/20">
                <h3 className="text-lg font-heading font-bold text-dark-slate mb-3">
                  Бесплатно для вас
                </h3>
                <ul className="space-y-2">
                  {LEAD_MAGNET_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-dark-slate/80">
                      <CheckCircle className="w-4 h-4 text-sea-green flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h2 className="text-3xl font-heading font-bold text-dark-slate mb-2">
                {CTA_LABELS.consultation}
              </h2>
              <p className="text-dark-slate/70 mb-6 leading-relaxed">{FORM_VALUE_PROPOSITION}</p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dark-slate font-medium">
                          Имя <span className="text-dark-slate/50 font-normal">(необязательно)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="glassmorphic border-dark-slate/20 bg-white/50 focus:ring-sea-green focus:border-sea-green"
                            placeholder="Иван"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dark-slate font-medium">Телефон *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            inputMode="tel"
                            className="glassmorphic border-dark-slate/20 bg-white/50 focus:ring-sea-green focus:border-sea-green"
                            placeholder="+375 (29) 602-42-80"
                            onChange={(e) => field.onChange(formatBelarusPhone(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dark-slate font-medium">Что вас интересует *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="glassmorphic border-dark-slate/20 bg-white/50 focus:ring-sea-green focus:border-sea-green">
                              <SelectValue placeholder="Выберите услугу" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {INTEREST_OPTIONS.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dark-slate font-medium">
                          Email <span className="text-dark-slate/50 font-normal">(необязательно)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="glassmorphic border-dark-slate/20 bg-white/50 focus:ring-sea-green focus:border-sea-green"
                            placeholder="ivan@company.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-sea-green hover:bg-sea-green/90 text-white font-semibold py-4 rounded-full transition-all duration-300"
                    >
                      {isSubmitting ? (
                        "Отправка..."
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          {CTA_LABELS.consultation}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </GlassmorphicCard>

            <motion.div
              className="space-y-8 card-stable visible"
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <GlassmorphicCard>
                <h3 className="text-2xl font-heading font-bold text-dark-slate mb-6">Контактная информация</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <div className="w-12 h-12 bg-sea-green/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-sea-green" />
                      </div>
                      <div>
                        <div className="font-semibold text-dark-slate mb-1">{info.title}</div>
                        {info.href ? (
                          <a
                            href={info.href}
                            onClick={() =>
                              info.title === "Телефон"
                                ? trackPhoneClick("contact_info")
                                : trackEmailClick("contact_info")
                            }
                            className="text-dark-slate/70 hover:text-sea-green transition-colors"
                          >
                            {info.details}
                          </a>
                        ) : (
                          <div className="text-dark-slate/70">{info.details}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassmorphicCard>

              <GlassmorphicCard>
                <h3 className="text-2xl font-heading font-bold text-dark-slate mb-6">Почему выбрать Synecology?</h3>
                <div className="space-y-4">
                  {[
                    ["Экспертная команда", "Практикующие экологи с реальным опытом решения сложных кейсов в Беларуси."],
                    ["Измеримый успех", "Снижение затрат, защита от штрафов, укрепление репутации."],
                    ["Прозрачные решения", "Понятные отчеты и четкие планы действий на каждом этапе."],
                    ["Полная поддержка", "Остаемся на связи даже после завершения проекта."],
                  ].map(([title, text]) => (
                    <div key={title} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-sea-green rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-dark-slate">{title}</div>
                        <div className="text-dark-slate/70 text-sm">{text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassmorphicCard>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <OrganicBlob className="absolute top-10 right-10 opacity-10" size="md" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-heading font-bold text-dark-slate mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Часто задаваемые <span className="text-sea-green">вопросы</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              ["Сколько времени занимает типичный проект?", "Сроки зависят от масштаба: от 2–4 недель до нескольких месяцев. Подробный график предоставим на консультации."],
              ["Какие отрасли вы обслуживаете?", "Производство, строительство, пищевые производства, логистика, медицина, сельское хозяйство и госорганизации."],
              ["Предоставляете ли вы постоянную поддержку?", "Да, предлагаем долгосрочное сопровождение: мониторинг, отчетность и помощь при проверках."],
              ["Как вы обеспечиваете соблюдение нормативных требований?", "Следим за изменениями законодательства и встраиваем соответствие требованиям в каждое решение."],
            ].map(([title, text]) => (
              <GlassmorphicCard key={title}>
                <h3 className="text-xl font-heading font-bold text-dark-slate mb-4">{title}</h3>
                <p className="text-dark-slate/70">{text}</p>
              </GlassmorphicCard>
            ))}
          </div>
        </div>
      </section>

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
              <span className="text-sea-green">Один звонок </span>
              до решения вашей задачи
            </motion.h2>
            <motion.p
              className="text-xl text-dark-slate/70 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {FORM_VALUE_PROPOSITION}
            </motion.p>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Button
                variant="outline"
                className="glassmorphic glassmorphic-hover border-sea-green text-sea-green font-semibold py-4 px-8 rounded-full"
                asChild
              >
                <a
                  href={`tel:${CONTACTS.phone.tel}`}
                  onClick={() => trackPhoneClick("contact_cta")}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {CTA_LABELS.callNow}
                </a>
              </Button>
            </motion.div>
          </GlassmorphicCard>
        </div>
      </section>
    </div>
  );
}
