const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const res = contacts.find((item) => item.id === contactId.toString());
  return res || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex(
    (item) => item.id === contactId.toString()
  );
  if (indexContact === -1) return null;
  const [res] = contacts.splice(indexContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return res;
};

const addContact = async (data) => {
  const { name, email, phone } = data;
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone }; // Using nanoid here

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const indexContact = contacts.findIndex(
      (item) => item.id === contactId.toString()
    );

    if (indexContact === -1) return null;

    contacts[indexContact] = { ...contacts[indexContact], ...body };

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return contacts[indexContact];
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error; // Rethrow the error to be caught by the calling function
  }
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
