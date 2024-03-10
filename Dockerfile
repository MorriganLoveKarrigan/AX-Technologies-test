FROM node:current-alpine

WORKDIR /usr/src/nuxt-test

RUN apk update && apk upgrade && apk add --no-cache git

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=4000

# Start the application
CMD [ "npm","run", "dev"]
