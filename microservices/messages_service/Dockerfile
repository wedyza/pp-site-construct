FROM python:3.13-slim

WORKDIR /app

COPY ../requirements.txt /app/requirements.txt

RUN apt-get update \
    && apt-get install libpq-dev gcc -y

RUN pip install -r /app/requirements.txt

COPY . /app/