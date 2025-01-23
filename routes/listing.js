const express = require("express");
const router = express.Router({mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing  = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
// const cloudinary = require("../cloudConfig.js");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn,
       //passing the validate schema as a middleware to validate request body
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// NEW ROUTE
 router.get("/new", isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingController.ShowListing))
    .put(
      isLoggedIn,
      isOwner,
      upload.single('listing[image]'),
      validateListing,
      wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


 

 
// EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm)
);


module.exports = router;