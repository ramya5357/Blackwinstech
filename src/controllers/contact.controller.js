import { Contact } from "../models/contact.model.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asynHandler.js";

// to get all contacts
const getContact = asyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.find().select(
      "-_id -createdAt -updatedAt -__v"
    );
    res.status(200).json(contacts);
  } catch (error) {
    throw new ApiError(501, "Something went wrong with server !");
  }
});

// to create a contact
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  // check for empty fields
  if (
    [name, email, phone].some(
      (field) => typeof field === "string" && field.trim() === ""
    )
  ) {
    throw new ApiError(400, "Kindly provide required flieds");
  }

  // check for existing contact
  const existingContact = await Contact.findOne({
    $or: [{ email }, { phone }],
  });

  if (existingContact) {
    throw new ApiError(409, " Contact already exists !");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  const createdContact = await Contact.findById(contact._id).select(
    "-name -phone -email"
  );

  if (!createdContact) {
    throw new ApiError(500, "Something went wrong while saving the contact !");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, createdContact, "Contact created successfully !")
    );
});

// to get a single contact
const getSingleContact = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    throw new ApiError(400, "Fill details to search");
  }
  const contact = await Contact.find({ phone: phone }).select(
    "-_id -createdAt -updatedAt -__v"
  );

  if (!contact.length) {
    throw new ApiError(404, "Contact not found !");
  }
  res.status(200).json(contact);
});

// to update a contact number
const updateContact = asyncHandler(async (req, res) => {
  const { oldPhone, newPhone } = req.body;

  if (!oldPhone && !newPhone) {
    throw new ApiError(400, "Fill details to search");
  }
  const contact = await Contact.findOne({ phone: oldPhone }).select(
    "-createdAt -updatedAt -__v"
  );
  // console.log(contact);

  if (!contact) {
    throw new ApiError(404, "Contact not found !");
  }

  contact.phone = newPhone;
  await contact.save({ validateBeforeSave: false });
  res
    .status(200)
    .json(new ApiResponse(200, contact, "Phone number changed successfully !"));
});

// to delete a contact
const deleteContact = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    throw new ApiError(400, "Fill details to search");
  }

  try {
    var contact = await Contact.findOne({ phone: phone }).select(
      "-updatedAt -createdAt -__v"
    );
  } catch (error) {
    throw new ApiError(404, "Contact not found !");
  }

  try {
    const result = await Contact.deleteOne({ _id: contact?._id });
    if (result.deletedCount === 1) {
      res
        .status(200)
        .json(new ApiResponse(200, contact, "Number deleted successfully !"));
    }
  } catch (error) {
    throw new ApiError(500, "Something went wrong will deleteing contact !");
  }
});

export {
  getContact,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
