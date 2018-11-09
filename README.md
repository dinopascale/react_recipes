# React Recipes

React Recipes is a MERN (MongoDB, Express, React, NodeJS) application. It's a web portal for users to share their recipes and to interact with others.

# How To Use on your machine

To clone and run this application, you'll need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/download/) (which comes with npm) installed on your computer. From your command line:

```sh
# Clone this repository
$ git clone https://github.com/dinopascale/react_recipes.git

# Go into the repository
$ cd react_recipes

# Install dependencies
$ npm install

# Run the app in a dev env
$ npm run dev
```

# Live Example

You can find a [live example of React Recipes](https://recipesreact-hgnhlnvqgz.now.sh/) (It can take a while for the first boot of the app).

# Reasons Behind

For this project I wanted to experiment with **Server Side Rendering**, NodeJS environment and React. After some research, I choose [Next.Js](https://nextjs.org/) as framework for obtaining an Universal App. And so my journey begins.

## Backend First

I started with setting the backend first. I decided to use MongoDB as Database and [Mongoose](https://mongoosejs.com/) as ODM library. Express was my choice as framework for node.js. React Recipes's Database contains four collections: **Recipe**, **Users**, **Threads** and **Rates**. The latter contains user's rating for both Recipes and Comments: It's not the best solution for scaling, but this was a personal project so I decided to not put to much effort in optimazing for future expansions.

In order to connect the Database with the application, I developed a really basic CRUD API with all operations needed by the frontend and Express middlewares to protect some routes of the API with Authentication Control. I learnt a lot about the basic concepts of API technologies and I'll try to explore more of this world in the future.

## Client Side

[React](https://reactjs.org/) was my UI library of choice for the webapp's client side.
