import { Typography, Grid, Button } from "@mui/material";
import React from "react";
import Logo  from "../../../assets/Logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate=useNavigate();
  return (
    <div>
      <Grid className="bg-blue-950 text-white text-center mt-10" container  sx={{  color: "white", py: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">Company </Typography>

          <div className="ml-4 flex items-center justify-center lg:ml-0">
              
              <div onClick={()=>navigate("/")} >
              <span className="sr-only">FastMart</span>
              <img
                  src={Logo} 
                  alt="FastMart Logo"
                  draggable="false"
                  className="h-18 w-auto" // Adjust height for a better fit
                />
              </div>  
          </div>
          
          <div>
            <Typography className="p-5" >A fast paced ecommerce site ,delivered on time. Best customer satisfaction </Typography>
          </div>    
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6" >Solutions </Typography>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>Marketing</Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>Analytics</Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>Commerce</Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>Insights</Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>Support</Button>
          </div>    
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6" >Documentation </Typography>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>Guides</Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>API Status</Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6" >Legal </Typography>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>Claim</Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>Privacy</Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>Terms</Button>
          </div>
        </Grid>
        <Grid className="pt-20" item xs={12}>
            <Typography variant="body2" component="p" align="center">Copyright FastMart reserved 2025</Typography>
        </Grid>
      </Grid>
      
    </div>
  );
};

export default Footer;
