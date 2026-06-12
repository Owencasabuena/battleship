/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/player.js */ \"./src/modules/player.js\");\n\n\nconst fleetBlueprint = [\n    { name: 'Carrier', length: 5, p1Coords: [[0,0], [0,1], [0,2], [0,3], [0,4]], p2Coords: [[0,0], [1,0], [2,0], [3,0], [4,0]] },\n    { name: 'Battleship', length: 4, p1Coords: [[2,0], [2,1], [2,2], [2,3]], p2Coords: [[0,2], [1,2], [2,2], [3,2]] },\n    { name: 'Destroyer', length: 3, p1Coords: [[4,0], [4,1], [4,2]], p2Coords: [[0,4], [1,4], [2,4]] },\n    { name: 'Submarine', length: 3, p1Coords: [[6,0], [6,1], [6,2]], p2Coords: [[0,6], [1,6], [2,6]] },\n    { name: 'Patrol Boat', length: 2, p1Coords: [[8,0], [8,1]], p2Coords: [[0,8], [1,8]] }\n];\n\nfunction initGame() {\n    const player1 = new _modules_player_js__WEBPACK_IMPORTED_MODULE_0__.Player('human');\n    const player2 = new _modules_player_js__WEBPACK_IMPORTED_MODULE_0__.Player('computer');\n\n    // Loop through the blueprint to spawn and place everything!\n    fleetBlueprint.forEach(shipData => {\n        // Create the unique ships\n        const p1Ship = new Ship(shipData.name, shipData.length);\n        const p2Ship = new Ship(shipData.name, shipData.length);\n\n        // Place them on the boards\n        player1.gameboard.placeShip(p1Ship, shipData.p1Coords);\n        player2.gameboard.placeShip(p2Ship, shipData.p2Coords);\n    });\n\n    // 3. Draw the Boards! (Using your ui.js module)\n    const playerBoardDiv = document.querySelector('.player-board');\n    const enemyBoardDiv = document.querySelector('.enemy-board');\n\n    createBoard(playerBoardDiv, player1.gameboard, true);  // Reveal your ships\n    createBoard(enemyBoardDiv, player2.gameboard, false); // Fog of war for computer!\n}\n\ninitGame();\n\n//# sourceURL=webpack://battleship/./src/index.js?\n}");

/***/ },

/***/ "./src/modules/gameboard.js"
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard)\n/* harmony export */ });\nclass Gameboard {\n    constructor() {\n        this.board = {};\n        this.missedAttacks = [];\n        this.ships = [];\n    }\n    \n    placeShip(ship, coordinatesArray) {\n        // ToDo: check if coordinatesArray is valid like within the range or no ship\n\n        //  loop \n        coordinatesArray.forEach(coords => {\n            this.board[coords.toString()] = ship;\n        });\n        this.ships.push(ship);\n    }\n\n    receiveAttack(coordinate) {\n        if(coordinate.toString() in this.board) {\n            this.board[coordinate.toString()].hit();\n            return true;\n        }\n\n        this.missedAttacks.push(coordinate);\n        return false;\n    }\n\n    isGameOver() {\n        for(let i = 0; i < this.ships.length; i++) {\n            if(this.ships[i].isSunk === false) {\n                return false;\n            }\n        }\n\n        return true;\n    }\n}\n\n//# sourceURL=webpack://battleship/./src/modules/gameboard.js?\n}");

/***/ },

/***/ "./src/modules/player.js"
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/modules/gameboard.js\");\n\n\nclass Player {\n    constructor(){\n        this.gameboard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard();\n        this.previousMoves = new Set();\n    }\n\n    generateRandomNumber() {\n        return Math.floor(Math.random() * 10);\n    }\n\n    makeRandomMove() {\n        let xCoord = this.generateRandomNumber();\n        let yCoord = this.generateRandomNumber();\n        let randomMove = [xCoord, yCoord];\n        while(this.previousMoves.has(randomMove.toString())) {\n            xCoord = this.generateRandomNumber();\n            yCoord = this.generateRandomNumber();\n            randomMove = [xCoord, yCoord];\n        }\n        this.previousMoves.add(randomMove.toString());\n        return randomMove;\n    }\n}\n\n//# sourceURL=webpack://battleship/./src/modules/player.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;