const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}

const pool = new Pool(dbConfig);

// Get Clients
const getClients = async (req, res) =>{
    const response = await pool.query(`SELECT idClient, clientName, clientType, email, phoneNumber
                                       FROM Clients
                                       WHERE status != false
                                       order by idClient asc`);
    console.log(response.rows);
    res.status(200).json(response.rows);
};
// Get Client By ID
const getClientsByID = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM Clients WHERE idClient = $1', [id]);
    res.json(response.rows);
};
// Create Client
const createClient = async (req, res) => {
    const {clientname, clienttype, email, phonenumber, iscompany, status} = req.body;

    const response = await pool.query('INSERT INTO Clients(clientName,clientType,email,phoneNumber,isCompany,status) VALUES($1, $2, $3, $4, $5, $6)', [clientname,clienttype,email,phonenumber,iscompany,status]);
    res.json({
        message: 'Client Created Successfully!',
        body: {
            client: {clientname, clienttype, email, phonenumber, iscompany, status}
        }
    })
};
// Update Client
const updateClient = async (req, res) => {
    console.log('1')
    const id = req.params.id;
    const {clientname, clienttype, email, phonenumber} = req.body;

    const response = await pool.query('UPDATE Clients SET clientName = $1, clientType = $2, email = $3, phoneNumber = $4 WHERE idClient = $5', [
        clientname,
        clienttype,
        email,
        phonenumber,
        id
    ]);
    res.json(`Client ${id} updated successfully!`);
};
// Delete Client
const deleteClient = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('UPDATE Clients SET status = false WHERE idClient = $1', [id]);
    res.json(`Client ${id} deleted successfully!`);
};


// Get Contacts
const getContacts = async (req, res) =>{
    const response = await pool.query(`SELECT Contacts.idContact, Contacts.idClient, Contacts.contactName || ' ' ||
                                              Contacts.contactLastName as contactFullName, Contacts.contactName, Contacts.contactLastName, Contacts.job, Contacts.phoneNumber,
                                              Contacts.address, Clients.idClient, Clients.clientName
                                        FROM Contacts
                                        INNER JOIN Clients
                                        ON Contacts.idClient = Clients.IdClient
                                        WHERE Contacts.status != false
                                        ORDER BY Contacts.idContact ASC`);
    console.log(response.rows);
    res.status(200).json(response.rows);
};
// Get Contact By ID
const getContactsByID = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM Contacts WHERE idContact = $1', [id]);
    res.json(response.rows);
};
// Create Contact
const createContact = async (req, res) => {
    console.log(req.body)
    const {idclient, contactname, contactlastname, job, phonenumber, address, status} = req.body;

    const response = await pool.query('INSERT INTO Contacts(idClient, contactName, contactLastName, job, phoneNumber, address, status) VALUES($1, $2, $3, $4, $5, $6, $7)',
                    [idclient,
                    contactname,
                    contactlastname,
                    job,
                    phonenumber,
                    address,
                    status]);
                    console.log(response)
    res.json({
        message: 'Contact Created Successfully!',
        body: {
            contact: {idclient, contactname, contactlastname, job, phonenumber, address, status}
        }
    })
};
// Update Contact
const updateContact = async (req, res) => {
    const id = req.params.id;
    const { contactname, contactlastname, job, phonenumber, address} = req.body;
    const response = await pool.query('UPDATE Contacts SET contactName = $1, contactLastName = $2, job = $3, phoneNumber = $4, address = $5 WHERE idContact = $6', [
        contactname,
        contactlastname,
        job,
        phonenumber,
        address,
        id
    ]);
    res.json(`Contact ${id} updated successfully!`);
};
// Delete Contact
const deleteContact = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('UPDATE Contacts SET status = false WHERE idContact = $1', [id]);
    res.json(`Contact ${id} deleted successfully!`);
};


// Get Projects
const getProjects = async (req, res) =>{
    const response = await pool.query(`SELECT a.idProject,
                                              a.projectName,
                                              c.clientName,
                                              c.idClient,
                                              a.description,
                                              a.projectLocation,
                                              a.initDate,
                                              a.finishDate,
                                              a.supervisor,
                                              b.idContact
                                        FROM Projects a, Contacts b, Clients c
                                        WHERE a.idContact = b.idContact and b.idClient = c.idClient
                                        and a.status != false 
                                        ORDER BY a.idProject ASC`);
    console.log(response.rows);
    res.status(200).json(response.rows);
};
// Get Projects By ID
const getProjectsByID = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM Projects WHERE idProject = $1', [id]);
    res.json(response.rows);
};
// Create Project
const createProject = async (req, res) => {
    const {projectname, idcontact, description, projectlocation, initdate, finishdate, supervisor, status} = req.body;

    const response = await pool.query('INSERT INTO Projects(projectName, idContact, description, projectLocation, initDate, finishDate, supervisor, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', 
        [projectname,
        idcontact,
        description,
        projectlocation,
        initdate, 
        finishdate,
        supervisor,
        true]);
    res.json({
        message: 'Project Created Successfully!',
        body: {
            project: {projectname, idcontact, description, projectlocation, initdate, finishdate, supervisor, status}
        }
    })
};
// Update Project
const updateProject = async (req, res) => {
    const id = req.params.id;
    const {projectname, idcontact, description, projectlocation, initdate, finishdate, supervisor } = req.body;
    const response = await pool.query('UPDATE Projects SET projectName = $1, idContact = $2, description = $3, projectLocation = $4, initDate = $5, finishDate = $6, supervisor = $7 WHERE idProject = $8', [
        projectname,
        idcontact,
        description,
        projectlocation,
        initdate,
        finishdate,
        supervisor,
        id
    ]);
    res.json(`Project ${id} updated successfully!`);
};
// Delete Project
const deleteProject = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('UPDATE Projects SET status = false WHERE idProject = $1', [id]);
    res.json(`Project ${id} deleted successfully!`);
};


// GETS DIFERENTES

const getContactsByProject = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query(`SELECT * FROM Contacts
	                                    INNER JOIN Clients 
	                                    ON Contacts.idClient = Clients.IdClient
                                        WHERE Contacts.idClient = ${id} and Contacts.status != false`);
    console.log(response.rows);
    res.status(200).json(response.rows);
};


// Exportar Modulos
module.exports = {
    getClients, getClientsByID, createClient, updateClient, deleteClient,
    getContacts, getContactsByID, createContact, updateContact, deleteContact,
    getProjects, getProjectsByID, createProject, updateProject, deleteProject,
    getContactsByProject
}
