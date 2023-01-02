FROM node:16-alpine

EXPOSE ${PORT}

COPY . /package.json /package.json

RUN corepack enable
RUN yarn install
RUN yarn build

CMD ["yarn", "deploy"]