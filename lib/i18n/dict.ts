import { en } from "./en";
import { pt } from "./pt";
import type { Lang } from "./index";

export const dict = { en, pt };
export const getDict = (lang: Lang) => dict[lang];
export type Ui = (typeof en)["ui"];

/** Fills {name}-style gaps in a text. */
export const fill = (s: string, vars: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
