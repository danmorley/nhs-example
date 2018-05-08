import testImage from '../../assets/images/Trump2.jpg';
import testBackgroundImage from '../../assets/images/app-screen.jpg';

/**
*
*  content: {
*
*  }
*/
const MOBILE_TRANSITION_POINT = 992;

class ImageUtils {

  static isValid(image) {
    return image && image.renditions
     && image.renditions.mobile && image.renditions.mobile.length > 0
     && image.renditions.desktop && image.renditions.desktop.length > 0;
  }

  static placeholderImage() {
    return { link: testImage, title: 'Placeholder image' };
  }

  static placeholderBackgroundImage() {
    return { link: testBackgroundImage, title: 'Placeholder background image' };
  }

  static backgroundImageStyle(image, defaultImage) {
    return {
      backgroundImage: 'url(' + ImageUtils.imageUrl(image, defaultImage) + ')'
    };
  }

  /**
   * Return image URL for passed image. Use the calculated
   * rendition if available, otherwise use the image link.
   */
  static imageUrl(image, defaultImage) {
    image = ImageUtils.imageOrDefault(image, defaultImage);
    if (!image) return '';

    if (image.renditions) {
      const key = ImageUtils.screenSize();
      return image.renditions[key] || '';
    } else {
      return image.link || '';
    }
  }

  static screenSize() {
    const screenWidth = document.documentElement.clientWidth;
    return (screenWidth > MOBILE_TRANSITION_POINT) ? 'desktop' : 'mobile';
  }

  static imageOrDefault(image, defaultImage) {
    return (image && (image.link || image.renditions)) ? image : defaultImage;
  }

  static deviceImage(image) {
    const key = ImageUtils.screenSize();
    image.link = image.renditions[key];
    return image;
  }
}

export default ImageUtils;
