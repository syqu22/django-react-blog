FROM node:16-buster-slim
WORKDIR /app/frontend
ENV PATH /app/frontend/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
COPY . ./