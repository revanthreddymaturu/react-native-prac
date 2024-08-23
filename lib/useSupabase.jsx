import { View, Text } from 'react-native'
import React, { useEffect,useState } from 'react'

const useSupabase = (fn) => {
  
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const fetchData = async () => {
    const data = await fn();
    setData(data);

    setLoading(false);
  }
useEffect(() => {
  fetchData();
}, []);

const reFetch=()=>fetchData()

return {data,reFetch};
}


export default useSupabase