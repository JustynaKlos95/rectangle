FROM node:alpine

WORKDIR /opt/app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
