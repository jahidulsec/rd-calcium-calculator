import "server-only";

export type Locales = "en" | "bn";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  bn: () => import("../dictionaries/bn.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locales) => dictionaries[locale]();

export type DictionaryType = Awaited<ReturnType<(typeof dictionaries)["en"]>>;
