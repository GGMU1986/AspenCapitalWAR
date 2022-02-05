# War Card Game

## Introduction

Welcome to my solution to the Aspen Capital take home challenge. The game is live on Heroku.

[AC War Game.](https://ac-war-game-gt.herokuapp.com/)
Use the link to the left to navigate to the site, then click the PLAY button to start the game. 

## Technologies Used

  - ### Backend
    - Ruby on Rails
    - PostgreSQL
    
  - ### Frontend
    - React
    - CSS

## Follow below steps to view develoment mode of the game

  - clone the repo
  - cd into the project directory
  - Run below in terminal to install ruby gems
    
    `bundle install`
  - Run below in terminal to install node modules
    
    `npm install`
  - Run below in terminal to set up database

    `bundle exec rails db:setup`
    
  - Run below in terminal to start the rails server

    `rails s`
    
  - Run below in terminal for JavaScript bundler and compiler

    `npm run webpack`
    
  - visit localhost:3000 in your browser

## Additional things to achieve if given more time

  - Improve the styling on the frontend
  - Better UI
  - Add official testing instead of using console.log and debugger 
  -  Fix the bug related to React. After the game ends the winning player's lifetime wins should be updated in real time. This does not happen, it updates after refreshing the page.


  
