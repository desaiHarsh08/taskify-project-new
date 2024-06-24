import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import UserRow from './UserRow'
import FilterUserTabs from './FilterUserTabs';
import { updateUser } from '../../apis/authApis';

const UserList = ({ allUsers, setAllUsers }) => {
    const [selectedTab, setSelectedTab] = useState();
    const [usersArr, setUsersArr] = useState([]);
    const [tabArr, setTabArr] = useState([
        { tabLabel: "All User", isSelected: true, totalUsers: 0 },
        { tabLabel: "ADMIN", isSelected: false, totalUsers: 0 },
        { tabLabel: "OPERATOR", isSelected: false, totalUsers: 0 },
        { tabLabel: "SALES", isSelected: false, totalUsers: 0 },
        { tabLabel: "MARKETING", isSelected: false, totalUsers: 0 },
        { tabLabel: "ACCOUNTS", isSelected: false, totalUsers: 0 },
        { tabLabel: "DISPATCH", isSelected: false, totalUsers: 0 },
        { tabLabel: "TECHNICIAN", isSelected: false, totalUsers: 0 },
        { tabLabel: "SURVEYOR", isSelected: false, totalUsers: 0 },
    ]);

    // Update Users and tab counts when allUser changes
    useEffect(() => {
        const newTabArr = tabArr.map(tab => filterUser(tab, allUsers));
        setTabArr(newTabArr);
        setUsersArr(allUsers); // Initially display all Users

    }, [allUsers]);

    // Filter Users based on the selected tab
    const filterUser = (tab, allUsersArr) => {
        if (tab.tabLabel === "All User") {
            tab.totalUsers = allUsersArr.length;
        }
        else {
            const newUsersArr = allUsersArr.filter((user) => {
                if (user?.roles.includes(tab.tabLabel)) {
                    return user;
                }
            })
            tab.totalUsers = newUsersArr.length;
        }

        return tab;
    };

    // Handle tab click to filter Users
    const handleTabClick = (tIndex) => {
        const newTabArr = tabArr.map((tab, index) => {
            tab.isSelected = index === tIndex;
            return tab;
        });

        setTabArr(newTabArr);
        setSelectedTab(tIndex);

        const selectedTab = newTabArr[tIndex];
        if (selectedTab.tabLabel === "All User") {
            setUsersArr(allUsers);
        }
        else {
            setUsersArr(
                allUsers.filter((user) => {
                    if (user?.roles.includes(selectedTab.tabLabel)) {
                        return user;
                    }
                })
            );
        }
    };

    // Handle change user details
    const handleChangeUser = (index, updatedUser) => {
        const newUsersArr = [...usersArr];
        newUsersArr[index] = updatedUser;
        setUsersArr(newUsersArr);
    }

    // Handle change user details
    const handleSaveUser = async (updatedUser) => {
        const { data, error } = await updateUser(updatedUser);
        if (data) {
            console.log("Updated");
            const newAllUsers = allUsers.map((user) => {
                if (user.id === updatedUser.id) {
                    return updatedUser;
                }
                return user;
            })

            setAllUsers(newAllUsers);
        }
    }

    return (
        <div style={{ width: "100%", overflow: "auto" }}>
            <div className='border-bottom my-3 pb-2'>
                <h2>Users</h2>
                <p>All users</p>
            </div>
            <div className='w-100 overflow-auto'>
            <FilterUserTabs
                handleTabClick={handleTabClick}
                setSelectedTab={setSelectedTab}
                setTabArr={setTabArr}
                tabArr={tabArr}
                />
                </div>
            <div className="w-100 overflow-auto">
                <Table bordered  style={{ minWidth: "1245px" }}>
                    <thead>
                        <tr className='text-center'>
                            <th className='bg-body-secondary' style={{ width: "5%" }}>Sr. No.</th>
                            <th className='bg-body-secondary' style={{ width: "15%" }}>Name</th>
                            <th className='bg-body-secondary' style={{ width: "15%" }}>Department</th>
                            <th className='bg-body-secondary' style={{ width: "15%" }}>Email</th>
                            <th className='bg-body-secondary' style={{ width: "10%" }}>Phone</th>
                            <th className='bg-body-secondary' style={{ width: "10%" }}>Disabled</th>
                            <th className='bg-body-secondary' style={{ width: "10%" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersArr.map((user, index) => (
                            <UserRow
                                key={`user-${index}`}
                                user={user}
                                index={index}
                                handleChangeUser={handleChangeUser}
                                handleSaveUser={handleSaveUser}
                            />
                        ))}
                    </tbody>
                </Table>

            </div>
        </div>
    )
}

export default UserList