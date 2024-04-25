function NavBar(props) {
  const setNewActiveCategory = (index) => {
    props.setNewActiveCategory(index);
  }

  const LiStyle = 'inline p-4 font-black uppercase cursor-pointer bg-grey-lighter hover:bg-grey-light'

    return (
      <ul className='flex justify-center mb-0 border-b-4 list-reset'>
        <li className={LiStyle + 
          (props.activeCategory === '' || props.activeCategory === undefined ? ' bg-blue-500' : ' bg-grey-light')}
          onClick={() => setNewActiveCategory('')}>ALL</li>
        {props.categoriesList
          ? props.categoriesList.map((value, index) => {
              return (
                <li
                  className={LiStyle + 
                    (props.activeCategory === value ? ' bg-blue-500' : ' bg-grey-light')}
                  key={index}
                  onClick={() => setNewActiveCategory(value)}>
                  {value}
                </li>
              )
            })
          : <li>No categories</li>
        }
        <li
          className={LiStyle}
          onClick={() => props.showAddCat()}>
          ➕
        </li>
      </ul>
    )
  }
  
  export default NavBar