FROM runnable/node-starter
MAINTAINER Runnable, Inc.

# Cache NPM Install
ADD ./package.json /app/
RUN npm install

# Add Application Files
ADD . /app/
EXPOSE 3000

# Run Application
CMD npm start
