# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.9-slim-buster
EXPOSE 8000
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt /app/
RUN python -m pip install -r requirements.txt
COPY . ./
ENTRYPOINT ["sh", "run.sh"]
