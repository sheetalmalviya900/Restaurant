import { useEffect, useState } from 'react'
import './App.css';
export default function App() {
  const [mealDb, setmealDb] = useState([])
  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])
  const [addData, setAddData] = useState([])
  const [flag, setFlag] = useState(true)
  const [sum,setSum]=useState(0)
  useEffect(() => {
    const mealData = async () => {
      let data = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      data = await data.json()
      setmealDb(data)
    }
    mealData()
  }, [])
  function resultData() {
    let newarray = []
    for (var i of mealDb.meals) {
      if (i["strCategory"] === search) {
        newarray.push(i)
      }
    }
    setSearch("")
    setResult(newarray)
  }
  return (
    <div>
      <div>
        <input placeholder='Search Your item...' value={search} onChange={(e) => {
          setSearch(e.target.value)
        }} />
        <button id="search" onClick={() => {
          setFlag(true)
          resultData()
        }}>Search</button>
        <button id="invoice" onClick={() => {
          setFlag(false)
        }}>Invoice</button>
      </div>
      {
        flag ? (() => {
          return (
            <div>
              <div id="grid">
                {
                  result.map((item, index) => {
                    return (
                      <div key={index} >
                        <img src={item.strMealThumb} alt="" />
                        <h2>{item.strMeal}</h2>
                        <h4>Rs. 50</h4>
                        <button onClick={() => {
                          setAddData([...addData, { Name: item.strMeal, Price: 50 }])
                          setSum(sum+50)
                        }} id="add">Add</button>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })() : (() => {
          return (
            <div id="Invoice">
              <div id="head">
                <h1>Invoice</h1>
                <hr/>
                <p><strong>Billed To :</strong>Really Great Company</p>
                <p><strong>PAY TO :</strong> Sheetal Malviya<br /></p>
                <p><strong>BANK:</strong> Really Great Bank</p>
                <p><strong>Account : </strong>Saving</p>
                <p><strong>BSB: </strong>00000000000</p>
              </div>
              <hr/>
              <table>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
                {
                  addData.map((item) => {
                    return (
                      <tbody>
                        <tr>
                          <td>{item.Name}</td>
                          <td>{item.Price}</td>
                        </tr>
                      </tbody>
                    )
                  })
                }
                <tr>
                  <th>Total</th>
                  <th>${sum}</th>
                </tr>
              </table>
            </div>
          )
        })()
      }
    </div>
  )
}


