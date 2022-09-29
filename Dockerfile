## *Builder*
FROM node:16.15.0-alpine as builder

RUN apk add --no-cache git python3 build-base

## Create app directory
WORKDIR /opt/app

## Copy basic files for installing dependencies
COPY tsconfig.json package.json package-lock.json /opt/app/
COPY src /opt/app/src

RUN npm ci

## Build the app
RUN npm run build

## *Application*
FROM node:16.15.0-alpine

RUN apk add --no-cache git python3 g++ make
WORKDIR /opt/app

COPY package.json package-lock.json* /opt/app/

RUN npm ci --production

## Copy of dist directory from builder
COPY --from=builder /opt/app/dist ./dist

## Expose any application ports
# EXPOSE <PORT>

CMD [ "npm" , "start" ]
