import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    } from "@react-pdf/renderer";


    // Create styles
    const styles = StyleSheet.create({
    page: {
        backgroundColor: "#39ab0a",
        color: "white",
        width: '0 auto'
    },
    title: {
        margin: 10,
        padding: 10,
        textAlign : 'center',
        fontSize:20,
    },
    section: {
      margin: 2,
      padding: 2,
      textIndent:5,
      fontSize:15,
  },
    text: {
      margin: 2,
      padding: 2,
      textIndent:20,
      fontSize:10,
  },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
});
  
  // Create Document Component
function FoodsPDF({restaurantName,categories,foods}) {
    let foodsMap = {};
    categories.forEach(category => {
      let list = [];
      foods.forEach(food =>{
          if(food.category === category)
            list.push(food);
      });
      foodsMap[`${category}`]= list
    });
    return (
      <PDFViewer style={styles.viewer}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.title}>
              <Text>{restaurantName} Menu</Text>
            </View>
            {categories.map(category => Food(category,foodsMap[`${category}`]))}
          </Page>
        </Document>
      </PDFViewer>
    );
  }

  function Food(category,foods){
    console.log(foods)

    if (foods.length === 0)
      return <div/>;
    return (
      <div>
        <View style={styles.section}>
          <Text>{category}</Text>
        </View>
        {foods.map(food => (
          <View style={styles.text}>
            <Text>{food.name}         {food.price}$</Text>
          </View>
          
        ))}
      </div>
    );
  }
export default FoodsPDF;