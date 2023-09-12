import EditIcon from '@mui/icons-material/Edit';

function EditIconWrapper({ onClick }) {
  return (
    <EditIcon onClick={onClick} style={{cursor:'pointer'}} />
  );
}

export default EditIconWrapper;


