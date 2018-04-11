/**
 *  Simple utility class to provide common call to action functionality.
 */
class CtaUtils {
  /**
   * Return true if CTA is an object or an array of one or more CTAs.
   */
  static isCta(cta) {
    if (cta instanceof Array) return cta.length > 0;
    return cta instanceof Object;
  }

  /**
   * Return true if CTA is an object or an array of exactly one CTA.
   */
  static isSingleCta(cta) {
    if (cta instanceof Array) return cta.length === 1;
    return cta instanceof Object;
  }

  /**
   * Return the single CTA if it is an object or an array of one item.
   */
  static getSingleCta(cta) {
    if (cta instanceof Array) return cta[0];
    return cta;
  }

  /**
   * Helper function to validate an actual CTA object. The following object is expected:
   *
   * cta: {
   *   link_text: "More about Cholesterol",
   *   link_external: "https://www.nhs.uk/conditions/high-cholesterol/",
   *   link_page: {}
   * }
   *
   * or
   *
   * cta: {
   *   link_text: "More about Cholesterol",
   *   link_external: "",
   *   link_page: {
   *     relative_path: "/oneyou/apps"
   *   }
   * }
   */
  static isValidCta(cta) {
    if (!(cta instanceof Object)) return false;
    if (cta.link_external && cta.link_external.length > 0) return true;
    if (cta.link_page && cta.link_page.relative_path) return true;
    return false;
  }

  static getCtaPath(cta) {
    return CtaUtils.isInternalCta(cta) ? cta.link_page.relative_path : cta.link_external;
  }

  static isInternalCta(cta) {
    return cta && cta.link_page && cta.link_page.relative_path;
  }

  static isExternalCta(cta) {
    return !CtaUtils.isInternalCta(cta);
  }
}

export default CtaUtils;
