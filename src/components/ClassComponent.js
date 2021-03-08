import React from "react";
import "./Component.css";

export default class ClassComponent extends React.Component {
    /**
     * *shouldComponentUpdate* is a way to specify if render() method should execute.
     * It should return *true* if components should update (i.e. if checked props are NOT the same).
     */
    shouldComponentUpdate = (prevProps) => {
        return this.props.count !== prevProps.count || this.props.onClick !== prevProps.onClick;
    };

    render() {
        console.log("Component render", this.props);

        return (
            <div>
                <div className="component class">
                    <div className="label">Count: {this.props.count}</div>
                    <button className="button" onClick={this.props.onClick} disabled={!this.props.onClick}>
                        Component button
                    </button>
                </div>
            </div>
        );
    }
}
