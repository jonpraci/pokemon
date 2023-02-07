import { useContext, useEffect } from 'react'
import { PockContext } from '../Context/PockemonContext';
import { useParams } from 'react-router';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
const PokemonDetails = () => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const { singlepoke, loading, image, fetchSinglePost } = useContext(PockContext);
    const { name } = useParams();
    useEffect(() => {
        fetchSinglePost(name);
    }, [])

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const noData = loading ? <CircularProgress disableShrink /> : null;

    const stats = singlepoke.stats && singlepoke.stats.map((ele, index) => {
        return <span className='block' key={index}> {ele.stat.name || 'default'}: <b>{ele.base_stat || 'default'}</b> </span>
    });

    const movies = singlepoke.moves && singlepoke.moves.map((ele, index) => {
        return <span className='block' key={index}> {ele.move.name || 'default'}: <b> {ele.version_group_details[0].version_group.name || 'default'}</b> </span>
    });

    const Abilities = singlepoke.abilities && singlepoke.abilities.map((ele, index) => {
        return <span className='block' key={index}> {ele.ability.name || 'default'}: <b>{ele.slot || 'default'}</b></span>
    });
    return (
        <div className='pair_details'>
            <Button onClick={() => navigate(-1)}>
                Back
            </Button>
            <div className="app-container">
                <div className="card_single_container">
                    <div className="card card_single" >
                        <div className="img_single">
                            <img src={image} alt={singlepoke.name} className="card-img-top" />
                            <p className="card-title">{singlepoke.name}</p>
                        </div>
                        <Box sx={{ width: '100%' }} align='left' >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs className="tabs" value={value} onChange={handleChange}>
                                    <Tab label="Stats" {...a11yProps(0)} />
                                    <Tab label="Moves" {...a11yProps(1)} />
                                    <Tab label="Abilities" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                {stats || noData}
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                {movies || noData}
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                {Abilities || noData}
                            </TabPanel>
                        </Box>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetails;