import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';

export const QRGenOptionCard = ({ option, ...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 0
        }}
      >
        <Avatar
          alt='qr eye'
          src={option.avatarUrl}
          variant="square"
        />
      </Box>
    </CardContent>
  </Card>
);

QRGenOptionCard.propTypes = {
  option: PropTypes.object.isRequired
};
