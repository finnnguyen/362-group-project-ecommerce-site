import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

import "./NavBar.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { allowedCategories } from '../../stores/allowedCategories';

export default function NavBar() {

    const [toggleDropdown, setToggleDropdown] = useState(() => {
        return Object.keys(allowedCategories).map((cat) => {
            return [cat, false];
        });
    })

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

    function toggleCategory(category) {
        setToggleDropdown(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    }

    let id = 0;
    const navigationLinks = Object.keys(allowedCategories).map(cat => {
        return {
            id: id++,
            category: cat,
            subcategories: allowedCategories[cat]
        };
    });

    return ( 
        <nav className="navbar">

            {/* Desktop Links */}
            <div className="desktop-nav">

                <div className="category products">

                    {
                        navigationLinks.map(link => {
                            return (
                                <div key={link.id} className={link.category} 
                                    onMouseEnter={() => toggleCategory(link.category)}
                                    onMouseLeave={() => toggleCategory(link.category)}
                                >
                                    <Link className="link" to={link.category}> 
                                        {link.category[0].toUpperCase() + link.category.slice(1)}
                                        <KeyboardArrowDownIcon className="arrow"/>
                                    </Link>

                                    {toggleDropdown[link.category] &&
                                        <div className="dropdown-content">
                                            {   
                                                link.subcategories.map(subcat => 
                                                    <div key={link.id + "-" + subcat} className={`subcategory ${link.category + "-" + subcat}`}>
                                                        <Link className="link" to={link.category + "?type=" + subcat}>
                                                            {
                                                                subcat[0].toUpperCase() + subcat.slice(1)
                                                            }
                                                        </Link>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
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