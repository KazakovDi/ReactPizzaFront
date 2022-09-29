import React from "react"
import styles from "./SearchInput.module.scss"
import { useDispatch } from "react-redux"
import { titleSearch } from "../../redux/slices/filterSlice"
import debounce from "lodash.debounce"
const SearchInput = ()=> {
    const [inputValue, setInputValue] = React.useState('')
    const dispatch = useDispatch()
    const testDebounce = React.useCallback(debounce(value=> {
        dispatch(titleSearch(value))
    }, 1000),[])
    const changeInput = (value)=> {
        setInputValue(value)
        testDebounce(value)
    }
    return (
        <input value={inputValue} onChange={event=> {changeInput(event.target.value)}} className={styles.root}/>
    )
}
export default SearchInput