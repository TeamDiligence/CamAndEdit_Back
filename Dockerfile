FROM node:16

WORKDIR /usr/src/app

COPY prisma ./prisma/
COPY package*.json ./

RUN npm install
RUN npm install -g prisma
RUN npm run prisma:generate:dev 

COPY . .

RUN chmod +x entrypoint-dev.sh
ENTRYPOINT ["sh","/usr/src/app/entrypoint-dev.sh"]

EXPOSE 4000
