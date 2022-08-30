import React from 'react'
import './Bills.css'
import { Tooltip } from 'antd';
export default function Bills() {
  return (
    <div className="content-top bill-card p-4" >
                <div className="row" >
                  <div className="col-3 order-item" >
                    <div className="card card-order" >
                      <div className="card-header bg-light" >
                          <div className="col-6" >
                            <span className='h4' >1.4</span>
                          </div>
                          <div className="col-6" style={{textAlign:'right'}} >
                            <span className='h4' >6</span><i className="fas fa-user-alt ml-2"></i> 
                          </div>
                      </div>
                      <div className="card-body" >
                        <table style={{width:'100%'}} >
                        <tr >
                            <td style={{padding:'0 22px'}}  colSpan={2} rowSpan={2} className="h1 text-center" >
                              104
                            </td>
                            <td colSpan={2} className="h2 text-center">
                              1000000
                            </td>
                          </tr>    
                          <tr>
          <td className="text-center minutes " colSpan={4} >
            <i className="float-start fa fa-clock"> 
                1'
              </i>
            <img  src="img/drinks.png" style={{width:'45%'}} />
          </td>
        </tr>                     
                        </table>
                      </div>
                      <div className="card-footer " >
                        <table>
                          <thead>
                          <Tooltip title="Chỉnh sửa">
                            <th><i class="fas fa-pen-alt"></i></th>
                            </Tooltip>
                            
                            <th><i class="fas fa-clipboard-check"></i></th>
                            <Tooltip title="Khác">
                            <th><i class="fas fa-ellipsis-h"></i></th>
                            </Tooltip>
                           
                          </thead>
                          
                        </table>

                      </div>
                    </div>
                  </div>
                  <div className="col-3 order-item" >
                    <div className="card card-order" >
                      <div className="card-header bg-light" >
                          <div className="col-6" >
                            <span>1.4</span>
                          </div>
                          <div className="col-6" style={{textAlign:'right'}} >
                            <span>6</span><i className="fas fa-user-alt ml-2"></i> 
                          </div>
                      </div>
                      <div className="card-body" >
                        <table style={{width:'100%'}} >
                        <tr >
                            <td style={{padding:'0 22px'}}  colSpan={2} rowSpan={2} className="h1 text-center" >
                              104
                            </td>
                            <td colSpan={2} className="h2 text-center">
                              1000000
                            </td>
                          </tr>    
                          <tr>
          <td className="text-center minutes " colSpan={4} >
            <i className="float-start fa fa-clock"> 
              1'
              </i>
            <img  src="img/drinks.png" style={{width:'45%'}} />
          </td>
        </tr>                     
                        </table>
                      </div>
                      <div className="card-footer " >
                        <table>
                          <thead>
                            <th><i class="fas fa-calculator"></i></th>
                            <th><i class="fas fa-pen-alt"></i></th>
                            <th><i class="fas fa-clipboard-check"></i></th>
                            <th><i class="fas fa-ellipsis-h"></i></th>
                          </thead>
                          
                        </table>

                      </div>
                    </div>
                  </div>
                  <div className="col-3 order-item" >
                    <div className="card card-order" >
                      <div className="card-header bg-light" >
                          <div className="col-6" >
                            <span>1.4</span>
                          </div>
                          <div className="col-6" style={{textAlign:'right'}} >
                            <span>6</span><i className="fas fa-user-alt ml-2"></i> 
                          </div>
                      </div>
                      <div className="card-body" >
                        <table style={{width:'100%'}} >
                        <tr >
                            <td style={{padding:'0 22px'}}  colSpan={2} rowSpan={2} className="h1 text-center" >
                              104
                            </td>
                            <td colSpan={2} className="h2 text-center">
                              1000000
                            </td>
                          </tr>    
                          <tr>
          <td className="text-center minutes " colSpan={4} >
            <i className="float-start fa fa-clock"> 
              1'
              </i>
            <img  src="img/drinks.png" style={{width:'45%'}} />
          </td>
        </tr>                     
                        </table>
                      </div>
                      <div className="card-footer " >
                        <table>
                          <thead>
                            <th><i class="fas fa-calculator"></i></th>
                            <th><i class="fas fa-pen-alt"></i></th>
                            <th><i class="fas fa-clipboard-check"></i></th>
                            <th><i class="fas fa-ellipsis-h"></i></th>
                          </thead>
                          
                        </table>

                      </div>
                    </div>
                  </div>
                  <div className="col-3 order-item" >
                    <div className="card card-order" >
                      <div className="card-header bg-light" >
                          <div className="col-6" >
                            <span>1.4</span>
                          </div>
                          <div className="col-6" style={{textAlign:'right'}} >
                            <span>6</span><i className="fas fa-user-alt ml-2"></i> 
                          </div>
                      </div>
                      <div className="card-body" >
                        <table style={{width:'100%'}} >
                        <tr >
                            <td style={{padding:'0 22px'}}  colSpan={2} rowSpan={2} className="h1 text-center" >
                              104
                            </td>
                            <td colSpan={2} className="h2 text-center">
                              1000000
                            </td>
                          </tr>    
                          <tr>
          <td className="text-center minutes " colSpan={4} >
            <i className="float-start fa fa-clock"> 
              1'
              </i>
            <img  src="img/drinks.png" style={{width:'45%'}} />
          </td>
        </tr>                     
                        </table>
                      </div>
                      <div className="card-footer " >
                        <table>
                          <thead>
                            <th><i class="fas fa-calculator"></i></th>
                            <th><i class="fas fa-pen-alt"></i></th>
                            <th><i class="fas fa-clipboard-check"></i></th>
                            <th><i class="fas fa-ellipsis-h"></i></th>
                          </thead>
                          
                        </table>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
  )
}
