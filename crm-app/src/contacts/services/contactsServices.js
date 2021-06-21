import axios from 'axios';
const url = "http://localhost:4000/contacts";
const urlClients = "http://localhost:4000/clients";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const getContacts = () => {
   return axios.get(url)
}

const createContact = async (contact) => {
   return axios.post(url, contact)
}

 const updateContact = async (contact) => {
   return axios.put(`${url}/${contact.idcontact}`, contact)
}

const deleteContact = async (contact) => {
    return axios.delete(`${url}/${contact.idcontact}`,contact)
}

const getClients = () => {
   return axios.get(urlClients)
}

const exportServices = {
     getContacts,
     createContact,
     updateContact,
     deleteContact,
     getClients
}
  

export default exportServices