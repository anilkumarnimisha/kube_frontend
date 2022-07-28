import Link from 'next/link';

const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="/">Home</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i className="fas fa-bars" />
                </button>
                <nav className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto">
                        <Link href="/register">
                            <a className="nav-item nav-link">Register</a>
                        </Link>
                        <Link href="/login">
                            <a className="nav-item nav-link">Sign In</a>
                        </Link>
                    </ul>
                </nav>
            </div>
        </nav>

    );
};

export default Nav;