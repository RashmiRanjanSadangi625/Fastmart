import React, { useEffect } from 'react'
import { deleteProduct, findProducts } from '../../State/Product/Action';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import { AccountBoxOutlined, CurrencyRupeeOutlined, ImportantDevicesOutlined, TrendingUp } from '@mui/icons-material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

const ProductStats = () => {
  const dispatch=useDispatch();

  const {products}=useSelector(store=>store);

  console.log("products",products);

  const totalProducts=products?.products?.content?.length;

//   console.log('totalProducts',totalProducts);

  const salesData=[
    {
        stats:totalProducts,
        title:"Products",
        color:"blue",
        icon:<TrendingUp sx={{fontSize:"1.75rem"}}/>
    },
    {
        stats:'500',
        title:"New",
        color:"red",
        icon:<AccountBoxOutlined sx={{fontSize:"1.75rem"}}/>
    },
    {
        stats:'800',
        title:"Quantity",
        color:"yellow",
        icon:<ImportantDevicesOutlined sx={{fontSize:"1.75rem"}}/>
    },
    {
        stats:'2.4k',
        title:"React",
        color:"orange",
        icon:<CurrencyRupeeOutlined sx={{fontSize:"1.75rem"}}/>
    }
]

    const renderStats=()=>
    {
        return salesData.map((item,index)=>(<Grid item xs={12} sm={3} key={index}>
            <Box sx={{display:"flex",alignItems:"center"}}>
                <Avatar variant='rounded' sx={{mr:1,width:44,height:44,boxShadow:3,color:"white",bgcolor:`${item.color}`}}>{item.icon}</Avatar>
                <Box sx={{display:"flex" ,flexDirection:"column"}}>
                    <Typography variant='caption'>{item.title}</Typography>
                    <Typography variant='h6'>{item.stats}</Typography>
                </Box>
            </Box>

        </Grid>))
    } 

  useEffect(()=>{
    const data={
      category:"",
      colors: [],
      sizes: [],
      minPrice:null,
      maxPrice:null,
      minDiscount: 0,
      sort: "price-low",
      pageNumber:1,
      pageSize:20,
      stock:""
     }
     dispatch(findProducts(data));

  },[products.deletedProduct])

  return (
    <div className='mt-4 shadow-lg shadow-gray-600'>
    <Card className=" space-y-7" sx={{bgcolor:"#242B2E",color:"white"}}>
        <CardHeader
        title="Product Statistics"
        action={
        <IconButton size='small'>
            <MoreVertOutlinedIcon sx={{bgcolor:"#242B2E",color:"white"}}/>
        </IconButton>
        }
        subheader={
            <Typography variant='body2'>
                <Box component="span" sx={{fontWeight:600}}>
                    Total 48.5%  
                </Box>
                  this month
            </Typography>
        }
        slotProps={{
            sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
            }
        }}
        
        />
        <CardContent sx={{pt:theme=>`${theme.spacing(3)} !important`}}>
            <Grid container spacing={[5,0]}>
                {renderStats()}
            </Grid>
        </CardContent>
        </Card>
      
    </div>
  )
}

export default ProductStats
