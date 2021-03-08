import { useState, useCallback } from "react";
import Switch from "./Switch";
import Radios from "./Radios";
import ClassComponent from "./components/ClassComponent";
import FuncComponent from "./components/FuncComponent";
import MemoizedFuncComponent from "./components/MemoizedFuncComponent";
import { memoTypes, componentTypes } from "./constants";
import "./App.css";

// saving the previous onClick handler reference
let previousOnClick;

function App() {
    console.log("App render");
    const [count, setCount] = useState(0);

    const [memoType, setMemoType] = useState("with-deps");
    const [componentType, setComponentType] = useState("func-memo");
    const [countConnected, setCountConnected] = useState(true);
    const [onClickConnected, setOnClickConnected] = useState(true);

    // non-memoized version
    const onClickNonMemoized = (source) => {
        console.log(source, "onClick");
        setCount(count + 1);
    };

    // memoized version, created only once (no dependencies)
    const onClickMemoized = useCallback((source) => {
        console.log(source, "onClick (memoized, no dependencies)");
        setCount(count + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // memoized version, recreated when count changes
    const onClickMemoizedWithDependencies = useCallback(
        (source) => {
            console.log(source, "onClick (memoized, with dependencies)");
            setCount(count + 1);
        },
        [count]
    );

    //const onClick = memoized ? onClickMemoized : onClickNonMemoized;

    let onClick;

    switch (memoType) {
        case "none":
            onClick = onClickNonMemoized;
            break;
        case "no-deps":
            onClick = onClickMemoized;
            break;
        default:
            // with-deps
            onClick = onClickMemoizedWithDependencies;
            break;
    }

    const onAppClick = useCallback(() => onClick("App"), [onClick]);
    const onComponentClick = useCallback(() => onClick("Component"), [onClick]);

    console.log("onComponentClick changed", previousOnClick !== onComponentClick);
    previousOnClick = onComponentClick;

    let Component;

    switch (componentType) {
        case "class":
            Component = ClassComponent;
            break;
        case "func":
            Component = FuncComponent;
            break;
        default:
            // func-memo
            Component = MemoizedFuncComponent;
            break;
    }

    return (
        <div className="App">
            <div className="label">Count: {count}</div>
            <button className="button" onClick={onAppClick}>
                App button
            </button>
            <div className="switches">
                <Switch id="count" checked={countConnected} onChange={setCountConnected}>
                    Connect <i>count</i>
                </Switch>
                <Switch id="click" checked={onClickConnected} onChange={setOnClickConnected}>
                    Connect <i>onClick</i>
                </Switch>
            </div>
            <Component count={countConnected ? count : "-"} onClick={onClickConnected ? onComponentClick : undefined} />
            <div>
                <Radios
                    id="memo"
                    title="Callback type:"
                    options={memoTypes}
                    checked={memoType}
                    onChange={setMemoType}
                />
                <Radios
                    id="component"
                    title="Component type:"
                    options={componentTypes}
                    checked={componentType}
                    onChange={setComponentType}
                />
            </div>
        </div>
    );
}

export default App;
