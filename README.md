# SaldoBip!

Este es un ejemplo de alternativa para consultar el saldo de su tarjeta Bip!

Para consultar el saldo:

```
http://host/saldo/:NUM_TARJETA/:RUT
```

# SERVER
Live demo:

http://bip.apps.zsyslog.com/saldo/:NUM_TARJETA/:RUT

# CLIENT

Live demo:

http://jcjimenez.me/bip

# Install

Made with Nodejs (Cheerio + Express + Request + forever)

```
# git clone https://github.com/zsyslog/saldobip.git

# cd saldobip

# npm install -d

# node bip.js
```

Change server port if needed or configure your proxy. If you are using NGINX, you can configure a new upstream entry

```
upstream saldobip {
  server 127.0.0.1:6001; 
}
```

And then a new virtualhost:

```
server {
  listen SERVER_ADDRESS:80;
  server_name new.virtual.host.name;
  location / {
	  add_header Access-Control-Allow-Origin *; # just in case!! ;)
	  proxy_pass http://saldobip;
  }
}
```


