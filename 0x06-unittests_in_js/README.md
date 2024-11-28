# 0x06. Unittests in JS

This project is about learning how to use Mocha to write a test suite, different assertion libraries like Node or Chai, how to present long test suites, how to use spies and stubs, hooks, and unit testing with asynchronous functions.

## Requirements

* All of your code will be executed on Ubuntu 18.04 using Node 12.x.x
* Allowed editors: vi, vim, emacs, Visual Studio Code
* All your files should end with a new line
* A README.md file, at the root of the folder of the project, is mandatory
* Your code should use the js extension
* When running every test with `npm run test *.test.js`, everything should pass correctly without any warning or error

## Tasks

### 0. Basic test with Mocha and Node assertion library

* Install Mocha using npm: `npm install --save-dev mocha`
* Set up a scripts in your package.json to quickly run Mocha using `npm test`
* You have to use `assert`
* Create a new file named 0-calcul.js:
    * Create a function named `calculateNumber`. It should accepts two arguments (number) a and b
    * The function should round a and b and return the sum of it
* Test cases
    * Create a file 0-calcul.test.js that contains test cases of this function
    * You can assume a and b are always number
    * Tests should be around the “rounded” part

### 1. Combining descriptions

* Create a new file named 1-calcul.js:
    * Upgrade the function you created in the previous task (0-calcul.js)
    * Add a new argument named `type` at first argument of the function. `type` can be `SUM`, `SUBTRACT`, or `DIVIDE` (string)
    * When type is `SUM`, round the two numbers, and add a and b
    * When type is `SUBTRACT`, round the two numbers, and subtract b from a
    * When type is `DIVIDE`, round the two numbers, and divide a with b - if the rounded value of b is equal to 0, return the string `Error`
* Test cases
    * Create a file 1-calcul.test.js that contains test cases of this function
    * You can assume a and b are always number
    * Usage of `describe` will help you to organize your test cases

### 2. Basic test using Chai assertion library

* Install Chai with npm: `npm install --save-dev chai`
* Copy the file 1-calcul.js in a new file 2-calcul_chai.js (same content, same behavior)
* Copy the file 1-calcul.test.js in a new file 2-calcul_chai.test.js
* Rewrite the test suite, using `expect` from Chai

### 3. Spies

* Spies are a useful wrapper that will execute the wrapped function, and log useful information (e.g. was it called, with what arguments). Sinon is a library allowing you to create spies.
* Install Sinon with npm: `npm install --save-dev sinon`
* Create a new file named utils.js
    * Create a new module named `Utils`
    * Create a property named `calculateNumber` and paste your previous code in the function
    * Export the Utils module
* Create a new file named 3-payment.js:
    * Create a new function named `sendPaymentRequestToApi`. The function takes two argument `totalAmount`, and `totalShipping`
    * The function calls the `Utils.calculateNumber` function with type `SUM`, `totalAmount` as a, `totalShipping` as b and display in the console the message `The total is: <result of the sum>`
* Create a new file named 3-payment.test.js and add a new suite named `sendPaymentRequestToApi`:
    * By using `sinon.spy`, make sure the math used for `sendPaymentRequestToApi(100, 20)` is the same as `Utils.calculateNumber('SUM', 100, 20)` (validate the usage of the Utils function)

### 4. Stubs

* Stubs are similar to spies. Except that you can provide a different implementation of the function you are wrapping. Sinon can be used as well for stubs.
* Create a new file 4-payment.js, and copy the code from 3-payment.js (same content, same behavior)
* Create a new file 4-payment.test.js, and copy the code from 3-payment.test.js
* Imagine that calling the function `Utils.calculateNumber` is actually calling an API or a very expensive method. You don’t necessarily want to do that on every test run
    * Stub the function `Utils.calculateNumber` to always return the same number 10
    * Verify that the stub is being called with `type = SUM`, `a = 100`, and `b = 20`
    * Add a spy to verify that `console.log` is logging the correct message `The total is: 10`

### 5. Hooks

* Hooks are useful functions that can be called before execute one or all tests in a suite
* Copy the code from 4-payment.js into a new file 5-payment.js: (same content/same behavior)
* Create a new file 5-payment.test.js:
    * Inside the same `describe`, create 2 tests:
        * The first test will call `sendPaymentRequestToAPI` with 100, and 20:
            * Verify that the console is logging the string `The total is: 120`
            * Verify that the console is only called once
        * The second test will call `sendPaymentRequestToAPI` with 10, and 10:
            * Verify that the console is logging the string `The total is: 20`
            * Verify that the console is only called once

