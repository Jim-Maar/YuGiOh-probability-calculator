# Web Dev Things
- best way to make text clickable, is to use a button and make it look like text using css: https://stackoverflow.com/questions/9467504/html-make-text-clickable-without-making-it-a-hyperlink

# Usefull Patterns
- The Model View Controller Pattern is useful for webdev
    - Theres no problem in rewriting a large part of the html file, whenever something changes in the model, becuase DOM manipulations are very efficient
    - You don't neccessarily need strict seperation between Model and View. For example adding View as an observer to model seems pretty good
    - All references to dom objects are in the view
    - All functions that are called when the user interacts with the website are called in the Controller
- Observer
- Callback functions

# Directory Stuff
- standart folder setup is different for vanilla javascript and typescript
- javascript:
my-project/
├── scripts/
│   ├── main.js
│   └── utils.js
└── index.html  <!-- directly links to scripts/main.js -->
- typescript
my-project/
├── src/
│   ├── main.ts
│   └── utils.ts
├── public/
│   └── index.html  <!-- links to built bundle, not source files -->
└── dist/  <!-- built files go here -->

# Typescript
- Typescript is great because
    - you catch type errors faster
    - you know what type everything is
    - you can look at documentation in the ide
    - better refactoring

# Random
- rename a variable by hovering over it and clicking f2

# Hosting
- There are Backend as a Service platforms, where you can skip making the backend from scratch and host stuff
- https://www.youtube.com/watch?v=cw34KMPSt4k pretty nice way to host a website for low cost
    - The main disadvantage is that you have a few seconds cold start (I think this is not too bad though)
    - The advantage is that I can try out having a professional 
- https://www.youtube.com/watch?v=d_jjPhh8PJo
    - explains how to host a website without backend
- https://github.com/alexander-turner/TurnTrout.com/tree/main
    - Blog website von Alex Turner

- Für Blog / Personal website: Ich will nichts bezahlen und ich will, dass es schnell lädt: also nur React + Typescript
- Für Game: Game Läuft in Python Backend mit Websockets, Kosten sollen klein sein: Serverless Backend mit Google Cloud run
- Für Yugioh Calculator: (Entweder einfach nur react oder zum üben flask backend, react frontend) (Zum üben ist das glaube ich ganz geil!) (Wieder Google Cloud Run serverless)

# Questions
- How do you do something in the cloud (do I have to use node.js?)

# React
- Very useful for building a react website step by step: https://react.dev/learn/thinking-in-react