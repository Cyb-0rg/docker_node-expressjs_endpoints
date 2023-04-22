FROM node:slim
WORKDIR /app
COPY . /app
RUN npm install express body-parser
EXPOSE 3000
CMD node main.js