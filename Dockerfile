# Usa la imagen base de Node.js
FROM node:20-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer los puertos necesarios
EXPOSE 3000
EXPOSE 3001
EXPOSE 3002
EXPOSE 3003

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:all"]
