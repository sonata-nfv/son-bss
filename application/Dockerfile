FROM registry.sonata-nfv.eu:5000/son-yo-gen

MAINTAINER Optare [fporto,srodriguez,jcunha]@optaresolutions.com
USER yeoman
RUN mkdir /usr/local/yeoman/bss
RUN chmod 775 /usr/local/yeoman/

#Include the application directory from the yeoman base applications directory
ADD configure_app.sh /usr/local/yeoman/bss/configure_app.sh
ADD code /usr/local/yeoman/bss/code
RUN sudo chmod +x /usr/local/yeoman/bss/configure_app.sh
WORKDIR /usr/local/yeoman/bss/code


 
#run the silent generator

RUN mkdir /usr/local/yeoman/SonataBSS
WORKDIR /usr/local/yeoman/SonataBSS
RUN /usr/local/yeoman/bss/configure_app.sh
RUN rm -f /usr/local/yeoman/SonataBSS/app/modules/NSD/nSD/views/addNSD.html
RUN rm -f /usr/local/yeoman/SonataBSS/app/modules/NSD/nSD/views/deleteNSD.html
RUN cp -r /usr/local/yeoman/bss/code/* /usr/local/yeoman/SonataBSS/
RUN sudo npm install
RUN bower install
RUN sudo chmod -R 775 /usr/local/yeoman/SonataBSS
RUN sudo node /usr/local/yeoman/SonataBSS/node_modules/protractor/bin/webdriver-manager update
EXPOSE 1337