const { Router } = require('express');
const router = Router();

const { getClients, getClientsByID, createClient, updateClient, deleteClient,
        getContacts, getContactsByID, createContact, updateContact, deleteContact,
        getProjects, getProjectsByID, createProject, updateProject, deleteProject,
        getContactsByProject
        } = require('../controllers/index.controllers')

router.get('/clients', getClients);
router.get('/clients/:id', getClientsByID);
router.post('/clients', createClient);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

router.get('/contacts', getContacts);
router.get('/contacts/:id', getContactsByID);
router.post('/contacts', createContact);
router.put('/contacts/:id', updateContact);
router.delete('/contacts/:id', deleteContact);
router.get('/contactsProject/:id',getContactsByProject)

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectsByID);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

module.exports = router;