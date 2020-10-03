## To install and run project

### Install Node/NPM

```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs
node -v
```

### Clone project

`git clone https://github.com/llljavlonlll/Jaaz.git`

### Create .env file

```
cd Jaaz
touch .env
```

### Add following variabes to .env

```
JWT_SECRET
DB_STRING
SERVER_HOST (Backend location)
PUBLIC_VAPID_KEY (For notifications)
PRIVATE_VAPID_KEY
EMAIL_USERNAME
EMAIL_PASSWORD
SENDGRID_API_KEY
```

### Install dependencies

```
npm install
cd client
npm install
```

### Run in dev mode

```
npm run server
npm run client
```

### Run in prod mode

```
npm run build
npm run server
```

## For deploying

### Setup PM2 process manager to keep your app running in the background

```
sudo npm i pm2 -g
pm2 start src/server.js
pm2 startup ubuntu (auto start pm2 on startup)
```

### Install NGINX and configure

```
sudo apt install nginx
sudo vim /etc/nginx/sites-available/default
```

#### Add the following to the location part of the server block

```
server_name jaaz.uz www.jaaz.uz;

    location / {
        proxy_pass http://localhost:5001; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```

```
# Check NGINX config
sudo nginx -t

# Restart NGINX
sudo service nginx restart
```

### Add SSL

```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
sudo certbot --nginx -d jaaz.uz -d www.jaaz.uz

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
```

## Further learning

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
