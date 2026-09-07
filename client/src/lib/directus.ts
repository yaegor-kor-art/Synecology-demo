import { logger } from './logger';
import { DIRECTUS_URL, getDirectusAssetUrl } from './directus-config';

const API_BASE = "/api";

export { DIRECTUS_URL, getDirectusAssetUrl as getImageUrl };

export type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category?: string[];
  tags?: string[];
  client?: string;
  projectDate?: string;
  featured?: boolean;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  timeline?: string;
  completionDate?: string;
  location?: string;
  teamSize?: string;
  results?: string[];
  metrics?: any[];
};

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  image?: string;
  coverImage?: string;
  author?: string;
  authorName?: string;
  authorSlug?: string;
  status: 'published' | 'draft';
  date_created: string;
  date_updated: string;
  publishedDate?: string;
  tags?: string[];
  featured?: boolean;
  category?: string | string[];
  readTime?: string;
};

export async function fetchDirectusCases(): Promise<CaseStudy[]> {
  try {
    logger.debug('Loading cases...');

    const res = await fetch(`${API_BASE}/directus-cases`);
    logger.debug('Response status:', res.status);

    if (!res.ok) {
      const errorText = await res.text();
      logger.warn('Proxy error response:', errorText);
      throw new Error(`Failed to fetch case studies: ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type');
    const responseText = await res.text();

    // Check if response is HTML (error page)
    if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
      logger.error('Received HTML error page instead of JSON:', responseText.substring(0, 200));
      throw new Error('Server returned HTML error page instead of JSON data');
    }

    if (!contentType || !contentType.includes('application/json')) {
      logger.error('Non-JSON response received:', responseText.substring(0, 300));
      throw new Error(`Expected JSON but received ${contentType}: ${responseText.substring(0, 100)}`);
    }

    let json;
    try {
      json = JSON.parse(responseText);
    } catch (parseError) {
      logger.error('JSON parse error:', parseError, 'Response text:', responseText.substring(0, 300));
      throw new Error(`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown parse error'}`);
    }

    logger.debug('Proxy API Response:', json);

    // Check if this is an error response from our proxy
    if (json.status === 500) {
      throw new Error(json.message || 'Proxy server error');
    }

    if (!json.data) {
      logger.warn('No data field in response:', json);
      return [];
    }

    if (!Array.isArray(json.data)) {
      logger.warn('Data is not an array:', json.data);
      return [];
    }

    const caseStudies = json.data.map((item: any): CaseStudy => {
      logger.debug('Processing case study item:', item);

      // Handle category field - it might be a string or array
      let category = [];
      if (Array.isArray(item.category)) {
        category = item.category.filter(cat => cat && cat.trim());
      } else if (typeof item.category === 'string' && item.category.trim()) {
        category = [item.category.trim()];
      }

      // Handle tags field - it might be a string or array
      let tags = [];
      if (typeof item.tags === 'string' && item.tags.trim()) {
        try {
          tags = JSON.parse(item.tags);
        } catch {
          tags = item.tags.split(',').map(t => t.trim()).filter(t => t);
        }
      } else if (Array.isArray(item.tags)) {
        tags = item.tags.filter(tag => tag && tag.trim());
      }

      // Handle results field - it might be a string or array
      let results = [];
      if (typeof item.results === 'string' && item.results.trim()) {
        try {
          results = JSON.parse(item.results);
        } catch {
          results = item.results.split(',').map(r => r.trim()).filter(r => r);
        }
      } else if (Array.isArray(item.results)) {
        results = item.results.filter(result => result && result.trim());
      }

      // Handle metrics field - it might be a string or array
      let metrics = [];
      if (typeof item.metrics === 'string' && item.metrics.trim()) {
        try {
          metrics = JSON.parse(item.metrics);
        } catch {
          // If parsing fails, leave metrics empty
          metrics = [];
        }
      } else if (Array.isArray(item.metrics)) {
        metrics = item.metrics.filter(metric => metric);
      }

      return {
        id: item.id,
        title: item.title || '',
        slug: item.slug || `case-${item.id}`,
        excerpt: item.preview_text || item.excerpt || '',
        content: item.full_description || item.content || '',
        coverImage: getDirectusAssetUrl(item.cover_image),
        category: category.length > 0 ? category : undefined,
        tags: tags.length > 0 ? tags : undefined,
        client: item.client || undefined,
        projectDate: item.project_date || undefined,
        featured: Boolean(item.featured),
        fullDescription: item.full_description || item.full_content || undefined,
        challenge: item.challenge || undefined,
        solution: item.solution || undefined,
        timeline: item.timeline || undefined,
        completionDate: item.completion_date || undefined,
        location: item.location || undefined,
        teamSize: item.team_size || undefined,
        results: results.length > 0 ? results : undefined,
        metrics: metrics.length > 0 ? metrics : undefined,
      };
    });

    logger.debug('Successfully loaded cases:', caseStudies.length, 'cases');
    return caseStudies;
  } catch (error) {
    logger.error('Error fetching case studies:', error);
    throw error;
  }
}

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    logger.debug('Loading blog posts...');
    logger.debug('Fetching from proxy:', '/api/directus-blog');

    const response = await fetch(`${API_BASE}/directus-blog`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    logger.debug('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      logger.warn('Blog proxy error response:', errorText);
      throw new Error(`Failed to fetch blog posts: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      const responseText = await response.text();
      logger.error('Non-JSON response received. Content-Type:', contentType);
      logger.error('Response text:', responseText.substring(0, 300));
      
      // Check if response is HTML (error page from Vite or development server)
      if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
        logger.error('Received HTML error page instead of JSON');
        throw new Error('Server returned HTML error page. Check if the API endpoint is working correctly.');
      }
      
      throw new Error(`Expected JSON but received ${contentType}: ${responseText.substring(0, 100)}`);
    }

    let json;
    try {
      json = await response.json();
    } catch (parseError) {
      logger.error('JSON parse error:', parseError);
      throw new Error(`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown parse error'}`);
    }

    logger.debug('Blog Proxy API Response:', json);

    // Check if this is an error response from our proxy
    if (json.status === 500) {
      throw new Error(json.message || 'Proxy server error');
    }

    if (!json.data) {
      logger.warn('No data field in blog response:', json);
      return [];
    }

    if (!Array.isArray(json.data)) {
      logger.warn('Blog data is not an array:', json.data);
      return [];
    }

    const blogPosts = json.data
      .filter((item: any) => item.status === 'published')
      .map((item: any) => ({
        ...item,
        coverImage: getDirectusAssetUrl(item.cover_image),
        image: getDirectusAssetUrl(item.cover_image),
        publishedDate: item.date_updated || item.date_created,
        authorName: item.author_name || item.author,
        readTime: item.read_time || '5 мин'
      }));
    logger.debug('Successfully loaded blog posts:', blogPosts.length, 'posts');
    return blogPosts;
  } catch (error) {
    logger.error('Error fetching blog posts:', error);
    throw error;
  }
};

// Alias for backwards compatibility
export const fetchCaseStudies = fetchDirectusCases;