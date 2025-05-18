import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Paper,
  Box,
  Chip
} from '@mui/material';
import axios from 'axios';

function App() {
  const [champions, setChampions] = useState([]);
  const [selectedChampions, setSelectedChampions] = useState([]);
  const [synergies, setSynergies] = useState([]);
  const [recommendedItems, setRecommendedItems] = useState([]);

  useEffect(() => {
    fetchChampions();
  }, []);

  const fetchChampions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/champions');
      setChampions(response.data);
    } catch (error) {
      console.error('Error fetching champions:', error);
    }
  };

  const handleChampionSelect = (champion) => {
    setSelectedChampions(prev => {
      const newSelection = [...prev];
      const index = newSelection.indexOf(champion);
      if (index === -1) {
        newSelection.push(champion);
      } else {
        newSelection.splice(index, 1);
      }
      return newSelection;
    });
  };

  const calculateSynergies = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/synergies', {
        champions: selectedChampions
      });
      setSynergies(response.data.synergies);
      setRecommendedItems(response.data.recommended_items);
    } catch (error) {
      console.error('Error calculating synergies:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        TFT Assistant
      </Typography>
      
      <Grid container spacing={3}>
        {/* Champions Grid */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Champions
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(champions).map(([name, data]) => (
                <Grid item xs={6} sm={4} key={name}>
                  <Card 
                    onClick={() => handleChampionSelect(name)}
                    sx={{ 
                      cursor: 'pointer',
                      opacity: selectedChampions.includes(name) ? 1 : 0.7
                    }}
                  >
                    <CardContent>
                      <img 
                        src={data.img_url} 
                        alt={name} 
                        style={{ width: '100%', height: 150, objectFit: 'cover' }}
                      />
                      <Typography variant="h6">{name}</Typography>
                      <Typography variant="body2">{data.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Synergies and Items */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Selected Team
            </Typography>
            <Button 
              variant="contained" 
              onClick={calculateSynergies}
              sx={{ mb: 2 }}
            >
              Calculate Synergies
            </Button>
            <Typography variant="h6" gutterBottom>
              Synergies:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {synergies.map((synergy, index) => (
                <Chip key={index} label={synergy} />
              ))}
            </Box>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Recommended Items:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {recommendedItems.map((item, index) => (
                <Chip key={index} label={item} />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
