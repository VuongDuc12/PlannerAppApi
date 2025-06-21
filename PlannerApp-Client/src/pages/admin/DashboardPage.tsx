import {
  Box,
  Typography,
  Grid,
  Avatar,
  LinearProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  useTheme,
  Chip,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const stats = [
  { label: 'Người dùng hoạt động', value: '27/80', color: '#6366f1' },
  { label: 'Môn học', value: '3,298', color: '#06b6d4' },
  { label: 'Số lượng sinh viên', value: '2m 34s', color: '#f59e42' },
  { label: 'Tốc độ phát triển', value: '64%', color: '#10b981' },
  { label: 'Sinh viên tiềm năng', value: '86%', color: '#f43f5e' },
  { label: 'Lượt truy cập', value: '+34%', color: '#a855f7' },
];

const subjects = [
  { name: 'Lập trình phân tán', percent: 74, img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Android', percent: 52, img: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { name: 'Cấu trúc dữ liệu giải thuật', percent: 36, img: 'https://randomuser.me/api/portraits/men/34.jpg' },
];

const devSubjects = [
  { name: 'Tư tưởng hồ chí minh', percent: 95, img: 'https://randomuser.me/api/portraits/men/35.jpg' },
  { name: 'Bóng đá', percent: 92, img: 'https://randomuser.me/api/portraits/men/36.jpg' },
  { name: 'Chơi game', percent: 89, img: 'https://randomuser.me/api/portraits/men/37.jpg' },
];

const students = [
  { name: 'Vương Văn H', score: 637, percent: 98, img: 'https://randomuser.me/api/portraits/men/1.jpg', rank: 1, up: true },
  { name: 'Phan Văn A', score: 637, percent: 88, img: 'https://randomuser.me/api/portraits/men/2.jpg', rank: 2, up: false },
  { name: 'Nguyễn Thị A', score: 500, percent: 90, img: 'https://randomuser.me/api/portraits/women/3.jpg', rank: 3, up: true },
  { name: 'Đinh Thị B', score: 480, percent: 85, img: 'https://randomuser.me/api/portraits/women/4.jpg', rank: 4, up: false },
];

const DashboardPage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#18181b', minHeight: '100vh' }}>
      <Typography variant="h5" fontWeight={700} mb={3} color="#fff">
        Thống kê
      </Typography>
      <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 3, bgcolor: '#23232b', boxShadow: '0 2px 16px #0002' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel sx={{ color: '#fff' }}>Khung giờ</InputLabel>
            <Select label="Khung giờ" defaultValue="all" sx={{ color: '#fff', '.MuiOutlinedInput-notchedOutline': { borderColor: '#333' } }}>
              <MenuItem value="all">Mọi giờ</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel sx={{ color: '#fff' }}>Mọi Người</InputLabel>
            <Select label="Mọi Người" defaultValue="all" sx={{ color: '#fff', '.MuiOutlinedInput-notchedOutline': { borderColor: '#333' } }}>
              <MenuItem value="all">Tất cả</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel sx={{ color: '#fff' }}>Chủ đề</InputLabel>
            <Select label="Chủ đề" defaultValue="all" sx={{ color: '#fff', '.MuiOutlinedInput-notchedOutline': { borderColor: '#333' } }}>
              <MenuItem value="all">Tất Cả</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>
      <Grid container spacing={2} mb={2}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={4} key={stat.label}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: '#23232b',
                minHeight: 110,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 2px 16px #0002',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: 16,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: stat.color,
                  opacity: 0.15,
                  zIndex: 0,
                }}
              />
              <Typography variant="subtitle2" color="#a1a1aa" mb={0.5} sx={{ zIndex: 1 }}>
                {stat.label}
              </Typography>
              <Typography variant="h5" fontWeight={700} color="#fff" sx={{ zIndex: 1 }}>
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: '#23232b', height: '100%', boxShadow: '0 2px 16px #0002' }}>
            <Typography variant="subtitle1" fontWeight={700} mb={2} color="#fff">
              Môn học
            </Typography>
            {subjects.map((s) => (
              <Box key={s.name} mb={2}>
                <Box display="flex" alignItems="center" mb={0.5}>
                  <Avatar src={s.img} sx={{ width: 32, height: 32, mr: 1 }} />
                  <Typography variant="body2" sx={{ flex: 1, color: '#fff' }}>
                    {s.name}
                  </Typography>
                  <Chip label={`${s.percent}%`} size="small" sx={{ bgcolor: '#ff5a5f', color: '#fff', fontWeight: 700 }} />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={s.percent}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    bgcolor: '#3a2c2c',
                    '& .MuiLinearProgress-bar': { bgcolor: '#ff5a5f' },
                  }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: '#23232b', height: '100%', boxShadow: '0 2px 16px #0002' }}>
            <Typography variant="subtitle1" fontWeight={700} mb={2} color="#fff">
              Môn học phát triển
            </Typography>
            {devSubjects.map((s) => (
              <Box key={s.name} mb={2}>
                <Box display="flex" alignItems="center" mb={0.5}>
                  <Avatar src={s.img} sx={{ width: 32, height: 32, mr: 1 }} />
                  <Typography variant="body2" sx={{ flex: 1, color: '#fff' }}>
                    {s.name}
                  </Typography>
                  <Chip label={`${s.percent}%`} size="small" sx={{ bgcolor: '#00c48c', color: '#fff', fontWeight: 700 }} />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={s.percent}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    bgcolor: '#1e2e2a',
                    '& .MuiLinearProgress-bar': { bgcolor: '#00c48c' },
                  }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: '#23232b', boxShadow: '0 2px 16px #0002' }}>
            <Typography variant="subtitle1" fontWeight={700} mb={2} color="#fff">
              Sinh viên tiêu biểu
            </Typography>
            <List>
              {students.map((student, idx) => (
                <ListItem key={student.name} disableGutters sx={{ py: 1 }}>
                  <ListItemAvatar>
                    <Avatar src={student.img} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography fontWeight={600} color="#fff">{student.name}</Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="#a1a1aa">
                        {student.score} Điểm - {student.percent}% Tiến độ
                      </Typography>
                    }
                  />
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{ minWidth: 24, textAlign: 'right', mr: 1, color: '#fff' }}
                  >
                    {student.rank}
                  </Typography>
                  {student.up ? (
                    <ArrowUpwardIcon sx={{ color: '#00c48c' }} fontSize="small" />
                  ) : (
                    <ArrowDownwardIcon sx={{ color: '#ff5a5f' }} fontSize="small" />
                  )}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;