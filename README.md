[![NodeJS CI](https://github.com/ntandoyenkosi1/kula-learn/actions/workflows/npm-gulp.yml/badge.svg)](https://github.com/ntandoyenkosi1/kula-learn/actions/workflows/npm-gulp.yml)[![Netlify Status](https://api.netlify.com/api/v1/badges/85197a5f-6071-473d-aa6b-861eeb1ec35d/deploy-status)](https://app.netlify.com/sites/dazzling-tesla-9dc29c/deploys)

# kula-learn

  

Kula Learn is a learning management system. It allows instructors to add courses and other users can enroll and learn the available courses.

### Production environment
This application is now live at https://kulalearn.ntandoyenkosi.dev/
The client application is deployed on Netlify.
The server is deployed on Heroku.
Github actions are used for the workflow.
### Features
Authentication 

 - User registration.
 -  Login.
 - Token based authentication.
 - Persistent session that is active for 12 hours.

 Authorization

 Users, Courses and Modules
 - All CRUD functionality present.
 - Role-based authorization on all functionality

Other features
 - Markdown support for individual modules to support for rich content delivery.
 - Optional video explanations where they apply.
 - Responsive Design.


<!-- ### Build Docker image of server

```

  

docker build -t kula-server .

  

docker run -it -p 9000:4000 kula-server

  

``` -->

### Run Development environment

Install Dependencies on server and client

```

npm install

```

```

cd client

npm install

```

To run server at port 4000

```

npm start

```

To run client at PORT 3000

```

cd client

npm start

```
    
