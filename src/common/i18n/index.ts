/**
 * @module i18n
 * Module for handling everything related to i18n translations.
 */

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
