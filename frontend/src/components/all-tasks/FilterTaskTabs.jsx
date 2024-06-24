import React from 'react'

const FilterTaskTabs = ({ handleTabClick, setSelectedTab, tabArr, setTabArr }) => {
    return (
        <div className='my-3 w-100'>
            <ul className='d-flex overflow-auto gap-5 border-bottom' style={{ minWidth: "800px" }}>
                {tabArr.map((tab, index) => (
                    <li 
                        onClick={() => handleTabClick(index)} 
                        className={`pb-2 list-group-item d-flex gap-2  ${tab.isSelected ? 'border-bottom border-primary text-primary' : 'border-transparent'}`} 
                        style={{ cursor: "pointer" }}
                    >
                        <p>{tab.tabLabel}</p>
                        <p className='border px-2 rounded' style={{fontSize: "12px"}}>{tab.totalTask}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FilterTaskTabs