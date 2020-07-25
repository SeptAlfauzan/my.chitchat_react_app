import React, {useState} from 'react';
import MainForm from './MainForm';
import AvatarForm from './AvatarForm';

const RegisterForm = () => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profile_pic, setProfile_pic] = useState('');

    // go to next step
    const nextStep = () => {
        setStep(step + 1);
        console.log(step);
    }
    // go to previous step
    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    }
    // handle input change, then update the state
    const handleInputChange = () => {
        
    }

    switch (step) {
        case 1:
            return ( 
                <MainForm handleChange={handleInputChange} nextStep={nextStep}/>
                );
        case 2:
            return ( 
                <AvatarForm handleChange={handleInputChange} nextStep={nextStep} prevStep={prevStep}/>
                );
        case 3:
            return (
                <h1>submited</h1>
            )
        default:
            console.log('no step matched');
            break;
    }
}
 
export default RegisterForm;