FROM mariadb:5.5.64-trusty
ADD mysqld.cnf /etc/my.cnf
ENV MYSQL_ROOT_PASSWORD admin2019
ENV MYSQL_USER devDbUser
ENV MYSQL_PASSWORD thisAmazingPassword
ENV MYSQL_DATABASE radius
EXPOSE 3306
USER root
COPY init_db.sh /docker-entrypoint-initdb.d/01_init_db.sh
COPY mysql/radius_dump.sql /docker-entrypoint-initdb.d/03_radius.sql
COPY mysql/setup.sql /docker-entrypoint-initdb.d/04_setup.sql
