import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import axios from "axios"
import React from "react"

const ProductList = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
      axios.get("https://64450603914c816083c4251c.mockapi.io/appoinmet/products").
      then((res) => {
        setProducts(res.data)
      }
      )
    }, [])

  return (
    <View>
      <Text>ProductList</Text>
    </View>
  )
}

export default ProductList