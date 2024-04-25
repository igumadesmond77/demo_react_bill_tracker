import { useState, useEffect } from 'react'
import AddCategory from './Components/AddCategory' 
import NavBar from './Components/NavBar'
import BillsTable from './Components/BillsTable'
import AddBill from './Components/AddBill'


function App() {
  const [shouldShowAddCategory, setShouldShowAddCategory] = useState(false);
  const [categories,  setCategories] = useState([]);
  const [bills, setBills] = useState([]);
  const [shouldShowAddBill, setShouldShowAddBill] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    const categoriesInLocalStorage = JSON.parse(localStorage.getItem('categories'));
    const billsInLocalStorage = JSON.parse(localStorage.getItem('bills'));
    // console.log(categoriesInLocalStorage);
      setCategories(categoriesInLocalStorage);
      setBills(billsInLocalStorage);
      if(!categoriesInLocalStorage) {
      setShouldShowAddCategory(true);
      }
      if(!billsInLocalStorage) {
        setShouldShowAddBill(true);
      }
  }, [])

  const appendCategory = (category) => {
    const updatedCategories = [...(categories || []), category];
    setCategories(updatedCategories);
    setShouldShowAddCategory(false);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    console.log(categories);
  }

  const showAddCategory = () => {
    setShouldShowAddCategory(true);
  }

  const addBill = (amount, category, date) => {
    const bill = {amount, category, date};
    const updatedBills = [...(bills || []), bill];
    setBills(updatedBills);
    setShouldShowAddBill(false);
    localStorage.setItem('bills', JSON.stringify(updatedBills));
  }

  const showAddBill = () => {
    setShouldShowAddBill(true);
  } 

  const removeBill = (index) => {
    let updatedBills = [...bills];
    updatedBills = updatedBills.slice(0, index).concat(updatedBills.slice(index + 1, updatedBills.length));
    setBills(updatedBills);
    localStorage.setItem('bills', JSON.stringify(updatedBills));
  }

  const activeBills = () => {
    return bills ?. filter(bill =>
      activeCategory ? bill.category === activeCategory : true
    ).sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1);
  }

  const setNewActiveCategory = (index) => {
    setActiveCategory(index);
  }

  return (
      <div className='App'>
        { shouldShowAddCategory ?
          (<AddCategory onSubmit={appendCategory} />) 
          : shouldShowAddBill ? 
          (<AddBill onSubmit={addBill} categories={categories} /> ) 
          : (
            <div>
              <NavBar 
                categoriesList={categories}  
                showAddCat={showAddCategory}
                activeCategory={activeCategory}
                setNewActiveCategory={setNewActiveCategory}
              />
              <div className='container flex'>
                <BillsTable bills={activeBills()} showAddBill={showAddBill} removeBill={removeBill}/>
              </div>
            </div>
            )
        } 
      </div>
  )
}

export default App
