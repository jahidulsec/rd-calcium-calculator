# use nodejs LTS version
FROM node:22-alpine as base

# set working directory
WORKDIR /app

# install dependencies separately (better caching)
COPY package*.json ./
RUN npm install

# Only copy required files
COPY . .

RUN npm run build

# expose port
EXPOSE 5011

# run server
CMD [ "npm", "start" ]