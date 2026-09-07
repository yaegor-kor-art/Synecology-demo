import { motion } from "framer-motion";
import NavigationLink from "@/components/NavigationLink";
import { Calendar, ArrowRight, Clock, Tag, Search, User } from "lucide-react";
import OrganicBlob from "@/components/OrganicBlob";
import GlassmorphicCard from "@/components/GlassmorphicCard";
import StableCard from '@/components/StableCard';
import { useState, useMemo, useEffect } from "react";
import { fetchBlogPosts, type BlogPost } from "@/lib/blog";
import OptimizedImage from "@/components/OptimizedImage";
import { CTA_LABELS } from "@/lib/contacts";

export default function Blog() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const directusPosts = await fetchBlogPosts();
        const sortedPosts = directusPosts.sort((a, b) =>
          new Date(b.publishedDate || '').getTime() - new Date(a.publishedDate || '').getTime()
        );

        setBlogPosts(sortedPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setError('Ошибка загрузки статей');
        setBlogPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  // Собираем все уникальные теги
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach((post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [blogPosts]);

  // Фильтруем посты по тегам и поисковому запросу
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      // Для тегов используем логику "И" - пост должен содержать ВСЕ выбранные теги
      const postTags = post.tags || [];
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => postTags.includes(tag));
      const matchesSearch =
        !searchTerm ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        postTags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      return matchesTags && matchesSearch;
    });
  }, [blogPosts, selectedTags, searchTerm]);

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchTerm("");
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

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
          <div className="text-center mb-16">
            <motion.h1
              className="text-5xl lg:text-6xl font-heading font-bold text-dark-slate mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Экология <span className="text-sea-green">простыми словами</span>
            </motion.h1>
            <motion.p
              className="text-xl text-dark-slate/70 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Превращаем запутанные инструкции и законы в четкие и понятные
              статьи. Наша цель — помочь вам быстро найти нужное решение и
              сэкономить ваше самое ценное время.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gradient-to-b from-off-white to-soft-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-slate/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск по статьям и тегам..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-dark-slate/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sea-green focus:border-transparent text-dark-slate"
              />
            </div>
          </div>

          {/* Tag Filter */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTags.includes(tag)
                      ? "bg-sea-green text-white border-2 border-sea-green shadow-lg"
                      : "bg-white/60 text-dark-slate/70 hover:bg-sea-green/10 hover:text-sea-green border border-dark-slate/20"
                  }`}
                >
                  <Tag className="w-3 h-3 inline mr-1" />
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters and Clear Button */}
          {(selectedTags.length > 0 || searchTerm) && (
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-dark-slate/70">
                <span>
                  Активные фильтры
                  {selectedTags.length > 1 ? " (все должны совпадать)" : ""}:
                </span>
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-sea-green text-white px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {searchTerm && (
                  <span className="bg-sea-green/20 text-sea-green px-3 py-1 rounded-full">
                    "{searchTerm}"
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-dark-slate/70 hover:text-sea-green transition-colors"
              >
                Очистить все
              </button>
            </div>
          )}

          {/* Results count */}
          <div className="text-center text-sm text-dark-slate/70">
            {filteredPosts.length === 0 ? (
              <span>Статьи не найдены</span>
            ) : (
              <span>
                Найдено {filteredPosts.length}{" "}
                {filteredPosts.length === 1
                  ? "статья"
                  : filteredPosts.length < 5
                    ? "статьи"
                    : "статей"}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 &&
        filteredPosts.some((post) => post.featured) && (
          <section className="py-12 bg-gradient-to-b from-soft-blue/20 to-off-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-3xl font-heading font-bold text-dark-slate mb-4">
                  Рекомендуемая статья
                </h2>
              </div>

              {filteredPosts
                .filter((post) => post.featured)
                .map((post) => (
                  <GlassmorphicCard
                    key={post.title}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="relative">
                        <img
                          src={post.coverImage || "https://images.unsplash.com/photo-1727812100171-8af0e7211041?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"}
                          alt={post.title}
                          className="w-full h-64 lg:h-full object-cover rounded-xl"
                        />
                        <div className="absolute top-4 left-4 bg-sea-green text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Рекомендуемая
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-4 text-sm flex-wrap">
                          <div className="flex items-center gap-2 bg-sea-green/10 text-sea-green px-3 py-1 rounded-full">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">{new Date(post.publishedDate || '').toLocaleDateString('ru-RU')}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-soft-blue/20 text-dark-slate px-3 py-1 rounded-full">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">{post.readTime || '5 мин'}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-sandy-beige/50 text-dark-slate px-3 py-1 rounded-full">
                            <Tag className="w-4 h-4" />
                            <span className="font-medium">{Array.isArray(post.category) ? post.category[0] : post.category || 'Статья'}</span>
                          </div>
                          {post.authorSlug && (
                            <NavigationLink
                              href={`/team/${post.authorSlug}`}
                              className="flex items-center gap-2 bg-dark-slate/10 text-dark-slate hover:bg-dark-slate/20 transition-colors px-3 py-1 rounded-full"
                            >
                              <User className="w-4 h-4" />
                              <span className="font-medium">{post.authorName || 'Автор'}</span>
                            </NavigationLink>
                          )}
                        </div>

                        <h3 className="text-3xl font-heading font-bold text-dark-slate">
                          {post.title}
                        </h3>

                        <p className="text-lg text-dark-slate/70 leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {(post.tags || []).map((tag) => (
                            <button
                              key={tag}
                              onClick={() => toggleTag(tag)}
                              className={`px-3 py-1 text-sm rounded-full transition-all duration-300 cursor-pointer ${
                                selectedTags.includes(tag)
                                  ? "bg-sea-green text-white shadow-lg"
                                  : "bg-sea-green/10 text-sea-green hover:bg-sea-green/20"
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>

                        <NavigationLink
                          href={`/blog/${post.slug}`}
                          className="bg-sea-green text-white px-8 py-4 rounded-full font-semibold hover:bg-sea-green/90 transition-all duration-300 inline-flex items-center gap-2"
                        >
                          <ArrowRight className="w-5 h-5" />
                          Читать полную статью
                        </NavigationLink>
                      </div>
                    </div>
                  </GlassmorphicCard>
                ))}
            </div>
          </section>
        )}

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-12 h-12 border-4 border-sea-green border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-dark-slate/70">Загружаем статьи...</p>
            </div>
          ) : error ? (
            <GlassmorphicCard className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-heading font-semibold text-dark-slate mb-2">
                  Ошибка загрузки
                </h3>
                <p className="text-dark-slate/70 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-sea-green text-white px-6 py-3 rounded-full font-semibold hover:bg-sea-green/90 transition-all duration-300"
                >
                  Попробовать снова
                </button>
              </div>
            </GlassmorphicCard>
          ) : (
            <>
              {filteredPosts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-heading font-bold text-dark-slate mb-4">
                    {filteredPosts.some((post) => post.featured)
                      ? "Другие статьи"
                      : "Статьи"}
                  </h2>
                </div>
              )}

              {filteredPosts.length === 0 ? (
            <GlassmorphicCard className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-sea-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-sea-green/50" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-dark-slate mb-2">
                  Статьи не найдены
                </h3>
                <p className="text-dark-slate/70 mb-4">
                  Попробуйте изменить критерии поиска или очистить фильтры
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-sea-green text-white px-6 py-3 rounded-full font-semibold hover:bg-sea-green/90 transition-all duration-300"
                >
                  Очистить фильтры
                </button>
              </div>
            </GlassmorphicCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts
                .filter((post) => !post.featured)
                .map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="group h-full card-stable visible"
                  >
                    {/* Replaced Link with NavigationLink and added the 'from' parameter */}
                    <GlassmorphicCard delay={index * 0.1}>
                    <NavigationLink href={`/blog/${post.slug}`}>
                      <article className="group cursor-pointer h-full flex flex-col">
                          {post.coverImage && (
                            <div className="mb-6 overflow-hidden rounded-xl">
                              <OptimizedImage
                                src={post.coverImage || "https://images.unsplash.com/photo-1727812100171-8af0e7211041?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"}
                              alt={post.title}
                              className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                              width={400}
                              height={250}
                            />
                          </div>
                        )}

                        <div className="flex-grow flex flex-col">
                          <h2 className="text-2xl font-heading font-bold text-dark-slate mb-4 leading-tight group-hover:text-sea-green transition-colors duration-300">
                            {post.title}
                          </h2>

                          {post.excerpt && (
                            <p className="text-dark-slate/70 mb-6 leading-relaxed flex-grow">
                              {post.excerpt}
                            </p>
                          )}

                          <div className="flex items-center justify-between text-sm text-dark-slate/60 mb-4">
                            <span>{new Date(post.publishedDate || '').toLocaleDateString('ru-RU')}</span>
                            {post.authorName && (
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{post.authorName}</span>
                              </div>
                            )}
                          </div>

                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 bg-sea-green/10 text-sea-green text-sm rounded-full font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="text-sea-green font-semibold inline-flex items-center gap-2 text-base mt-auto">
                            Читать далее <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </article>
                    </NavigationLink>
                  </GlassmorphicCard>
                  </motion.div>
                ))}
            </div>
          )}


            </>
          )}
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
              Нужна <span className="text-sea-green">консультация</span>?
            </motion.h2>
            <motion.p
              className="text-xl text-dark-slate/70 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Свяжитесь с нами для получения персональной консультации по вашим экологическим задачам. Мы поможем найти оптимальное решение для вашего бизнеса.
            </motion.p>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <NavigationLink
                href="/contact"
                className="bg-sea-green text-white px-8 py-4 rounded-full font-semibold hover:bg-sea-green/90 transition-all duration-300 inline-flex items-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                {CTA_LABELS.consultation}
              </NavigationLink>
            </motion.div>
          </GlassmorphicCard>
        </div>
      </section>
    </div>
  );
}