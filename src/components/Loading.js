import React, { Component } from "react";

export default class LoadingComponent extends Component {
    render() {
        return (
            <div className="loading-layout" id="loadingLayout">
                <div className="loading-overlay"></div>
                <div className="loading-spinner d-flex justify-content-center">
                    <div className="spinner-grow text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
}