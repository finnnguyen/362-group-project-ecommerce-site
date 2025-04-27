import { useParams, Navigate, useSearchParams, Link, useNavigate } from "react-router-dom";
import { isValidProduct } from "../../stores/allowedCategories";
import { allowedCategories } from "../../stores/allowedCategories";
import useFetch  from "../../hooks/useFetch";
import "./Products.scss";
import { useState, useEffect, useRef } from "react";

export default function Products() {
    const navigate = useNavigate();
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const formRef = useRef(null);
    const [placeholders, setPlaceholders] = useState(0);

    // State for filters
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sort, setSort] = useState(null);
    const [selectedSubCats, setSelectedSubCats] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    if (!isValidProduct(category)) return <Navigate to="/notfound" />;

    // Get current filter values from URL
    const currentTypes = searchParams.getAll("type");
    const currentColors = searchParams.getAll("color");
    const currentSort = searchParams.get("sort");

    // Available color options
    const colors = [
        'black', 'navy', 'burgundy', 'gray', 'brown', 
        'blue', 'red', 'green', 'purple', 'pink',
        'silver', 'gold', 'white', 'turquoise', 'multicolored'
    ];

    // Build product query
    const productQuery = `/products?filters[categories][title][$eq]=${category}`;
    const typeFilters = selectedSubCats.length > 0 
        ? selectedSubCats.map(type => `&filters[sub_categories][title][$in]=${type}`).join('')
        : '';
    const colorFilters = selectedColors.length > 0 
        ? selectedColors.map(color => `&filters[color][$in]=${color}`).join('')
        : '';
    const priceFilter = `&filters[price][$lte]=${maxPrice}`;
    const sortFilter = sort ? `&sort=price:${sort}` : '';
    const populateQuery = `&populate=*`;
    
    const { data: products, loading, error } = useFetch(
        productQuery + typeFilters + colorFilters + priceFilter + sortFilter + populateQuery
    );

    useEffect(() => {
        // Create loading placeholders
        const rows = Math.floor(window.innerHeight / 250);
        const cols = Math.floor(window.innerWidth / 250);
        const placeholderAmnt = rows * cols;
        const placeholderArr = [];
        
        for (let i = 0; i < placeholderAmnt; i++) {
            placeholderArr.push(
                <div key={i} className="placeholder-card">
                    <div className="loader"></div>
                </div>
            );
        }
        setPlaceholders(placeholderArr);
    }, []);

    const handleSubCatChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        const newSubCats = isChecked
            ? [...selectedSubCats, value]
            : selectedSubCats.filter(item => item !== value);

        setSelectedSubCats(newSubCats);
        updateURL({ types: newSubCats });
    };

    const handleColorChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        const newColors = isChecked
            ? [...selectedColors, value]
            : selectedColors.filter(item => item !== value);

        setSelectedColors(newColors);
        updateURL({ colors: newColors });
    };

    const handleSortChange = (value) => {
        setSort(value);
        updateURL({ sort: value });
    };

    const updateURL = ({ types = selectedSubCats, colors = selectedColors, sort = null }) => {
        const params = new URLSearchParams();
        
        // Add types to URL
        types.forEach(type => params.append('type', type));
        
        // Add colors to URL
        colors.forEach(color => params.append('color', color));
        
        // Add sort to URL
        if (sort) params.set('sort', sort);
        
        navigate(`?${params.toString()}`, { replace: true });
    };

    function clearFilters() {
        setSelectedSubCats([]);
        setSelectedColors([]);
        setSort(null);
        setMaxPrice(1000);
        navigate(`/${category}`);
    }

    return (
        <div className="product-page">
            <div className="product-sidebar">
                <h2>Filter by:</h2>
                <button onClick={clearFilters}>Clear all</button>
                
                <form ref={formRef}>
                    <div className="filter-section">
                        <h3>Product Type</h3>
                        {allowedCategories[category]?.map((subcat) => (
                            <div key={`subcategory-${subcat}`} className="filter-option">
                                <input
                                    type="checkbox"
                                    name="type"
                                    id={`subcategory-${subcat}`}
                                    value={subcat}
                                    onChange={handleSubCatChange}
                                    checked={selectedSubCats.includes(subcat)}
                                />
                                <label htmlFor={`subcategory-${subcat}`}>
                                    {subcat[0].toUpperCase() + subcat.slice(1)}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="filter-section">
                        <h3>Colors</h3>
                        {colors.map((color) => (
                            <div key={`color-${color}`} className="filter-option">
                                <input
                                    type="checkbox"
                                    name="color"
                                    id={`color-${color}`}
                                    value={color}
                                    onChange={handleColorChange}
                                    checked={selectedColors.includes(color)}
                                />
                                <label htmlFor={`color-${color}`}>
                                    {color[0].toUpperCase() + color.slice(1)}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="filter-section">
                        <h3>Price Range</h3>
                        <div className="price-range">
                            <span>0</span>
                            <input
                                type="range"
                                min={0}
                                max={1000}
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                            <span>${maxPrice}</span>
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3>Sort by</h3>
                        <div className="filter-option">
                            <input
                                type="radio"
                                id="asc"
                                name="sort"
                                value="asc"
                                onChange={() => handleSortChange("asc")}
                                checked={sort === "asc"}
                            />
                            <label htmlFor="asc">Price (Lowest first)</label>
                        </div>
                        <div className="filter-option">
                            <input
                                type="radio"
                                id="desc"
                                name="sort"
                                value="desc"
                                onChange={() => handleSortChange("desc")}
                                checked={sort === "desc"}
                            />
                            <label htmlFor="desc">Price (Highest first)</label>
                        </div>
                    </div>
                </form>
            </div>

            <div className="product-page-content">
                <h1>{category[0].toUpperCase() + category.slice(1)}</h1>
                
                {loading ? (
                    <div className="placeholder-list">
                        {placeholders?.map((placeholder) => placeholder)}
                    </div>
                ) : error ? (
                    <p className="error-message">{error.message || "Error loading products"}</p>
                ) : (
                    <div className="product-results">
                        <p className="results-count">{products?.length || 0} Results</p>
                        <div className="product-grid">
                            {products?.map((product) => {
                                const productPath = product.sub_categories[0]
                                    ? `../${category}/${product.sub_categories[0].title}/${product.documentId}`
                                    : `../${category}/${product.documentId}`;

                                return (
                                    <div key={product.id} className="product-card">
                                        <Link 
                                            to={productPath} 
                                            className="product-link"
                                            onClick={() => window.scrollTo(0, 0)}
                                        >
                                            <img 
                                                src={product?.img?.url} 
                                                alt={product?.img?.name || product.title}
                                                className="product-image"
                                            />
                                            <div className="product-info">
                                                <h2 className="product-title">{product.title}</h2>
                                                <p className="product-price">${product.price}</p>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}