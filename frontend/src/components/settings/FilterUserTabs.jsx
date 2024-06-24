import React from 'react'

const FilterUserTabs = ({ handleTabClick, setSelectedTab, tabArr, setTabArr }) => {
    return (
        <div className='my-3 overflow-auto' style={{minWidth: "1300px"}}>
            <ul className='p-0 d-flex gap-5 border-bottom' style={{ minWidth: "1128px" }}>
                {tabArr.map((tab, index) => (
                    <li 
                        onClick={() => handleTabClick(index)} 
                        className={`pb-2 list-group-item d-flex gap-2  ${tab.isSelected ? 'fw-bold border-bottom border-primary text-primary' : 'border-transparent'}`} 
                        style={{ cursor: "pointer" }}
                    >
                        <p>{tab.tabLabel}</p>
                        <p className='border px-2 rounded' style={{fontSize: "12px"}}>{tab.totalUsers}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FilterUserTabs