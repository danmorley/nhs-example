import UrlUtils from './UrlUtils';

describe('UrlUtils', () => {

  it('isInternalLink returns true if the link is internal', () => {
    const linkAddress = '/test-path';
    const returnedResponse = UrlUtils.isInternalLink(linkAddress);
    expect(returnedResponse).toBe(true);
  });

  it('isInternalLink returns false if the link is external http', () => {
    const linkAddress = 'http://phe.co.uk/test-path';
    const returnedResponse = UrlUtils.isInternalLink(linkAddress);
    expect(returnedResponse).toBe(false);
  });

  it('isInternalLink returns false if the link is external https', () => {
    const linkAddress = 'https://phe.co.uk/test-path';
    const returnedResponse = UrlUtils.isInternalLink(linkAddress);
    expect(returnedResponse).toBe(false);
  });

  it('isInternalLink returns false if the link is external mailto', () => {
    const linkAddress = 'mailto:john.smith@phe.co.uk';
    const returnedResponse = UrlUtils.isInternalLink(linkAddress);
    expect(returnedResponse).toBe(false);
  });

  it('isExternalLink returns false if the link is internal', () => {
    const linkAddress = '/test-path';
    const returnedResponse = UrlUtils.isExternalLink(linkAddress);
    expect(returnedResponse).toBe(false);
  });

  it('isExternalLink returns true if the link is external http', () => {
    const linkAddress = 'http://phe.co.uk/test-path';
    const returnedResponse = UrlUtils.isExternalLink(linkAddress);
    expect(returnedResponse).toBe(true);
  });

  it('isExternalLink returns true if the link is external https', () => {
    const linkAddress = 'https://phe.co.uk/test-path';
    const returnedResponse = UrlUtils.isExternalLink(linkAddress);
    expect(returnedResponse).toBe(true);
  });

  it('isExternalLink returns true if the link is external mailto', () => {
    const linkAddress = 'mailto:john.smith@phe.co.uk';
    const returnedResponse = UrlUtils.isExternalLink(linkAddress);
    expect(returnedResponse).toBe(true);
  });

})
