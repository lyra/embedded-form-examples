rm -r .server
mkdir .server

npm ci --prefix server && 

cp -a ./server/. ./.server/

gulp replacements:server

cd .server/ && npm run start