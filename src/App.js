
import axios from 'axios';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function App() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")

  const getData = async() => {
    try {
      const data = await axios.get("https://jsonplaceholder.typicode.com/users")
      console.log(data.data)
      setData(data.data)

    }
    catch(e) {
      console.log(e);
    }
  }
  useEffect (() => {
    getData();
  },[])

  return (
    <div className="App">
      <h1>fetching data</h1>
      <input
      type="text"
      placeholder='Search here'
      onChange={e => {
        setSearch(e.target.value)
      }}
      />
  
      <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>id</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Website</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
           {  data.filter((item) => {
              if(search == "") {
                return item
              }
              else if( item.name.toLowerCase().includes(search.toLocaleLowerCase())) {
              return item
              }
             
            })
              .map((item) => {
          return (
          <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                {item.id}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {item.name}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
              {item.website}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
            {item.email}
          </StyledTableCell>
          </StyledTableRow>
          );
      }) }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default App;
