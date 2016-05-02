FROM node:5-slim

MAINTAINER Optare [fporto,srodriguez,jcunha]@optaresolutions.com

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get -yq update && \
    apt-get -yq install vim git net-tools sudo bzip2 bash expect openjdk-7-jdk
	
RUN npm install -g --silent yo@1.7.0 bower@1.7.6 grunt@1.0.1 grunt-ng-constant@2.0.1

#E2E testing
#RUN npm install -g protractor
#RUN webdriver-manager update

# Add a yeoman user because grunt doesn't like being root
RUN adduser --disabled-password --gecos "" yeoman && \
  echo "yeoman ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Expose the port
EXPOSE 9000

# set HOME so 'npm install' and 'bower install' don't write to /
ENV HOME /home/yeoman

ENV LANG en_US.UTF-8

RUN mkdir /usr/local/yeoman && chown yeoman:yeoman /usr/local/yeoman
WORKDIR /usr/local/yeoman

ADD set_env.sh /usr/local/sbin/
RUN chmod +x /usr/local/sbin/set_env.sh
CMD ["bash"]
