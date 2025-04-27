import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { allowedCategories } from '../../stores/allowedCategories';
import "./NavBar.scss";

export default function NavBar() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const searchRef = useRef(null);
    const [toggleDropdown, setToggleDropdown] = useState(() => {
        return Object.keys(allowedCategories).reduce((acc, cat) => {
            acc[cat] = false;
            return acc;
        }, {});
    });
    const [mobileNav, setMobileNav] = useState(false);
    const [mobileAnimation, setMobileAnimation] = useState("close");

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setShowSearch(false);
        }
    };

    const toggleMobileNav = () => {
        setMobileAnimation(prev => prev === "close" ? "open" : "close");
        setMobileNav(prev => !prev);
    };

    const toggleCategory = (category) => {
        setToggleDropdown(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

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
                    {navigationLinks.map(link => (
                        <div key={link.id} className={link.category} 
                            onMouseEnter={() => toggleCategory(link.category)}
                            onMouseLeave={() => toggleCategory(link.category)}
                        >
                            <Link className="link" to={link.category}> 
                                {link.category[0].toUpperCase() + link.category.slice(1)}
                                <KeyboardArrowDownIcon className="arrow"/>
                            </Link>

                            {toggleDropdown[link.category] && (
                                <div className="dropdown-content">
                                    {link.subcategories.map(subcat => (
                                        <div key={`${link.id}-${subcat}`} className={`subcategory ${link.category}-${subcat}`}>
                                            <Link className="link" to={`${link.category}?type=${subcat}`}>
                                                {subcat[0].toUpperCase() + subcat.slice(1)}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="category title">
                    <Link className="link" to="/"><h1>Tied & True</h1></Link>
                </div>
                
                <div className="category other" ref={searchRef}>
                    {showSearch ? (
                        <form onSubmit={handleSearch} className="search-form">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                                autoFocus
                            />
                            <button type="submit" className="search-submit">
                                <SearchOutlinedIcon />
                            </button>
                            <button 
                                type="button" 
                                className="search-close"
                                onClick={() => setShowSearch(false)}
                            >
                                <CloseIcon />
                            </button>
                        </form>
                    ) : (
                        <div className="search-icon" onClick={() => setShowSearch(true)}>
                            <SearchOutlinedIcon/>
                        </div>
                    )}
                    <Link to="profile" className="link profile">
                        <PersonOutlineIcon/>
                    </Link>
                    <div className="favorite">
                        <FavoriteBorderIcon/>
                    </div>
                    <div className="cart">
                        <ShoppingCartOutlinedIcon/>
                        <span>0</span>
                    </div>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="mobile-nav">
                <div className="links">
                    <Link to="profile" className="link profile">
                        <PersonOutlineIcon/>
                    </Link>
                    <div className="search-icon" onClick={() => setShowSearch(true)}>
                        <SearchOutlinedIcon/>
                    </div>
                </div>

                <div className="title">
                    <Link className="link" to="/"><h1>Tied & True</h1></Link>
                </div>

                <div className="menu-button" onClick={toggleMobileNav}>
                    <MenuOutlinedIcon sx={{ width: 30, height: 30 }}/>
                </div>

                {mobileNav && (
                    <div className="mobile-products" style={{ animationName: mobileAnimation }}>
                        {showSearch && (
                            <form onSubmit={handleSearch} className="mobile-search-form">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                    autoFocus
                                />
                                <button type="submit" className="search-submit">
                                    <SearchOutlinedIcon />
                                </button>
                                <button 
                                    type="button" 
                                    className="search-close"
                                    onClick={() => setShowSearch(false)}
                                >
                                    <CloseIcon />
                                </button>
                            </form>
                        )}
                        {navigationLinks.map(link => (
                            <div key={link.id} className={link.category}>
                                <Link className="link" to={`/${link.category}`}>
                                    <h1>
                                        {link.category[0].toUpperCase() + link.category.slice(1)}
                                        <ChevronRightOutlinedIcon/>
                                    </h1>
                                </Link>
                                {link.subcategories.map(subcat => (
                                    <div key={subcat} className="subcategory">
                                        <Link className="link" to={`/${link.category}?type=${subcat}`}>
                                            {subcat[0].toUpperCase() + subcat.slice(1)}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    )
}