import {Routes,Route} from 'react-router-dom'
import Category from '../../Pages/Category';
import Newproduct from '../../Pages/Newproduct';


function AppRoutes(){
    return ( 
    <Routes>
    <Route path='/' element={<Category />}></Route>
    <Route path='/:categoryId' element={<Category />}></Route>
    <Route path='/:newproductId' element={<Newproduct/>}></Route>
    </Routes>
    )
}

export default AppRoutes;