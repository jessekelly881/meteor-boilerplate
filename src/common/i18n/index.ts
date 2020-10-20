/**
 * @module i18n
 */

import "./trans/common/en-us.i18n.yml";
import "./trans/common/es-mx.i18n.yml";

import { i18n } from "meteor/universe:i18n";
import { fromNullable, Option, getOrElse } from "fp-ts/Option";
import { pipe } from "fp-ts/function";

export interface Lang {
    code: string;
    nativeName: string;
}

/**
 * t
 * @desc Alias for i18n.__ from meteor/universe:i18n
 */
export const t = i18n.__;

/**
 * browserLang :: () => Option String
 * @desc Returns the browser language.
 */
const browserLang = (): Option<String> =>
    pipe(navigator.languages[0] || navigator.language, fromNullable);

/**
 * defaultLangStr :: () => string
 * @desc Default lang string. E.g. en-US. Should not be used directly. Used in defaultLang function.
 */
const defaultLangStr = () => "en-US";

/**
 * defaultLang :: () => string
 * @desc The default language to use for i18n.
 */
export const defaultLang = pipe(browserLang(), getOrElse(defaultLangStr));

/**
 * getUserLang :: () => String
 * @desc Returns the users language
 */
export const getUserLang = () => defaultLang;

/**
 * setLang :: String -> IO
 * @desc Attempts to set the current language.
 */
export const setLang = (lang: string) => false;

/**
 * userLang :: () => Option String
 * @desc Returns the users language.
 */
export const userLang = (): Option<String> => pipe("", fromNullable);

// log language change events
i18n.onChangeLocale((locale: string) => {
    console.log("Language changed:", locale);
});
