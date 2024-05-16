# Setup and install the project
_Please make sure you have nodejs installed in your machine_


## Client setup
1. Enter the client folder and run the following command in your terminal:
    `npm install`

2. Test if installation was successful by running `npm start` in your terminal (in the same directory). Go to http://localhost:3000/ in your browser, and if it shows a blank page with a "Loading..." text, then the client has been successfully set up.


## Server Setup
1. Enter the server folder and run the following command in your terminal:
    `npm install`

2. Test if installation was successful by running `npm run dev` in your terminal (in the same directory). Go to http://localhost:5000/api in your browser, and if it shows a blank page with "{"users":["user1","user2"]}" text, then the client has been successfully set up.


# How to run the whole project
1. Open a terminal each in the client and server folders.
2. On the server folder run `npm run dev`, and on the client folder run `npm start`. Make sure there are no critial errors in either of the terminals, and the webpage at http://localhost:3000/ is running.



# Collaboration
* Please make sure to create a new branch whenever you are working on something new. This will prevent clashes between eachother's work. You can create a new branch by running the following command in your terminal: `git branch branch_name`. You can switch between branches using `git checkout branch_name`.
* After finishing working on your branch, you can push it to github using `git push -u origin branch_name`.
* Remember to put through a pull request and merge your branch to the main branch! Feel free to approve your own pull requests.
