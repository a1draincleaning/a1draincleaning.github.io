export const business = {
  name: 'A-1 Drain Cleaning',
  owner: 'Josh Theilen',

  phone: {
    raw: '6415302728',
    tel: '+16415302728',
    formatted: '(641) 530-2728',
  },

  address: {
    street: '206 29th St SW',
    city: 'Mason City',
    state: 'IA',
    postalCode: '50401',
    country: 'US',
  },

  website: 'https://a1draincleaning.github.io/',
  logo: 'https://a1draincleaning.github.io/a1-logo.svg',
  image:
    'https://a1draincleaning.github.io/images/a1-main-sewer-drain-cleaning-mason-city.webp',

  sameAs: [
    'https://www.brownbook.net/business/43888974/a-1-drain-cleaning',
    'https://www.manta.com/c/mt4dd28/a-1-drain-cleaning',
    'https://www.showmelocal.com/profile.aspx?bid=12546518',
    'https://scanmylocalbusiness.com/biz/a-1-drain-cleaning-m09y',
    'https://www.myzipplumbers.com/default.asp?f=disp_pg&filename=view_plumbers_profile.asp&id=1193719&company=A-1%20Drain%20Cleaning&city=Mason%20City',
  ],

  reviews: {
    rating: 4.9,
    count: 72,
    googleMapsUrl:
      'https://maps.google.com/maps?cid=7826151039410291134',
    googleReviewUrl:
      'https://search.google.com/local/writereview?placeid=ChIJ1-N4s2sH8YcRvsGa1ucSnGw',
  },

  serviceAreas: [
    'Mason City',
    'Clear Lake',
    'Forest City',
    'Charles City',
    'North Iowa',
  ],
} as const;
