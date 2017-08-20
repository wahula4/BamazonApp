var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View products for sale",
        "View low inventory",
        "Add to inventory",
        "Add new product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View products for sale":
          productList();
          break;
        case "View low inventory":
          lowInventory();
          break;
        case "Add to inventory":
          addToInventory();
          break;
        case "Add new product":
          newProduct();
          break;
      }
    });
}

function productList() {
  var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
  connection.query(query, function(err, res){
    for (i = 0; i < res.length; i++) {
      console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: $" + res[i].price + " || Stock: " + res[i].stock_quantity)
      console.log("\n")
    }
      runSearch();  // calling the inquirer questions inside the query to make sure it comes after te product list
  }); // connection query
} // function

function lowInventory() {
     var query = "SELECT item_id, product_name, price FROM products WHERE (stock_quantity < 5)"
        connection.query(query, function(err, res) {

            if (res.length === 0) {
              console.log("All stock quantities are adequate\n")
            }
            else {
              for (i = 0; i < res.length; i++) {
              console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: $" + res[i].price)
              console.log("\n");
              }
            }
          runSearch();
        }); //connection query
}

function addToInventory() {
  inquirer
    .prompt([
      {
        name: "stock",
        type: "input",
        message: "\nPlease enter the ID # for the product you want to add more inventory to? ",
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
        message: "How many do you want to add for this product? ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        } // validate
      }
    ]).then(function(answer) {
      var query = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?";
      connection.query(query, [answer.itemQuantity, answer.stock], function(err, res){
        if (err) throw err;
        console.log("The inventory has been increased")
      }); // connection query
      runSearch();
    }); // .then
}; // addToInventory function

function newProduct() {
    inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "\nPlease enter the name for the product you want to add",
      },
      {
        name: "department",
        type: "input",
        message: "\nPlease enter the department for the product you want to add",
      },
      {
        name: "price",
        type: "input",
        message: "What is the price for this product?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        } // validate
      },
      {
        name: "stock",
        type: "input",
        message: "What is the stock quantity?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        } // validate
      }
    ]).then(function(answer) {
      var query = "INSERT INTO products SET ?";
      connection.query(query, [{product_name: answer.name, department_name: answer.department, price: answer.price, stock_quantity: answer.stock}], function(err, res){
        if (err) throw err;
      }); // connection query
      console.log("The product has been added to inventory");
      runSearch();
    }); // .then
} // newProduct
