import React from "react";
import "./Component.css";

const areEqual = (prevProps, nextProps) =>
    prevProps.count === nextProps.count && prevProps.onClick === nextProps.onClick;

/**
 * By wrapping a functional component with React.memo, we can prevent the unnecessary execution.
 * 2nd parameter of React.memo is a function which returns TRUE if nothing changed.
 * Note: This is different than shouldComponentUpdate with class component, which returns FALSE if nothing changed.
 * if 2nd parameter is ommited, the component will be rendered only once.
 *
 * Important: *React.memo* is not the same as *React.useMemo* hook!
 * React.memo is a higher order component.
 * @see https://reactjs.org/docs/react-api.html#reactmemo
 */
const MemoizedFuncComponent = React.memo(function FuncComponent(props) {
    console.log("Component render", props);

    return (
        <div>
            <div className="component func-memoized">
                <div className="label">Count: {props.count}</div>
                <button className="button" onClick={props.onClick} disabled={!props.onClick}>
                    Component button
                </button>
            </div>
        </div>
    );
}, areEqual);

export default MemoizedFuncComponent;
