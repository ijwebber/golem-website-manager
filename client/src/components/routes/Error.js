import './Error.css';
import {Link} from 'react-router-dom';

function Error() {
    return (
        <div className="Error">
            <h1>404</h1>
            <div>
                <h2>PAGE NOT FOUND</h2>
                <Link to="/"><button >HOME</button></Link>
            </div>
        </div>
    );
}

export default Error;
