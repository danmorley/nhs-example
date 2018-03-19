/**
 *  Simple utility class to provide common call to action functionality.
 */
class CtaUtils {
  /**
   * Return true if CTA is an object:
   *
   * {
   *   "link_text": "More about Cholesterol",
   *   "link_external": "https://www.nhs.uk/conditions/high-cholesterol/",
   *   "link_page": null
   * }
   *
   * or and array of one or more CTAs.
   */
  static isCta(cta) {
    if (cta instanceof Array) return cta.length > 0;
    return cta instanceof Object;
  }

  /**
   * Return true if CTA is an object or an array of exactly one CTA.
   */
  static isSingleCta(cta) {
    if (cta instanceof Array) return cta.length == 1;
    return cta instanceof Object;
  }
}

export default CtaUtils;
