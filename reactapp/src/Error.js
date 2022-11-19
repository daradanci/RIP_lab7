import React, {Component} from 'react';
import {Link} from "react-router-dom";
import DocumentTitle from 'react-document-title'




class ErrorComponent extends Component {
    render() {
        return (
            <DocumentTitle title = 'Shop100'>

            <div>
                <div>Пожалуйста,
                <Link to="/auth">войдите</Link> или <Link to="/reg">зарегистрируйтесь</Link>.
                </div>

            </div>

            </DocumentTitle>

        );
    }
}

export default ErrorComponent;