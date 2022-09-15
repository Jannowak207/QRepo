import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { useState, useEffect } from 'react';

const FileInput = (props) => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    if (selectedImage) {
      let imgUrl = URL.createObjectURL(selectedImage)
      setImageUrl(imgUrl);
      props.parentCallback(imgUrl)
      console.log("logo changed.")
    }
  }, [selectedImage]);

  //remove image function
  const handleRemove = () => {
    setSelectedImage(null);
    setImageUrl(null);
  }

  return (
    <>
      {imageUrl && selectedImage && (
        <Box mt={0} textAlign="left">
          <div>Logo Preview:</div>
          <img src={imageUrl} alt={selectedImage.name} height="80px" />
        </Box>
      )}
      <input 
          accept="image/*"
          type="file"
          id="select-image"
          style={{ display: 'none' }}
          onChange={e => setSelectedImage(e.target.files[0])}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <label htmlFor="select-image">
            <Button 
                variant="contained"
                color="primary"
                style={{
                  width: "30%",
                }}
                component="span">
              Upload Image
            </Button>
          </label>
        </Grid>
        <Grid item xs={12} md={12}>
          <Button variant="contained"
              color="primary"
              component="span"
              style={{
                width: "30%",
              }}
              onClick={handleRemove}>
            Remove logo
          </Button>
        </Grid>
      </Grid>



    </>
  );
};
export default FileInput;