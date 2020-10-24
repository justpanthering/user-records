import React, { useState, useContext, createContext, useEffect } from 'react';

import Axios from 'axios';

// CONTEXTS
const DataContext = createContext();
const UpdateDataContext = createContext();
const SortDataContext = createContext();
const SearchDataContext = createContext();

// CUSTOM HOOKS TO USE CONTEXT
export const useData = () => {
  return useContext(DataContext);
}

export const useDataUpdate = () => {
  return useContext(UpdateDataContext);
}

export const useDataSort = () => {
  return useContext(SortDataContext);
}

export const useDataSearch = () => {
  return useContext(SearchDataContext);
}

// Provider
export const DataProvider = ({ children }) => {

  const [data, setData] = useState({
    data: [],
    subData: [],
    sortType: null,
    error: null,
    query: ""
  });


  // HANDLERS
  const updateDataHandler = (newData) => {
    setData({
      ...data,
      data: newData
    })
  }

  const sortDataHandler = (field) => {

    setData(data.subData.length === 0
      ? {
        ...data,
        data: sortDataHelper(data.data, data.sortType, field),
        sortType: data.sortType === null || data.sortType === "descending"
          ? "ascending"
          : "descending"
      }
      : {
        ...data,
        subData: sortDataHelper(data.subData, data.sortType, field),
        sortType: data.sortType === null || data.sortType === "descending"
          ? "ascending"
          : "descending"
      })
  }
  const sortDataHelper = (dataToSort, type, field) => {
    dataToSort.sort((a, b) => {
      if (type === null || type === "descending") {
        if (a[field] < b[field])
          return -1;
        if (a[field] > b[field])
          return 1;
        return 0;
      }
      else {
        if (a[field] > b[field])
          return -1;
        if (a[field] < b[field])
          return 1;
        return 0;
      }
    })
    return dataToSort;
  }

  const searchDataHandler = (query) => {
    if (query === "") {
      setData({
        ...data,
        subData: []
      })
    }
    else {
      const subData = data.data.filter(user => {
        if (user.first_name.toLowerCase().includes(query.toLowerCase()) || user.last_name.toLowerCase().includes(query.toLowerCase())) {
          return user;
        }
      })
      setData({
        ...data,
        subData: subData,
        query: query
      })
    }
  }

  // API call after first render
  useEffect(() => {
    Axios.get("https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json")
      .then(response => {
        // console.log(response.data);
        setData({
          ...data,
          data: response.data,
          error: null
        });
      })
      .catch(error => {
        console.log(error);
        setData({
          ...data,
          error: error.message
        })
      })
  }, [])

  // WRAP ALL COMPONENTS IN CONTEXT
  return (
    <DataContext.Provider
      value={data}>
      <UpdateDataContext.Provider
        value={updateDataHandler}>
        <SortDataContext.Provider
          value={sortDataHandler}>
          <SearchDataContext.Provider
            value={searchDataHandler}>
            {children}
          </SearchDataContext.Provider>
        </SortDataContext.Provider>
      </UpdateDataContext.Provider>
    </DataContext.Provider>
  )
}