import React from 'react'
import { useLocation } from "react-router-dom";
export default function ViewData(props) {
    const location = useLocation();
    const {data} = location?.state;
  return (
    <div>ViewData</div>
  )
}
