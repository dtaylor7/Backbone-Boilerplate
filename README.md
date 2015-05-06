# Backbone Boilerplate

##NPM
NPM is used for all node modules, specifically gulp.

##Bower
Bower is used to manage third part dependences.

##Gulp
Gulp, once running automatically compiles sass and js. There is also a build function will allows the user to build the project compressing all of the scripts and importing templates into the index.html file.


## Setup
The following instructions will set the project up by installing dependencies and gulp. 

  1. Setup up the project by navigating to project root in terminal
  2. run: npm install
  3. run: bower install
  3. run: gulp

###Gulp Build

To compile all assets for release on a server run:

  gulp build

This will generate a www/ folder which is the root of the application.

##Virtual Host Setup
-------------------------
  <VirtualHost *:80>
      DocumentRoot "/path/to/root/source"
      ServerName local.{app name}.dev
  </VirtualHost>

  <VirtualHost *:80>
      DocumentRoot "/path/to/root/www"
      ServerName local.{app name}.live
  </VirtualHost>

##Navigation
-------------------------
In APP.Views.Pages.Master there is a default event for navigation. All you have to do to navigate to a new route is add the attribute data-navigate="routeName" to an element and once it is clicked it will trigger the route in router to be called. An example is:

    <button data-navigate="routeName">Navigate to Route Name</button>


    