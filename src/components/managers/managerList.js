import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";

export const ManagerList = (props) => (
  <form {...props}>
    <Card>
      <CardHeader subheader="" title="" />
      <Divider />
      <CardContent></CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      ></Box>
    </Card>
  </form>
);
