FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y bc time g++ python3-dev openjdk-17-jdk

WORKDIR /app

COPY . /app/

RUN chmod +x /app/code-runner-script.sh

ENTRYPOINT ["/app/code-runner-script.sh"]