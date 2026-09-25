export interface CityData {
  cityName: string;
  county: string;
  slug: string;
  state?: string;
}

export interface BusinessInfo {
  name: string;
  owner: string;
  phoneTel: string;
  url: string;
  logoUrl: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generates a connected Schema.org @graph for a service-area page.
 * The business entity remains stable while WebPage, Service,
 * BreadcrumbList, and FAQPage are specific to the current URL.
 */
export function generateGraphSchema(
  city: CityData,
  businessInfo: BusinessInfo,
  faqData: FAQItem[],
  canonicalUrl: string
) {
  const state = city.state ?? businessInfo.addressRegion;
  const fullLocationName = `${city.cityName}, ${state}`;

  const organizationId = `${businessInfo.url}/#organization`;
  const websiteId = `${businessInfo.url}/#website`;
  const webPageId = `${canonicalUrl}#webpage`;
  const serviceId = `${canonicalUrl}#service`;

  const schemaGraph: Array<Record<string, unknown>> = [
    {
      '@type': 'PlumbingService',
      '@id': organizationId,
      name: businessInfo.name,
      url: businessInfo.url,
      telephone: businessInfo.phoneTel,
      logo: businessInfo.logoUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: businessInfo.addressLocality,
        addressRegion: businessInfo.addressRegion,
        postalCode: businessInfo.postalCode,
        addressCountry: businessInfo.addressCountry,
      },
      areaServed: [
        {
          '@type': 'City',
          name: city.cityName,
        },
        {
          '@type': 'AdministrativeArea',
          name: `${city.county} County`,
        },
      ],
      founder: {
        '@type': 'Person',
        name: businessInfo.owner,
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: businessInfo.url,
      name: businessInfo.name,
    },
    {
      '@type': 'WebPage',
      '@id': webPageId,
      url: canonicalUrl,
      name: `Sewer & Drain Cleaning in ${fullLocationName} | ${businessInfo.name}`,
      description: `Sewer line cleaning, floor drain clearing, tree root removal, and drain service in ${fullLocationName}. Direct service from owner-operator ${businessInfo.owner}.`,
      isPartOf: {
        '@id': websiteId,
      },
      about: {
        '@id': organizationId,
      },
      mainEntity: {
        '@id': serviceId,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: businessInfo.url,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: `${city.cityName} Service Area`,
          item: canonicalUrl,
        },
      ],
    },
    {
      '@type': 'Service',
      '@id': serviceId,
      name: `Sewer & Drain Cleaning in ${fullLocationName}`,
      provider: {
        '@id': organizationId,
      },
      areaServed: {
        '@type': 'City',
        name: city.cityName,
      },
      serviceType: 'Sewer & Drain Cleaning Service',
      description: `Main line sewer clearing, basement floor drain backups, root cutting, and drain service in ${fullLocationName}.`,
    },
  ];

  if (faqData.length > 0) {
    schemaGraph.push({
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: faqData.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemaGraph,
  };
}
