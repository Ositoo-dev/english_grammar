import type { GrammarSection } from "./types";
import { adverbiosDeFrecuencia } from "./01-adverbios-frecuencia";
import { pasadoVsContinuo } from "./02-pasado-vs-continuo";
import { presentePerfecto } from "./03-presente-perfecto";
import { reportedSpeech } from "./04-reported-speech";
import { vocabulario } from "./05-vocabulario";
import { verbos } from "./06-verbos";

export const grammarSections: GrammarSection[] = [
  adverbiosDeFrecuencia,
  pasadoVsContinuo,
  presentePerfecto,
  reportedSpeech,
  vocabulario,
  verbos,
];
