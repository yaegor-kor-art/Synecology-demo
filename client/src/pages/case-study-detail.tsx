import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Clock, CheckCircle, TrendingUp, DollarSign, Leaf, Users, Share2, MapPin, UserCheck } from "lucide-react";
import OrganicBlob from "@/components/OrganicBlob";
import GlassmorphicCard from "@/components/GlassmorphicCard";
import { useEffect, useState } from "react";
import { fetchCaseStudies, type CaseStudy } from "@/lib/directus";
import { BackButton } from "@/components/BackButton";
import NavigationLink from "@/components/NavigationLink";
import { CTA_LABELS } from "@/lib/contacts";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    const loadCaseStudy = async () => {
      if (!slug) return;

      setLoading(true);
      setError(null);

      try {
        // Load from Directus
        const directusCases = await fetchCaseStudies();
        const directusCase = directusCases.find(c => c.slug === slug);

        if (directusCase) {
          // Convert Directus case to detail format
          const formattedCase = {
            title: directusCase.title,
            category: directusCase.category?.[0] || null,
            description: directusCase.excerpt || directusCase.previewText || null,
            fullDescription: directusCase.fullDescription || directusCase.full_description || null,
            challenge: extractTextFromHTML(directusCase.challenge) || null,
            solution: extractTextFromHTML(directusCase.solution) || null,
            results: directusCase.results && directusCase.results.length > 0 ? directusCase.results : null,
            metrics: directusCase.metrics ? parseMetricsFromDirectus(directusCase.metrics) : 
                     (directusCase.results && directusCase.results.length > 0 ? generateMetricsFromResults(directusCase.results) : null),
            image: directusCase.coverImage || null,
            images: directusCase.coverImage ? [directusCase.coverImage] : null,
            tags: directusCase.tags && directusCase.tags.length > 0 ? directusCase.tags : null,
            timeline: directusCase.timeline || null,
            completion: directusCase.completionDate ? new Date(directusCase.completionDate).toLocaleDateString('ru-RU') : null,
            client: directusCase.client || null,
            location: directusCase.location || null,
            teamSize: directusCase.team_size || null,
            seoTitle: directusCase.title ? `${directusCase.title} - кейс Synecology` : null,
            seoDescription: directusCase.previewText || directusCase.description || null,
            seoKeywords: directusCase.tags || null
          };

          setCaseStudy(formattedCase);

          // SEO оптимизация для Directus кейсов
          if (formattedCase.seoTitle) {
            document.title = formattedCase.seoTitle;
          }
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription && formattedCase.seoDescription) {
            metaDescription.setAttribute('content', formattedCase.seoDescription);
          }
        } else {
          setError('Кейс не найден');
        }
      } catch (err: any) {
        console.error('Error loading case study:', err);
        setError('Ошибка загрузки кейса');
      } finally {
        setLoading(false);
      }
    };

    loadCaseStudy();
  }, [slug]);

  // Helper function to extract text from HTML
  const extractTextFromHTML = (htmlString?: string): string | null => {
    if (!htmlString) return null;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.trim() || null;
  };

  // Helper function to parse metrics from Directus
  const parseMetricsFromDirectus = (metricsData?: any): any[] => {
    if (!metricsData) return [];

    let metrics = [];
    
    // Handle if metrics is a string (JSON)
    if (typeof metricsData === 'string') {
      try {
        metrics = JSON.parse(metricsData);
      } catch {
        return [];
      }
    } else if (Array.isArray(metricsData)) {
      metrics = metricsData;
    } else {
      return [];
    }

    // Transform metrics to include proper icons and colors
    return metrics.map((metric: any, index: number) => {
      let icon = TrendingUp;
      let color = 'text-sea-green';

      // Assign different icons and colors based on index or metric type
      switch (index % 4) {
        case 0:
          icon = TrendingUp;
          color = 'text-sea-green';
          break;
        case 1:
          icon = DollarSign;
          color = 'text-soft-blue';
          break;
        case 2:
          icon = Leaf;
          color = 'text-sandy-beige';
          break;
        case 3:
          icon = Users;
          color = 'text-sea-green';
          break;
      }

      return {
        icon,
        value: metric.value || '✓',
        label: metric.label || '',
        color
      };
    });
  };

  // Helper function to generate metrics from results (fallback)
  const generateMetricsFromResults = (results: string[]): any[] => {
    const metrics = [];

    results.forEach((result, index) => {
      if (index >= 4) return; // Limit to 4 metrics

      let icon = CheckCircle;
      let color = 'text-sea-green';
      let value = '✓';
      let label = result;

      // Try to extract numbers for better metrics
      const numberMatch = result.match(/(\d+(?:[.,]\d+)?)\s*([%$₽BYN]|\w+)/);
      if (numberMatch) {
        value = numberMatch[1] + (numberMatch[2] || '');
        label = result.replace(numberMatch[0], '').trim();
      }

      // Assign different icons and colors
      switch (index % 4) {
        case 0:
          icon = TrendingUp;
          color = 'text-sea-green';
          break;
        case 1:
          icon = DollarSign;
          color = 'text-soft-blue';
          break;
        case 2:
          icon = Leaf;
          color = 'text-sandy-beige';
          break;
        case 3:
          icon = Users;
          color = 'text-sea-green';
          break;
      }

      metrics.push({ icon, value, label, color });
    });

    return metrics;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: caseStudy?.title,
        text: caseStudy?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sea-green mb-4"></div>
          <p className="text-xl text-dark-slate">Загружаем кейс...</p>
        </div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <p className="text-xl text-dark-slate mb-4">{error || 'Кейс не найден'}</p>
          <Link
            href="/case-studies"
            className="text-sea-green font-semibold hover:text-sea-green/80 transition-colors"
          >
            ← Вернуться к кейсам
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
            <BackButton className="inline-flex items-center gap-2 text-sea-green font-semibold hover:gap-3 transition-all" />
          </div>

          <div className={`grid grid-cols-1 ${caseStudy.image ? 'lg:grid-cols-2' : ''} gap-12 items-center`}>
            <div className={caseStudy.image ? '' : 'lg:col-span-2'}>
              <motion.div
                className="flex items-center gap-4 mb-6 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {caseStudy.category && (
                  <div className="bg-sea-green/10 text-sea-green px-4 py-2 rounded-full font-semibold">
                    {caseStudy.category}
                  </div>
                )}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-dark-slate/70 hover:text-sea-green transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Поделиться
                </button>
              </motion.div>

              <motion.h1
                className="text-4xl lg:text-5xl font-heading font-bold text-dark-slate mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {caseStudy.title}
              </motion.h1>

              {(caseStudy.description || caseStudy.fullDescription) && (
                <motion.div
                  className="text-xl text-dark-slate/70 mb-8 leading-relaxed prose prose-lg max-w-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {typeof (caseStudy.fullDescription || caseStudy.description) === 'string' && 
                   (caseStudy.fullDescription || caseStudy.description).includes('<') ? (
                    <div dangerouslySetInnerHTML={{ __html: caseStudy.fullDescription || caseStudy.description }} />
                  ) : (
                    <p>{caseStudy.fullDescription || caseStudy.description}</p>
                  )}
                </motion.div>
              )}

              {(caseStudy.completion || caseStudy.timeline || caseStudy.client || caseStudy.teamSize || caseStudy.location) && (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <div className="space-y-2">
                    {caseStudy.completion && (
                      <div className="flex items-center gap-2 text-sm text-dark-slate/70">
                        <Calendar className="w-4 h-4" />
                        <span>Завершен: {caseStudy.completion}</span>
                      </div>
                    )}
                    {caseStudy.timeline && (
                      <div className="flex items-center gap-2 text-sm text-dark-slate/70">
                        <Clock className="w-4 h-4" />
                        <span>Длительность: {caseStudy.timeline}</span>
                      </div>
                    )}
                    {caseStudy.location && (
                      <div className="flex items-center gap-2 text-sm text-dark-slate/70">
                        <MapPin className="w-4 h-4" />
                        <span>{caseStudy.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {caseStudy.client && (
                      <p className="text-sm text-dark-slate/70">
                        <span className="font-semibold">Клиент:</span> {caseStudy.client}
                      </p>
                    )}
                    {caseStudy.teamSize && (
                      <p className="text-sm text-dark-slate/70">
                        <span className="font-semibold">Команда:</span> {caseStudy.teamSize}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {caseStudy.image && (
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-off-white to-soft-blue/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-heading font-bold text-dark-slate mb-4">
                Ключевые показатели
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {caseStudy.metrics.map((metric: any, index: number) => (
                <GlassmorphicCard key={metric.label} delay={index * 0.1}>
                  <div className="text-center">
                    <div className={`w-16 h-16 ${metric.color} mx-auto mb-4`}>
                      <metric.icon className="w-full h-full" />
                    </div>
                    <div className="text-4xl font-heading font-bold text-dark-slate mb-2">
                      {metric.value}
                    </div>
                    <div className="text-dark-slate/70">{metric.label}</div>
                  </div>
                </GlassmorphicCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenge & Solution */}
      {(caseStudy.challenge || caseStudy.solution) && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 ${caseStudy.challenge && caseStudy.solution ? 'lg:grid-cols-2' : ''} gap-12`}>
              {caseStudy.challenge && (
                <GlassmorphicCard>
                  <h3 className="text-2xl font-heading font-bold text-dark-slate mb-6">
                    Вызов
                  </h3>
                  <p className="text-dark-slate/70 leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </GlassmorphicCard>
              )}

              {caseStudy.solution && (
                <GlassmorphicCard>
                  <h3 className="text-2xl font-heading font-bold text-dark-slate mb-6">
                    Решение
                  </h3>
                  <p className="text-dark-slate/70 leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </GlassmorphicCard>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {caseStudy.results && caseStudy.results.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-soft-blue/20 to-off-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-heading font-bold text-dark-slate mb-4">
                Достигнутые результаты
              </h2>
            </div>

            <GlassmorphicCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudy.results.map((result: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-sea-green flex-shrink-0" />
                    <span className="text-dark-slate">{result}</span>
                  </div>
                ))}
              </div>
            </GlassmorphicCard>
          </div>
        </section>
      )}

      {/* Process Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-dark-slate mb-4">
              Этапы реализации проекта
            </h2>
            <p className="text-xl text-dark-slate/70 max-w-3xl mx-auto">
              Пошаговый процесс работы над проектом — от первичного анализа до финального результата
            </p>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <GlassmorphicCard delay={0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-sea-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-sea-green text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-dark-slate mb-2">Анализ и аудит</h3>
                  <p className="text-sm text-dark-slate/70">Комплексная оценка текущего состояния предприятия</p>
                </div>
              </GlassmorphicCard>

              <GlassmorphicCard delay={0.2}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-soft-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-soft-blue text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-dark-slate mb-2">Планирование</h3>
                  <p className="text-sm text-dark-slate/70">Разработка стратегии и дорожной карты решений</p>
                </div>
              </GlassmorphicCard>

              <GlassmorphicCard delay={0.3}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-sandy-beige/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-sandy-beige text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-dark-slate mb-2">Реализация</h3>
                  <p className="text-sm text-dark-slate/70">Внедрение решений и создание документации</p>
                </div>
              </GlassmorphicCard>

              <GlassmorphicCard delay={0.4}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-sea-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-sea-green text-2xl font-bold">4</span>
                  </div>
                  <h3 className="text-lg font-semibold text-dark-slate mb-2">Сопровождение</h3>
                  <p className="text-sm text-dark-slate/70">Поддержка и мониторинг после внедрения</p>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </section>

      {/* Tags */}
      {caseStudy.tags && caseStudy.tags.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-off-white to-soft-blue/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-xl font-heading font-bold text-dark-slate mb-6">
                Ключевые теги
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {caseStudy.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-sea-green/10 text-sea-green rounded-full font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassmorphicCard className="text-center">
            <h2 className="text-3xl font-heading font-bold text-dark-slate mb-6">
              Готовы начать похожий проект?
            </h2>
            <p className="text-xl text-dark-slate/70 mb-8 max-w-3xl mx-auto">
              Свяжитесь с нами, чтобы обсудить, как мы можем помочь вашей организации достичь подобных результатов.
            </p>
            <NavigationLink
              href="/contact"
              analyticsLabel={CTA_LABELS.consultation}
              analyticsLocation="case_study_detail_cta"
              className="bg-sea-green text-white px-8 py-4 rounded-full font-semibold hover:bg-sea-green/90 transition-all duration-300 inline-flex items-center gap-2"
            >
              {CTA_LABELS.consultation}
            </NavigationLink>
          </GlassmorphicCard>
        </div>
      </section>
    </div>
  );
}