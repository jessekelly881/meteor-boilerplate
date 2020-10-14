/**
 * @module i18n
 * Module for handling everything related to i18n translations.
 */

import "./trans/common/en-us.i18n.yml";
import "./trans/common/es-mx.i18n.yml";

import { fromNullable, Option } from "fp-ts/Option";
import { pipe } from "fp-ts/function";

const defaultLang = "en-US";

export interface Lang {
    code: string;
    nativeName: string;
}

/**
 * getLang :: () => String
 * Returns the language to use for translations, etc
 */
export const getLang = () => defaultLang;

/**
 * setLang :: String -> IO
 * Attempts to set the current language.
 */
export const setLang = (lang: string) => false;

/**
 * browserLang :: () => Option String
 * Returns the browser language.
 */
export const browserLang = (): Option<String> =>
    pipe(navigator.languages[0] || navigator.language, fromNullable);

/**
 * userLang :: () => Option String
 * Returns the users language.
 */
export const userLang = (): Option<String> => pipe("", fromNullable);
