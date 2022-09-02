import PropTypes from 'prop-types';
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';

export const QRGenOptionCard = ({ option, ...rest }) => (
  <Button  variant="outlined" sx={{m: 0, p: 1}}>
    <Avatar
      alt='qr eye'
      src={option.avatarUrl}
      variant="square"
    />   
  </Button>
);

QRGenOptionCard.propTypes = {
  option: PropTypes.object.isRequired
};
