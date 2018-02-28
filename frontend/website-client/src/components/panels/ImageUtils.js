import testImage from '../../assets/images/Trump2.jpg';

/**
 *
 *  content: {
 *
 *  }
 */
class ImageUtils {
  static placeholderImage() {
    return { link: testImage, title: 'Placeholder image' };
  }

  static backgroundImageUrl(image, defaultImage) {
    return (image && image.link) || defaultImage.link;
  }

  static backgroundImageStyle(image, defaultImage) {
    return {
      backgroundImage: 'url(' + ImageUtils.backgroundImageUrl(image, defaultImage) + ')'
    };
  }
}

export default ImageUtils;
