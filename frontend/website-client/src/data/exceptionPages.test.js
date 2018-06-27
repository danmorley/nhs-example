import { notFoundPage, serverErrorPage } from './exceptionPages';

it('returns the correct json for a 404 from notFoundPage', () => {
    const notFoundJson = notFoundPage();
    expect(notFoundJson.title).toEqual('Page Not Found');
    expect(notFoundJson.body.length).toEqual(1);
    expect(notFoundJson.body[0].type).toEqual('notice_shelf');
    expect(notFoundJson.body[0].value.header).toEqual('Page not found');
    expect(notFoundJson.body[0].value.body).toEqual("<p>Back to the <a href='/oneyou'>home page</a></p>");
    expect(notFoundJson.body[0].value.meta_variant).toEqual('warning');
});


it('returns the correct json for a 404 from notFoundPage', () => {
    const serverErrorJson = serverErrorPage();
    expect(serverErrorJson.title).toEqual('Something went wrong');
    expect(serverErrorJson.body.length).toEqual(1);
    expect(serverErrorJson.body[0].type).toEqual('notice_shelf');
    expect(serverErrorJson.body[0].value.header).toEqual('Something went wrong');
    expect(serverErrorJson.body[0].value.body).toEqual("<p>Please refresh or try again later.</p>");
    expect(serverErrorJson.body[0].value.meta_variant).toEqual('warning');
});
