import React from "react";
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import PieChart from "./pieChart/PieChart";
import { layDoanhThuAction } from "../../../redux/actions/QuanLyThongKeAction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ThongKe(props) {
 
  const dispatch = useDispatch()
  const [week,setWeek] = useState()

  var currentDate = new Date();
   var startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
   var weekNumber = Math.ceil(days / 7);

  useEffect(() => {
    dispatch(layDoanhThuAction({
      week : weekNumber
    }))
  }, []);

const { proceedsList } = useSelector(
  (state) => state.QuanLyThongKeReducer
);

console.log(proceedsList);

  var proceedsListUpdate = [0,0,0,0,0,0,0]


  for(var i=0; i<proceedsList.length ;i++){
    proceedsListUpdate[proceedsList[i].day-2] = proceedsList[i].totalMoney
    if(proceedsList[i].day == 1){
      proceedsListUpdate[6] = proceedsList[i].totalMoney
    }
  }



  var ranking = [
    {name:"Thứ hai", doanhThu : 0},
    {name:"Thứ ba", doanhThu : 0},
    {name:"Thứ tư", doanhThu : 0},
    {name:"Thứ năm", doanhThu : 0},
    {name:"Thứ sáu", doanhThu : 0},
    {name:"Thứ bảy", doanhThu : 0},
    {name:"Chủ nhật", doanhThu : 0},
  ]

  for(var i=0; i<proceedsListUpdate.length ;i++){
    ranking[i].doanhThu = proceedsListUpdate[i]
  }


  console.log('check', ranking);


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const  labels = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy' , 'Chủ nhật']
  

  const data = {
    labels: labels,
    datasets: [{
        label: '',
        data: proceedsListUpdate,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            '#ffc4ff',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            '#ce93d8',
        ],
        borderWidth: 3
    }]
  };

  const renderRanking =()=>{


    return ranking.sort(function(a, b) {
      return b.doanhThu - a.doanhThu;
    }).map((item, index)=>{

      return <td key={index}  className='row' >
        
      <div className='col-2' >
        {index == 0 ?<img src='/img/trophy(1).png' style={{objectFit:'cover'}} width={30} height={30} /> : <></> }
        {index == 1 ?<img src='/img/trophy(2).png' style={{objectFit:'cover'}} width={30} height={30} /> : <></> }
        {index == 2 ?<img src='/img/trophy(3).png' style={{objectFit:'cover'}} width={30} height={30} /> : <></> }
        
      </div>
      <div className="col-4 text-primary" style={{fontWeight:'500'}} >
        {item.name}
        </div>
      <div  style={{fontWeight:'500'}}  className='col-6 text-success text-right' >{Number(item.doanhThu).toLocaleString()}₫</div>
  </td>
    })
  }



  return (
    <div >
      <div className="card" >
        <div className="card-header  text-center bg-light" > <h3 className="text-dark" >Doanh thu theo tuần</h3></div>
          <div className="card-body " >
          <h4 className="text-dark" >Chọn tuần</h4>
            <div className="d-flex" style={{alignItems:'center'}} >
            <input onChange={(e)=>{
              const week = e.target.value
              setWeek(week.slice(-2))
            }} type="week" className="form-control mt-4 mr-3" style={{width:'20%'}} />
            <Button onClick={()=>{
              dispatch(layDoanhThuAction({
                week : week
              }))
            }} style={{marginTop:'20px'}} icon="pi pi-search" className="p-button-rounded p-button-success p-button-outlined" aria-label="Search" />
            </div>
          
           <div className="row" >
            <div className="col-9" ><Bar options={options} data={data} labels={labels} className="ml-4" /></div>
            <div className="col-3 " style={{marginTop:'4rem'}} >
                {renderRanking()}
            </div>
            
           </div>
           
          </div>
          

       
      </div>

    </div>
  );
}

export default ThongKe;