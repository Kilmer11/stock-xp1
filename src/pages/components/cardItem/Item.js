import React from 'react';
import FormDialog from "../dialog/dialog";
import TableRow from '@mui/material/TableRow';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { red, green } from '@mui/material/colors';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from 'axios';


const Item = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickCard = () => {
    setOpen(true);
  }

  const handleDeleteItem = () => {
    Axios.delete(`http://localhost:3001/cadastro/delete/${props.id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id !== props.id;
        })
      ); 
    }); 
  };

  return (
    <>
    <FormDialog open={open} setOpen={setOpen}
      id={props.id} 
      nome={props.nome}
      marca={props.marca}
      subcategoria={props.subcategoria}
      medida={props.medida}
      quantidade={props.quantidade}
      tipo={props.tipo}
      listCard={props.listCard}
      setListCard={props.setListCard}
    />
    <TableRow className="tr-default">
      <td>{props.nome}</td>
      <td>{props.marca}</td>
      <td>{props.subcategoria}</td>
      <td>{props.medida}</td>
      <td>{props.quantidade}</td>
      <td alignCenter>
        {props.tipo === "Saída" ? (
          <ArrowCircleUpIcon sx={{ color: red[500] }} />
        ) : (
          <ArrowCircleDownIcon sx={{ color: green[500] }} />
        )}
      </td>
        <td>
          <IconButton onClick={() => handleClickCard()} type="submit"><CreateIcon/></IconButton>
          <IconButton id={props.id} onClick={handleDeleteItem}><DeleteIcon/></IconButton>
        </td>      
    </TableRow>
    </>

  )
}

export default Item;