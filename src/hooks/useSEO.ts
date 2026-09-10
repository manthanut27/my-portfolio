import { useEffect } from 'react';

export const DEFAULT_TITLE = 'Manthan Utekar | Creative Developer & Full-Stack Engineer';
export const DEFAULT_DESCRIPTION =
  'Portfolio of Manthan Utekar — Creative Developer & Full-Stack Engineer based in Mumbai. Specializing in high-performance web applications, interactive 3D WebGL experiences, and scalable full-stack architectures with React, Three.js, GSAP, and Node.js.';

interface UseSEOOptions {
  title?: string;
  description?: string;
  enableTabNotice?: boolean;
}

export const useSEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  enableTabNotice = true,
}: UseSEOOptions) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Update Primary Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Open Graph Description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }

    // 4. Update Twitter Description
    const twitterDesc = document.querySelector('meta[property="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute('content', description);
    }

    // 5. Inactive Tab Visibility Handler
    if (!enableTabNotice) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Don't leave yet! 👋 | Manthan Utekar";
      } else {
        document.title = title;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [title, description, enableTabNotice]);
};

export default useSEO;
