# Use the Azure SQL Edge base image
FROM mcr.microsoft.com/azure-sql-edge

# Switch to root user to install additional tools
USER root

# Install prerequisites for repository configuration and tools
RUN apt-get update && \
    apt-get install -y curl apt-transport-https gnupg

# Clear existing conflicting repository configurations
RUN rm -f /etc/apt/sources.list.d/microsoft-prod.list
RUN rm -f /etc/apt/sources.list.d/mssql-release.list

# Add Microsoft repository for SQL Server tools
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/18.04/prod.list > /etc/apt/sources.list.d/mssql-release.list

# Debugging: List repository files
RUN ls -l /etc/apt/sources.list.d/

# Update package list again (to include Microsoft repository)
RUN apt-get update

# Debugging: List available packages to verify repository configuration
RUN apt-cache search msodbcsql
RUN apt-cache search mssql-tools

# Install SQL Server command-line tools and dependencies
RUN ACCEPT_EULA=Y apt-get install -y msodbcsql17

# Add mssql-tools to the PATH
RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc

# Debugging: Print PATH to check mssql-tools inclusion
RUN echo $PATH

# Switch back to the mssql user
USER mssql
