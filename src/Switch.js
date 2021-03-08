import "./App.css";

const Switch = ({ id, checked, onChange, children }) => {
    return (
        <div className="switch">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
            ></input>
            <label htmlFor={id}>{children}</label>
        </div>
    );
};

export default Switch;