### 6. Async tests with done

* Look into how to support async testing, for example when waiting for the answer of an API or from a Promise
* Create a new file 6-payment_token.js:
    * Create a new function named `getPaymentTokenFromAPI`
    * The function will take an argument called `success` (boolean)
    * When `success` is true, it should return a resolved promise with the object `{data: 'Successful response from the API' }`
    * Otherwise, the function is doing nothing.
* Create a new file 6-payment_token.test.js and write a test suite named `getPaymentTokenFromAPI`
    * How to test the result of `getPaymentTokenFromAPI(true)`?

### 7. Skip

* When you have a long list of tests, and you can’t figure out why a test is breaking, avoid commenting out a test, or removing it. Skip it instead, and file a ticket to come back to it as soon as possible
* You will be using this file, conveniently named 7-skip.test.js
    ```javascript
    const { expect } = require('chai');

    describe('Testing numbers', () => {
      it('1 is equal to 1', () => {
        expect(1 === 1).to.be.true;
      });

      // ... other tests ...

      it('1 is equal to 3', () => { // This test will fail
        expect(1 === 3).to.be.true;
      });

      // ... other tests ...
    });
    ```
* Using the file 7-skip.test.js:
    * Make the test suite pass without fixing or removing the failing test
    * `it` description must stay the same

### 8. Basic Integration testing

* In a folder 8-api located at the root of the project directory, copy this package.json over.
    ```json
    {
      "name": "8-api",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "./node_modules/mocha/bin/mocha"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
        "express": "^4.17.1"
      },
      "devDependencies": {
        "chai": "^4.2.0",
        "mocha": "^6.2.2",
        "request": "^2.88.0",
        "sinon": "^7.5.0"
      }
    }
    ```
* Create a new file api.js:
    * By using express, create an instance of express called app
    * Listen to port 7865 and log `API available on localhost port 7865` to the browser console when the express server is started
    * For the route `GET /`, return the message `Welcome to the payment system`
* Create a new file api.test.js:
    * Create one suite for the index page:
        * Correct status code?
        * Correct result?
        * Other?

### 9. Regex integration testing

* In a folder 9-api, reusing the previous project in 8-api (package.json, api.js and api.test.js)
* Modify the file api.js:
    * Add a new endpoint: `GET /cart/:id`
    * `:id` must be only a number (validation must be in the route definition)
    * When access, the endpoint should return `Payment methods for cart :id`
* Modify the file api.test.js:
    * Add a new test suite for the cart page:
        * Correct status code when `:id` is a number?
        * Correct status code when `:id` is NOT a number (=> 404)?
        * etc.

### 10. Deep equality & Post integration testing

* In a folder 10-api, reusing the previous project in 9-api (package.json, api.js and api.test.js)
* Modify the file api.js:
    * Add an endpoint `GET /available_payments` that returns an object with the following structure:
        ```json
        {
          "payment_methods": {
            "credit_cards": true,
            "paypal": false
          }
        }
        ```
    * Add an endpoint `POST /login` that returns the message `Welcome :username` where `:username` is the value of the body variable `userName`.
* Modify the file api.test.js:
    * Add a test suite for the `/login` endpoint
    * Add a test suite for the `/available_payments` endpoint


# 0x06. Tests unitaires en JS

Ce projet porte sur l'apprentissage de l'utilisation de Mocha pour écrire une suite de tests, de différentes bibliothèques d'assertions telles que Node ou Chai, de la présentation de longues suites de tests, de l'utilisation de spies et de stubs, de hooks et des tests unitaires avec des fonctions asynchrones.

## Prérequis

* Tous vos codes seront exécutés sur Ubuntu 18.04 en utilisant Node 12.x.x
* Éditeurs autorisés : vi, vim, emacs, Visual Studio Code
* Tous vos fichiers doivent se terminer par une nouvelle ligne
* Un fichier README.md, à la racine du dossier du projet, est obligatoire
* Votre code doit utiliser l'extension .js
* Lors de l'exécution de chaque test avec `npm run test *.test.js`, tout doit passer correctement sans aucun avertissement ni erreur

## Tâches

### 0. Test de base avec Mocha et la bibliothèque d'assertions Node

* Installez Mocha en utilisant npm : `npm install --save-dev mocha`
* Configurez un script dans votre package.json pour exécuter rapidement Mocha en utilisant `npm test`
* Vous devez utiliser `assert`
* Créez un nouveau fichier nommé 0-calcul.js :
    * Créez une fonction nommée `calculateNumber`. Elle doit accepter deux arguments (nombre) a et b
    * La fonction doit arrondir a et b et retourner leur somme
