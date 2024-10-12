# TestTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.15.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Description

Это веб-приложение для отображения таблицы с записями о клиентах, полученными с помощью API.

Приложение имеет следующий функционал:	

  1.	Начальная загрузка записей для таблицы (либо если записей нет):
      	- GET запрос `https://test-data.directorix.cloud/task1`

  2.	Добавление записей:
      	- Пользователь имеет возможность создавать новые записи в таблице, через модальное окно.

  3.	Изменение записей:
        - Пользователь имеет возможность изменить в записи какие либо данные, через модальное окно.

  4.	Удаление записей:
        - Пользователь имеет возможность выбрать одну \ несколько \ все записи с помощью чекбоксов и удалить их из таблицы.

  5.	При создании новых записей реализована проверка полей по написанию и валидности:
         - Поле Имя - обязательное, минимум 2 символа.
         - Поле Фамилия - обязательное, минимум 2 символа.
         - Поле E-mail - обязательное и валидное как e-mail.
         - Поле Телефон - не обязательное, но если заполнено, то должно быть валидным для номеров российских операторов связи.

  6.	Верстка соответствует макету `https://www.figma.com/file/e7KSLDJU0l96avRM3tQfaT/Тестовое-задание-Initium?node-id=3%3A9`
