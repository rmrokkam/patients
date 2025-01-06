FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy only the necessary files (pom.xml, mvnw, and Maven wrapper)
COPY mvnw pom.xml ./
COPY .mvn/ .mvn

# Ensure the Maven wrapper script has execution permissions
RUN chmod +x mvnw

# Run Maven to install dependencies and build the project
RUN ./mvnw clean install -DskipTests

# Copy the JAR file into the container (after build)
COPY ./target/patients-0.0.1-SNAPSHOT.jar app.jar

# Run the application
CMD ["java", "-jar", "app.jar"]
