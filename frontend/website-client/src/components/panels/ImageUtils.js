import testImage from '../../assets/images/Trump2.jpg';
import testBackgroundImage from '../../assets/images/app-screen.jpg';

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

 static placeholderBackgroundImage() {
   return { link: testBackgroundImage, title: 'Placeholder background image' };
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