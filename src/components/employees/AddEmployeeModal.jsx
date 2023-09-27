import React, { useState } from 'react';
import axios from 'axios';

function AddEmployeeModal({onAdd}) {
  const [empName, setEmpName] = useState('');
  const [convSeq, setConvSeq] = useState(0);
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('남성');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [salary, setSalary] = useState(0);

  const accesstoken = localStorage.getItem("accesstoken");

  const handleSubmit = () => {
    const formatDate = (dateString) => {
      if (dateString.length === 8) {
        return `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6, 8)}`;
      }
      return dateString;
    };

    const employeeData = {
     empName,
      convSeq,
      birthDate: formatDate(birthDate),
      gender,
      phoneNumber,
      hireDate: formatDate(hireDate),
      salary
    };

    axios.post('http://10.10.10.108:3000/addemployee', employeeData, {
      headers: { accessToken: `Bearer ${accesstoken}`,}
    })
      .then(response => {
        console.log('데이터 성공적으로 전송', response);
        onAdd();
      })
      .catch(error => {
        console.log('데이터 전송 실패', error);

      });
  };

  return (
    <div className="addemployeemodal">
    <div className="regi-content">
                
                    <div className="form-row">
                        <div className="input-container">
                            <input className="input-text" onChange={(e) => setEmpName(e.target.value)} required />
                            <label className="label-helper" htmlFor="id"><span>이름</span></label>
                            
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" onChange={(e) => setConvSeq(parseInt(e.target.value))} required />
                            <label className="label-helper" htmlFor="pw"><span>지점 번호 (추후 자동으로 받아오게)</span></label>
                           
                        </div>
                    </div>
                    
                    <div className="form-row">
                      <div className='input-birth-container'>

                        <div className="input-container">
                            <input type="text" className="input-birth" onChange={(e) => setBirthDate(e.target.value)} required />
                            <label className="label-helper" htmlFor="branchName"><span>생년월일 (8자리 입력)</span></label>
                        </div>

                        {/* <div className="input-gender">
                          <input type="radio" id="gender-male" vlaue="남성" onChange={(e) => setGender(e.target.value)} checked={gender === "남성"}/>
                          <label htmlFor="gender-male">남성</label>
                          <input type="radio" id="gender-female" vlaue="여성" onChange={(e) => setGender(e.target.value)} checked={gender === "여성"} />
                          <label htmlFor="gender-female">여성</label>
                        </div> */}

                        <div className="input-gender">
                          <input id="gender-male" type="radio" name="gender" value="남성" onChange={(e) => setGender(e.target.value)} checked={gender === "남성"} />
                          <label htmlFor="gender-male">남성</label>
                          <input id="gender-female" type="radio" name="gender" value="여성"onChange={(e) => setGender(e.target.value)} checked={gender === "여성"}/>
                          <label htmlFor="gender-female">여성</label>
                        </div>

                        </div>


                       
          

                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" onChange={(e) => setPhoneNumber(e.target.value)} required />
                            <label className="label-helper" htmlFor="repreName"><span>연락처 ex.01056852833</span></label>
                            
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" onChange={(e) => setHireDate(e.target.value)} required />
                            <label className="label-helper" htmlFor="repreName"><span>고용 날짜 (8자리 입력)</span></label>
                            
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" onChange={(e) => setSalary(parseInt(e.target.value))} required />
                            <label className="label-helper" htmlFor="repreName"><span>시급</span></label>
                            
                        </div>
                    </div>

                    
                   
                    
               

                        <div className="btn-container">
                            <button className="regi-btn" onClick={ handleSubmit } >저장</button>
                            {/* <input className="regi-btn" type="submit" value="회원가입" disabled={!formIsValid} /> */}
                        </div>
                
            </div></div>

    
      // <div className="container">
      //   <form>
      //     <div className="row">
      //       <h4>Account</h4>
      //       <div className="input-group input-group-icon">
      //         <input type="text" placeholder="Full Name" />
      //         <div className="input-icon"></div>
      //       </div>
      //       <div className="input-group input-group-icon">
      //         <input type="email" placeholder="Email Adress" />
      //         <div className="input-icon"></div>
      //       </div>
      //       <div className="input-group input-group-icon">
      //         <input type="password" placeholder="Password" />
      //         <div className="input-icon"></div>
      //       </div>
      //     </div>
      //     <div className="row">
      //       <div className="col-half">
      //         <h4>Date of Birth</h4>
      //         <div className="input-group">
      //           <div className="col-third">
      //             <input type="text" placeholder="DD" />
      //           </div>
      //           <div className="col-third">
      //             <input type="text" placeholder="MM" />
      //           </div>
      //           <div className="col-third">
      //             <input type="text" placeholder="YYYY" />
      //           </div>
      //         </div>
      //       </div>
      //       <div className="col-half">
      //         <h4>Gender</h4>
      //         <div className="input-group">
      //           <input id="gender-male" type="radio" name="gender" value="male" />
      //           <label htmlFor="gender-male">Male</label>
      //           <input id="gender-female" type="radio" name="gender" value="female" />
      //           <label htmlFor="gender-female">Female</label>

      //<label>
    //         <input 
    //           type="radio" 
    //           value="남성" 
    //           checked={gender === "남성"} 
    //           onChange={(e) => setGender(e.target.value)}
    //         />
    //         남성
    //       </label>
    //       <label>
    //         <input 
    //           type="radio" 
    //           value="여성" 
    //           checked={gender === "여성"} 
    //           onChange={(e) => setGender(e.target.value)}
    //         />
    //         여성
    //       </label>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="row">
      //       <h4>Payment Details</h4>
      //       <div className="input-group">
      //         <input id="payment-method-card" type="radio" name="payment-method" value="card" defaultChecked />
      //         <label htmlFor="payment-method-card"><span>Credit Card</span></label>
      //         <input id="payment-method-paypal" type="radio" name="payment-method" value="paypal" />
      //         <label htmlFor="payment-method-paypal"><span>Paypal</span></label>
      //       </div>
      //       <div className="input-group input-group-icon">
      //         <input type="text" placeholder="Card Number" />
      //         <div className="input-icon"></div>
      //       </div>
      //       <div className="col-half">
      //         <div className="input-group input-group-icon">
      //           <input type="text" placeholder="Card CVC" />
      //           <div className="input-icon"></div>
      //         </div>
      //       </div>
      //       <div className="col-half">
      //         <div className="input-group">
      //           <select>
      //             <option>01 Jan</option>
      //             <option>02 Jan</option>
      //           </select>
      //           <select>
      //             <option>2015</option>
      //             <option>2016</option>
      //           </select>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="row">
      //       <h4>Terms and Conditions</h4>
      //       <div className="input-group">
      //         <input id="terms" type="checkbox" />
      //         <label htmlFor="terms">I accept the terms and conditions for signing up to this service, and hereby confirm I have read the privacy policy.</label>
      //       </div>
      //     </div>
      //   </form>
      // </div>
    
    // <div className='addemployeemodal'>
    //   <h1>직원 모달</h1>
    //   <div className='addemp-container'>
    //   <form>
    //     <input type="text" placeholder="이름" onChange={(e) => setEmpName(e.target.value)} />
    //     <input type="number" placeholder="convSeq" onChange={(e) => setConvSeq(parseInt(e.target.value))} />
    //     <input placeholder="생년월일 ex)19980123" onChange={(e) => setBirthDate(e.target.value)} />
    //     <div>
    //       <label>
    //         <input 
    //           type="radio" 
    //           value="남성" 
    //           checked={gender === "남성"} 
    //           onChange={(e) => setGender(e.target.value)}
    //         />
    //         남성
    //       </label>
    //       <label>
    //         <input 
    //           type="radio" 
    //           value="여성" 
    //           checked={gender === "여성"} 
    //           onChange={(e) => setGender(e.target.value)}
    //         />
    //         여성
    //       </label>
    //     </div>
    //     <input type="tel" placeholder="전화번호" onChange={(e) => setPhoneNumber(e.target.value)} />
    //     <input placeholder="고용일 ex)20230901" onChange={(e) => setHireDate(e.target.value)} />
    //     <input placeholder="급여"  onChange={(e) => setSalary(parseInt(e.target.value))} />
    //   </form>
    //   </div>
    //   <button onClick={ handleSubmit }>직원 추가하기</button>
    // </div>
  );
}

export default AddEmployeeModal;
