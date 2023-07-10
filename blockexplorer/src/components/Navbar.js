import React, {useEffect} from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar()
{
    const [scrolled,setScrolled]=React.useState(false);
    const handleScroll=() => {
        const offset=window.scrollY;
        if(offset > 200 ){
          setScrolled(true);
        }
        else{
          setScrolled(false);
        }
      }
    
      useEffect(() => {
        window.addEventListener('scroll',handleScroll)
      })
    let navbarClasses=['navbar'];
      if(scrolled){
        navbarClasses.push('scrolled');
      }
    return(
    <header className={navbarClasses.join(" ")}>
        <nav className="navigation">
          {/* <p><a href="/Home">Explorer</a></p>
          <p><a href="/Accounts">Accounts</a></p> */}
          <ul>
            <li>
              <Link className="active" to="/">Home</Link>
            </li>
            <li>
              <Link className="active" to="/Accounts">Accounts</Link>
            </li>
          </ul>
        </nav>

   </header>

    )

}

export default Navbar;