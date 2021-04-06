FROM node:latest
EXPOSE 3000
COPY . .
WORKDIR /usr/src/app
RUN npm install
CMD ["npm", "start"]