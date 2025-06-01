import { Grid } from '@mui/material'
import React from 'react'
import Achievement from './Achievement'
import MonthlyOverview from './MonthlyOverview'
import ProductsTable from './ProductsTable'
import DashboardOrdersView from './DashboardOrdersView'
import DashboardProductsView from './DashboardProductsView'
import ProductStats from './ProductStats'


const Dashboard = () => {
  return (
    <div className='p-10'>
        <Grid container spacing={2} >
            <Grid item xs={12} md={4}>
                <Achievement/>
                <ProductStats/>
               <DashboardProductsView/>

            </Grid>
            <Grid item xs={12} md={8}>
                <MonthlyOverview/>
                <Grid item xs={12} md={12}>
                    <DashboardOrdersView/>
                </Grid>
            </Grid>

        </Grid>
    </div>
  )
}

export default Dashboard