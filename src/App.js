import {useAddProductMutation, useDeleteProductMutation, useGetGoodsQuery} from "./redux";
import {useEffect, useState} from "react";

function App() {

    const [count, setCount] = useState()
    const [newProduct, setNewProduct] = useState('')
    const {data = [], isLoading} = useGetGoodsQuery(count)
    const [addProduct, {isError}] = useAddProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    const handleAddProduct = async () => {
        if(newProduct) {
            await addProduct({name: newProduct}).unwrap()
            setNewProduct("")
        }
    }

    const handleRemoveProduct = async (id) => {
        await deleteProduct(id)
    }

    if(isLoading){
        return <h1>*** LOADING ***</h1>
    }


    return (
        <div className="App">
            <div>
                <input
                    type="text"
                    value={newProduct}
                    onChange={e => setNewProduct(e.target.value)}
                />
                <button onClick={handleAddProduct}>add product</button>
            </div>
            <div>
                <select value={count} onChange={e => setCount(e.target.value)}>
                    <option value="''">all</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <ul>
                {data.map(item =>
                    <li key={item.id} onClick={() => handleRemoveProduct(item.id)}>
                        {item.name}
                    </li>
                )}
            </ul>
        </div>
    );
}

export default App;
