FROM phedct/oneyou-cms:mssql-python-nodejs

WORKDIR /code
ADD . /code

RUN npm install --prefix frontend/website-client \
    && npm run build --prefix frontend/website-client \
    && cp -R frontend/website-client/build oneYou2/web \
    && rm -rf frontend/website-client/node_modules \
    && cp frontend/website-client/public/webtrends.load.js oneYou2/web \
    && cp frontend/website-client/public/webtrends.min.js oneYou2/web \
    && pip install -r oneYou2/requirements.txt \
    && python oneYou2/manage.py collectstatic --noinput

RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
