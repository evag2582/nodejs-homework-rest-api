const express = require("express");

const {
  listContacts,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,

} = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contacts = await listContacts();
    const contact = contacts.find((el) => el.id === contactId);
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone,favorite } = req.body;
  try {
    const newContact = await addContact({ name, email, phone,favorite });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { newContact },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await listContacts();
    const updatedContacts = contacts.filter((el) => el.id !== contactId);
    const contactToDelete = await updateContact(contactId);

    await removeContact(contactId);

    res.status(204).json({
      status: "success",
      code: 200,
      message: "Contact deleted",
      data: {
        deletedContact: contactToDelete,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
});


router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);

    if (!updatedContact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found",
      });
    }

    res.json({
      status: "success",
      code: 200,
      data: { updatedContact },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const updatedContact = await updateStatusContact(contactId, favorite);
    res.json({
      status: "success",
      code: 200,
      data: { updatedContact },
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Contact not found",
    });
  }
});

module.exports = router;
