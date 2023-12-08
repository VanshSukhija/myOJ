FROM gcc:latest

ENV TIMEOUT_SECONDS=1
ENV MEMORY_LIMIT_MB=128

WORKDIR /app

COPY . /app/

RUN chmod +x /app/run.sh

ENTRYPOINT ["/app/run.sh"]