FROM node:16

WORKDIR /usr/src/app

COPY prisma ./prisma/
COPY package*.json ./

RUN npm install
RUN npm install -g prisma
RUN npm run prisma:generate:prod 

COPY . .

RUN chmod +x entrypoint-prod.sh
ENTRYPOINT ["sh","/usr/src/app/entrypoint-prod.sh"]

EXPOSE 4000
