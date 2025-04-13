import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

import "./NavBar.css";
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export default function NavBar() {

    const [showTies, setShowTies] = useState(false);
    const [showBowties, setShowBowties] = useState(false);
    const [showAccessories, setShowAccessories] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);
    const [mobileAnimation, setMobileAnimation] = useState("close");

    function toggleMobileNav() {
        setMobileAnimation(prev => prev == "close" ? "open" : "close");

        setMobileNav(prev => {
            return !prev ? true : 
                setTimeout(() => {
                    return false;
                }, 300);
        })
        
    }

    return ( 
        <nav className="navbar">

            {/* Desktop Links */}
            <div className="desktop-nav">

                <div className="category products">
                    <div className="ties"
                        onMouseEnter={() => setShowTies(true) }
                        onMouseLeave={() => setShowTies(false)}
                    >
                        <Link className="link" to="/neckties">Ties <KeyboardArrowDownIcon className="arrow"/> </Link>
                        {showTies &&
                            <div className="dropdown-content">
                                <div className="classic-neckties">
                                    <Link className="link" to="/neckties/classic">Classic Neckties</Link>
                                </div>
                                <div className="skinny-neckties">
                                    <Link className="link" to="/neckties/skinny">Skinny Neckties</Link>
                                </div>
                                <div className="clip-on-ties">
                                    <Link className="link" to="/neckties/clip-on">Clip-on ties</Link>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="bowties"
                        onMouseEnter={() => setShowBowties(true) }
                        onMouseLeave={() => setShowBowties(false)}
                    >
                        <Link className="link" to="/bowties">Bowties <KeyboardArrowDownIcon className="arrow"/> </Link>
                        {showBowties &&
                            <div className="dropdown-content">
                                <div className="pre-tied-bowties">
                                    <Link className="link" to="/bowties/pre-tied">Pre-tied bowties</Link>
                                </div>
                                <div className="self-tie-bowties">
                                    <Link className="link" to="/bowties/self-tie">Self-tie bowties</Link>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="accessories"
                        onMouseEnter={() => setShowAccessories(true) }
                        onMouseLeave={() => setShowAccessories(false)}
                    >
                        <Link className="link" to="/accessories">Accessories <KeyboardArrowDownIcon className="arrow"/> </Link>
                        {showAccessories &&
                            <div className="dropdown-content">
                                <div className="tie-clips">
                                    <Link className="link" to="/accessories/tie-clips">Tie Clips</Link>
                                </div>
                                <div className="scarves">
                                    <Link className="link" to="/accessories/scarves">Scarves</Link>
                                </div>
                                <div className="tie-care">
                                    <Link className="link" to="/accessories/tie-care">Tie Care</Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <div className="category title">
                    <Link className="link" to="/"><h1>Tied & True</h1></Link>
                </div>
                
                <div className="category other">
                    <div className="search">
                        <SearchOutlinedIcon/>
                    </div>
                    <div className="favorite">
                        <FavoriteBorderIcon/>
                    </div>
                    <div className="cart">
                        <ShoppingCartOutlinedIcon/>
                    </div>
                    <div className="profile">
                        <PersonOutlineIcon/>
                    </div>
                </div>
            </div>

            {/*Mobile Navbar*/}
            <div className="mobile-nav">
                    <div className="links">
                        <div className="profile">
                            <PersonOutlineIcon/>
                        </div>
                        <div className="search">
                            <SearchOutlinedIcon/>
                        </div>
                    </div>

                    <div className="title">
                        <Link className="link" to="/"><h1>Tied & True</h1></Link>
                    </div>

                    <div className="menu-button" onClick={toggleMobileNav}>
                        <MenuOutlinedIcon sx={{ width: 30, height: 30 }}/>

                        {mobileNav &&
                        <div className="mobile-products" 
                            style={{
                                animationName: mobileAnimation
                            }}
                        >
                            <div className="ties">
                                <Link className="link" to="/neckties"><h1>Ties <ChevronRightOutlinedIcon/> </h1> </Link>
                                <div className="classic-neckties subcategory">
                                    <Link className="link" to="/neckties/classic">Classic Neckties</Link>
                                </div>
                                <div className="skinny-neckties subcategory">
                                    <Link className="link" to="/neckties/skinny">Skinny Neckties</Link>
                                </div>
                                <div className="clip-on-ties subcategory">
                                    <Link className="link" to="/neckties/clip-on">Clip-on ties</Link>
                                </div>
                            </div>

                            <div className="bowties">
                            <Link className="link" to="/bowties"><h1>Bowties <ChevronRightOutlinedIcon/> </h1> </Link>
                                <div className="pre-tied-bowties subcategory">
                                    <Link className="link" to="/bowties/pre-tied">Pre-tied bowties</Link>
                                </div>
                                <div className="self-tie-bowties subcategory">
                                    <Link className="link" to="/bowties/self-tie">Self-tie bowties</Link>
                                </div>
                            </div>

                            <div className="accessories">
                                <Link className="link" to="/accessories"><h1>Accessories <ChevronRightOutlinedIcon/></h1> </Link>

                                <div className="tie-clips subcategory">
                                    <Link className="link" to="/accessories/tie-clips">Tie Clips</Link>
                                </div>
                                <div className="scarves subcategory">
                                    <Link className="link" to="/accessories/scarves">Scarves</Link>
                                </div>
                                <div className="tie-care subcategory">
                                    <Link className="link" to="/accessories/tie-care">Tie Care</Link>
                                </div>
                            </div>
                        </div>
                        }
                    </div>

                    
            </div>
        </nav>
        
    )
}