/* eslint-disable react-hooks/rules-of-hooks */

import { useRouter } from 'next/navigation'
import React from 'react'


export default function protectedRoute(props: any) {
  let route = useRouter();
  
  if (localStorage.getItem("userToken")) {
    return props.children
  }
  else {
    return route.push("/login")
  }

}
