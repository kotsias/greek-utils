import { Injectable } from '@angular/core';
import { diacriticsMap, greeklishToGreekMap, greekToGreeklishMap, 
    greekToPhoneticLatinMap, greekToTransliteratedLatinMap } from './mappings';

@Injectable({providedIn: 'root'})
export class UtilsService {

    constructor() { }

    /**
	 * Convert a Latin/greeklish characters text to its modern Greek equivalent.
	 *
	 * @method toGreek
	 * @static
	 * @param {String} text
	 * @param {String} ignore
	 * @returns {String}
	 */
    
	public toGreek (text, ignore) {
		return this.replaceText(text, greeklishToGreekMap, true, ignore);
	}

	/**
	 * Convert a modern Greek characters text to its greeklish equivalent.
	 *
	 * @method toGreeklish
	 * @static
	 * @param {String} text
	 * @param {String} ignore
	 * @returns {String}
	 */
	public toGreeklish(text, ignore) {
		return this.replaceText(text, greekToGreeklishMap, true, ignore);
	}

	/**
	 * Convert a modern Greek characters text to its phonetically equivalent Latin (sound mapping).
	 *
	 * @method toPhoneticLatin
	 * @static
	 * @param {String} text
	 * @param {String} ignore
	 * @returns {String}
	 */
	public toPhoneticLatin(text, ignore) {
		return this.replaceText(text, greekToPhoneticLatinMap, true, ignore);
	}

	/**
	 * Convert a modern Greek characters text to its transliterated equivalent Latin (letter mapping).
	 *
	 * @method toTransliteratedLatin
	 * @static
	 * @param {String} text
	 * @param {String} ignore
	 * @returns {String}
	 */
	public toTransliteratedLatin (text, ignore) {
		return this.replaceText(text, greekToTransliteratedLatinMap, true, ignore);
	}

	/**
	 * Convert a modern/ancient Greek characters text containing diacritics to its simple equivalent without diacritics.
	 *
	 * @method sanitizeDiacritics
	 * @static
	 * @param {String} text
	 * @param {String} ignore
	 * @returns {String}
	 */
	sanitizeDiacritics (text, ignore) {
		return this.replaceText(text, diacriticsMap, false, ignore);
    }
    
    /**
     *
     * @param {String} text
     * @param {Array} characterMap
     * @param {Boolean} exactMatch
     * @param {String} ignore
     * @returns {String}
     */
    private replaceText(text, characterMap, exactMatch, ignore) {

        let regexString: any;
        let regex: any;
        exactMatch = exactMatch || false;

        if (typeof text === 'string' && text.length > 0) {
            characterMap.forEach(characters => {
                regexString = exactMatch ? characters.find : '[' + characters.find + ']';
                if (ignore) { regexString = '(?![' + ignore + '])' + regexString; }
                regex = new RegExp(regexString, 'g');
                text = text.replace(regex, characters.replace);
            });
        }

        return text;
    }

}
