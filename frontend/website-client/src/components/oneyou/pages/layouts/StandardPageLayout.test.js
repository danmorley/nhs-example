import StandardPageLayout from './StandardPageLayout';

it('seo title for homepage', () => {
  const breadcrumbs = [
    {'name': 'home'},
    {'name': 'section1'},
    {'name': 'section2'}
  ];
  const standardPageLayout = new StandardPageLayout(); 
  const title = standardPageLayout.getSEOTitle(true, 'PageTitle', 'SiteName', breadcrumbs);
  expect(title).toEqual('SiteName');
});

it('seo title no title', () => {
  const standardPageLayout1 = new StandardPageLayout(); 
  const title1 = standardPageLayout1.getSEOTitle(false, '', 'SiteName', null);
  expect(title1).toEqual('SiteName');

  const standardPageLayout2 = new StandardPageLayout(); 
  const title2 = standardPageLayout2.getSEOTitle(false, null, 'SiteName', null);
  expect(title2).toEqual('SiteName');
});

it('seo title no section', () => {
  const standardPageLayout = new StandardPageLayout(); 
  const title = standardPageLayout.getSEOTitle(false, 'PageTitle', 'SiteName', null);
  expect(title).toEqual('PageTitle | SiteName');
});

it('seo title with section(s)', () => {
  // one section
  const breadcrumbs1 = [
    {'name': 'home'},
    {'name': 'section1'}
  ];
  const standardPageLayout1 = new StandardPageLayout(); 
  const title1 = standardPageLayout1.getSEOTitle(false, 'PageTitle', 'SiteName', breadcrumbs1);
  expect(title1).toEqual('PageTitle | section1 | SiteName');

  // two sections
  const breadcrumbs2 = [
    {'name': 'home'},
    {'name': 'section1'},
    {'name': 'section2'}
  ];
  const standardPageLayout2 = new StandardPageLayout(); 
  const title2 = standardPageLayout2.getSEOTitle(false, 'PageTitle', 'SiteName', breadcrumbs2);
  expect(title2).toEqual('PageTitle | section2 | section1 | SiteName');
});

it('seo title too long', () => {
  // excatly 60 char
  const breadcrumbs1 = [
    {'name': 'home'},
    {'name': 'sectionwithatalongnamexxxx'},
    {'name': 'section2'}
  ];
  const standardPageLayout1 = new StandardPageLayout(); 
  const title1 = standardPageLayout1.getSEOTitle(false, 'PageTitle', 'SiteName', breadcrumbs1);
  expect(title1).toEqual('PageTitle | section2 | sectionwithatalongnamexxxx | SiteName');

  // excatly 61 char
  const breadcrumbs2 = [
    {'name': 'home'},
    {'name': 'sectionwithatalongnamexxxxx'},
    {'name': 'section2'}
  ];
  const standardPageLayout2 = new StandardPageLayout(); 
  const title2 = standardPageLayout2.getSEOTitle(false, 'PageTitle', 'SiteName', breadcrumbs2);
  expect(title2).toEqual('PageTitle | section2 | SiteName');

  // very long title
  const breadcrumbs3 = [
    {'name': 'home'},
    {'name': 'section1'},
    {'name': 'section2'}
  ];
  const standardPageLayout3 = new StandardPageLayout(); 
  const title3 = standardPageLayout3.getSEOTitle(false, 'PageTitleverylongtitlexxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'SiteName', breadcrumbs3);
  expect(title3).toEqual('PageTitleverylongtitlexxxxxxxxxxxxxxxxxxxxxxxxxxxx | SiteName');
});