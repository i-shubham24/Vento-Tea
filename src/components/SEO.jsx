import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  keywords = "premium tea, Assam tea, Darjeeling tea, buy tea online, local tea businesses, Vento tea, organic Indian tea", 
  type = "website",
  url = "https://ventotea.com",
  schema = null 
}) {
  const siteTitle = `${title} | Vento Tea - No.1 Premium Local Tea Brand`;
  const defaultDesc = description || "Discover Vento Tea, India's finest local tea brand delivering premium Assam and Darjeeling blends fresh from the estates. Shop organic, authentic chai and wellness teas.";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name='description' content={defaultDesc} />
      <meta name='keywords' content={keywords} />

      {/* OpenGraph tags for social sharing */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={defaultDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Vento Tea" />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={defaultDesc} />

      {/* Inject JSON-LD Schema if provided */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
