import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Clock, Tag, Share2, User } from "lucide-react";
import OrganicBlob from "@/components/OrganicBlob";
import GlassmorphicCard from "@/components/GlassmorphicCard";
import { useEffect, useState } from "react";
import { fetchBlogPosts, type BlogPost, getImageUrl } from "@/lib/blog";
import { BackButton } from "@/components/BackButton";
import NavigationLink from "@/components/NavigationLink";
import { CTA_LABELS } from "@/lib/contacts";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        // Сначала пробуем загрузить из Directus
        const posts = await fetchBlogPosts();
        const directusPost = posts.find(p => p.slug === slug);

        if (directusPost) {
          setPost(directusPost);
          // Получаем связанные посты (исключая текущий)
          const related = posts.filter(p => p.slug !== slug).slice(0, 3);
          setRelatedPosts(related);
        } else {
          setError('Статья не найдена');
        }
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Статья не найдена');
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  useEffect(() => {
    if (post) {
      // SEO оптимизация с использованием специальных SEO полей из Directus
      const seoTitle = (post as any).seoTitle || post.title;
      const seoDescription = (post as any).seoDescription || post.excerpt;
      const seoKeywords = (post as any).seoKeywords;

      document.title = `${seoTitle} | ЭкоПартнер`;

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && seoDescription) {
        metaDescription.setAttribute('content', seoDescription);
      }

      // Добавляем или обновляем meta keywords если они есть
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (seoKeywords && Array.isArray(seoKeywords) && seoKeywords.length > 0) {
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', seoKeywords.join(', '));
      }

      // Open Graph теги для социальных сетей
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', seoTitle);

      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      if (seoDescription) {
        ogDescription.setAttribute('content', seoDescription);
      }

      if (post.coverImage) {
        let ogImage = document.querySelector('meta[property="og:image"]');
        if (!ogImage) {
          ogImage = document.createElement('meta');
          ogImage.setAttribute('property', 'og:image');
          document.head.appendChild(ogImage);
        }
        ogImage.setAttribute('content', post.coverImage);
      }
    }
  }, [post]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Функция для нормализации категории в массив
  const normalizeCategory = (category: string | string[] | undefined): string[] => {
    if (!category) return [];
    if (Array.isArray(category)) return category.filter(Boolean);
    if (typeof category === 'string') return [category];
    return [];
  };

  // Функция для нормализации тегов в массив
  const normalizeTags = (tags: string | string[] | undefined): string[] => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags.filter(Boolean);
    if (typeof tags === 'string') return [tags];
    return [];
  };

  // Функция для проверки наличия данных автора
  const hasAuthorData = (post: BlogPost): boolean => {
    return !!(post.authorName || post.authorAvatar);
  };

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-16 bg-gray-200 rounded w-full mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-12"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-dark-slate mb-4">
            Статья не найдена
          </h1>
          <p className="text-dark-slate/70 mb-8">
            Возможно, статья была удалена или перемещена
          </p>
          <Link
            href="/blog"
            className="bg-sea-green text-white px-6 py-3 rounded-full font-semibold hover:bg-sea-green/90 transition-all duration-300"
          >
            Вернуться к блогу
          </Link>
        </div>
      </div>
    );
  }

  const categoryArray = normalizeCategory(post.category);
  const tagsArray = normalizeTags(post.tags);

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <OrganicBlob className="absolute top-10 right-10 opacity-15" size="lg" />
        <OrganicBlob className="absolute bottom-10 left-10 opacity-10" size="md" delay={2} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <BackButton className="inline-flex items-center gap-2 text-sea-green font-semibold hover:text-sea-green/90 transition-all" />
          </div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Article Header */}
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                {categoryArray.length > 0 && (
                  <div className="bg-sea-green/10 text-sea-green px-4 py-2 rounded-full font-semibold">
                    {categoryArray[0]}
                  </div>
                )}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-dark-slate/70 hover:text-sea-green transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Поделиться
                </button>
              </div>

              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-dark-slate mb-6 leading-tight">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-xl text-dark-slate/70 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-dark-slate/70">
                {hasAuthorData(post) && post.authorSlug && (
                  <Link href={`/team/${post.authorSlug}`}>
                    <div className="flex items-center gap-3">
                      {post.authorAvatar ? (
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName || 'Автор'}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-sea-green/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-sea-green" />
                        </div>
                      )}
                      <div>
                        {post.authorName && (
                          <div className="font-semibold text-dark-slate">{post.authorName}</div>
                        )}
                        {post.authorRole && <div>{post.authorRole}</div>}
                      </div>
                    </div>
                  </Link>
                )}

                {post.publishedDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.publishedDate).toLocaleDateString('ru-RU')}</span>
                  </div>
                )}

                {post.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} чтения</span>
                  </div>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {post.coverImage && (
              <div className="mb-12">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
              </div>
            )}

            {/* Article Content */}
            {post.content && (
              <GlassmorphicCard>
                <div
                  className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-dark-slate prose-p:text-dark-slate/80 prose-li:text-dark-slate/80 prose-strong:text-dark-slate prose-a:text-sea-green hover:prose-a:text-sea-green/80"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </GlassmorphicCard>
            )}

            {/* Tags */}
            {tagsArray.length > 0 && (
              <div className="mt-12">
                <h3 className="text-lg font-heading font-semibold text-dark-slate mb-4">
                  Теги статьи
                </h3>
                <div className="flex flex-wrap gap-3">
                  {tagsArray.map((tag: string) => (
                    <span
                      key={tag}
                      className="flex items-center gap-2 px-4 py-2 bg-sea-green/10 text-sea-green rounded-full font-semibold text-sm"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {hasAuthorData(post) && (
              <div className="mt-12">
                <GlassmorphicCard>
                  <div className="flex items-center gap-6">
                    {post.authorSlug && post.authorAvatar && (
                      <Link href={`/team/${post.authorSlug}`}>
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName || 'Автор'}
                          className="w-16 h-16 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      </Link>
                    )}
                    {!post.authorSlug && post.authorAvatar && (
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName || 'Автор'}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    {post.authorAvatar ? (
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName || 'Автор'}
                        className="w-16 h-16 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-sea-green/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-sea-green" />
                      </div>
                    )}
                    <div>
                      {post.authorName && (
                        <>
                          {post.authorSlug ? (
                            <Link href={`/team/${post.authorSlug}`}>
                              <h4 className="text-xl font-heading font-semibold text-dark-slate mb-2 cursor-pointer hover:text-sea-green transition-colors">
                                {post.authorName}
                              </h4>
                            </Link>
                          ) : (
                            <h4 className="text-xl font-heading font-semibold text-dark-slate mb-2">
                              {post.authorName}
                            </h4>
                          )}
                        </>
                      )}
                      {post.authorRole && (
                        <p className="text-dark-slate/70 mb-2">{post.authorRole}</p>
                      )}
                      <p className="text-dark-slate/60 text-sm">
                        Эксперт в области экологии с более чем 10-летним опытом работы в сфере устойчивого развития и охраны окружающей среды.
                      </p>
                    </div>
                  </div>
                </GlassmorphicCard>
              </div>
            )}
          </motion.article>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-off-white to-soft-blue/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-dark-slate mb-4">
                Похожие статьи
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => {
                const relatedCategoryArray = normalizeCategory(relatedPost.category);
                return (
                  <GlassmorphicCard key={relatedPost.slug}>
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <article className="space-y-4 cursor-pointer">
                        {relatedPost.coverImage && (
                          <img
                            src={relatedPost.coverImage}
                            alt={relatedPost.title}
                            className="w-full h-48 object-cover rounded-xl"
                          />
                        )}
                        <div className="space-y-2">
                          {relatedCategoryArray.length > 0 && (
                            <div className="text-sm text-sea-green font-semibold">
                              {relatedCategoryArray[0]}
                            </div>
                          )}
                          <h3 className="text-lg font-heading font-semibold text-dark-slate line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          {relatedPost.excerpt && (
                            <p className="text-dark-slate/70 text-sm line-clamp-2">
                              {relatedPost.excerpt}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-dark-slate/60">
                            {relatedPost.publishedDate && (
                              <span>{new Date(relatedPost.publishedDate).toLocaleDateString('ru-RU')}</span>
                            )}
                            {relatedPost.readTime && (
                              <span>{relatedPost.readTime}</span>
                            )}
                          </div>
                        </div>
                      </article>
                    </Link>
                  </GlassmorphicCard>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassmorphicCard className="text-center">
            <h2 className="text-3xl font-heading font-bold text-dark-slate mb-6">
              Хотите узнать больше?
            </h2>
            <p className="text-xl text-dark-slate/70 mb-8 max-w-3xl mx-auto">
              Свяжитесь с нами для получения персональной консультации по вопросам экологии и устойчивого развития.
            </p>
            <NavigationLink
              href="/contact"
              analyticsLabel={CTA_LABELS.consultation}
              analyticsLocation="blog_post_cta"
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