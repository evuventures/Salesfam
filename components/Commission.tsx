import React, { useEffect, useState } from "react"

export default function Earnings(props) {
  const projectId = props.id
  const [data, setData] = useState()

  useEffect(() => {
    fetch(`/api/commission?id=${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.commission)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }, [projectId])
  return <div>{data && "$" + data}</div>
}
