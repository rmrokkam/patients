FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven Wrapper files
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Build the application
RUN ./mvnw dependency:go-offline
RUN ./mvnw package -DskipTests

# Copy the JAR file
COPY target/patients-0.0.1-SNAPSHOT.jar app.jar

# Command to run the application
CMD ["java", "-jar", "app.jar"]
