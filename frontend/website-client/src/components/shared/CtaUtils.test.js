import CtaUtils from './CtaUtils';

describe('CtaUtils', () => {

  it('isCta returns true if cta an array with one or more elements', () => {
    const cta = ['test']
    const returnedResponse = CtaUtils.isCta(cta);
    expect(returnedResponse).toBe(true);
  });

  it('isCta returns false if cta an array with no elements', () => {
    const cta = []
    const returnedResponse = CtaUtils.isCta(cta);
    expect(returnedResponse).toBe(false);
  });

   it('isCta returns true if cta an object', () => {
    const cta = {}
    const returnedResponse = CtaUtils.isCta(cta);
    expect(returnedResponse).toBe(true);
  });

  it('isSingleCta returns true if cta an array with exactly one element', () => {
    const cta = ['test']
    const returnedResponse = CtaUtils.isSingleCta(cta);
    expect(returnedResponse).toBe(true);
  });

  it('isSingleCta returns false if cta an array with no elements', () => {
    const cta = []
    const returnedResponse = CtaUtils.isSingleCta(cta);
    expect(returnedResponse).toBe(false);
  });

  it('isSingleCta returns false if cta an array with more than 1 element', () => {
    const cta = ['test', 'test']
    const returnedResponse = CtaUtils.isSingleCta(cta);
    expect(returnedResponse).toBe(false);
  });

  it('isSingleCta returns true if cta an object', () => {
    const cta = {}
    const returnedResponse = CtaUtils.isSingleCta(cta);
    expect(returnedResponse).toBe(true);
  });

  it('getSingleCta returns the first element of an array with exactly one element', () => {
    const cta = ['test']
    const returnedResponse = CtaUtils.getSingleCta(cta);
    expect(returnedResponse).toBe('test');
  });

  it('getSingleCta returns the first element of an array with more than 1 element', () => {
    const cta = ['first', 'second']
    const returnedResponse = CtaUtils.getSingleCta(cta);
    expect(returnedResponse).toBe('first');
  });

   it('getSingleCta returns true if cta an object', () => {
    const cta = {}
    const returnedResponse = CtaUtils.getSingleCta(cta);
    expect(returnedResponse).toBe(cta);
  });

  it('isValidCta returns false if cta is not an object', () => {
    const cta = null;
    const returnedResponse = CtaUtils.isValidCta(cta);
    expect(returnedResponse).toBe(false);
  });

  it('isValidCta returns false if cta has no external or page link', () => {
    const cta = {};
    const returnedResponse = CtaUtils.isValidCta(cta);
    expect(returnedResponse).toBe(false);
  });

  it('isValidCta returns true if cta has an external link', () => {
    const cta = {link_external: 'http://dummyurl.com'};
    const returnedResponse = CtaUtils.isValidCta(cta);
    expect(returnedResponse).toBe(true);
  });

  it('isValidCta returns true if cta has an page link', () => {
    const cta = {link_page: {relative_path: '/dummyurl'}};
    const returnedResponse = CtaUtils.isValidCta(cta);
    expect(returnedResponse).toBe(true);
  });

  it('returns false from isInternalCta if cta is not present', () => {
    const cta = null;
    const returnedResponse = CtaUtils.isInternalCta(cta);
    expect(returnedResponse).toBe(null);
  });

  it('returns false from isInternalCta if cta is present but has no link_page', () => {
    const cta = {link_page: null};
    const returnedResponse = CtaUtils.isInternalCta(cta);
    expect(returnedResponse).toBe(null);
  });

  it('returns false from isInternalCta if cta and link_page are present but has no relative_path', () => {
    const cta = {link_page: {relative_path: null}};
    const returnedResponse = CtaUtils.isInternalCta(cta);
    expect(returnedResponse).toBe(null);
  });

  it('returns true from isInternalCta if cta, link_page and relative_path are present', () => {
    const cta = {link_page: {relative_path: '/dummyurl'}};
    const returnedResponse = CtaUtils.isInternalCta(cta);
    expect(returnedResponse).toBe('/dummyurl');
  });

  it('returns false from isExternalCta if cta is not present', () => {
    const cta = null;
    const returnedResponse = CtaUtils.isExternalCta(cta);
    expect(returnedResponse).toBe(null);
  });

  it('returns true from isExternalCta if cta is present but has no link_page', () => {
    const cta = {link_page: null};
    const returnedResponse = CtaUtils.isExternalCta(cta);
    expect(returnedResponse).toBe(true);
  });

  it('returns true from isExternalCta if cta and link_page are present but has no relative_path', () => {
    const cta = {link_page: {relative_path: null}};
    const returnedResponse = CtaUtils.isExternalCta(cta);
    expect(returnedResponse).toBe(true);
  });

  it('returns false from isExternalCta if cta, link_page and relative_path are present', () => {
    const relativePath = '/dummyurl';
    const cta = {link_page: {relative_path: relativePath}};
    const returnedResponse = CtaUtils.isExternalCta(cta);
    expect(returnedResponse).toBe(false);
  });

  it('returns relative_path from getCtaPath if cta is internal', () => {
    const relativePath = '/dummyurl';
    const cta = {link_page: {relative_path: relativePath}};
    const returnedResponse = CtaUtils.getCtaPath(cta);
    expect(returnedResponse).toBe(relativePath);
  });

  it('returns link_external from getCtaPath if cta is external', () => {
    const linkExternal = 'http://dummyurl.com';
    const cta = {link_page: {relative_path: linkExternal}};
    const returnedResponse = CtaUtils.getCtaPath(cta);
    expect(returnedResponse).toBe(linkExternal);
  });
})
