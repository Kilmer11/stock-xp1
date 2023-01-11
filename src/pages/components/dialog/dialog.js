import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Axios from "axios";
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import ArchiveIcon from '@mui/icons-material/Archive';
import "./dialog.css";


export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [editValues, setEditValues] = useState({
        id: props.id,
        nome: props.nome,
        marca: props.marca,
        subcategoria: props.subcategoria,
        medida: props.medida,
        quantidade: props.quantidade,
        tipo: props.tipo,
  });

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditItem = () => {
    Axios.put("http://localhost:3001/cadastro/edit", {
        id: editValues.id,
        nome: editValues.nome,
        marca: editValues.marca,
        subcategoria: editValues.subcategoria,
        medida: editValues.medida,
        quantidade: editValues.quantidade,
        tipo: editValues.tipo,
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.id === editValues.id
          ? {
            id: editValues.id,
            nome: editValues.nome,
            marca: editValues.marca,
            subcategoria: editValues.subcategoria,
            medida: editValues.medida,
            quantidade: editValues.quantidade,
            tipo: editValues.tipo,
          }
          :value;
        })
      )
      props.setOpen(false);
    });
  };

  const handleChangeValues = (value) => {
    setEditValues((prevValues) => ({
        ...prevValues,
        [value.target.id]: value.target.value,
    }))
  }

  return (
      <Dialog open={props.open} onClose={handleClose}>
        <Typography textAlign="center" variant='h5' paddingTop='25px' margin='0px' gutterBottom>
              Editar Itens
          </Typography>
          
          <Typography textAlign="center" fontSize='16px' gutterBottom>
              Edite um ou mais campos para prosseguir
          </Typography>
        
        <DialogContent>
            <Box
                sx={{
                width: '100%',
                margin:'0',
                padding:'0',
                marginTop:'0px',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
                gridTemplateRows: 'auto',
                marginRight: '20px',
              }}
              >
                <div className="input-box">
                  <label for="name">Nome:</label>
                  <input
                    type="text"
                    id="nome"
                    defaultValue={props.nome}
                    onChange={handleChangeValues}
                    required="required"
                    placeholder="Nome"
                  />
                </div>
                <div className="input-box">
                  <label for="marca">Marca:</label>
                  <input
                    type="text"
                    id="marca"
                    defaultValue={props.marca}
                    onChange={handleChangeValues}
                    required="required"
                    placeholder="Marca (Mín:3)"
                    />
                </div>
                <div className="input-box">
                  <label for="subctg">Subcategoria:</label>
                  <input
                    type="text"
                    id="subcategoria"
                    defaultValue={props.subcategoria}
                    onChange={handleChangeValues}
                    required="required"
                    placeholder="Subcategoria (Mín:3)"
                    />
                </div>
                <div className="input-box">
                  <label for="medida">Medida:</label>
                  <select
                    id="medida"
                    defaultValue={props.medida}
                    onChange={handleChangeValues}>
                    <option value="Litro(L)">Litro (L)</option>
                    <option value="Mililitro(mL)">Mililitro (mL)</option>
                    <option value="Grama(g)">Grama (g)</option>
                    <option value="Quilograma(kg)">Quilograma (kg)</option>
                  </select>
                </div>
                <div className="input-box">
                  <label for="quant">Quantidade:</label>
                  <input
                    type="number"
                    id="quantidade"
                    defaultValue={props.quantidade}
                    onChange={handleChangeValues}
                    required="required"
                    placeholder="Quantidade"
                    />
                </div>
                <div className="input-box">
                  <label for="tipo">Tipo:</label>
                  <select
                    id="tipo"
                    defaultValue={props.tipo}
                    onChange={handleChangeValues}>
                    <option value="Entrada">Entrada</option>
                    <option value="Saída">Saída</option>
                  </select>
                </div>
              </Box>

        </DialogContent>
        <DialogActions>
            <div className="buttons-form-edit">
                <Button className="button-form" variant="outlined" onClick={handleClose}>Cancelar<CancelIcon /></Button>
                <Button className="button-form" variant="contained" color="primary" onClick={handleEditItem}>Salvar<ArchiveIcon /></Button>
            </div>
        </DialogActions>
      </Dialog>
  );
}
