# Stage 1 - compile
FROM node:12-alpine AS compile
WORKDIR /opt/web/app
COPY . .
RUN npm i && npm run compile

# Stage 2 - production install
FROM node:12-alpine AS prod-install
WORKDIR /opt/web/all
COPY --from=compile /opt/web/app/package.json /opt/web/app/package-lock.json ./
RUN npm i --only=production

# Stage 3 - package files
FROM node:12-alpine AS package
WORKDIR /opt/web/app
COPY --from=compile      /opt/web/app/config/default.js                         ./config/
COPY --from=compile      /opt/web/app/config/custom-environment-variables.js    ./config/
COPY --from=compile      /opt/web/app/src                                       ./src
COPY --from=compile      /opt/web/app/package.json                              ./
COPY --from=compile      /opt/web/app/package-lock.json                         ./
COPY --from=prod-install /opt/web/app/node_modules                              ./node_modules

# Stage 4 - Deploy
FROM node:12-alpine AS deploy
WORKDIR /opt/web/app
COPY --from=package /opt/web/app/ ./
EXPOSE 8080
CMD ["node", "src/app"]
