import { Link } from "react-router-dom";

export function ErrorPage() {    
    return (
    <div id="error-page">
        <h1>Lo Sentimos!</h1>
        <p>La página solicitada no se encuentra disponible</p>
        <button>
            <Link to='/login'> Volver</Link>
        </button>
    </div>
    )
}

