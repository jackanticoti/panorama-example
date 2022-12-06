import React, { useEffect, useState } from 'react';
import type { GlobalTypes } from '@thoughtindustries/content';

function DashboardOne(content: GlobalTypes.Content[]) {

  let contentItems;
  console.log("content:")
  console.log(content)
  contentItems = content.content.map((contentItem, index) => {
    return <h1>{contentItem.title}</h1>
  })

  return (
    <div className='bg-red-400'>
        <h1 className='text-4xl text-center p-10'>I'm the Philly Dashboard</h1>
        { contentItems }
    </div>
  );
}

export default DashboardOne