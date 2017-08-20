var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Wolfpack4",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  productList();
});

// display all products to purchase
function productList() {
  var query = "SELECT item_id, product_name, price FROM products";
  connection.query(query, function(err, res){
    for (i = 0; i < res.length; i++) {
      console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: $" + res[i].price)
    }
      buyProducts();  // calling the inquirer questions inside the query to make sure it comes after te product list
  }); // connection query
} // function

//prompts for choosing a product to purchase
function buyProducts() {
  inquirer
    .prompt([
      {
        name: "buyItem",
        type: "input",
        message: "\nPlease enter the ID# for the product you want to buy? ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        } // validate
      },
      {
        name: "itemQuantity",
        type: "input",
        message: "How many do you want to buy of this product? ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        } // validate
      }
    ]).then(function(answer) {
        var query = "SELECT stock_quantity FROM products WHERE ?"
        connection.query(query, {item_id: answer.buyItem}, function(err, res) {
          if (answer.itemQuantity < res[0].stock_quantity) {
            tableUpdate(answer);
            calculateTotal(answer);
          }
          else {
            console.log("Sorry, there are " + res[0].stock_quantity + " of this item left in stock");
            buyProducts();
          }
        }); //connection query
    }); // .then
}; // buyProducts function

function tableUpdate(answer) {
  var query = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?";
  connection.query(query, [answer.itemQuantity, answer.buyItem], function(err, res){
    if (err) throw err;
  }); // connection query
} // tableUpdate function

function calculateTotal(answer) {
  var query = "SELECT price FROM products WHERE ?";
  connection.query(query, {item_id: answer.buyItem}, function(err, res) {
    console.log("Your total is $" + (res[0].price * answer.itemQuantity))
    buyProducts();
  }) // connection query
} //calculateTotal function
