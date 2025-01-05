FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven Wrapper files
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Run Maven to install dependencies and build the project
RUN ./mvnw clean install -DskipTests

# Copy the JAR file into the container
COPY target/patients-0.0.1-SNAPSHOT.jar app.jar

# Run the application
CMD ["java", "-jar", "app.jar"]
