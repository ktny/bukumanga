import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  ogp?: {
    title?: string;
    description?: string;
    type?: "website" | "article";
  };
}

const SITE_NAME = "BUKUMANGA";
const DEFAULT_TITLE = `${SITE_NAME} - 面白いWEB漫画が見つかるサイト`;
const DEFAULT_DESCRIPTION = `${SITE_NAME}は、複数のWEB漫画配信サービスに分散している作品情報をまとめて、今読まれている作品や面白い作品を探しやすくするためのサービスです。`;
const DEFAULT_OG_IMAGE = "/ogp.png";

export function SEO({ title, description, ogp }: SEOProps) {
  const fullTitle = title ? `${title} - ${SITE_NAME}` : DEFAULT_TITLE;
  const fullDescription = description || DEFAULT_DESCRIPTION;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />

      {/* OGP */}
      <meta property="og:title" content={ogp?.title || fullTitle} />
      <meta property="og:description" content={ogp?.description || fullDescription} />
      <meta property="og:type" content={ogp?.type || "website"} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogp?.title || fullTitle} />
      <meta name="twitter:description" content={ogp?.description || fullDescription} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
    </Helmet>
  );
}
