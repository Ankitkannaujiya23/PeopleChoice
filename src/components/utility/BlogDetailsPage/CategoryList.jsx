import React from 'react'
import { Link } from 'react-router-dom'
import {RxDot} from 'react-icons/rx'

const CategoryList = () => {
    return (
        <div>
            <div className="list">
                <ul>
                    <li >
                        <Link className='flex items-center'><RxDot /> <p className='px-3 text-gray-700 hover:scale-125 hover:text-[#f53855] transition-all'>Cate 1</p></Link>
                    </li>
                    <li >
                        <Link className='flex items-center'><RxDot /> <p className='px-3 text-gray-700 hover:scale-125 hover:text-[#f53855] transition-all'>Cate 1</p></Link>
                    </li>
                    <li >
                        <Link className='flex items-center'><RxDot /> <p className='px-3 text-gray-700 hover:scale-125 hover:text-[#f53855] transition-all'>Cate 1</p></Link>
                    </li>
                    <li >
                        <Link className='flex items-center'><RxDot /> <p className='px-3 text-gray-700 hover:scale-125 hover:text-[#f53855] transition-all'>Cate 1</p></Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CategoryList
