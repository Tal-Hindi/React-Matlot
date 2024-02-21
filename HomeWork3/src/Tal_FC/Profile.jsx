
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/material';


const Profile = ({ foundUser, logoutUser, onEdit }) => {

  // Continue with the rest of the component
  const imagePath = foundUser.picture;

  const handleLogout = () => {
    // Call the logoutUser function to log out the user
    logoutUser(foundUser.email);
  };

  const handleEdit = () => {
    onEdit();
  }

  return (
    <Box>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={imagePath}
          title="user photo"
        />
        <CardContent variant="body2" color="text.secondary">
          <Typography variant="body2" color="text.secondary">
            Name: {foundUser.firstname} {foundUser.lastname}
            <br />
            Adress: {foundUser.city} , {foundUser.street} {foundUser.housenumber}
            <br />
            Email: {foundUser.email}
            <br />
            Birthday: {foundUser.birthday}
            <br />
            Username: {foundUser.username}
          </Typography>
        </CardContent>
        <CardActions>
        
          <Button size="small" onClick={handleEdit}>Edit</Button> 
           <Button size="small" onClick={handleLogout}> Logout</Button>
           
          
        </CardActions>
      </Card>
    </Box>

  );
};

export default Profile;
