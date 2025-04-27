import "./Trending.css";
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { useRef, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";

export default function Trending() {
    const query = `/products?filters[type][$eq]=featured&sort[0]=publishedAt:desc&pagination[pageSize]=10&populate=*`;
    const { data: products, loading, error } = useFetch(query);
    const listRef = useRef(null);

    const next = () => {
        if (listRef.current) {
            listRef.current.scrollLeft += listRef.current.offsetWidth;
        }
    };

    const prev = () => {
        if (listRef.current) {
            listRef.current.scrollLeft -= listRef.current.offsetWidth;
        }
    };

    if (loading) return <div className="loading">Loading trending products...</div>;
    if (error) return <div className="error">Error loading products: {error.message}</div>;
    if (!products?.length) return <div className="empty">No trending products found</div>;

    return (
        <div className="trending">
            <h1>Make your first impression count</h1>
            <p>Trending styles people are choosing today:</p>

            <div className="content">
                <button className="arrow prev" onClick={prev} aria-label="Previous products">
                    <ChevronLeftOutlinedIcon />
                </button>

                <div className="trending-product-list" ref={listRef}>
                    {products.map(product => (
                        <Link 
                            to={`${product.categories[0]?.title}/${product?.documentId}`} 
                            key={product.id} 
                            className="link product-card"
                        >
                            <div className="img">
                                <img 
                                    src={product?.img?.url} 
                                    alt={product?.img?.title || product?.title} 
                                    onError={(e) => {
                                        e.target.src = '/images/placeholder-product.jpg';
                                    }}
                                />
                            </div>
                            <p>{product?.title}</p>
                        </Link>
                    ))}
                </div>

                <button className="arrow next" onClick={next} aria-label="Next products">
                    <ChevronRightOutlinedIcon />
                </button>
            </div>
        </div>
    );
}