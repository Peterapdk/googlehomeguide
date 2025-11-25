import { Step } from '../types';

export const TIPS_STEPS: Step[] = [
  {
    id: 1,
    title: 'Stemmekommandoer',
    description: 'Lær det grundlæggende: Sådan taler du med din Google Home.',
    detailedInfo: 'Start altid med at sige "Hey Google" eller "Ok Google". \n\nPrøv disse kommandoer:\n- "Hvad er vejret i dag?"\n- "Sæt en timer på 5 minutter"\n- "Hvad er klokken?"\n- "Minder mig om at købe mælk kl. 16"',
    icon: 'mic',
    quiz: {
      question: 'Hvad skal du sige for at aktivere enheden?',
      options: [
        { label: 'Hej Computer', isCorrect: false, feedback: 'Næsten, men ikke helt. Det er et specifikt Google-navn.' },
        { label: 'Hey Google / Ok Google', isCorrect: true, feedback: 'Præcis! Det er "vækkeordene", der får enheden til at lytte.' }
      ]
    }
  },
  {
    id: 2,
    title: 'Musik og Radio',
    description: 'Brug din højttaler til underholdning og radio.',
    detailedInfo: 'Du kan afspille musik fra Spotify, YouTube Music eller radio via TuneIn.\n\nPrøv at sige:\n- "Spil noget popmusik"\n- "Spil P3 Radio"\n- "Skru op for lyden"\n- "Stop musikken"',
    icon: 'music',
    quiz: {
      question: 'Kan du høre dansk radio på Google Home?',
      options: [
        { label: 'Ja, bare bed om kanalen', isCorrect: true, feedback: 'Lige præcis. Sig f.eks. "Spil Radio Soft" eller "Spil DR Nyheder".' },
        { label: 'Nej, kun engelsk musik', isCorrect: false, feedback: 'Det passer ikke. Den understøtter de fleste danske radiokanaler.' }
      ]
    }
  },
  {
    id: 3,
    title: 'Rutiner',
    description: 'Få Google til at gøre flere ting på én gang.',
    detailedInfo: 'Med "Rutiner" kan én sætning udløse flere handlinger. \n\nStandard rutinen "Godmorgen":\nNår du siger "Hey Google, godmorgen", kan den:\n1. Fortælle om vejret\n2. Oplæse dagens kalenderaftaler\n3. Afspille nyhederne\n\nDu kan tilpasse dette i Google Home appen.',
    icon: 'sun',
  },
  {
    id: 4,
    title: 'Smart Home Styring',
    description: 'Styr lyset og tv\'et med din stemme.',
    detailedInfo: 'Hvis du har Philips Hue pærer eller et Chromecast, kan du forbinde dem i Home appen.\n\nDerefter kan du sige:\n- "Tænd lyset i stuen"\n- "Dæmp lyset til 50%"\n- "Tænd for TV\'et"\n- "Vis billeder af hunde på TV\'et"',
    icon: 'bulb',
    quiz: {
      question: 'Hvad kræver det for at styre lyset?',
      options: [
        { label: 'Kun Google Home enheden', isCorrect: false, feedback: 'Du skal også bruge smarte pærer (som Philips Hue eller IKEA Trådfri) der er forbundet.' },
        { label: 'Smarte pærer forbundet til appen', isCorrect: true, feedback: 'Korrekt. Enhederne skal parres i Google Home appen først.' }
      ]
    }
  },
  {
    id: 5,
    title: 'Sjov og Spil',
    description: 'Din Google Home har masser af personlighed.',
    detailedInfo: 'Google Home er ikke kun til arbejde. Prøv at spørge om disse ting:\n\n- "Fortæl en vittighed"\n- "Syng en sang"\n- "Slå plat eller krone"\n- "Hvad siger ræven?"\n- "Fortæl en historie"',
    icon: 'smile',
  }
];