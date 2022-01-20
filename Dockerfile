FROM node:9-slim
ENV NODE_ENV=production
RUN cd client
WORKDIR /app
COPY package.json /app/
RUN npm install --production
COPY . /app/
CMD [ "npm", "start" ]