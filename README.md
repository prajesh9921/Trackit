# Trackit

Folder Structure:
```
src-
  features  -- (contains redux code)
    items.js
    numbers.js
  screens
    DisplayExpense -- (It displays the expense detaisl. also shows options to delete and edit)
    EditExpense    -- (Edit screen where you can edit the expense and income)
    ExpenseSalary  -- (It is a screen where we add our income and expense)
    Home           -- (Home displays all our expenses and current balance)
    UserDetails    -- (Page where all users details are being shown).
```

# Getting started

1. Clone the repo 
2. After cloning open terminal inside project folder and run ```npm install``` it will install all dependencies.
3. To run the app type ```npm run start``` it will start metro bundler.

# TroubleShootinh
1. If you get error like "react-native-cli is unknown" or "npm start run command unknown" then run command ```npm install -g react-native-cli```. hope that solves the issue.
