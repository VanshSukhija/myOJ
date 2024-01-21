FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y bc g++ python3-dev openjdk-11-jdk

ENV TIMEOUT_SECONDS=1
ENV MEMORY_LIMIT_KB=131072

WORKDIR /app

COPY . /app/

RUN chmod +x /app/run.sh

ENTRYPOINT ["/app/run.sh"]