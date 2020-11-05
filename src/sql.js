// var sqlite3 = require('sqlite3');
// var db = new sqlite3.Database('./calculations.sqlite');


// // Create table function to create the calculation table that will hold the calculations as text
// const createCalcTable = () => {
//   return `CREATE TABLE calctable (
// 	id INTEGER PRIMARY KEY,
// 	calc TEXT DEFAULT ‘’);`;
// };


// // Query to show the 10 most recent calculations from the calctable:
// const getRecentCalcs = () => {
//   return `SELECT calc
//   FROM calctable
//   ORDER BY id DESC
//   LIMIT 10;`;
// };


// // Insert function to add a new row to the calctable table:
// const addNewCalc = (newCalc) => {
//     return `INSERT INTO calctable (calc)
//     VALUES (${newCalc});`;
// };


// // Delete function to delete calculations older than the 10 most recent calculations:
// const deleteOldCalc = () => {
//     return `DELETE FROM calctable
//     WHERE id > 10;`;
// };


// module.exports = {
//   createCalcTable,
//   getRecentCalcs,
//   addNewCalc,
//   deleteOldCalc
// };
