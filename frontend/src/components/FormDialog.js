import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from 'axios';
import { updateModel } from '../services/HandlerFactory';
import { updateUser } from '../services/User';

function FormDialog({ dialogStatus, closeDialog }) {
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const URL = "http://localhost:3000/update";

    const handleClose = () => {
        closeDialog();
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        if (name) {
            formData.append('Fullname', name);
        }
        if (selectedFile) {
           
            formData.append('image', selectedFile);
        }
       
          
       
        const response = await updateUser(URL, formData);
        closeDialog();
    };
    console.log(selectedFile)
   

    return (

        <div>
            <Dialog open={dialogStatus} onClose={handleClose}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
            
                    <div className="mb-4">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="New name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            variant="standard"
                        />
                    </div>
                    <div>
                        <input type="file" accept="image/*" name="image" onChange={(e) => setSelectedFile(e.target.files[0])} />
                    </div>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormDialog;
