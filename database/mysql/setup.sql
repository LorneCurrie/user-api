CREATE USER 'devDbUser'@'%' IDENTIFIED BY 'thisAmazingPassword';
GRANT USAGE ON *.* TO 'devDbUser'@'%' IDENTIFIED BY 'thisAmazingPassword';
GRANT ALL PRIVILEGES ON *.* TO 'devDbUser'@'%';
