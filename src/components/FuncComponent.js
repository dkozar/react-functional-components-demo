import "./Component.css";

/**
 * With functional component, there is no way to prevent render (since the function is a render method itself).
 * Even if component is completely disconnected (no props are being passed in), it will render.
 */
function FuncComponent(props) {
    console.log("Component render", props);

    return (
        <div>
            <div className="component func">
                <div className="label">Count: {props.count}</div>
                <button className="button" onClick={props.onClick} disabled={!props.onClick}>
                    Component button
                </button>
            </div>
        </div>
    );
}

export default FuncComponent;
