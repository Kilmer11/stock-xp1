import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import "../../App.css";
import ReadOnlyRow from "../components/RowDefault/ReadOnlyRow";
import EditableRow from "../components/RowEdit";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArchiveIcon from '@mui/icons-material/Archive';
import Button from '@mui/material/Button';
import Resume from "../components/Resume";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

const CadastroPage = () => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let totalContacts = JSON.parse(localStorage.getItem('totalContacts')) || [];

  const [entrada, setEntrada] = useState(0);
  const [saida, setSaida] = useState(0);

  useEffect(() => {
    const quantSaida = totalContacts
      .filter((item) => item.tipo === ("Saída"))
      .map((contacts) => Number(contacts.quant));

    const quantEntrada = totalContacts
      .filter((item) => item.tipo === ("Entrada"))
      .map((contacts) => Number(contacts.quant));

    const saida = quantSaida.reduce((acc, cur) => acc + cur, 0);
    const entrada = quantEntrada.reduce((acc, cur) => acc + cur, 0);

    setEntrada(`Quantidade: ${entrada}`);
    setSaida(`Quantidade: ${saida}`);
    
  }, [totalContacts]);

  const [contacts, setContacts] = useState(totalContacts);
  const [addFormData, setAddFormData] = useState({
    nome: "",
    marca: "",
    subctg: "",
    medida: "Litro (L)",
    quant: "",
    tipo: "Entrada",
  });

  const [editFormData, setEditFormData] = useState({
    nome: "",
    marca: "",
    subctg: "",
    medida: "",
    quant: "",
    tipo: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const nome = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[nome] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const nome = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[nome] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      nome: addFormData.nome,
      marca: addFormData.marca,
      subctg: addFormData.subctg,
      medida: addFormData.medida,
      quant: addFormData.quant,
      tipo: addFormData.tipo,
    };

    totalContacts.push(newContact);
    localStorage.setItem("totalContacts", JSON.stringify(totalContacts));

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      nome: editFormData.nome,
      marca: editFormData.marca,
      subctg: editFormData.subctg,
      medida: editFormData.medida,
      quant: editFormData.quant,
      tipo: editFormData.tipo,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    totalContacts.push(newContacts);
    localStorage.setItem("totalContacts", JSON.stringify(newContacts));
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      nome: contact.nome,
      marca: contact.marca,
      subctg: contact.subctg,
      medida: contact.medida,
      quant: contact.quant,
      tipo: contact.tipo,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newArray = contacts.filter((totalContacts) => totalContacts.id !== contactId);
    setContacts(newArray);
    localStorage.setItem("totalContacts", JSON.stringify(newArray));
  };

  const [open, setOpen] = React.useState(false);

  return (
    <div className="grid">
      <div className="container">
        <form onSubmit={handleEditFormSubmit}>
          <h2>Itens cadastrados</h2>
          <Table>
            <TableHead>
              <TableRow>
                <th>Nome:</th>
                <th>Marca:</th>
                <th>SubCategoria:</th>
                <th>Medida:</th>
                <th>Quantidade:</th>
                <th>Tipo:</th>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <Fragment>
                  {editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </form>

        <Button variant="contained" onClick={() => setOpen(true)}> Cadastrar Iten</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box>
        <div className="form">
        <Button className="cancel-button" color="error" variant="contained" onClick={() => setOpen(false)}><CloseIcon/></Button>
          <form onSubmit={handleAddFormSubmit}>
            <div className="col-a">
              <div className="input-box">
                <label for="name">Nome:</label>
                <input
                  type="text"
                  name="nome"
                  required="required"
                  placeholder="Nome"
                  onChange={handleAddFormChange}
                />
              </div>
              <div className="input-box">
              <label for="marca">Marca:</label>
                <input
                  type="text"
                  name="marca"
                  required="required"
                  placeholder="Marca"
                  onChange={handleAddFormChange}
                />
              </div>
              <div className="input-box">
              <label for="subctg">Subcategoria:</label>
                <input
                  type="text"
                  name="subctg"
                  required="required"
                  placeholder="Subcategoria"
                  onChange={handleAddFormChange}
                />
              </div>
            </div>
            <div className="col-b">
              <div className="input-box">
              <label for="medida">Medida:</label>
                <select
                  name="medida"
                  onChange={handleAddFormChange}>
                  <option>Litro (L)</option>
                  <option>Mililitro (mL)</option>
                  <option>Grama (g)</option>
                  <option>Quilograma (kg)</option>
                </select>
              </div>
              <div className="input-box">
              <label for="quant">Quantidade:</label>
                <input
                  type="number"
                  name="quant"
                  required="required"
                  placeholder="Quantidade"
                  onChange={handleAddFormChange}
                />
              </div>
              <div className="input-box">
              <label for="tipo">Tipo:</label>
                <select
                  name="tipo"
                  onChange={handleAddFormChange}>
                  <option>Entrada</option>
                  <option>Saída</option>
                </select>
              </div>

              <Button className="button-cadastrar" variant="contained" color="primary" type="submit">Cadastrar<ArchiveIcon /></Button>
            </div>
          </form>
        </div>
        </Box>
        </Modal>
        <div className="head">
          <header className="form-header">
            <h2 className="form-title">Cadastro de Itens</h2>
          </header>
          <Resume saida={saida} entrada={entrada} />
          </div>
      </div>
    </div>
  );
};

export default CadastroPage;
