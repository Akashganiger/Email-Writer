import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import './App.css';

// SVG Icons
function MailMindLogoIcon(props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      <path d="M12 11h.01" />
    </svg>
  );
}

function ReplyIcon(props) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
}

function SummarizeIcon(props) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

function SparklesIcon(props) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

function ChecklistIcon(props) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

function InsightsIcon(props) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m3 3 3 9 4-4 5 7 6-12" />
      <circle cx="18" cy="6" r="3" />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CopyIcon(props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function ArrowBackIcon(props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="19" x2="5" y1="12" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function SunIcon(props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function App() {
  // Theme state persisted in localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('mailmind_theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('mailmind_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Material UI Theme Creation
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
          primary: {
            main: isDarkMode ? '#818cf8' : '#4f46e5',
            light: '#a5b4fc',
            dark: '#3730a3',
          },
          secondary: {
            main: '#06b6d4',
          },
          background: {
            default: isDarkMode ? '#090d16' : '#f8fafc',
            paper: isDarkMode ? '#111827' : '#ffffff',
          },
          text: {
            primary: isDarkMode ? '#f8fafc' : '#0f172a',
            secondary: isDarkMode ? '#94a3b8' : '#64748b',
          },
        },
        typography: {
          fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
          h1: { fontWeight: 800 },
          h2: { fontWeight: 800 },
          h3: { fontWeight: 700 },
          h4: { fontWeight: 700 },
          h6: { fontWeight: 600 },
          button: { textTransform: 'none', fontWeight: 600 },
        },
        shape: {
          borderRadius: 12,
        },
      }),
    [isDarkMode]
  );

  // Navigation View: 'home' | 'assistant'
  const [currentView, setCurrentView] = useState('home');

  // Workspace States
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('Professional');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [summary, setSummary] = useState('');
  const [smartReplies, setSmartReplies] = useState([]);
  const [actionItems, setActionItems] = useState([]);
  const [checkedActions, setCheckedActions] = useState({});
  const [analysis, setAnalysis] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);
  const [error, setError] = useState('');
  const [copiedMessage, setCopiedMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Navigation Scroll Helpers
  const scrollToSection = (id) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const elem = document.getElementById(id);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Validation
  const validateInput = () => {
    if (!emailContent || !emailContent.trim()) {
      setError('Please enter an email first.');
      return false;
    }
    setError('');
    return true;
  };

  const showCopyFeedback = (msg = 'Copied!') => {
    setCopiedMessage(msg);
    setSnackbarOpen(true);
  };

  const handleClear = () => {
    setEmailContent('');
    setTone('Professional');
    setGeneratedEmail('');
    setSummary('');
    setSmartReplies([]);
    setActionItems([]);
    setCheckedActions({});
    setAnalysis(null);
    setError('');
  };

  // 1. Generate Reply API Call
  const handleGenerateReply = async () => {
    if (!validateInput()) return;
    setLoadingAction('generate');
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone,
      });
      const reply =
        typeof response.data === 'string'
          ? response.data
          : response.data?.reply || JSON.stringify(response.data);
      setGeneratedEmail(reply);
    } catch (err) {
      console.error('Error generating reply:', err);
      setError('Unable to process the email. Please try again.');
    } finally {
      setLoadingAction(null);
    }
  };

  // 2. Summarize Email API Call
  const handleSummarize = async () => {
    if (!validateInput()) return;
    setLoadingAction('summarize');
    try {
      const response = await axios.post('http://localhost:8080/api/email/summarize', {
        emailContent,
      });
      const summaryText =
        typeof response.data === 'string'
          ? response.data
          : response.data?.summary || JSON.stringify(response.data);
      setSummary(summaryText);
    } catch (err) {
      console.error('Error summarizing email:', err);
      setError('Unable to process the email. Please try again.');
    } finally {
      setLoadingAction(null);
    }
  };

  // 3. Smart Replies API Call
  const handleSmartReplies = async () => {
    if (!validateInput()) return;
    setLoadingAction('smartReplies');
    try {
      const response = await axios.post('http://localhost:8080/api/email/smart-replies', {
        emailContent,
      });
      const suggestions = Array.isArray(response.data)
        ? response.data
        : response.data?.suggestions || [];
      setSmartReplies(suggestions);
    } catch (err) {
      console.error('Error fetching smart replies:', err);
      setError('Unable to process the email. Please try again.');
    } finally {
      setLoadingAction(null);
    }
  };

  // 4. Action Items API Call
  const handleActionItems = async () => {
    if (!validateInput()) return;
    setLoadingAction('actionItems');
    try {
      const response = await axios.post('http://localhost:8080/api/email/action-items', {
        emailContent,
      });
      const items = Array.isArray(response.data)
        ? response.data
        : response.data?.actionItems || [];
      setActionItems(items);
      setCheckedActions({});
    } catch (err) {
      console.error('Error extracting action items:', err);
      setError('Unable to process the email. Please try again.');
    } finally {
      setLoadingAction(null);
    }
  };

  // 5. Analyze Email API Call
  const handleAnalyze = async () => {
    if (!validateInput()) return;
    setLoadingAction('analyze');
    try {
      const response = await axios.post('http://localhost:8080/api/email/analyze', {
        emailContent,
      });
      setAnalysis(response.data);
    } catch (err) {
      console.error('Error analyzing email:', err);
      setError('Unable to process the email. Please try again.');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleToggleAction = (index) => {
    setCheckedActions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCopySmartReply = (suggestion) => {
    navigator.clipboard.writeText(suggestion);
    showCopyFeedback('Copied!');
  };

  const handleCopyGeneratedReply = () => {
    navigator.clipboard.writeText(generatedEmail);
    showCopyFeedback('Copied to clipboard!');
  };

  const getPriorityColor = (priority) => {
    if (!priority) return 'default';
    const upper = priority.toUpperCase();
    if (upper === 'HIGH') return 'error';
    if (upper === 'MEDIUM') return 'warning';
    if (upper === 'LOW') return 'success';
    return 'info';
  };

  const isInputEmpty = !emailContent.trim();
  const isAnyLoading = loadingAction !== null;
  const hasAnyResult = Boolean(
    generatedEmail ||
    summary ||
    (smartReplies && smartReplies.length > 0) ||
    (actionItems && actionItems.length > 0) ||
    analysis
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-root" sx={{ backgroundColor: 'background.default', color: 'text.primary' }}>
        {/* ==================================================
            STICKY NAVBAR
           ================================================== */}
        <AppBar
          position="static"
          elevation={0}
          className={isDarkMode ? 'navbar-sticky-dark' : 'navbar-sticky-light'}
          color="transparent"
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: { xs: 64, md: 72 } }}>
              {/* Brand Logo */}
              <Box
                onClick={scrollToTop}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 2.5,
                    background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.35)',
                  }}
                >
                  <MailMindLogoIcon />
                </Box>
                <Typography variant="h6" fontWeight="800" color="text.primary" sx={{ letterSpacing: '-0.5px' }}>
                  MailMind
                </Typography>
              </Box>

              {/* Navigation Items & Actions */}
              <Stack direction="row" spacing={{ xs: 1, sm: 2.5 }} alignItems="center">
                {currentView === 'home' && (
                  <>
                    <Button
                      color="inherit"
                      onClick={scrollToTop}
                      sx={{ fontWeight: 600, display: { xs: 'none', sm: 'inline-flex' } }}
                    >
                      Home
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => scrollToSection('features')}
                      sx={{ fontWeight: 600, display: { xs: 'none', sm: 'inline-flex' } }}
                    >
                      Features
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => scrollToSection('how-it-works')}
                      sx={{ fontWeight: 600, display: { xs: 'none', sm: 'inline-flex' } }}
                    >
                      How It Works
                    </Button>
                  </>
                )}

                {/* Light / Dark Mode Toggle */}
                <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                  <IconButton
                    onClick={toggleDarkMode}
                    color="inherit"
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: isDarkMode ? 'rgba(255,255,255,0.15)' : '#e2e8f0',
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    }}
                  >
                    {isDarkMode ? <SunIcon /> : <MoonIcon />}
                  </IconButton>
                </Tooltip>

                {/* Primary CTA / Back to Home */}
                {currentView === 'home' ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setCurrentView('assistant')}
                    sx={{
                      fontWeight: 700,
                      px: { xs: 2, sm: 2.5 },
                      py: 1,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
                      boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
                    }}
                  >
                    Try MailMind
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setCurrentView('home')}
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      fontWeight: 600,
                      borderRadius: 2,
                    }}
                  >
                    Back to Home
                  </Button>
                )}
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>

        {/* ==================================================
            LANDING PAGE VIEW
           ================================================== */}
        {currentView === 'home' && (
          <Box sx={{ flex: 1 }}>
            {/* Hero Section */}
            <Box className={isDarkMode ? 'hero-section-dark' : 'hero-section-light'}>
              <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center">
                  {/* Hero Left Content */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Chip
                      label="✨ Powered by MailMind AI"
                      size="small"
                      sx={{
                        mb: 2.5,
                        fontWeight: 700,
                        backgroundColor: isDarkMode ? 'rgba(129, 140, 248, 0.15)' : 'rgba(79, 70, 229, 0.08)',
                        color: isDarkMode ? '#a5b4fc' : '#4f46e5',
                        border: '1px solid',
                        borderColor: isDarkMode ? 'rgba(129, 140, 248, 0.3)' : 'rgba(79, 70, 229, 0.2)',
                      }}
                    />
                    <Typography
                      variant="h2"
                      component="h1"
                      sx={{
                        fontSize: { xs: '2.5rem', sm: '3.4rem', md: '3.8rem' },
                        lineHeight: 1.12,
                        letterSpacing: '-1.5px',
                        color: 'text.primary',
                        mb: 2.5,
                      }}
                    >
                      Write{' '}
                      <Box
                        component="span"
                        sx={{
                          background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          display: 'inline',
                        }}
                      >
                        Smarter.
                      </Box>{' '}
                      Respond{' '}
                      <Box
                        component="span"
                        sx={{
                          background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          display: 'inline',
                        }}
                      >
                        Faster.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: '1.05rem', sm: '1.2rem' },
                        color: 'text.secondary',
                        lineHeight: 1.65,
                        mb: 4,
                      }}
                    >
                      Your AI-powered email productivity assistant for writing replies, understanding messages,
                      extracting tasks, and making faster decisions.
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => setCurrentView('assistant')}
                        sx={{
                          fontWeight: 700,
                          px: 4,
                          py: 1.6,
                          borderRadius: 2.5,
                          fontSize: '1rem',
                          background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
                          boxShadow: '0 8px 24px rgba(79, 70, 229, 0.35)',
                        }}
                      >
                        Try MailMind
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => scrollToSection('features')}
                        sx={{
                          fontWeight: 600,
                          px: 3.5,
                          py: 1.6,
                          borderRadius: 2.5,
                          fontSize: '1rem',
                          borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : '#cbd5e1',
                          color: 'text.primary',
                        }}
                      >
                        Explore Features
                      </Button>
                    </Stack>
                  </Grid>

                  {/* Hero Right Visual Mockup Preview */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box className="hero-preview-wrapper">
                      <Paper
                        elevation={0}
                        className={isDarkMode ? 'hero-preview-card-dark' : 'hero-preview-card-light'}
                        sx={{
                          p: { xs: 2.5, sm: 3.5 },
                          borderRadius: 4,
                          backgroundColor: 'background.paper',
                        }}
                      >
                        {/* Header bar */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Stack direction="row" spacing={1}>
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981' }} />
                          </Stack>
                          <Chip
                            label="MailMind Live Preview"
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.75rem', fontWeight: 600 }}
                          />
                        </Box>

                        {/* Mock Email Input */}
                        <Box
                          sx={{
                            p: 2,
                            mb: 2.5,
                            borderRadius: 2.5,
                            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                            border: '1px solid',
                            borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
                          }}
                        >
                          <Typography variant="caption" fontWeight="700" color="text.secondary">
                            INCOMING EMAIL
                          </Typography>
                          <Typography variant="subtitle2" fontWeight="700" color="text.primary" sx={{ mt: 0.5 }}>
                            Could you send the project update by tomorrow?
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.5 }}>
                            &quot;Hi Team, we have our client check-in scheduled for Friday morning. Could you send over the
                            revised sprint progress report by tomorrow afternoon?&quot;
                          </Typography>
                        </Box>

                        {/* Mock MailMind AI Reply */}
                        <Box
                          sx={{
                            p: 2,
                            mb: 2.5,
                            borderRadius: 2.5,
                            backgroundColor: isDarkMode ? 'rgba(79, 70, 229, 0.12)' : '#eff6ff',
                            border: '1px solid',
                            borderColor: isDarkMode ? 'rgba(99, 102, 241, 0.3)' : '#bfdbfe',
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Box sx={{ color: isDarkMode ? '#818cf8' : '#2563eb', display: 'flex' }}>
                                <SparklesIcon width={16} height={16} />
                              </Box>
                              <Typography
                                variant="caption"
                                fontWeight="800"
                                color={isDarkMode ? '#a5b4fc' : '#1d4ed8'}
                              >
                                MAILMIND AI • SUGGESTED REPLY
                              </Typography>
                            </Stack>
                            <Chip
                              label="Professional"
                              size="small"
                              color="primary"
                              sx={{ height: 20, fontSize: '0.7rem' }}
                            />
                          </Box>
                          <Typography
                            variant="body2"
                            color={isDarkMode ? '#e0e7ff' : '#1e3a8a'}
                            sx={{ fontStyle: 'italic', lineHeight: 1.5 }}
                          >
                            &quot;Certainly. I&apos;ll finalize the sprint metrics and send the complete project update by tomorrow
                            afternoon ahead of Friday&apos;s client check-in.&quot;
                          </Typography>
                        </Box>

                        {/* Feature Badges */}
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          <Chip
                            icon={<CheckIcon width={14} height={14} />}
                            label="AI Reply"
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                          <Chip
                            icon={<CheckIcon width={14} height={14} />}
                            label="Smart Summary"
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                          <Chip
                            icon={<CheckIcon width={14} height={14} />}
                            label="Action Items"
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                          <Chip
                            label="Priority: HIGH"
                            color="error"
                            size="small"
                            sx={{ fontWeight: 700, height: 24 }}
                          />
                        </Stack>
                      </Paper>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>

            {/* ==================================================
                FEATURES SECTION
               ================================================== */}
            <Box id="features" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.default' }}>
              <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: 8 }}>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontSize: { xs: '2rem', md: '2.6rem' },
                      letterSpacing: '-1px',
                      color: 'text.primary',
                      mb: 2,
                    }}
                  >
                    Everything You Need to Master Your Inbox
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.15rem', color: 'text.secondary' }}>
                    Powerful AI tools that turn everyday email into a faster, smarter workflow.
                  </Typography>
                </Box>

                <Grid container spacing={3.5}>
                  {/* Feature 1 */}
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card
                      elevation={0}
                      className={`feature-card ${isDarkMode ? 'feature-card-dark' : 'feature-card-light'}`}
                      sx={{ borderRadius: 3.5, p: 1.5, backgroundColor: 'background.paper' }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: 2.5,
                            backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.15)' : '#eef2ff',
                            color: isDarkMode ? '#818cf8' : '#4f46e5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2.5,
                          }}
                        >
                          <ReplyIcon />
                        </Box>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                          AI Reply Generation
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          Generate natural, context-aware replies in seconds and choose the tone that fits your conversation.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Feature 2 */}
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card
                      elevation={0}
                      className={`feature-card ${isDarkMode ? 'feature-card-dark' : 'feature-card-light'}`}
                      sx={{ borderRadius: 3.5, p: 1.5, backgroundColor: 'background.paper' }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: 2.5,
                            backgroundColor: isDarkMode ? 'rgba(22, 163, 74, 0.15)' : '#f0fdf4',
                            color: isDarkMode ? '#4ade80' : '#16a34a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2.5,
                          }}
                        >
                          <SummarizeIcon />
                        </Box>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                          Smart Summaries
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          Understand long emails quickly with concise AI-generated summaries.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Feature 3 */}
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card
                      elevation={0}
                      className={`feature-card ${isDarkMode ? 'feature-card-dark' : 'feature-card-light'}`}
                      sx={{ borderRadius: 3.5, p: 1.5, backgroundColor: 'background.paper' }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: 2.5,
                            backgroundColor: isDarkMode ? 'rgba(2, 132, 199, 0.15)' : '#f0f9ff',
                            color: isDarkMode ? '#38bdf8' : '#0284c7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2.5,
                          }}
                        >
                          <SparklesIcon />
                        </Box>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                          Smart Reply Suggestions
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          Get multiple natural response options based on the email context.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Feature 4 */}
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <Card
                      elevation={0}
                      className={`feature-card ${isDarkMode ? 'feature-card-dark' : 'feature-card-light'}`}
                      sx={{ borderRadius: 3.5, p: 1.5, backgroundColor: 'background.paper' }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: 2.5,
                            backgroundColor: isDarkMode ? 'rgba(147, 51, 234, 0.15)' : '#faf5ff',
                            color: isDarkMode ? '#c084fc' : '#9333ea',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2.5,
                          }}
                        >
                          <ChecklistIcon />
                        </Box>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                          Action Item Extraction
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          Automatically identify tasks, deadlines, and follow-ups hidden inside your emails.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Feature 5 */}
                  <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                    <Card
                      elevation={0}
                      className={`feature-card ${isDarkMode ? 'feature-card-dark' : 'feature-card-light'}`}
                      sx={{ borderRadius: 3.5, p: 1.5, backgroundColor: 'background.paper' }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: 2.5,
                            backgroundColor: isDarkMode ? 'rgba(234, 88, 12, 0.15)' : '#fff7ed',
                            color: isDarkMode ? '#fb923c' : '#ea580c',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2.5,
                          }}
                        >
                          <InsightsIcon />
                        </Box>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                          Intent &amp; Priority
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          Understand what the sender wants and identify how much attention the email needs.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Container>
            </Box>

            {/* ==================================================
                HOW IT WORKS SECTION
               ================================================== */}
            <Box
              id="how-it-works"
              sx={{
                py: { xs: 8, md: 12 },
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.015)' : '#f1f5f9',
              }}
            >
              <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', maxWidth: 680, mx: 'auto', mb: 8 }}>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontSize: { xs: '2rem', md: '2.6rem' },
                      letterSpacing: '-1px',
                      color: 'text.primary',
                      mb: 2,
                    }}
                  >
                    How MailMind Works
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.15rem', color: 'text.secondary' }}>
                    Three simple steps to transform how you handle email every day.
                  </Typography>
                </Box>

                <Grid container spacing={4}>
                  {/* Step 1 */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                      elevation={0}
                      className={`step-card ${isDarkMode ? 'step-card-dark' : 'step-card-light'}`}
                      sx={{ p: 4, borderRadius: 3.5 }}
                    >
                      <Box className="step-badge" sx={{ mb: 3 }}>
                        01
                      </Box>
                      <Typography variant="h6" color="text.primary" gutterBottom>
                        Paste Your Email
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        Add the email you want to understand or respond to.
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* Step 2 */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                      elevation={0}
                      className={`step-card ${isDarkMode ? 'step-card-dark' : 'step-card-light'}`}
                      sx={{ p: 4, borderRadius: 3.5 }}
                    >
                      <Box className="step-badge" sx={{ mb: 3 }}>
                        02
                      </Box>
                      <Typography variant="h6" color="text.primary" gutterBottom>
                        Let MailMind Analyze It
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        Use AI to generate replies, summaries, smart responses, action items, and email insights.
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* Step 3 */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                      elevation={0}
                      className={`step-card ${isDarkMode ? 'step-card-dark' : 'step-card-light'}`}
                      sx={{ p: 4, borderRadius: 3.5 }}
                    >
                      <Box className="step-badge" sx={{ mb: 3 }}>
                        03
                      </Box>
                      <Typography variant="h6" color="text.primary" gutterBottom>
                        Take Action
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        Use the results to respond faster and stay organized.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>

            {/* ==================================================
                PRODUCTIVITY SECTION
               ================================================== */}
            <Box
              className={isDarkMode ? 'productivity-section-dark' : 'productivity-section-light'}
              sx={{ py: { xs: 8, md: 12 } }}
            >
              <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center">
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="h3"
                      component="h2"
                      sx={{
                        fontSize: { xs: '2.1rem', md: '2.7rem' },
                        letterSpacing: '-1px',
                        color: 'text.primary',
                        mb: 2,
                      }}
                    >
                      Spend Less Time on Email.
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', mb: 4 }}>
                      MailMind handles the repetitive work so you can focus on the conversations that matter.
                    </Typography>

                    <Stack spacing={2.5} sx={{ mb: 4.5 }}>
                      {[
                        'Respond faster',
                        'Understand long emails instantly',
                        'Never miss important action items',
                        'Make smarter email decisions',
                      ].map((benefit, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: '50%',
                              backgroundColor: isDarkMode ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7',
                              color: isDarkMode ? '#4ade80' : '#16a34a',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <CheckIcon />
                          </Box>
                          <Typography variant="body1" fontWeight="600" color="text.primary">
                            {benefit}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>

                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => setCurrentView('assistant')}
                      sx={{
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        borderRadius: 2.5,
                        background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
                        boxShadow: '0 8px 24px rgba(79, 70, 229, 0.35)',
                      }}
                    >
                      Try MailMind
                    </Button>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: { xs: 3, sm: 4.5 },
                        borderRadius: 4,
                        backgroundColor: 'background.paper',
                        border: '1px solid',
                        borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="800" color="text.primary" gutterBottom>
                        Streamlined Inbox Workflow
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        MailMind automatically breaks down complex threads into key highlights, tone-customized replies,
                        and action checklists.
                      </Typography>
                      <Stack spacing={2}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2.5,
                            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                            border: '1px solid',
                            borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
                          }}
                        >
                          <Typography variant="caption" fontWeight="800" color="primary.main">
                            CUSTOMIZABLE REPLY TONES
                          </Typography>
                          <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
                            Select Professional, Friendly, Formal, or Concise to match your voice.
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2.5,
                            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                            border: '1px solid',
                            borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
                          }}
                        >
                          <Typography variant="caption" fontWeight="800" color="secondary.main">
                            AUTOMATIC PRIORITY DETECTION
                          </Typography>
                          <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
                            Identify urgent requests and action items at a glance.
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>

            {/* ==================================================
                CTA SECTION
               ================================================== */}
            <Box sx={{ py: { xs: 8, md: 10 }, backgroundColor: 'background.default' }}>
              <Container maxWidth="lg">
                <Box className="cta-banner" sx={{ p: { xs: 4, sm: 6, md: 8 }, textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontSize: { xs: '2.1rem', sm: '2.7rem', md: '3.2rem' },
                      letterSpacing: '-1px',
                      color: '#ffffff',
                      mb: 2,
                    }}
                  >
                    Ready to Make Email Smarter?
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '1.05rem', sm: '1.2rem' },
                      color: 'rgba(255, 255, 255, 0.9)',
                      maxWidth: 620,
                      mx: 'auto',
                      mb: 4,
                    }}
                  >
                    Let MailMind handle the repetitive work behind your inbox.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setCurrentView('assistant')}
                    sx={{
                      fontWeight: 800,
                      px: 5,
                      py: 1.8,
                      borderRadius: 2.5,
                      fontSize: '1.05rem',
                      backgroundColor: '#ffffff',
                      color: '#4338ca',
                      '&:hover': {
                        backgroundColor: '#f8fafc',
                      },
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    Try MailMind
                  </Button>
                </Box>
              </Container>
            </Box>

            {/* ==================================================
                FOOTER
               ================================================== */}
            <Box
              sx={{
                py: 6,
                backgroundColor: isDarkMode ? '#05080f' : '#0f172a',
                color: '#ffffff',
                borderTop: '1px solid',
                borderColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'transparent',
              }}
            >
              <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between" alignItems="center">
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: 2,
                          backgroundColor: '#4f46e5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <MailMindLogoIcon width={18} height={18} />
                      </Box>
                      <Typography variant="h6" fontWeight="800" color="#ffffff">
                        MailMind
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                      Write smarter. Respond faster.
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 2, sm: 3 }}
                      justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
                    >
                      <Button
                        color="inherit"
                        onClick={scrollToTop}
                        sx={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}
                      >
                        Home
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => scrollToSection('features')}
                        sx={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}
                      >
                        Features
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => scrollToSection('how-it-works')}
                        sx={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}
                      >
                        How It Works
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                <Typography variant="body2" textAlign="center" color="rgba(255, 255, 255, 0.5)">
                  &copy; 2026 MailMind
                </Typography>
              </Container>
            </Box>
          </Box>
        )}

        {/* ==================================================
            AI EMAIL COMMAND CENTER WORKSPACE VIEW
           ================================================== */}
        {currentView === 'assistant' && (
          <Box className="workspace-container">
            <Container maxWidth="lg">
              {/* Workspace Compact Hero & Status */}
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Box
                  className={`workspace-badge-ready ${isDarkMode ? 'workspace-badge-ready-dark' : 'workspace-badge-ready-light'
                    }`}
                  sx={{ mb: 1.5 }}
                >
                  <span className="status-pulse-dot" />
                  AI Ready
                </Box>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontSize: { xs: '1.85rem', sm: '2.4rem', md: '2.8rem' },
                    letterSpacing: '-1px',
                    fontWeight: 800,
                    color: 'text.primary',
                    mb: 1,
                  }}
                >
                  Your AI Email Command Center
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto' }}>
                  Turn any email into a clear response, summary, tasks, and insights.
                </Typography>
              </Box>

              {/* Main Two-Column Command Center */}
              <Grid container spacing={3.5} alignItems="stretch">
                {/* LEFT COLUMN: Email Inbox Card */}
                <Grid size={{ xs: 12, md: 7.5 }}>
                  <Paper
                    elevation={0}
                    className={`command-card ${isDarkMode ? 'command-card-dark' : 'command-card-light'}`}
                    sx={{ p: { xs: 3, sm: 3.5 }, height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" fontWeight="700" color="text.primary">
                          Email Inbox
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Paste your message to analyze or generate replies
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        color="inherit"
                        onClick={handleClear}
                        disabled={isAnyLoading && isInputEmpty}
                        sx={{ borderRadius: 2 }}
                      >
                        Clear
                      </Button>
                    </Box>

                    <TextField
                      placeholder="Paste incoming email or draft here..."
                      multiline
                      rows={9}
                      fullWidth
                      variant="outlined"
                      value={emailContent}
                      onChange={(e) => {
                        setEmailContent(e.target.value);
                        if (error) setError('');
                      }}
                      sx={{
                        mb: 2.5,
                        flex: 1,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2.5,
                          backgroundColor: isDarkMode ? 'rgba(255,255,255,0.02)' : '#f8fafc',
                        },
                      }}
                    />

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                      <FormControl fullWidth size="small">
                        <InputLabel id="tone-select-label">Reply Tone</InputLabel>
                        <Select
                          labelId="tone-select-label"
                          value={tone}
                          label="Reply Tone"
                          onChange={(e) => setTone(e.target.value)}
                          sx={{ borderRadius: 2 }}
                        >
                          <MenuItem value="Professional">Professional </MenuItem>
                          <MenuItem value="Friendly">Friendly </MenuItem>
                          <MenuItem value="Formal">Formal </MenuItem>
                          <MenuItem value="Concise">Concise </MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>

                    {error && (
                      <Alert severity="error" sx={{ mt: 2.5, borderRadius: 2 }}>
                        {error}
                      </Alert>
                    )}
                  </Paper>
                </Grid>

                {/* RIGHT COLUMN: AI Actions Panel */}
                <Grid size={{ xs: 12, md: 4.5 }}>
                  <Paper
                    elevation={0}
                    className={`command-card ${isDarkMode ? 'command-card-dark' : 'command-card-light'}`}
                    sx={{ p: { xs: 3, sm: 3.5 }, height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" fontWeight="700" color="text.primary">
                        AI Actions
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Select an operation to run on your email
                      </Typography>
                    </Box>

                    <Stack spacing={1.5} sx={{ flex: 1, justifyContent: 'space-between' }}>
                      {/* Action 1: Generate Reply (Primary Highlighted Action) */}
                      <Box
                        className={`action-tile ${isDarkMode ? 'action-tile-primary-dark' : 'action-tile-primary-light'
                          } ${isInputEmpty || loadingAction ? 'action-tile-disabled' : ''}`}
                        onClick={handleGenerateReply}
                      >
                        <Box
                          className="action-tile-icon"
                          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }}
                        >
                          {loadingAction === 'generate' ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <ReplyIcon />
                          )}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" fontWeight="800" sx={{ color: '#ffffff' }}>
                            Generate Reply
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.85)', display: 'block' }}>
                            Write a contextual response
                          </Typography>
                        </Box>
                      </Box>

                      {/* Action 2: Summarize */}
                      <Box
                        className={`action-tile ${isDarkMode ? 'action-tile-secondary-dark' : 'action-tile-secondary-light'
                          } ${isInputEmpty || loadingAction ? 'action-tile-disabled' : ''}`}
                        onClick={handleSummarize}
                      >
                        <Box
                          className="action-tile-icon"
                          sx={{
                            backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.15)' : '#f0fdf4',
                            color: isDarkMode ? '#34d399' : '#16a34a',
                          }}
                        >
                          {loadingAction === 'summarize' ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <SummarizeIcon />
                          )}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" fontWeight="700" color="text.primary">
                            Summarize
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                            Understand the key points
                          </Typography>
                        </Box>
                      </Box>

                      {/* Action 3: Smart Replies */}
                      <Box
                        className={`action-tile ${isDarkMode ? 'action-tile-secondary-dark' : 'action-tile-secondary-light'
                          } ${isInputEmpty || loadingAction ? 'action-tile-disabled' : ''}`}
                        onClick={handleSmartReplies}
                      >
                        <Box
                          className="action-tile-icon"
                          sx={{
                            backgroundColor: isDarkMode ? 'rgba(14, 165, 233, 0.15)' : '#f0f9ff',
                            color: isDarkMode ? '#38bdf8' : '#0284c7',
                          }}
                        >
                          {loadingAction === 'smartReplies' ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <SparklesIcon />
                          )}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" fontWeight="700" color="text.primary">
                            Smart Replies
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                            Get quick response options
                          </Typography>
                        </Box>
                      </Box>

                      {/* Action 4: Action Items */}
                      <Box
                        className={`action-tile ${isDarkMode ? 'action-tile-secondary-dark' : 'action-tile-secondary-light'
                          } ${isInputEmpty || loadingAction ? 'action-tile-disabled' : ''}`}
                        onClick={handleActionItems}
                      >
                        <Box
                          className="action-tile-icon"
                          sx={{
                            backgroundColor: isDarkMode ? 'rgba(168, 85, 247, 0.15)' : '#faf5ff',
                            color: isDarkMode ? '#c084fc' : '#9333ea',
                          }}
                        >
                          {loadingAction === 'actionItems' ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <ChecklistIcon />
                          )}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" fontWeight="700" color="text.primary">
                            Action Items
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                            Find tasks and follow-ups
                          </Typography>
                        </Box>
                      </Box>

                      {/* Action 5: Analyze Email */}
                      <Box
                        className={`action-tile ${isDarkMode ? 'action-tile-secondary-dark' : 'action-tile-secondary-light'
                          } ${isInputEmpty || loadingAction ? 'action-tile-disabled' : ''}`}
                        onClick={handleAnalyze}
                      >
                        <Box
                          className="action-tile-icon"
                          sx={{
                            backgroundColor: isDarkMode ? 'rgba(249, 115, 22, 0.15)' : '#fff7ed',
                            color: isDarkMode ? '#fb923c' : '#ea580c',
                          }}
                        >
                          {loadingAction === 'analyze' ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <InsightsIcon />
                          )}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" fontWeight="700" color="text.primary">
                            Analyze Email
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                            Detect intent &amp; priority
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>

              {/* ==================================================
                  RESULTS: MAILMIND INSIGHTS SECTION
                 ================================================== */}
              {hasAnyResult && (
                <Box sx={{ mt: 6 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" fontWeight="800" color="text.primary">
                      MailMind Insights
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      AI-generated intelligence and output for your email
                    </Typography>
                  </Box>

                  <Stack spacing={3}>
                    {/* 1. Generated Reply Card */}
                    {generatedEmail && (
                      <Paper
                        elevation={0}
                        className={`insight-card ${isDarkMode ? 'insight-card-dark' : 'insight-card-light'}`}
                        sx={{ p: { xs: 3, sm: 3.5 } }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Box
                              sx={{
                                width: 34,
                                height: 34,
                                borderRadius: 2,
                                backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.15)' : '#eef2ff',
                                color: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <ReplyIcon width={18} height={18} />
                            </Box>
                            <Typography variant="h6" fontWeight="700" color="text.primary">
                              AI Generated Reply
                            </Typography>
                            <Chip label={tone} size="small" variant="outlined" sx={{ fontWeight: 600, height: 22 }} />
                          </Stack>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={handleCopyGeneratedReply}
                            startIcon={<CopyIcon />}
                            sx={{
                              borderRadius: 2,
                              background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
                            }}
                          >
                            Copy Reply
                          </Button>
                        </Box>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2.5,
                            borderRadius: 2.5,
                            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                            border: '1px solid',
                            borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
                          }}
                        >
                          <Typography
                            variant="body1"
                            color="text.primary"
                            sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}
                          >
                            {generatedEmail}
                          </Typography>
                        </Paper>
                      </Paper>
                    )}

                    {/* 2. Email Summary Card */}
                    {summary && (
                      <Paper
                        elevation={0}
                        className={`insight-card ${isDarkMode ? 'insight-card-dark' : 'insight-card-light'}`}
                        sx={{ p: { xs: 3, sm: 3.5 } }}
                      >
                        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: 2,
                              backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.15)' : '#f0fdf4',
                              color: isDarkMode ? '#34d399' : '#16a34a',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <SummarizeIcon width={18} height={18} />
                          </Box>
                          <Typography variant="h6" fontWeight="700" color="text.primary">
                            Email Summary
                          </Typography>
                        </Stack>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2.5,
                            borderRadius: 2.5,
                            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                            border: '1px solid',
                            borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
                          }}
                        >
                          <Typography
                            variant="body1"
                            color="text.primary"
                            sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}
                          >
                            {summary}
                          </Typography>
                        </Paper>
                      </Paper>
                    )}

                    {/* 3. Smart Replies Card */}
                    {smartReplies && smartReplies.length > 0 && (
                      <Paper
                        elevation={0}
                        className={`insight-card ${isDarkMode ? 'insight-card-dark' : 'insight-card-light'}`}
                        sx={{ p: { xs: 3, sm: 3.5 } }}
                      >
                        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
                          <Box
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: 2,
                              backgroundColor: isDarkMode ? 'rgba(14, 165, 233, 0.15)' : '#f0f9ff',
                              color: isDarkMode ? '#38bdf8' : '#0284c7',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <SparklesIcon width={18} height={18} />
                          </Box>
                          <Typography variant="h6" fontWeight="700" color="text.primary">
                            Smart Reply Suggestions
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                          Click any suggestion below to copy it directly to your clipboard.
                        </Typography>
                        <Grid container spacing={2}>
                          {smartReplies.map((suggestion, index) => (
                            <Grid key={index} size={{ xs: 12, md: 4 }}>
                              <Box
                                className={isDarkMode ? 'smart-reply-box-dark' : 'smart-reply-box-light'}
                                onClick={() => handleCopySmartReply(suggestion)}
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                              >
                                <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6, mb: 1.5 }}>
                                  &quot;{suggestion}&quot;
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'primary.main' }}>
                                  <CopyIcon />
                                  <Typography variant="caption" fontWeight="700">
                                    Click to copy
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Paper>
                    )}

                    {/* 4. Action Items Card */}
                    {actionItems && actionItems.length > 0 && (
                      <Paper
                        elevation={0}
                        className={`insight-card ${isDarkMode ? 'insight-card-dark' : 'insight-card-light'}`}
                        sx={{ p: { xs: 3, sm: 3.5 } }}
                      >
                        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: 2,
                              backgroundColor: isDarkMode ? 'rgba(168, 85, 247, 0.15)' : '#faf5ff',
                              color: isDarkMode ? '#c084fc' : '#9333ea',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <ChecklistIcon width={18} height={18} />
                          </Box>
                          <Typography variant="h6" fontWeight="700" color="text.primary">
                            Action Items
                          </Typography>
                        </Stack>
                        <Stack spacing={1}>
                          {actionItems.map((item, index) => (
                            <Box
                              key={index}
                              className="action-check-row"
                              sx={{
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.02)' : '#f8fafc',
                                border: '1px solid',
                                borderColor: isDarkMode ? 'rgba(255,255,255,0.06)' : '#e2e8f0',
                              }}
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={Boolean(checkedActions[index])}
                                    onChange={() => handleToggleAction(index)}
                                    color="primary"
                                  />
                                }
                                label={
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: 500,
                                      textDecoration: checkedActions[index] ? 'line-through' : 'none',
                                      color: checkedActions[index] ? 'text.secondary' : 'text.primary',
                                    }}
                                  >
                                    {item}
                                  </Typography>
                                }
                              />
                            </Box>
                          ))}
                        </Stack>
                      </Paper>
                    )}

                    {/* 5. Email Analysis Card */}
                    {analysis && (
                      <Paper
                        elevation={0}
                        className={`insight-card ${isDarkMode ? 'insight-card-dark' : 'insight-card-light'}`}
                        sx={{ p: { xs: 3, sm: 3.5 } }}
                      >
                        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: 2,
                              backgroundColor: isDarkMode ? 'rgba(249, 115, 22, 0.15)' : '#fff7ed',
                              color: isDarkMode ? '#fb923c' : '#ea580c',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <InsightsIcon width={18} height={18} />
                          </Box>
                          <Typography variant="h6" fontWeight="700" color="text.primary">
                            Email Analysis
                          </Typography>
                        </Stack>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2.5,
                            borderRadius: 2.5,
                            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                            border: '1px solid',
                            borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
                          }}
                        >
                          <Stack spacing={2.5}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                              <Typography variant="subtitle2" fontWeight="700" color="text.primary">
                                Intent:
                              </Typography>
                              <Chip
                                label={analysis.intent || 'N/A'}
                                variant="outlined"
                                color="primary"
                                size="small"
                                sx={{ fontWeight: 700 }}
                              />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                              <Typography variant="subtitle2" fontWeight="700" color="text.primary">
                                Priority:
                              </Typography>
                              <Chip
                                label={analysis.priority || 'N/A'}
                                color={getPriorityColor(analysis.priority)}
                                size="small"
                                sx={{ fontWeight: 800 }}
                              />
                            </Box>

                            <Box>
                              <Typography variant="subtitle2" fontWeight="700" color="text.primary" gutterBottom>
                                Reason:
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                                {analysis.reason || 'No reason provided.'}
                              </Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      </Paper>
                    )}
                  </Stack>
                </Box>
              )}
            </Container>
          </Box>
        )}

        {/* Notification Toast */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2500}
          onClose={() => setSnackbarOpen(false)}
          message={copiedMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;