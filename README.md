<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->





<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Follow][follow-shield]][follow-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Best-README-Template</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/LarsPauwels/Blockchain-Salesforce"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo (Coming Soon)</a>
    ·
    <a href="https://github.com/LarsPauwels/Blockchain-Salesforce/issues">Report Bug</a>
    ·
    <a href="https://github.com/LarsPauwels/Blockchain-Salesforce/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About The REST API](#about-the-rest-api)
  * [Future Features](#future-features)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [End-points](#end-points)
  * [Basics Structure](#basics-structure)
  * [Blockchain end-points](#blockchain-end-points)
  * [Peer end-points](#peer-end-points)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The REST API

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This blockchain storage API saves data with a blockchain like method. The data will be saved in firestore and not a local file. This has the advantage that you don't need to install a program to work on the blockchain. The only problem is that this is at the expense of the transparency. But the solution to this is that you can display your chain online. 

Differences between a blockchain and a blockchain API:
* No currency transactions but data storage and no currency earned when mining a block.
* The API doesn't save the chain in a local file but saves the chain in Firebase.
* Transparency will be created by showing the data to the peers on a platform.

The API contains a user registration and login for creating peers in the network. The peers currently contain a basic structure (only the username, hashed password, rol and Id are saved).

### Future Features
The features tha will be added in the future:
*  Extensive work on the validation of transaction data.
*  Extensive work on the validation of the blocks added to the chain.
*  New end-point for companies. So that a peer can be linked to a campany.
*  Adding storage for images and/or files. So you can add the url to the transaction data.
*  Adding creation/updated date to the peers and copanies.
*  Adding a switch between username and email for the login end-point.

### Built With
The following technologies are used:
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Firebase](https://firebase.google.com/?gclid=CjwKCAiA-vLyBRBWEiwAzOkGVE35nA51aYVB16CbburEY9FpHsbUEUTw8f7wH38NA7eU4_4IlhpZCRoC2gQQAvD_BwE)



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

You need npm to install all the packages and run node.js locally.
* npm
```sh
npm install npm@latest -g
```

To save all the data you need to create a firebase account. When created then initialize a database
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Create a Firebase database at [Firebase](https://firebase.google.com/?gclid=CjwKCAiA-vLyBRBWEiwAzOkGVE35nA51aYVB16CbburEY9FpHsbUEUTw8f7wH38NA7eU4_4IlhpZCRoC2gQQAvD_BwE)
2. Clone the repo
```sh
git clone https://github.com/LarsPauwels/Blockchain-Salesforce.git
```
3. Install NPM packages
```sh
npm install
```
4. Place your Service Account Key from Firebase in the database folder with the name `ServiceAccountKey.json`



<!-- USAGE EXAMPLES -->
## End-points

Local base-url: `http://localhost:4000/api/v1`
Online base-url: `https://blockchain-salesforce.herokuapp.com/api/v1`

### Basics Structure

| Type | Return Type | Example |
| ------------- | ------------- | ------------- |
| Status  | String | success/fail/error |
| Message  | String  | Found '3' results that 'x' contains. |
| Data  | JSON object  |```json "block": {"hash": "4258f38a92a04fad116e9234ef67e13c6ef40f59541b3a58c7be9ea4257ab89a","index": 0,"nonce": 0,"previousHash": "0","timestamp": 1582935029708,"transactions": "Genesis block"}```|

### Blockchain end-points

| URL  | Type | Description |
| ------------- | ------------- | ------------- |
| /products  | `GET` | Returns the full blockchain in json |
| /products/sender/{name-sender}  | `GET`  | Returns all the blocks where the sender is equal to given sender name  |
| /products/id/{id-block}  | `GET`  | Returns the block with the given id |
| /products/name/{product-name}  | `GET`  | Returns all the blocks with the given name |
| /products/mine  | `GET`  | Mines all the Transactions that are pending  |
| /products/create  | `POST`  | Creates new transaction with required body fields: `sender` and `data`  |

### Peer end-points

| URL  | Type | Description |
| ------------- | ------------- | ------------- |
| /users/register  | `POST` | Creates new peer account with required fields: `email`, `username`, `password` and `rol` |
| /users/login  | `POST` | Returns a `true` or `false` if login is successfull with required fields: `username` and `password` |

<!-- CONTACT -->
## Contact

Lars Pauwels - [LinkedIn](https://www.linkedin.com/in/lars-pauwels-4172bb159/) - lars.pauwels@telenet.be

<!-- Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name) -->





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=flat-square
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[follow-shield]: https://img.shields.io/github/followers/LarsPauwels?style=social
[follow-url]: https://github.com/LarsPauwels
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=flat-square
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/lars-pauwels-4172bb159/
[product-screenshot]: images/screenshot.png
