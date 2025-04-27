import React from 'react'
import "./FeaturedProduct.scss"
const FeaturedProdut = ({type}) => {
    return (
        <div className='featuredProduct'>
            <div className="top">
                <h1>{type} product</h1>
                </div>
                <div className="bottom">
                    {data.map(item=>(
                        <Card item={item} key={item.id}/>
                    ))}

                </div>
            FeaturedProduct</div>
    )
}

export default FeaturedProdcut