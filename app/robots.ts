import type { MetadataRoute } from "next";

// Ask search engines not to crawl the site. Change to `allow: "/"` to let it be indexed.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
