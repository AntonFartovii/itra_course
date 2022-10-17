1. heroku login
2. heroku create
* https://itracourse.herokuapp.com/
* 
3. git init
4. heroku git:remote -a protected-sands-49955
...
5. git push heroku master

* npm i react-bootstrap bootstrap
* npm i mobx mobx-react-lite
* npm i axios react-router-dom
* npm i jsonwebtoken
* npm i express-validator
* npm i cookie-parser
* npm install nodemailer

* npm i pg pg-hstore
* npm i sequelize
* npm i uuid

## Pages
* Mycollection - страница коллекции
* Admin - страница админки
* Auth - страница авторизации и регистрации
* UserPage - страница пользователя

Только админ или создатель коллекции или айтемов может ими манипулировать (редактировать, добавлять, удалять). 
Все доступно для просмотра всем (кроме админка).

### Админка позволяет управлять пользователем
* просматривать,       GET   /api/user
* блокировать,         POST   /api/user/ban/:id
* разблокировать,      POST   /api/user/ban/:id
* удалять,             DELETE /api/user/delete/:id
* добавлять в админы,  PUT    /api/user/:id
* удалять из админов   PUT    /api/user/:id
(АДМИН МОЖЕТ ЗАБРАТЬ У СЕБЯ ПРАВА АДМИНА, это важно).


Неаутентифицированные пользователи имеют доступ только в режиме чтения 
- они могут использовать поиск
- они могут создавать коллекции и айтемы
- они не могут оставлять комментарии и лайки).