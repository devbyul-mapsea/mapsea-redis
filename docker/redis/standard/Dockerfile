FROM redis:7.2

WORKDIR /redis

COPY ./docker/redis/standard/redis.conf .
RUN mkdir run
RUN mkdir logs
RUN mkdir acl
RUN touch acl/users.acl

CMD ["redis-server", "/redis/redis.conf"]