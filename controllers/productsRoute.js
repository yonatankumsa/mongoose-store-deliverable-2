////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Product = require("../models/products")
const router = express.Router()

router.use((req, res, next) => {
  next()
})  

router.get('/', (req, res) => {
  // res.send('HEY THIS IS PRODUCT')
  Product.find()
    .then(( products ) => {
      // render the template with the data from the database
      res.render("products/index", { products });
    })
})

router.get("/new", (req, res) => {
  res.render("products/new");
});



router.post("/", (req, res) => {
 
  // create the new product
  Product.create(req.body)
      .then((product) => {
          // redirect user to index page if successfully created item
          res.redirect("products");
      })
      // send error as json
      .catch((error) => {
          console.log(error);
          res.json({ error });
      });
});

router.get('/:id/edit', (req, res) => {
  // res.send('HEY THIS IS PRODUCT')
  const id = req.params.id;
  Product.findById(id)
    .then(( product ) => {
      // render the template with the data from the database
      res.render("products/edit", { product });
    })
})


router.get('/:id', (req, res) => {
  // res.send('HEY THIS IS PRODUCT')
  const id = req.params.id;
  Product.findById(id)
    .then(( product ) => {
      // render the template with the data from the database
      res.render("products/show", { product });
    })
})

router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  Product.findByIdAndRemove(id)
    .then(( product ) => {
      // redirect to main page after deleting
      res.redirect("/products");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.put("/:id/edit", (req, res) => {
 
  // create the new product
  // get the id from params
  const id = req.params.id;
  // update the fruit
  Product.findByIdAndUpdate(id, req.body, { new: true })
    .then((product) => {
      // redirect to main page after updating
      res.redirect("/products");
    })
});

router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // update the product
  Product.findByIdAndUpdate(id, { $inc: { qty: -1 } }, { new: true })
    .then((product) => {
      // redirect to main page after updating
      res.redirect("/products");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});



module.exports = router