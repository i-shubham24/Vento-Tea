import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://ventotea.com';
// Default social-share image (1.9:1 banner). Absolute URL is required by OG.
const DEFAULT_IMAGE = `${SITE_URL}/brand/client/home/1.png`;

export default function SEO({
  title,
  description,
  keywords = "premium tea, Assam tea, Darjeeling tea, buy tea online, local tea businesses, Vento tea, organic Indian tea",
  type = "website",
  image = DEFAULT_IMAGE,
  noindex = false,
  schema = null,
}) {
  const { pathname } = useLocation();
  const canonical = `${SITE_URL}${pathname}`;
  const siteTitle = `${title} | Vento Tea - No.1 Premium Local Tea Brand`;
  const defaultDesc = description || "Discover Vento Tea, India's finest local tea brand delivering premium Assam and Darjeeling blends fresh from the estates. Shop organic, authentic chai and wellness teas.";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name='description' content={defaultDesc} />
      <meta name='keywords' content={keywords} />
      <link rel="canonical" href={canonical} />
      {noindex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow" />}

      {/* OpenGraph tags for social sharing */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={defaultDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Vento Tea" />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={siteTitle} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={defaultDesc} />
      <meta name="twitter:image" content={image} />

      {/* Inject JSON-LD Schema if provided */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
