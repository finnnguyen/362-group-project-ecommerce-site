import "./Trending.css";
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { useRef, useState } from "react";

export default function Trending() {

    const listRef = useRef(null);

    function next() {
            listRef.current.scrollLeft += listRef.current.offsetWidth;
    }
    function prev() {
            listRef.current.scrollLeft -= listRef.current.offsetWidth;
    }

    return (
        <div className="trending">
            <h1>Make your first impression count</h1>
            <p>Trending styles people are choosing today:</p>

            <div className="content">
                <div className="arrow prev" onClick={prev}>
                    <ChevronLeftOutlinedIcon/>
                </div>

                <div className="trending-product-list" ref={listRef}>
                    {/* Test products, update with db values */}
                    <div className="product-card"></div>
                    <div className="product-card"></div>
                    <div className="product-card"></div>
                    <div className="product-card"></div>
                    <div className="product-card"></div>
                    <div className="product-card"></div>
                    <div className="product-card"></div>
                    <div className="product-card"></div>
                    <div className="product-card"></div>
                    <div className="product-card"></div>
                    <div className="product-card"></div>
                    <div className="product-card"></div>
                    <div className="product-card"></div>
                    <div className="product-card"></div>
                    <div className="product-card"></div>
                </div>

                <div className="arrow next" onClick={next}>
                    <ChevronRightOutlinedIcon/>
                </div>
            </div>

        </div>
    )
}