import { useState } from 'react';
import { Select } from '@mui/material';
import axios from 'axios';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,

  TextField,
  Typography,
} from '@mui/material';

import './App.css';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [loading, setLoading] = useState(false);
  const [GeneratedEmail, setGeneratedEmail] = useState('');

  const handleSubmit = async () => {
    // Add your API call here later
    setLoading(true);
    try{
      const response = await axios.post('http://localhost:8080/api/email/generate',
        {
          emailContent,
          tone,});
        
      setGeneratedEmail(typeof response.data==='string'? response.data:JSON.stringify(response.data));
    } catch (error) {
      console.error('Error generating email:', error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Email Writer
      </Typography>

      <Box sx={{ mx: 3 }}>
        <TextField
          label="Email Content"
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="tone-select-label">
            Tone (optional)
          </InputLabel>

          <Select
            labelId="tone-select-label"
            value={tone}
            label="Tone (optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
            <MenuItem value="Friendly">Friendly</MenuItem>
            <MenuItem value="Casual">Casual</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          disabled={!emailContent || loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            'Generate Email'
          )}
        </Button>
      </Box>

      <Box sx={{ mx: 3, mt: 4 }}>
        <TextField
          label="Generated Email"
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          value={GeneratedEmail}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          disabled={!GeneratedEmail}
          onClick={() =>
            navigator.clipboard.writeText(GeneratedEmail)
          }
        >
          Copy to Clipboard
        </Button>
      </Box>
    </Container>
  );
}

export default App;