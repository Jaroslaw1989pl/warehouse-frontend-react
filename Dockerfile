FROM node:17-alpine

COPY ./warehouse-react/package.json ./
COPY ./warehouse-react/tsconfig.json ./
RUN npm install
COPY /warehouse-react .

EXPOSE 3000

WORKDIR /app

CMD ["npm", "start"]