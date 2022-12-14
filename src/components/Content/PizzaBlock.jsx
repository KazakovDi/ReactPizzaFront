import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { selectAuth } from "../../redux/slices/authSlice";
import {fetchRemovePizza} from "../../redux/slices/pizzaSlice"
import { Link } from "react-router-dom";
const PizzaBlock = ({title, imageUrl, sizes, types, price, id})=> {
  const isAuth = useSelector(selectAuth)
  const [activeType, setActiveType] = React.useState(0)
  const [activeSize, setActiveSize] = React.useState(0)
  const typeNames = ["тонкое", "традиционное"]
  const dispatch = useDispatch()
  const removePizzaHandler = () => {
    if(window.confirm("Хотите удалить пиццу ?"))
      dispatch(fetchRemovePizza(id)) 
  }
  const onAddItem = ()=> {
    const item = {
      id,
      title,
      imageUrl,
      price,
      type: typeNames[activeType],
      size: sizes[activeSize]
    }
    dispatch(addItem(item))
  }
    return (
      <div className="pizza-block">
        {isAuth && (
          <div className="pizzaBlock__controls">
            <Link to={`/admin/edit/${id}`}>✎</Link>
            <button onClick={removePizzaHandler}>🗑</button>
          </div>
        )}
        <img
          className="pizza-block__image"
          src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
          alt="Pizza"
        />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
          {types.map((typeId, index) => {
              return (
                <li 
                key={typeId}
                onClick={()=> setActiveType(index)}
                className={activeType == index ? "active": ""}
                >{typeId === "0" ? "тонкое" : "традиционное"}</li>
              )
            })}
          </ul>
          <ul>
            {sizes.map((size, index)=> {
              return (
                <li
                key={size}
                onClick={()=> setActiveSize(index)}
                className={activeSize === index ? "active": ""}>{size + " см"}</li>
              )
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{price +  " грн"}</div>
          <button onClick={onAddItem} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span >Добавить</span>
          </button>
        </div>
      </div> 
    )
}

export default PizzaBlock