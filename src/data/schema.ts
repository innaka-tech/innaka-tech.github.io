/**
 * Structured data (JSON-LD) — dibangun dari data yang sama dengan konten halaman,
 * supaya Google & mesin AI membaca fakta yang identik dengan yang dilihat pengunjung.
 */
import { site, companyName } from './site';
import { services, products, faqs } from './services';
import { type DetailPage, pageUrl } from './pages';

const url = site.url;
const orgId = `${url}/#org`;
const websiteId = `${url}/#website`;

const address = {
  '@type': 'PostalAddress',
  streetAddress: site.addressFull.street,
  addressLocality: site.addressFull.city,
  addressRegion: site.addressFull.region,
  postalCode: site.addressFull.postalCode,
  addressCountry: site.addressFull.country,
};

/** Entitas bisnis — dipakai di semua halaman */
export const organization = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': orgId,
  name: companyName,
  alternateName: site.name,
  description: site.about,
  url,
  email: site.email,
  telephone: `+${site.whatsapp}`,
  logo: { '@type': 'ImageObject', url: `${url}/logo.png`, width: 1024, height: 1024 },
  image: `${url}/og.png`,
  address,
  hasMap: site.mapsUrl,
  areaServed: [
    { '@type': 'City', name: 'Bekasi' },
    { '@type': 'AdministrativeArea', name: 'Jabodetabek' },
    { '@type': 'Country', name: 'Indonesia' },
  ],
  knowsAbout: site.knowsAbout,
  knowsLanguage: ['id', 'en'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: `+${site.whatsapp}`,
    email: site.email,
    availableLanguage: ['Indonesian', 'English'],
    areaServed: 'ID',
  },
  sameAs: [...Object.values(site.social), site.mapsUrl],
};

export const website = {
  '@type': 'WebSite',
  '@id': websiteId,
  url,
  name: companyName,
  alternateName: site.name,
  inLanguage: 'id-ID',
  publisher: { '@id': orgId },
};

/** Layanan → OfferCatalog, satu katalog per pilar */
const serviceCatalog = {
  '@type': 'OfferCatalog',
  '@id': `${url}/#layanan`,
  name: 'Layanan Innaka Tech',
  itemListElement: services.map((s) => ({
    '@type': 'OfferCatalog',
    name: s.title,
    description: s.summary,
    itemListElement: s.items
      .filter((it) => !it.soon)
      .map((it) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: it.title,
          description: it.desc,
          provider: { '@id': orgId },
          areaServed: 'ID',
        },
      })),
  })),
};

const softwareApps = products.map((p) => ({
  '@type': 'SoftwareApplication',
  '@id': `${url}/#${p.id}`,
  name: p.name,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: p.tag,
  description: `${p.headline} ${p.desc}`,
  featureList: p.features,
  inLanguage: 'id-ID',
  publisher: { '@id': orgId },
  url: `${url}/#${p.id}`,
}));

const faqPage = {
  '@type': 'FAQPage',
  '@id': `${url}/#faq`,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

/** Graph lengkap untuk halaman utama */
export function homeGraph(title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { ...organization, hasOfferCatalog: { '@id': serviceCatalog['@id'] } },
      website,
      {
        '@type': 'WebPage',
        '@id': `${url}/#webpage`,
        url: `${url}/`,
        name: title,
        description,
        inLanguage: 'id-ID',
        isPartOf: { '@id': websiteId },
        about: { '@id': orgId },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${url}/og.png`, width: 1200, height: 630 },
        mainEntity: { '@id': orgId },
      },
      serviceCatalog,
      ...softwareApps,
      faqPage,
    ],
  };
}

/** Graph minimal untuk halaman lain (mis. 404) */
export function baseGraph() {
  return { '@context': 'https://schema.org', '@graph': [organization, website] };
}

/** Graph untuk halaman detail layanan / produk */
export function detailGraph(page: DetailPage, title: string) {
  const pageUrlAbs = `${url}${pageUrl(page)}`;
  const sectionName = page.kind === 'layanan' ? 'Layanan' : 'Produk';
  const sectionAnchor = page.kind === 'layanan' ? 'layanan' : 'produk';

  const mainEntity =
    page.kind === 'produk'
      ? {
          '@type': 'SoftwareApplication',
          '@id': `${pageUrlAbs}#software`,
          name: page.name,
          applicationCategory: 'BusinessApplication',
          applicationSubCategory: page.schemaType,
          operatingSystem: 'Web (PWA)',
          description: page.intro,
          featureList: page.features.map((f) => f.title),
          inLanguage: 'id-ID',
          publisher: { '@id': orgId },
          url: pageUrlAbs,
        }
      : {
          '@type': 'Service',
          '@id': `${pageUrlAbs}#service`,
          name: page.name,
          serviceType: page.schemaType,
          description: page.intro,
          provider: { '@id': orgId },
          areaServed: organization.areaServed,
          audience: { '@type': 'BusinessAudience', name: page.audience.join('; ') },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${page.name} — cakupan`,
            itemListElement: page.features
              .filter((f) => !f.soon)
              .map((f) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: f.title, description: f.desc } })),
          },
          url: pageUrlAbs,
        };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      website,
      {
        '@type': 'WebPage',
        '@id': `${pageUrlAbs}#webpage`,
        url: pageUrlAbs,
        name: title,
        description: page.description,
        inLanguage: 'id-ID',
        isPartOf: { '@id': websiteId },
        about: { '@id': mainEntity['@id'] },
        breadcrumb: { '@id': `${pageUrlAbs}#breadcrumb` },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${url}/og.png`, width: 1200, height: 630 },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrlAbs}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${url}/` },
          { '@type': 'ListItem', position: 2, name: sectionName, item: `${url}/#${sectionAnchor}` },
          { '@type': 'ListItem', position: 3, name: page.name, item: pageUrlAbs },
        ],
      },
      mainEntity,
      {
        '@type': 'FAQPage',
        '@id': `${pageUrlAbs}#faq`,
        mainEntity: page.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };
}
