### Как запустить проект:

Клонировать репозиторий и перейти в него в командной строке:

```
https://github.com/wedyza/pp-site-construct.git
```

```
cd pp-site-construct
```

Сменить ветку на нужную
```
git checkout backend
```

Cоздать и активировать виртуальное окружение:

```
python -m venv env
```

```
Windows: source env/Scripts/activate
Linux: source env/bin/activate
```

Установить зависимости из файла requirements.txt:

```
pip install -r requirements.txt
```

Перейти в папку проекта
```
cd site_contructor
```

Выполнить миграции:

```
python manage.py migrate
```

Запустить проект:

```
python manage.py runserver
```

Также, для корректной работы, необходимо заменить содержимое файла библиотеки django: django/core/email/backends/smtp.py на значение [этого файла](https://github.com/django/django/blob/main/django/core/mail/backends/smtp.py)