* Cas de test
    * Créez un fichier 0-calcul.test.js qui contient des cas de test de cette fonction
    * Vous pouvez supposer que a et b sont toujours des nombres
    * Les tests doivent porter sur la partie "arrondie"

### 1. Combinaison de descriptions

* Créez un nouveau fichier nommé 1-calcul.js :
    * Améliorez la fonction que vous avez créée dans la tâche précédente (0-calcul.js)
    * Ajoutez un nouvel argument nommé `type` au premier argument de la fonction. `type` peut être `SUM`, `SUBTRACT` ou `DIVIDE` (chaîne de caractères)
    * Lorsque `type` est `SUM`, arrondissez les deux nombres et additionnez a et b
    * Lorsque `type` est `SUBTRACT`, arrondissez les deux nombres et soustrayez b de a
    * Lorsque `type` est `DIVIDE`, arrondissez les deux nombres et divisez a par b - si la valeur arrondie de b est égale à 0, retournez la chaîne de caractères `Error`
* Cas de test
    * Créez un fichier 1-calcul.test.js qui contient des cas de test de cette fonction
    * Vous pouvez supposer que a et b sont toujours des nombres
    * L'utilisation de `describe` vous aidera à organiser vos cas de test

### 2. Test de base en utilisant la bibliothèque d'assertions Chai

* Installez Chai avec npm : `npm install --save-dev chai`
* Copiez le fichier 1-calcul.js dans un nouveau fichier 2-calcul_chai.js (même contenu, même comportement)
* Copiez le fichier 1-calcul.test.js dans un nouveau fichier 2-calcul_chai.test.js
* Réécrivez la suite de tests en utilisant `expect` de Chai

### 3. Spies

* Les spies sont un wrapper utile qui exécutera la fonction enveloppée et enregistrera des informations utiles (par exemple, a-t-elle été appelée, avec quels arguments). Sinon est une bibliothèque vous permettant de créer des spies.
* Installez Sinon avec npm : `npm install --save-dev sinon`
* Créez un nouveau fichier nommé utils.js
    * Créez un nouveau module nommé `Utils`
    * Créez une propriété nommée `calculateNumber` et collez votre code précédent dans la fonction
    * Exportez le module `Utils`
* Créez un nouveau fichier nommé 3-payment.js :
    * Créez une nouvelle fonction nommée `sendPaymentRequestToApi`. La fonction prend deux arguments `totalAmount` et `totalShipping`
    * La fonction appelle la fonction `Utils.calculateNumber` avec le type `SUM`, `totalAmount` comme `a`, `totalShipping` comme `b` et affiche dans la console le message `The total is: <result of the sum>`
