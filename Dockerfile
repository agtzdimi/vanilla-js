FROM node:18-alpine

# create root application folder
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY src /app/src

RUN npm run build

COPY src/pages /app/build/pages
COPY src/public /app/build/public

EXPOSE 5000

CMD [ "node", "./build/index.js" ]