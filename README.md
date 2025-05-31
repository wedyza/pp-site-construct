### Как запустить проект:

Клонировать репозиторий и перейти в него в командной строке:

```
https://github.com/wedyza/pp-site-construct.git
```

```
cd pp-site-construct
```

Далее необходимо собрать докер оркестр

```
docker compose up
```

После этого зайти в бэкенд контейнер и выполнить миграции

```
docker exec -i -t monolith_app python manage.py migrate
```
Также, для корректной работы, необходимо заменить содержимое файла библиотеки django: django/core/email/backends/smtp.py на значение [этого файла](https://github.com/django/django/blob/main/django/core/mail/backends/smtp.py)
