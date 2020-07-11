import React from 'react';
import WhyMadeHeader from './WhyMadeHeader.jsx'
import Accordion from './Accordion.jsx'
import axios from 'axios';
import styled from "styled-components";
import GlobalFonts from '../fonts/fonts';


export default class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      product: {
        "id": 12,
        "why_we_made_this": "Calm is always just a practice away. Nearly seamless and pocket-free to make floor work extra comfortable.",
        "designed_for": "Yoga",
        "features": null,
        "materials": "Body: 80% Nylon 20% Lycra® Elastane",
        "imgurl1": "https://lulu-fec.s3.us-east-2.amazonaws.com/image29.jpeg",
        "imgurl2": "https://lulu-fec.s3.us-east-2.amazonaws.com/image30.jpeg"
      },
      features: ["Smooth cool feel", "Supportive", "Pocket holds your key or card", "Breathable", "Lightweight coverage", "High Rise", "21 Inch Inseam", "Sweat-wicking", "Minimal seams to reduce chafe", "High-coverage", "Supportive"],
    }
    this.getProduct = this.getProduct.bind(this);

  }

  componentDidMount(){
    // this.getProduct();
  }

  getProduct(){
    let id = (Math.floor(Math.random() * 99) + 1)
    axios.get(`http://localhost:3010/products/${id}`, {headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }})
      .then(res => {
        this.setState({
          product: res.data,
          features: res.data.features.split("/,")
        })
      })
      .catch(err => console.log(err))
  }

  render(){
    return (
      <div>
        <GlobalFonts />
        <WhyMadeHeader product={this.state.product}/>
        <Accordion
          features={this.state.features}
          designed_for={this.state.product.designed_for}
          materials={this.state.product.materials}
        />
      </div>
    )
  }
};

