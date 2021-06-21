#api-nodejs-postgresql

Primero se debe ejecutar el script de base de datos llamado crm_Userlab para crear la base de datos y sus respectivas tablas.

En la carpeta api-nodejs se encuentra la api que se desarrollo en NodeJS y Express,
en la carpeta crm-app se encuentra la aplicación desarrollada en React para consumir la api.

Se deben de configurar las variables de entorno para poder ejecutar correctamente la app. Estas variables
estan contenidas en el archivo .env

Se debe ejecutar el comando npm install para instalar todas las dependencias. 

Levantar api con el comando "node api-nodejs/src/index.js"
Levantar app react con el comando "npm start" en la carpeta crm-app
