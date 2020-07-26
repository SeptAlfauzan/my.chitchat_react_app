import React, {useState, useMemo} from 'react';
import MainForm from './MainForm';
import AvatarForm from './AvatarForm';

const RegisterForm = () => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({});

    // go to next step
    const nextStep = () => {
        setStep(step + 1);
    }
    // go to previous step
    const prevStep = () => {
        console.log(data);
        if (step > 0) {
            setStep(step - 1);
        }
    }
    // handle input change, then update the state
    const handleInputChange = (dataParams) => {
        setData(dataParams);
    }

    switch (step) {
        case 1:
            return ( 
                <MainForm handleChange={handleInputChange} nextStep={nextStep} defaultValue={data}/>
                );
        case 2:
            return ( 
                <AvatarForm nextStep={nextStep} prevStep={prevStep} values={data}/>
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