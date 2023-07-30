const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "./db/contacts.json");

const getContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};
const getContactByID = async (id) => {
  const contacts = await getContacts();
  const contactById = contacts.find((contact) => contact.id === id);
  return contactById || null;
};
const removeContact = async (id) => {
  const contacts = await getContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};
const addContact = async (name, email, phone) => {
  const contacts = await getContacts();
  const addedContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(addedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return addedContact;
};
getContacts();
module.exports = {
  getContacts,
  getContactByID,
  removeContact,
  addContact,
};
