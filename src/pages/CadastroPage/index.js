import React, { useState, useEffect } from "react";
import Axios from "axios";
import Item from "../components/cardItem/Item";
import "../../App.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArchiveIcon from '@mui/icons-material/Archive';
import Button from '@mui/material/Button';
import Resume from "../components/Resume";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';


const CadastroPage = () => {

  const [values, setValues] = useState();
  const [listItens, setListItens] = useState();

  const handleChangeValues = (event) => {
    setValues((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  }

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/cadastro/register", {
      nome: values.nome,
      marca: values.marca,
      subcategoria: values.subcategoria,
      medida: values.medida,
      quantidade: values.quantidade,
      tipo: values.tipo,
    }).then(() => {
      setListItens([
        ...listItens,
        {
          nome: values.nome,
          marca: values.marca,
          subcategoria: values.subcategoria,
          medida: values.medida,
          quantidade: values.quantidade,
          tipo: values.tipo,
        },
      ])
      setOpen(false);
      document.location.reload()
    })
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/cadastro/getCards").then((response) => {
      setListItens(response.data)
    })
  }, [])


  // eslint-disable-next-line react-hooks/exhaustive-deps
  let totalContacts = JSON.parse(localStorage.getItem('estoquedeitens')) || [];

  const [entrada, setEntrada] = useState();
  const [saida, setSaida] = useState();

  useEffect(() => {
    const quantidadeSaida = totalContacts
      .filter((item) => item.tipo.value === ("Saída"))
      .map((setValues) => Number(setValues.quantidade));

      const quantidadeEntrada = totalContacts
      .filter((item) => item.tipo.value === ("Entrada"))
      .map((setValues) => Number(setValues.quantidade));

    const saida = quantidadeSaida.reduce((acc, cur) => acc + cur, 0);
    const entrada = quantidadeEntrada.reduce((acc, cur) => acc + cur, 0);

    setEntrada(`Quantidade: ${entrada}`);
    setSaida(`Quantidade: ${saida}`);

  }, [totalContacts]);

  const handleAddFormChange = (event) => {
    event.preventDefault();
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
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
                <th>Editar/Excluir</th>
              </TableRow>
            </TableHead>
            <TableBody>

            { typeof listItens !== "undefined" && listItens.map((value) => {
              return <Item 
                key={value.id}
                listCard={listItens}
                setListCard={setListItens}
                id={value.id}
                nome={value.nome}
                marca={value.marca}
                subcategoria={value.subcategoria}
                medida={value.medida}
                quantidade={value.quantidade}
                tipo={value.tipo}/>
            })}
            </TableBody>
          </Table>
        </form>

        <Button variant="contained" onClick={() => setOpen(true)}> Cadastrar Item</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="form">
            <Button className="cancel-button" color="error" variant="contained" onClick={() => setOpen(false)}><CloseIcon /></Button>
            <form onSubmit={handleAddFormSubmit}>
              <Typography textAlign="center" id="modal-modal-title" variant="h6">
                Cadastrar Item
              </Typography>

              <Typography textAlign="center" gutterBottom>
                Preencha todos os campos para prosseguir.
              </Typography>

              <Box
                sx={{
                  width: '100%',
                  marginTop:'20px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 1,
                  gridTemplateRows: 'auto',
                }}>
                
                <div className="input-box">
                  <label for="name">Nome:</label>
                  <input
                    type="text"
                    name="nome"
                    required="required"
                    placeholder="Nome"
                    onChange={(event) => {handleAddFormChange(event); handleChangeValues(event)}}
                  />
                </div>
                <div className="input-box">
                  <label for="marca">Marca:</label>
                  <input
                    type="text"
                    name="marca"
                    required="required"
                    placeholder="Marca (Mín:3)"
                    onChange={(event) => {handleAddFormChange(event); handleChangeValues(event)}}
                  />
                </div>
                <div className="input-box">
                  <label for="subctg">Subcategoria:</label>
                  <input
                    type="text"
                    name="subcategoria"
                    required="required"
                    placeholder="Subcategoria (Mín:3)"
                    onChange={(event) => {handleAddFormChange(event); handleChangeValues(event)}}
                  />
                </div>
                <div className="input-box">
                  <label for="medida">Medida:</label>
                  <select
                    name="medida"
                    onChange={(event) => {handleAddFormChange(event); handleChangeValues(event)}}>
                    <option value="" ></option>
                    <option value="Mililitro" key="">Mililitro(mL)</option>
                    <option value="Litro" key="">Litro(L)</option>
                    <option value="Grama" key="">Grama(g)</option>
                    <option value="Quilograma" key="">Quilograma(kg)</option>

                  </select>
                </div>
                <div className="input-box">
                  <label for="quant">Quantidade:</label>
                  <input
                    type="number"
                    name="quantidade"
                    required="required"
                    placeholder="Quantidade"
                    onChange={(event) => {handleAddFormChange(event); handleChangeValues(event)}}
                  />
                </div>
                <div className="input-box">
                  <label for="tipo">Tipo:</label>
                  <select
                    name="tipo"
                    onChange={(event) => {handleAddFormChange(event); handleChangeValues(event)}}>
                    <option value="" ></option>
                    <option value="Entrada">Entrada</option>
                    <option value="Saída">Saída</option>
                  </select>
                </div>
              </Box>
              <div className="buttons-form">
                <Button className="button-form" variant="outlined" onClick={() => setOpen(false)}>Cancelar<CancelIcon /></Button>
                <Button className="button-form" variant="contained" color="primary" type="submit" onClick={handleClickButton}>Cadastrar<ArchiveIcon /></Button>
              </div>
            </form>
          </div>
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
