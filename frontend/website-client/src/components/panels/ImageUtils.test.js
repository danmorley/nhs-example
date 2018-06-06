import ImageUtils from './ImageUtils';


// isValid function tests
it('returns true from isValid if all required properties present', () => {
    const image = {
        renditions: {
            mobile: 'mobile-image-link-address',
            desktop: 'desktop-image-link-address'
        }
    };
    const validResult = ImageUtils.isValid(image);
    expect(validResult).toBe(true);
});

it('returns false from isValid if some properties missing', () => {
    let image = {
    };
    let validResult = ImageUtils.isValid(image);
    expect(validResult).toBeFalsy();

    image.link = '';
    validResult = ImageUtils.isValid(image);
    expect(validResult).toBeFalsy();
});


// placeholderImage function tests
it('returns a placeholder image', () => {
    const placeholderImage = ImageUtils.placeholderImage();
    expect(placeholderImage.title).toEqual('Placeholder image');
    expect(placeholderImage.link).toEqual('test-image.jpg');
});


// placeholderBackgroundImage function tests
it('returns a placeholder background image', () => {
    const placeholderImage = ImageUtils.placeholderBackgroundImage();
    expect(placeholderImage.title).toEqual('Placeholder background image');
    expect(placeholderImage.link).toEqual('app-screen.jpg');
});


// imageOrDefault function tests
it('returns the placeholder image if no image provided', () => {
    const returnedImage = ImageUtils.imageOrDefault(null, ImageUtils.placeholderBackgroundImage());
    expect(returnedImage.link).toEqual('app-screen.jpg');
});

it('returns the placeholder image if no image link provided', () => {
    const returnedImage = ImageUtils.imageOrDefault({link: null}, ImageUtils.placeholderBackgroundImage());
    expect(returnedImage.link).toEqual('app-screen.jpg');
});

it('returns the image if image provided', () => {
    const returnedImage = ImageUtils.imageOrDefault({link: 'testImage.jpg', title: 'Test Image'}, ImageUtils.placeholderBackgroundImage());
    expect(returnedImage.title).toEqual('Test Image');
    expect(returnedImage.link).toEqual('testImage.jpg');
});


// screenSize function tests
it('returns mobile string when on a mobile', () => {
    const screenSize = ImageUtils.screenSize();
    expect(screenSize).toEqual('mobile');
});


// imageUrl function tests
it('returns the url for the image if one is provided', () => {
    const image = {
        renditions: {
            'mobile': 'mobileImage.jpg',
            'desktop': 'desktopImage.jpg'
        }
    };
    const url = ImageUtils.imageUrl(image, ImageUtils.placeholderBackgroundImage());
    expect(url).toEqual('mobileImage.jpg')
});

it('returns the url for the placeholder image if one is provided', () => {
    const image = {
        renditions: null
    };
    const url = ImageUtils.imageUrl(image, ImageUtils.placeholderBackgroundImage());
    expect(url).toEqual('app-screen.jpg')
});

it('returns the url for the placeholder image if one is provided', () => {
    const image = {
        renditions: {
            'mobile': null,
            'desktop': null
        }
    };
    const url = ImageUtils.imageUrl(image, null);
    expect(url).toEqual("")
});

it('returns an empty string if no placeholder or image provided', () => {
    const image = null;
    const url = ImageUtils.imageUrl(image, null);
    expect(url).toEqual("")
});

it('returns an empty string if no link or renditions in image', () => {
    const image = null;
    const url = ImageUtils.imageUrl(image, { link: null });
    expect(url).toEqual("")
});


// deviceImage function tests
it('returns the css for the background image if provided', () => {
    const image = {
        renditions: {
            'mobile': 'mobileImage.jpg',
            'desktop': 'desktopImage.jpg'
        }
    };

    const returnedCss = ImageUtils.backgroundImageStyle(image, ImageUtils.placeholderBackgroundImage());
    expect(returnedCss.backgroundImage).toEqual('url(mobileImage.jpg)');
})

it('returns the css for the placeholder background image if no image provided', () => {
    const image = {
        renditions: null
    };

    const returnedCss = ImageUtils.backgroundImageStyle(image, ImageUtils.placeholderBackgroundImage());
    expect(returnedCss.backgroundImage).toEqual('url(app-screen.jpg)');
})


// deviceImage function tests
it('returns an image object with the relevant url for the screen size', () => {
    const image = {
        renditions: {
            'mobile': 'mobile-image-rendition',
            'desktop': 'desktop-image-rendition'
        }
    };

    const imageObject = ImageUtils.deviceImage(image);
    expect(imageObject.link).toEqual('mobile-image-rendition');
})
