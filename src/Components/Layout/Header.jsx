import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useContext } from 'react';
import { PockContext } from '../../Context/PockemonContext';


export default function TheHeader() {
  const { fliterfun, clonepokemon ,searchfun } = useContext(PockContext);

  return (
    <div className="header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ background: 'rgb(200 84 48)' , justifyContent:'space-between'}}>
            <Toolbar  style={{cursor:'pointer',margin:'0',padding:'0'}}>
            <IconButton
            style={{margin:'0'}}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <AcUnitIcon />
            </IconButton>
            <Typography
              
              variant="h6"
              noWrap
              component="div"
              align='left'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              POCKEMON
          </Typography>
          </Toolbar>
            <select className="select_box" onChange={({ target }) => fliterfun(target.value)}>
              <option value="All Pokemons">
                All Pokemons
              </option>
              {
                clonepokemon.map((ele, i) => {
                  return <option key={i} value={ele.name}>{ele.name}</option>
                })
              }

            </select>

              <input className="input_search" placeholder="Search Pokemon" type="text" onChange={({target}) => searchfun(target.value)}/>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}