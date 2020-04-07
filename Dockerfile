FROM node:10
RUN mkdir -p /app/backend/ 
WORKDIR /app/backend/
COPY package*.json /app/backend/
RUN npm install
# Bundle app source
COPY . /app/backend/
EXPOSE 3000
CMD [ "npm", "start" ]
