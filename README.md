# adobe-web-app
### Install the Heroku CLI
Download and install the Heroku CLI.

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.
```shell
$ heroku login
```

### Clone the repository
Use Git to clone singular-web-app's source code to your local machine.
```shell
$ heroku git:clone -a adobe-web-app 
$ cd adobe-web-app
```

### Deploy your changes
Make some changes to the code you just cloned and deploy them to Heroku using Git.
```shell
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```