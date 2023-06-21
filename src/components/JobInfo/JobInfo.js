import React, { useEffect, useState,useContext } from 'react';
import '../JobList/jobList.css';


import { useLocation } from "react-router-dom";
import ThemeContext from "../../contexts/ThemeContext";

function JobInfo() {
    const { theme } = useContext(ThemeContext);
    const [job, setJob] = useState({});
    const location = useLocation();
    const { jobid,item } = location.state;

    useEffect(() => {
        let mounted = true;
        fetch('https://cors-anywhere.herokuapp.com/serpapi.com/search.json?api_key=ba127f12772d1f46feb3f97e14860ea217019d7d4fad2481c1f1c8078696195e&engine=google_jobs_listing&q='+jobid+'')
          .then(items => items.json())
          .then(data =>{
            if(mounted){
       
       
                setJob(data);
                console.log(data);
                    
                  
                
           
         
     
            }
          })
        return () => mounted = false;
      }, [jobid]);



  return (
    <>
    <div className='job_wrapper'>
    <div className="container">
        <div className="row m-0 pb-4">
                <div className='col-md-12 p-0 jobInfo_container' style={{backgroundColor:theme==='light'?'white':'#19202D'}}>
                    <div className='row align-items-center m-0 '>
                        <div className='col-md-3 p-0'>
                            <div className='img_container '>
                                <img alt='logo' src={item.thumbnail? item.thumbnail:"https://thumbs.dreamstime.com/b/no-image-available-icon-177641087.jpg"}></img>
                            </div>
                        </div>
                        <div className='col-md-9 d-flex justify-content-between p-4'>
                                    <div >
                                    <div className='title'  style={{color:theme==='light'?'#19202D':'white'}}>{item.company_name}</div>
                                    <div className='company_name'style={{color:'#6E8098',maxWidth:'20px'}}>{item.related_links[0].link}</div>
                                    </div>
                                    <button className='company_site' style={{backgroundColor:theme==='light'?'#eff0fc':'#34353F',color:theme==='light'?'#5964E0':'white'}}
                                    onClick={()=>{
                                        window.open(item.related_links[0].link);
                                    }}>Company Site</button>
                        </div>
                    </div>
                 
                 

                </div>
            </div>
            <div className='row job_details_card align-items-center m-0'style={{backgroundColor:theme==='light'?'white':'#19202D'}}>
                        <div className='col-md-8 p-0 mb-3' >
                           
                            <div className='job_date_type mb-1'>{(item.detected_extensions?.posted_at? item.detected_extensions.posted_at:"N/A")+" . "+(item.detected_extensions?.schedule_type? item.detected_extensions.schedule_type:"N/A")}</div>
                            <div className='job_title mb-1' style={{color:theme==='light'?'#19202D':'white'}}>{item.title} </div>
                            <div className='job_location mb-1'>{item.location}</div>
                          
                        </div>
                        <div className='col-md-4  mb-3 d-flex justify-content-end p-0'>
                           
                           <button className='load_btn'
                           onClick={()=>{
                            window.open(job.apply_options[0].link);
                           }}
                           >Apply Now</button>
                         
                       </div>
                       <div className='col-md-12 p-0'>
                                    <p className='desc'>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.
                                    </p>
                                    <div className='job_title mb-3' style={{color:theme==='light'?'#19202D':'white'}}>Requirements</div>
                                    <p className='desc'>
                                    Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu, vulputate vel, nisl.
                                        </p>
                                    <ul>
                                        {item?.job_highlights[0]?.items.map((item,index)=>{
                                            return(
                                                <li  key={index}><span className='desc'>{item}</span></li>
                                            );
                                        })}
                                    </ul>
                                    <div className='job_title mb-3' style={{color:theme==='light'?'#19202D':'white'}}>What You Will Do</div>
                                    <p className='desc'>
                                    Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.
                                        </p>
                                    <ol>
                                        {item?.job_highlights[1]?.items.map((item,index)=>{
                                            return(
                                                <li key={index}><span className='desc'>{item}</span></li>
                                            );
                                        })}
                                    </ol>
                       </div>
                    </div>
        
        </div>
   </div>
   <div className='job_footer' style={{backgroundColor:theme==='light'?'white':'#19202D'}}>
                <div className='container'>
                    <div className='row m-0 align-items-center' >
                        <div className='col-md-6'>
                        
                            <div className='job_title mb-1' style={{color:theme==='light'?'#19202D':'white'}}>{item.title}</div>
                            <div className='job_date_type mb-1'>{item.company_name}</div>
                        </div>
                        <div className='col-md-6   d-flex justify-content-end '>
                           
                           <button className='load_btn'
                           onClick={()=>{
                            window.open(job.apply_options[0].link);
                           }}
                           >Apply Now</button>
                         
                       </div>
                    </div>
                    
                    </div>                        
   </div>
   </>
  );
}

export default JobInfo;
