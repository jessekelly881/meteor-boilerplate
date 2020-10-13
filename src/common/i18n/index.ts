/**
 * @module i18n
 * Module for handling everything related to i18n translations.
 */

import { fromNullable, Option } from "fp-ts/Option";
import { pipe } from "fp-ts/function";

import "./trans/common/en-us.i18n.yml";
import "./trans/common/es-mx.i18n.yml";

const defaultLang = "en-US";

export interface Lang {
    code: string;
    nativeName: string;
}

/**
 * getLang :: () => String
 * Returns the language to use for translations, etc
 * Returns user lang if exists. If not returns browser lang if on client and a default value if not.
 */
export const getLang = () => defaultLang;

/**
 * setLang :: String -> IO
 * Attempts to set the current language.
 *
 */
export const setLang = (lang: string) => false;

/**
 * getBrowserLang :: () => Option String
 * Returns the browser language, if set.
 */
export const getBrowserLang = (): Option<String> =>
    pipe(
        (navigator.languages && navigator.languages[0]) || navigator.language,
        fromNullable,
    );
