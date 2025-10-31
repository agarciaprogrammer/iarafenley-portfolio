# Etapa de build
FROM node:20-alpine AS builder
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm ci

# Copiamos el resto del código
COPY . .

# Ejecutamos el build
RUN npm run build

# Etapa final: Nginx sirve los archivos
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
