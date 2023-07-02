import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="404 error" />
                <title>404 error</title>
            </Helmet>
            <ErrorMessage />
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '40px'}}>Oops, page doesn't exist :(</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', 'color': '#9f0013'}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;