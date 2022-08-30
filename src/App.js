
import './App.css';
//Component App sẽ là nơi chứa toàn bộ giao diện của ứng dụng
//Cấu hình router
import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import MyAdmin from './layouts/admin/MyAdmin';
import AddEmployee from './layouts/admin/employee/addEmployee/AddEmployee';
import EmployeeList from './layouts/admin/employee/employeeList/EmployeeList';
import EditEmployee from './layouts/admin/employee/editEmployee/EditEmployee';
import { Router } from 'react-router-dom';
import Shifts from './layouts/admin/employee/Shifts/Shifts';
import GoodsList from './layouts/admin/Goods/GoodsList/GoodList';
import EditGoods from './layouts/admin/Goods/EditGoods/EditGoods';
import AddGoods from './layouts/admin/Goods/AddGoods/AddGoods';
import WaterList from './layouts/admin/Waters/WaterList/WaterList';
import AddWater from './layouts/admin/Waters/AddWater/AddWater';
import UpdateWater from './layouts/admin/Waters/UpdateWater/UpdateWater';
import ThongKe from './layouts/admin/statistics/ThongKe';
import PieChart from './layouts/admin/statistics/pieChart/PieChart';
import WorkPlaceTemplate from './templates/WorkPlaceTemplate/WorkPlaceTemplate';
import PhucVu from './layouts/phucVu/PhucVu';
import Login from './layouts/Login/Login';
import ThuNgan from './layouts/thuNgan/ThuNgan';
import PhaChe from './layouts/phaChe/PhaChe';
export const history = createBrowserHistory();

function App() {

  return (
    <Router   history={history}>

      <Switch>
        
        <Route path={"/phucvu"} component={PhucVu} />
        <Route exact path={"/thungan"} component={ThuNgan} />
        <Route exact path={"/phache"} component={PhaChe} />

        {/* <Route exact path={"*"} component={Login} /> */}


        <Route exact path={"/"} component={Login} />
        
        <AdminTemplate path="/admin/home" component={MyAdmin} />
        <AdminTemplate path="/admin/home" component={ThuNgan} />

        
        <AdminTemplate path="/admin/employee/addEmployee" component={AddEmployee} />
        <AdminTemplate path="/admin/employee/edit/:id" component={EditEmployee} />
        <AdminTemplate path="/admin/employees" component={EmployeeList} />
        <AdminTemplate path="/admin/employee/shifts/:id" component={Shifts} />
        

        
        <AdminTemplate path="/admin/phan-tich-du-lieu" component={PieChart} />
        <AdminTemplate path="/admin/thong-ke-doanh-thu" component={ThongKe} />


        <AdminTemplate path="/admin/danh-sach-ban" component={MyAdmin} />
        <AdminTemplate path="/admin/them-ban" component={MyAdmin} />
        <AdminTemplate path="/admin/danh-sach-hang-hoa" component={MyAdmin} />
        <AdminTemplate path="/admin/them-hang-hoa" component={MyAdmin} />


        <AdminTemplate path="/admin/goods/edit/:id" component={EditGoods} />
        <AdminTemplate path="/admin/goods" component={GoodsList} />
        <AdminTemplate path="/admin/good/addGoods" component={AddGoods} />
        

        <AdminTemplate path="/admin/water/addwater" component={AddWater} />
        <AdminTemplate path="/admin/waters" component={WaterList} />
        <AdminTemplate path="/admin/water/updatewater/:id" component={UpdateWater} />



        
        
      </Switch>


    </Router>
  );
}

export default App;
