import React, { useState, useEffect, createContext, useContext } from 'react';
import Footer from '../../components/Footer/Footer';
import Banner from '../../components/Banner';
import NavBar from '../../components/Navigation/NavBar';
import DashboardOne from '../../components/Dashboards/Dashboard-One'
import DashboardTwo from '../../components/Dashboards/Dashboard-Two'
import { gql, useQuery, useMutation } from '@apollo/client';
import LearnerAccess from '../../components/LearnerAccess/LearnerAccess';
import FeaturedContentComp from '../../components/FeaturedContent/FeaturedContentComp';
import { HydratedContentItem } from '@thoughtindustries/content';


function Page() {

  const [panorama, setPanorama] = useState("")

  const query = gql`
  query {
    CurrentUser {
      firstName
      lastName
      email
      client {
        name
        panorama
      }
    }
  }`

    const { data } = useQuery(query);

    if (data) { 
      const response = data.CurrentUser.client.name
      useEffect(() => {
          setPanorama(response)
      }, [])
  } 

  let dashboard;
  if (panorama == "Philly") {
    dashboard = <DashboardOne/>
  } else if (panorama == "Boston") {
    dashboard = <DashboardTwo/>
  }

  return (
    <>
      <div className="font-primary">
        <NavBar />
          <div>
            { dashboard }
            <FeaturedContentComp
              onAddedToQueue={function (item: HydratedContentItem): Promise<boolean | void> {
                throw new Error('Function not implemented.');
              }}
              numberOfContentItems={3}
            />
          </div>
        <Footer />
      </div>
    </>
  );
}

export { Page };
