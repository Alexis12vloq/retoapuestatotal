FROM node:20-alpine

# Crear directorio de la aplicación
WORKDIR /app

# Copiar archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias de producción
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer los puertos
EXPOSE 3000
EXPOSE 3001
EXPOSE 3002
EXPOSE 3003

# Iniciar la aplicación
CMD ["npm", "run", "start:all"]
