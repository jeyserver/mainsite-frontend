import { ITld } from '../pages/_app';

type categories =
  | 'commercial-domains'
  | 'cheap-domains'
  | 'national-domains'
  | 'service-domains'
  | 'country-domains';

export const getDomainsByCategory = (
  category: categories,
  domainList,
  famousAndTrendyDomains?,
  cheapDomainBreakPrice?: number
): ITld[] => {
  switch (category) {
    case 'commercial-domains':
      return domainList.filter((domain) =>
        famousAndTrendyDomains.some((i) => i === domain.tld)
      );
    case 'cheap-domains':
      return domainList.filter((domain) => domain.new < cheapDomainBreakPrice);
    case 'national-domains':
      return [domainList.find((domain) => domain.tld === 'ir')];
    case 'service-domains':
      return domainList.filter((domain) => domain.tld.length > 2);
    case 'country-domains':
      return domainList.filter((domain) => domain.tld.length === 2);
    default:
      return [];
  }
};
