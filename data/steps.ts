import { Step } from '../types';

export const INSTALLATION_STEPS: Step[] = [
  {
    id: 1,
    title: 'Udpakning',
    description: 'Tag din Google Home Mini og strømkablet ud af kassen.',
    detailedInfo: 'Du burde finde en rund højttaler-enhed og et hvidt strømkabel. Fjern al plastikemballage. Sørg for, at du har et frit stik i nærheden af, hvor du vil placere enheden.',
    icon: 'box',
    quiz: {
      question: 'Har du fundet både enheden og kablet?',
      options: [
        { label: 'Ja, jeg har begge dele', isCorrect: true, feedback: 'Fantastisk! Lad os gå videre til strømmen.' },
        { label: 'Nej, jeg mangler noget', isCorrect: false, feedback: 'Tjek æsken igen. Strømkablet ligger ofte gemt under papindlægget.' }
      ]
    }
  },
  {
    id: 2,
    title: 'Tilslut Strøm',
    description: 'Forbind strømkablet til enheden og derefter til stikkontakten.',
    detailedInfo: 'Sæt det runde stik i Google Home-enheden. Sæt derefter strømforsyningen i væggen. Vent ca. 30-60 sekunder. Enheden vil lyse op og måske afspille en lille lyd for at indikere, at den er tændt.',
    icon: 'plug',
    quiz: {
      question: 'Lyser lamperne på enheden?',
      options: [
        { label: 'Ja, de blinker', isCorrect: true, feedback: 'Perfekt! Enheden starter op.' },
        { label: 'Nej, den er helt mørk', isCorrect: false, feedback: 'Prøv en anden stikkontakt eller tjek om kablet sidder helt fast i enheden.' }
      ]
    }
  },
  {
    id: 3,
    title: 'Hent Google Home Appen',
    description: 'Download "Google Home" appen på din smartphone.',
    detailedInfo: 'Gå til App Store (iPhone) eller Google Play Butik (Android). Søg efter "Google Home" og installer appen med det farverige hus-ikon. Sørg for, at din telefons Bluetooth er tændt.',
    icon: 'smartphone',
  },
  {
    id: 4,
    title: 'Forbindelse',
    description: 'Åbn appen og start opsætningen.',
    detailedInfo: '1. Åbn Google Home appen.\n2. Tryk på "+" eller "Opsæt enhed".\n3. Vælg "Ny enhed".\n4. Appen vil nu søge efter din Google Home Mini.',
    icon: 'wifi',
    quiz: {
      question: 'Fandt appen din enhed?',
      options: [
        { label: 'Ja, den spørger om jeg vil opsætte den', isCorrect: true, feedback: 'Sådan! Nu skal vi bare forbinde den.' },
        { label: 'Nej, den søger stadig', isCorrect: false, feedback: 'Sørg for, at du er tæt på enheden, og at Bluetooth er tændt på din telefon.' }
      ]
    }
  },
  {
    id: 5,
    title: 'Konfiguration',
    description: 'Følg trinene på skærmen for at afslutte.',
    detailedInfo: 'Appen vil bede dig om at:\n1. Bekræfte lyden fra enheden.\n2. Vælge et navn til rummet (f.eks. "Stue").\n3. Vælge dit Wi-Fi netværk og indtaste koden.\n\nNår dette er gjort, kan du begynde at tale til din Google Home!',
    icon: 'check',
  }
];