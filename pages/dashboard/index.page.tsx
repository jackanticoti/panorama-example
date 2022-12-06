import React, { useState, useEffect, createContext, useContext } from 'react';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/Navigation/NavBar';
import DashboardOne from '../../components/Dashboards/Dashboard-One'
import DashboardTwo from '../../components/Dashboards/Dashboard-Two'
import { gql, useQuery, useMutation } from '@apollo/client'
import type { GlobalTypes } from '@thoughtindustries/content';


function Page() {

  const [panorama, setPanorama] = useState("")
  const [content, setContent] = useState<GlobalTypes.Content[]>([])

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

    UserContentItems {
      title
      id
    }
  }`

  const { data, error } = useQuery(query);

  if (data) { 
    const response = data.CurrentUser.client.name
    console.log(data.UserContentItems)
    useEffect(() => {
        setPanorama(response)
        setContent(data.UserContentItems)
    }, [])
  } 

  if (error) {
    console.log("error:")
    console.log(error)
  }

  let dashboard;
  if (panorama == "Philly") {
    dashboard = <DashboardOne content={content}/>
  } else if (panorama == "Boston") {
    dashboard = <DashboardTwo/>
  }

  return (
    <>
      <div className="font-primary">
        <NavBar />
          <div>
            { dashboard }
          </div>
        <Footer />
      </div>
    </>
  );
}

export { Page };
