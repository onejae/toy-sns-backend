FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY src/ src/
COPY tsconfig.json .
COPY package.json .
COPY .env .
RUN npm run build

EXPOSE 8080

CMD [ "node", "dist/index.js" ]
