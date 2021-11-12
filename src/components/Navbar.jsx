const Navbar = () => {
    return ( <>
        <nav>
            <div className = 'nav-links'>
                {/* <img className = 'logo' alt = 'logo' src = {logo} /> */}<h6>Pollz</h6>
            </div>


            <div className = 'flexbox'>
                <div className = 'nav-links'>
                    <h6>Leave Session</h6>
                </div>

                <div className = 'nav-links'>
                    <h6>Sign Out</h6>
                </div>
            </div>
                
        </nav>
    
    </> );
}
 
export default Navbar;