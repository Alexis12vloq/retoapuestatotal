FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000 3001 3002 3003
CMD ["npm", "run", "start:all"]
