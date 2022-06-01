echo "waiting docker container database"
dockerize -wait tcp://mysql-dev:3306 -timeout 20s 

echo "prisma db push start"
npm run prisma:dbpush:prod

echo "start server"
npm run start:prod
