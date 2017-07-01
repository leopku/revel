FROM keymetrics/pm2-docker-alpine:6

MAINTAINER leopku "https://twitter.com/leopku"

ARG NPM_REGISTRY=https://registry.npmjs.org

ENV PARSE_SERVER_DATABASE_URI=mongodb://mongo/revel

RUN npm install --registry=${NPM_REGISTRY} -g parse-server parse-dashboard

ADD ./process.yml /app/
ADD ./parse-server.json /app/
ADD ./parse-dashboard.json /app/
ADD ./cloud /app/cloud

VOLUME ["/app"]

EXPOSE 1337 4040 43554

WORKDIR /app

CMD ["pm2-docker", "start", "--auto-exit", "--env", "production", "process.yml"]
