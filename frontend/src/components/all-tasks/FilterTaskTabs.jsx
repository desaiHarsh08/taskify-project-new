/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const FilterTaskTabs = ({ handleTabClick, tabArr }) => {
    return (
        <div className="my-3 w-100">
            <ul
                className="d-flex overflow-auto gap-5 border-bottom"
                style={{ minWidth: "800px" }}
            >
                {tabArr.map((tab, index) => (
                    <li
                        key={`tab-${index}`}
                        onClick={() => handleTabClick(index)}
                        className={`pb-2 list-group-item d-flex gap-2  ${
                            tab.isSelected
                                ? "border-bottom border-primary text-primary"
                                : "border-transparent"
                        }`}
                        style={{ cursor: "pointer" }}
                    >
                        <p>{tab.tabLabel}</p>
                        <p
                            className="border px-2 rounded"
                            style={{ fontSize: "12px" }}
                        >
                            {tab.totalTask}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterTaskTabs;
