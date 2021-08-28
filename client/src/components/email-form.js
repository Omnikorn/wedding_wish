import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  
const EmailForm = ({ onEmailSubmit, disabled }) => {
    const [email, setEmail] = useState('');
    const classes = useStyles();
    console.log("email is:    ", email)

    const handleSubmit = async (e) => {
        e.preventDefault();
        onEmailSubmit(email);
        localStorage.setItem("guest", email)
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3 className='form-header'>Login</h3>
                <div className='input-wrapper'>
                    <input
                        placeholder='Enter your email'
                        size='sm'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        prefix={<div type='' size={23} color={'#000'} />}
                    />
                </div>
                <div>
                    <Button
                    type= "submit"
                    variant="contained"
                    color="default"
                    className={classes.button}
                    >
                        Send Magic Link
                    </Button>
                </div>
            </form>
            <style>{`
        form,
        label {
          display: flex;
          flex-flow: column;
          text-align: center;
        }
        .form-header {
          font-size: 22px;
          margin: 25px 0;
        }
        .input-wrapper {
          width: 80%;
          margin: 0 auto 20px;
        }
        
      `}</style>
        </>
    );
};

export default EmailForm;