* Créez un nouveau fichier nommé 3-payment.test.js et ajoutez une nouvelle suite nommée `sendPaymentRequestToApi` :
    * En utilisant `sinon.spy`, assurez-vous que le calcul utilisé pour `sendPaymentRequestToApi(100, 20)` est le même que `Utils.calculateNumber('SUM', 100, 20)` (validez l'utilisation de la fonction `Utils`)

### 4. Stubs

* Les stubs sont similaires aux spies. Sauf que vous pouvez fournir une implémentation différente de la fonction que vous enveloppez. Sinon peut également être utilisé pour les stubs.
* Créez un nouveau fichier 4-payment.js et copiez le code de 3-payment.js (même contenu, même comportement)
* Créez un nouveau fichier 4-payment.test.js et copiez le code de 3-payment.test.js
* Imaginez qu'appeler la fonction `Utils.calculateNumber` appelle en fait une API ou une méthode très coûteuse. Vous ne voulez pas nécessairement faire cela à chaque exécution de test
    * Stubbez la fonction `Utils.calculateNumber` pour toujours retourner le même nombre 10
    * Vérifiez que le stub est appelé avec `type = SUM`, `a = 100` et `b = 20`
    * Ajoutez un spy pour vérifier que `console.log` enregistre le bon message `The total is: 10`

### 5. Hooks

* Les hooks sont des fonctions utiles qui peuvent être appelées avant d'exécuter un ou tous les tests d'une suite
* Copiez le code de 4-payment.js dans un nouveau fichier 5-payment.js : (même contenu/même comportement)
* Créez un nouveau fichier 5-payment.test.js :
    * Dans le même `describe`, créez 2 tests :
        * Le premier test appellera `sendPaymentRequestToAPI` avec 100 et 20 :
            * Vérifiez que la console enregistre la chaîne de caractères `The total is: 120`
            * Vérifiez que la console n'est appelée qu'une seule fois
        * Le deuxième test appellera `sendPaymentRequestToAPI` avec 10 et 10 :
            * Vérifiez que la console enregistre la chaîne de caractères `The total is: 20`
            * Vérifiez que la console n'est appelée qu'une seule fois

### 6. Tests asynchrones avec done

* Examinez comment prendre en charge les tests asynchrones, par exemple lors de l'attente de la réponse d'une API ou d'une Promise
* Créez un nouveau fichier 6-payment_token.js :
    * Créez une nouvelle fonction nommée `getPaymentTokenFromAPI`
    * La fonction prendra un argument appelé `success` (booléen)
    * Lorsque `success` est vrai, elle doit retourner une promesse résolue avec l'objet `{data: 'Successful response from the API' }`
    * Sinon, la fonction ne fait rien.
* Créez un nouveau fichier 6-payment_token.test.js et écrivez une suite de tests nommée `getPaymentTokenFromAPI`
    * Comment tester le résultat de `getPaymentTokenFromAPI(true)` ?

### 7. Skip

* Lorsque vous avez une longue liste de tests et que vous ne parvenez pas à comprendre pourquoi un test échoue, évitez de commenter un test ou de le supprimer. Sautez-le à la place et déposez un ticket pour y revenir dès que possible
* Vous utiliserez ce fichier, nommé de manière appropriée 7-skip.test.js
    ```javascript
    const { expect } = require('chai');

    describe('Testing numbers', () => {
      it('1 is equal to 1', () => {
        expect(1 === 1).to.be.true;
      });

      // ... other tests ...

      it('1 is equal to 3', () => { // This test will fail
        expect(1 === 3).to.be.true;
      });

      // ... other tests ...
    });
    ```
* En utilisant le fichier 7-skip.test.js :
    * Faites passer la suite de tests sans corriger ni supprimer le test qui échoue
    * La description de `it` doit rester la même

### 8. Tests d'intégration de base

* Dans un dossier 8-api situé à la racine du répertoire du projet, copiez ce package.json.
    ```json
    {
      "name": "8-api",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "./node_modules/mocha/bin/mocha"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
        "express": "^4.17.1"
      },
      "devDependencies": {
        "chai": "^4.2.0",
        "mocha": "^6.2.2",
        "request": "^2.88.0",
        "sinon": "^7.5.0"
      }
    }
    ```
* Créez un nouveau fichier api.js :
    * En utilisant express, créez une instance d'express appelée app
    * Écoutez le port 7865 et enregistrez `API available on localhost port 7865` dans la console du navigateur lorsque le serveur express est démarré
    * Pour la route `GET /`, retournez le message `Welcome to the payment system`
* Créez un nouveau fichier api.test.js :
    * Créez une suite pour la page d'index :
        * Code de statut correct ?
        * Résultat correct ?
        * Autre ?

### 9. Tests d'intégration Regex

* Dans un dossier 9-api, en réutilisant le projet précédent dans 8-api (package.json, api.js et api.test.js)
* Modifiez le fichier api.js :
    * Ajoutez un nouveau point de terminaison : `GET /cart/:id`
    * `:id` doit être uniquement un nombre (la validation doit être dans la définition de la route)
    * Lors de l'accès, le point de terminaison doit retourner `Payment methods for cart :id`
* Modifiez le fichier api.test.js :
    * Ajoutez une nouvelle suite de tests pour la page du panier :
        * Code de statut correct lorsque `:id` est un nombre ?
        * Code de statut correct lorsque `:id` n'est PAS un nombre (=> 404) ?
        * etc.

### 10. Égalité profonde et tests d'intégration Post

* Dans un dossier 10-api, en réutilisant le projet précédent dans 9-api (package.json, api.js et api.test.js)
* Modifiez le fichier api.js :
    * Ajoutez un point de terminaison `GET /available_payments` qui retourne un objet avec la structure suivante :
        ```json
        {
          "payment_methods": {
            "credit_cards": true,
            "paypal": false
          }
        }
        ```
    * Ajoutez un point de terminaison `POST /login` qui retourne le message `Welcome :username` où `:username` est la valeur de la variable body `userName`.
* Modifiez le fichier api.test.js :
    * Ajoutez une suite de tests pour le point de terminaison `/login`
    * Ajoutez une suite de tests pour le point de terminaison `/available_payments`