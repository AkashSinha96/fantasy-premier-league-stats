# Getting Started with FPL Stats App

Simple ReactJs App which lets you view your basic Fantasy Premier League Information by utilizing the APIs provided by official [Fantasy Premier League](https://www.postman.com/altimetry-operator-38323786/workspace/fantasy-premier-league/documentation/15391879-32b73369-4fc4-4e48-b566-acefc7125bed)

![FPL Stats Screenshot](https://github.com/AkashSinha96/fantasy-premier-league-stats/blob/master/Content/demo-screenshot.png)

## Features

Let's you view your

1. Basic Information like Overall Rank, Points, Latest Gameweek Rank, etc.
2. Rank over the seasons that you have played FPL.
3. Rank in all the leagues that you are participating in.
4. Rank changes over the Gameweeks in the current season.
5. Supports dark mode and light mode switching when set system wide. 

## How to use the App

Login to your account on [Fantasy Premier League](https://fantasy.premierleague.com/)  
Navigate to Points section. In the url copy your TeamId. For eg: In the url (https://fantasy.premierleague.com/entry/5284163/event/6), 5284163 is the TeamId.
Open the FPL Stats App, click on get started and enter the TeamId noted in the previous step, and view your basic information

## Run Locally
### 1. Install Dependencies
```sh
$ npm install
```
## 2. Start the project
```sh
$ npm start
```

## Technology Used
 1. ReactJS
 2. Tailwind CSS components provided by [Flowbite](https://flowbite.com/).
 3. Deployed proxy server to handle CORS. [Repository Link](https://github.com/AkashSinha96/fantasy-premier-league-stats-api-handler) 
