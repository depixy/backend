import qs from "qs";

/**
 * Parse query string with `qs` but also handle numbers and boolean
 *
 * @see https://github.com/ljharb/qs/issues/91
 */
export function parseQueryString(query: string): Record<string, unknown> {
  return qs.parse(query, {
    decoder(str, decoder, charset) {
      const strWithoutPlus = str.replace(/\+/ug, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/ugi, unescape);
      }

      // eslint-disable-next-line prefer-named-capture-group
      if (/^[+-]?\d+(\.\d+)?$/u.test(str)) {
        return parseFloat(str);
      }

      const keywords = { true: true, false: false, null: null, undefined };
      if (str in keywords) {
        const key = str as keyof typeof keywords;
        return keywords[key];
      }

      // utf-8
      return decoder(strWithoutPlus);
    }
  });
}
