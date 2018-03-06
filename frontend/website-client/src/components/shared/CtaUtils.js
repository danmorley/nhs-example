/**
 *  Simple utility class to provide common call to action functionality.
 */
class CtaUtils {
 static isSingleCta(cta) {
   return (cta instanceof Array) ? cta.length == 1 : true;
 }
}

export default CtaUtils;
