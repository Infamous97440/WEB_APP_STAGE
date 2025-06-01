import Button from './Button';

const Form = ({title="Form", field1="Nom : ", placeholder1="Entrez votre nom", onClick, button_title="Button", onChange, value}) => {
    return (
        <div className="p-4 max-w-md mx-auto bg-gray-100 rounded shadow">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <label className="block mb-2">
                {field1}
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className="w-full px-3 py-2 mt-1 rounded border border-gray-300"
                    placeholder={placeholder1}/>
            </label>
            <Button onClick={() => value ? onClick(value) : onClick()}>{button_title}</Button>
        </div>
    );
};

export default Form;
