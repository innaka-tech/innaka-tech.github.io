/**
 * Structured data (JSON-LD) — dibangun dari data yang sama dengan konten halaman,
 * supaya Google & mesin AI membaca fakta yang identik dengan yang dilihat pengunjung.
 */
import { site, companyName } from './site';
import { services, products, faqs } from './services';

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
  logo: { '@type': 'ImageObject', url: `${url}/logo.png`, width: 512, height: 512 },
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
