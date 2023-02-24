FROM node:alpine

WORKDIR /app

RUN apk add --no-cache nodejs npm redis

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]