import { getDirectusAssetUrl } from "./directus-config";
import { fetchBlogPosts as fetchBlogPostsFromDirectus } from "./directus";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category?: string[];
  tags?: string[];
  readTime?: string;
  authorName?: string;
  authorRole?: string;
  authorSlug?: string;
  authorAvatar?: string | null;
  publishedDate?: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
};

function mapBlogPost(item: Record<string, unknown>): BlogPost {
  let category: string[] = [];
  if (Array.isArray(item.category)) {
    category = item.category as string[];
  } else if (typeof item.category === "string") {
    category = [item.category];
  }

  let tags: string[] = [];
  if (typeof item.tags === "string") {
    try {
      tags = JSON.parse(item.tags);
    } catch {
      tags = item.tags.split(",").map((t) => t.trim()).filter(Boolean);
    }
  } else if (Array.isArray(item.tags)) {
    tags = item.tags as string[];
  }

  return {
    id: String(item.id),
    title: (item.title as string) || "Untitled",
    slug: (item.slug as string) || `blog-${item.id}`,
    excerpt: (item.excerpt as string) || (item.preview_text as string) || "",
    content: (item.content as string) || (item.full_content as string) || "",
    coverImage: getDirectusAssetUrl(item.cover_image as string),
    category,
    tags,
    readTime: (item.read_time as string) || (item.readTime as string) || "5 мин",
    authorName: (item.author_name as string) || (item.authorName as string) || "",
    authorRole: (item.author_role as string) || "",
    authorSlug: (item.author_slug as string) || "",
    authorAvatar: getDirectusAssetUrl(item.author_avatar as string),
    publishedDate:
      (item.published_date as string) ||
      (item.publishedDate as string) ||
      (item.date_updated as string) ||
      (item.date_created as string) ||
      new Date().toISOString(),
    featured: Boolean(item.featured),
    seoTitle: (item.seo_title as string) || "",
    seoDescription: (item.seo_description as string) || "",
    seoKeywords: (item.seo_keywords as string[]) || [],
  };
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const posts = await fetchBlogPostsFromDirectus();
  return posts.map((item) => mapBlogPost(item as unknown as Record<string, unknown>));
}

export { getDirectusAssetUrl as getImageUrl };
