### Шаг 1. Создание файла README.md

Создайте файл `README.md` в корне проекта (рядом с `package.json` и `server.js`) и скопируйте в него следующее содержимое. Этот файл описывает проект, структуру и способы запуска, что является хорошей практикой для любого репозитория.

```markdown
# Express Test API

Backend-приложение на фреймворке Express с использованием ORM Prisma и базы данных SQLite. Реализованы CRUD-операции для сущности Product и JWT-аутентификация с защитой маршрутов через собственный middleware.

## Технологический стек

- **Node.js** / **Express** — веб-сервер и маршрутизация.
- **Prisma ORM** — работа с базой данных SQLite.
- **bcryptjs** — хеширование паролей пользователей.
- **jsonwebtoken** — генерация и проверка JWT-токенов.
- **dotenv** — управление переменными окружения.

## Структура проекта

```text
express-test/
├── prisma/
│   ├── schema.prisma    # Схема базы данных (User, Product)
│   └── dev.db           # Файл базы данных SQLite (генерируется автоматически)
├── src/
│   ├── middleware/
│   │   └── auth.js      # Middleware проверки JWT-токена
│   ├── routes/
│   │   ├── auth.js      # Эндпоинты регистрации и входа
│   │   └── products.js  # CRUD-эндпоинты для продуктов
│   └── app.js           # Инициализация Express и подключение маршрутов
├── .env                 # Переменные окружения (DATABASE_URL, JWT_SECRET)
├── server.js            # Точка входа приложения
└── package.json
```

## Установка и запуск

1. Установите зависимости:
   ```bash
   npm install
   ```

2. Примените миграции базы данных и сгенерируйте Prisma Client:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

3. Запустите сервер в режиме разработки:
   ```bash
   npm run dev
   ```
   Сервер будет доступен по адресу `http://localhost:3000`.

## Доступные эндпоинты

### Аутентификация
- `POST /auth/register` — регистрация пользователя (поля: `name`, `email`, `password`).
- `POST /auth/login` — вход и получение JWT-токена (поля: `email`, `password`).

### Продукты (CRUD)
- `GET /products` — получить список всех продуктов.
- `GET /products/:id` — получить один продукт по ID.
- `POST /products` — создать новый продукт (защищён middleware, требует заголовок `Authorization: Bearer <token>`).
- `PUT /products/:id` — обновить продукт по ID.
- `DELETE /products/:id` — удалить продукт по ID.

## Проверка защиты маршрутов

- Запрос `POST /products` без заголовка `Authorization` возвращает статус `401 Unauthorized`.
- Запрос `POST /products` с валидным токеном возвращает статус `201 Created`.
```





