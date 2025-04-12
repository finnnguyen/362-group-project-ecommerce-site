import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import "./navBar.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';

let bowTieDropdown = false;
let accessoryDropdown = false;

export default function navBar() {

    const [showTies, setShowTies] = useState(false);
    const [showBowties, setShowBowties] = useState(false);
    const [showAccessories, setShowAccessories] = useState(false);

    return (
        <div className="navbar">

            <div className="category products">

                <div className="ties"
                    onMouseEnter={() => setShowTies(true) }
                    onMouseLeave={() => setShowTies(false)}
                >
                    <Link className="link" to="/neckties">Ties</Link>

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
                    <Link className="link" to="/bowties">Bowties</Link>

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
                    <Link className="link" to="/accessories">Accessories</Link>

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
        
    )
}