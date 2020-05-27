# Minesweeper game

This project is part of the process to apply to the Santex's front-end developer position. The game was developed using the [Microsoft Windows Minesweeper](https://en.wikipedia.org/wiki/Microsoft_Minesweeper#/media/File:Minesweeper_XP.png) as source of inspiration.

## Getting started

Use [Yarn](https://yarnpkg.com/) to install the dependencies. To do so, you can execute the following command:
```
yarn
```

Once the dependencies are installed, you can start the development server by running:
```
yarn start
```

## Note to the reviewers

The project was created from scratch (no tools like Create React App were used). If you see something weird or have a question about something I did, please let me know!

Besides that, you are going to see that the reducer functions have statements like the following one:
```
state.gameStatus = GAME_OVER;
```
This could be seen as a potential issue (mutating the state of the store directly). However, I am using [Redux Toolkit](https://redux-toolkit.js.org/) which in turn uses [Immer](https://immerjs.github.io/immer/docs/introduction) behind scenes. Immer allows you to write code that looks like mutable, but without compromising mutability. I just wanted to point this out in case you didn't know the library.

Thank you!
