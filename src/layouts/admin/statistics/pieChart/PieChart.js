import { useEffect, useState } from 'react';
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Doughnut  , Pie} from 'react-chartjs-2';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './PieChart.css'
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { layTopSixAction } from '../../../../redux/actions/QuanLyThongKeAction';
import { useSelector } from 'react-redux';
import moment from 'moment';
import NotFoundWater from '../../../phucVu/Order/NotFound/NotFoundWater';
import Unavailable from '../Unavailable';


ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);





function PieChart() {
  const [date9, setDate9] = useState(null);

  const dispatch = useDispatch();
  var today = new Date(); 
  var date = moment(today).format('YYYY-MM')


  useEffect(() => {
    
      dispatch(layTopSixAction({
        month : date
      }))

  }, []);


  const { topSix } = useSelector(
    (state) => state.QuanLyThongKeReducer
  );

  const { month } = useSelector(
    (state) => state.QuanLyThongKeReducer
  );



  // Append '4d' to the colors (alpha channel), except for the hovered index
function handleHover(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
    colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
  });
  legend.chart.update();
}

// Removes the alpha channel from background colors
function handleLeave(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
    colors[index] = color.length === 9 ? color.slice(0, -2) : color;
  });
  legend.chart.update();
}

console.log(topSix);
  var nameWaters = [];
  var amountList = [];

  for(var i =0; i< topSix.length ; i++){
    nameWaters.push(topSix[i].name)
  }

  for(var i =0; i< topSix.length ; i++){
    amountList.push(topSix[i].amount)
  }



const data = {
  labels: nameWaters,
  datasets: [{
    label: '# of Votes',
    data: amountList,
    borderWidth: 1,
    backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60', '#884EA0', '#D35400'],
  }]
};

const config = {
  type: 'pie',
  data: data,
  options: {
    plugins: {
      legend: {
        onHover: handleHover,
        onLeave: handleLeave
      }
    }
  },
  
};


  const renderRanking =()=>{


    return topSix.map((item, index)=>{

      return <td key={index}  className='row' >
      <div className='col-2' >
        {index == 0 ?<img src='/img/trophy(1).png' style={{objectFit:'cover'}} width={30} height={30} /> : <></> }
        {index == 1 ?<img src='/img/trophy(2).png' style={{objectFit:'cover'}} width={30} height={30} /> : <></> }
        {index == 2 ?<img src='/img/trophy(3).png' style={{objectFit:'cover'}} width={30} height={30} /> : <></> }
        
      </div>
      <div className='col-2' >
      <img src={item.imgSrc} style={{objectFit:'cover',borderRadius:'10px'}} width={50} height={50} />
      </div>
      <div style={{fontWeight:'500'}} className='col-4 text-primary' >{item.name}</div>
      <div  style={{fontWeight:'500'}}  className='col-1 p-0 pt-2' >{item.amount}</div>
      <div  style={{fontWeight:'500'}}  className='col-3 text-success text-right' >{Number(item.totalMoney).toLocaleString()}₫</div>
  </td>
    })
  }



  return (
    <div  className='container card' >
      <div className='card-header bg-light text-center' >
        <h4>Top nước uống bán chạy nhất {month}  </h4>
      </div>
      <div  className='row  card-body' >
        <div className='col-6' >
        <div style={{alignItems:'center'}} className=" d-flex ">
                    <div style={{width:'60%'}} className="field mr-5">
                        <h5  htmlFor="monthpicker ">Chọn tháng</h5>
                        <Calendar id="monthpicker" value={date9} onChange={(e) => {
                            setDate9(e.value)     
                            
                        } } view="month" dateFormat="mm-yy" />
                    </div>
                    <Button onClick={()=>{
                      dispatch(layTopSixAction({
                        month : moment(date9).format('YYYY-MM')
                      })) 
                    }} style={{marginTop:'20px'}} icon="pi pi-search" className="p-button-rounded p-button-success p-button-outlined" aria-label="Search" />
                </div>

                



            <div className="App mt-5" style={{width:'80%', height:'80%'}}>
      <Pie data={data}/>
    </div>
        </div>
        <div className='col-6' style={{fontSize:'17px'}} >
        <table style={{marginTop:'2rem'}}  class="table">
  <tbody>

    <tr>
      {topSix.length != 0 ? renderRanking() : <Unavailable message="Không có giao dịch nào trong thời gian này"/>}
    </tr>
  </tbody>
</table>
        </div>
      </div>
                
    </div>
    
  );
}

export default PieChart;