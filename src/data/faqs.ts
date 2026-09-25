import type { CityData } from './cities';

export interface FAQItem {
  question: string;
  answer: string;
}

export function getFaqsForCity(city: CityData): FAQItem[] {
  return [
    {
      question: `Do you provide drain cleaning in ${city.cityName}, Iowa?`,
      answer: `Yes. A-1 Drain Cleaning is based in Mason City and serves ${city.cityName} and nearby North Iowa communities. Call 641-530-2728 and describe the problem and location.`,
    },
    {
      question: `What should I do if my basement floor drain is backing up in ${city.cityName}?`,
      answer: 'Stop using water in the house if possible. A basement floor drain can be the lowest point where a main drain or sewer blockage becomes visible. Call A-1 before adding more water to the line.',
    },
    {
      question: `Why are several drains backing up at the same time?`,
      answer: 'When more than one fixture is affected together, the restriction may be farther down the house drain or sewer line rather than inside one sink or tub. A-1 can clear the line and determine what the symptoms indicate.',
    },
    {
      question: `Can tree roots cause a sewer line to keep clogging?`,
      answer: 'Yes. Roots can enter older sewer pipes through joints or damaged sections and reduce the opening inside the pipe. Root cutting can reopen the line, while recurring problems may justify a camera inspection.',
    },
    {
      question: `Do you hydro jet every clogged sewer line?`,
      answer: 'No. Hydro jetting is used when it fits the blockage, pipe, access, and condition of the line. Cable cleaning is often the appropriate method for a straightforward blockage.',
    },
  ];
}
