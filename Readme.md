# ShortUrl
#### Application for creating short URLs.

#### Installation:
 * Docker-compose and git is required on a server.
 * Clone this repository to your server with command: __"git clone https://github.com/Dmitry0792/URL-Shortener.git"__.
 * In file _"URL-Shortener/config.json"_ in field _"baseUrl"_ replace _"localhost"_ with your domain address or server ip address.
 * In file _"URL-Shortener/client/index.js"_, also replace _"localhost"_ with your domain address or server ip address.
 * Change directory to "URL-Shortener" and run command: __"docker-compose build"__.
 * After successful completion run command: __"docker-compose up"__.
 * Application is up and running.)
 
#### Usage:
 * Go to the address where you installed the application.
 * In the _"Enter Url"_ field, enter the Url address which you want to shorten, and click the _"Short"_ button.
 * There will be a short Url address in the field that appears below, if you click on it, you will be redirected to the original address.
 
#### Additionally:
  By default, the application stores the Url pair for 15 days. You can define a different value as your wish. To do it just set a custom value in field _"expireAt"_ in configuration file: _"URL-Shortener/config.json"_.


###### For questions: _dmitry1vh@gmail.com_