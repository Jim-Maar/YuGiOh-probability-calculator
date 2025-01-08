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

# Questions
- How do you do something in the cloud (do I have to use node.js?)

