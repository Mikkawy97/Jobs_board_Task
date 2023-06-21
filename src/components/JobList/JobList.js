import React, { useEffect, useState,useContext } from 'react';
import './jobList.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {styled} from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom';
import ThemeContext from "../../contexts/ThemeContext";
import CircularProgress from '@mui/material/CircularProgress';

const CssTextField = styled(TextField)({
    // '& .MuiInput-input':{
    //     padding:'60px'
    // },
    '& label.Mui-focused': {
      color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
       borderStyle:'none',
       
       
      },
    
    },
  });
function JobList() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const { theme } = useContext(ThemeContext);
 const [item ,setItem]=useState({query:'barista',location:'',flag:false,flagtext:'' });
 const [itemcopy ,setItemCopy]=useState({query:'',location:'',flag:false,flagtext:'' });
  const [search,setSearch]=useState(false);
  const [loading,setLoading]=useState(false);


  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('https://cors-anywhere.herokuapp.com/serpapi.com/search.json?api_key=ba127f12772d1f46feb3f97e14860ea217019d7d4fad2481c1f1c8078696195e&engine=google_jobs&q='+item.query+'&start='+page+'&hl=en&location='+item.location+'&chips=employment_type:'+item.flagtext+'')
      .then(items => items.json())
      .then(data =>{
        if(mounted){
        var temp;
        console.log(data);
          if(!search){
             
              temp=[...list];
          }
          else{
            temp=[];
            
          }
          for (let index = 0; index < data?.jobs_results?.length; index++) {
            temp.push(data.jobs_results[index]);
          }
                
              
            
       
          console.log(temp);
        setList(temp);
        setLoading(false);
        }
      })
    return () => mounted = false;
  }, [page,search,item]);
  function loadMore() {
    var temp=page;
    temp++;
    setPage(temp);
   
  }


  return (
    
    <div className='home_wrapper'>
    <div className="container">
        <div className="row mb-5 ">
            <div className="col-md-12 filter_container" style={{backgroundColor:theme==='light'?'#FFFF':'#19202D'}}>
          
                    <div className='row m-0 '>
                        <div className='col-md-5   right_border p-0' style={{borderColor:theme==='light'?'#e6e6e6':'#6E8098'}}>
                        
                        <CssTextField id="outlined-basic"  variant="outlined" placeholder='Filter by title,companies,expertise..'
                            fullWidth
                            sx={{borderStyle:'none'}}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><SearchIcon  sx={{color:'#5964E0'}}/> </InputAdornment>,
                                sx: {
                                  
                                    color: theme==='light'?'#19202D':'#FFFFFF'                                 
                                  
                                }
                              }}
                              onChange={(e)=>{
                               var temp={...itemcopy};
                               temp.query=e.target.value;
                               setItemCopy(temp);
                              }}
                        />

                        </div>
                        <div className='col-md-7 p-0'>
                            <div className='row m-0'>
                                <div className='col-md-6 right_border p-0' style={{borderColor:theme==='light'?'#e6e6e6':'#6E8098'}}>
                                <CssTextField id="outlined-basic"  variant="outlined" placeholder='Filter by Location..'
                                        fullWidth
                                        sx={{borderStyle:'none'}}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><LocationOnIcon  sx={{color:'#5964E0'}}/> </InputAdornment>,
                                            sx: {
                                  
                                              color: theme==='light'?'#19202D':'#FFFFFF'                                 
                                            
                                          }
                                        }}
                                        onChange={(e)=>{
                                       
                                          var temp={...itemcopy};
                                          temp.location=e.target.value;
                                          setItemCopy(temp);
                                        }}
                                    />
                                </div>
                                <div className='col-md-6 d-flex align-items-center '>
                               <Checkbox value={itemcopy.flag} 
                               sx={{color:theme==='light'?'#e8e8ea':'#34353F'}}
                               
                               onChange={(e)=>
                                {
                                  var temp={...itemcopy};
                                  temp.flag=e.target.checked;
                                  if(e.target.checked){
                                    temp.flagtext="FULLTIME"
                                  }
                                  else{
                                    temp.flagtext=""
                                  }
                                  
                                  setItemCopy(temp);
                               
                               }}/>
                               <div className='check_label' style={{color:theme==='light'?'#19202D':'#FFFFFF'}}>Full Time Job</div>
                               {loading===false ?<button className='search_btn'
                               onClick={()=>{
                                setSearch(true);
                                setPage(0);
                                  if(itemcopy.query!==''){
                                
                                      var temp={...itemcopy};
                                      setItem(temp);
                                  }
                                  else{
                                    alert('you have to search by name at least');
                                  }
                               }}
                               >Search</button>:<div className='d-flex justify-content-end'><CircularProgress /></div>}
                                 </div>
                            </div>
                        </div>
                   
                      
                    </div>

          
            </div>

            </div>
            <div className='row cards-sect'>
              {list.map((item)=>{
                  return (
                    <div className='col-md-4 mb-5'  key={item.job_id}>
                      <Link to={`/job`} style={{ textDecoration: 'none' }} state={{ jobid: item.job_id ,item:item}}>
                      <div className='job_card' style={{backgroundColor:theme==='light'?'#FFFF':'#19202D'}}>
                        <div className='img_cont'>
                            <img src={item.thumbnail? item.thumbnail:"https://thumbs.dreamstime.com/b/no-image-available-icon-177641087.jpg"}  alt='job' />
                        </div>
                        <div className='d-flex align-items-center mb-2'>
                          <div className='job_date_type'>{(item.detected_extensions?.posted_at? item.detected_extensions.posted_at:"N/A")+" . "+(item.detected_extensions?.schedule_type? item.detected_extensions.schedule_type:"N/A")}</div>
        
                        </div>
                        <div className='job_title mb-2' style={{color:theme==='light'?'#19202D':'white'}}>{item.title}</div>
                        {/* <div className='job_date_type '>{item.job_highlights[0].items[2]}</div> */}
                        <div className='job_date_type mb-4'>{item.via}</div>
                        <div className='job_location'>{item.location}</div>
                      </div>
                      </Link>

                    </div>
                  )

              })}

            </div>
            <div className='row m-0 '>
              <div className='col-md-12 d-flex justify-content-center '>
             {loading===false? <button className='load_btn' onClick={()=>{
                setSearch(false);
                loadMore();
              }}>Load More</button>:<CircularProgress />}
              </div>
              
            </div>
        </div>
   </div>
  );
}

export default JobList;
