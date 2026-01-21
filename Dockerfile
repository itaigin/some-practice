# Dockerfile
# Этап 1: Сборка приложения
FROM node:22-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код приложения
COPY . .

# Собираем приложение
RUN npm run build:prod

# Проверяем, что собралось
RUN ls -la build/

# Этап 2: Production
FROM node:22-alpine AS production

WORKDIR /app

# Копируем собранное приложение из builder этапа
COPY --from=builder /app/build ./build

# Устанавливаем serve
RUN npm install -g serve

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["serve", "-s", "build", "-l", "3000"]