import React, { useEffect } from "react";
import { Pagination, Table } from "react-bootstrap";
import TaskRow from "./TaskRow";
import { useState } from "react";
import FilterTaskTabs from "./FilterTaskTabs";
import TaskList from "./TaskList";
import MyPagination from "../ui/MyPagination";
import { fetchAllTasks } from "../../apis/taskApis";
import { useDispatch } from "react-redux";
import { setLoadingState } from "../../app/features/loadingSlice";

const AllTaskDefault = () => {
    const dispatch = useDispatch();

    const [selectedTab, setSelectedTab] = useState();
    const [taskTemplateArr, setTaskTemplateArr] = useState([]);

    const [listData, setListData] = useState();
    const [loadPage, setLoadPage] = useState(0);

    const [allTask, setAllTask] = useState([]);
    const [taskArr, setTaskArr] = useState([]);
    const [tabArr, setTabArr] = useState([
        { tabLabel: "All Task", isSelected: true, totalTask: 0 },
        { tabLabel: "Completed", isSelected: false, totalTask: 0 },
        { tabLabel: "Pending", isSelected: false, totalTask: 0 },
        { tabLabel: "HIGH", isSelected: false, totalTask: 0 },
        { tabLabel: "MEDIUM", isSelected: false, totalTask: 0 },
        { tabLabel: "NORMAL", isSelected: false, totalTask: 0 },
    ]);

    // Update tasks and tab counts when allTask changes
    useEffect(() => {
        (async () => {
            dispatch(setLoadingState(true));
            const { data, error } = await fetchAllTasks(loadPage);
            dispatch(setLoadingState(false));
            console.log(data, data.content);
            setListData(data);
            setAllTask(data?.content);
            const newTabArr = tabArr.map((tab) => filterTask(tab, data?.content));
            setTabArr(newTabArr);
            setTaskArr(data?.content); // Initially display all tasks
        })();
    }, [loadPage]);

    // Filter tasks based on the selected tab
    const filterTask = (tab, allTask) => {
        console.log(allTask)
        if (tab.tabLabel === "All Task") {
            tab.totalTask = allTask.length;
        } else if (tab.tabLabel === "Completed") {
            tab.totalTask = allTask.filter((ele) => ele.isCompleted).length;
        } else if (tab.tabLabel === "Pending") {
            tab.totalTask = allTask.filter((ele) => !ele.isCompleted).length;
        } else if (["HIGH", "MEDIUM", "NORMAL"].includes(tab.tabLabel)) {
            tab.totalTask = allTask.filter(
                (ele) => ele.taskPriority === tab.tabLabel
            ).length;
        }
        return tab;
    };

    // Handle tab click to filter tasks
    const handleTabClick = (tIndex) => {
        const newTabArr = tabArr.map((tab, index) => {
            tab.isSelected = index === tIndex;
            return tab;
        });

        setTabArr(newTabArr);
        setSelectedTab(tIndex);

        const selectedTab = newTabArr[tIndex];
        if (selectedTab.tabLabel === "All Task") {
            setTaskArr(allTask);
        } else if (selectedTab.tabLabel === "Completed") {
            setTaskArr(allTask.filter((ele) => ele.isCompleted));
        } else if (selectedTab.tabLabel === "Pending") {
            setTaskArr(allTask.filter((ele) => !ele.isCompleted));
        } else if (
            ["HIGH", "MEDIUM", "NORMAL"].includes(selectedTab.tabLabel)
        ) {
            setTaskArr(
                allTask.filter(
                    (ele) => ele.taskPriority === selectedTab.tabLabel
                )
            );
        }
    };

    return (
        <>
            <div className="border-bottom  my-3 pb-2">
                <h2>All Tasks</h2>
                <p>View all of your task here</p>
            </div>
            <div className="w-100 overflow-auto">
                <FilterTaskTabs
                    handleTabClick={handleTabClick}
                    tabArr={tabArr}
                />
            </div>
            <div className="w-100  overflow-y-auto">
                {taskArr.length > 0 ? (
                    <>
                        <TaskList taskArr={taskArr} />
                        <MyPagination listData={listData} loadPage={loadPage} setLoadPage={setLoadPage} />
                    </>
                ) : (
                    <p className="px-4">No task!</p>
                )}
            </div>
        </>
    );
};

export default AllTaskDefault;
