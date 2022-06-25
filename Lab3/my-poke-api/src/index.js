import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

class ErrorBoundary extends React.Component {
    state = {
        error: null,
    };
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        const { error } = this.state;

        if (error) {
            return (
                <div>
                    <p>Seems like an error occured!</p>
                    <p>{error.message}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;