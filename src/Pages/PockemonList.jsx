import { useContext } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { PockContext } from "../Context/PockemonContext";
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const PokemonList = () => {
    const { currentPosts ,loading} = useContext(PockContext);
    const loopData = currentPosts && currentPosts.map((pokemon , index) =>  
                <Grid item xs={12} md={4} sm={6} lg={3} key={index}>
                    <Link to={`/pokemon/${pokemon.name}`}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                            style={{width:'140px' , height:'150px',margin:'auto'}}
                                component="img"
                                image={`${pokemon.sprites["front_default"]}`}
                                alt={pokemon.name} 
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {pokemon.name}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="p">
                                Type: {pokemon.types[0].type.name}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="p">
                                weight: {pokemon.weight}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </Link>
                </Grid>
            );
    return (
        <>
            <div className="container pokemon_list">
                <div className="row">
                    <div>
                        <Grid container spacing={2}>
                            {loading ? <div className="pair_load"> <CircularProgress disableShrink /> </div>: loopData}
                        </Grid>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PokemonList