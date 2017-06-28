FROM ruby:2.4

RUN apt-get update

# Install rubygems
RUN wget https://rubygems.org/rubygems/rubygems-2.6.12.tgz
RUN tar xvzf rubygems-2.6.12.tgz
WORKDIR $HOME/rubygems-2.6.12
RUN ruby setup.rb
WORKDIR $HOME/
RUN rm -rf rubygems-2.6.12

# Istall git && nginx
RUN apt-get update && apt-get install -y \
	git-core \
	nginx

# Clone app
RUN mkdir -p /var/www
WORKDIR /var/www/
RUN git clone https://github.com/Nanonej/pandapp.git pandapp
RUN rm /etc/nginx/nginx.conf
RUN mv /var/www/pandapp/nginx.conf /etc/nginx/

# Install gem && unicorn
WORKDIR /var/www/pandapp/
RUN bundle install
RUN mkdir -p tmp
RUN mkdir -p tmp/sockets
RUN mkdir -p tmp/pids
RUN mkdir -p log

#Start the server
WORKDIR /var/www/pandapp/
EXPOSE 2020
RUN chmod 755 panda_wrapper_script.sh
CMD ./panda_wrapper_script.sh
