# Nodejs_Passport_Auth
learning Node with Passport auth
youtube resource: https://www.youtube.com/watch?v=6FOq4cUdH8k

github:
https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbnJSaUZseWNQemZJekJMS19uZW5QOGcxQ2I4d3xBQ3Jtc0tuVWwzY1VfdF9OWlNabU54TGl4T1VlckZDbVBkckxlNzZnNjAxRmJaMkIwSVhPQUNxaUswX1c4VFV6QWt5TDhpWXk3SHlqekV6d1ZNZm5FTXZGRjVEeGFfUlp1RlhDR3JQV01nZjB2Ti1CVTR2R2dkNA&q=https%3A%2F%2Fgithub.com%2Fbradtraversy%2Fnode_passport_login

Node with MongoDB 
Mongo db: https://cloud.mongodb.com/v2/6005bfb7776e45771c88ef8c#clusters

entry point is app.js
yarn run dev runs the nodemon server so that we don't have to restart the server with every change

routes/index,js - handles all the "{{/}}" routes (index, dashboard,...)
routes/users - will handle registration, login/logout interactions

CSS themse:
bootswatch.com has a number of different themes to choose from
(using https://bootswatch.com/4/darkly/bootstrap.css)

Fonts:
fontawesome is being used to supply the fonts:
  https://kit.fontawesome.com/590098457f.js

In layout.ejs:
  <%- body %> is sort of like a placeholder for the content supplied by each route file
  register.ejs has html content (and some other stuff to be defined later) that will be rendered in place of 
  <%- body %>. The same is true for any other "endpoint" in the app