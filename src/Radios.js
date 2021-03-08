import "./App.css";

const Radios = ({ id, title, checked, onChange, options = [] }) => {
    const opts = options.map((option) => (
        <div key={option.value} className="radio">
            <input
                type="radio"
                id={option.value}
                value={option.value}
                name={id}
                checked={option.value === checked}
                onChange={() => onChange(option.value)}
            />
            <label htmlFor={option.value}>{option.label}</label>
        </div>
    ));

    return (
        <div className="radios">
            <div className="title">{title}</div>
            {opts}
        </div>
    );
};

export default Radios;
