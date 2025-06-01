    import { AccountBoxOutlined, CurrencyRupeeOutlined, ImportantDevicesOutlined, TrendingUp } from '@mui/icons-material'
    import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'
    import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
    import React from 'react'



    const salesData=[
        {
            stats:'24k',
            title:"Sales",
            color:"blue",
            icon:<TrendingUp sx={{fontSize:"1.75rem"}}/>
        },
        {
            stats:'1.5k',
            title:"Customer",
            color:"red",
            icon:<AccountBoxOutlined sx={{fontSize:"1.75rem"}}/>
        },
        {
            stats:'2.4k',
            title:"Products",
            color:"yellow",
            icon:<ImportantDevicesOutlined sx={{fontSize:"1.75rem"}}/>
        },
        {
            stats:'2.4k',
            title:"Revenue",
            color:"orange",
            icon:<CurrencyRupeeOutlined sx={{fontSize:"1.75rem"}}/>
        }
    ]

    const renderStats=()=>
    {
        return salesData.map((item,index)=>(<Grid item xs={12} sm={3} key={index}>
            <Box sx={{display:"flex",alignItems:"center"}}>
                <Avatar variant='rounded' sx={{mr:3,width:44,height:44,boxShadow:3,color:"white",bgcolor:`${item.color}`}}>{item.icon}</Avatar>
                <Box sx={{display:"flex" ,flexDirection:"column"}}>
                    <Typography variant='caption'>{item.title}</Typography>
                    <Typography variant='h6'>{item.stats}</Typography>
                </Box>
            </Box>

        </Grid>))
    }
    const MonthlyOverview = () => {
    return (
    <Card className=" space-y-7" sx={{bgcolor:"#242B2E",color:"white"}}>
        <CardHeader 
        title="Monthly Overview"
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
    )
    }

    export default MonthlyOverview