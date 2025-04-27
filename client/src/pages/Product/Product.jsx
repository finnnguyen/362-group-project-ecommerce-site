import { useParams, Navigate } from "react-router-dom";
import { isValidProduct } from "../../stores/allowedCategories";
import { useState } from "react";
import  useFetch  from "../../hooks/useFetch";
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import "./Product.css";

export default function Product() {
    const { category, subcategory, id } = useParams();
    
    // Validate product category first
    if (!isValidProduct(category, subcategory)) {
        return <Navigate to="/notfound" />;
    }

    const [quantity, setQuantity] = useState(1); // Start with 1 instead of 0
    const query = `/products?filters[documentId][$eq]=${id}&populate=*`;
    const { data: products, loading, error } = useFetch(query);
    const product = products?.[0];

    const handleQuantityChange = (operation) => {
        setQuantity(prev => {
            if (operation === 'decrement') {
                return Math.max(1, prev - 1); // Minimum 1
            }
            if (operation === 'increment') {
                return product?.stock ? Math.min(product.stock, prev + 1) : prev;
            }
            return prev;
        });
    };

    const renderStars = (rating = 0) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<StarOutlinedIcon key={i} fontSize="small" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<StarHalfOutlinedIcon key={i} fontSize="small" />);
            } else {
                stars.push(<StarOutlineOutlinedIcon key={i} fontSize="small" />);
            }
        }
        
        return stars;
    };

    // Handle loading and error states
    if (loading) return <div className="loading-spinner">Loading...</div>;
    if (error) return <div className="error-message">Error loading product details</div>;
    if (!product) return <Navigate to="/notfound" />;

    return (
        <div className="product-page">
            <div className="product-details-container">
                <div className="product-image-wrapper">
                    <img 
                        src={product.img?.url || '/images/placeholder-product.jpg'} 
                        alt={product.img?.name || product.title}
                        className="product-image"
                        onError={(e) => {
                            e.target.src = '/images/placeholder-product.jpg';
                        }}
                    />
                </div>

                <div className="product-info">
                    <h1 className="product-title">{product.title}</h1>
                    
                    <div className="product-rating">
                        <div className="star-rating">
                            {renderStars(product.avgRating || 0)}
                        </div>
                        <a href="#reviews" className="review-count">
                            {product.ratings?.length || 0} review(s)
                        </a>
                    </div>

                    <div className="product-actions">
                        <select 
                            className="size-selector"
                            defaultValue={product.sub_categories[0]?.title}
                        >
                            {product.sub_categories?.map(subcat => (
                                <option key={subcat.id} value={subcat.title}>
                                    {subcat.title.charAt(0).toUpperCase() + subcat.title.slice(1)}
                                </option>
                            ))}
                        </select>

                        <p className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </p>

                        <div className="quantity-selector">
                            <button
                                type="button"
                                className="quantity-btn"
                                onClick={() => handleQuantityChange('decrement')}
                                disabled={quantity <= 1}
                                aria-label="Decrease quantity"
                            >
                                -
                            </button>
                            <span className="quantity-display">{quantity}</span>
                            <button
                                type="button"
                                className="quantity-btn"
                                onClick={() => handleQuantityChange('increment')}
                                disabled={!product.stock || quantity >= product.stock}
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>

                        <button
                            type="button"
                            className="add-to-cart-btn"
                            disabled={!product.stock}
                            onClick={() => {
                                // Add to cart logic here
                            }}
                        >
                            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>

            <section className="product-description">
                <h2>Product Details</h2>
                <p>{product.description || 'No description available.'}</p>
            </section>

            <section id="reviews" className="product-reviews">
                <h2>Customer Reviews</h2>
                {/* Reviews component would go here */}
            </section>
        </div>
    );
}