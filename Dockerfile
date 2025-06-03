FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build /app/build
EXPOSE 8888
CMD ["serve", "-s", "/app/build", "-l", "8888"]
