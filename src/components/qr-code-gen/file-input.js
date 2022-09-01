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

const FileInput = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
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
          <div>Image Preview:</div>
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
      <label htmlFor="select-image">
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>

        <Button variant="contained" color="primary" component="span" onClick={handleRemove}>
          Remove logo
        </Button>
    </>
  );
};
export default FileInput;