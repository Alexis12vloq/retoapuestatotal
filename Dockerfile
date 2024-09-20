# Usa una imagen de Node.js como base
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY . .

# Instala todas las dependencias
RUN npm install

# Expone los puertos necesarios
EXPOSE 3000 3001 3002 3003

# Comando para ejecutar todos los servicios
CMD ["npm", "run", "start:all"]
