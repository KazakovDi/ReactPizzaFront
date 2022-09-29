import React from 'react'
import axios from "../../../axios"
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { fetchNewPizza, fetchEditPizza } from '../../../redux/slices/pizzaSlice'
import { useParams, useNavigate } from 'react-router-dom'

import styles from "./CreatePizza.module.scss"
const CreatePizza = () => {
    const [data, setdata] = React.useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = React.useState(true)
    const [imageUrl, setImageUrl] = React.useState("")
    const dispatch = useDispatch()
    const inputRef = React.useRef(null)
    const [isSubmited, setIsSubmited] = React.useState(false)
    const error = useSelector(state=> state.filter.error)
    React.useEffect( ()=> {
        const fetch = async ()=> {
            try {
                if(isEditing) {
                    const {data} = await axios.get(`/admin/${id}`)
                    setdata(data)
                    setValue("title", data.title)
                    setValue("price", data.price)
                    setValue("rating", data.rating)
                    setIsLoading(false) 
                     
                }
            } catch(err) {
                setdata({message: err.response.data.message})
            }
                       
        }
        fetch()  
    }, [])
    const {register, handleSubmit, setError, reset, clearErrors, setValue,  formState: {errors}} = useForm({
        mode: "onSubmit"
      })
    const {id} = useParams()
    const isEditing = Boolean(id)
    const categories = ["Мясная", "Вегетарианская", "Гриль", "Острая", "Закрытая"]
        
    const uploadFileHandler = async event=> {
        try {
            const formdata = new FormData()
            const file = event.target.files[0]
            formdata.append("image", file)
            const {data} = await axios.post("/admin/uploads", formdata)
            setImageUrl(data.url)
            clearErrors("imageUrl")
            
        } catch(err) {
            setdata({message: err.response.data.message})
        }
        
    }
    const onSubmitHandler = values => {
        try {
            if(!imageUrl && !isEditing)
                setError("imageUrl", {message: "Загрузите фото"})
            else {
                values.imageUrl = imageUrl
                values.id = id
                if(isEditing) {
                    dispatch(fetchEditPizza(values))
                    navigate("/")
                } else
                    dispatch(fetchNewPizza(values))
                reset()
                setImageUrl("")
                setIsSubmited(true)
                setTimeout(()=> {
                    setIsSubmited(false)
                }, 3000)
            }   
        } catch(err) {
            alert()
        }
    }
    if("message" in data) {
        return (
            <div className={styles.error}>{data.message}</div>
        )
    }
  return (
    <div className={styles.root}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
            {!imageUrl ? (
            <button className={styles.upload_image} type="button" onClick={()=> inputRef.current.click()}>Загрузить фото</button>
            ) : (
            <button className={styles.reset_image} type="button" onClick={()=> setImageUrl("")}>Удалить фото</button>
            )}
            <input
                ref={inputRef}
                type="file"
                accept="image/png, image/jpeg"
                onChange={event=> uploadFileHandler(event)}
                hidden
            />
            <div className={styles.error_block}>
                {errors?.imageUrl && <p>{errors?.imageUrl?.message || "Фоточку загрузи"}</p>}
            </div>
            {imageUrl ? (
                <img className={styles.preview} src={`http://localhost:5000${imageUrl}`} alt="Uploaded" />
            ) : isEditing ? 
                <img  src={`http://localhost:5000${data.imageUrl}`} alt="Uploaded" />
              : (<div></div>)}
            <input
            placeholder='Название пиццы'
            {...register("title",
             {
                required:"Поле обязательно к заполнению",
                minLength: {
                    value:3,
                    message: "Название должно быть длинне 3-х симоволов"
                }
            })}
            type="text"
            />
            <div className={styles.error_block}>
                {errors?.title && <p>{errors?.title?.message || "Некорректное название"}</p>}
            </div>
            <input 
            placeholder='Ценна'
            type="number"
            min={0}
            {...register("price", {
                required: "Поле обязательно к заполнению",
                min: {
                    value:0,
                    message: "Цена не может быть меньше 0"
                }
            })}
            />
            <div className={styles.error_block}>
                {errors?.price && <p>{errors?.price?.message || "Некорректная цена"}</p>}
            </div>
            <select {...register("category")}>
                {categories.map((item, index)=> {
                    if(data.category - 1 === index)
                        return <option selected value={index + 1}>{item}</option>
                    else {
                        return <option value={index + 1}>{item}</option>
                    }      
                })}

            </select>
            {!isLoading ? (
                <>  
                    <label>  Тонкое
                    {data.types.includes("0") ? (
                        <>
                            <input {...register("types", {required: "Выберите минимум 1 вариант"})} type="checkbox" defaultChecked={true} value={0} />
                        </>
                    ) : (
                            <input {...register("types", {required: "Выберите минимум 1 вариант"})} type="checkbox" value={0} />
                    )}
                    </label>
                    <label>  Традиционное
                    {data.types.includes("1") ? (
                        <>
                            <input {...register("types", {required: "Как минимум 1 поле должно быть выбрано"})} type="checkbox" defaultChecked={true} value={1} />
                        </>
                    ) : (
                            <input {...register("types", {required: "Как минимум 1 поле должно быть выбрано"})} type="checkbox" value={1} />    
                    )}
                    </label>
                    <div className={styles.error_block}>
                        {errors?.types && <p>{errors?.types?.message || "Некорректная цена"}</p>}
                    </div>
                    <label>  30 см
                    {data.sizes.includes("30") ? (   
                            <>
                                <input {...register("sizes", {required: "Как минимум 1 поле должно быть выбрано"})} type="checkbox" defaultChecked={true} value={30} />
                            </>
                    ) : (
                        <input {...register("sizes", {required: "Как минимум 1 поле должно быть выбрано"})} type="checkbox" value={30} />    
                    )}
                    </label>
                    <label>  40 см
                    {data.sizes.includes("40") ? (   
                        <>
                            <input {...register("sizes", {required: "Как минимум 1 поле должно быть выбрано"})} type="checkbox" defaultChecked={true} value={40} />
                        </>
                    ) : (
                        <input {...register("sizes", {required: "Как минимум 1 поле должно быть выбрано"})} type="checkbox" value={40} />    
                    )}
                    </label>
                    <label>  50 см
                    {data.sizes.includes("50") ? (   
                        <>
                            <input {...register("sizes", {required: "Как минимум 1 поле должно быть выбрано"})} type="checkbox" defaultChecked={true} value={50} />
                        </>
                    ) : (
                        <input {...register("sizes", {required: "Как минимум 1 поле должно быть выбрано"})} type="checkbox" value={50} />    
                    )}
                    </label>
                    <div className={styles.error_block}>
                        {errors?.sizes && <p>{errors?.sizes?.message || "Некорректная цена"}</p>}
                    </div>
                </>
                ) : (
                <>
                    <div className='checkbox_block'>
                        <label>  Тонкое
                            <input {...register("types", {required: "Как минимум 1 поле должно быть выбрано"})} type="checkbox" value={0} />
                        </label>
                        <label>  Традиционное
                            <input {...register("types", {required: "Как минимум 1 поле должно быть выбрано"})} type="checkbox" value={1} />
                        </label>
                    </div>
                    <div className={styles.error_block}>
                        {errors?.types && <p>{errors?.types?.message || "Некорректная цена"}</p>}
                    </div>
                    <div className='checkbox_block'>
                        <label>  30 см
                            <input {...register("sizes", {required: "Как минимум 1 поле должно быть выбрано"})} type="checkbox" value={30} />
                        </label>
                        <label>  40 см
                            <input {...register("sizes", {required: "Как минимум 1 поле должно быть выбрано"})} type="checkbox" value={40} />
                        </label>
                        <label>  50 см
                            <input {...register("sizes", {required: "Как минимум 1 поле должно быть выбрано"})} type="checkbox" value={50} />
                        </label>
                    </div>
                    <div className={styles.error_block}>
                        {errors?.sizes && <p>{errors?.sizes?.message || "Некорректная цена"}</p>}
                    </div>
                </>
                )}    
            <input
            className={styles.rating}
            placeholder='Рейтинг'
            value={data.rating}
            type="number"
            min={1}
            max={5}
            {...register("rating", {
                required: "Поле обязательно к заполнению",
                min: {
                    value:1,
                    message: "Рейтинг должен быть от 1 до 5"
                },
                max: {
                    value:5,
                    message: "Рейтинг должен быть от 1 до 5"
                },
            })}
            />
             <div className={styles.error_block}>
                {errors?.rating && <p>{errors?.rating?.message || "Некорректная цена"}</p>}
            </div>
            {isSubmited ? (<div className={styles.success}>Success</div>) : (<div></div>)}
            <input type="submit" value={"Подтвердить"}/>
        </form>
    </div>
  )
}

export default CreatePizza
