FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven Wrapper files
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Build the application with more output
RUN echo "Running Maven build..." && ./mvnw clean install -DskipTests

# List files in target directory for verification
RUN ls -l target

# Copy the JAR file
COPY target/patients-0.0.1-SNAPSHOT.jar app.jar

# Command to run the application
CMD ["java", "-jar", "app.jar"]
