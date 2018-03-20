import testImage from '../../assets/images/Trump2.jpg';
import testBackgroundImage from '../../assets/images/app-screen.jpg';

/**
*
*  content: {
*
*  }
*/
class ImageUtils {
  
  static isValid(image) {
    return image && image.link && image.link.length > 0;
  }

  static placeholderImage() {
    return { link: testImage, title: 'Placeholder image' };
  }

  static placeholderBackgroundImage() {
    return { link: testBackgroundImage, title: 'Placeholder background image' };
  }

  static imageUrl(image, defaultImage) {
    image = ImageUtils.imageOrDefault(image, defaultImage); 
    return image ? image.link : '';
  }

  static imageOrDefault(image, defaultImage) {
    return (image && image.link) ? image : defaultImage;
  }

  static backgroundImageStyle(image, defaultImage) {
    return {
      backgroundImage: 'url(' + ImageUtils.imageUrl(image, defaultImage) + ')'
    };
  }
}

export default ImageUtils;
