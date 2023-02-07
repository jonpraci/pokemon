import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useContext } from 'react';
import { PockContext } from '../../Context/PockemonContext';


export default function TheHeader() {
  const { fliterfun, clonepokemon } = useContext(PockContext);

  return (
    <div className="header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ background: 'rgb(200 84 48)' }}>
            <IconButton
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
            
            <select className="select_box" onChange={({ target }) => fliterfun(target.value)}>
              {
                clonepokemon.map((ele, i) => {
                  return <option key={i} value={ele.name}>{ele.name}</option>
                })
              }

            </select>




          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}