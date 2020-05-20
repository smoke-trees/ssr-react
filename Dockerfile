FROM node:alpine as builder
RUN apk add python make gcc g++
WORKDIR /app
COPY package* ./
RUN npm ci
COPY .babelrc.* ./
COPY webpack.config.js webpack.config.js
COPY src/ src/
RUN npm run build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/dist dist
COPY package* ./
RUN npm i --production
ENV NODE_ENV=production
CMD ["npm","start"]