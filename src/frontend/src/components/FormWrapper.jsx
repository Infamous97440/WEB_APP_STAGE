import {useState} from "react";
import Form from "./Form";

const FormWrapper = ({title, field1, placeholder1, button_title, validator = () => true, component}) => {
    const [input, setInput] = useState("");
    const [submittedValue, setSubmittedValue] = useState(null);

    const handleClick = () => {
        if (!validator(input)) {
            alert("Invalid Input");
            setSubmittedValue(null);
            return;
        }
        setSubmittedValue(input);
    };
    return (
        <div className="my-4">
            <Form title={title} field1={field1} placeholder1={placeholder1}
            button_title={button_title}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onClick={handleClick}
            />
            {submittedValue && component ? component(submittedValue) : <p>Waiting Input...</p>}
        </div>
    );
};

export default FormWrapper;
