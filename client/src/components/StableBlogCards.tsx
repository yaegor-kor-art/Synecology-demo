
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, User, ArrowRight } from 'lucide-react';
import NavigationLink from "@/components/NavigationLink";
import StableCard from '@/components/StableCard';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import { useStableLoading } from '@/hooks/useStableLoading';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  author: string;
  authorSlug: string;
  slug: string;
}

// Симуляция API запроса
const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  // Симулируем задержку сети
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: '1',
      title: "Экосертификат для бизнеса в Беларуси: как подтвердить «зеленый» статус и обойти конкурентов",
      excerpt: "Получение экологического сертификата — это не альтруизм, а стратегический шаг...",
      category: "Сертификация",
      date: "20.12.2024",
      readTime: "8 мин",
      image: "https://images.unsplash.com/photo-1727812100171-8af0e7211041?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
      tags: ["Экосертификат", "Органик", "ISO 14001"],
      author: "Корякин Егор Дмитриевич",
      authorSlug: "egor-koryakin",
      slug: "eco-certification-business-belarus"
    },
    {
      id: '2',
      title: "Отходы на предприятии в Беларуси: полное руководство по обращению от А до Я",
      excerpt: "Правильная организация системы обращения с отходами — это не просто забота о природе...",
      category: "Отходы",
      date: "18.12.2024",
      readTime: "10 мин",
      image: "https://images.unsplash.com/photo-1684324278460-25fbb2e3f175?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0",
      tags: ["Отходы", "Штрафы", "Инструкция"],
      author: "Корякин Егор Дмитриевич",
      authorSlug: "egor-koryakin",
      slug: "waste-management-enterprise-belarus"
    }
  ];
};

const BlogCardSkeleton: React.FC = () => (
  <div className="space-y-6 p-6">
    {/* Image skeleton */}
    <Skeleton className="w-full h-64 rounded-xl" />
    
    {/* Meta info skeleton */}
    <div className="flex items-center gap-4 flex-wrap">
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-24 rounded-full" />
      <Skeleton className="h-6 w-32 rounded-full" />
    </div>

    {/* Title skeleton */}
    <div className="space-y-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-4/5" />
    </div>

    {/* Excerpt skeleton */}
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>

    {/* Tags skeleton */}
    <div className="flex gap-2 flex-wrap">
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-24 rounded-full" />
    </div>

    {/* Button skeleton */}
    <Skeleton className="h-12 w-full rounded-full" />
  </div>
);

const BlogCard: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => (
  <NavigationLink href={`/blog/${post.slug}`} className="block group">
  <GlassmorphicCard className="h-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg cursor-pointer">
    <article className="flex flex-col h-full space-y-6 p-6">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-102"
          loading="lazy"
        />
      </div>

      <div className="flex items-center gap-4 text-sm flex-wrap">
        <div className="flex items-center gap-2 bg-sea-green/10 text-sea-green px-3 py-1 rounded-full">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">{post.date}</span>
        </div>
        <div className="flex items-center gap-2 bg-soft-blue/20 text-dark-slate px-3 py-1 rounded-full">
          <Clock className="w-4 h-4" />
          <span className="font-medium">{post.readTime}</span>
        </div>
        <div className="flex items-center gap-2 bg-sandy-beige/50 text-dark-slate px-3 py-1 rounded-full">
          <Tag className="w-4 h-4" />
          <span className="font-medium">{post.category}</span>
        </div>
        <NavigationLink
          href={`/team/${post.authorSlug}`}
          className="flex items-center gap-2 bg-dark-slate/10 text-dark-slate hover:bg-dark-slate/20 transition-colors px-3 py-1 rounded-full"
          onClick={(e) => e.stopPropagation()}
        >
          <User className="w-4 h-4" />
          <span className="font-medium">{post.author}</span>
        </NavigationLink>
      </div>

      <h3 className="text-2xl font-heading font-bold text-dark-slate line-clamp-3 group-hover:text-sea-green transition-colors duration-300">
        {post.title}
      </h3>

      <p className="text-dark-slate/70 line-clamp-4 flex-grow text-base leading-relaxed">
        {post.excerpt}
      </p>

      <div className="flex flex-wrap gap-2">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-sm rounded-full bg-sea-green/10 text-sea-green"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="bg-sea-green text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 mt-auto justify-center group-hover:bg-sea-green/90">
        <ArrowRight className="w-5 h-5" />
        Читать полную статью
      </div>
    </article>
  </GlassmorphicCard>
  </NavigationLink>
);

const StableBlogCards: React.FC = () => {
  const { data: posts, isLoading, error, refetch } = useStableLoading({
    fetcher: fetchBlogPosts,
    minLoadingTime: 500 // минимум 500ms для стабильности
  });

  if (error) {
    return (
      <GlassmorphicCard className="text-center py-16">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-heading font-semibold text-dark-slate mb-2">
            Ошибка загрузки
          </h3>
          <p className="text-dark-slate/70 mb-4">
            Не удалось загрузить статьи. Попробуйте еще раз.
          </p>
          <button
            onClick={refetch}
            className="bg-sea-green text-white px-6 py-3 rounded-full font-semibold hover:bg-sea-green/90 transition-all duration-300"
          >
            Попробовать снова
          </button>
        </div>
      </GlassmorphicCard>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {isLoading ? (
        // Показываем скелеты пока данные загружаются
        Array.from({ length: 4 }).map((_, index) => (
          <StableCard
            key={`skeleton-${index}`}
            isLoading={true}
            delay={index}
            minHeight={600}
            skeletonContent={<BlogCardSkeleton />}
          >
            <div />
          </StableCard>
        ))
      ) : (
        // Показываем данные с плавной анимацией
        posts?.map((post, index) => (
          <StableCard
            key={post.id}
            isLoading={false}
            delay={index}
            minHeight={600}
          >
            <BlogCard post={post} index={index} />
          </StableCard>
        ))
      )}
    </div>
  );
};

export default StableBlogCards;
