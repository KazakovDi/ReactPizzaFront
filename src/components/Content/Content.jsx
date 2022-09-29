// Librarys
import React from "react";
import {useDispatch , useSelector} from "react-redux"
// Funcs 
import { fetchPizzas } from "../../redux/slices/pizzaSlice";
import { setCategory, changeSortType, setPageNumber } from "../../redux/slices/filterSlice";
// Components
import PizzaBlock from "./PizzaBlock";
import Skeleton from "../Skeleton/Skeleton";
import Categories from "./Categories";
import Sort from "./Sort";
import Pagination from "../Pagination/Pagination"

import styles from "./Content.module.scss"
const Content = ()=> {
  const dispatch = useDispatch()
  const {items: pizzas, status} = useSelector(state=> state.pizzas)
  const {categoryId, sort, title, currentPage, error} = useSelector(state => state.filter)
  const isLoadingPizzas = status === "loading"
  const {results, numberOfPages} = pizzas
  React.useEffect(()=> {
      const params = {
        categoryId,
        sortProperty: sort.sortProperty,
        title: title.trim(),
        currentPage
      }
        dispatch(fetchPizzas(params))  
  }, [categoryId, sort, title, currentPage])
  const test = ()=> {
    dispatch(fetchPizzas({}))
  }
  const setActiveCategory = id=> {
    dispatch(setCategory(id))
  }
  const onChangeSortType = sort => {
    dispatch(changeSortType(sort))
  }
    return (
        <div class="content">
          
        <div class="container">
          {"message" in error ? (
            <div className={styles.errorContainer}>
              <h1>Произошла ошибка</h1>
              <h2>{error.message}</h2>
            </div>
          ) : (
            <>
          <div class="content__top">
            <Categories onChangeCategory={setActiveCategory} categoryId={categoryId}/>
            <Sort name={sort.name} onChangeSortType={onChangeSortType} />
          </div>
          <h2 onClick={test} class="content__title">Все пиццы</h2>
          <div className={styles.content__items}>
            {!isLoadingPizzas && !results.length && <div>Ничего не найдено</div>}
            {(isLoadingPizzas ? [...Array(5)] : results).map((pizza, index)=> {
              return isLoadingPizzas ? (
                <Skeleton key={index}/>
              ) : (
                  <PizzaBlock 
                  key={pizza.id}
                  {...pizza}
                  id={pizza._id}
                />
                )
            })}
          </div>
            <Pagination numberOfPages={numberOfPages} currentPage={currentPage} onChangePage={(number)=> dispatch(setPageNumber(number))}/>
          </>
          )}
        </div>
      </div>
    )
}

export default Content