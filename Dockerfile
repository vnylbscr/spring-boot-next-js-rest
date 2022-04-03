FROM openjdk:17
EXPOSE 8080
RUN ./mvn clean install
ADD target/spring-boot-nest.jar spring-boot-nest.jar
CMD ["java", "-jar", "spring-boot-nest.jar"]