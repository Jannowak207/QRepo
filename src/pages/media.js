import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { MediaListToolbar } from '../components/media/media-list-toolbar';
import { MediaCard } from '../components/media/media-card';
import { DashboardLayout } from '../components/dashboard-layout';

const Medias = () => (
  <>
    <Head>
      <title>
        Media Library
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <MediaListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <MediaCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
);

Medias.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Medias;
