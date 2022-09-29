
const Categories = ({categoryId, onChangeCategory})=> {
    const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]
    return (
        <div class="categories">
            <ul>
                {categories.map((item, index)=> {
                    return (
                        <li onClick={()=> onChangeCategory(index)} className={categoryId === index ? "active" : ""}>{item}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Categories