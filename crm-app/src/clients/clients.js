import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Form,
  Modal,
  Input,
  Select,
  Checkbox,
  notification,
  Popconfirm,
  Row,
  Col,
} from "antd";
import {
  PlusCircleTwoTone,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import "antd/dist/antd.css";
//import './App.css';
import exportServices from "./services/clientServices";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const { Item } = Form;
const defaultClient = {
  idClient: 0,
  clientname: "",
  clienttype: "",
  email: "",
  phonenumber: "",
  iscompany: false,
  status: true,
};

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

function Clients() {
  const { Option } = Select; // OPCIONES DEL SELECT
  const [data, setData] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [client, setClient] = useState(defaultClient);
  const [name, setName] = useState("")

  const OpenCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  };

  const OpenCloseModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  };

  const handleInsert = (e) => {
    const { name, value } = e.target;

    if (name === "iscompany") {
      setClient({ ...client, [e.target.name]: !client.iscompany });
      console.log(client);
    } else {
      setClient({ ...client, [name]: value });
      console.log(client);
    }
  };

  const selectClient = (client, caso) => {
    setClient(client);
    caso === "Edit" && OpenCloseModalUpdate();
  };

  const getClient = () => {
    exportServices
      .getClients()
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createClient = () => {
    delete client.idClient;
    exportServices
      .createClient(client)
      .then((response) => {
        OpenCloseModalInsert();
        getClient();
        setClient(defaultClient);
        console.log(client);
        notification.open({
          message: "Client created successfully!",
        });
      })
      .catch((err) => console.log(err));
  };

  const updateClient = () => {
    delete client.status;
    delete client.iscompany;
    exportServices
      .updateClient(client)
      .then((response) => {
        OpenCloseModalUpdate();
        notification.open({
          message: "Client updated successfully!",
        });
        getClient();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteClient = (fila) => {
    exportServices
      .deleteClient(fila)
      .then((resp) => {
        notification.open({
          message: "Client deleted successfully!",
        });
        getClient();
      })
      .catch((error) => console.log(error));
  };

  const filterClients = (data) => {
    const clients = data;
    const searchedClients = clients.filter(itm => itm.clientname.toLowerCase().includes(name.toLowerCase()))

    return searchedClients
  }

  const colums = [
    {
      align: "center",
      title: "Client ID",
      dataIndex: "idclient",
      key: "idclient",
    },
    {
      align: "center",
      title: "Client name",
      dataIndex: "clientname",
      key: "clientname",
    },
    {
      align: "center",
      title: "Client type",
      dataIndex: "clienttype",
      key: "clienttype",
    },
    { align: "center", title: "Email", dataIndex: "email", key: "email" },
    {
      align: "center",
      title: "Phone number",
      dataIndex: "phonenumber",
      key: "phonenumber",
    },
    {
      align: "center",
      title: "Actions",
      key: "acciones",
      render: (fila) => (
        <>
          <Button
            type="primary"
            onClick={() => selectClient(fila, "Edit")}
            style={{ width: "100px" }}
          >
            <EditTwoTone twoToneColor="white" />
            Edit
          </Button>
          {"   "}
          <Popconfirm
            title="Are you sure to delete this client?"
            onConfirm={(_) => deleteClient(fila)}
            onCancel={null}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" style={{ width: "100px" }} danger>
              <DeleteTwoTone twoToneColor="white" />
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    getClient();
  }, []);

  return (
    <div className="App divStyle">
      <br />
      <br />
      <div>
        <Form>
          <Row gutter={24}>
            <Col span={19}>
              <Item label='Filter by client name:' className="alignFilter">
                <Input onChange={e => setName(e.target.value)}></Input>
              </Item>
            </Col>
            <Col span={2}>
              <Item>
                <Button
                  type="primary"
                  className="insertButton "
                  onClick={OpenCloseModalInsert}
                >
                  <PlusCircleTwoTone />
                  New Client
                </Button>
              </Item>
            </Col>
          </Row>
        </Form>
      </div>

      <br />
      <Table
        columns={colums}
        dataSource={filterClients(data)}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
        scroll={true}
      />
      <Modal
        visible={modalInsert}
        title="New Client"
        destroyOnClose={true}
        onCancel={OpenCloseModalInsert}
        centered
        footer={[]}
      >
        <Form {...layout} onFinish={createClient}>
          <Item
            label="Client name"
            name="clientname"
            rules={[{ required: true, message: "Name field is required!" }]}
          >
            <Input name="clientname" onChange={handleInsert} />
          </Item>

          <Item
            label="Client type"
            name="clienttype"
            rules={[
              { required: true, message: "Client type field is required!" },
            ]}
          >
            <Select
              name="clienttype"
              onChange={(value) =>
                handleInsert({ target: { name: "clienttype", value } })
              }
              placeholder="- Select client type -"
            >
              <Option value="Client">Client</Option>
              <Option value="Highly interested prospect">
                Highly interested prospect
              </Option>
              <Option value="Moderately interested prospect">
                Moderately interested prospect
              </Option>
              <Option value="Lowly interested prospect">
                Lowly interested prospect
              </Option>
            </Select>
          </Item>

          <Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email field is required!" }]}
          >
            <Input name="email" onChange={handleInsert} />
          </Item>

          <Item
            label="Phone number"
            name="phonenumber"
            rules={[
              { required: true, message: "Phone number field is required!" },
              { max: 8, message: "The maximum number of characters is 8" },
            ]}
          >
            <Input type="number" name="phonenumber" onChange={handleInsert} />
          </Item>

          <Item label="is Company" name="iscompany">
            <Checkbox name="iscompany" onChange={handleInsert} />
          </Item>

          <div>
            <Button type="primary" htmlType="submit" className="createAlign">
              Create
            </Button>
            <Button
              onClick={() => {
                OpenCloseModalInsert();
                setClient(defaultClient);
              }}
              className="cancelAlign"
            >
              Cancel
            </Button>
          </div>
          <br />
        </Form>
      </Modal>

      <Modal
        visible={modalUpdate}
        title="Update Client"
        destroyOnClose={true}
        onCancel={OpenCloseModalUpdate}
        centered
        footer={[]}
      >
        <Form {...layout}>
          <Item
            label="Client name"
            name="clientname"
            rules={[{ required: true, message: "Name field is required!" }]}
          >
            <Input
              name="clientname"
              onChange={handleInsert}
              defaultValue={client && client.clientname}
            />
          </Item>

          <Item
            label="Client type"
            name="clienttype"
            rules={[
              { required: true, message: "Client type field is required!" },
            ]}
          >
            <Select
              name="clienttype"
              onChange={(value) =>
                handleInsert({ target: { name: "clienttype", value } })
              }
              defaultValue={client && client.clienttype}
              placeholder="- Select client type -"
            >
              <Option value="Client">Client</Option>
              <Option value="Highly interested prospect">
                Highly interested prospect
              </Option>
              <Option value="Moderately interested prospect">
                Moderately interested prospect
              </Option>
              <Option value="Lowly interested prospect">
                Lowly interested prospect
              </Option>
            </Select>
          </Item>

          <Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email field is required!" }]}
          >
            <Input
              name="email"
              onChange={handleInsert}
              defaultValue={client && client.email}
            />
          </Item>

          <Item
            label="Phone number"
            name="phonenumber"
            rules={[
              { required: true, message: "Phone number field is required!" },
              { max: 8, message: "The maximum number of characters is 8" },
            ]}
          >
            <Input
              type="number"
              name="phonenumber"
              onChange={handleInsert}
              defaultValue={client && client.phonenumber}
            />
          </Item>

          <div>
            <Button
              type="primary"
              onClick={updateClient}
              className="createAlign"
            >
              Update
            </Button>
            <Button
              onClick={() => {
                OpenCloseModalUpdate();
                setClient(defaultClient);
              }}
              className="cancelAlign"
            >
              Cancel
            </Button>
          </div>
          <br />
        </Form>
      </Modal>
    </div>
  );
}

export default Clients;
